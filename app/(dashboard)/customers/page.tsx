 'use client'

import { useState } from 'react'
import { usePersistedRecords } from '@/lib/hooks/use-persisted-records'
import { PageHeader } from '@/components/dashboard/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function CustomersPage() {
  const [rows, setRows, ready] = usePersistedRecords('customers_rows_v1', [
    { id: 'c1', name: 'Alice', phone: '555-0101' },
    { id: 'c2', name: 'Bob', phone: '555-0202' },
  ])
  const [editing, setEditing] = useState<any>(null)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  const save = () => {
    if (editing) setRows((s) => s.map((r) => r.id === editing.id ? { ...r, name, phone } : r))
    else setRows((s) => [{ id: `c${Date.now()}`, name, phone }, ...s])
    setName(''); setPhone(''); setEditing(null)
  }
  const del = (id: string) => setRows((s) => s.filter((r) => r.id !== id))
  const edit = (r: any) => { setEditing(r); setName(r.name); setPhone(r.phone) }

  return (
    <div className="space-y-6">
      <PageHeader title="Customers" description="Manage customer records for phones & accessories" />
      <Card>
        <CardContent>
          <div className="mb-4 flex gap-2">
            <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <Button onClick={save}>{editing ? 'Update' : 'Add'}</Button>
          </div>
          {!ready ? null : (
          <table className="w-full table-auto">
            <thead><tr className="text-left"><th>Name</th><th>Phone</th><th>Actions</th></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="py-2">{r.name}</td>
                  <td>{r.phone}</td>
                  <td className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => edit(r)}>Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => del(r.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
