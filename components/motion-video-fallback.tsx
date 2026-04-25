'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
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
  const [isPlaying, setIsPlaying] = useState(false)
  const [stallEvents, setStallEvents] = useState(0)

  const objectClassName = useMemo(
    () => `object-${fit} object-${objectPosition}`,
    [fit, objectPosition],
  )

  useEffect(() => {
    if (videoFailed || isPlaying) return

    const timeout = window.setTimeout(() => {
      const video = videoRef.current
      if (!video) return
      if (video.paused && video.currentTime === 0) {
        setVideoFailed(true)
      }
    }, 4500)

    return () => window.clearTimeout(timeout)
  }, [videoFailed, isPlaying])

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
        onStalled={() => setStallEvents((value) => value + 1)}
        onPlaying={() => setIsPlaying(true)}
        className={`h-full w-full ${objectClassName} ${videoFailed ? 'invisible' : 'visible'}`}
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
          className={objectClassName}
          sizes="100vw"
        />
      ) : null}
    </div>
  )
}
