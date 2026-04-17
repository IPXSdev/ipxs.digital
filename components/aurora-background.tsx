'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export function AuroraBackground() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange = () => setReducedMotion(mediaQuery.matches)

    handleChange()
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="aurora-mesh-bg absolute inset-0 opacity-75" />
      <div
        className={cn(
          'absolute -left-32 top-[-8rem] h-[32rem] w-[32rem] rounded-full bg-[oklch(0.78_0.18_305_/_0.24)] blur-3xl',
          !reducedMotion && 'animate-[floatA_18s_ease-in-out_infinite]'
        )}
      />
      <div
        className={cn(
          'absolute -right-40 top-[12rem] h-[36rem] w-[36rem] rounded-full bg-[oklch(0.8_0.16_220_/_0.2)] blur-3xl',
          !reducedMotion && 'animate-[floatB_22s_ease-in-out_infinite]'
        )}
      />
      <div
        className={cn(
          'absolute left-1/3 top-[55%] h-[26rem] w-[26rem] rounded-full bg-[oklch(0.8_0.15_160_/_0.16)] blur-3xl',
          !reducedMotion && 'animate-[floatC_24s_ease-in-out_infinite]'
        )}
      />
      <style jsx>{`
        @keyframes floatA {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(14px, 12px, 0);
          }
        }

        @keyframes floatB {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(-20px, 14px, 0);
          }
        }

        @keyframes floatC {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(10px, -10px, 0);
          }
        }
      `}</style>
    </div>
  )
}
