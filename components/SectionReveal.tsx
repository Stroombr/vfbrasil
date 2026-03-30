"use client"

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

import { usePrefersReducedMotion } from './usePrefersReducedMotion'

type SectionRevealProps = {
  children: ReactNode
  className?: string
  delayMs?: number
}

export function SectionReveal({ children, className = '', delayMs = 0 }: SectionRevealProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(() => prefersReducedMotion)
  const shouldRenderVisible = prefersReducedMotion || isVisible

  useEffect(() => {
    if (prefersReducedMotion) {
      return
    }

    const node = wrapperRef.current

    if (!node) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return
        }

        setIsVisible(true)
        observer.disconnect()
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px',
      },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [prefersReducedMotion])

  return (
    <div
      ref={wrapperRef}
      className={`section-reveal ${shouldRenderVisible ? 'is-visible' : ''} ${className}`.trim()}
      style={{ '--reveal-delay': `${delayMs}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}
