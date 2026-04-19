'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'
import type { CaseStudyMedia } from '@/content/case-studies'

interface CaseStudyMediaProps {
  item: CaseStudyMedia
}

const fallbackPoster =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="%23161616"/><stop offset="100%" stop-color="%23272727"/></linearGradient></defs><rect width="1000" height="1000" fill="url(%23g)"/></svg>'

export function CaseStudyMediaView({ item }: CaseStudyMediaProps) {
  const [playVideo, setPlayVideo] = useState(false)

  if (item.type === 'video') {
    return (
      <div className="group relative aspect-square overflow-hidden rounded-lg border border-border/50 bg-muted/40">
        {!playVideo ? (
          <button
            type="button"
            className="relative h-full w-full"
            onClick={() => setPlayVideo(true)}
            aria-label={`Play video: ${item.caption}`}
          >
            <img
              src={item.poster ?? fallbackPoster}
              alt={item.alt}
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <span className="absolute inset-0 bg-background/20" />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-background/85 px-4 py-2 text-sm font-medium text-foreground">
                <Play className="h-4 w-4" />
                Click to play
              </span>
            </span>
          </button>
        ) : item.src ? (
          <video
            className="h-full w-full object-cover"
            controls
            poster={item.poster ?? fallbackPoster}
            preload="none"
            playsInline
            autoPlay
          >
            <source src={item.src} />
          </video>
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center text-sm text-muted-foreground">
            Video source will be connected in production.
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="group relative aspect-square overflow-hidden rounded-lg border border-border/50 bg-muted/40">
      {item.src ? (
        <img
          src={item.src}
          alt={item.alt}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      ) : (
        <img
          src={fallbackPoster}
          alt={item.alt}
          className="h-full w-full object-cover"
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  )
}
