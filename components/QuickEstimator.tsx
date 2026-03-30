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
  pecas: 'Lead time de peças',
  projeto: 'Implantação de novo projeto',
  nacionalizacao: 'Dependência de importados',
}

const autoScenarios: Array<{
  label: string
  challenge: Challenge
  urgency: Urgency
  complexity: number
}> = [
  {
    label: 'Linha com parada crítica',
    challenge: 'manutencao',
    urgency: 'alta',
    complexity: 5,
  },
  {
    label: 'Reposição de componentes',
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
    label: 'Nacionalização prioritária',
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
      title: score >= 8 ? 'Plano de intervenção prioritária' : 'Plano de manutenção estruturada',
      description:
        score >= 8
          ? 'Recomendamos diagnóstico em campo com foco em ativos críticos e redução de risco de parada.'
          : 'Recomendamos agenda preventiva com acompanhamento técnico para estabilidade de operação.',
      service: 'Manutenção de equipamentos',
      priority: score >= 8 ? 'Alta' : 'Media',
    }
  }

  if (challenge === 'pecas') {
    return {
      title: 'Trilha de reposição inteligente',
      description:
        score >= 8
          ? 'Sugestão: mapa de itens críticos com reposição imediata e plano de estoque mínimo.'
          : 'Sugestão: revisão de portfólio de sobressalentes para ganho de previsibilidade e prazo.',
      service: 'Nacionalização de peças',
      priority: score >= 8 ? 'Alta' : 'Media',
    }
  }

  if (challenge === 'projeto') {
    return {
      title: 'Roadmap de implantação assistida',
      description:
        score >= 8
          ? 'Indicamos kick-off técnico com supervisão dedicada para start-up seguro e rápido.'
          : 'Indicamos plano de implantação por fases com checkpoints de qualidade e desempenho.',
      service: 'Montagem e supervisão de campo',
      priority: score >= 8 ? 'Alta' : 'Media',
    }
  }

  return {
    title: score >= 8 ? 'Programa de nacionalização acelerada' : 'Programa de nacionalização progressiva',
    description:
      score >= 8
        ? 'Recomendamos iniciar com itens de maior impacto operacional para reduzir dependência externa rapidamente.'
        : 'Recomendamos um lote piloto com validação técnica antes de escalar nacionalização.',
    service: 'Tropicalização e nacionalização de projetos',
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
    `Olá, preciso de apoio da ${companyProfile.brandName}. Contexto: ${challengeLabels[challenge]}. Urgência: ${urgency}. Complexidade: ${complexity}/5.`,
  )

  return (
    <section id="diagnostico" className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="surface-panel grid gap-8 rounded-3xl p-8 sm:p-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">
              <Gauge className="h-4 w-4" />
              Diagnóstico rápido
            </p>
          </div>

          <h2 className="text-3xl font-semibold text-white sm:text-4xl">Simule o melhor ponto de partida</h2>
          <p className="text-sm leading-7 text-slate-300 sm:text-base">
            Ferramenta objetiva para priorizar atendimento técnico em menos de um minuto.
          </p>
          {prefersReducedMotion ? (
            <p className="text-xs text-slate-400">
              Movimento automático reduzido por configuração de acessibilidade do dispositivo.
            </p>
          ) : null}

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="font-semibold uppercase tracking-[0.12em] text-amber-300">
                {shouldAutoPilot ? 'Cenário em rotação' : 'Cenário manual'}
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
            <p className="text-xs uppercase tracking-[0.16em] text-slate-400">Diagnóstico atual</p>
            <h3 className="mt-2 text-lg font-semibold text-white">{recommendation.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{recommendation.description}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-slate-200">
                Serviço: {recommendation.service}
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
            Enviar diagnóstico no WhatsApp
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
            <label className="mb-2 block text-sm font-medium text-slate-200">Nível de urgência</label>
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
              <p>Urgência: {urgency}</p>
              <p>Complexidade: {complexity}/5</p>
              <p>Prioridade sugerida: {recommendation.priority}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}



