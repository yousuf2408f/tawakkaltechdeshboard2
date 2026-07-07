'use client'

import { useState } from 'react'
import { usePersistedRecords } from '@/lib/hooks/use-persisted-records'
import { PageHeader } from '@/components/dashboard/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type CashBankAccount = {
  id: string
  name: string
  balance: number
}

const DEFAULT_ACCOUNTS: CashBankAccount[] = [
  { id: 'b1', name: 'Cash Register', balance: 1200 },
]

export default function CashBankPage() {
  const [accounts, setAccounts, ready] = usePersistedRecords('cash_bank_accounts_v1', DEFAULT_ACCOUNTS)
  const [name, setName] = useState('')
  const [balance, setBalance] = useState('')
  const [editing, setEditing] = useState<CashBankAccount | null>(null)

  const save = () => {
    if (!name.trim()) return
    const parsedBalance = Number(balance) || 0
    if (editing) {
      setAccounts((s) =>
        s.map((r) => (r.id === editing.id ? { ...r, name: name.trim(), balance: parsedBalance } : r)),
      )
    } else {
      setAccounts((s) => [{ id: `b${Date.now()}`, name: name.trim(), balance: parsedBalance }, ...s])
    }
    setName('')
    setBalance('')
    setEditing(null)
  }

  const del = (id: string) => setAccounts((s) => s.filter((r) => r.id !== id))

  const edit = (r: CashBankAccount) => {
    setEditing(r)
    setName(r.name)
    setBalance(String(r.balance))
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Cash & Bank" description="Manage cash registers and bank accounts" />
      <Card>
        <CardContent className="p-6">
          <div className="mb-4 flex gap-2">
            <Input placeholder="Account name" value={name} onChange={(e) => setName(e.target.value)} />
            <Input placeholder="Balance" type="number" min="0" value={balance} onChange={(e) => setBalance(e.target.value)} />
            <Button onClick={save}>{editing ? 'Update' : 'Add'}</Button>
          </div>
          {!ready ? null : (
            <table className="w-full table-auto">
              <thead>
                <tr className="text-left">
                  <th>Name</th>
                  <th>Balance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((r) => (
                  <tr key={r.id} className="border-t">
                    <td className="py-2">{r.name}</td>
                    <td>{r.balance}</td>
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
