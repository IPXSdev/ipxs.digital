'use client'

import { useRef, useState, useMemo } from 'react'
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

  // Compute object classes based on props (objectClassName takes precedence if provided)
  const computedObjectClass = useMemo(
    () => objectClassName ?? `object-${fit} object-${objectPosition}`,
    [objectClassName, fit, objectPosition]
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
        onPlaying={() => setVideoFailed(false)}
        onError={() => setVideoFailed(true)}
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
