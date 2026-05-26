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
    dragStart.current = {
      x: e.pageX,
      scrollLeft: scrollRef.current?.scrollLeft ?? 0,
    }
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return
    e.preventDefault()
    const delta = e.pageX - dragStart.current.x
    scrollRef.current.scrollLeft = dragStart.current.scrollLeft - delta
  }

  const onMouseUp = () => setIsDragging(false)

  return (
    <section className="py-40 overflow-hidden" id="destinations">
      {/* Section header — outside the scroll */}
      <div ref={headerRef} className="px-8 md:px-20 max-w-7xl mx-auto mb-20">
        <motion.span
          className="label-caps text-[--color-accent] block mb-4 tracking-[0.2em]"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as const }}
        >
          Destinations
        </motion.span>
        <motion.h2
          className="text-headline text-[--color-primary] max-w-4xl"
          style={{ fontFamily: 'var(--font-serif)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 }}
        >
          The world,
          <br />
          curated.
        </motion.h2>
        <motion.p
          className="text-[--color-subtle] mt-6 label-caps tracking-widest text-xs"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Drag to explore →
        </motion.p>
      </div>

      {/* Horizontal draggable scroll track */}
      <div
        ref={scrollRef}
        className="flex gap-6 px-8 md:px-20 overflow-x-auto select-none pb-4"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {DESTINATIONS.map((dest, i) => (
          <motion.div
            key={dest.name}
            className="relative flex-shrink-0 w-[72rem] h-96 border border-[--color-border] bg-[--color-surface] flex flex-col justify-end p-10 overflow-hidden group transition-shadow duration-500"
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] as const }}
            whileHover={{ borderColor: 'rgba(201,169,110,0.5)' }}
          >
            {/* Gold border glow on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(201,169,110,0.12)]" />
            </div>

            {/* Gradient overlay — darken from bottom for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-[--color-background] via-[--color-background]/40 to-transparent opacity-80" />

            {/* Secondary gradient for atmospheric depth */}
            <div className="absolute inset-0 bg-gradient-to-r from-[--color-background]/60 via-transparent to-[--color-background]/20" />

            {/* Number label — top-right */}
            <span className="absolute top-8 right-8 label-caps text-[--color-subtle] text-xs tracking-[0.15em] select-none">
              {String(i + 1).padStart(2, '0')}
            </span>

            {/* Content — stacked on bottom */}
            <div className="relative z-10">
              {/* Region label with accent */}
              <motion.span
                className="label-caps text-[--color-accent] block mb-3 text-xs tracking-[0.2em]"
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.15 + i * 0.07, duration: 0.5 }}
              >
                {dest.region}
              </motion.span>

              {/* Destination name — serif head */}
              <h3
                className="text-3xl font-light text-[--color-primary] mb-4 leading-tight group-hover:text-[--color-accent] transition-colors duration-400"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {dest.name}
              </h3>

              {/* Season */}
              <span className="label-caps text-[--color-subtle] text-[11px] tracking-wider">
                {dest.season}
              </span>
            </div>

            {/* Accent bottom line — animates in on hover */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-[--color-accent] origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
