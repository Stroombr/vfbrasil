"use client"

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { Gauge, Sparkles } from 'lucide-react'

import { buildWhatsappLink, companyProfile } from '@/data/company'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

type Challenge = 'manutencao' | 'pecas' | 'projeto' | 'nacionalizacao'
type Urgency = 'baixa' | 'media' | 'alta'

type Recommendation = {
  title: string
  description: string
  service: string
  priority: string
}

const challengeLabels: Record<Challenge, string> = {
  manutencao: 'Paradas e confiabilidade',
  pecas: 'Lead time de pecas',
  projeto: 'Implantacao de novo projeto',
  nacionalizacao: 'Dependencia de importados',
}

const autoScenarios: Array<{
  label: string
  challenge: Challenge
  urgency: Urgency
  complexity: number
}> = [
  {
    label: 'Linha com parada critica',
    challenge: 'manutencao',
    urgency: 'alta',
    complexity: 5,
  },
  {
    label: 'Reposicao de componentes',
    challenge: 'pecas',
    urgency: 'media',
    complexity: 4,
  },
  {
    label: 'Start-up de nova frente',
    challenge: 'projeto',
    urgency: 'media',
    complexity: 3,
  },
  {
    label: 'Nacionalizacao prioritaria',
    challenge: 'nacionalizacao',
    urgency: 'alta',
    complexity: 4,
  },
]

function calculateRecommendation(challenge: Challenge, urgency: Urgency, complexity: number): Recommendation {
  const urgencyMap = { baixa: 1, media: 2, alta: 3 }
  const score = urgencyMap[urgency] * 2 + complexity

  if (challenge === 'manutencao') {
    return {
      title: score >= 8 ? 'Plano de intervencao prioritaria' : 'Plano de manutencao estruturada',
      description:
        score >= 8
          ? 'Recomendamos diagnostico em campo com foco em ativos criticos e reducao de risco de parada.'
          : 'Recomendamos agenda preventiva com acompanhamento tecnico para estabilidade de operacao.',
      service: 'Manutencao de equipamentos',
      priority: score >= 8 ? 'Alta' : 'Media',
    }
  }

  if (challenge === 'pecas') {
    return {
      title: 'Trilha de reposicao inteligente',
      description:
        score >= 8
          ? 'Sugestao: mapa de itens criticos com reposicao imediata e plano de estoque minimo.'
          : 'Sugestao: revisao de portfolio de sobressalentes para ganho de previsibilidade e prazo.',
      service: 'Nacionalizacao de pecas',
      priority: score >= 8 ? 'Alta' : 'Media',
    }
  }

  if (challenge === 'projeto') {
    return {
      title: 'Roadmap de implantacao assistida',
      description:
        score >= 8
          ? 'Indicamos kick-off tecnico com supervisao dedicada para start-up seguro e rapido.'
          : 'Indicamos plano de implantacao por fases com checkpoints de qualidade e desempenho.',
      service: 'Montagem e supervisao de campo',
      priority: score >= 8 ? 'Alta' : 'Media',
    }
  }

  return {
    title: score >= 8 ? 'Programa de nacionalizacao acelerada' : 'Programa de nacionalizacao progressiva',
    description:
      score >= 8
        ? 'Recomendamos iniciar com itens de maior impacto operacional para reduzir dependencia externa rapidamente.'
        : 'Recomendamos um lote piloto com validacao tecnica antes de escalar nacionalizacao.',
    service: 'Tropicalizacao e nacionalizacao de projetos',
    priority: score >= 8 ? 'Alta' : 'Media',
  }
}

