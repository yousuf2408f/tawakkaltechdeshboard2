import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { DashboardShell } from '@/components/layout/dashboard-shell'
import { ErrorBoundary } from '@/components/dashboard/error-boundary'
import { DashboardProviders } from '@/components/providers/dashboard-providers'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession()
  if (!session || session.role !== 'ADMIN') {
    redirect('/login')
  }

  return (
    <DashboardProviders>
      <DashboardShell userName={session?.name} userRole={session?.role}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </DashboardShell>
    </DashboardProviders>
  )
}
