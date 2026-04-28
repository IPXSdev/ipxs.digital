'use client'

import { useState } from 'react'
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
  mobileFit?: 'cover' | 'contain'
  desktopFit?: 'cover' | 'contain'
  objectPosition?: 'top' | 'center' | 'bottom'
  mobileObjectPosition?: 'top' | 'center' | 'bottom'
  desktopObjectPosition?: 'top' | 'center' | 'bottom'
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
  mobileFit,
  desktopFit,
  objectPosition = 'top',
  mobileObjectPosition,
  desktopObjectPosition,
  priority = false,
}: MotionVideoFallbackProps) {
  const [videoFailed, setVideoFailed] = useState(false)

  const mobileFitClassMap = {
    cover: 'object-cover',
    contain: 'object-contain',
  } as const

  const desktopFitClassMap = {
    cover: 'sm:object-cover',
    contain: 'sm:object-contain',
  } as const

  const mobilePositionClassMap = {
    top: 'object-top',
    center: 'object-center',
    bottom: 'object-bottom',
  } as const

  const desktopPositionClassMap = {
    top: 'sm:object-top',
    center: 'sm:object-center',
    bottom: 'sm:object-bottom',
  } as const

  const resolvedMobileFit = mobileFit ?? fit
  const resolvedDesktopFit = desktopFit ?? fit
  const resolvedMobilePosition = mobileObjectPosition ?? objectPosition
  const resolvedDesktopPosition = desktopObjectPosition ?? objectPosition

  const objectClassName = [
    mobileFitClassMap[resolvedMobileFit],
    desktopFitClassMap[resolvedDesktopFit],
    mobilePositionClassMap[resolvedMobilePosition],
    desktopPositionClassMap[resolvedDesktopPosition],
  ].join(' ')

  return (
    <div className={`relative h-full w-full max-w-full overflow-hidden ${className}`}>
      <video
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
          className={computedObjectClass}
          sizes="100vw"
        />
      ) : null}
    </div>
  )
}
