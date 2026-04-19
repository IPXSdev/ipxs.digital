import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { LenisProvider } from '@/components/lenis-provider'
import { FilmGrain } from '@/components/film-grain'
import { PortalOverlay } from '@/components/portal-overlay'
import { PortalMenu } from '@/components/portal-menu'
import { AuroraBackground } from '@/components/aurora-background'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'ipxs.digital | Entertainment Creative Technology Studio',
    template: '%s | ipxs.digital',
  },
  description:
    'AI-powered release ecosystems for artists, labels, and entertainment brands. Cover art, motion, campaigns, decks, and digital experiences engineered to ship fast and look expensive.',
  keywords: [
    'creative technology',
    'entertainment',
    'AI',
    'cover art',
    'motion design',
    'pitch decks',
    'digital experiences',
    'record labels',
    'artists',
  ],
  authors: [{ name: 'Darion R. Harris', url: 'https://ipxs.digital' }],
  creator: 'ipxs.digital',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ipxs.digital',
    siteName: 'ipxs.digital',
    title: 'ipxs.digital | Entertainment Creative Technology Studio',
    description:
      'AI-powered release ecosystems for artists, labels, and entertainment brands.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ipxs.digital | Entertainment Creative Technology Studio',
    description:
      'AI-powered release ecosystems for artists, labels, and entertainment brands.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport = {
  themeColor: '#141414',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="relative min-h-screen flex flex-col antialiased">
        <AuroraBackground />
        <LenisProvider>
          <PortalOverlay>
            <FilmGrain />
            <Navigation />
            <PortalMenu />
            <main className="flex-1">{children}</main>
            <Footer />
          </PortalOverlay>
        </LenisProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
