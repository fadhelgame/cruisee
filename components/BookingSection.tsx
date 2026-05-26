'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

type FormState = 'idle' | 'loading' | 'success'

export default function BookingSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const [formState, setFormState] = useState<FormState>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    destination: '',
    message: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('loading')
    await new Promise((r) => setTimeout(r, 1500))
    setFormState('success')
  }

  const inputClass =
    'w-full bg-transparent border-b border-border py-4 text-sm outline-none focus:border-accent transition-colors placeholder:text-muted'

  return (
    <section ref={ref} className="py-40 bg-surface" id="booking">
      <div className="max-w-7xl mx-auto px-8 md:px-20 grid md:grid-cols-2 gap-24">
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
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }}
            >
              Begin your
              <br />
              story.
            </motion.h2>
            <motion.p
              className="text-subtle leading-relaxed max-w-sm"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
            >
              Our voyage curators are available to craft a bespoke itinerary aligned to
              your vision, timeline, and desires. There is no standard programme — only
              yours.
            </motion.p>
          </div>

          <motion.div
            className="mt-16 space-y-6"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <div>
              <span className="label-caps text-subtle block mb-1">Email</span>
              <a
                href="mailto:voyages@cruisee.com"
                className="text-primary hover:text-accent transition-colors"
              >
                voyages@cruisee.com
              </a>
            </div>
            <div>
              <span className="label-caps text-subtle block mb-1">Phone</span>
              <a
                href="tel:+18005550100"
                className="text-primary hover:text-accent transition-colors"
              >
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
                <span className="text-5xl mb-6">&#9673;</span>
                <h3 className="text-4xl font-light text-primary mb-4">
                  Request received.
                </h3>
                <p className="text-subtle leading-relaxed">
                  A voyage curator will be in touch within 24 hours to begin crafting
                  your itinerary.
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
                <input
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClass}
                />

                <select
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  className={`${inputClass} bg-surface`}
                >
                  <option value="" disabled>
                    Preferred Destination
                  </option>
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
                  className={`${inputClass} resize-none`}
                />

                <motion.button
                  type="submit"
                  disabled={formState === 'loading'}
                  className="label-caps w-full py-5 bg-accent text-background hover:bg-accent-dim transition-colors"
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
