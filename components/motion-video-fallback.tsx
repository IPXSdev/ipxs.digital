'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface MotionVideoFallbackProps {
  src: string
  poster: string
  alt: string
  className?: string
  objectClassName?: string
  priority?: boolean
}

export function MotionVideoFallback({
  src,
  poster,
  alt,
  className = '',
  objectClassName = 'object-cover object-top',
  priority = false,
}: MotionVideoFallbackProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoFailed, setVideoFailed] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (videoFailed || isPlaying) return

    const timeout = window.setTimeout(() => {
      const video = videoRef.current
      if (!video) return
      if (video.paused && video.currentTime === 0) {
        setVideoFailed(true)
      }
    }, 3500)

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
        onStalled={() => setVideoFailed(true)}
        onPlaying={() => setIsPlaying(true)}
        className={`h-full w-full ${objectClassName} ${videoFailed ? 'invisible' : 'visible'}`}
      >
        <source src={src} type="video/mp4" />
        <source src={src} type="video/quicktime" />
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
