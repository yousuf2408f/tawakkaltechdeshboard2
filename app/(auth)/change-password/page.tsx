'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { changePasswordSchema } from '@/lib/validations/schemas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { z } from 'zod'

type FormData = z.infer<typeof changePasswordSchema>

export default function ChangePasswordPage() {
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(changePasswordSchema),
  })

  const onSubmit = async (data: FormData) => {
    setError('')
    setLoading(true)
    await new Promise((r) => setTimeout(r, 900))
    const validPassword = 'tawakkaltech123'
    if (data.currentPassword !== validPassword) {
      setError('Current password is incorrect')
      setLoading(false)
      return
    }
    setSuccess('Your password has been updated successfully.')
    reset()
    setLoading(false)
  }

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardContent className="p-8">
        <div className="mb-6 flex flex-col items-center text-center">
          <Image src="/logo.png" alt="TawakkalTech" width={140} height={42} className="mb-4 h-10 w-auto" />
          <h1 className="text-xl font-bold">Change Password</h1>
          <p className="mt-1 text-sm text-muted-foreground">Update your account password securely</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {error && <div role="alert" className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</div>}
          {success && <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-400">{success}</div>}
          {(['currentPassword', 'newPassword', 'confirmPassword'] as const).map((field) => (
            <div key={field} className="space-y-2">
              <Label htmlFor={field}>{field === 'currentPassword' ? 'Current Password' : field === 'newPassword' ? 'New Password' : 'Confirm Password'}</Label>
              <Input id={field} type="password" {...register(field)} />
              {errors[field] && <p className="text-xs text-destructive">{errors[field]?.message}</p>}
            </div>
          ))}
          <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Updating...' : 'Update Password'}</Button>
          <p className="text-center text-sm">
            <Link href="/login" className="font-medium text-brand-900 hover:underline dark:text-brand-600">Back to Login</Link>
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
