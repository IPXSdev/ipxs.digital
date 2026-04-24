'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface MotionVideoFallbackProps {
  mp4Src: string
  movSrc?: string
  poster: string
  alt: string
  className?: string
  objectClassName?: string
  priority?: boolean
}

export function MotionVideoFallback({
  mp4Src,
  movSrc,
  poster,
  alt,
  className = '',
  objectClassName = 'object-cover',
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
        <source src={mp4Src} type="video/mp4" />
        {movSrc ? <source src={movSrc} type="video/quicktime" /> : null}
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
