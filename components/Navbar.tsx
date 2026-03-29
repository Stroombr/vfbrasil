"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

type NavbarItemsStandardProps = {
  onNavigate?: () => void
}

type NavItem = {
  name: string
  url: string
  sectionId?: string
}

const navbarItems: NavItem[] = [
  { name: 'Home', url: '/' },
  { name: 'Sobre', url: '/sobre' },
  { name: 'Empresa', url: '/#overview', sectionId: 'overview' },
  { name: 'Produtos', url: '/#produtos', sectionId: 'produtos' },
  { name: 'Contato', url: '/#contato', sectionId: 'contato' },
]

const trackableSections = ['overview', 'produtos', 'contato'] as const

function getActiveSectionFromScroll() {
  if (typeof window === 'undefined') {
    return 'home'
  }

  if (window.scrollY < 140) {
    return 'home'
  }

  const marker = window.scrollY + 180
  let active: string = 'home'

  for (const id of trackableSections) {
    const element = document.getElementById(id)

    if (!element) {
      continue
    }

    const top = element.getBoundingClientRect().top + window.scrollY

    if (top <= marker) {
      active = id
    }
  }

  return active
}

function useActiveSection(pathname: string) {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    if (pathname !== '/') {
      return
    }

    let frame = 0

    const update = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        setActiveSection(getActiveSectionFromScroll())
      })
    }

    update()

    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    window.addEventListener('hashchange', update)

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      window.removeEventListener('hashchange', update)
    }
  }, [pathname])

  return activeSection
}

function useNavItems() {
  const pathname = usePathname()
  const activeSection = useActiveSection(pathname)

  return useMemo(
    () =>
      navbarItems.map((item) => {
        const isHome = item.url === '/'
        const isHashSection = Boolean(item.sectionId)

        let isActive = false

        if (isHome) {
          isActive = pathname === '/' && activeSection === 'home'
        } else if (isHashSection) {
          isActive = pathname === '/' && activeSection === item.sectionId
        } else {
          isActive = pathname.startsWith(item.url)
        }

        return { ...item, isActive }
      }),
    [activeSection, pathname],
  )
}

export function NavbarItemsLarge() {
  const items = useNavItems()

  return (
    <ul className="flex items-center gap-8">
      {items.map((item) => (
        <li key={item.url}>
          <Link
            href={item.url}
            aria-current={item.isActive ? 'page' : undefined}
            className={`focus-ring relative text-sm font-semibold tracking-wide transition ${
              item.isActive ? 'text-amber-300' : 'text-slate-100 hover:text-amber-300'
            }`}
          >
            {item.name}
            <span
              className={`absolute -bottom-1 left-0 h-[2px] bg-amber-300 transition-all ${
                item.isActive ? 'w-full' : 'w-0'
              }`}
            />
          </Link>
        </li>
      ))}
    </ul>
  )
}

export function NavbarItemsStandard({ onNavigate }: NavbarItemsStandardProps) {
  const items = useNavItems()

  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.url}>
          <Link
            href={item.url}
            onClick={onNavigate}
            aria-current={item.isActive ? 'page' : undefined}
            className={`focus-ring block rounded-lg px-3 py-2 text-base font-semibold transition ${
              item.isActive ? 'bg-white/15 text-amber-300' : 'text-slate-100 hover:bg-white/10 hover:text-amber-300'
            }`}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}


