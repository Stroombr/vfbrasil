"use client"

import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'

import { localeCookieName, localeLabels, supportedLocales, type Locale } from '@/data/i18n'

type LanguageSwitcherProps = {
  locale: Locale
  label: string
  className?: string
}

const localeShortLabels: Record<Locale, string> = {
  pt: 'PT',
  it: 'IT',
  en: 'EN',
  es: 'ES',
  fr: 'FR',
}

const localeFlagSrc: Record<Locale, string> = {
  pt: '/brazil-flag.svg',
  it: '/italy-flag.svg',
  en: '/usaflag.svg',
  es: '/spainflag.svg',
  fr: '/france-flag.svg',
}

function persistLocaleCookie(nextLocale: Locale) {
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  window.document.cookie = `${localeCookieName}=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`
}

export function LanguageSwitcher({ locale, label, className = '' }: LanguageSwitcherProps) {
  const options = useMemo(() => supportedLocales, [])
  const selectedIndex = Math.max(0, options.indexOf(locale))
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(selectedIndex)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([])

  useEffect(() => {
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (!wrapperRef.current) {
        return
      }

      const target = event.target as Node
      if (!wrapperRef.current.contains(target)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown, { passive: true })

    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
    }
  }, [])

  useEffect(() => {
    setActiveIndex(selectedIndex)
  }, [selectedIndex])

  useEffect(() => {
    if (!open) {
      return
    }

    const frame = window.requestAnimationFrame(() => {
      optionRefs.current[activeIndex]?.focus()
    })

    return () => window.cancelAnimationFrame(frame)
  }, [activeIndex, open])

  const changeLocale = (nextLocale: Locale) => {
    if (nextLocale === locale) {
      setOpen(false)
      return
    }

    persistLocaleCookie(nextLocale)

    window.setTimeout(() => {
      window.location.reload()
    }, 120)
  }

  const moveActive = (direction: -1 | 1) => {
    const next = (activeIndex + direction + options.length) % options.length
    setActiveIndex(next)
  }

  return (
    <div ref={wrapperRef} className={`relative inline-flex ${className}`.trim()}>
      <button
        type="button"
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={(event) => {
          if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') {
            return
          }

          event.preventDefault()
          setOpen(true)
          setActiveIndex(event.key === 'ArrowDown' ? selectedIndex : (selectedIndex - 1 + options.length) % options.length)
        }}
        className="focus-ring inline-flex min-h-10 items-center gap-2 rounded-md px-1.5 py-1.5 text-xs font-semibold text-slate-100 transition hover:text-amber-300"
      >
        <Image
          src={localeFlagSrc[locale]}
          alt={localeLabels[locale]}
          width={20}
          height={14}
          className="h-3.5 w-5 rounded-[2px] object-cover"
        />
        <span>{localeShortLabels[locale]}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition ${open ? 'rotate-180' : ''}`} />
      </button>

      {open ? (
        <div
          role="listbox"
          aria-label={label}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              event.preventDefault()
              setOpen(false)
              return
            }

            if (event.key === 'ArrowDown') {
              event.preventDefault()
              moveActive(1)
              return
            }

            if (event.key === 'ArrowUp') {
              event.preventDefault()
              moveActive(-1)
              return
            }

            if (event.key === 'Home') {
              event.preventDefault()
              setActiveIndex(0)
              return
            }

            if (event.key === 'End') {
              event.preventDefault()
              setActiveIndex(options.length - 1)
              return
            }

            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              changeLocale(options[activeIndex])
            }
          }}
          className="absolute right-0 top-[calc(100%+0.35rem)] z-[80] min-w-[120px] rounded-md border border-white/15 bg-[#070b12]/95 p-1 shadow-[0_10px_24px_rgba(0,0,0,0.45)] backdrop-blur"
        >
          {options.map((option, index) => (
            <button
              key={option}
              ref={(element) => {
                optionRefs.current[index] = element
              }}
              type="button"
              role="option"
              aria-selected={option === locale}
              onClick={() => changeLocale(option)}
              onMouseEnter={() => setActiveIndex(index)}
              tabIndex={index === activeIndex ? 0 : -1}
              className={`focus-ring flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs font-semibold transition ${option === locale ? 'bg-white/15 text-amber-300' : 'text-slate-100 hover:bg-white/10'
                }`}
            >
              <Image
                src={localeFlagSrc[option]}
                alt={localeLabels[option]}
                width={20}
                height={14}
                className="h-3.5 w-5 rounded-[2px] border border-white/20 object-cover"
              />
              <span>{localeShortLabels[option]}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
