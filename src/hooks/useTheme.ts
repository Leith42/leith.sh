import { useState, useEffect } from 'react'
import type { Theme } from '../types'
import { THEME_TOGGLE_SPIN_DURATION_MS } from '../types'

function getInitialTheme(): Theme {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark' || saved === 'light') return saved
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [spinning, setSpinning] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setSpinning(true)
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
    setTimeout(() => setSpinning(false), THEME_TOGGLE_SPIN_DURATION_MS)
  }

  return { theme, spinning, toggleTheme }
}
