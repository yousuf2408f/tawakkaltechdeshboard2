export const INVENTORY_STORAGE_KEY = 'inventory_items_v1'

export type InventoryItem = {
  id: string
  name: string
  stock: number
}

export const DEFAULT_INVENTORY_ITEMS: InventoryItem[] = [
  { id: 'i1', name: 'Samsung Galaxy A15', stock: 8 },
  { id: 'i2', name: 'USB-C Fast Charger', stock: 30 },
]

export function readInventoryItems(): InventoryItem[] {
  if (typeof window === 'undefined') return DEFAULT_INVENTORY_ITEMS
  try {
    const raw = localStorage.getItem(INVENTORY_STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as InventoryItem[]
      if (Array.isArray(parsed)) return parsed
    }
  } catch {
    /* use defaults */
  }
  return DEFAULT_INVENTORY_ITEMS
}
