"use client"

import { MessageCircle, Phone } from 'lucide-react'

import { interpolate, type Locale } from '@/data/i18n'
import { buildWhatsappLink, companyProfile } from '@/data/company'

type FloatingContactBarProps = {
  locale?: Locale
}

const copy: Record<Locale, { call: string; whatsapp: string; whatsappTemplate: string }> = {
  pt: {
    call: 'Ligar',
    whatsapp: 'WhatsApp',
    whatsappTemplate: 'Olá, gostaria de falar com a equipe da {brand}.',
  },
  en: {
    call: 'Call',
    whatsapp: 'WhatsApp',
    whatsappTemplate: 'Hello, I would like to speak with the {brand} team.',
  },
  es: {
    call: 'Llamar',
    whatsapp: 'WhatsApp',
    whatsappTemplate: 'Hola, me gustaria hablar con el equipo de {brand}.',
  },
  fr: {
    call: 'Appeler',
    whatsapp: 'WhatsApp',
    whatsappTemplate: 'Bonjour, je souhaite parler avec l equipe de {brand}.',
  },
  it: {
    call: 'Chiama',
    whatsapp: 'WhatsApp',
    whatsappTemplate: 'Ciao, vorrei parlare con il team di {brand}.',
  },
}

export function FloatingContactBar({ locale = 'pt' }: FloatingContactBarProps) {
  const localeCopy = copy[locale] ?? copy.pt
  const whatsappMessage = interpolate(localeCopy.whatsappTemplate, { brand: companyProfile.brandName })

  return (
    <div className="theme-floating-bar fixed inset-x-0 bottom-0 z-40 border-t border-white/10 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
      <div className="mx-auto flex w-full max-w-7xl gap-3 px-1">
        <a
          href={`tel:${companyProfile.phoneRaw}`}
          className="focus-ring inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm font-semibold text-slate-100"
        >
          <Phone className="h-4 w-4" />
          {localeCopy.call}
        </a>
        <a
          href={buildWhatsappLink(whatsappMessage)}
          target="_blank"
          rel="noreferrer"
          className="focus-ring inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-amber-500 px-3 py-2 text-sm font-semibold text-slate-950"
        >
          <MessageCircle className="h-4 w-4" />
          {localeCopy.whatsapp}
        </a>
      </div>
    </div>
  )
}

