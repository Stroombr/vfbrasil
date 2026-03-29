"use client"

import type { ReactNode } from 'react'

type SectionRevealProps = {
  children: ReactNode
  className?: string
  delayMs?: number
}

export function SectionReveal({ children, className = '', delayMs = 0 }: SectionRevealProps) {
  void delayMs

  return <div className={`section-reveal ${className}`.trim()}>{children}</div>
}
