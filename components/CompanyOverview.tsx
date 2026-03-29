import Link from 'next/link'

import { companyProfile } from '@/data/company'

const deliveryCommitments = [
  'Diagnostico inicial com prioridade por impacto operacional',
  'Cronograma com marcos de entrega visiveis',
  'Suporte tecnico na implantacao e estabilizacao',
]

export function CompanyOverview() {
  return (
    <section id="overview" className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="surface-panel rounded-3xl p-6 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">Sobre a VF Brasil</p>
            <h2 className="text-2xl font-semibold text-white sm:text-4xl">Estrutura tecnica para entrega previsivel</h2>
            <p className="text-sm leading-7 text-slate-300 sm:text-base">{companyProfile.overview}</p>

            <div className="flex flex-wrap gap-2 pt-1">
              {companyProfile.specialties.map((item) => (
                <span key={item} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-200">
                  {item}
                </span>
              ))}
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-300">Compromissos de entrega</p>
              <div className="mt-3 space-y-2">
                {deliveryCommitments.map((item) => (
                  <p key={item} className="text-sm leading-7 text-slate-300">
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-white/10 bg-[#0a1019]/75 p-5 sm:p-6">
            <h3 className="text-lg font-semibold text-white">Resumo objetivo</h3>
            <dl className="space-y-3 text-sm">
              <div className="flex items-start justify-between gap-3">
                <dt className="text-slate-400">Industria</dt>
                <dd className="text-right text-slate-100">{companyProfile.industry}</dd>
              </div>
              <div className="flex items-start justify-between gap-3">
                <dt className="text-slate-400">Porte</dt>
                <dd className="text-right text-slate-100">{companyProfile.companySize}</dd>
              </div>
              <div className="flex items-start justify-between gap-3">
                <dt className="text-slate-400">Fundacao</dt>
                <dd className="text-right text-slate-100">{companyProfile.foundedYear}</dd>
              </div>
              <div className="flex items-start justify-between gap-3">
                <dt className="text-slate-400">Telefone</dt>
                <dd className="text-right text-slate-100">{companyProfile.phoneDisplay}</dd>
              </div>
              <div className="flex items-start justify-between gap-3">
                <dt className="text-slate-400">Atendimento</dt>
                <dd className="text-right text-slate-100">{companyProfile.workplacePolicy}</dd>
              </div>
            </dl>

            <div className="grid gap-2 sm:grid-cols-2">
              <Link
                href="/#contato"
                className="focus-ring inline-flex items-center justify-center rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
              >
                Solicitar proposta
              </Link>
              <Link
                href={companyProfile.linkedinCompanyUrl}
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-flex items-center justify-center rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
              >
                LinkedIn institucional
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


