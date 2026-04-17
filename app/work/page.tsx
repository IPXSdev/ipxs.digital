import type { Metadata } from 'next'
import { WorkWorldsClient } from './work-worlds-client'
import { getWorldsWithCaseStudies } from '@/content/case-studies'

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'Explore six case study worlds spanning release systems, motion campaigns, commercials, deck architecture, product platforms, and investor systems.',
}

export default function WorkPage() {
  const worlds = getWorldsWithCaseStudies()

  return <WorkWorldsClient worlds={worlds} />
}