export function QuickEstimator() {
  const [manualChallenge, setManualChallenge] = useState<Challenge>('manutencao')
  const [manualUrgency, setManualUrgency] = useState<Urgency>('media')
  const [manualComplexity, setManualComplexity] = useState(3)
  const [scenarioIndex, setScenarioIndex] = useState(0)
  const prefersReducedMotion = usePrefersReducedMotion()
  const shouldAutoPilot = !prefersReducedMotion

  useEffect(() => {
    if (!shouldAutoPilot || autoScenarios.length <= 1) {
      return
    }

    const timer = window.setInterval(() => {
      if (document.hidden) {
        return
      }

      setScenarioIndex((prev) => (prev + 1) % autoScenarios.length)
    }, 4200)

    return () => window.clearInterval(timer)
  }, [shouldAutoPilot])

  const activeScenario = autoScenarios[scenarioIndex]
  const challenge = shouldAutoPilot ? activeScenario.challenge : manualChallenge
  const urgency = shouldAutoPilot ? activeScenario.urgency : manualUrgency
  const complexity = shouldAutoPilot ? activeScenario.complexity : manualComplexity

  const recommendation = useMemo(
    () => calculateRecommendation(challenge, urgency, complexity),
    [challenge, urgency, complexity],
  )

  const autoProgress = ((scenarioIndex + 1) / autoScenarios.length) * 100
  const whatsappLink = buildWhatsappLink(
    `Ola, preciso de apoio da ${companyProfile.brandName}. Contexto: ${challengeLabels[challenge]}. Urgencia: ${urgency}. Complexidade: ${complexity}/5.`,
  )

  return (
    <section id="diagnostico" className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="surface-panel grid gap-8 rounded-3xl p-8 sm:p-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
              <Gauge className="h-4 w-4" />
              Diagnostico rapido
            </p>
          </div>

          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Simule o melhor ponto de partida</h2>
          <p className="text-sm leading-7 text-slate-300 sm:text-base">
            Ferramenta objetiva para priorizar atendimento tecnico em menos de um minuto.
          </p>
          {prefersReducedMotion ? (
            <p className="text-xs text-slate-400">
              Movimento automatico reduzido por configuracao de acessibilidade do dispositivo.
            </p>
          ) : null}

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="font-semibold uppercase tracking-[0.12em] text-amber-300">
                {shouldAutoPilot ? 'Cenario em rotacao' : 'Cenario manual'}
              </span>
              <span className="text-slate-300">
                {shouldAutoPilot ? `${scenarioIndex + 1}/${autoScenarios.length}` : 'Personalizado'}
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10">
              <div
                className={`h-full rounded-full bg-amber-400 transition-all duration-700 ${shouldAutoPilot ? 'product-spotlight' : ''}`}
                style={{ width: shouldAutoPilot ? `${autoProgress}%` : '100%' }}
              />
            </div>
            {shouldAutoPilot ? <p className="mt-3 text-xs text-slate-300">Agora: {activeScenario.label}</p> : null}
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Diagnostico atual</p>
            <h3 className="mt-2 text-lg font-semibold text-white">{recommendation.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{recommendation.description}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-slate-200">
                Servico: {recommendation.service}
              </span>
              <span className="rounded-full border border-amber-300/35 bg-amber-400/10 px-3 py-1 text-amber-200">
                Prioridade: {recommendation.priority}
              </span>
            </div>
          </div>

          <Link
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="focus-ring inline-flex items-center gap-2 rounded-lg bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
          >
            <Sparkles className="h-4 w-4" />
            Enviar diagnostico no WhatsApp
          </Link>
        </div>

        <div className="space-y-6 rounded-2xl border border-white/10 bg-[#0a1019]/75 p-5 sm:p-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Qual o principal desafio hoje?</label>
            <div className="grid gap-2">
              {(Object.keys(challengeLabels) as Challenge[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setManualChallenge(item)}
                  className={`focus-ring rounded-lg border px-4 py-2 text-left text-sm transition ${
                    challenge === item
                      ? 'border-amber-300/40 bg-amber-400/10 text-amber-200'
                      : 'border-white/15 bg-white/5 text-slate-200 hover:bg-white/10'
                  }`}
                >
                  {challengeLabels[item]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Nivel de urgencia</label>
            <div className="grid grid-cols-3 gap-2">
              {(['baixa', 'media', 'alta'] as Urgency[]).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setManualUrgency(item)}
                  className={`focus-ring rounded-lg border px-3 py-2 text-sm font-semibold uppercase transition ${
                    urgency === item
                      ? 'border-amber-300/40 bg-amber-400/10 text-amber-200'
                      : 'border-white/15 bg-white/5 text-slate-200 hover:bg-white/10'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label htmlFor="complexity" className="text-sm font-medium text-slate-200">
                Complexidade operacional
              </label>
              <span className="text-xs text-slate-400">{complexity}/5</span>
            </div>
            <input
              id="complexity"
              type="range"
              min={1}
              max={5}
              step={1}
              value={complexity}
              onChange={(event) => setManualComplexity(Number(event.target.value))}
              className="focus-ring w-full accent-amber-400"
            />
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-300">Resumo de entrada</p>
            <div className="mt-3 grid gap-2 text-sm text-slate-200 sm:grid-cols-2">
              <p>Desafio: {challengeLabels[challenge]}</p>
              <p>Urgencia: {urgency}</p>
              <p>Complexidade: {complexity}/5</p>
              <p>Prioridade sugerida: {recommendation.priority}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


