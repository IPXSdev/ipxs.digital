import type { Metadata } from 'next'
import { WorkWorldsClient } from './work-worlds-client'

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'Explore our case studies across release systems, motion campaigns, commercials, pitch decks, and digital platforms for artists, labels, and entertainment brands.',
}

const worlds = [
  {
    id: 'music-release-systems',
    number: '01',
    title: 'Music Release Systems',
    outcome: 'Complete visual ecosystems that turn drops into cultural moments. Cover art, motion assets, and rollout kits engineered for maximum impact.',
    caseStudies: [
      { id: 'visual-identity-debut-album', title: 'Visual Identity for Debut Album', category: 'Cover Art + Motion', outcome: 'Complete visual ecosystem for platinum-certified debut.' },
      { id: 'ep-release-campaign', title: 'EP Release Campaign', category: 'Multi-platform System', outcome: '12M streams in first week with cohesive visual rollout.' },
      { id: 'single-artwork-series', title: 'Single Artwork Series', category: 'Cover Art', outcome: 'Iconic visual language across 6-single release cycle.' },
    ],
  },
  {
    id: 'motion-social',
    number: '02',
    title: 'Motion + Social Ads',
    outcome: 'Scroll-stopping motion content and social campaigns that generate millions of impressions and drive real engagement.',
    caseStudies: [
      { id: 'summer-tour-campaign', title: 'Summer Tour Campaign', category: 'Social Campaign', outcome: '50M+ impressions across platforms.' },
      { id: 'single-launch-motion-pack', title: 'Single Launch Motion Pack', category: 'Motion Assets', outcome: 'Animated content driving 3x engagement rate.' },
      { id: 'album-visualizer-series', title: 'Album Visualizer Series', category: 'Visualizers', outcome: 'Full-length visualizers with 8M+ YouTube views.' },
      { id: 'instagram-story-kit', title: 'Instagram Story Kit', category: 'Social Templates', outcome: 'Reusable template system for ongoing releases.' },
    ],
  },
  {
    id: 'commercials',
    number: '03',
    title: 'Commercials',
    outcome: 'High-production spots that tell compelling stories and drive measurable brand awareness lift.',
    caseStudies: [
      { id: 'brand-commercial-spot', title: 'Brand Commercial Spot', category: '60-second Spot', outcome: 'National campaign with 18% brand lift.' },
      { id: 'product-launch-film', title: 'Product Launch Film', category: 'Hero Video', outcome: 'Hero video + cutdowns driving product sellout.' },
    ],
  },
  {
    id: 'pitch-decks',
    number: '04',
    title: 'Pitch Deck Architecture',
    outcome: 'Investor-ready presentations that close rounds. Narrative architecture and visual design that commands attention.',
    caseStudies: [
      { id: 'series-a-investor-deck', title: 'Series A Investor Deck', category: 'Investor Deck', outcome: 'Helped close $12M seed round.' },
      { id: 'label-pitch-package', title: 'Label Pitch Package', category: 'Artist Pitch', outcome: 'Secured major label signing for emerging artist.' },
      { id: 'fund-lp-presentation', title: 'Fund LP Presentation', category: 'Fund Materials', outcome: 'Quarterly reporting suite for $200M fund.' },
    ],
  },
  {
    id: 'websites',
    number: '05',
    title: 'Websites / MVP Platforms',
    outcome: 'Immersive web experiences and functional platforms that convert visitors into customers, fans, and advocates.',
    caseStudies: [
      { id: 'artist-portfolio-platform', title: 'Artist Portfolio Platform', category: 'Artist Site', outcome: '200% inquiry increase post-launch.' },
      { id: 'label-homepage-redesign', title: 'Label Homepage Redesign', category: 'Label Site', outcome: 'Full brand expression with 4x time on site.' },
      { id: 'merch-store-mvp', title: 'Merch Store MVP', category: 'E-commerce', outcome: 'Direct-to-fan platform with $500K first month.' },
    ],
  },
  {
    id: 'institutional',
    number: '06',
    title: 'Institutional / Investor Systems',
    outcome: 'Board-ready platforms and investor communications that serve serious capital with precision and clarity.',
    caseStudies: [
      { id: 'fund-performance-dashboard', title: 'Fund Performance Dashboard', category: 'Data Platform', outcome: '$500M+ AUM reporting with real-time analytics.' },
      { id: 'investor-relations-portal', title: 'Investor Relations Portal', category: 'IR Platform', outcome: 'Secure LP portal with document management.' },
    ],
  },
]

export default function WorkPage() {
  return <WorkWorldsClient worlds={worlds} />
}
