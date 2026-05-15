import type { Metadata } from 'next'

import { DxaIndexDashboard } from '@/components/dxa-index/dxa-index-dashboard'

export const metadata: Metadata = {
  title: 'DXA Index | IPXS Internal',
  description:
    'Internal IPXS project index for Adrian Miller-connected projects, referrals, live MVPs, campaigns, and creative assets.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function DxaIndexPage() {
  return <DxaIndexDashboard />
}
