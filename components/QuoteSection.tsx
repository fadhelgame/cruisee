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
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, #c9a96e, transparent)',
        }}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.07 } : { opacity: 0 }}
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
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
        >
          &ldquo;The ocean does not beg for your attention.
          <br />
          Neither should luxury.&rdquo;
        </motion.blockquote>

        <cite
          className="label-caps text-subtle not-italic block mt-12"
          style={{
            opacity: inView ? 1 : 0,
            transition: 'opacity 0.8s 0.8s ease',
          }}
        >
          — Cruisee Manifesto, 2024
        </cite>
      </div>
    </section>
  )
}
