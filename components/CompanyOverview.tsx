import Link from 'next/link'

import { companyLocations, companyProfile } from '@/data/company'

export function CompanyOverview() {
  return (
    <section id="overview" className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="surface-panel rounded-3xl p-8 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">Overview</p>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">Empresa</h2>
            <p className="text-sm leading-7 text-slate-300 sm:text-base">{companyProfile.overview}</p>
            <p className="text-sm leading-7 text-slate-300 sm:text-base">{companyProfile.servicesSummary}</p>

            <div className="flex flex-wrap gap-2 pt-1">
              {companyProfile.specialties.map((item) => (
                <span key={item} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-200">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-white/10 bg-[#0a1019]/75 p-5 sm:p-6">
            <h3 className="text-lg font-semibold text-white">Dados institucionais</h3>
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
                <dt className="text-slate-400">Modelo de trabalho</dt>
                <dd className="text-right text-slate-100">{companyProfile.workplacePolicy}</dd>
              </div>
            </dl>

            <Link
              href={companyProfile.linkedinCompanyUrl}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
            >
              LinkedIn institucional
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {companyLocations.map((location) => (
            <article key={location.name} className="rounded-xl border border-white/15 bg-white/5 p-4">
              <h4 className="text-sm font-semibold text-white">{location.name}</h4>
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
                Ver no mapa
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
  )
}


