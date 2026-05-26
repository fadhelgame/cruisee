# CRUISEE — Implementation Plan
**Cinematic Luxury Cruise Website** | Inspired by JeskoJets.com

---

## 0. Reference Analysis — JeskoJets.com

| Pattern | Detail |
|---|---|
| Layout | Full-viewport sections, vertical stack, no pagination |
| Hero | Layered imagery, scrollytelling, cinematic reveal |
| Nav | Sticky transparent→solid, minimal links, persistent CTA |
| Typography | Large display headlines, generous letter-spacing, caps labels |
| Colors | #050505 bg, #FFFFFF text, accent gold/warm-white |
| Animations | Scroll-triggered fades, parallax layers, section entrances |
| Spacing | Extreme whitespace — luxury breathing room |
| Scroll | Smooth inertia (Lenis), progressive disclosure |
| Components | Minimal buttons (no fill → border), form overlay modal |

---

## 1. Technology Stack

```
Framework:    Next.js 14 (App Router)
Language:     TypeScript 5
Styling:      Tailwind CSS 3.4
Animations:   Framer Motion 11
Smooth Scroll: @studio-freight/lenis ^1.0.45
Fonts:        next/font (Geist Sans + Geist Mono)
Canvas:       Native browser Canvas API (no lib)
```

### 1.1 package.json

```json
{
  "name": "cruisee",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.2.5",
    "react": "^18",
    "react-dom": "^18",
    "@studio-freight/lenis": "^1.0.45",
    "framer-motion": "^11.3.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.4.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "autoprefixer": "^10.0.1",
    "postcss": "^8",
    "tailwindcss": "^3.4.1",
    "typescript": "^5"
  }
}
```

---

## 2. Project File Structure

```
cruisee/
├── app/
│   ├── globals.css                  # Base styles, CSS vars, scrollbar
│   ├── layout.tsx                   # Root layout, fonts, metadata
│   └── page.tsx                     # Page composition
├── components/
│   ├── Navbar.tsx                   # Sticky nav, transparent→opaque
│   ├── HeroScroll.tsx               # Canvas scrollytelling (sticky)
│   ├── IntroSection.tsx             # Brand statement reveal
│   ├── FleetSection.tsx             # Ship cards grid
│   ├── ExperienceSection.tsx        # Split parallax layout
│   ├── DestinationsSection.tsx      # Horizontal scroll destinations
│   ├── AmenitiesSection.tsx         # Amenity icon grid
│   ├── QuoteSection.tsx             # Full-width cinematic quote
│   ├── BookingSection.tsx           # Contact form + overlay
│   └── Footer.tsx                   # Links, legal, socials
├── hooks/
│   ├── useImagePreloader.ts         # Preload + cache frame images
│   └── useLenis.ts                  # Lenis smooth scroll init
├── lib/
│   └── utils.ts                     # cn() helper
├── public/
│   └── sequence1/                   # 122 JPEG frames (001–122)
│       ├── ezgif-frame-001.jpg
│       ├── ezgif-frame-002.jpg
│       └── ... (ezgif-frame-122.jpg)
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 3. Configuration Files

### 3.1 tailwind.config.ts

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        surface: '#0d0d0d',
        border: '#1a1a1a',
        muted: '#3a3a3a',
        subtle: '#6b6b6b',
        primary: '#f5f5f0',
        accent: '#c9a96e',        // warm gold
        'accent-dim': '#8b7355',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      letterSpacing: {
        luxury: '0.2em',
        widest: '0.35em',
      },
      fontSize: {
        display: ['clamp(3rem, 8vw, 9rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        headline: ['clamp(2rem, 5vw, 6rem)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        label: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.2em' }],
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease forwards',
        'fade-in': 'fadeIn 1s ease forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
```

### 3.2 next.config.ts

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['framer-motion'],
  },
}

