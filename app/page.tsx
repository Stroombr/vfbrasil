import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Clock3, Factory, ShieldCheck, type LucideIcon } from 'lucide-react'

import { ClientList } from '@/components/Clients'
import { FloatingContactBar } from '@/components/FloatingContactBar'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { PeopleShowcase } from '@/components/PeopleShowcase'
import { ProductsShowcase } from '@/components/ProductsShowcase'
import { RedirectTop } from '@/components/RedirectTop'
import { SectionReveal } from '@/components/SectionReveal'
import Tabs from '@/components/Tabs'
import { companyLocations, companyProfile } from '@/data/company'
import { type Locale, interpolate } from '@/data/i18n'
import { getRequestLocale } from '@/data/i18n.server'
import andrePhoto from '../public/andre.jpg'
import marcosPhoto from '../public/marcos.jpg'

const yearsInMarket = new Date().getFullYear() - companyProfile.foundedYear
const specialtyTargets = ['#produtos', '#produtos', '#contato', '#overview'] as const

export const metadata: Metadata = {
  title: 'Soluções industriais para siderurgia',
  description: 'Engenharia industrial para reduzir paradas e aumentar disponibilidade com prazo e qualidade.',
}

type HomeCopy = {
  heroChip: string
  heroTitle: string
  heroDescription: string
  requestQuote: string
  viewSolutions: string
  keyNumbers: [string, string]
  keyValues: [string, string]
  whoWeAre: string
  whoWeAreTitle: string
  companyOverview: string
  specialties: string[]
  differentiators: Array<{ icon: LucideIcon; title: string; description: string }>
  contactLabel: string
  contactTitle: string
  contactDescription: string
}

type TeamPerson = {
  label: string
  name: string
  role: string
  image: typeof marcosPhoto
  linkedin: string
}

type UnitsCopy = {
  unitsEyebrow: string
  unitsTitle: string
  onsiteVisits: string
  viewRoute: string
}

const unitPhotos = ['/teste.jpg', '/teste.jpg'] as const

function getTeamPeople(locale: Locale): TeamPerson[] {
  const byLocale: Record<Locale, TeamPerson[]> = {
    pt: [
      {
        label: 'Coordenação',
        name: 'Marcos José Dosi',
        role: 'Responsável técnico',
        image: marcosPhoto,
        linkedin: 'https://www.linkedin.com/in/marcos-dosi-94a6b9141/',
      },
      {
        label: 'Comercial',
        name: 'André Dosi',
        role: 'Relacionamento e propostas',
        image: andrePhoto,
        linkedin: companyProfile.linkedinCompanyUrl,
      },
    ],
    en: [
      {
        label: 'Coordination',
        name: 'Marcos José Dosi',
        role: 'Technical lead',
        image: marcosPhoto,
        linkedin: 'https://www.linkedin.com/in/marcos-dosi-94a6b9141/',
      },
      {
        label: 'Sales',
        name: 'André Dosi',
        role: 'Client relationship and proposals',
        image: andrePhoto,
        linkedin: companyProfile.linkedinCompanyUrl,
      },
    ],
    es: [
      {
        label: 'Coordinacion',
        name: 'Marcos José Dosi',
        role: 'Responsable tecnico',
        image: marcosPhoto,
        linkedin: 'https://www.linkedin.com/in/marcos-dosi-94a6b9141/',
      },
      {
        label: 'Comercial',
        name: 'André Dosi',
        role: 'Relacion y propuestas',
        image: andrePhoto,
        linkedin: companyProfile.linkedinCompanyUrl,
      },
    ],
    fr: [
      {
        label: 'Coordination',
        name: 'Marcos José Dosi',
        role: 'Responsable technique',
        image: marcosPhoto,
        linkedin: 'https://www.linkedin.com/in/marcos-dosi-94a6b9141/',
      },
      {
        label: 'Commercial',
        name: 'André Dosi',
        role: 'Relation client et propositions',
        image: andrePhoto,
        linkedin: companyProfile.linkedinCompanyUrl,
      },
    ],
    it: [
      {
        label: 'Coordinamento',
        name: 'Marcos José Dosi',
        role: 'Responsabile tecnico',
        image: marcosPhoto,
        linkedin: 'https://www.linkedin.com/in/marcos-dosi-94a6b9141/',
      },
      {
        label: 'Commerciale',
        name: 'André Dosi',
        role: 'Relazioni e proposte',
        image: andrePhoto,
        linkedin: companyProfile.linkedinCompanyUrl,
      },
    ],
  }

  return byLocale[locale] ?? byLocale.pt
}

