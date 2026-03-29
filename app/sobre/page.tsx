import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Building2, Factory, ShieldCheck, TrendingUp } from 'lucide-react'

import { FloatingContactBar } from '@/components/FloatingContactBar'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { PeopleShowcase } from '@/components/PeopleShowcase'
import { RedirectTop } from '@/components/RedirectTop'
import { SectionReveal } from '@/components/SectionReveal'
import { companyLocations, companyProfile } from '@/data/company'
import marcosPhoto from '../../public/marcos.jpg'
import andrePhoto from '../../public/andre.jpg'

export const metadata: Metadata = {
  title: 'Sobre',
  description: 'Quem somos, como atuamos e onde estamos.',
}

const yearsInMarket = new Date().getFullYear() - companyProfile.foundedYear

const valuePillars = [
  {
    title: 'Execucao com padrao industrial',
    description: 'Projetos com foco em prazo, qualidade e previsibilidade operacional.',
    icon: Factory,
  },
  {
    title: 'Seguranca e conformidade',
    description: 'Atuacao com responsabilidade tecnica e controle de risco em campo.',
    icon: ShieldCheck,
  },
  {
    title: 'Melhoria de performance',
    description: 'Acoes orientadas por disponibilidade e reducao de parada.',
    icon: TrendingUp,
  },
] as const

const operationModel = [
  {
    step: '01',
    title: 'Diagnostico',
    description: 'Levantamento tecnico e prioridade por impacto operacional.',
  },
  {
    step: '02',
    title: 'Engenharia e execucao',
    description: 'Plano de acao com fabricacao, adequacao e controle de qualidade.',
  },
  {
    step: '03',
    title: 'Implantacao e suporte',
    description: 'Entrega assistida em campo para estabilizar a operacao.',
  },
] as const

const team = [
  {
    label: 'Coordenacao',
    name: 'Marcos Jose Dosi',
    role: 'Responsavel tecnico',
    image: marcosPhoto,
    linkedin: 'https://www.linkedin.com/in/marcos-dosi-94a6b9141/',
  },
  {
    label: 'Comercial',
    name: 'Andre Dosi',
    role: 'Relacionamento e propostas',
    image: andrePhoto,
    linkedin: companyProfile.linkedinCompanyUrl,
  },
] as const

export default function AboutPage() {
  return (
    <>
      <main id="conteudo-principal">
        <section className="bg-image relative overflow-hidden px-4 pb-24 pt-24 sm:px-6 sm:pt-28 lg:px-8 lg:pb-28">
          <Header />
          <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="max-w-3xl space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">Sobre nos</p>
              <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Engenharia industrial com foco em disponibilidade e resultado.
              </h1>
              <p className="text-base leading-8 text-slate-200 sm:text-lg">{companyProfile.overview}</p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/#contato"
                  className="focus-ring inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
                >
                  Solicitar proposta
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href={companyProfile.linkedinCompanyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring inline-flex rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  LinkedIn institucional
                </Link>
              </div>
            </div>

            <aside className="surface-panel rounded-3xl p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Resumo da empresa</p>
              <div className="mt-5 space-y-3 text-sm">
                <div className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <span className="text-slate-400">Industria</span>
                  <span className="text-right font-semibold text-white">{companyProfile.industry}</span>
                </div>
                <div className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <span className="text-slate-400">Fundacao</span>
                  <span className="font-semibold text-white">{companyProfile.foundedYear}</span>
                </div>
                <div className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <span className="text-slate-400">Experiencia</span>
                  <span className="font-semibold text-white">{yearsInMarket}+ anos</span>
                </div>
                <div className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  <span className="text-slate-400">Equipe</span>
                  <span className="font-semibold text-white">{companyProfile.companySize}</span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <SectionReveal>
          <section className="mx-auto w-full max-w-7xl px-4 pb-12 pt-16 sm:px-6 lg:px-8">
            <div className="grid gap-4 md:grid-cols-3">
              {valuePillars.map((pillar) => {
                const Icon = pillar.icon

                return (
                  <article key={pillar.title} className="surface-panel rounded-2xl p-5">
                    <span className="inline-flex rounded-lg border border-white/15 bg-white/10 p-2 text-amber-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h2 className="mt-4 text-lg font-semibold text-white">{pillar.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{pillar.description}</p>
                  </article>
                )
              })}
            </div>

            <div className="surface-panel mt-6 rounded-3xl p-8 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Metodo de atuacao</p>
              <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Fluxo tecnico da demanda ao resultado</h2>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {operationModel.map((item) => (
                  <article key={item.step} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">Etapa {item.step}</p>
                    <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </SectionReveal>

        <SectionReveal delayMs={40}>
          <PeopleShowcase people={team} />
        </SectionReveal>

        <SectionReveal delayMs={70}>
          <section className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
            <div className="surface-panel rounded-3xl p-8 sm:p-10">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Unidades</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Presenca em Sao Paulo</h2>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-200">
                  <Building2 className="h-4 w-4 text-amber-300" />
                  Atendimentos onsite
                </span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {companyLocations.map((location) => (
                  <article key={location.name} className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <h3 className="text-sm font-semibold text-white">{location.name}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {location.address}
                      <br />
                      {location.cityState} - CEP {location.zipCode}
                    </p>
                    <Link
                      href={location.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="focus-ring mt-3 inline-flex text-xs font-semibold uppercase tracking-[0.14em] text-amber-300 transition hover:text-amber-200"
                    >
                      Ver rota
                    </Link>
                  </article>
                ))}
              </div>
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