export default nextConfig
```

### 3.3 app/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #050505;
  --foreground: #f5f5f0;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  background: var(--background);
  color: var(--foreground);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background: var(--background);
  overflow-x: hidden;
}

/* Hide default scrollbar — Lenis handles scroll */
::-webkit-scrollbar {
  width: 0px;
}

/* Selection */
::selection {
  background: #c9a96e22;
  color: #c9a96e;
}

@layer utilities {
  .text-display {
    font-size: clamp(3rem, 8vw, 9rem);
    line-height: 0.95;
    letter-spacing: -0.02em;
  }
  .text-headline {
    font-size: clamp(2rem, 5vw, 6rem);
    line-height: 1.05;
    letter-spacing: -0.01em;
  }
  .label-caps {
    font-size: 0.6875rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    font-weight: 500;
  }
}
```

---

## 4. Core Files

### 4.1 lib/utils.ts

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### 4.2 hooks/useImagePreloader.ts

```ts
'use client'

import { useEffect, useRef, useState } from 'react'

interface UseImagePreloaderResult {
  images: HTMLImageElement[]
  loaded: boolean
  progress: number
}

export function useImagePreloader(
  frameCount: number,
  basePath: string,
  prefix: string = 'ezgif-frame-',
  ext: string = 'jpg'
): UseImagePreloaderResult {
  const [loaded, setLoaded] = useState(false)
  const [progress, setProgress] = useState(0)
  const imagesRef = useRef<HTMLImageElement[]>([])

  useEffect(() => {
    let loadedCount = 0
    const images: HTMLImageElement[] = []

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image()
      const padded = String(i).padStart(3, '0')
      img.src = `${basePath}/${prefix}${padded}.${ext}`

      img.onload = () => {
        loadedCount++
        setProgress(Math.round((loadedCount / frameCount) * 100))
        if (loadedCount === frameCount) {
          imagesRef.current = images
          setLoaded(true)
        }
      }

      img.onerror = () => {
        loadedCount++
        setProgress(Math.round((loadedCount / frameCount) * 100))
        if (loadedCount === frameCount) {
          imagesRef.current = images
          setLoaded(true)
        }
      }

      images.push(img)
    }

    imagesRef.current = images
  }, [frameCount, basePath, prefix, ext])

  return { images: imagesRef.current, loaded, progress }
}
```

### 4.3 hooks/useLenis.ts

```ts
'use client'

import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return lenisRef
}
```

---

## 5. Layout & Page

### 5.1 app/layout.tsx

```tsx
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'

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
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-background text-primary font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
```

### 5.2 app/page.tsx

```tsx
'use client'

import { useLenis } from '@/hooks/useLenis'
import Navbar from '@/components/Navbar'
import HeroScroll from '@/components/HeroScroll'
import IntroSection from '@/components/IntroSection'
import FleetSection from '@/components/FleetSection'
import ExperienceSection from '@/components/ExperienceSection'
import DestinationsSection from '@/components/DestinationsSection'
import AmenitiesSection from '@/components/AmenitiesSection'
import QuoteSection from '@/components/QuoteSection'
import BookingSection from '@/components/BookingSection'
import Footer from '@/components/Footer'

export default function Home() {
  useLenis()

  return (
    <main>
      <Navbar />
      <HeroScroll />
      <IntroSection />
      <FleetSection />
      <ExperienceSection />
      <DestinationsSection />
      <AmenitiesSection />
      <QuoteSection />
      <BookingSection />
      <Footer />
    </main>
  )
}
```

---

## 6. Components

### 6.1 components/Navbar.tsx

**Behavior:** Transparent on top → opaque `#050505` after 80px scroll. Logo left, links center, CTA right. Mobile: hamburger → full-screen overlay menu.

