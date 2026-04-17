'use client'

import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface PortalContextValue {
  triggerPortal: (callback?: () => void) => void
  isTransitioning: boolean
}

const PortalContext = createContext<PortalContextValue>({
  triggerPortal: () => {},
  isTransitioning: false,
})

export const usePortal = () => useContext(PortalContext)

export function PortalOverlay({ children }: { children?: React.ReactNode }) {
  const [isActive, setIsActive] = useState(false)
  const [phase, setPhase] = useState<'idle' | 'enter' | 'hold' | 'exit'>('idle')
  const [pendingCallback, setPendingCallback] = useState<(() => void) | null>(null)

  const triggerPortal = useCallback((callback?: () => void) => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      callback?.()
      return
    }

    setIsActive(true)
    setPhase('enter')
    setPendingCallback(() => callback || null)
  }, [])

  useEffect(() => {
    if (phase === 'enter') {
      const timer = setTimeout(() => {
        setPhase('hold')
        pendingCallback?.()
      }, 300)
      return () => clearTimeout(timer)
    }

    if (phase === 'hold') {
      const timer = setTimeout(() => {
        setPhase('exit')
      }, 100)
      return () => clearTimeout(timer)
    }

    if (phase === 'exit') {
      const timer = setTimeout(() => {
        setPhase('idle')
        setIsActive(false)
        setPendingCallback(null)
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [phase, pendingCallback])

  return (
    <PortalContext.Provider value={{ triggerPortal, isTransitioning: isActive }}>
      {children}
      
      {/* Portal Overlay */}
      <div
        className={cn(
          'pointer-events-none fixed inset-0 z-[9998]',
          isActive ? 'pointer-events-auto' : ''
        )}
        aria-hidden="true"
      >
        {/* Blur layer */}
        <div
          className={cn(
            'absolute inset-0 bg-background/80 backdrop-blur-xl transition-opacity duration-300',
            phase === 'enter' || phase === 'hold' ? 'opacity-100' : 'opacity-0'
          )}
        />

        {/* Light streak */}
        <div
          className={cn(
            'absolute inset-0 overflow-hidden transition-opacity duration-300',
            phase === 'enter' || phase === 'hold' ? 'opacity-100' : 'opacity-0'
          )}
        >
          <div
            className={cn(
              'absolute left-1/2 top-1/2 h-[200vh] w-px -translate-x-1/2 -translate-y-1/2 bg-gradient-to-b from-transparent via-accent/40 to-transparent transition-all duration-500',
              phase === 'enter' ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'
            )}
          />
          <div
            className={cn(
              'absolute left-1/2 top-1/2 h-px w-[200vw] -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-transparent via-accent/30 to-transparent transition-all duration-500 delay-100',
              phase === 'enter' ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
            )}
          />
        </div>

        {/* Grain texture */}
        <div
          className={cn(
            'absolute inset-0 transition-opacity duration-300',
            phase === 'enter' || phase === 'hold' ? 'opacity-100' : 'opacity-0'
          )}
        >
          <svg className="h-full w-full opacity-20">
            <filter id="portal-noise">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8"
                numOctaves="4"
                stitchTiles="stitch"
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#portal-noise)" />
          </svg>
        </div>

        {/* Radial wipe */}
        <div
          className={cn(
            'absolute inset-0 bg-background transition-all duration-300 ease-out',
            phase === 'enter' ? 'clip-path-circle-full' : '',
            phase === 'hold' ? 'clip-path-circle-full' : '',
            phase === 'exit' ? 'clip-path-circle-zero' : '',
            phase === 'idle' ? 'clip-path-circle-zero' : ''
          )}
          style={{
            clipPath: 
              phase === 'idle' ? 'circle(0% at 50% 50%)' :
              phase === 'enter' ? 'circle(150% at 50% 50%)' :
              phase === 'hold' ? 'circle(150% at 50% 50%)' :
              'circle(0% at 50% 50%)'
          }}
        />
      </div>
    </PortalContext.Provider>
  )
}
