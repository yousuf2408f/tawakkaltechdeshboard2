 'use client'

import { useMemo, useState } from 'react'
import { PageHeader } from '@/components/dashboard/page-header'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Package, Plus, Save } from 'lucide-react'
import { DEFAULT_INVENTORY_ITEMS, INVENTORY_STORAGE_KEY } from '@/lib/constants/inventory'
import { usePersistedRecords } from '@/lib/hooks/use-persisted-records'

export default function InventoryPage() {
  const [items, setItems, ready] = usePersistedRecords(INVENTORY_STORAGE_KEY, DEFAULT_INVENTORY_ITEMS)
  const [editing, setEditing] = useState<{ id: string; name: string; stock: number } | null>(null)
  const [name, setName] = useState('')
  const [stock, setStock] = useState('')
  const [formError, setFormError] = useState('')

  const totalStock = useMemo(() => items.reduce((sum, item) => sum + item.stock, 0), [items])
  const lowStockItems = useMemo(() => items.filter((item) => item.stock < 10).length, [items])

  const save = () => {
    if (!name.trim()) {
      setFormError('Product name is required')
      return
    }
    if (!stock || Number(stock) < 0) {
      setFormError('Please enter a valid stock quantity')
      return
    }

    setFormError('')
    if (editing) {
      setItems((s) => s.map((r) => r.id === editing.id ? { ...r, name: name.trim(), stock: Number(stock) } : r))
    } else {
      setItems((s) => [{ id: `i${Date.now()}`, name: name.trim(), stock: Number(stock) }, ...s])
    }
    setName('')
    setStock('')
    setEditing(null)
  }
  const del = (id: string) => setItems((s) => s.filter((r) => r.id !== id))
  const edit = (row: { id: string; name: string; stock: number }) => {
    setEditing(row)
    setName(row.name)
    setStock(String(row.stock))
    setFormError('')
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Inventory" description="Manage stock for mobile phones and accessories" />
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Total Products</p>
            <p className="text-2xl font-bold">{items.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Total Stock Units</p>
            <p className="text-2xl font-bold">{totalStock}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Low Stock Items</p>
            <p className="text-2xl font-bold text-amber-500">{lowStockItems}</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardContent className="p-6">
          <div className="mb-6 grid gap-4 md:grid-cols-[2fr_1fr_auto] md:items-end">
            <div className="space-y-2">
              <Label htmlFor="item-name">Product name</Label>
              <Input id="item-name" placeholder="e.g. iPhone 15 Pro" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="item-stock">Stock quantity</Label>
              <Input id="item-stock" type="number" min="0" placeholder="0" value={stock} onChange={(e) => setStock(e.target.value)} />
            </div>
            <Button onClick={save}>
              {editing ? <Save className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
              {editing ? 'Update Product' : 'Add Product'}
            </Button>
          </div>
          {formError && (
            <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {formError}
            </div>
          )}
          {!ready ? null : (
          <table className="w-full table-auto">
            <thead>
              <tr className="text-left text-sm text-muted-foreground">
                <th className="pb-3">Product</th>
                <th className="pb-3">Stock</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{r.name}</span>
                    </div>
                  </td>
                  <td className={r.stock < 10 ? 'font-semibold text-amber-500' : ''}>{r.stock}</td>
                  <td className="space-x-2 text-right">
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
