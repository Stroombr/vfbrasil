"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

import { NavbarItemsLarge, NavbarItemsStandard } from './Navbar'
import { ThemeToggle } from './ThemeToggle'
import vfLogo from './../public/vflogo.png'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.removeProperty('overflow')
      return
    }

    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.removeProperty('overflow')
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [mobileMenuOpen])

  return (
    <header className="fixed inset-x-0 top-4 z-50">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav
          className={`glass-nav flex items-center rounded-2xl px-4 py-3 transition-all duration-300 sm:px-6 ${
            scrolled ? 'header-elevated shadow-[0_16px_35px_rgba(0,0,0,0.3)]' : ''
          }`}
          aria-label="Global"
        >
          <Link href="/" className="focus-ring flex items-center">
            <Image src={vfLogo} alt="Logo da VF Brasil" className="h-10 w-auto object-contain sm:h-12" priority />
          </Link>

          <div className="ml-10 hidden lg:block">
            <NavbarItemsLarge />
          </div>

          <div className="ml-auto hidden items-center gap-3 lg:flex">
            <ThemeToggle showLabel />
            <Link
              href="#contato"
              className="focus-ring inline-flex items-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
            >
              Solicitar proposta
            </Link>
          </div>

          <div className="ml-auto flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="focus-ring inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 p-2 text-white"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 px-4 py-5 lg:hidden">
          <div className="surface-panel ml-auto h-full w-full max-w-sm rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <Image src={vfLogo} alt="Logo da VF Brasil" className="h-10 w-auto" />
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  type="button"
                  className="focus-ring rounded-lg border border-white/20 bg-white/10 p-2 text-white"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Fechar menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-8">
              <NavbarItemsStandard onNavigate={() => setMobileMenuOpen(false)} />
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <Link
                href="#contato"
                className="focus-ring inline-flex w-full items-center justify-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950"
                onClick={() => setMobileMenuOpen(false)}
              >
                Solicitar proposta
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}