```tsx
'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Fleet', href: '#fleet' },
  { label: 'Experience', href: '#experience' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'About', href: '#about' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between transition-colors duration-500',
          scrolled ? 'bg-background/95 backdrop-blur-sm border-b border-border' : 'bg-transparent'
        )}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <a href="#" className="label-caps text-primary tracking-widest">
          Cruisee
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="label-caps text-subtle hover:text-primary transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="#booking"
            className="label-caps px-6 py-3 border border-primary/30 text-primary hover:border-accent hover:text-accent transition-all duration-300"
          >
            Reserve Now
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={cn('w-6 h-px bg-primary transition-all duration-300', menuOpen && 'rotate-45 translate-y-2')} />
          <span className={cn('w-6 h-px bg-primary transition-all duration-300', menuOpen && 'opacity-0')} />
          <span className={cn('w-6 h-px bg-primary transition-all duration-300', menuOpen && '-rotate-45 -translate-y-2')} />
        </button>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="text-headline text-primary"
                onClick={() => setMenuOpen(false)}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.08 }}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#booking"
              className="label-caps mt-4 px-8 py-4 border border-accent text-accent"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Reserve Now
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

---

### 6.2 components/HeroScroll.tsx ⭐ (Primary Feature)

**Behavior:**
- Sticky container `h-[400vh]` — scroll distance drives animation
- Canvas fills viewport, draws frames from `/public/sequence1/`
- `useImagePreloader` loads all 122 frames on mount
- Loading screen shows progress (0→100%) then fades out
- Scroll progress 0→1 maps to frame index 0→121
- Overlay text ("Redefine the Horizon") fades out at scroll 0.15
- Bottom scroll indicator fades out at scroll 0.1

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useImagePreloader } from '@/hooks/useImagePreloader'

const FRAME_COUNT = 122
const SEQUENCE_PATH = '/sequence1'

export default function HeroScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { images, loaded, progress } = useImagePreloader(FRAME_COUNT, SEQUENCE_PATH)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Derive frame index from scroll
  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      if (!loaded || !canvasRef.current) return
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const frameIndex = Math.min(
        Math.floor(v * (FRAME_COUNT - 1)),
        FRAME_COUNT - 1
      )
      const img = images[frameIndex]
      if (!img || !img.complete) return

      // Cover fill — maintain aspect ratio
      const scale = Math.max(
        canvas.width / img.naturalWidth,
        canvas.height / img.naturalHeight
      )
      const x = (canvas.width - img.naturalWidth * scale) / 2
      const y = (canvas.height - img.naturalHeight * scale) / 2

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale)
    })
  }, [scrollYProgress, images, loaded])

  // Canvas resize
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  // Draw first frame when loaded
  useEffect(() => {
    if (!loaded || !canvasRef.current || images.length === 0) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = images[0]
    if (!img?.complete) return
    const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight)
    const x = (canvas.width - img.naturalWidth * scale) / 2
    const y = (canvas.height - img.naturalHeight * scale) / 2
    ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale)
  }, [loaded, images])

  // Overlay text opacity transforms
  const heroTextOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  const heroTextY = useTransform(scrollYProgress, [0, 0.15], [0, -60])
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0])

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {!loaded && (
          <motion.div
            className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center gap-6"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label-caps text-subtle tracking-widest">Loading Experience</span>
            <div className="w-64 h-px bg-border relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-accent"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <span className="label-caps text-muted">{progress}%</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scrollytelling Container */}
      <div ref={containerRef} className="relative h-[400vh]">
        {/* Sticky Canvas Viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-transparent pointer-events-none" />

          {/* Hero Headline */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
            style={{ opacity: heroTextOpacity, y: heroTextY }}
          >
            <motion.span
              className="label-caps text-accent mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 10 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Est. 2024 — Private Luxury Voyages
            </motion.span>

            <motion.h1
              className="text-display text-primary max-w-5xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 30 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              Redefine<br />
              <em className="not-italic text-accent">the Horizon</em>
            </motion.h1>

            <motion.p
              className="mt-8 text-subtle text-lg max-w-md leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: loaded ? 1 : 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              Ultra-luxury private voyages to the world's most extraordinary destinations.
            </motion.p>

            <motion.div
              className="mt-10 flex gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: loaded ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <a
                href="#booking"
                className="label-caps px-8 py-4 bg-accent text-background hover:bg-accent/90 transition-colors duration-300"
              >
                Reserve Your Voyage
              </a>
              <a
                href="#fleet"
                className="label-caps px-8 py-4 border border-primary/30 text-primary hover:border-primary transition-colors duration-300"
              >
                Explore Fleet
              </a>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            style={{ opacity: scrollIndicatorOpacity }}
          >
            <span className="label-caps text-subtle">Scroll</span>
            <motion.div
              className="w-px h-12 bg-gradient-to-b from-subtle to-transparent"
              animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </div>
    </>
  )
}
```

---

### 6.3 components/IntroSection.tsx

**Behavior:** Staggered word-by-word reveal on scroll enter. Large brand statement. Copy below.

