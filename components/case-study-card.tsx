import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'

interface CaseStudyCardProps {
  title: string
  category: string
  outcome: string
  href?: string
  cover?: string
  className?: string
}

export function CaseStudyCard({
  title,
  category,
  outcome,
  href = '#',
  cover,
  className,
}: CaseStudyCardProps) {
  return (
    <article
      className={cn(
        'group sheen-hover gradient-border neon-glow-hover relative flex flex-col overflow-hidden rounded-lg bg-card/90 transition-all duration-300',
        'hover:bg-secondary/55',
        className
      )}
    >
      {/* Cover image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        {cover ? (
          <Image
            src={cover}
            alt={title}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-secondary" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <Badge
          variant="secondary"
          className="w-fit text-xs font-normal uppercase tracking-wider"
        >
          {category}
        </Badge>
        <h3 className="font-serif text-lg font-medium leading-snug text-foreground">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-muted-foreground">{outcome}</p>
        <Link
          href={href}
          className="mt-auto inline-flex items-center gap-2 pt-2 text-sm font-medium text-foreground transition-colors hover:text-accent"
        >
          View Case Study
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}
