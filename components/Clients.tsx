"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import type { Locale } from '@/data/i18n'

import gerdauLogo from '../public/gerdau.png'
import sinobrasLogo from '../public/sinobras.png'
import votorantimLogo from '../public/votorantim-metais.png'
import acerosLogo from '../public/aceros.png'
import ironbergLogo from '../public/ironberg.png'
import gavioesLogo from '../public/gavioes.png'
import petrobrasLogo from '../public/br-petrobras.png'

const clients = [
  { src: petrobrasLogo, alt: 'Logo Petrobras', imageClassName: 'h-auto max-h-22 sm:max-h-30', relevance: 100 },
  { src: gerdauLogo, alt: 'Logo Gerdau', imageClassName: 'h-auto max-h-22 sm:max-h-30', relevance: 95 },
  { src: votorantimLogo, alt: 'Logo Votorantim Metais', imageClassName: 'h-auto max-h-20 sm:max-h-30', relevance: 90 },
  { src: sinobrasLogo, alt: 'Logo Sinobras', imageClassName: 'h-auto max-h-22 sm:max-h-30', relevance: 85 },
  { src: acerosLogo, alt: 'Logo Aceros', imageClassName: 'h-auto max-h-22 sm:max-h-30', relevance: 80 },
  { src: ironbergLogo, alt: 'Logo Ironberg', imageClassName: 'h-auto max-h-22 sm:max-h-30', relevance: 75 },
  { src: gavioesLogo, alt: 'Logo Gavioes', imageClassName: 'h-auto max-h-22 sm:max-h-30', relevance: 70 },
].sort((left, right) => right.relevance - left.relevance)
const MOBILE_VISIBLE_COUNT = 3

type ClientListProps = {
  locale?: Locale
}

export function ClientList({ locale = 'pt' }: ClientListProps) {
  const mobilePageCount = Math.max(1, Math.ceil(clients.length / MOBILE_VISIBLE_COUNT))
  const [mobilePage, setMobilePage] = useState(0)

  useEffect(() => {
    if (typeof window === 'undefined' || mobilePageCount <= 1) {
      return
    }

    const mobileQuery = window.matchMedia('(max-width: 639px)')
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    let interval: number | null = null

    const stopRotation = () => {
      if (interval === null) {
        return
      }

      window.clearInterval(interval)
      interval = null
    }

    const startRotation = () => {
      if (!mobileQuery.matches || reducedMotionQuery.matches) {
        return
      }

      interval = window.setInterval(() => {
        setMobilePage((prev) => (prev + 1) % mobilePageCount)
      }, 3500)
    }

    const syncRotation = () => {
      stopRotation()
      startRotation()
    }

    syncRotation()
    mobileQuery.addEventListener('change', syncRotation)
    reducedMotionQuery.addEventListener('change', syncRotation)

    return () => {
      stopRotation()
      mobileQuery.removeEventListener('change', syncRotation)
      reducedMotionQuery.removeEventListener('change', syncRotation)
    }
  }, [mobilePageCount])

  const visibleMobileClients = Array.from({ length: MOBILE_VISIBLE_COUNT }, (_, offset) => {
    const index = (mobilePage * MOBILE_VISIBLE_COUNT + offset) % clients.length
    return clients[index]
  })

  const copy: Record<
    Locale,
    {
      eyebrow: string
      title: string
      description: string
    }
  > = {
    pt: {
      eyebrow: 'Prova de confiança',
      title: 'Empresas líderes já operam com suporte técnico da VF Brasil',
      description: 'Relação de longo prazo com foco em disponibilidade, qualidade e prazo.',
    },
    en: {
      eyebrow: 'Proof of trust',
      title: 'Leading companies already operate with VF Brasil technical support',
      description: 'Long-term relationships focused on availability, quality and delivery time.',
    },
    es: {
      eyebrow: 'Prueba de confianza',
      title: 'Empresas lideres ya operan con soporte tecnico de VF Brasil',
      description: 'Relacion de largo plazo con foco en disponibilidad, calidad y plazo.',
    },
    fr: {
      eyebrow: 'Preuve de confiance',
      title: 'Des entreprises leaders operent deja avec le support technique de VF Brasil',
      description: 'Relation de long terme axee sur disponibilite, qualite et delai.',
    },
    it: {
      eyebrow: 'Prova di fiducia',
      title: 'Aziende leader operano gia con il supporto tecnico di VF Brasil',
      description: 'Relazione di lungo periodo con focus su disponibilita, qualita e tempi.',
    },
  }

  return (
    <section className="space-y-8">
      <div className="vf-heading-center">
        <p className="vf-eyebrow">{copy[locale].eyebrow}</p>
        <h2 className="vf-title sm:text-4xl">{copy[locale].title}</h2>
        <p className="vf-copy">{copy[locale].description}</p>
      </div>

      <div className="sm:hidden">
        <div className="grid grid-cols-3 gap-3">
          {visibleMobileClients.map((client, index) => (
            <article
              key={`mobile-client-${client.alt}-${index}`}
              className="client-logo-card flex min-h-[120px] items-center justify-center rounded-xl px-2 py-4"
            >
              <Image
                src={client.src}
                alt={client.alt}
                className={`client-logo-image ${client.imageClassName} w-auto object-contain`}
              />
            </article>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-center gap-2" aria-hidden="true">
          {Array.from({ length: mobilePageCount }, (_, index) => (
            <span
              key={`mobile-indicator-${index}`}
              className={`h-2 rounded-full transition-all ${index === mobilePage ? 'w-6 bg-amber-300' : 'w-2 bg-white/25'}`}
            />
          ))}
        </div>
      </div>

      <div className="hidden gap-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        {clients.map((client) => (
          <article
            key={client.alt}
            className="client-logo-card group flex min-h-[150px] items-center justify-center rounded-2xl px-6 py-8 transition hover:-translate-y-1"
          >
            <Image
              src={client.src}
              alt={client.alt}
              className={`client-logo-image ${client.imageClassName} w-auto object-contain transition duration-300 group-hover:scale-105`}
            />
          </article>
        ))}
      </div>
    </section>
  )
}
