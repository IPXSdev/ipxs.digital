import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DXA Index | IPXS Internal',
  description:
    'Internal IPXS project index for Adrian Miller-connected projects, referrals, live MVPs, campaigns, and creative assets.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function DXAIndexLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
