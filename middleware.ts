import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { COOKIE_NAME, verifySession } from '@/lib/auth'

const AUTH_PAGES = ['/login', '/forgot-password', '/change-password']
const PUBLIC_API_PATHS = ['/api/auth/login', '/api/auth/logout']

async function hasAdminSession(token: string | undefined) {
  if (!token) return false
  const session = await verifySession(token)
  return session?.role === 'ADMIN'
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get(COOKIE_NAME)?.value

  if (pathname.startsWith('/_next') || pathname.startsWith('/logo') || pathname.includes('.')) {
    return NextResponse.next()
  }

  if (PUBLIC_API_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next()
  }

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (AUTH_PAGES.some((p) => pathname.startsWith(p))) {
    const response = NextResponse.next()
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
    return response
  }

  const isAdmin = await hasAdminSession(token)

  if (!isAdmin) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    const response = NextResponse.redirect(loginUrl)
    response.cookies.delete(COOKIE_NAME)
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
    return response
  }

  const response = NextResponse.next()
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
