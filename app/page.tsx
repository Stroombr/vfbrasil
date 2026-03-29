import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock3, Factory, ShieldCheck } from 'lucide-react'

import { ClientList } from '@/components/Clients'
import { FloatingContactBar } from '@/components/FloatingContactBar'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { ProductsShowcase } from '@/components/ProductsShowcase'
import { RedirectTop } from '@/components/RedirectTop'
import { SectionReveal } from '@/components/SectionReveal'
import Tabs from '@/components/Tabs'
import { companyProfile } from '@/data/company'

const yearsInMarket = new Date().getFullYear() - companyProfile.foundedYear
const sectionShell = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'

export const metadata: Metadata = {
  title: 'Solucoes industriais para siderurgia',
  description: 'Engenharia industrial para reduzir paradas e aumentar disponibilidade com prazo e qualidade.',
}

const keyNumbers = [
  { label: 'Anos de mercado', value: `${yearsInMarket}+` },
  { label: 'Equipe', value: '11-50' },
  { label: 'Atendimento', value: 'Internacional' },
]

const differentiators = [
  {
    icon: Clock3,
    title: 'Resposta tecnica rapida',
    description: 'Direcionamento inicial claro para acelerar decisao.',
  },
  {
    icon: Factory,
    title: 'Execucao com padrao',
    description: 'Engenharia, fabricacao e campo com controle de qualidade.',
  },
  {
    icon: ShieldCheck,
    title: 'Foco em disponibilidade',
    description: 'Planos para reduzir parada e risco operacional.',
  },
]

export default function Home() {
  return (
    <>
      <main id="conteudo-principal">
        <section className="clean-hero relative overflow-hidden px-4 pb-20 pt-24 sm:px-6 sm:pb-24 sm:pt-28 lg:px-8 lg:pb-28">
          <Header />

          <div className={`${sectionShell} relative z-10 pt-4 sm:pt-8`}>
            <div className="max-w-5xl space-y-7">
              <span className="hero-chip inline-flex rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em]">
                Engenharia industrial VF Brasil
              </span>

              <h1 className="hero-title text-4xl font-semibold leading-[1.04] text-white sm:text-6xl lg:text-7xl">
                Performance industrial com precisao e velocidade.
              </h1>

              <p className="max-w-2xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
                Engenharia e fabricacao para siderurgia com execucao objetiva, previsivel e foco direto em disponibilidade.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="#contato"
                  className="focus-ring inline-flex w-full items-center justify-center rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:bg-amber-400 sm:w-auto"
                >
                  Solicitar proposta
                </Link>
                <Link
                  href="#produtos"
                  className="focus-ring inline-flex w-full items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition duration-300 hover:bg-white/10 sm:w-auto"
                >
                  Ver solucoes
                </Link>
              </div>

              <div className="grid gap-3 border-t border-white/15 pt-6 sm:grid-cols-3">
                {keyNumbers.map((item) => (
                  <article key={item.label} className="rounded-xl px-2 py-2">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300">{item.label}</p>
                    <p className="mt-1 text-2xl font-semibold text-white">{item.value}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <SectionReveal delayMs={20}>
          <section id="overview" className={`${sectionShell} py-16 sm:py-20`}>
            <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">Quem somos</p>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-5xl">Estrutura tecnica para entregar rapido e certo.</h2>
                <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">{companyProfile.overview}</p>
              </div>

              <div className="space-y-3">
                {companyProfile.specialties.map((item) => (
                  <p key={item} className="rounded-xl border border-white/10 px-4 py-3 text-sm text-slate-200">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </section>
        </SectionReveal>

        <SectionReveal delayMs={30}>
          <section className={`${sectionShell} pb-14 sm:pb-16`}>
            <div className="grid gap-4 md:grid-cols-3">
              {differentiators.map((item) => (
                <article key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <span className="inline-flex rounded-lg border border-white/15 bg-white/10 p-2 text-amber-300">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
                </article>
              ))}
            </div>
          </section>
        </SectionReveal>

        <SectionReveal delayMs={40}>
          <ProductsShowcase />
        </SectionReveal>

        <SectionReveal delayMs={50}>
          <section className={`${sectionShell} pb-16`}>
            <ClientList />
          </section>
        </SectionReveal>

        <SectionReveal delayMs={60}>
          <section id="contato" className={`${sectionShell} pb-24`}>
            <div className="rounded-3xl border border-white/15 bg-white/[0.02] p-8 sm:p-10">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">Contato</p>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                  Solicite sua proposta com atendimento tecnico direto
                </h2>
                <p className="mt-4 text-sm leading-7 text-slate-300 sm:text-base">
                  Envie seu desafio e prazo. Retornamos com encaminhamento objetivo.
                </p>
              </div>
              <Tabs />
            </div>
          </section>
        </SectionReveal>
      </main>

      <RedirectTop />
      <FloatingContactBar />
      <Footer />
    </>
  )
}
