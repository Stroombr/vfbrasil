"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

import type { Locale } from '@/data/i18n'
import { LanguageSwitcher } from './LanguageSwitcher'
import { NavbarItemsLarge, NavbarItemsStandard } from './Navbar'
import { ThemeToggle } from './ThemeToggle'
import vfLogo from './../public/vflogo.png'

type HeaderProps = {
  locale?: Locale
}

export function Header({ locale = 'pt' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const copy: Record<
    Locale,
    { openMenu: string; closeMenu: string; language: string; brazilFlag: string; italyFlag: string }
  > = {
    pt: {
      openMenu: 'Abrir menu',
      closeMenu: 'Fechar menu',
      language: 'Idioma',
      brazilFlag: 'Bandeira do Brasil',
      italyFlag: 'Bandeira da Itália',
    },
    en: {
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
      language: 'Language',
      brazilFlag: 'Brazil flag',
      italyFlag: 'Italy flag',
    },
    es: {
      openMenu: 'Abrir menu',
      closeMenu: 'Cerrar menu',
      language: 'Idioma',
      brazilFlag: 'Bandera de Brasil',
      italyFlag: 'Bandera de Italia',
    },
    fr: {
      openMenu: 'Ouvrir le menu',
      closeMenu: 'Fermer le menu',
      language: 'Langue',
      brazilFlag: 'Drapeau du Brésil',
      italyFlag: "Drapeau de l'Italie",
    },
    it: {
      openMenu: 'Apri menu',
      closeMenu: 'Chiudi menu',
      language: 'Lingua',
      brazilFlag: 'Bandiera del Brasile',
      italyFlag: "Bandiera dell'Italia",
    },
  }

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

  useEffect(() => {
    const root = document.documentElement
    const body = document.body

    if (!mobileMenuOpen) {
      root.style.removeProperty('overflow')
      body.style.removeProperty('overflow')
      return
    }

    root.style.overflow = 'hidden'
    body.style.overflow = 'hidden'

    return () => {
      root.style.removeProperty('overflow')
      body.style.removeProperty('overflow')
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', onResize)

    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b border-white/10 transition-colors duration-300 ${
        scrolled ? 'bg-[#05070d]/92 shadow-[0_12px_24px_rgba(0,0,0,0.32)]' : 'bg-[#05070d]/78'
      } backdrop-blur-xl`}
    >
      <nav
        className="vf-shell grid h-[74px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3 lg:grid-cols-[auto_1fr_auto] lg:gap-4"
        aria-label="Global"
      >
        <Link
          href="/"
          className="focus-ring relative z-20 flex min-w-0 items-center gap-2.5 sm:gap-3 lg:z-30"
          onClick={() => setMobileMenuOpen(false)}
        >
          <span className="flex flex-col gap-1">
            <Image
              src="/brazil-flag.svg"
              alt={copy[locale].brazilFlag}
              width={28}
              height={18}
              className="h-4 w-auto rounded-sm border border-white/20 object-cover"
            />
            <Image
              src="/italy-flag.svg"
              alt={copy[locale].italyFlag}
              width={28}
              height={18}
              className="h-4 w-auto rounded-sm border border-white/20 object-cover"
            />
          </span>
          <Image
            src={vfLogo}
            alt="Logo da VF Brasil"
            className="h-10 w-auto max-w-[144px] object-contain sm:h-13 sm:max-w-[180px] lg:max-w-none"
            priority
          />
        </Link>

        <div className="hidden justify-center lg:flex">
          <NavbarItemsLarge locale={locale} />
        </div>

        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <ThemeToggle locale={locale} />
          <LanguageSwitcher locale={locale} label={copy[locale].language} />
        </div>

        <div className="relative z-50 ml-auto flex items-center gap-2 lg:hidden">
          <ThemeToggle locale={locale} className="min-h-10 px-2.5" />
          <LanguageSwitcher locale={locale} label={copy[locale].language} className="relative z-50" />
          <button
            type="button"
            className="focus-ring relative z-50 inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg p-2 text-white touch-manipulation transition hover:text-amber-300"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? copy[locale].closeMenu : copy[locale].openMenu}
            aria-controls="mobile-navigation"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div id="mobile-navigation" className="relative z-40 border-t border-white/10 bg-[#06090f]/96 lg:hidden">
          <div className="vf-shell pb-5 pt-4">
            <NavbarItemsStandard locale={locale} onNavigate={() => setMobileMenuOpen(false)} />
          </div>
        </div>
      )}
    </header>
  )
}
