"use client"

import Link from 'next/link'
import { CheckCircle2, Factory, FileCheck2, Handshake } from 'lucide-react'
import { useEffect, useState } from 'react'

import { usePrefersReducedMotion } from './usePrefersReducedMotion'

const sectionShell = 'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8'

const deliverySteps = [
  {
    title: 'Diagnóstico e definição técnica',
    description: 'Levantamento técnico dos pontos críticos com prioridade por impacto operacional.',
    icon: FileCheck2,
    outcomes: [
      'Risco operacional mapeado',
      'Plano inicial definido',
      'Premissas técnicas claras para decisão',
    ],
  },
  {
    title: 'Engenharia e execução',
    description: 'Plano técnico com cronograma de fabricação e acompanhamento de qualidade.',
    icon: Factory,
    outcomes: ['Marcos de entrega visíveis', 'Execução com rastreabilidade', 'Menor retrabalho em campo'],
  },
  {
    title: 'Implantação e suporte',
    description: 'Partida assistida e ajustes para estabilizar performance após a entrega.',
    icon: Handshake,
    outcomes: ['Comissionamento assistido', 'Ajustes de performance', 'Continuidade do suporte técnico'],
  },
] as const

export function DeliveryExperience() {
  const [activeIndex, setActiveIndex] = useState(0)
  const prefersReducedMotion = usePrefersReducedMotion()
  const shouldAutoPlay = !prefersReducedMotion

  useEffect(() => {
    if (!shouldAutoPlay) {
      return
    }

    const timer = window.setInterval(() => {
      if (document.hidden) {
        return
      }

      setActiveIndex((prev) => (prev + 1) % deliverySteps.length)
    }, 4200)

    return () => window.clearInterval(timer)
  }, [shouldAutoPlay])

  const activeStep = deliverySteps[activeIndex]

  return (
    <section id="servicos" className={`${sectionShell} pb-12`}>
      <div className="surface-panel relative overflow-hidden rounded-3xl p-8 sm:p-10">
        <div aria-hidden className="service-glow service-glow-a" />
        <div aria-hidden className="service-glow service-glow-b" />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">Soluções técnicas</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Experiência ativa do método de entrega</h2>
          <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base">
            O fluxo avanca automaticamente. Clique em qualquer etapa para explorar com mais detalhe.
          </p>
        </div>

        <div className="relative z-10 mt-8 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-3">
            {deliverySteps.map((step, index) => {
              const Icon = step.icon
              const isActive = index === activeIndex

              return (
                <button
                  key={step.title}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`focus-ring w-full rounded-2xl border p-4 text-left transition ${
                    isActive
                      ? 'border-amber-300/45 bg-amber-400/12'
                      : 'border-white/15 bg-white/5 hover:-translate-y-0.5 hover:bg-white/10'
                  }`}
                  aria-pressed={isActive}
                >
                  <div className="flex items-start gap-3">
                    <span className="inline-flex rounded-lg border border-white/15 bg-white/10 p-2 text-amber-300">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">Etapa {index + 1}</p>
                      <h3 className="mt-2 text-lg font-semibold text-white">{step.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{step.description}</p>
                    </div>
                  </div>
                  <div className="mt-4 h-1.5 rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-amber-400 transition-all duration-700"
                      style={{ width: isActive ? '100%' : '24%' }}
                    />
                  </div>
                </button>
              )
            })}
          </div>

          <aside className="rounded-2xl border border-white/15 bg-white/5 p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-300">Etapa ativa</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">{activeStep.title}</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">{activeStep.description}</p>

            <div className="mt-5 space-y-2">
              {activeStep.outcomes.map((item) => (
                <p key={item} className="inline-flex items-start gap-2 text-sm leading-6 text-slate-200">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                  {item}
                </p>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="#contato"
                className="focus-ring inline-flex items-center justify-center rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-amber-400"
              >
                Solicitar proposta
              </Link>
              <Link
                href="#produtos"
                className="focus-ring inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
              >
                Ver produtos
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

