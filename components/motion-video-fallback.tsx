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
  const [videoFailed, setVideoFailed] = useState(false)

  const fitClassMap = {
    cover: 'object-cover',
    contain: 'object-contain',
  } as const

  const positionClassMap = {
    top: 'object-top',
    center: 'object-center',
    bottom: 'object-bottom',
  } as const

  const objectClassName = `${fitClassMap[fit]} ${positionClassMap[objectPosition]}`

  return (
    <div className={`relative h-full w-full ${className}`}>
      <video
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
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
          className={objectClassName}
          sizes="100vw"
        />
      ) : null}
    </div>
  )
}
