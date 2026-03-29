"use client"

import Image from 'next/image'
import { useMemo } from 'react'

import gerdauLogo from '../public/gerdau.png'
import sinobrasLogo from '../public/sinobras.png'
import votorantimLogo from '../public/votorantim-metais.png'
import acerosLogo from '../public/aceros.png'

const clients = [
  { src: gerdauLogo, alt: 'Logo Gerdau' },
  { src: sinobrasLogo, alt: 'Logo Sinobras' },
  { src: votorantimLogo, alt: 'Logo Votorantim Metais' },
  { src: acerosLogo, alt: 'Logo Aceros' },
]

export function ClientList() {
  const marqueeClients = useMemo(() => [...clients, ...clients, ...clients], [])

  return (
    <section className="space-y-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">Prova de confianca</p>
        <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
          Empresas lideres ja operam com suporte tecnico da VF Brasil
        </h2>
        <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base">
          Relacao de longo prazo com foco em disponibilidade, qualidade e prazo.
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
            Projetos industriais criticos
          </span>
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
            Atendimento nacional
          </span>
          <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
            Suporte tecnico dedicado
          </span>
        </div>
      </div>

      <div className="clients-marquee">
        <div className="clients-marquee-track">
          {marqueeClients.map((client, index) => (
            <div
              key={`${client.alt}-${index}`}
              className="surface-panel group flex min-h-[132px] min-w-[270px] items-center justify-center rounded-2xl p-6 transition hover:-translate-y-1"
            >
              <Image
                src={client.src}
                alt={client.alt}
                className="h-auto max-h-20 w-auto object-contain transition duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