function getUnitsCopy(locale: Locale): UnitsCopy {
  const byLocale: Record<Locale, UnitsCopy> = {
    pt: {
      unitsEyebrow: 'Unidades',
      unitsTitle: 'Presença em São Paulo',
      onsiteVisits: 'Atendimentos on-site',
      viewRoute: 'Ver rota',
    },
    en: {
      unitsEyebrow: 'Sites',
      unitsTitle: 'Presence in Sao Paulo',
      onsiteVisits: 'On-site service',
      viewRoute: 'View route',
    },
    es: {
      unitsEyebrow: 'Unidades',
      unitsTitle: 'Presencia en Sao Paulo',
      onsiteVisits: 'Atenciones presenciales',
      viewRoute: 'Ver ruta',
    },
    fr: {
      unitsEyebrow: 'Unites',
      unitsTitle: 'Presence a Sao Paulo',
      onsiteVisits: 'Interventions sur site',
      viewRoute: 'Voir itineraire',
    },
    it: {
      unitsEyebrow: 'Unita',
      unitsTitle: 'Presenza a San Paolo',
      onsiteVisits: 'Interventi onsite',
      viewRoute: 'Vedi percorso',
    },
  }

  return byLocale[locale] ?? byLocale.pt
}

function getHomeCopy(locale: Locale) {
  const byLocale: Record<Locale, HomeCopy> = {
    pt: {
      heroChip: 'Engenharia industrial VF Brasil',
      heroTitle: 'Sua operação com confiança e durabilidade',
      heroDescription:
        'Engenharia e fabricação para siderurgia com execução objetiva, previsível e foco direto em disponibilidade.',
      requestQuote: 'Solicitar proposta',
      viewSolutions: 'Ver soluções',
      keyNumbers: ['Anos de mercado', 'Atendimento'],
      keyValues: ['{years}+', 'Internacional'],
      whoWeAre: 'Quem somos',
      whoWeAreTitle: 'Estrutura técnica para entregar rápido e certo.',
      companyOverview:
        'A VF Brasil atua no setor siderúrgico com foco em desempenho operacional, qualidade técnica e desenvolvimento sustentável.',
      specialties: [
        'Fabricação de máquinas',
        'Engenharia reversa',
        'Consultoria',
        'Melhoria de processos industriais',
      ],
      differentiators: [
        { icon: Clock3, title: 'Resposta técnica rápida', description: 'Direcionamento inicial claro para acelerar decisão.' },
        { icon: Factory, title: 'Execução com padrão', description: 'Engenharia, fabricação e campo com controle de qualidade.' },
        { icon: ShieldCheck, title: 'Foco em disponibilidade', description: 'Planos para reduzir parada e risco operacional.' },
      ],
      contactLabel: 'Contato',
      contactTitle: 'Solicite sua proposta com atendimento técnico direto',
      contactDescription: 'Envie seu desafio e prazo. Retornamos com encaminhamento objetivo.',
    },
    en: {
      heroChip: 'VF Brasil industrial engineering',
      heroTitle: 'Your operation with confidence and durability.',
      heroDescription:
        'Engineering and manufacturing for steelmaking with objective execution, predictability and direct focus on availability.',
      requestQuote: 'Request a quote',
      viewSolutions: 'View solutions',
      keyNumbers: ['Years in market', 'Coverage'],
      keyValues: ['{years}+', 'International'],
      whoWeAre: 'Who we are',
      whoWeAreTitle: 'Technical structure to deliver fast and right.',
      companyOverview:
        'VF Brasil operates in the steel sector with a focus on operational performance, technical quality and sustainable development.',
      specialties: ['Machine manufacturing', 'Reverse engineering', 'Consulting', 'Industrial process improvement'],
      differentiators: [
        { icon: Clock3, title: 'Fast technical response', description: 'Clear initial guidance to speed up decision-making.' },
        { icon: Factory, title: 'Execution with standards', description: 'Engineering, manufacturing and field work with quality control.' },
        { icon: ShieldCheck, title: 'Availability focus', description: 'Plans to reduce downtime and operational risk.' },
      ],
      contactLabel: 'Contact',
      contactTitle: 'Request your quote with direct technical support',
      contactDescription: 'Send your challenge and timeline. We will return with objective guidance.',
    },
    es: {
      heroChip: 'Ingenieria industrial VF Brasil',
      heroTitle: 'Su operación con confianza y durabilidad.',
      heroDescription:
        'Ingenieria y fabricacion para siderurgia con ejecucion objetiva, previsible y foco directo en disponibilidad.',
      requestQuote: 'Solicitar propuesta',
      viewSolutions: 'Ver soluciones',
      keyNumbers: ['Anos en el mercado', 'Cobertura'],
      keyValues: ['{years}+', 'Internacional'],
      whoWeAre: 'Quienes somos',
      whoWeAreTitle: 'Estructura tecnica para entregar rapido y bien.',
      companyOverview:
        'VF Brasil actua en el sector siderurgico con foco en desempeno operativo, calidad tecnica y desarrollo sostenible.',
      specialties: ['Fabricacion de maquinas', 'Ingenieria inversa', 'Consultoria', 'Mejora de procesos industriales'],
      differentiators: [
        { icon: Clock3, title: 'Respuesta tecnica rapida', description: 'Direccion inicial clara para acelerar la decision.' },
        { icon: Factory, title: 'Ejecucion con estandar', description: 'Ingenieria, fabricacion y campo con control de calidad.' },
        { icon: ShieldCheck, title: 'Foco en disponibilidad', description: 'Planes para reducir paradas y riesgos operativos.' },
      ],
      contactLabel: 'Contacto',
      contactTitle: 'Solicite su propuesta con atencion tecnica directa',
      contactDescription: 'Envie su desafio y plazo. Volvemos con orientacion objetiva.',
    },
    fr: {
      heroChip: 'Ingenierie industrielle VF Brasil',
      heroTitle: 'Votre opération avec confiance et durabilité.',
      heroDescription:
        'Ingenierie et fabrication pour la siderurgie avec execution objective, previsible et focus direct sur la disponibilite.',
      requestQuote: 'Demander un devis',
      viewSolutions: 'Voir les solutions',
      keyNumbers: ['Annees de marche', 'Couverture'],
      keyValues: ['{years}+', 'International'],
      whoWeAre: 'Qui sommes-nous',
      whoWeAreTitle: 'Structure technique pour livrer vite et bien.',
      companyOverview:
        'VF Brasil opere dans le secteur siderurgique avec un focus sur la performance operationnelle, la qualite technique et le developpement durable.',
      specialties: ['Fabrication de machines', 'Ingenierie inverse', 'Conseil', 'Amelioration des processus industriels'],
      differentiators: [
        { icon: Clock3, title: 'Reponse technique rapide', description: 'Orientation initiale claire pour accelerer la decision.' },
        { icon: Factory, title: 'Execution avec standard', description: 'Ingenierie, fabrication et terrain avec controle qualite.' },
        { icon: ShieldCheck, title: 'Focus disponibilite', description: 'Plans pour reduire les arrets et le risque operationnel.' },
      ],
      contactLabel: 'Contact',
      contactTitle: 'Demandez votre devis avec un support technique direct',
      contactDescription: 'Envoyez votre defi et delai. Nous revenons avec une orientation objective.',
    },
    it: {
      heroChip: 'Ingegneria industriale VF Brasil',
      heroTitle: 'La tua operazione con fiducia e durata.',
      heroDescription:
        'Ingegneria e fabbricazione per la siderurgia con esecuzione oggettiva, prevedibile e focus diretto sulla disponibilita.',
      requestQuote: 'Richiedi preventivo',
      viewSolutions: 'Vedi soluzioni',
      keyNumbers: ['Anni di mercato', 'Copertura'],
      keyValues: ['{years}+', 'Internazionale'],
      whoWeAre: 'Chi siamo',
      whoWeAreTitle: 'Struttura tecnica per consegnare in modo rapido e corretto.',
      companyOverview:
        'VF Brasil opera nel settore siderurgico con focus su performance operativa, qualita tecnica e sviluppo sostenibile.',
      specialties: ['Fabbricazione di macchine', 'Ingegneria inversa', 'Consulenza', 'Miglioramento dei processi industriali'],
      differentiators: [
        { icon: Clock3, title: 'Risposta tecnica rapida', description: 'Orientamento iniziale chiaro per accelerare la decisione.' },
        { icon: Factory, title: 'Esecuzione con standard', description: 'Ingegneria, fabbricazione e campo con controllo qualita.' },
        { icon: ShieldCheck, title: 'Focus sulla disponibilita', description: 'Piani per ridurre fermate e rischio operativo.' },
      ],
      contactLabel: 'Contatto',
      contactTitle: 'Richiedi il tuo preventivo con supporto tecnico diretto',
      contactDescription: 'Invia la tua sfida e i tempi. Ti rispondiamo con orientamento oggettivo.',
    },
  }

  return byLocale[locale] ?? byLocale.pt
}

