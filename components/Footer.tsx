"use client"

import Link from 'next/link'
import Image from 'next/image'
import { LinkedinLogo } from 'phosphor-react'
import { ArrowRight } from 'lucide-react'

import vfLogo from './../public/vflogo.png'
import { interpolate, type Locale } from '@/data/i18n'
import { buildWhatsappLink, companyLocations, companyProfile } from '@/data/company'

type FooterProps = {
  locale?: Locale
}

export function Footer({ locale = 'pt' }: FooterProps) {
  const copy: Record<
    Locale,
    {
      links: Array<{ name: string; href: string }>
      readyToAdvance: string
      pitch: string
      talkOnWhatsapp: string
      navigation: string
      contact: string
      units: string
      phone: string
      serviceModel: string
      whatsappSupport: string
      legal: string
      whatsappTemplate: string
      workplacePolicy: string
      servicesSummary: string
      viewRoute: string
      linkedinAria: string
    }
  > = {
    pt: {
      links: [
        { name: 'Inicio', href: '/' },
        { name: 'Empresa', href: '/#overview' },
        { name: 'Time', href: '/#time' },
        { name: 'Produtos', href: '/#produtos' },
        { name: 'Unidades', href: '/#unidades' },
        { name: 'Contato', href: '/#contato' },
      ],
      readyToAdvance: 'Pronto para avançar',
      pitch: 'Fale com nossa equipe e receba proposta técnica para sua operação.',
      talkOnWhatsapp: 'Falar no WhatsApp',
      navigation: 'Navegação',
      contact: 'Contato',
      units: 'Unidades',
      phone: 'Telefone',
      serviceModel: 'Modelo de atendimento',
      whatsappSupport: 'Atendimento via WhatsApp',
      legal: 'Soluções industriais para produtividade e confiabilidade operacional.',
      whatsappTemplate: 'Olá, gostaria de falar com a equipe da {brand}.',
      workplacePolicy: 'Presencial',
      servicesSummary:
        'Prestação de serviços em engenharia reversa, fabricação de máquinas e peças, dispositivos e suporte técnico para siderurgia.',
      viewRoute: 'Ver rota',
      linkedinAria: 'LinkedIn da VF Brasil',
    },
    en: {
      links: [
        { name: 'Home', href: '/' },
        { name: 'Company', href: '/#overview' },
        { name: 'Team', href: '/#time' },
        { name: 'Products', href: '/#produtos' },
        { name: 'Sites', href: '/#unidades' },
        { name: 'Contact', href: '/#contato' },
      ],
      readyToAdvance: 'Ready to move forward',
      pitch: 'Talk to our team and receive a technical proposal for your operation.',
      talkOnWhatsapp: 'Talk on WhatsApp',
      navigation: 'Navigation',
      contact: 'Contact',
      units: 'Sites',
      phone: 'Phone',
      serviceModel: 'Service model',
      whatsappSupport: 'WhatsApp support',
      legal: 'Industrial solutions for productivity and operational reliability.',
      whatsappTemplate: 'Hello, I would like to speak with the {brand} team.',
      workplacePolicy: 'On-site',
      servicesSummary:
        'Engineering services in reverse engineering, machine and part manufacturing, tooling and technical support for steelmaking.',
      viewRoute: 'View route',
      linkedinAria: 'VF Brasil LinkedIn',
    },
    es: {
      links: [
        { name: 'Inicio', href: '/' },
        { name: 'Empresa', href: '/#overview' },
        { name: 'Equipo', href: '/#time' },
        { name: 'Productos', href: '/#produtos' },
        { name: 'Unidades', href: '/#unidades' },
        { name: 'Contacto', href: '/#contato' },
      ],
      readyToAdvance: 'Listo para avanzar',
      pitch: 'Hable con nuestro equipo y reciba una propuesta tecnica para su operacion.',
      talkOnWhatsapp: 'Hablar por WhatsApp',
      navigation: 'Navegacion',
      contact: 'Contacto',
      units: 'Unidades',
      phone: 'Telefono',
      serviceModel: 'Modelo de atencion',
      whatsappSupport: 'Atencion por WhatsApp',
      legal: 'Soluciones industriales para productividad y confiabilidad operacional.',
      whatsappTemplate: 'Hola, me gustaria hablar con el equipo de {brand}.',
      workplacePolicy: 'Presencial',
      servicesSummary:
        'Servicios de ingenieria inversa, fabricacion de maquinas y piezas, dispositivos y soporte tecnico para siderurgia.',
      viewRoute: 'Ver ruta',
      linkedinAria: 'LinkedIn de VF Brasil',
    },
    fr: {
      links: [
        { name: 'Accueil', href: '/' },
        { name: 'Entreprise', href: '/#overview' },
        { name: 'Equipe', href: '/#time' },
        { name: 'Produits', href: '/#produtos' },
        { name: 'Unites', href: '/#unidades' },
        { name: 'Contact', href: '/#contato' },
      ],
      readyToAdvance: 'Pret a avancer',
      pitch: 'Parlez a notre equipe et recevez une proposition technique pour votre operation.',
      talkOnWhatsapp: 'Parler sur WhatsApp',
      navigation: 'Navigation',
      contact: 'Contact',
      units: 'Unites',
      phone: 'Telephone',
      serviceModel: 'Modele de service',
      whatsappSupport: 'Support WhatsApp',
      legal: 'Solutions industrielles pour productivite et fiabilite operationnelle.',
      whatsappTemplate: 'Bonjour, je souhaite parler avec l equipe de {brand}.',
      workplacePolicy: 'Presentiel',
      servicesSummary:
        'Services d ingenierie inverse, fabrication de machines et pieces, dispositifs et support technique pour la siderurgie.',
      viewRoute: 'Voir itineraire',
      linkedinAria: 'LinkedIn de VF Brasil',
    },
    it: {
      links: [
        { name: 'Inizio', href: '/' },
        { name: 'Azienda', href: '/#overview' },
        { name: 'Team', href: '/#time' },
        { name: 'Prodotti', href: '/#produtos' },
        { name: 'Unita', href: '/#unidades' },
        { name: 'Contatto', href: '/#contato' },
      ],
      readyToAdvance: 'Pronto ad avanzare',
      pitch: 'Parla con il nostro team e ricevi una proposta tecnica per la tua operazione.',
      talkOnWhatsapp: 'Parla su WhatsApp',
      navigation: 'Navigazione',
      contact: 'Contatto',
      units: 'Unita',
      phone: 'Telefono',
      serviceModel: 'Modello di servizio',
      whatsappSupport: 'Supporto WhatsApp',
      legal: 'Soluzioni industriali per produttivita e affidabilita operativa.',
      whatsappTemplate: 'Ciao, vorrei parlare con il team di {brand}.',
      workplacePolicy: 'In presenza',
      servicesSummary:
        'Servizi di ingegneria inversa, fabbricazione di macchine e parti, dispositivi e supporto tecnico per la siderurgia.',
      viewRoute: 'Vedi percorso',
      linkedinAria: 'LinkedIn di VF Brasil',
    },
  }

  const whatsappMessage = interpolate(copy[locale].whatsappTemplate, { brand: companyProfile.brandName })

  return (
    <footer className="theme-footer border-t border-white/10">
      <div className="vf-shell py-14">
        <div className="surface-panel mb-10 flex flex-col items-start justify-between gap-4 rounded-2xl p-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">{copy[locale].readyToAdvance}</p>
            <p className="mt-2 text-sm text-slate-300">{copy[locale].pitch}</p>
          </div>
          <Link
            href={buildWhatsappLink(whatsappMessage)}
            target="_blank"
            rel="noreferrer"
            className="focus-ring inline-flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
          >
            {copy[locale].talkOnWhatsapp}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-10 md:grid-cols-[1.1fr_0.8fr_1fr_1fr]">
          <div>
            <Link href="/" className="focus-ring inline-flex items-center">
              <Image src={vfLogo} alt="Logo da VF Brasil" className="h-11 w-auto" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">{copy[locale].servicesSummary}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">{copy[locale].navigation}</h3>
            <ul className="mt-4 space-y-3">
              {copy[locale].links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="focus-ring text-sm text-slate-300 transition hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">{copy[locale].contact}</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <p>{copy[locale].phone}: {companyProfile.phoneDisplay}</p>
              <p>{copy[locale].serviceModel}: {copy[locale].workplacePolicy}</p>
              <Link
                href={buildWhatsappLink(whatsappMessage)}
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-flex rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-amber-300 transition hover:bg-white/10"
              >
                {copy[locale].whatsappSupport}
              </Link>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <Link
                href={companyProfile.linkedinCompanyUrl}
                target="_blank"
                rel="noreferrer"
                className="focus-ring rounded-lg border border-white/15 bg-white/5 p-2 text-amber-300 transition hover:bg-white/10"
                aria-label={copy[locale].linkedinAria}
              >
                <LinkedinLogo className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">{copy[locale].units}</h3>
            <div className="mt-4 space-y-4">
              {companyLocations.map((location) => (
                <article key={location.name}>
                  <p className="text-sm font-semibold text-white">{location.name}</p>
                  <p className="mt-1 text-xs leading-6 text-slate-300">
                    {location.address}
                    <br />
                    {location.cityState} - CEP {location.zipCode}
                  </p>
                  <Link
                    href={location.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring mt-2 inline-flex text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-300 transition hover:text-amber-200"
                  >
                    {copy[locale].viewRoute}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-slate-400">
          (c) 2026 {companyProfile.legalName}. {copy[locale].legal}
        </div>
      </div>
    </footer>
  )
}



