'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'

interface MotionVideoFallbackProps {
  mp4Src: string
  movSrc?: string
  poster: string
  alt: string
  className?: string
  objectClassName?: string
  priority?: boolean
  objectPosition?: 'top' | 'center' | 'bottom'
  fit?: 'cover' | 'contain'
}

export function MotionVideoFallback({
  mp4Src,
  movSrc,
  poster,
  alt,
  className = '',
  objectClassName,
  priority = false,
  objectPosition = 'top',
  fit = 'cover',
}: MotionVideoFallbackProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoFailed, setVideoFailed] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const stallCountRef = useRef(0)

  // Compute object classes based on props (objectClassName takes precedence if provided)
  const computedObjectClass = objectClassName ?? `object-${fit} object-${objectPosition}`

  const handlePlaying = useCallback(() => {
    setIsPlaying(true)
    setVideoFailed(false)
    stallCountRef.current = 0
  }, [])

  const handleStalled = useCallback(() => {
    // Only fail after multiple stalls, not on first stall (transient network hiccups)
    stallCountRef.current += 1
    if (stallCountRef.current >= 3) {
      setVideoFailed(true)
    }
  }, [])

  useEffect(() => {
    if (videoFailed || isPlaying) return

    const timeout = window.setTimeout(() => {
      const video = videoRef.current
      if (!video) return
      if (video.paused && video.currentTime === 0) {
        setVideoFailed(true)
      }
    }, 5000)

    return () => window.clearTimeout(timeout)
  }, [videoFailed, isPlaying])

  return (
    <div className={`relative h-full w-full ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
        onError={() => setVideoFailed(true)}
        onAbort={() => setVideoFailed(true)}
        onStalled={handleStalled}
        onPlaying={handlePlaying}
        className={`h-full w-full ${computedObjectClass} ${videoFailed ? 'invisible' : 'visible'}`}
      >
        <source src={mp4Src} type="video/mp4" />
        {movSrc ? <source src={movSrc} type="video/quicktime" /> : null}
      </video>

      {videoFailed && (
        <Image
          src={poster}
          alt={alt}
          fill
          priority={priority}
          className={computedObjectClass}
          sizes="100vw"
        />
      )}
    </div>
  )
}
