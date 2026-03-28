"use client"

import { Moon, Sun } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

type Theme = 'dark' | 'light'

type ThemeToggleProps = {
  className?: string
  showLabel?: boolean
}

const STORAGE_KEY = 'vf-theme'
const EVENT_NAME = 'vf-theme-change'

function resolveTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'dark'
  }

  const current = document.documentElement.getAttribute('data-theme')

  if (current === 'light' || current === 'dark') {
    return current
  }

  const stored = window.localStorage.getItem(STORAGE_KEY)

  if (stored === 'light' || stored === 'dark') {
    return stored
  }

  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function applyTheme(theme: Theme) {
  if (typeof window === 'undefined') {
    return
  }

  const root = document.documentElement

  root.setAttribute('data-theme', theme)
  root.classList.remove('theme-light', 'theme-dark')
  root.classList.add(theme === 'light' ? 'theme-light' : 'theme-dark')

  window.localStorage.setItem(STORAGE_KEY, theme)
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: theme }))
}

export function ThemeToggle({ className = '', showLabel = false }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    const onThemeChange = (event: Event) => {
      const custom = event as CustomEvent<Theme>

      if (custom.detail === 'dark' || custom.detail === 'light') {
        setTheme(custom.detail)
        return
      }

      setTheme(resolveTheme())
    }

    const onStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) {
        return
      }

      const nextTheme = event.newValue

      if (nextTheme === 'light' || nextTheme === 'dark') {
        setTheme(nextTheme)
        document.documentElement.setAttribute('data-theme', nextTheme)
      }
    }

    window.addEventListener(EVENT_NAME, onThemeChange as EventListener)
    window.addEventListener('storage', onStorage)

    const current = resolveTheme()
    applyTheme(current)

    return () => {
      window.removeEventListener(EVENT_NAME, onThemeChange as EventListener)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  const nextTheme = useMemo<Theme>(() => (theme === 'dark' ? 'light' : 'dark'), [theme])

  return (
    <button
      type="button"
      onClick={() => {
        setTheme(nextTheme)
        applyTheme(nextTheme)
      }}
      className={`theme-toggle focus-ring inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ${className}`.trim()}
      aria-label={`Ativar modo ${nextTheme === 'light' ? 'claro' : 'escuro'}`}
      title={`Ativar modo ${nextTheme === 'light' ? 'claro' : 'escuro'}`}
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      {showLabel ? <span>{theme === 'dark' ? 'Tema escuro' : 'Tema claro'}</span> : null}
    </button>
  )
}
