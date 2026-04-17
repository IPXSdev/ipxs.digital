'use client'

import { cn } from '@/lib/utils'

interface ProgressIndicatorProps {
  current: number
  total: number
}

export function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  return (
    <div className="fixed bottom-8 right-8 z-50 hidden items-center gap-3 font-mono text-sm md:flex lg:right-12">
      <span className="text-accent">{String(current).padStart(2, '0')}</span>
      <div className="relative h-px w-12 bg-border">
        <div
          className="absolute left-0 top-0 h-full bg-accent transition-all duration-500"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
      <span className="text-muted-foreground">{String(total).padStart(2, '0')}</span>
    </div>
  )
}
