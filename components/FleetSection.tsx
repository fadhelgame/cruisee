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
    description:
      'The pinnacle of oceanic engineering. Aether commands attention in every port with unrivalled presence and precision.',
  },
  {
    name: 'Solenne',
    class: 'Explorer Class',
    guests: '24 Guests',
    length: '85m',
    range: 'Polar & Tropical',
    description:
      'Built for extremes. Solenne navigates ice fields and equatorial seas with equal grace, built to go where others cannot.',
  },
  {
    name: 'Lumière',
    class: 'Intimate Class',
    guests: '8 Guests',
    length: '48m',
    range: 'Mediterranean',
    description:
      'Intimate perfection. Lumière offers the most exclusive crew-to-guest ratio in her class. Discretion is the standard.',
  },
]

const cardGradients = [
  'from-accent/10 via-accent-dim/5 to-background',
  'from-accent-dim/15 via-muted/5 to-background',
  'from-accent/8 via-accent-dim/10 to-background',
]

export default function FleetSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })

  return (
    <section ref={ref} className="py-40" id="fleet">
      <div className="max-w-7xl mx-auto px-8 md:px-20">
        {/* Header */}
        <div className="flex items-end justify-between mb-24">
          <div>
            <motion.span
              className="label-caps text-accent block mb-4 tracking-[0.15em]"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
            >
              The Fleet
            </motion.span>

            <motion.h2
              className="text-headline text-primary"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 }}
            >
              Three vessels.
              <br />
              One standard.
            </motion.h2>

            <motion.div
              className="mt-6 h-px w-24 bg-accent/40"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const, delay: 0.3 }}
              style={{ transformOrigin: '0% 50%' }}
            />
          </div>

          <motion.a
            href="#"
            className="hidden md:flex items-center gap-2 label-caps text-subtle hover:text-accent transition-colors duration-300 border-b border-border hover:border-accent/40 pb-1"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            View All Vessels
            <span className="text-accent text-lg leading-none inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </motion.a>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {FLEET.map((ship, i) => (
            <motion.div
              key={ship.name}
              className="group relative border border-border bg-surface overflow-hidden transition-shadow duration-500"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.9,
                delay: 0.15 + i * 0.15,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              whileHover={{ y: -8 }}
              onMouseEnter={(e) => {
                const el = e.currentTarget
                el.style.boxShadow = '0 0 30px -5px rgba(201, 169, 110, 0.15), 0 0 0 1px rgba(201, 169, 110, 0.2)'
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget
                el.style.boxShadow = 'none'
              }}
            >
              {/* Decorative gradient image area */}
              <div
                className={`relative w-full h-64 bg-gradient-to-br ${cardGradients[i]} overflow-hidden`}
              >
                {/* Subtle overlay pattern */}
                <div className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: `radial-gradient(circle at 30% 40%, rgba(201,169,110,0.6) 0%, transparent 60%),
                                      radial-gradient(circle at 70% 80%, rgba(201,169,110,0.3) 0%, transparent 50%)`,
                  }}
                />

                {/* Vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />

                {/* Length badge */}
                <span className="absolute bottom-5 left-5 label-caps text-accent/80 bg-background/40 backdrop-blur-sm px-4 py-1.5 border border-accent/10">
                  {ship.length}
                </span>

                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24">
                  <div className="absolute top-0 right-0 w-16 h-px bg-accent/30" />
                  <div className="absolute top-0 right-0 h-16 w-px bg-accent/30" />
                </div>
              </div>

              {/* Content */}
              <div className="p-8 pt-7">
                {/* Ship class label */}
                <span className="label-caps text-accent-dim block mb-2.5 tracking-[0.12em]">
                  {ship.class}
                </span>

                {/* Ship name — serif font via font-serif utility */}
                <h3 className="font-serif text-3xl font-light text-primary mb-4 tracking-tight">
                  {ship.name}
                </h3>

                {/* Description */}
                <p className="text-subtle text-sm leading-relaxed mb-8 font-sans">
                  {ship.description}
                </p>

                {/* Specs footer */}
                <div className="flex gap-10 pt-6 border-t border-border">
                  <div>
                    <span className="label-caps text-muted block mb-1.5 tracking-[0.1em]">
                      Guests
                    </span>
                    <span className="text-primary text-sm font-sans tracking-wide">
                      {ship.guests}
                    </span>
                  </div>
                  <div>
                    <span className="label-caps text-muted block mb-1.5 tracking-[0.1em]">
                      Range
                    </span>
                    <span className="text-primary text-sm font-sans tracking-wide">
                      {ship.range}
                    </span>
                  </div>
                </div>
              </div>

              {/* Hover gold accent line — bottom border */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                style={{ transformOrigin: '0% 50%' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
