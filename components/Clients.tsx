import Image from 'next/image'

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
  return (
    <section className="space-y-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">Confianca de mercado</p>
        <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
          Empresas lideres confiam na engenharia da VF Brasil
        </h2>
        <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base">
          Atuamos com padrao tecnico elevado em projetos e manutencoes de diferentes segmentos industriais.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {clients.map((client) => (
          <div
            key={client.alt}
            className="surface-panel group flex min-h-[108px] items-center justify-center rounded-2xl p-4 transition hover:-translate-y-1"
          >
            <Image
              src={client.src}
              alt={client.alt}
              className="h-auto max-h-12 w-auto object-contain opacity-85 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0"
            />
          </div>
        ))}
      </div>
    </section>
  )
}