```tsx
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const WORDS = ['We', 'are', 'movement.', 'We', 'are', 'distinction.']

export default function IntroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })

  return (
    <section ref={ref} className="py-40 px-8 md:px-20 max-w-7xl mx-auto" id="about">
      {/* Label */}
      <motion.span
        className="label-caps text-accent block mb-12"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        Our Philosophy
      </motion.span>

      {/* Word-by-word headline */}
      <h2 className="text-headline text-primary leading-tight mb-16">
        {WORDS.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-[0.3em]"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.1 + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        ))}
      </h2>

      {/* Body text — two columns */}
      <div className="grid md:grid-cols-2 gap-12 text-subtle leading-relaxed">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Cruisee was born from a singular obsession: the belief that the finest journeys 
          leave no detail unexamined. Each voyage is a bespoke composition — crafted for 
          those who demand the extraordinary as a baseline.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          From the moment you step aboard, time slows. The world's most remote coastlines, 
          hidden archipelagos, and storied ports become your private domain. This is not 
          a cruise. This is a recalibration of what travel means.
        </motion.p>
      </div>

      {/* Divider line */}
      <motion.div
        className="mt-24 h-px bg-border"
        initial={{ scaleX: 0, originX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
      />
    </section>
  )
}
```

---

### 6.4 components/FleetSection.tsx

**Behavior:** Section title reveal, then 3 cards stagger in. Cards: ship name, class, guest capacity, image placeholder (dark gradient). Hover: lift + border glow.

```tsx
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const FLEET = [
  {
    name: 'Aether',
    class: 'Mega-Yacht Class',
    guests: '12 Guests',
    length: '72m',
    range: 'Global',
    description: 'The pinnacle of oceanic engineering. Aether commands attention in every port.',
  },
  {
    name: 'Solenne',
    class: 'Explorer Class',
    guests: '24 Guests',
    length: '85m',
    range: 'Polar & Tropical',
    description: 'Built for extremes. Solenne navigates ice fields and equatorial seas with equal grace.',
  },
  {
    name: 'Lumière',
    class: 'Intimate Class',
    guests: '8 Guests',
    length: '48m',
    range: 'Mediterranean & Caribbean',
    description: 'Intimate perfection. Lumière offers the most exclusive ratio of crew to guest in her class.',
  },
]

export default function FleetSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section ref={ref} className="py-40 px-8 md:px-20" id="fleet">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-end justify-between mb-20">
          <div>
            <motion.span
              className="label-caps text-accent block mb-4"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
            >
              The Fleet
            </motion.span>
            <motion.h2
              className="text-headline text-primary"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              Three vessels.<br />One standard.
            </motion.h2>
          </div>
          <motion.a
            href="#"
            className="hidden md:block label-caps text-subtle hover:text-accent transition-colors duration-300 border-b border-border pb-1"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            View All Vessels →
          </motion.a>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {FLEET.map((ship, i) => (
            <motion.div
              key={ship.name}
              className="group relative border border-border bg-surface p-8 cursor-pointer overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, borderColor: '#c9a96e40' }}
            >
              {/* Ship image area — gradient placeholder */}
              <div className="w-full h-56 mb-8 bg-gradient-to-br from-muted/20 to-background relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
                <span className="absolute bottom-4 left-4 label-caps text-muted">{ship.length}</span>
              </div>

              {/* Ship class label */}
              <span className="label-caps text-accent block mb-3">{ship.class}</span>

              {/* Ship name */}
              <h3 className="text-3xl font-light text-primary mb-4 tracking-tight">{ship.name}</h3>

              {/* Description */}
              <p className="text-subtle text-sm leading-relaxed mb-8">{ship.description}</p>

              {/* Specs */}
              <div className="flex gap-8 pt-6 border-t border-border">
                <div>
                  <span className="label-caps text-muted block mb-1">Guests</span>
                  <span className="text-primary text-sm">{ship.guests}</span>
                </div>
                <div>
                  <span className="label-caps text-muted block mb-1">Range</span>
                  <span className="text-primary text-sm">{ship.range}</span>
                </div>
              </div>

              {/* Hover accent line */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-px bg-accent"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

### 6.5 components/ExperienceSection.tsx

**Behavior:** Alternating left/right split layout. Image side (gradient block) + text side. Parallax on image. Two blocks: "The Cabin" and "The Table".

```tsx
'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const EXPERIENCES = [
  {
    id: 'cabin',
    label: '01 — Living',
    title: 'Designed for\nsilence.',
    body: 'Each suite is a study in restraint. Hand-stitched Italian linens, custom joinery from artisans in Lyon, and floor-to-ceiling glass that dissolves the boundary between interior and ocean. Your cabin is not a room. It is a perspective.',
    stat: '240 m²',
    statLabel: 'Master Suite',
    flip: false,
  },
  {
    id: 'dining',
    label: '02 — Dining',
    title: 'Cuisine at\nopen sea.',
    body: 'Our culinary programme is helmed by chefs with Michelin provenance, sourcing produce from each port of call. Menus change with the tide, reflecting the culture, geography, and season of wherever you happen to be at dusk.',
    stat: '3:1',
    statLabel: 'Crew-to-Guest Ratio',
    flip: true,
  },
]

