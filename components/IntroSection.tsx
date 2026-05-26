'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const WORDS = ['We', 'are', 'movement.', 'We', 'are', 'distinction.']

export default function IntroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })

  return (
    <section ref={ref} className="py-40" id="about">
      <div className="max-w-7xl mx-auto px-8 md:px-20">
      <motion.span
        className="label-caps text-accent block mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        Our Philosophy
      </motion.span>

      <h2 className="text-headline text-primary leading-tight mb-16 max-w-6xl">
        {WORDS.map((word, i) => (
          <motion.span
            key={i}
            className="inline-block mr-[0.3em]"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] as const }}
          >
            {word}
          </motion.span>
        ))}
      </h2>

      <div className="grid md:grid-cols-2 gap-16 text-subtle leading-relaxed">
        <motion.p
          className="text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Cruisee was born from a singular obsession: the belief that the finest journeys
          leave no detail unexamined. Each voyage is a bespoke composition — crafted for
          those who demand the extraordinary as a baseline.
        </motion.p>
        <motion.p
          className="text-base"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          From the moment you step aboard, time slows. The world&apos;s most remote coastlines,
          hidden archipelagos, and storied ports become your private domain. This is not
          a cruise. This is a recalibration of what travel means.
        </motion.p>
      </div>

      <motion.div
        className="mt-24 h-px"
        style={{ background: 'linear-gradient(90deg, #c9a96e 0%, #181830 50%, transparent 100%)' }}
        initial={{ scaleX: 0, originX: '0%' }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, delay: 1.0, ease: [0.16, 1, 0.3, 1] as const }}
      />
      </div>
    </section>
  )
}
