"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

import { NavbarItemsLarge, NavbarItemsStandard } from './Navbar'
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
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [mobileMenuOpen])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-white/10 transition-colors duration-300 ${
        scrolled ? 'bg-[#05070d]/92 shadow-[0_12px_24px_rgba(0,0,0,0.32)]' : 'bg-[#05070d]/78'
      } backdrop-blur-xl`}
    >
      <nav className="mx-auto grid h-[74px] w-full max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 sm:px-6 lg:px-8" aria-label="Global">
        <Link href="/" className="focus-ring flex items-center">
          <Image src={vfLogo} alt="Logo da VF Brasil" className="h-10 w-auto object-contain sm:h-13" priority />
        </Link>

        <div className="hidden justify-center lg:flex">
          <NavbarItemsLarge />
        </div>

        <div className="ml-auto hidden items-center lg:flex">
          <Link
            href="#contato"
            className="focus-ring inline-flex items-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
          >
            Solicitar proposta
          </Link>
        </div>

        <div className="ml-auto flex items-center lg:hidden">
          <button
            type="button"
            className="focus-ring inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/10 p-2 text-white"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-white/10 bg-[#06090f]/96 lg:hidden">
          <div className="mx-auto w-full max-w-7xl px-4 pb-5 pt-4 sm:px-6">
            <NavbarItemsStandard onNavigate={() => setMobileMenuOpen(false)} />

            <div className="mt-5">
              <Link
                href="#contato"
                className="focus-ring inline-flex w-full items-center justify-center rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-slate-950"
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


