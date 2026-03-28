import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Building2, Compass, Factory, ShieldCheck, TrendingUp, Workflow } from 'lucide-react'

import { FloatingContactBar } from '@/components/FloatingContactBar'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { RedirectTop } from '@/components/RedirectTop'
import { SectionReveal } from '@/components/SectionReveal'
import { buildWhatsappLink, companyLocations, companyProfile } from '@/data/company'
import marcosPhoto from '../../public/marcos.jpg'
import andrePhoto from '../../public/andre.jpg'

export const metadata: Metadata = {
  title: 'Sobre',
  description: 'Conheca o posicionamento institucional, a lideranca e o modelo de atuacao da VF Brasil.',
}

const yearsInMarket = new Date().getFullYear() - companyProfile.foundedYear

const team = [
  {
    name: 'Marcos Jose Dosi',
    role: 'Responsavel tecnico',
    image: marcosPhoto,
    linkedin: 'https://www.linkedin.com/in/marcos-dosi-94a6b9141/',
    bio: 'Lidera estrategia tecnica, validacao de engenharia e padroes de qualidade em projetos industriais criticos.',
    pillars: ['Engenharia reversa', 'Confiabilidade operacional', 'Padrao tecnico'],
  },
  {
    name: 'Andre Dosi',
    role: 'Gerente comercial',
    image: andrePhoto,
    linkedin: companyProfile.linkedinCompanyUrl,
    bio: 'Conduz relacionamento comercial e estruturacao de propostas alinhadas a prazo, escopo e performance da planta.',
    pillars: ['Negociacao tecnica', 'Relacao com cliente', 'Planejamento comercial'],
  },
]

const valuePillars = [
  {
    title: 'Excelencia operacional',
    description: 'Padrao tecnico rigoroso para aumentar disponibilidade de ativos e confiabilidade da planta.',
    icon: Factory,
  },
  {
    title: 'Engenharia aplicada',
    description: 'Projetos e solucoes desenvolvidos para o contexto real de operacoes siderurgicas no Brasil.',
    icon: Compass,
  },
  {
    title: 'Seguranca e conformidade',
    description: 'Atuacao com responsabilidade, foco em risco operacional e respeito a normas tecnicas.',
    icon: ShieldCheck,
  },
  {
    title: 'Performance sustentavel',
    description: 'Melhoria continua para elevar produtividade e gerar ganho consistente no longo prazo.',
    icon: TrendingUp,
  },
] as const

const operationModel = [
  {
    step: '01',
    title: 'Diagnostico tecnico',
    description: 'Mapeamento de criticidade, contexto operacional e oportunidades de ganho imediato.',
  },
  {
    step: '02',
    title: 'Engenharia e execucao',
    description: 'Definicao da solucao, fabricacao ou adequacao tecnica com controle de qualidade.',
  },
  {
    step: '03',
    title: 'Implantacao e suporte',
    description: 'Entrega assistida em campo, validacao de performance e acompanhamento dos resultados.',
  },
] as const

const governancePrinciples = [
  {
    title: 'Decisao orientada por dados',
    description: 'Priorizamos indicadores operacionais para definir a melhor estrategia tecnica e comercial.',
  },
  {
    title: 'Parceria de longo prazo',
    description: 'Cada projeto e tratado como uma construcao conjunta, com foco em resultado sustentavel.',
  },
  {
    title: 'Evolucao continua',
    description: 'Investimos em tecnologia, pessoas e melhoria de processos para elevar a competitividade industrial.',
  },
]

const milestones = [
  {
    year: '2015',
    title: 'Fundacao da VF Brasil',
    description: 'Inicio da operacao com foco em engenharia industrial e suporte ao setor siderurgico.',
  },
  {
    year: 'Expansao',
    title: 'Capacidade ampliada',
    description: 'Consolidacao de servicos de fabricacao, engenharia reversa e melhoria de processos.',
  },
  {
    year: 'Hoje',
    title: 'Atuacao orientada a performance',
    description: 'Projetos com foco em disponibilidade de ativos, prazo e seguranca operacional.',
  },
]

const strategicCommitments = [
  {
    title: 'Missao',
    description: 'Entregar solucoes de engenharia industrial com excelencia tecnica, seguranca e previsibilidade.',
  },
  {
    title: 'Visao',
    description: 'Ser referencia nacional em confiabilidade operacional para siderurgia e industrias de alta exigencia.',
  },
  {
    title: 'Compromisso',
    description: 'Construir relacoes de longo prazo com etica, transparencia e foco no resultado do cliente.',
  },
]

