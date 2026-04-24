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
  icons: {
    icon: [
      { url: '/favicon.jpeg', sizes: 'any' },
    ],
    shortcut: '/favicon.jpeg',
    apple: '/favicon.jpeg',
  },
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
    images: [
      {
        url: '/media/hero/ipxsdigital-motion-logo-fallback.jpeg',
        width: 1200,
        height: 630,
        alt: 'ipxs.digital - Entertainment Creative Technology Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ipxs.digital | Entertainment Creative Technology Studio',
    description:
      'AI-powered release ecosystems for artists, labels, and entertainment brands.',
    images: ['/media/hero/ipxsdigital-motion-logo-fallback.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport = {
  themeColor: '#fafafa',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background" data-scroll-behavior="smooth">
      <body className="relative min-h-screen flex flex-col antialiased">
        <AuroraBackground />
        <LenisProvider>
          <div className="relative z-10">
            <PortalOverlay>
            <FilmGrain />
            <Navigation />
            <PortalMenu />
            <main className="flex-1">{children}</main>
            <Footer />
            </PortalOverlay>
          </div>
        </LenisProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
