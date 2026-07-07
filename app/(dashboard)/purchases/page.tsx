 'use client'

import { useState } from 'react'
import { usePersistedRecords } from '@/lib/hooks/use-persisted-records'
import { PageHeader } from '@/components/dashboard/page-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'

export default function PurchasesPage() {
  const [items, setItems, ready] = usePersistedRecords('purchases_items_v1', [
    { id: 'p1', name: 'Phone Model A', qty: 10, price: 250 },
    { id: 'p2', name: 'Phone Case X', qty: 50, price: 12 },
  ])
  const [editing, setEditing] = useState<any>(null)
  const [form, setForm] = useState({ name: '', qty: '', price: '' })

  const startAdd = () => { setEditing(null); setForm({ name: '', qty: '', price: '' }) }
  const startEdit = (it: any) => { setEditing(it); setForm({ name: it.name, qty: String(it.qty), price: String(it.price) }) }
  const save = () => {
    if (editing) {
      setItems((s) => s.map((r) => r.id === editing.id ? { ...r, name: form.name, qty: Number(form.qty), price: Number(form.price) } : r))
    } else {
      setItems((s) => [{ id: `p${Date.now()}`, name: form.name, qty: Number(form.qty), price: Number(form.price) }, ...s])
    }
    setForm({ name: '', qty: '', price: '' })
    setEditing(null)
  }
  const del = (id: string) => setItems((s) => s.filter((r) => r.id !== id))

  return (
    <div className="space-y-6">
      <PageHeader title="Purchases" description="Manage incoming stock for phones & accessories" />

      <Card>
        <CardContent>
          <div className="mb-4 flex items-center gap-2">
            <Button onClick={startAdd}>Add Purchase</Button>
          </div>

          <div className="mb-4 grid gap-2 sm:grid-cols-3">
            <Input placeholder="Name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
            <Input placeholder="Quantity" value={form.qty} onChange={(e) => setForm((f) => ({ ...f, qty: e.target.value }))} />
            <Input placeholder="Price" value={form.price} onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} />
          </div>
          <div className="mb-6 flex gap-2">
            <Button onClick={save}>{editing ? 'Update' : 'Create'}</Button>
          </div>

          {!ready ? null : (
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left">
                <th>Name</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((row) => (
                <tr key={row.id} className="border-t">
                  <td className="py-2">{row.name}</td>
                  <td>{row.qty}</td>
                  <td>{row.price}</td>
                  <td className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => startEdit(row)}>Edit</Button>
                    <Button variant="destructive" size="sm" onClick={() => del(row.id)}>Delete</Button>
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
