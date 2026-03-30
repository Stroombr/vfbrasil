"use client"

import Image from 'next/image'
import type { Locale } from '@/data/i18n'

import gerdauLogo from '../public/gerdau.png'
import sinobrasLogo from '../public/sinobras.png'
import votorantimLogo from '../public/votorantim-metais.png'
import acerosLogo from '../public/aceros.png'
import ironbergLogo from '../public/ironberg.png'
import gavioesLogo from '../public/gaviões.png'
import petrobrasLogo from '../public/br-petrobras.png'

const clients = [
  { src: petrobrasLogo, alt: 'Logo Petrobras', imageClassName: 'h-auto max-h-22 sm:max-h-30', relevance: 100 },
  { src: gerdauLogo, alt: 'Logo Gerdau', imageClassName: 'h-auto max-h-22 sm:max-h-30', relevance: 95 },
  { src: votorantimLogo, alt: 'Logo Votorantim Metais', imageClassName: 'h-auto max-h-20 sm:max-h-30', relevance: 90 },
  { src: sinobrasLogo, alt: 'Logo Sinobras', imageClassName: 'h-auto max-h-22 sm:max-h-30', relevance: 85 },
  { src: acerosLogo, alt: 'Logo Aceros', imageClassName: 'h-auto max-h-22 sm:max-h-30', relevance: 80 },
  { src: ironbergLogo, alt: 'Logo Ironberg', imageClassName: 'h-auto max-h-22 sm:max-h-30', relevance: 75 },
  { src: gavioesLogo, alt: 'Logo Gaviões', imageClassName: 'h-auto max-h-22 sm:max-h-30', relevance: 70 },
].sort((left, right) => right.relevance - left.relevance)

type ClientListProps = {
  locale?: Locale
}

export function ClientList({ locale = 'pt' }: ClientListProps) {
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

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
        {clients.map((client) => (
          <article
            key={client.alt}
            className="surface-panel group flex min-h-[150px] items-center justify-center rounded-2xl px-6 py-8 transition hover:-translate-y-1"
          >
            <Image
              src={client.src}
              alt={client.alt}
              className={`${client.imageClassName} w-auto object-contain transition duration-300 group-hover:scale-105`}
            />
          </article>
        ))}
      </div>
    </section>
  )
}