export default function AboutPage() {
  return (
    <>
      <main id="conteudo-principal">
        <section className="bg-image relative overflow-hidden px-4 pb-24 pt-30 sm:px-6 lg:px-8 lg:pb-28">
          <Header />
          <div className="mx-auto grid w-full max-w-7xl gap-10 pt-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="max-w-3xl space-y-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">Sobre nos</p>
              <h1 className="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Estrutura tecnica para sustentar operacoes industriais de alta exigencia.
              </h1>
              <p className="text-base leading-8 text-slate-200 sm:text-lg">{companyProfile.overview}</p>
              <p className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                A VF Brasil integra engenharia, fabricacao e suporte em campo para entregar previsibilidade de prazo,
                desempenho operacional e relacionamento de longo prazo.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/#contato"
                  className="focus-ring inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
                >
                  Falar com a equipe
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
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Company profile</p>
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
                  <span className="text-slate-400">Porte da equipe</span>
                  <span className="font-semibold text-white">{companyProfile.companySize}</span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <SectionReveal>
          <section className="mx-auto w-full max-w-7xl px-4 pb-12 pt-16 sm:px-6 lg:px-8">
            <div className="surface-panel rounded-3xl p-8 sm:p-10">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">Trajetoria</p>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Uma evolucao tecnica orientada por resultado</h2>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {milestones.map((milestone) => (
                  <article key={milestone.title} className="rounded-xl border border-white/10 bg-white/5 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">{milestone.year}</p>
                    <h3 className="mt-3 text-lg font-semibold text-white">{milestone.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{milestone.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </SectionReveal>

        <SectionReveal delayMs={20}>
          <section className="mx-auto w-full max-w-7xl px-4 pb-12 pt-16 sm:px-6 lg:px-8">
            <div className="mb-8 grid gap-4 md:grid-cols-3">
              {strategicCommitments.map((item) => (
                <article key={item.title} className="surface-panel rounded-2xl p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">{item.title}</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
                </article>
              ))}
            </div>

            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">Proposta de valor</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Base institucional solida para projetos criticos</h2>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {valuePillars.map((pillar) => {
                const Icon = pillar.icon

                return (
                  <article key={pillar.title} className="surface-panel rounded-2xl p-5">
                    <span className="inline-flex rounded-lg border border-white/15 bg-white/10 p-2 text-amber-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-lg font-semibold text-white">{pillar.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{pillar.description}</p>
                  </article>
                )
              })}
            </div>
          </section>
        </SectionReveal>

        <SectionReveal delayMs={60}>
          <section className="mx-auto w-full max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
            <div className="surface-panel rounded-3xl p-8 sm:p-10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Modelo de atuacao</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Fluxo tecnico objetivo do diagnostico ao resultado</h2>
                </div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-200">
                  <Workflow className="h-4 w-4 text-amber-300" />
                  Operacao integrada
                </span>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {operationModel.map((item) => (
                  <article key={item.step} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">Etapa {item.step}</p>
                    <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
                  </article>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-[#0a1019]/75 p-5">
                <p className="text-sm leading-7 text-slate-300">{companyProfile.servicesSummary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {companyProfile.specialties.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </SectionReveal>

        <SectionReveal delayMs={90}>
          <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">Lideranca</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Quem conduz nossa operacao</h2>
              <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base">
                Lideranca com foco em decisao tecnica, previsibilidade de entrega e relacao proxima com o cliente.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {governancePrinciples.map((principle) => (
                <article key={principle.title} className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-amber-300">{principle.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{principle.description}</p>
                </article>
              ))}
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {team.map((person) => (
                <article key={person.name} className="surface-panel overflow-hidden rounded-2xl">
                  <Image
                    src={person.image}
                    alt={`Foto de ${person.name}`}
                    className="h-[500px] w-full bg-[#0b101a] object-contain"
                  />
                  <div className="space-y-3 p-6">
                    <h3 className="text-2xl font-semibold text-white">{person.name}</h3>
                    <p className="text-sm text-amber-300">{person.role}</p>
                    <p className="text-sm leading-7 text-slate-300">{person.bio}</p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {person.pillars.map((pillar) => (
                        <span
                          key={pillar}
                          className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200"
                        >
                          {pillar}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Link
                        href={buildWhatsappLink(`Ola, gostaria de falar com ${person.name} da ${companyProfile.brandName}.`)}
                        target="_blank"
                        rel="noreferrer"
                        className="focus-ring inline-flex rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400"
                      >
                        Chamar no WhatsApp
                      </Link>
                      <Link
                        href={person.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="focus-ring inline-flex rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
                      >
                        Ver perfil no LinkedIn
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </SectionReveal>

        <SectionReveal delayMs={120}>
          <section className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
            <div className="surface-panel rounded-3xl p-8 sm:p-10">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Presenca operacional</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Unidades estrategicas em Sao Paulo</h2>
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

              <div className="mt-6 rounded-xl border border-white/15 bg-white/5 p-3 sm:p-4">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-300">Mapa de localizacao</p>
                <div className="overflow-hidden rounded-lg border border-white/10">
                  <iframe
                    src="https://www.google.com/maps/d/embed?mid=1xWXr5wQn_rYW2_he2zYLtlbnY1GFZiM&ehbc=2E312F&noprof=1"
                    width="640"
                    height="480"
                    title="Mapa de localizacao VF Brasil"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-[420px] w-full"
                  />
                </div>
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


