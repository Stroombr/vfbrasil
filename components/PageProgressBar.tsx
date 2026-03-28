"use client"

import { useEffect, useState } from 'react'

export function PageProgressBar() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const nextProgress = maxScroll > 0 ? Math.min((scrollTop / maxScroll) * 100, 100) : 0

      setProgress(nextProgress)
    }

    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  return (
    <div className="page-progress fixed inset-x-0 top-0 z-[70] h-1">
      <div className="page-progress-fill h-full transition-[width] duration-150" style={{ width: `${progress}%` }} />
    </div>
  )
}
