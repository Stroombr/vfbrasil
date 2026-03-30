'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

type ServiceCategory = 'fabricacao' | 'manutencao' | 'engenharia' | 'implantacao'
type CategoryFilter = 'todos' | ServiceCategory

interface ServiceItem {
  id: number
  category: ServiceCategory
  title: string
  subtitle: string
  details: string
}

const categoryLabels: Record<CategoryFilter, string> = {
  todos: 'Todos',
  fabricacao: 'Fabricação',
  manutencao: 'Manutenção',
  engenharia: 'Engenharia',
  implantacao: 'Implantação',
}

const cards: ServiceItem[] = [
  {
    id: 1,
    category: 'fabricacao',
    title: 'Fabricação de peças originais',
    subtitle: 'Componentes com rigor técnico e total aderência às especificações de fábrica.',
    details: 'Controle dimensional, rastreabilidade e plano de qualidade para desempenho consistente em campo.',
  },
  {
    id: 2,
    category: 'engenharia',
    title: 'Serviço técnico especializado',
    subtitle: 'Consultoria e execução para desafios complexos em ambientes industriais de alta exigência.',
    details: 'Diagnóstico técnico, plano de ação e execução assistida por especialistas em equipamentos críticos.',
  },
  {
    id: 3,
    category: 'manutencao',
    title: 'Manutenção de equipamentos',
    subtitle: 'Atuação preditiva e corretiva para reduzir paradas e ampliar disponibilidade operacional.',
    details: 'Metodologia orientada por risco e indicadores para aumentar MTBF e reduzir tempo de intervenção.',
  },
  {
    id: 4,
    category: 'engenharia',
    title: 'Tropicalização e nacionalização de projetos',
    subtitle: 'Adaptação completa de projetos globais para normas e realidade operacional brasileira.',
    details: 'Adequação a NRs, documentação local e ajustes técnicos para confiança operacional de longo prazo.',
  },
  {
    id: 5,
    category: 'fabricacao',
    title: 'Nacionalização de peças',
    subtitle: 'Substituição inteligente de importados com performance equivalente e lead time reduzido.',
    details: 'Engenharia aplicada para reduzir dependência externa com ganho de prazo e previsibilidade de custo.',
  },
  {
    id: 6,
    category: 'implantacao',
    title: 'Montagem e supervisão de campo',
    subtitle: 'Gestão técnica da implantação para garantir partida segura e performance desde o primeiro dia.',
    details: 'Comissionamento, checklist técnico e suporte em start-up para acelerar curva de estabilidade.',
  },
]

type ServiceCardProps = {
  item: ServiceItem
  index: number
  expanded: boolean
  onToggle: (id: number) => void
}

