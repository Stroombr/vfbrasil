"use client"

import { useEffect, useMemo, useRef, useState } from 'react'

type HeroStat = {
  label: string
  value: number
  prefix?: string
  suffix?: string
}

type HeroStatsProps = {
  items: HeroStat[]
}

function formatValue(value: number) {
  return new Intl.NumberFormat('pt-BR').format(value)
}

export function HeroStats({ items }: HeroStatsProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [values, setValues] = useState<number[]>(() => items.map(() => 0))
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = containerRef.current

    if (!node) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) {
      return
    }

    const duration = 1400
    const start = performance.now()

    let frame = 0
    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      setValues(items.map((item) => Math.round(item.value * eased)))

      if (progress < 1) {
        frame = window.requestAnimationFrame(animate)
      }
    }

    frame = window.requestAnimationFrame(animate)

    return () => window.cancelAnimationFrame(frame)
  }, [isVisible, items])

  const renderedValues = useMemo(
    () =>
      values.map((value, index) => {
        const item = items[index]

        return `${item.prefix ?? ''}${formatValue(value)}${item.suffix ?? ''}`
      }),
    [items, values],
  )

  return (
    <div ref={containerRef} className="surface-panel rounded-2xl p-5 sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Impacto comprovado</p>
      <div className="mt-5 space-y-4">
        {items.map((item, index) => (
          <div key={item.label} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm text-slate-300">{item.label}</span>
              <strong className="text-base font-semibold text-white sm:text-lg">{renderedValues[index]}</strong>
            </div>
            <div className="mt-3 h-1.5 rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-amber-400 transition-[width] duration-1000"
                style={{ width: `${Math.min((values[index] / item.value) * 100, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


