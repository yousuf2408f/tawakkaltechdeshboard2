import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { createSession, COOKIE_NAME, SESSION_DURATION } from '@/lib/auth'

export async function POST(request: Request) {
  const body = await request.json()
  const { username, password, rememberMe } = body

  const validUsername = process.env.VITE_DEMO_USERNAME ?? process.env.DEMO_USERNAME ?? 'admintawakkaltech'
  const validPassword = process.env.VITE_DEMO_PASSWORD ?? process.env.DEMO_PASSWORD ?? 'tawakkaltech123'

  if (username !== validUsername || password !== validPassword) {
    return NextResponse.json({ error: 'Invalid Username or Password' }, { status: 401 })
  }

  const token = await createSession({
    userId: 'usr_admin_001',
    username: validUsername,
    name: 'Admin',
    role: 'ADMIN',
  })

  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    ...(rememberMe ? { maxAge: SESSION_DURATION * 4 } : {}),
  })

  return NextResponse.json({ success: true })
}
