'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

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
      const amplitude = 10
      const frequency = 0.018

      // Draw primary helix strand with gradient
      const gradient1 = ctx.createLinearGradient(0, 0, 0, rect.height)
      gradient1.addColorStop(0, 'rgba(255, 200, 100, 0.05)')
      gradient1.addColorStop(0.5, 'rgba(255, 200, 100, 0.15)')
      gradient1.addColorStop(1, 'rgba(255, 200, 100, 0.05)')

      ctx.beginPath()
      ctx.strokeStyle = gradient1
      ctx.lineWidth = 1.5

      for (let y = 0; y < rect.height; y += 1) {
        const wave = prefersReducedMotion ? 0 : Math.sin(y * frequency + time * 0.015) * amplitude
        const x = centerX + wave

        if (y === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()

      // Draw secondary helix strand
      const gradient2 = ctx.createLinearGradient(0, 0, 0, rect.height)
      gradient2.addColorStop(0, 'rgba(255, 255, 255, 0.02)')
      gradient2.addColorStop(0.5, 'rgba(255, 255, 255, 0.08)')
      gradient2.addColorStop(1, 'rgba(255, 255, 255, 0.02)')

      ctx.beginPath()
      ctx.strokeStyle = gradient2
      ctx.lineWidth = 1

      for (let y = 0; y < rect.height; y += 1) {
        const wave = prefersReducedMotion ? 0 : Math.sin(y * frequency + time * 0.015 + Math.PI) * amplitude
        const x = centerX + wave

        if (y === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }
      ctx.stroke()

      // Draw cross connections at node positions
      for (let i = 0; i < worlds.length; i++) {
        const y = nodeSpacing * (i + 1)
        const wave1 = prefersReducedMotion ? 0 : Math.sin(y * frequency + time * 0.015) * amplitude
        const wave2 = prefersReducedMotion ? 0 : Math.sin(y * frequency + time * 0.015 + Math.PI) * amplitude
        const isActive = i === activeIndex
        const isHovered = i === hoveredIndex

        ctx.beginPath()
        ctx.strokeStyle = isActive
          ? 'rgba(255, 200, 100, 0.5)'
          : isHovered
            ? 'rgba(255, 200, 100, 0.3)'
            : 'rgba(255, 255, 255, 0.08)'
        ctx.lineWidth = isActive ? 2 : 1
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
  }, [worlds.length, activeIndex, hoveredIndex, isMobile])

  if (isMobile) {
    // Enhanced mobile version with pill shape
    return (
      <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-border/50 bg-background/80 px-4 py-3 backdrop-blur-md">
        {worlds.map((world, index) => (
          <button
            key={world.id}
            onClick={() => onNodeClick(index)}
            className={cn(
              'relative h-2.5 w-2.5 rounded-full transition-all duration-300',
              index === activeIndex
                ? 'scale-150 bg-accent shadow-[0_0_12px_rgba(255,200,100,0.6)]'
                : 'bg-muted-foreground/40 hover:bg-muted-foreground/60'
            )}
            aria-label={`Go to ${world.title}`}
          >
            {index === activeIndex && (
              <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-40" />
            )}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="fixed left-8 top-1/2 z-50 hidden h-[65vh] w-16 -translate-y-1/2 md:block lg:left-12">
      {/* Canvas for DNA helix animation */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />

      {/* Interactive nodes */}
      <div className="relative flex h-full flex-col justify-between py-6">
        {worlds.map((world, index) => {
          const isActive = index === activeIndex
          const isHovered = index === hoveredIndex

          return (
            <button
              key={world.id}
              onClick={() => onNodeClick(index)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={cn(
                'group relative flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-300',
                isActive
                  ? 'border-accent bg-accent/20 shadow-[0_0_25px_rgba(255,200,100,0.4),0_0_50px_rgba(255,200,100,0.2)]'
                  : 'border-border/50 bg-background/80 backdrop-blur-sm hover:border-accent/50 hover:bg-card/50'
              )}
              data-cursor="Enter"
              data-cursor-magnetic
              aria-label={`Go to ${world.title}`}
            >
              {/* Inner glow ring for active */}
              {isActive && (
                <span className="absolute inset-1 rounded-full border border-accent/30 bg-accent/10" />
              )}

              <span
                className={cn(
                  'relative font-mono text-xs font-medium transition-colors',
                  isActive ? 'text-accent' : 'text-muted-foreground group-hover:text-foreground'
                )}
              >
                {world.number}
              </span>

              {/* Tooltip with enhanced styling */}
              <span
                className={cn(
                  'absolute left-full ml-5 flex items-center gap-2 whitespace-nowrap rounded-lg border border-border/50 bg-card/95 px-3 py-2 text-xs shadow-xl backdrop-blur-sm transition-all duration-200',
                  isHovered ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0 pointer-events-none'
                )}
              >
                <span className="font-mono text-accent">{world.number}</span>
                <span className="font-medium text-foreground">{world.title}</span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
