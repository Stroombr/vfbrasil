"use client"

import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'

type SectionRevealProps = {
  children: ReactNode
  className?: string
  delayMs?: number
}

export function SectionReveal({ children, className = '', delayMs = 0 }: SectionRevealProps) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current

    if (!node) {
      return
    }

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      const timer = window.setTimeout(() => {
        setVisible(true)
      }, 0)

      return () => window.clearTimeout(timer)
    }

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`section-reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  )
}
