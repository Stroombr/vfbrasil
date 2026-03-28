"use client"

import Link from 'next/link'
import { MessageCircle, Phone } from 'lucide-react'

import { buildWhatsappLink, companyProfile } from '@/data/company'

export function FloatingContactBar() {
  return (
    <div className="theme-floating-bar fixed inset-x-0 bottom-0 z-40 border-t border-white/10 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
      <div className="mx-auto flex w-full max-w-7xl gap-3 px-1">
        <Link
          href={`tel:${companyProfile.phoneRaw}`}
          className="focus-ring inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm font-semibold text-slate-100"
        >
          <Phone className="h-4 w-4" />
          Ligar
        </Link>
        <Link
          href={buildWhatsappLink(`Ola, gostaria de falar com a equipe da ${companyProfile.brandName}.`)}
          target="_blank"
          rel="noreferrer"
          className="focus-ring inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-emerald-950"
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </Link>
      </div>
    </div>
  )
}
