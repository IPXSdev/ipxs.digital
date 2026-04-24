import Image from 'next/image'

export interface TrustedLogoItem {
  name: string
  src: string
  shape: 'circle' | 'rect'
  fit: 'contain'
  bg?: 'transparent' | 'card'
}

export function TrustedLogoScroller({ logos }: { logos: TrustedLogoItem[] }) {
  return (
    <section className="section-fade py-8">
      <div className="mx-auto max-w-7xl overflow-hidden px-4 lg:px-8">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Trusted By</p>
        <div className="flex animate-scroll-slow gap-3">
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              className={`flex h-12 min-w-40 items-center justify-center border border-border/50 px-3 ${
                logo.shape === 'circle'
                  ? 'w-12 min-w-12 rounded-full bg-card/80'
                  : `rounded-xl ${logo.bg === 'transparent' ? 'bg-transparent' : 'bg-card/70'}`
              }`}
            >
              <div className={`relative ${logo.shape === 'circle' ? 'h-10 w-10' : 'h-8 w-full'}`}>
                <Image
                  src={logo.src}
                  alt={logo.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 128px, 160px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
