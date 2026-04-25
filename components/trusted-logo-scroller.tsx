import Image from 'next/image'

export interface MarqueeItem {
  kind: 'logo' | 'project'
  name: string
  src: string
  shape?: 'circle' | 'rect'
  fit?: 'contain' | 'cover'
  bg?: 'transparent' | 'card'
}

export function TrustedLogoScroller({ items }: { items: MarqueeItem[] }) {
  return (
    <section className="section-fade py-8">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex animate-scroll-slow gap-3">
            {[...items, ...items].map((item, index) => {
              const shape = item.shape ?? 'rect'
              const fit = item.fit ?? (item.kind === 'project' ? 'cover' : 'contain')
              const bg = item.bg ?? (item.kind === 'project' ? 'card' : 'transparent')

              return (
                <div
                  key={`${item.name}-${index}`}
                  className={`flex h-16 shrink-0 items-center justify-center border border-border/40 ${
                    shape === 'circle'
                      ? 'w-16 rounded-full bg-card/80'
                      : `w-40 rounded-xl ${bg === 'transparent' ? 'bg-transparent' : 'bg-card/70'}`
                  }`}
                >
                  <div className={`relative ${shape === 'circle' ? 'h-12 w-12' : 'h-11 w-full px-3'}`}>
                    <Image
                      src={item.src}
                      alt={item.name}
                      fill
                      className={fit === 'cover' ? 'object-cover object-top rounded-md' : 'object-contain'}
                      sizes="(max-width: 768px) 144px, 180px"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
