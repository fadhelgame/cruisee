'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function HeroCta() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section ref={ref} className="py-32 bg-background border-t border-border/40">
      <div className="max-w-7xl mx-auto px-8 md:px-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="max-w-xl">
            <motion.span
              className="label-caps text-accent block mb-4"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Est. 2024 — Private Luxury Voyages
            </motion.span>
            <motion.p
              className="text-subtle text-base leading-relaxed md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Ultra-luxury private voyages to the world&apos;s most extraordinary
              destinations. Every detail, curated. Every moment, yours.
            </motion.p>
          </div>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a
              href="#booking"
              className="label-caps px-8 py-4 bg-accent text-background hover:bg-accent-dim transition-colors duration-300"
            >
              Reserve Your Voyage
            </a>
            <a
              href="#fleet"
              className="label-caps px-8 py-4 border border-primary/20 text-primary hover:border-primary transition-colors duration-300"
            >
              Explore Fleet
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
