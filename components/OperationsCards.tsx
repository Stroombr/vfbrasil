"use client"

import Link from 'next/link'
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Factory, ShieldCheck, TimerReset, Wrench } from 'lucide-react'
import { useMemo, useState, type ComponentType } from 'react'

import { buildWhatsappLink, companyProfile } from '@/data/company'

type Scenario = {
  id: string
  label: string
  title: string
  summary: string
  impact: string
  icon: ComponentType<{ className?: string }>
  signs: string[]
  responsePlan: string[]
}

const scenarios: Scenario[] = [
  {
    id: 'disponibilidade',
    label: 'Cenário 01',
    title: 'Queda de disponibilidade da linha',
    summary: 'Paradas recorrentes reduzem produtividade e aumentam custo de manutenção corretiva.',
    impact: 'Prioridade alta',
    icon: TimerReset,
    signs: ['Aumento de paradas não planejadas', 'MTBF em queda', 'Equipe operando em modo reativo'],
    responsePlan: [
      'Diagnóstico técnico dos ativos críticos',
      'Plano de manutenção orientado por risco',
      'Acompanhamento dos indicadores de disponibilidade',
    ],
  },
  {
    id: 'pecas',
    label: 'Cenário 02',
    title: 'Lead time longo para peças',
    summary: 'Dependência de importados compromete prazo, estoque e previsibilidade operacional.',
    impact: 'Prioridade média-alta',
    icon: Wrench,
    signs: ['Reposição lenta de componentes', 'Estoque de segurança elevado', 'Risco de parada por falta de item'],
    responsePlan: [
      'Mapeamento de itens de maior criticidade',
      'Engenharia reversa e validação técnica',
      'Nacionalização progressiva com controle de qualidade',
    ],
  },
  {
    id: 'implantacao',
    label: 'Cenário 03',
    title: 'Implantação de projeto industrial',
    summary: 'Start-up exige coordenação técnica para reduzir riscos na fase de comissionamento.',
    impact: 'Prioridade estratégica',
    icon: Factory,
    signs: ['Cronograma pressionado', 'Dependência de alinhamento entre frentes', 'Risco de retrabalho na partida'],
    responsePlan: [
      'Planejamento executivo de montagem e supervisão',
      'Checklists técnicos por etapa',
      'Suporte de campo para estabilização inicial',
    ],
  },
  {
    id: 'conformidade',
    label: 'Cenário 04',
    title: 'Adequação técnica e conformidade',
    summary: 'Necessidade de elevar segurança operacional e aderência a normas aplicáveis.',
    impact: 'Prioridade regulatória',
    icon: ShieldCheck,
    signs: ['Pontos de não conformidade', 'Auditorias com pendências', 'Incerteza em requisitos técnicos'],
    responsePlan: [
      'Avaliação técnica de conformidade operacional',
      'Plano de adequação por criticidade',
      'Documentação de suporte para rastreabilidade',
    ],
  },
]

export function OperationsCards() {
  const [activeId, setActiveId] = useState(scenarios[0].id)

  const activeScenario = useMemo(
    () => scenarios.find((scenario) => scenario.id === activeId) ?? scenarios[0],
    [activeId],
  )
  const activeIndex = useMemo(
    () => scenarios.findIndex((scenario) => scenario.id === activeId),
    [activeId],
  )

  const whatsappLink = buildWhatsappLink(
    `Olá, gostaria de apoio da ${companyProfile.brandName}. Cenário: ${activeScenario.title}.`,
  )

  return (
    <section id="cards" className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="surface-panel rounded-3xl p-6 sm:p-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mt-4 text-2xl font-semibold text-white sm:text-4xl">Selecione o desafio para receber a resposta recomendada</h2>
          <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base">
            Escolha um cenário, veja o plano de resposta e avance para contato técnico.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1fr]">
          <div className="grid gap-3 sm:grid-cols-2">
            {scenarios.map((scenario) => {
              const Icon = scenario.icon
              const isActive = scenario.id === activeId
              const scenarioIndex = scenarios.findIndex((item) => item.id === scenario.id)

              return (
                <button
                  key={scenario.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveId(scenario.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowRight') {
                      event.preventDefault()
                      setActiveId(scenarios[(scenarioIndex + 1) % scenarios.length].id)
                    }

                    if (event.key === 'ArrowLeft') {
                      event.preventDefault()
                      setActiveId(scenarios[(scenarioIndex - 1 + scenarios.length) % scenarios.length].id)
                    }
                  }}
                  className={`focus-ring rounded-2xl border p-4 text-left transition ${
                    isActive
                      ? 'border-amber-300/45 bg-amber-400/12'
                      : 'border-white/15 bg-white/5 hover:-translate-y-0.5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="inline-flex rounded-lg border border-white/20 bg-white/10 p-2 text-amber-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-300">{scenario.label}</span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-white">{scenario.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{scenario.summary}</p>
                </button>
              )
            })}
          </div>

          <aside className="rounded-2xl border border-white/10 bg-[#0a1019]/75 p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">{activeScenario.impact}</p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveId(scenarios[(activeIndex - 1 + scenarios.length) % scenarios.length].id)}
                  className="focus-ring inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 text-slate-100 transition hover:bg-white/10"
                  aria-label="Cenário anterior"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setActiveId(scenarios[(activeIndex + 1) % scenarios.length].id)}
                  className="focus-ring inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/5 text-slate-100 transition hover:bg-white/10"
                  aria-label="Próximo cenário"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <h3 className="mt-3 text-xl font-semibold text-white sm:text-2xl">{activeScenario.title}</h3>

            <div className="mt-5 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Sinais comuns</p>
              {activeScenario.signs.map((item) => (
                <p key={item} className="inline-flex items-start gap-2 text-sm leading-6 text-slate-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                  {item}
                </p>
              ))}
            </div>

            <div className="mt-6 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">Resposta recomendada</p>
              {activeScenario.responsePlan.map((item) => (
                <p key={item} className="inline-flex items-start gap-2 text-sm leading-6 text-slate-200">
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                  {item}
                </p>
              ))}
            </div>

            <div className="mt-7 grid gap-3 sm:flex sm:flex-wrap">
              <Link
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-amber-400 sm:w-auto"
              >
                Enviar este cenário
              </Link>
              <Link
                href="#contato"
                className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/10 sm:w-auto"
              >
                Falar com especialista
              </Link>
            </div>

            <div className="mt-6 flex items-center gap-2">
              {scenarios.map((scenario, index) => (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => setActiveId(scenario.id)}
                  className={`focus-ring h-2 rounded-full transition-all ${
                    activeIndex === index ? 'w-7 bg-amber-400' : 'w-2 bg-white/30 hover:bg-white/45'
                  }`}
                  aria-label={`Ir para ${scenario.label}`}
                />
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}



