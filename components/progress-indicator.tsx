'use client'

import { cn } from '@/lib/utils'

interface ProgressIndicatorProps {
  current: number
  total: number
}

export function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  const progress = (current / total) * 100

  return (
    <div className="fixed bottom-8 right-8 z-50 hidden items-center gap-4 md:flex lg:right-12">
      {/* Current number with glow */}
      <span className="relative font-mono text-sm font-medium text-accent">
        {String(current).padStart(2, '0')}
        <span
          className="absolute inset-0 blur-sm"
          style={{ color: 'rgba(255, 200, 100, 0.5)' }}
          aria-hidden="true"
        >
          {String(current).padStart(2, '0')}
        </span>
      </span>

      {/* Progress bar with enhanced styling */}
      <div className="relative h-0.5 w-16 overflow-hidden rounded-full bg-border/50">
        {/* Glow underneath */}
        <div
          className="absolute -inset-1 rounded-full blur-md transition-all duration-500"
          style={{
            background: `linear-gradient(90deg, rgba(255,200,100,0.3) 0%, rgba(255,200,100,0) ${progress}%)`,
            width: `${progress}%`,
          }}
        />
        {/* Progress fill */}
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-accent to-accent/70 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
        {/* Shimmer on progress */}
        <div
          className="absolute left-0 top-0 h-full overflow-hidden rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
        </div>
      </div>

      {/* Total number */}
      <span className="font-mono text-sm text-muted-foreground/60">
        {String(total).padStart(2, '0')}
      </span>
    </div>
  )
}
