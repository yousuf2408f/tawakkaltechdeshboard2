'use client'

import { useRouter } from 'next/navigation'
import { Search, Bell, Menu, Sun, Moon, LogOut, User, Settings } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { BrandLogo } from '@/components/layout/brand-logo'
import type { Notification } from '@/types'

interface TopNavbarProps {
  onMenuClick: () => void
  userName?: string
  userRole?: string
}

export function TopNavbar({ onMenuClick, userName = 'Admin', userRole = 'ADMIN' }: TopNavbarProps) {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [loggingOut, setLoggingOut] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  const fetchUnreadCount = useCallback(async () => {
    try {
      const res = await fetch('/api/notifications', { cache: 'no-store' })
      const data = await res.json()
      if (!res.ok) return
      const notifications = (data.notifications ?? []) as Notification[]
      setUnreadCount(notifications.filter((n) => !n.read).length)
    } catch {
      setUnreadCount(0)
    }
  }, [])

  useEffect(() => {
    fetchUnreadCount()
  }, [fetchUnreadCount])

  useEffect(() => {
    const onFocus = () => fetchUnreadCount()
    window.addEventListener('focus', onFocus)
    return () => window.removeEventListener('focus', onFocus)
  }, [fetchUnreadCount])

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
    } catch {
      /* proceed with client cleanup */
    } finally {
      router.replace('/login')
      router.refresh()
    }
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-primary/10 bg-background/70 px-4 backdrop-blur-xl sm:px-6">
      <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
        <Menu className="h-5 w-5" />
      </Button>

      <div className="hidden sm:block">
        <BrandLogo href={null} size="navbar" />
      </div>

      <div className="relative ml-auto max-w-md flex-1 sm:max-w-xs lg:max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search products, expenses, reports..." className="pl-9" />
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>

        <Link href="/notifications">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </Button>
        </Link>

        <div className="ml-1 flex items-center gap-2 border-l border-primary/10 pl-2 sm:pl-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-xs text-primary-foreground">
              {userName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="hidden flex-col md:flex">
            <span className="text-sm font-medium leading-none">{userName}</span>
            <span className="text-xs text-muted-foreground">{userRole.replace('_', ' ')}</span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            disabled={loggingOut}
            className="border-primary/30 hover:border-primary/50"
          >
            <LogOut className="mr-1.5 h-4 w-4" />
            <span className="hidden sm:inline">{loggingOut ? 'Logging out...' : 'Logout'}</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs text-muted-foreground">{userRole.replace('_', ' ')}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /> Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