export default async function Home() {
  const locale = await getRequestLocale()
  const copy = getHomeCopy(locale)
  const teamPeople = getTeamPeople(locale)
  const unitsCopy = getUnitsCopy(locale)
  const [firstLabel, secondLabel] = copy.keyNumbers
  const [firstValueTemplate, secondValueTemplate] = copy.keyValues
  const keyNumbers = [
    { label: firstLabel, value: interpolate(firstValueTemplate, { years: `${yearsInMarket}` }) },
    { label: secondLabel, value: interpolate(secondValueTemplate, { years: `${yearsInMarket}` }) },
  ]

  return (
    <>
      <main id="conteudo-principal">
        <section className="clean-hero hero-on-photo relative overflow-hidden px-4 pb-20 pt-24 sm:px-6 sm:pb-24 sm:pt-28 lg:px-8 lg:pb-28">
          <div aria-hidden className="absolute inset-0">
            <Image src="/home-bg.jpg" alt="" fill priority className="object-cover object-center" sizes="100vw" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(4,6,10,0.78)_0%,rgba(4,6,10,0.52)_38%,rgba(4,6,10,0.36)_62%,rgba(4,6,10,0.74)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(110%_75%_at_50%_0%,rgba(4,6,10,0.1),rgba(4,6,10,0.66))]" />
          </div>

          <div className="relative z-20">
            <Header locale={locale} />
          </div>
          <div className="vf-shell hero-content relative z-10 pt-4 sm:pt-8">
            <div className="max-w-5xl space-y-7">
              <span className="hero-chip inline-flex rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em]">
                {copy.heroChip}
              </span>

              <h1 className="hero-title text-4xl font-semibold leading-[1.04] sm:text-6xl lg:text-7xl">
                {copy.heroTitle}
              </h1>

              <p className="hero-copy max-w-2xl text-base leading-7 sm:text-lg sm:leading-8">
                {copy.heroDescription}
              </p>

              <div className="flex flex-wrap gap-2">
                {copy.specialties.slice(0, 3).map((item) => (
                  <span
                    key={`hero-specialty-${item}`}
                    className="rounded-full border border-white/20 bg-white/5 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-100"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="#contato"
                  className="focus-ring inline-flex w-full items-center justify-center rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-950 transition duration-300 hover:bg-amber-400 sm:w-auto"
                >
                  {copy.requestQuote}
                </Link>
                <Link
                  href="#produtos"
                  className="focus-ring inline-flex w-full items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition duration-300 hover:bg-white/10 sm:w-auto"
                >
                  {copy.viewSolutions}
                </Link>
              </div>

              <div className="grid gap-3 border-t border-white/15 pt-6 sm:grid-cols-2">
                {keyNumbers.map((item) => (
                  <article key={item.label} className="rounded-2xl border border-white/15 bg-white/5 px-4 py-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-300">{item.label}</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{item.value}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <SectionReveal delayMs={20}>
          <section id="overview" className="vf-shell py-16 sm:py-20">
            <div className="grid items-start gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="vf-heading-left">
                <p className="vf-eyebrow">{copy.whoWeAre}</p>
                <h2 className="vf-title sm:text-5xl">{copy.whoWeAreTitle}</h2>
                <p className="vf-copy max-w-2xl">{copy.companyOverview}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {copy.specialties.map((item, index) => (
                  <Link
                    key={item}
                    href={specialtyTargets[index] ?? '#produtos'}
                    className="focus-ring group vf-panel-soft flex items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-slate-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-amber-300/35 hover:bg-white/10 active:scale-[0.995]"
                    aria-label={item}
                  >
                    <span className="inline-flex items-center gap-3">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-white/5 text-[10px] font-semibold text-amber-300">
                        {index + 1}
                      </span>
                      <span>{item}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-amber-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </SectionReveal>

        <SectionReveal delayMs={40}>
          <PeopleShowcase id="time" locale={locale} people={teamPeople} />
        </SectionReveal>

        <SectionReveal delayMs={50}>
          <ProductsShowcase locale={locale} />
        </SectionReveal>

        <SectionReveal delayMs={55}>
          <section className="vf-shell pb-16">
            <ClientList locale={locale} />
          </section>
        </SectionReveal>

        <SectionReveal delayMs={58}>
          <section id="unidades" className="vf-shell pb-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="vf-heading-left">
                <p className="vf-eyebrow">{unitsCopy.unitsEyebrow}</p>
                <h2 className="vf-title sm:text-4xl">{unitsCopy.unitsTitle}</h2>
              </div>
              <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-200">
                {unitsCopy.onsiteVisits}
              </span>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {companyLocations.map((location, index) => {
                const locationTag = location.name.split('-')[0]?.trim() || location.name

                return (
                  <article
                    key={location.name}
                    className="unit-card group overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative h-56 overflow-hidden sm:h-64">
                      <Image
                        src={unitPhotos[index % unitPhotos.length]}
                        alt={`${location.name} - ${location.cityState}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="unit-media-overlay absolute inset-0" />
                      <span className="unit-media-tag absolute left-4 top-4 inline-flex rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]">
                        {locationTag}
                      </span>
                    </div>

                    <div className="space-y-3 p-5 sm:p-6">
                      <h3 className="text-lg font-semibold text-white">{location.name}</h3>
                      <p className="text-sm leading-6 text-slate-300">
                        {location.address}
                        <br />
                        {location.cityState} - CEP {location.zipCode}
                      </p>
                      <Link
                        href={location.mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="focus-ring inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-amber-300 transition hover:text-amber-200"
                      >
                        {unitsCopy.viewRoute}
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
        </SectionReveal>

        <SectionReveal delayMs={60}>
          <section id="contato" className="vf-shell pb-24">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div className="space-y-6 lg:sticky lg:top-28">
                <div className="vf-heading-left">
                  <p className="vf-eyebrow">{copy.contactLabel}</p>
                  <h2 className="vf-title sm:text-4xl">{copy.contactTitle}</h2>
                  <p className="vf-copy">{copy.contactDescription}</p>
                </div>

              </div>
              <Tabs locale={locale} className="mt-0 max-w-none" />
            </div>
          </section>
        </SectionReveal>
      </main>

      <RedirectTop locale={locale} />
      <FloatingContactBar locale={locale} />
      <Footer locale={locale} />
    </>
  )
}



