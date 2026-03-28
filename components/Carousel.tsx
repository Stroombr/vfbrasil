'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'

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
  fabricacao: 'Fabricacao',
  manutencao: 'Manutencao',
  engenharia: 'Engenharia',
  implantacao: 'Implantacao',
}

const cards: ServiceItem[] = [
  {
    id: 1,
    category: 'fabricacao',
    title: 'Fabricacao de pecas originais',
    subtitle: 'Componentes com rigor tecnico e total aderencia as especificacoes de fabrica.',
    details: 'Controle dimensional, rastreabilidade e plano de qualidade para desempenho consistente em campo.',
  },
  {
    id: 2,
    category: 'engenharia',
    title: 'Servico tecnico especializado',
    subtitle: 'Consultoria e execucao para desafios complexos em ambientes industriais de alta exigencia.',
    details: 'Diagnostico tecnico, plano de acao e execucao assistida por especialistas em equipamentos criticos.',
  },
  {
    id: 3,
    category: 'manutencao',
    title: 'Manutencao de equipamentos',
    subtitle: 'Atuacao preditiva e corretiva para reduzir paradas e ampliar disponibilidade operacional.',
    details: 'Metodologia orientada por risco e indicadores para aumentar MTBF e reduzir tempo de intervencao.',
  },
  {
    id: 4,
    category: 'engenharia',
    title: 'Tropicalizacao e nacionalizacao de projetos',
    subtitle: 'Adaptacao completa de projetos globais para normas e realidade operacional brasileira.',
    details: 'Adequacao a NRs, documentacao local e ajustes tecnicos para confianca operacional de longo prazo.',
  },
  {
    id: 5,
    category: 'fabricacao',
    title: 'Nacionalizacao de pecas',
    subtitle: 'Substituicao inteligente de importados com performance equivalente e lead time reduzido.',
    details: 'Engenharia aplicada para reduzir dependencia externa com ganho de prazo e previsibilidade de custo.',
  },
  {
    id: 6,
    category: 'implantacao',
    title: 'Montagem e supervisao de campo',
    subtitle: 'Gestao tecnica da implantacao para garantir partida segura e performance desde o primeiro dia.',
    details: 'Comissionamento, checklist tecnico e suporte em start-up para acelerar curva de estabilidade.',
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
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Servico {item.id}</p>
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
  const [isAutoplay, setIsAutoplay] = useState(true)
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
    if (!carouselRef.current || !isAutoplay) {
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
  }, [isAutoplay])

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
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">Nossos servicos</p>
        <h2 className="mt-4 text-2xl font-semibold text-white sm:text-4xl">Cobertura completa para cada etapa da operacao</h2>
        <p className="mt-5 text-sm leading-7 text-slate-300 sm:text-base">
          Equipes multidisciplinares e engenharia aplicada para performance, seguranca operacional e previsibilidade.
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
              setIsAutoplay(false)
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
          onClick={() => setIsAutoplay((prev) => !prev)}
          className="focus-ring inline-flex h-10 items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-white/15"
          aria-label="Ativar ou pausar rolagem automatica"
        >
          {isAutoplay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {isAutoplay ? 'Pausar auto' : 'Ativar auto'}
        </button>
        <button
          onClick={() => scroll('left')}
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/15"
          aria-label="Rolar servicos para esquerda"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={() => scroll('right')}
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white transition hover:bg-white/15"
          aria-label="Rolar servicos para direita"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div
        ref={carouselRef}
        className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:gap-6"
        onMouseEnter={() => setIsAutoplay(false)}
        onMouseLeave={() => setIsAutoplay(true)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight') {
            event.preventDefault()
            setIsAutoplay(false)
            scroll('right')
          }

          if (event.key === 'ArrowLeft') {
            event.preventDefault()
            setIsAutoplay(false)
            scroll('left')
          }
        }}
        tabIndex={0}
        aria-label="Carrossel de servicos"
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
            onClick={() => {
              setIsAutoplay(false)
              scrollToCard(index)
            }}
            className={`focus-ring h-2.5 rounded-full transition-all ${
              activeIndex === index ? 'w-7 bg-amber-400' : 'w-2.5 bg-white/25 hover:bg-white/40'
            }`}
            aria-label={`Ir para servico ${item.id}`}
          />
        ))}
      </div>
    </div>
  )
}