function ExperienceBlock({ exp }: { exp: typeof EXPERIENCES[0] }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <div
      ref={ref}
      className={`grid md:grid-cols-2 gap-0 items-stretch min-h-[70vh] ${exp.flip ? 'md:[&>*:first-child]:order-2' : ''}`}
    >
      {/* Image side */}
      <div className="relative overflow-hidden bg-surface">
        <motion.div
          className="absolute inset-[-10%] bg-gradient-to-br from-muted/30 via-background to-muted/10"
          style={{ y: imageY }}
        />
        {/* Stat overlay */}
        <div className="absolute bottom-10 left-10">
          <span className="block text-5xl font-light text-primary">{exp.stat}</span>
          <span className="label-caps text-subtle mt-1 block">{exp.statLabel}</span>
        </div>
      </div>

      {/* Text side */}
      <div className="flex flex-col justify-center px-12 md:px-20 py-20 bg-surface">
        <motion.span
          className="label-caps text-accent block mb-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          {exp.label}
        </motion.span>

        <motion.h2
          className="text-headline text-primary mb-8 whitespace-pre-line"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {exp.title}
        </motion.h2>

        <motion.p
          className="text-subtle leading-relaxed max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {exp.body}
        </motion.p>
      </div>
    </div>
  )
}

export default function ExperienceSection() {
  return (
    <section className="overflow-hidden" id="experience">
      <div className="max-w-7xl mx-auto px-8 md:px-20 py-24">
        <span className="label-caps text-accent block mb-4">The Experience</span>
        <h2 className="text-headline text-primary mb-24">Every detail,<br />intentional.</h2>
      </div>
      {EXPERIENCES.map((exp) => (
        <ExperienceBlock key={exp.id} exp={exp} />
      ))}
    </section>
  )
}
```

---

### 6.6 components/DestinationsSection.tsx

**Behavior:** Horizontal scroll strip of destination cards. Mouse-drag enabled. Label pill, destination name, region. Dark gradient card with subtle hover.

```tsx
'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const DESTINATIONS = [
  { name: 'Amalfi Coast', region: 'Mediterranean', season: 'May — Sep' },
  { name: 'Svalbard', region: 'Arctic Circle', season: 'Jun — Aug' },
  { name: 'Bora Bora', region: 'South Pacific', season: 'Year-Round' },
  { name: 'Galápagos', region: 'Pacific Ecuador', season: 'Dec — May' },
  { name: 'Norwegian Fjords', region: 'Scandinavia', season: 'May — Oct' },
  { name: 'Maldives', region: 'Indian Ocean', season: 'Nov — Apr' },
  { name: 'Antarctica', region: 'Southern Ocean', season: 'Nov — Mar' },
]

