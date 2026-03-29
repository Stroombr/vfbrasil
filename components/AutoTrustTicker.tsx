import { BadgeCheck } from 'lucide-react'

type AutoTrustTickerProps = {
  items: string[]
}

export function AutoTrustTicker({ items }: AutoTrustTickerProps) {
  const loopedItems = [...items, ...items]

  return (
    <div className="hero-ticker">
      <div className="hero-ticker-track">
        {loopedItems.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="hero-badge inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
          >
            <BadgeCheck className="h-3.5 w-3.5 text-amber-300" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
