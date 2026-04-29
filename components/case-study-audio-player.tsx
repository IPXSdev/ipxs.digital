'use client'

import { useMemo, useState } from 'react'

interface CaseStudyAudioTrack {
  id: string
  title: string
  src: string
  description?: string
}

interface CaseStudyAudioPlayerProps {
  tracks: CaseStudyAudioTrack[]
}

export function CaseStudyAudioPlayer({ tracks }: CaseStudyAudioPlayerProps) {
  const [activeTrackId, setActiveTrackId] = useState(tracks[0]?.id ?? '')

  const activeTrack = useMemo(
    () => tracks.find((track) => track.id === activeTrackId) ?? tracks[0],
    [tracks, activeTrackId],
  )

  if (!activeTrack) return null

  return (
    <div className="rounded-2xl border border-border/50 bg-card/70 p-5 shadow-sm md:p-6">
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:items-start">
        <div className="space-y-2">
          {tracks.map((track, index) => {
            const isActive = track.id === activeTrack.id
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => setActiveTrackId(track.id)}
                className={`w-full rounded-xl border px-4 py-3 text-left transition-colors ${
                  isActive
                    ? 'border-foreground bg-foreground/5 text-foreground'
                    : 'border-border/60 bg-background/50 text-muted-foreground hover:border-foreground/50 hover:text-foreground'
                }`}
              >
                <p className="font-mono text-xs opacity-70">{String(index + 1).padStart(2, '0')}</p>
                <p className="mt-1 font-serif text-lg">{track.title}</p>
              </button>
            )
          })}
        </div>

        <div>
          <h3 className="mb-2 font-serif text-xl font-medium">{activeTrack.title}</h3>
          {activeTrack.description ? (
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{activeTrack.description}</p>
          ) : null}
          <audio
            controls
            controlsList="nodownload"
            disablePictureInPicture
            preload="metadata"
            src={activeTrack.src}
            className="w-full"
            onContextMenu={(event) => event.preventDefault()}
          >
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
  )
}
