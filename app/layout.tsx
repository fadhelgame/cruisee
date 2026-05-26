import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Cruisee — Redefine the Horizon',
  description:
    'Ultra-luxury private cruise experiences. Handcrafted itineraries, world-class service, destinations beyond the ordinary.',
  openGraph: {
    title: 'Cruisee — Redefine the Horizon',
    description: 'Ultra-luxury private cruise experiences.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="bg-background text-primary font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
