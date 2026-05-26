'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const AMENITIES = [
  { icon: '◈', label: 'Private Helipad', desc: 'Transfer directly aboard from any major airport globally.' },
  { icon: '◎', label: 'Spa & Wellness', desc: 'Full-service thermal spa, sauna, and personalised wellness programmes.' },
  { icon: '⊛', label: 'Sommelier Service', desc: 'A curated cellar of 400+ labels with onboard master sommelier.' },
  { icon: '◉', label: 'Water Sports', desc: 'Jet skis, inflatables, full diving set-up with certified instructors.' },
  { icon: '⊕', label: 'Private Chef', desc: 'Bespoke menus crafted around dietary preference and local provenance.' },
  { icon: '◌', label: 'Concierge', desc: '24/7 personal concierge handling every request.' },
]

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  }),
}

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
              className="text-section text-primary"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
            >
              Everything you
              <br />
              could want.
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

        {/* Grid with border spacing */}
        <div className="grid md:grid-cols-3 gap-px bg-border">
          {AMENITIES.map((item, i) => (
            <motion.div
              key={item.label}
              className="relative bg-surface p-10 group hover:bg-surface-2 transition-colors duration-300 border-l-2 border-transparent hover:border-accent"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
            >
              <span className="text-4xl text-accent block mb-6">{item.icon}</span>
              <h3 className="text-primary font-sans text-lg font-light mb-3">{item.label}</h3>
              <p className="text-subtle text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
