'use client'

import { useEffect, useRef } from 'react'

export function FilmGrain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    let animationId: number
    let frame = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const generateNoise = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        const noise = Math.random() * 255
        data[i] = noise     // R
        data[i + 1] = noise // G
        data[i + 2] = noise // B
        data[i + 3] = 8     // A - very subtle
      }

      ctx.putImageData(imageData, 0, 0)
    }

    const animate = () => {
      frame++
      // Update grain every 3 frames for performance
      if (frame % 3 === 0) {
        generateNoise()
      }
      animationId = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener('resize', resize)

    if (prefersReducedMotion) {
      // Static grain for reduced motion
      generateNoise()
    } else {
      animate()
    }

    return () => {
      window.removeEventListener('resize', resize)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.035]"
      aria-hidden="true"
    />
  )
}
