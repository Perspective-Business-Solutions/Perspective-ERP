import { useState, useEffect } from 'react'

// Read a key from localStorage (falls back to `initial` if empty/corrupt)
export function load(key, initial = []) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : initial
  } catch {
    return initial
  }
}

// Short unique id
export const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6)

// useState that persists to localStorage
export default function useLocalStorage(key, initial = []) {
  const [value, setValue] = useState(() => load(key, initial))

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* storage full or blocked - ignore */
    }
  }, [key, value])

  return [value, setValue]
}
