import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { ArrowRight } from 'lucide-react'

interface CaseStudyCardProps {
  title: string
  category: string
  outcome: string
  href?: string
  className?: string
  isPlaceholder?: boolean
}

export function CaseStudyCard({
  title,
  category,
  outcome,
  href = '#',
  className,
  isPlaceholder = false,
}: CaseStudyCardProps) {
  return (
    <article
      className={cn(
        'gradient-border sheen-hover group relative flex flex-col overflow-hidden rounded-lg transition-all duration-300',
        'hover:-translate-y-0.5 hover:neon-glow-soft',
        className
      )}
    >
      {/* Image placeholder */}
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        {isPlaceholder ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <div className="h-12 w-12 rounded-full border-2 border-dashed border-muted-foreground/30" />
              <span className="text-xs">Coming Soon</span>
            </div>
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-muted to-secondary" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
