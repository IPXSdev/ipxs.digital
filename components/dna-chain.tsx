'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { usePortal } from './portal-overlay'
import { useLenis } from './lenis-provider'

interface World {
  id: string
  number: string
  title: string
}

interface DNAChainProps {
  worlds: World[]
  activeIndex: number
  onNodeClick: (index: number) => void
}

export function DNAChain({ worlds, activeIndex, onNodeClick }: DNAChainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 768px)').matches)
    
    const handleResize = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || isMobile) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let animationId: number
    let time = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    const draw = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      const centerX = rect.width / 2
      const nodeSpacing = rect.height / (worlds.length + 1)
      const amplitude = 8
      const frequency = 0.02

      // Draw connecting strands
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.lineWidth = 1

      for (let y = 0; y < rect.height; y += 2) {
        const wave = prefersReducedMotion ? 0 : Math.sin(y * frequency + time * 0.02) * amplitude
        const x = centerX + wave
        
        if (y === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()

      // Draw second helix strand
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
      
      for (let y = 0; y < rect.height; y += 2) {
        const wave = prefersReducedMotion ? 0 : Math.sin(y * frequency + time * 0.02 + Math.PI) * amplitude
        const x = centerX + wave
        
        if (y === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()

      // Draw cross connections
      for (let i = 0; i < worlds.length; i++) {
        const y = nodeSpacing * (i + 1)
        const wave1 = prefersReducedMotion ? 0 : Math.sin(y * frequency + time * 0.02) * amplitude
        const wave2 = prefersReducedMotion ? 0 : Math.sin(y * frequency + time * 0.02 + Math.PI) * amplitude
        
        ctx.beginPath()
        ctx.strokeStyle = i === activeIndex ? 'rgba(255, 200, 100, 0.3)' : 'rgba(255, 255, 255, 0.05)'
        ctx.lineWidth = 1
        ctx.moveTo(centerX + wave1, y)
        ctx.lineTo(centerX + wave2, y)
        ctx.stroke()
      }

      time++
      animationId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [worlds.length, activeIndex, isMobile])

  if (isMobile) {
    // Simplified mobile version - horizontal dots at bottom
    return (
      <div className="fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 gap-3">
        {worlds.map((world, index) => (
          <button
            key={world.id}
            onClick={() => onNodeClick(index)}
            className={cn(
              'h-3 w-3 rounded-full border transition-all duration-300',
              index === activeIndex
                ? 'scale-125 border-accent bg-accent shadow-[0_0_12px_rgba(255,200,100,0.5)]'
                : 'border-muted-foreground/30 bg-transparent hover:border-muted-foreground'
            )}
            aria-label={`Go to ${world.title}`}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="fixed left-8 top-1/2 z-50 hidden h-[60vh] w-12 -translate-y-1/2 md:block lg:left-12">
      {/* Canvas for DNA helix animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      />

      {/* Interactive nodes */}
      <div className="relative flex h-full flex-col justify-between py-8">
        {worlds.map((world, index) => (
          <button
            key={world.id}
            onClick={() => onNodeClick(index)}
            className={cn(
              'group relative flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300',
              index === activeIndex
                ? 'border-accent bg-accent/20 shadow-[0_0_20px_rgba(255,200,100,0.4)]'
                : 'border-muted-foreground/30 bg-background/50 hover:border-muted-foreground hover:bg-muted/20'
            )}
            aria-label={`Go to ${world.title}`}
          >
            <span
              className={cn(
                'text-xs font-mono transition-colors',
                index === activeIndex ? 'text-accent' : 'text-muted-foreground group-hover:text-foreground'
              )}
            >
              {world.number}
            </span>
            
            {/* Tooltip */}
            <span className="absolute left-full ml-4 whitespace-nowrap rounded bg-card px-2 py-1 text-xs text-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
              {world.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
