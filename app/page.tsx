import type { Metadata } from 'next'
import Link from 'next/link'
import { BadgeCheck, CheckCircle2, Clock3, Factory, FileCheck2, Handshake, ShieldCheck } from 'lucide-react'

import { ClientList } from '@/components/Clients'
import { CompanyOverview } from '@/components/CompanyOverview'
import { FaqAccordion } from '@/components/FaqAccordion'
import { FloatingContactBar } from '@/components/FloatingContactBar'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { HeroStats } from '@/components/HeroStats'
import { OperationsCards } from '@/components/OperationsCards'
import { ProductsShowcase } from '@/components/ProductsShowcase'
import { RedirectTop } from '@/components/RedirectTop'
import { SectionReveal } from '@/components/SectionReveal'
import { ServicesHighlight } from '@/components/ServicesHighlights'
import Tabs from '@/components/Tabs'
import { companyProfile } from '@/data/company'

const yearsInMarket = new Date().getFullYear() - companyProfile.foundedYear
const sectionShell = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'

export const metadata: Metadata = {
  title: 'Home',
  description: 'VF Brasil: engenharia industrial para siderurgia com foco em produtividade, seguranca e prazo.',
}

const highlights = [
  { label: 'Fundada em', value: companyProfile.foundedYear, prefix: '', suffix: '' },
  { label: 'Anos de mercado', value: yearsInMarket, prefix: '', suffix: '+' },
  { label: 'Porte da equipe', value: 50, prefix: 'ate ', suffix: ' pessoas' },
]

const differentiators = [
  {
    icon: Clock3,
    title: 'Resposta rapida',
    description: 'Triagem tecnica e comercial com retorno objetivo para acelerar decisoes.',
  },
  {
    icon: Factory,
    title: 'Execucao confiavel',
    description: 'Padrao de engenharia aplicado a fabricacao, manutencao e suporte de campo.',
  },
  {
    icon: ShieldCheck,
    title: 'Foco em resultado',
    description: 'Planos orientados para reduzir paradas e elevar disponibilidade operacional.',
  },
]

const trustBadges = [
  'Fundada em 2015',
  'Equipe tecnica especializada',
  'Atendimento onsite e remoto',
]

const deliveryFlow = [
  {
    title: 'Diagnostico e escopo',
    description: 'Levantamento tecnico, riscos operacionais e definicao de prioridade por impacto.',
    icon: FileCheck2,
  },
  {
    title: 'Plano e execucao',
    description: 'Cronograma estruturado, controle de qualidade e acompanhamento de marcos de entrega.',
    icon: Factory,
  },
  {
    title: 'Validacao e continuidade',
    description: 'Comissionamento, medicao de performance e suporte para ganho sustentado.',
    icon: Handshake,
  },
]

export default function Home() {
  return (
    <>
      <main id="conteudo-principal">
        <section
          className="bg-image-plain relative min-h-[78vh] overflow-hidden px-4 pb-20 pt-16 sm:min-h-[84vh] sm:px-6 sm:pb-24 sm:pt-20 lg:px-8 lg:pb-28"
          style={{ backgroundImage: "url('/teste.jpg')" }}
        >
          <Header />
          <div className={`${sectionShell} hero-on-photo grid gap-7 pt-2 sm:gap-10 sm:pt-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end`}>
            <div className="max-w-3xl space-y-5 sm:space-y-7">
              <span className="hero-chip inline-flex rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em]">
                Engenharia industrial para siderurgia
              </span>
              <h1 className="hero-title max-w-3xl text-3xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
                Solucoes com confianca, qualidade e durabilidade.
              </h1>
              <p className="hero-copy max-w-2xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
                Projetamos e executamos engenharia reversa, fabricacao de maquinas e melhoria de processos para
                aumentar disponibilidade e reduzir paradas.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="#contato"
                  className="focus-ring inline-flex w-full items-center justify-center rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:bg-amber-400 sm:w-auto"
                >
                  Solicitar proposta
                </Link>
                <Link
                  href="#overview"
                  className="hero-ghost-button focus-ring inline-flex w-full items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition duration-300 sm:w-auto"
                >
                  Conhecer a empresa
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {trustBadges.map((badge) => (
                  <span
                    key={badge}
                    className="hero-badge inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
                  >
                    <BadgeCheck className="h-3.5 w-3.5 text-amber-300" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <HeroStats items={highlights} />
          </div>
        </section>

        <SectionReveal delayMs={20}>
          <section className={`${sectionShell} pb-12 pt-16`}>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">Diferenciais</p>
              <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Base tecnica para decisoes e execucao segura</h2>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {differentiators.map((item) => (
                <article key={item.title} className="surface-panel rounded-2xl p-5">
                  <span className="inline-flex rounded-lg border border-white/15 bg-white/10 p-2 text-amber-300">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">Diferencial</p>
                  <h3 className="mt-3 text-xl font-semibold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
                </article>
              ))}
            </div>
          </section>
        </SectionReveal>

        <SectionReveal>
          <CompanyOverview />
        </SectionReveal>

        <SectionReveal delayMs={40}>
          <section className={`${sectionShell} pb-12`}>
            <div className="surface-panel rounded-3xl p-8 sm:p-10">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">Metodo de entrega</p>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                  Processo claro do diagnostico ao resultado em campo
                </h2>
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {deliveryFlow.map((step) => (
                  <article key={step.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <span className="inline-flex rounded-lg border border-white/15 bg-white/10 p-2 text-amber-300">
                      <step.icon className="h-5 w-5" />
                    </span>
                    <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{step.description}</p>
                  </article>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {['Escopo tecnico definido', 'Prazos acompanhados', 'Resultados rastreaveis'].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-amber-300" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </SectionReveal>

        <SectionReveal delayMs={50}>
          <section className={`${sectionShell} pb-12 pt-2`}>
            <ServicesHighlight />
          </section>
        </SectionReveal>

        <SectionReveal delayMs={55}>
          <ProductsShowcase />
        </SectionReveal>

        <SectionReveal delayMs={60}>
          <OperationsCards />
        </SectionReveal>

        <SectionReveal delayMs={80}>
          <section className={`${sectionShell} pb-16`}>
            <ClientList />
          </section>
        </SectionReveal>

        <SectionReveal delayMs={100}>
          <section id="contato" className={`${sectionShell} pb-24`}>
            <div className="surface-panel rounded-3xl p-8 sm:p-10">
              <div className="mx-auto max-w-3xl text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">Fale com especialistas</p>
                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                  Atendimento tecnico e comercial
                </h2>
                <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base">
                  Envie seu desafio e retornaremos com direcionamento tecnico objetivo para sua operacao.
                </p>
              </div>
              <Tabs />
            </div>
          </section>
        </SectionReveal>

        <SectionReveal delayMs={120}>
          <FaqAccordion />
        </SectionReveal>
      </main>

      <RedirectTop />
      <FloatingContactBar />
      <Footer />
    </>
  )
}


