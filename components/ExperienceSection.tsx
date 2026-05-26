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

const expImages: Record<string, string> = {
  cabin: '/images/experience-cabin.jpg',
  dining: '/images/experience-dining.jpg',
}

function ExperienceBlock({ exp }: { exp: (typeof EXPERIENCES)[0] }) {
  const ref = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })
  const statInView = useInView(imageRef, { once: true, margin: '-10%' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <div
      ref={ref}
      className="grid md:grid-cols-2 items-stretch min-h-[85vh] overflow-hidden"
      style={{ gridAutoFlow: exp.flip ? 'dense' : 'unset' }}
    >
      {/* Image side */}
      <div
        ref={imageRef}
        className={`relative overflow-hidden bg-surface min-h-[50vh] md:min-h-full ${exp.flip ? 'md:col-start-2' : ''}`}
      >
        {/* Actual image with parallax */}
        <motion.div
          className="absolute inset-0"
          style={{ y: imageY, width: '120%', height: '120%', inset: '-10%' }}
        >
          <img
            src={expImages[exp.id]}
            alt={`Cruisee ${exp.id} experience`}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </motion.div>

        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-transparent" />
        <div className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 50%, rgba(201,169,110,0.6) 0%, transparent 60%)',
          }}
        />

        {/* Accent line */}
        <div className="absolute top-12 left-12 w-10 h-px bg-accent/40" />

        {/* Gold corner bracket - top right */}
        <div className="absolute top-12 right-12 flex flex-col items-end gap-1">
          <div className="w-6 h-px bg-accent/20" />
          <div className="w-px h-6 bg-accent/20" />
        </div>

        {/* Stat overlay */}
        <motion.div
          className="absolute bottom-12 left-12 z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={statInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <span className="block text-6xl md:text-7xl font-light text-primary tracking-tight">
            {exp.stat}
          </span>
          <div className="flex items-center gap-3 mt-2">
            <div className="w-8 h-px bg-accent/60" />
            <span className="label-caps text-subtle tracking-[0.25em]">{exp.statLabel}</span>
          </div>
        </motion.div>
      </div>

      {/* Text side */}
      <div
        className={`flex flex-col justify-center px-10 md:px-20 py-24 bg-surface border-t md:border-t-0 border-border/60 ${exp.flip ? 'md:col-start-1 md:row-start-1' : ''}`}
      >
        {/* Label with gold accent */}
        <motion.div
          className="flex items-center gap-4 mb-10"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <span className="label-caps text-accent tracking-[0.3em]">{exp.label}</span>
          <div className="flex-1 h-px bg-gradient-to-r from-accent/30 to-transparent max-w-[120px]" />
        </motion.div>

        {/* Title */}
        <motion.h2
          className="text-headline text-primary mb-8 whitespace-pre-line leading-[1.02]"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const }}
        >
          {exp.title}
        </motion.h2>

        {/* Gold divider */}
        <motion.div
          className="w-12 h-px bg-accent/50 mb-8"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
          style={{ transformOrigin: 'left' }}
        />

        {/* Body */}
        <motion.p
          className="text-subtle text-base md:text-lg leading-[1.9] max-w-md font-[425]"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
        >
          {exp.body}
        </motion.p>

        {/* Refined CTA */}
        <motion.div
          className="mt-12 flex items-center gap-3"
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <span className="label-caps text-primary/60 hover:text-accent transition-colors duration-500 cursor-pointer">
            Discover more
          </span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="text-primary/40 group-hover:text-accent transition-colors duration-500"
          >
            <path
              d="M4 10H16M16 10L11 5M16 10L11 15"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </div>
    </div>
  )
}

export default function ExperienceSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-10%' })

  return (
    <section className="overflow-hidden" id="experience">
      {/* Section header */}
      <div ref={headerRef} className="max-w-7xl mx-auto px-8 md:px-20 pt-28 pb-8 md:pb-20">
        <motion.div
          className="flex items-center gap-4 mb-6"
          initial={{ opacity: 0, x: -10 }}
          animate={headerInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
        >
          <div className="w-8 h-px bg-accent/60" />
          <span className="label-caps text-accent tracking-[0.35em]">The Experience</span>
        </motion.div>

        <motion.h2
          className="text-headline text-primary leading-[1.02] max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] as const }}
        >
          Every detail,
          <br />
          intentional.
        </motion.h2>

        <motion.p
          className="text-subtle text-base md:text-lg mt-6 max-w-lg leading-relaxed"
          initial={{ opacity: 0, y: 15 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          From the weight of your door handle to the thread count of your sheets — nothing is left
          to chance.
        </motion.p>
      </div>

      {/* Experience blocks */}
      {EXPERIENCES.map((exp) => (
        <ExperienceBlock key={exp.id} exp={exp} />
      ))}
    </section>
  )
}
