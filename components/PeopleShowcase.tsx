'use client'

import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type Person = {
  label: string
  name: string
  role: string
  image: ImageProps['src']
  linkedin: string
}

type PeopleShowcaseProps = {
  people: readonly Person[]
}

export function PeopleShowcase({ people }: PeopleShowcaseProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [canGoLeft, setCanGoLeft] = useState(false)
  const [canGoRight, setCanGoRight] = useState(people.length > 1)

  const updateTrackState = useCallback(() => {
    const node = trackRef.current

    if (!node) {
      return
    }

    const cards = Array.from(node.querySelectorAll<HTMLElement>('[data-person-index]'))

    if (cards.length === 0) {
      return
    }

    const viewportCenter = node.scrollLeft + node.clientWidth / 2
    let nearestIndex = 0
    let nearestDistance = Number.POSITIVE_INFINITY

    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2
      const distance = Math.abs(cardCenter - viewportCenter)

      if (distance < nearestDistance) {
        nearestDistance = distance
        nearestIndex = index
      }
    })

    setActiveIndex(nearestIndex)
    setCanGoLeft(node.scrollLeft > 8)
    setCanGoRight(node.scrollLeft + node.clientWidth < node.scrollWidth - 8)
  }, [])

  useEffect(() => {
    const node = trackRef.current

    if (!node) {
      return
    }

    let frame = 0
    const onScroll = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(updateTrackState)
    }

    onScroll()
    node.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.cancelAnimationFrame(frame)
      node.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [updateTrackState])

  const scrollByDirection = (direction: 'left' | 'right') => {
    const node = trackRef.current

    if (!node) {
      return
    }

    const offset = node.clientWidth * 0.82 * (direction === 'left' ? -1 : 1)

    node.scrollBy({
      left: offset,
      behavior: 'smooth',
    })
  }

  const goToIndex = (index: number) => {
    const node = trackRef.current

    if (!node) {
      return
    }

    const target = node.querySelector<HTMLElement>(`[data-person-index="${index}"]`)

    if (!target) {
      return
    }

    node.scrollTo({
      left: target.offsetLeft - node.clientWidth / 2 + target.clientWidth / 2,
      behavior: 'smooth',
    })
  }

  const visiblePeople = useMemo(() => people.filter(Boolean), [people])

  if (visiblePeople.length === 0) {
    return null
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-white/12 bg-white/[0.02] p-6 sm:p-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300">Time</p>
          <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">Especialistas que lideram a entrega</h2>
        </div>

        <div className="relative mt-8">
          <button
            type="button"
            onClick={() => scrollByDirection('left')}
            disabled={!canGoLeft}
            aria-label="Ver pessoas anteriores"
            className="focus-ring absolute -left-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#06060b]/85 text-amber-300 transition hover:bg-[#10101a] disabled:cursor-not-allowed disabled:opacity-35 md:inline-flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => scrollByDirection('right')}
            disabled={!canGoRight}
            aria-label="Ver proximas pessoas"
            className="focus-ring absolute -right-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#06060b]/85 text-amber-300 transition hover:bg-[#10101a] disabled:cursor-not-allowed disabled:opacity-35 md:inline-flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            ref={trackRef}
            className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3"
            aria-label="Carrossel da equipe"
          >
            {visiblePeople.map((person, index) => (
              <article
                key={person.name}
                data-person-index={index}
                className="min-w-[260px] snap-start space-y-4 sm:min-w-[290px] lg:min-w-[300px]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">{person.label}</p>
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-white/10 bg-white/5">
                  <Image
                    src={person.image}
                    alt={`Foto de ${person.name}`}
                    fill
                    className="object-cover grayscale"
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 38vw, 300px"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold uppercase leading-tight text-slate-100">{person.name}</h3>
                  <p className="mt-2 text-sm uppercase tracking-[0.09em] text-slate-400">{person.role}</p>
                  <Link
                    href={person.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring mt-4 inline-flex text-xs font-semibold uppercase tracking-[0.14em] text-amber-300 transition hover:text-amber-200"
                  >
                    Ver perfil
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2">
          {visiblePeople.map((person, index) => (
            <button
              key={person.name}
              type="button"
              onClick={() => goToIndex(index)}
              className={`focus-ring h-2.5 rounded-full transition-all ${
                activeIndex === index ? 'w-7 bg-amber-400' : 'w-2.5 bg-white/25 hover:bg-white/40'
              }`}
              aria-label={`Ir para ${person.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
