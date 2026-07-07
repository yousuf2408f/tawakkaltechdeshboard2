'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginFormData } from '@/lib/validations/schemas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { BrandLogo } from '@/components/layout/brand-logo'
import { Eye, EyeOff } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [authError, setAuthError] = useState('')
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { rememberMe: false },
  })

  const onSubmit = async (data: LoginFormData) => {
    setAuthError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        router.push('/dashboard')
        router.refresh()
      } else {
        let errorMsg = 'Invalid Username or Password'
        try {
          const json = await res.json()
          const apiError = json.error
          errorMsg = typeof apiError === 'string' ? apiError : errorMsg
        } catch {
          errorMsg = 'Server error. Please try again.'
        }
        setAuthError(errorMsg)
      }
    } catch {
      setAuthError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md animate-slide-up glass-panel glow-border">
      <CardContent className="p-8">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4">
            <BrandLogo href={null} size="auth" />
          </div>
          <h1 className="text-xl font-bold glow-text">Welcome Back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to TawakkalTech ERP</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {authError && (
            <div role="alert" className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {authError}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" autoFocus autoComplete="username" className="glass-panel border-primary/20" {...register('username')} />
            {errors.username && <p className="text-xs text-destructive">{errors.username.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                className="glass-panel border-primary/20 pr-10"
                {...register('password')}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input type="checkbox" {...register('rememberMe')} className="rounded border-primary/30 accent-primary" />
              Remember Me
            </label>
            <Link href="/forgot-password" className="text-sm font-medium text-primary hover:text-brand-600">
              Forgot Password?
            </Link>
          </div>

          <Button type="submit" className="w-full btn-glow" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            <Link href="/change-password" className="font-medium text-primary hover:text-brand-600">
              Change Password
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
