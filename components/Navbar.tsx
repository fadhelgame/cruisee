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
          'fixed top-0 left-0 right-0 z-50 px-8 md:px-20 py-6 flex items-center justify-between transition-colors duration-700',
          scrolled
            ? 'bg-background/90 backdrop-blur-xl border-b border-border/60'
            : 'bg-transparent'
        )}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
      >
        <a href="#" className="font-serif text-xl text-primary tracking-tight hover:text-accent transition-colors duration-300">
          Cruisee
        </a>

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

        <div className="hidden md:flex items-center gap-6">
          <a
            href="#booking"
            className="label-caps px-6 py-3 border border-primary/20 text-primary hover:border-accent hover:text-accent transition-all duration-300"
          >
            Reserve Now
          </a>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={cn(
              'w-6 h-px bg-primary transition-all duration-300 block',
              menuOpen && 'rotate-45 translate-y-[10px]'
            )}
          />
          <span
            className={cn(
              'w-6 h-px bg-primary transition-all duration-300 block',
              menuOpen && 'opacity-0'
            )}
          />
          <span
            className={cn(
              'w-6 h-px bg-primary transition-all duration-300 block',
              menuOpen && '-rotate-45 -translate-y-[6px]'
            )}
          />
        </button>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                className="font-serif text-4xl text-primary hover:text-accent transition-colors duration-300"
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
              className="label-caps mt-4 px-8 py-4 border border-accent text-accent hover:bg-accent/10 transition-colors duration-300"
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
