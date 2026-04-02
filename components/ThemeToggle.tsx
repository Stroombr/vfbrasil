"use client"

import { Moon, Sun } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import type { Locale } from '@/data/i18n'

type Theme = 'dark' | 'light'

type ThemeToggleProps = {
  className?: string
  showLabel?: boolean
  locale?: Locale
}

const STORAGE_KEY = 'vf-theme'
const EVENT_NAME = 'vf-theme-change'

function resolveTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const current = document.documentElement.getAttribute('data-theme')

  if (current === 'light' || current === 'dark') {
    return current
  }

  const stored = window.localStorage.getItem(STORAGE_KEY)

  if (stored === 'light' || stored === 'dark') {
    return stored
  }

  return 'light'
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

export function ThemeToggle({ className = '', showLabel = false, locale = 'pt' }: ThemeToggleProps) {
  const [theme, setTheme] = useState<Theme>('light')
  const nextTheme = useMemo<Theme>(() => (theme === 'dark' ? 'light' : 'dark'), [theme])
  const copy: Record<
    Locale,
    { activateLight: string; activateDark: string; darkTheme: string; lightTheme: string }
  > = {
    pt: {
      activateLight: 'Ativar modo claro',
      activateDark: 'Ativar modo escuro',
      darkTheme: 'Tema escuro',
      lightTheme: 'Tema claro',
    },
    en: {
      activateLight: 'Enable light mode',
      activateDark: 'Enable dark mode',
      darkTheme: 'Dark theme',
      lightTheme: 'Light theme',
    },
    es: {
      activateLight: 'Activar modo claro',
      activateDark: 'Activar modo oscuro',
      darkTheme: 'Tema oscuro',
      lightTheme: 'Tema claro',
    },
    fr: {
      activateLight: 'Activer le mode clair',
      activateDark: 'Activer le mode sombre',
      darkTheme: 'Theme sombre',
      lightTheme: 'Theme clair',
    },
    it: {
      activateLight: 'Attiva modalita chiara',
      activateDark: 'Attiva modalita scura',
      darkTheme: 'Tema scuro',
      lightTheme: 'Tema chiaro',
    },
  }
  const labels = copy[locale] ?? copy.pt

  const toggleLabel = nextTheme === 'light' ? labels.activateLight : labels.activateDark

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
        const root = document.documentElement
        root.setAttribute('data-theme', nextTheme)
        root.classList.remove('theme-light', 'theme-dark')
        root.classList.add(nextTheme === 'light' ? 'theme-light' : 'theme-dark')
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

  return (
    <button
      type="button"
      onClick={() => {
        setTheme(nextTheme)
        applyTheme(nextTheme)
      }}
      aria-pressed={theme === 'dark'}
      data-theme-current={theme}
      className={`theme-toggle focus-ring inline-flex items-center justify-center ${
        showLabel ? 'gap-2 rounded-full px-3 py-2 text-sm font-semibold' : 'h-9 w-9 rounded-xl p-0'
      } ${className}`.trim()}
      aria-label={toggleLabel}
      title={toggleLabel}
    >
      <span className="theme-toggle-icon-wrap" aria-hidden="true">
        {theme === 'dark' ? <Sun className="theme-toggle-icon h-4 w-4" /> : <Moon className="theme-toggle-icon h-4 w-4" />}
      </span>
      {showLabel ? <span>{theme === 'dark' ? labels.darkTheme : labels.lightTheme}</span> : null}
    </button>
  )
}
