'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotPasswordSchema } from '@/lib/validations/schemas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { z } from 'zod'

type FormData = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(forgotPasswordSchema),
  })

  const onSubmit = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setSuccess('A password reset link has been sent to your email.')
    setLoading(false)
  }

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardContent className="p-8">
        <div className="mb-6 flex flex-col items-center text-center">
          <Image src="/logo.png" alt="TawakkalTech" width={140} height={42} className="mb-4 h-10 w-auto" />
          <h1 className="text-xl font-bold">Reset Password</h1>
          <p className="mt-1 text-sm text-muted-foreground">Enter your registered Gmail address</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {success && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400">
              {success}
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Registered Email</Label>
            <Input id="email" type="email" placeholder="you@gmail.com" disabled={!!success} {...register('email')} />
            {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={loading || !!success}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
          <p className="text-center text-sm">
            <Link href="/login" className="font-medium text-brand-900 hover:underline dark:text-brand-600">Back to Login</Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
