"use client"

import Link from 'next/link'
import Image from 'next/image'
import { LinkedinLogo } from 'phosphor-react'
import { ArrowRight } from 'lucide-react'

import vfLogo from './../public/vflogo.png'
import { buildWhatsappLink, companyLocations, companyProfile } from '@/data/company'

const institutionalLinks = [
  { name: 'Empresa', href: '/#overview' },
  { name: 'Solucoes', href: '/#servicos' },
  { name: 'Produtos', href: '/#produtos' },
  { name: 'Cenarios', href: '/#cards' },
  { name: 'FAQ', href: '/#faq' },
  { name: 'Contato', href: '/#contato' },
]

export function Footer() {
  return (
    <footer className="theme-footer border-t border-white/10">
      <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="surface-panel mb-10 flex flex-col items-start justify-between gap-4 rounded-2xl p-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">Pronto para avancar</p>
            <p className="mt-2 text-sm text-slate-300">
              Fale com nossa equipe e receba proposta tecnico-comercial para sua operacao.
            </p>
          </div>
          <Link
            href={buildWhatsappLink(`Ola, gostaria de falar com a equipe da ${companyProfile.brandName}.`)}
            target="_blank"
            rel="noreferrer"
            className="focus-ring inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400"
          >
            Falar no WhatsApp
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-10 md:grid-cols-[1.1fr_0.8fr_1fr_1fr]">
          <div>
            <Link href="/" className="focus-ring inline-flex items-center">
              <Image src={vfLogo} alt="Logo da VF Brasil" className="h-11 w-auto" />
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">{companyProfile.servicesSummary}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.16em] text-slate-400">Setor: {companyProfile.industry}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">Navegacao</h3>
            <ul className="mt-4 space-y-3">
              {institutionalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="focus-ring text-sm text-slate-300 transition hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">Comercial</h3>
            <div className="mt-4 space-y-3 text-sm text-slate-300">
              <p>Telefone: {companyProfile.phoneDisplay}</p>
              <p>Porte: {companyProfile.companySize}</p>
              <p>Fundada em: {companyProfile.foundedYear}</p>
              <p>Modelo de atendimento: {companyProfile.workplacePolicy}</p>
              <Link
                href={buildWhatsappLink(`Ola, gostaria de falar com a equipe da ${companyProfile.brandName}.`)}
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-flex rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300 transition hover:bg-white/10"
              >
                Atendimento via WhatsApp
              </Link>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <Link
                href={companyProfile.linkedinCompanyUrl}
                target="_blank"
                rel="noreferrer"
                className="focus-ring rounded-lg border border-white/15 bg-white/5 p-2 text-amber-300 transition hover:bg-white/10"
                aria-label="LinkedIn da VF Brasil"
              >
                <LinkedinLogo className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">Unidades</h3>
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
                    Ver rota
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-slate-400">
          (c) 2026 {companyProfile.legalName}. Solucoes industriais para produtividade e confiabilidade operacional.
        </div>
      </div>
    </footer>
  )
}