export default function DestinationsSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headerRef, { once: true, margin: '-10%' })
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, scrollLeft: 0 })

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    dragStart.current = { x: e.pageX, scrollLeft: scrollRef.current?.scrollLeft ?? 0 }
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    const delta = e.pageX - dragStart.current.x
    scrollRef.current.scrollLeft = dragStart.current.scrollLeft - delta
  }

  const onMouseUp = () => setIsDragging(false)

  return (
    <section className="py-40 overflow-hidden" id="destinations">
      {/* Header */}
      <div ref={headerRef} className="px-8 md:px-20 max-w-7xl mx-auto mb-16">
        <motion.span
          className="label-caps text-accent block mb-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
        >
          Destinations
        </motion.span>
        <motion.h2
          className="text-headline text-primary"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          The world,<br />curated.
        </motion.h2>
        <motion.p
          className="text-subtle mt-4 label-caps"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          Drag to explore →
        </motion.p>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={scrollRef}
        className="flex gap-4 px-8 md:px-20 overflow-x-auto cursor-grab active:cursor-grabbing select-none scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {DESTINATIONS.map((dest, i) => (
          <motion.div
            key={dest.name}
            className="flex-shrink-0 w-72 h-96 border border-border bg-surface flex flex-col justify-end p-8 relative overflow-hidden group"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.06 }}
            whileHover={{ borderColor: '#c9a96e40' }}
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-muted/5 to-background/80" />

            {/* Number */}
            <span className="absolute top-8 right-8 label-caps text-muted">
              {String(i + 1).padStart(2, '0')}
            </span>

            {/* Content */}
            <div className="relative z-10">
              <span className="label-caps text-accent block mb-2">{dest.region}</span>
              <h3 className="text-2xl font-light text-primary mb-3">{dest.name}</h3>
              <span className="label-caps text-muted">{dest.season}</span>
            </div>

            {/* Hover line */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-px bg-accent"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
```

---

### 6.7 components/AmenitiesSection.tsx

**Behavior:** 6-item grid, icon + label + description. Stagger reveal. Clean minimal icon glyphs (SVG inline or unicode).

```tsx
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const AMENITIES = [
  { icon: '◈', label: 'Private Helipad', desc: 'Transfer directly aboard from any major airport globally.' },
  { icon: '◎', label: 'Spa & Wellness', desc: 'Full-service thermal spa, sauna, and personalized wellness programs.' },
  { icon: '⊛', label: 'Sommelier Service', desc: 'Curated cellar of 400+ labels, guided by an onboard master sommelier.' },
  { icon: '◉', label: 'Water Sports', desc: 'Tender garage stocked with jet skis, inflatables, and diving gear.' },
  { icon: '⊕', label: 'Private Chef', desc: 'Bespoke menus crafted around dietary preference and local provenance.' },
  { icon: '◌', label: 'Concierge', desc: '24/7 personal concierge handling every request, on and ashore.' },
]

export default function AmenitiesSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section ref={ref} className="py-40 px-8 md:px-20 bg-surface">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div>
            <motion.span
              className="label-caps text-accent block mb-4"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
            >
              Onboard
            </motion.span>
            <motion.h2
              className="text-headline text-primary"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              Everything you<br />could want.
            </motion.h2>
          </div>
          <motion.p
            className="text-subtle max-w-xs leading-relaxed"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
          >
            Rarely offered. Never compromised. Our amenities exist because the finest 
            guests deserve seamless access to the finest things.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-3 gap-px bg-border">
          {AMENITIES.map((item, i) => (
            <motion.div
              key={item.label}
              className="bg-surface p-10 group hover:bg-background transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
            >
              <span className="text-3xl text-accent block mb-6">{item.icon}</span>
              <h3 className="text-primary text-lg font-light mb-3">{item.label}</h3>
              <p className="text-subtle text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

### 6.8 components/QuoteSection.tsx

**Behavior:** Full-viewport quote block. Center-aligned. Large italic text. Slow fade-in on scroll. Subtle animated background gradient.

```tsx
'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function QuoteSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20%' })

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-8 text-center overflow-hidden bg-background"
    >
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, #c9a96e, transparent)',
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.08 } : {}}
        transition={{ duration: 2 }}
      />

      <div className="relative z-10 max-w-5xl">
        <motion.span
          className="label-caps text-accent block mb-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          A Guiding Principle
        </motion.span>

        <motion.blockquote
          className="text-headline text-primary font-light italic leading-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          "The ocean does not beg for your attention. Neither should luxury."
        </motion.blockquote>

        <motion.cite
          className="label-caps text-subtle not-italic block mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          — Cruisee Manifesto, 2024
        </motion.cite>
      </div>
    </section>
  )
}
```

---

### 6.9 components/BookingSection.tsx

**Behavior:** Full-width contact section. Left: headline + contact info. Right: form fields (name, email, phone, preferred destination, message). Submit button. Success/error state.

```tsx
'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function BookingSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const [formState, setFormState] = useState<FormState>('idle')
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', destination: '', message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('loading')
    // Simulate API call — wire to your backend
    await new Promise(r => setTimeout(r, 1500))
    setFormState('success')
  }

  const inputClass = "w-full bg-transparent border-b border-border text-primary py-4 text-sm outline-none focus:border-accent transition-colors duration-300 placeholder:text-muted"

  return (
    <section ref={ref} className="py-40 px-8 md:px-20 bg-surface" id="booking">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24">

        {/* Left — Info */}
        <div className="flex flex-col justify-between">
          <div>
            <motion.span
              className="label-caps text-accent block mb-6"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
            >
              Reserve Your Voyage
            </motion.span>
            <motion.h2
              className="text-headline text-primary mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              Begin your<br />story.
            </motion.h2>
            <motion.p
              className="text-subtle leading-relaxed max-w-sm"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              Our voyage curators are available to craft a bespoke itinerary aligned 
              to your vision, timeline, and desires. There is no standard programme — 
              only yours.
            </motion.p>
          </div>

          <motion.div
            className="mt-16 space-y-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <div>
              <span className="label-caps text-muted block mb-1">Email</span>
              <a href="mailto:voyages@cruisee.com" className="text-primary hover:text-accent transition-colors duration-300">
                voyages@cruisee.com
              </a>
            </div>
            <div>
              <span className="label-caps text-muted block mb-1">Phone</span>
              <a href="tel:+18005550100" className="text-primary hover:text-accent transition-colors duration-300">
                +1 800 555 0100
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right — Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            {formState === 'success' ? (
              <motion.div
                key="success"
                className="flex flex-col items-start justify-center h-full py-20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-5xl mb-6">◈</span>
                <h3 className="text-headline text-primary mb-4">Request received.</h3>
                <p className="text-subtle leading-relaxed">
                  A voyage curator will be in touch within 24 hours to begin crafting your itinerary.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-8"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className={inputClass} />
                <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required className={inputClass} />
                <input name="phone" type="tel" placeholder="Phone Number" value={formData.phone} onChange={handleChange} className={inputClass} />

                <select name="destination" value={formData.destination} onChange={handleChange} className={inputClass + ' bg-surface'}>
                  <option value="" disabled>Preferred Destination</option>
                  <option>Amalfi Coast</option>
                  <option>Svalbard / Arctic</option>
                  <option>Bora Bora</option>
                  <option>Galápagos</option>
                  <option>Norwegian Fjords</option>
                  <option>Maldives</option>
                  <option>Antarctica</option>
                </select>

                <textarea
                  name="message"
                  placeholder="Tell us about your ideal voyage..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className={inputClass + ' resize-none'}
                />

                <motion.button
                  type="submit"
                  disabled={formState === 'loading'}
                  className="label-caps w-full py-5 bg-accent text-background hover:bg-accent/90 disabled:opacity-50 transition-colors duration-300"
                  whileTap={{ scale: 0.98 }}
                >
                  {formState === 'loading' ? 'Submitting...' : 'Submit Inquiry'}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
```

---

### 6.10 components/Footer.tsx

```tsx
'use client'

import { motion } from 'framer-motion'

const LINKS = {
  'Company': ['About', 'Careers', 'Press', 'Sustainability'],
  'Voyages': ['Fleet', 'Destinations', 'Packages', 'Charters'],
  'Support': ['FAQ', 'Contact', 'Privacy Policy', 'Terms'],
}

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border px-8 md:px-20 py-24">
      <div className="max-w-7xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between gap-16 mb-20">
          {/* Brand */}
          <div className="max-w-xs">
            <span className="label-caps text-primary tracking-widest block mb-4 text-xl">Cruisee</span>
            <p className="text-subtle text-sm leading-relaxed">
              Redefining luxury maritime travel since 2024. Built for those who believe 
              the journey is the destination.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-3 gap-12">
            {Object.entries(LINKS).map(([category, links]) => (
              <div key={category}>
                <span className="label-caps text-accent block mb-6">{category}</span>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-subtle text-sm hover:text-primary transition-colors duration-300">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-border mb-8" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-muted">
          <span className="label-caps">© 2024 Cruisee. All rights reserved.</span>
          <div className="flex gap-8">
            {['Instagram', 'LinkedIn', 'Twitter'].map((social) => (
              <a key={social} href="#" className="label-caps hover:text-accent transition-colors duration-300">
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
```

---

## 7. Canvas Frame Sequencing — Technical Detail

```
Frames:    122 total (ezgif-frame-001.jpg → ezgif-frame-122.jpg)
Path:      /public/sequence1/
Container: h-[400vh] (4× viewport height = full scroll travel)
Sticky:    position:sticky, top:0, height:100vh

Scroll mapping:
  scrollYProgress ∈ [0, 1]
  frameIndex = floor(scrollYProgress × 121)  → [0, 121]
  clamp to max 121

Cover fill algorithm (canvas):
  scale = max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight)
  x = (canvas.width  - img.naturalWidth  × scale) / 2
  y = (canvas.height - img.naturalHeight × scale) / 2
  ctx.drawImage(img, x, y, img.naturalWidth × scale, img.naturalHeight × scale)
```

---

## 8. Performance Strategy

| Concern | Solution |
|---|---|
| 122 images blocking render | `useImagePreloader` batches loads async; loading screen hides canvas until `loaded=true` |
| Canvas redraws per scroll tick | Only redraw when `frameIndex` changes; compare prev frame index in `useRef` |
| Lenis + Framer Motion scroll | Use `useScroll` from Framer (reads `scrollY`); Lenis wraps native scroll, compatible |
| Canvas resize | Debounce resize listener; redraw current frame on resize |
| Mobile perf | Reduce `FRAME_COUNT` on mobile via `window.innerWidth < 768` check; show 1 in 2 frames |
| Font loading | `next/font` inlines critical CSS; no FOUT |

---

## 9. Responsive Breakpoints

```
Mobile  (<768px):   Single column, scaled-down type, hidden desktop nav
Tablet  (768–1024): Two-column where applicable
Desktop (>1024px):  Full layout as specified
```

Key mobile overrides:
- `text-display` → `clamp(2.5rem, 7vw, 4rem)` on mobile
- Fleet cards → 1 column scroll
- Destinations horizontal scroll → touch-native (no drag JS needed)
- HeroScroll canvas → full screen, same logic

---

## 10. Build & Run Commands

```bash
# Install
npm install

# Dev server
npm run dev     # → http://localhost:3000

# Production build
npm run build
npm run start
```

---

## 11. Section Map (Page Order)

```
┌─────────────────────────────────┐
│  Navbar (sticky, z-50)          │  transparent → opaque on scroll
├─────────────────────────────────┤
│  HeroScroll (h-[400vh])         │  canvas + sticky viewport
│    └ Loading screen             │  progress bar, fades out
│    └ Hero headline overlay      │  fades out at scroll 15%
│    └ Scroll indicator           │  fades out at scroll 8%
├─────────────────────────────────┤
│  IntroSection                   │  brand statement, word reveal
├─────────────────────────────────┤
│  FleetSection      #fleet       │  3 cards, stagger in
├─────────────────────────────────┤
│  ExperienceSection #experience  │  2× split blocks, parallax
├─────────────────────────────────┤
│  DestinationsSection            │  horizontal drag-scroll strip
│              #destinations      │
├─────────────────────────────────┤
│  AmenitiesSection               │  6-cell grid
├─────────────────────────────────┤
│  QuoteSection                   │  full-height cinematic quote
├─────────────────────────────────┤
│  BookingSection    #booking     │  contact form, success state
├─────────────────────────────────┤
│  Footer                         │  links, socials, legal
└─────────────────────────────────┘
```

---

## 12. Color Reference

```
#050505   — Background (near-black)
#0d0d0d   — Surface (elevated panels, cards)
#1a1a1a   — Border
#3a3a3a   — Muted (icons, dividers)
#6b6b6b   — Subtle (secondary text, labels)
#f5f5f0   — Primary text (warm white)
#c9a96e   — Accent gold (CTAs, labels, highlights)
#8b7355   — Accent dim (hover states)
```

---

*End of Implementation Plan — Cruisee*
