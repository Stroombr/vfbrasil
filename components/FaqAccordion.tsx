"use client"

import { useMemo, useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'

type FaqItem = {
  question: string
  answer: string
}

const faqItems: FaqItem[] = [
  {
    question: 'Voces atendem projetos em todo o Brasil?',
    answer:
      'Sim. A VF Brasil atua nacionalmente com suporte tecnico remoto e presencial, de acordo com a criticidade da operacao.',
  },
  {
    question: 'Como funciona a proposta tecnica?',
    answer:
      'Iniciamos com triagem do contexto e enviamos proposta com etapas, premissas e prazo de execucao.',
  },
  {
    question: 'A equipe apoia nacionalizacao de pecas importadas?',
    answer:
      'Sim. Fazemos estudo tecnico, engenharia reversa quando necessario e validacao de desempenho para manter confiabilidade operacional.',
  },
  {
    question: 'Quanto tempo leva para iniciar um atendimento?',
    answer:
      'A triagem inicial normalmente acontece no mesmo dia util. O prazo de mobilizacao depende do tipo de servico e da localizacao da planta.',
  },
  {
    question: 'A VF Brasil executa manutencao preventiva e corretiva?',
    answer:
      'Executamos ambos os modelos, com planejamento orientado por risco e foco em disponibilidade, seguranca e produtividade da linha.',
  },
  {
    question: 'Existe suporte apos entrega e implantacao?',
    answer:
      'Sim. Mantemos acompanhamento tecnico para estabilizacao operacional, ajustes e orientacao de melhoria continua.',
  },
]

export function FaqAccordion() {
  const [openQuestion, setOpenQuestion] = useState<string | null>(faqItems[0]?.question ?? null)
  const [query, setQuery] = useState('')

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase()

    if (!normalized) {
      return faqItems
    }

    return faqItems.filter(
      (item) =>
        item.question.toLowerCase().includes(normalized) || item.answer.toLowerCase().includes(normalized),
    )
  }, [query])

  return (
    <section id="faq" className="mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <div className="surface-panel rounded-3xl p-8 sm:p-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">Perguntas frequentes</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Respostas objetivas para apoiar sua contratacao</h2>
        </div>

        <div className="mx-auto mt-6 max-w-2xl">
          <label htmlFor="faq-search" className="sr-only">
            Buscar pergunta
          </label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="faq-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar pergunta ou tema..."
              className="focus-ring w-full rounded-xl border border-white/15 bg-white/5 py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="mx-auto mt-8 max-w-4xl space-y-3">
          {filteredItems.length === 0 ? (
            <article className="rounded-xl border border-white/15 bg-white/5 px-5 py-4">
              <p className="text-sm text-slate-300">Nenhuma pergunta encontrada para esta busca.</p>
            </article>
          ) : null}

          {filteredItems.map((item) => {
            const isOpen = openQuestion === item.question

            return (
              <article key={item.question} className="rounded-xl border border-white/15 bg-white/5">
                <button
                  type="button"
                  className="focus-ring flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  onClick={() => setOpenQuestion(isOpen ? null : item.question)}
                >
                  <span className="text-sm font-semibold text-white sm:text-base">{item.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-amber-300 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
                <div
                  className={`overflow-hidden transition-[max-height,opacity] duration-300 ${
                    isOpen ? 'max-h-56 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 pb-4">
                    <p className="text-sm leading-7 text-slate-300">{item.answer}</p>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}


