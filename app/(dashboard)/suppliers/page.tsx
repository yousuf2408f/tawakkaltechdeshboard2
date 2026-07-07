 'use client'

import { useState } from 'react'
import { usePersistedRecords } from '@/lib/hooks/use-persisted-records'
import { PageHeader } from '@/components/dashboard/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function SuppliersPage() {
  const [rows, setRows, ready] = usePersistedRecords('suppliers_rows_v1', [
    { id: 's1', name: 'Supplier One', contact: 'supplier1@example.com' },
  ])
  const [editing, setEditing] = useState<any>(null)
  const [name, setName] = useState('')
  const [contact, setContact] = useState('')

  const save = () => {
    if (editing) setRows((s) => s.map((r) => r.id === editing.id ? { ...r, name, contact } : r))
    else setRows((s) => [{ id: `s${Date.now()}`, name, contact }, ...s])
    setName(''); setContact(''); setEditing(null)
  }
  const del = (id: string) => setRows((s) => s.filter((r) => r.id !== id))
  const edit = (r: any) => { setEditing(r); setName(r.name); setContact(r.contact) }

  return (
    <div className="space-y-6">
      <PageHeader title="Suppliers" description="Manage suppliers for phones & accessories" />
      <Card>
        <CardContent>
          <div className="mb-4 flex gap-2">
            <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Contact" value={contact} onChange={(e) => setContact(e.target.value)} />
            <Button onClick={save}>{editing ? 'Update' : 'Add'}</Button>
          </div>
          {!ready ? null : (
          <table className="w-full table-auto">
            <thead><tr className="text-left"><th>Name</th><th>Contact</th><th>Actions</th></tr></thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="py-2">{r.name}</td>
                  <td>{r.contact}</td>
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