function ServiceCard({ item, index, expanded, onToggle }: ServiceCardProps) {
  return (
    <article
      data-service-card
      data-service-index={index}
      className="surface-panel min-w-[260px] snap-center rounded-2xl p-5 sm:min-w-[340px] sm:p-6 lg:min-w-[390px]"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Serviço {item.id}</p>
      <h3 className="mt-4 text-xl font-semibold leading-snug text-white sm:text-2xl">{item.title}</h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">{item.subtitle}</p>

      <button
        type="button"
        className="focus-ring mt-6 inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-amber-200 transition hover:bg-white/10"
        onClick={() => onToggle(item.id)}
      >
        {expanded ? 'Ocultar detalhes' : 'Saiba mais'}
        <ArrowRight className={`h-4 w-4 transition-transform ${expanded ? 'rotate-90' : ''}`} />
      </button>

      <div className={`grid transition-all duration-300 ${expanded ? 'mt-4 grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <p className="overflow-hidden text-sm leading-7 text-slate-200">{item.details}</p>
      </div>
    </article>
  )
}

export function EnhancedCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('todos')
  const [expandedCard, setExpandedCard] = useState<number | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const filteredCards = useMemo(
    () => (activeCategory === 'todos' ? cards : cards.filter((card) => card.category === activeCategory)),
    [activeCategory],
  )

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) {
      return
    }

    const { scrollLeft, clientWidth } = carouselRef.current
    const offset = direction === 'left' ? -clientWidth * 0.75 : clientWidth * 0.75

    carouselRef.current.scrollTo({
      left: scrollLeft + offset,
      behavior: 'smooth',
    })
  }

  const updateActiveIndex = useCallback(() => {
    const node = carouselRef.current

    if (!node) {
      return
    }

    const cardNodes = Array.from(node.querySelectorAll<HTMLElement>('[data-service-card]'))

    if (cardNodes.length === 0) {
      return
    }

    const viewportCenter = node.scrollLeft + node.clientWidth / 2

    let nearestIndex = 0
    let nearestDistance = Number.POSITIVE_INFINITY

    cardNodes.forEach((cardNode, index) => {
      const cardCenter = cardNode.offsetLeft + cardNode.clientWidth / 2
      const distance = Math.abs(cardCenter - viewportCenter)

      if (distance < nearestDistance) {
        nearestDistance = distance
        nearestIndex = index
      }
    })

    setActiveIndex(nearestIndex)
  }, [])

  const scrollToCard = useCallback((index: number) => {
    const node = carouselRef.current

    if (!node) {
      return
    }

    const target = node.querySelector<HTMLElement>(`[data-service-index="${index}"]`)

    if (!target) {
      return
    }

    const centeredLeft = target.offsetLeft - (node.clientWidth - target.clientWidth) / 2

    node.scrollTo({
      left: centeredLeft,
      behavior: 'smooth',
    })
  }, [])

  useEffect(() => {
    if (!carouselRef.current) {
      return
    }

    const timer = window.setInterval(() => {
      const node = carouselRef.current

      if (!node) {
        return
      }

      const isEnd = node.scrollLeft + node.clientWidth >= node.scrollWidth - 8

      node.scrollTo({
        left: isEnd ? 0 : node.scrollLeft + node.clientWidth * 0.75,
        behavior: 'smooth',
      })
    }, 3600)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    const node = carouselRef.current

    if (!node) {
      return
    }

    let frame = 0
    const onScroll = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        updateActiveIndex()
      })
    }

    frame = window.requestAnimationFrame(() => {
      updateActiveIndex()
    })
    node.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.cancelAnimationFrame(frame)
      node.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [updateActiveIndex])

  return (
    <div id="servicos" className="space-y-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">Soluções de engenharia</p>
        <h2 className="mt-4 text-2xl font-semibold text-white sm:text-4xl">Serviços para disponibilidade, prazo e confiabilidade</h2>
        <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base">
          Equipes multidisciplinares para diagnosticar, executar e acompanhar ganhos em operações críticas.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {(Object.keys(categoryLabels) as CategoryFilter[]).map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => {
              setActiveCategory(filter)
              setExpandedCard(null)
              setActiveIndex(0)
              carouselRef.current?.scrollTo({ left: 0, behavior: 'smooth' })
            }}
            className={`focus-ring rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition ${
              activeCategory === filter
                ? 'border-amber-300/45 bg-amber-400/12 text-amber-200'
                : 'border-white/20 bg-white/5 text-slate-200 hover:bg-white/10'
            }`}
          >
            {categoryLabels[filter]}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-start gap-3 sm:justify-end">
        <button
          onClick={() => scroll('left')}
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/15"
          aria-label="Rolar serviços para esquerda"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => scroll('right')}
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/15"
          aria-label="Rolar serviços para direita"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div
        ref={carouselRef}
        className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:gap-6"
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') {
            event.preventDefault()
            scroll('right')
          }

          if (event.key === 'ArrowLeft') {
            event.preventDefault()
            scroll('left')
          }
        }}
        tabIndex={0}
        aria-label="Carrossel de serviços"
      >
        {filteredCards.map((item, index) => (
          <ServiceCard
            key={item.id}
            item={item}
            index={index}
            expanded={expandedCard === item.id}
            onToggle={(id) => setExpandedCard((current) => (current === id ? null : id))}
          />
        ))}
      </div>

      <div className="flex items-center justify-center gap-2">
        {filteredCards.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => scrollToCard(index)}
            className={`focus-ring h-2.5 rounded-full transition-all ${
              activeIndex === index ? 'w-7 bg-amber-400' : 'w-2.5 bg-white/25 hover:bg-white/40'
            }`}
            aria-label={`Ir para serviço ${item.id}`}
          />
        ))}
      </div>
    </div>
  )
}



