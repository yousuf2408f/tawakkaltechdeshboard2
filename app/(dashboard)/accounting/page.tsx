'use client'

import { useState } from 'react'
import { usePersistedRecords } from '@/lib/hooks/use-persisted-records'
import { PageHeader } from '@/components/dashboard/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type AccountingEntry = {
  id: string
  desc: string
  amount: number
}

const DEFAULT_ENTRIES: AccountingEntry[] = [
  { id: 'a1', desc: 'Sale Phone A', amount: 250 },
]

export default function AccountingPage() {
  const [entries, setEntries, ready] = usePersistedRecords('accounting_entries_v1', DEFAULT_ENTRIES)
  const [desc, setDesc] = useState('')
  const [amount, setAmount] = useState('')
  const [editing, setEditing] = useState<AccountingEntry | null>(null)

  const save = () => {
    if (!desc.trim()) return
    const parsedAmount = Number(amount) || 0
    if (editing) {
      setEntries((s) =>
        s.map((r) => (r.id === editing.id ? { ...r, desc: desc.trim(), amount: parsedAmount } : r)),
      )
    } else {
      setEntries((s) => [{ id: `a${Date.now()}`, desc: desc.trim(), amount: parsedAmount }, ...s])
    }
    setDesc('')
    setAmount('')
    setEditing(null)
  }

  const del = (id: string) => setEntries((s) => s.filter((r) => r.id !== id))

  const edit = (r: AccountingEntry) => {
    setEditing(r)
    setDesc(r.desc)
    setAmount(String(r.amount))
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Accounting" description="Simple accounting entries for phone sales and purchases" />
      <Card>
        <CardContent className="p-6">
          <div className="mb-4 flex gap-2">
            <Input placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
            <Input placeholder="Amount" type="number" min="0" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <Button onClick={save}>{editing ? 'Update' : 'Add'}</Button>
          </div>
          {!ready ? null : (
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left">
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((r) => (
                  <tr key={r.id} className="border-t">
                    <td className="py-2">{r.desc}</td>
                    <td>{r.amount}</td>
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
