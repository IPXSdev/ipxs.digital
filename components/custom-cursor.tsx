'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type CursorLabel = 'Open' | 'Enter' | 'Play' | null

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState<CursorLabel>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isMagnetic, setIsMagnetic] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const mousePos = useRef({ x: 0, y: 0 })
  const dotPos = useRef({ x: 0, y: 0 })
  const ringPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // Only show custom cursor on desktop
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (isMobile || prefersReducedMotion) {
      return
    }

    // Hide default cursor
    document.body.style.cursor = 'none'

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    // Detect hoverable elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Check for data-cursor attribute
      const cursorType = target.closest('[data-cursor]')?.getAttribute('data-cursor') as CursorLabel
      
      if (cursorType) {
        setLabel(cursorType)
        setIsHovering(true)
        setIsMagnetic(target.closest('[data-cursor-magnetic]') !== null)
        return
      }

      // Check for links
      const link = target.closest('a, button')
      if (link) {
        // World CTAs and tiles get "Enter"
        if (link.closest('[data-world]') || link.hasAttribute('data-world-cta')) {
          setLabel('Enter')
          setIsHovering(true)
          setIsMagnetic(true)
          return
        }
        
        // Regular links get "Open"
        setLabel('Open')
        setIsHovering(true)
        setIsMagnetic(false)
        return
      }

      setLabel(null)
      setIsHovering(false)
      setIsMagnetic(false)
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      if (dotRef.current && ringRef.current && labelRef.current) {
        // Smooth follow for dot (faster)
        dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.35
        dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.35
        
        // Smooth follow for ring (slower)
        ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.15
        ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.15

        dotRef.current.style.transform = `translate(${dotPos.current.x}px, ${dotPos.current.y}px) translate(-50%, -50%)`
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`
        labelRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`
      }
      animationId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousemove', handleElementHover)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    
    animationId = requestAnimationFrame(animate)

    return () => {
      document.body.style.cursor = ''
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousemove', handleElementHover)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      cancelAnimationFrame(animationId)
    }
  }, [])

  // Don't render on mobile
  if (typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches) {
    return null
  }

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className={cn(
          'pointer-events-none fixed left-0 top-0 z-[10000] h-2 w-2 rounded-full bg-foreground mix-blend-difference transition-opacity duration-200',
          isVisible ? 'opacity-100' : 'opacity-0',
          isHovering && 'scale-0'
        )}
        aria-hidden="true"
      />
      
      {/* Ring */}
      <div
        ref={ringRef}
        className={cn(
          'pointer-events-none fixed left-0 top-0 z-[10000] rounded-full border border-foreground/50 mix-blend-difference transition-all duration-300',
          isVisible ? 'opacity-100' : 'opacity-0',
          isHovering ? 'h-16 w-16' : 'h-8 w-8',
          isMagnetic && isHovering && 'border-accent/80'
        )}
        aria-hidden="true"
      />

      {/* Label */}
      <div
        ref={labelRef}
        className={cn(
          'pointer-events-none fixed left-0 top-0 z-[10000] flex h-16 w-16 items-center justify-center transition-opacity duration-200',
          isHovering && label ? 'opacity-100' : 'opacity-0'
        )}
        aria-hidden="true"
      >
        <span className="text-xs font-medium uppercase tracking-wider text-foreground mix-blend-difference">
          {label}
        </span>
      </div>
    </>
  )
}
