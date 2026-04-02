'use client'

import Image, { type ImageProps } from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Locale } from '@/data/i18n'

type Person = {
  label: string
  name: string
  role: string
  image: ImageProps['src']
  linkedin: string
}

type PeopleShowcaseProps = {
  id?: string
  locale: Locale
  people: readonly Person[]
}

export function PeopleShowcase({ id, locale, people }: PeopleShowcaseProps) {
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

  const copy: Record<
    Locale,
    {
      eyebrow: string
      title: string
      previousPeople: string
      nextPeople: string
      carouselLabel: string
      viewProfile: string
      goToPerson: string
      personPhoto: string
    }
  > = {
    pt: {
      eyebrow: 'Time',
      title: 'Especialistas que lideram a entrega',
      previousPeople: 'Ver pessoas anteriores',
      nextPeople: 'Ver próximas pessoas',
      carouselLabel: 'Carrossel da equipe',
      viewProfile: 'Ver perfil',
      goToPerson: 'Ir para',
      personPhoto: 'Foto de',
    },
    en: {
      eyebrow: 'Team',
      title: 'Specialists leading delivery',
      previousPeople: 'View previous people',
      nextPeople: 'View next people',
      carouselLabel: 'Team carousel',
      viewProfile: 'View profile',
      goToPerson: 'Go to',
      personPhoto: 'Photo of',
    },
    es: {
      eyebrow: 'Equipo',
      title: 'Especialistas que lideran la entrega',
      previousPeople: 'Ver personas anteriores',
      nextPeople: 'Ver proximas personas',
      carouselLabel: 'Carrusel del equipo',
      viewProfile: 'Ver perfil',
      goToPerson: 'Ir a',
      personPhoto: 'Foto de',
    },
    fr: {
      eyebrow: 'Equipe',
      title: 'Specialistes qui pilotent la livraison',
      previousPeople: 'Voir les personnes precedentes',
      nextPeople: 'Voir les personnes suivantes',
      carouselLabel: 'Carrousel de l equipe',
      viewProfile: 'Voir le profil',
      goToPerson: 'Aller a',
      personPhoto: 'Photo de',
    },
    it: {
      eyebrow: 'Team',
      title: 'Specialisti che guidano la consegna',
      previousPeople: 'Vedi persone precedenti',
      nextPeople: 'Vedi persone successive',
      carouselLabel: 'Carosello del team',
      viewProfile: 'Vedi profilo',
      goToPerson: 'Vai a',
      personPhoto: 'Foto di',
    },
  }

  if (visiblePeople.length === 0) {
    return null
  }

  return (
    <section id={id} className="vf-shell pb-12">
      <div className="rounded-3xl p-6 sm:p-8">
        <div className="vf-heading-center">
          <p className="vf-eyebrow">{copy[locale].eyebrow}</p>
          <h2 className="vf-title sm:text-4xl">{copy[locale].title}</h2>
        </div>

        <div className="relative mt-8">
          <button
            type="button"
            onClick={() => scrollByDirection('left')}
            disabled={!canGoLeft}
            aria-label={copy[locale].previousPeople}
            className="focus-ring absolute -left-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#06060b]/85 text-amber-300 transition hover:bg-[#10101a] disabled:cursor-not-allowed disabled:opacity-35 md:inline-flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => scrollByDirection('right')}
            disabled={!canGoRight}
            aria-label={copy[locale].nextPeople}
            className="focus-ring absolute -right-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-[#06060b]/85 text-amber-300 transition hover:bg-[#10101a] disabled:cursor-not-allowed disabled:opacity-35 md:inline-flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            ref={trackRef}
            className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3"
            aria-label={copy[locale].carouselLabel}
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
                    alt={`${copy[locale].personPhoto} ${person.name}`}
                    fill
                    className="object-cover"
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
                    {copy[locale].viewProfile}
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
              aria-label={`${copy[locale].goToPerson} ${person.name}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

