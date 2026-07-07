'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

function sanitizeRecords<T extends { id: string }>(records: unknown): T[] {
  if (!Array.isArray(records)) return []
  return records.filter(
    (item): item is T =>
      item !== null &&
      typeof item === 'object' &&
      typeof (item as T).id === 'string' &&
      (item as T).id.length > 0,
  )
}

function readStoredRecords<T extends { id: string }>(storageKey: string, defaults: T[]): T[] {
  if (typeof window === 'undefined') return defaults
  try {
    const raw = localStorage.getItem(storageKey)
    if (!raw) return defaults
    const valid = sanitizeRecords<T>(JSON.parse(raw))
    return valid
  } catch {
    try {
      localStorage.removeItem(storageKey)
    } catch {
      /* ignore */
    }
    return defaults
  }
}

export function usePersistedRecords<T extends { id: string }>(
  storageKey: string,
  defaultRecords: T[],
): [
  T[],
  React.Dispatch<React.SetStateAction<T[]>>,
  boolean,
  () => void,
] {
  const defaultsRef = useRef(defaultRecords)
  defaultsRef.current = defaultRecords

  const [records, setRecords] = useState<T[] | null>(null)
  const ready = records !== null

  const reloadFromStorage = useCallback(() => {
    setRecords(readStoredRecords(storageKey, defaultsRef.current))
  }, [storageKey])

  useEffect(() => {
    reloadFromStorage()
  }, [reloadFromStorage])

  const setRecordsSafe = useCallback((value: React.SetStateAction<T[]>) => {
    setRecords((prev) => {
      const base = prev ?? defaultsRef.current
      const next = typeof value === 'function' ? value(base) : value
      return sanitizeRecords<T>(next)
    })
  }, [])

  useEffect(() => {
    if (!ready) return
    try {
      localStorage.setItem(storageKey, JSON.stringify(records))
    } catch {
      /* ignore quota errors */
    }
  }, [records, ready, storageKey])

  return [records ?? [], setRecordsSafe, ready, reloadFromStorage]
}
