"use client"

import { useEffect, useMemo, useState } from 'react'
import { ArrowUp } from 'phosphor-react'
import type { Locale } from '@/data/i18n'

type RedirectTopProps = {
  locale?: Locale
}

export function RedirectTop({ locale = 'pt' }: RedirectTopProps) {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  const labelByLocale: Record<Locale, string> = {
    pt: 'Voltar ao topo',
    en: 'Back to top',
    es: 'Volver arriba',
    fr: 'Retour en haut',
    it: 'Torna in alto',
  }

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const ratio = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0

      setVisible(scrollTop > 300)
      setProgress(ratio)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })

    return () => window.removeEventListener('scroll', update)
  }, [])

  const ringStyle = useMemo(
    () => ({
      background: `conic-gradient(#f4b73f ${progress}%, rgba(255,255,255,0.2) ${progress}% 100%)`,
    }),
    [progress],
  )

  return (
    <button
      type="button"
      className={`focus-ring fixed bottom-23 right-4 z-40 inline-flex h-13 w-13 items-center justify-center rounded-full p-[2px] shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition-all duration-300 sm:bottom-6 sm:right-6 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-5 opacity-0'
      }`}
      style={ringStyle}
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        })
      }}
      aria-label={labelByLocale[locale]}
    >
      <span className="theme-scroll-button inline-flex h-full w-full items-center justify-center rounded-full border border-white/15 text-amber-300 transition">
        <ArrowUp size={18} weight="bold" />
      </span>
    </button>
  )
}


