'use client'

import { useRef, useState, useMemo, useEffect } from 'react'
import Image from 'next/image'

interface MotionVideoFallbackProps {
  primarySrc: string
  primaryType: string
  secondarySrc?: string
  secondaryType?: string
  poster: string
  alt: string
  className?: string
  fit?: 'cover' | 'contain'
  objectPosition?: 'top' | 'center' | 'bottom'
  priority?: boolean
}

export function MotionVideoFallback({
  primarySrc,
  primaryType,
  secondarySrc,
  secondaryType,
  poster,
  alt,
  className = '',
  fit = 'contain',
  objectPosition = 'top',
  priority = false,
}: MotionVideoFallbackProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoFailed, setVideoFailed] = useState(false)
  const [stallEvents, setStallEvents] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  // Compute object classes based on props
  const computedObjectClass = useMemo(
    () => `object-${fit} object-${objectPosition}`,
    [fit, objectPosition]
  )

  const handlePlayable = () => {
    setVideoFailed(false)

    const video = videoRef.current
    if (!video) return

    const playPromise = video.play()
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        // Keep the poster/video element visible. Do not force the fallback image
        // unless the browser reports a real media error.
      })
    }
  }

  useEffect(() => {
    if (isPlaying) {
      setStallEvents(0)
      return
    }

    if (stallEvents >= 3) {
      setVideoFailed(true)
    }
  }, [stallEvents, isPlaying])

  return (
    <div className={`relative h-full w-full max-w-full overflow-hidden ${className}`}>
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={alt}
        onCanPlay={handlePlayable}
        onLoadedData={() => setVideoFailed(false)}
        onPlaying={() => {
          setVideoFailed(false)
          setIsPlaying(true)
        }}
        onPause={() => setIsPlaying(false)}
        onStalled={() => setStallEvents((prev) => prev + 1)}
        onError={() => setVideoFailed(true)}
        className={`h-full w-full ${computedObjectClass} ${videoFailed ? 'invisible' : 'visible'}`}
      >
        <source src={primarySrc} type={primaryType} />
        {secondarySrc ? <source src={secondarySrc} type={secondaryType ?? ''} /> : null}
      </video>

      {videoFailed ? (
        <Image
          src={poster}
          alt={alt}
          fill
          priority={priority}
          className={computedObjectClass}
          sizes="100vw"
        />
      ) : null}
    </div>
  )
}
