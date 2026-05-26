'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useImagePreloader } from '@/hooks/useImagePreloader'

const FRAME_COUNT = 122
const SEQUENCE_PATH = '/sequence1'

function drawFrame(canvas: HTMLCanvasElement, img: HTMLImageElement) {
  const ctx = canvas.getContext('2d')
  if (!ctx || !img.complete || img.naturalWidth === 0) return

  const scale = Math.max(
    canvas.width / img.naturalWidth,
    canvas.height / img.naturalHeight
  )
  const x = (canvas.width - img.naturalWidth * scale) / 2
  const y = (canvas.height - img.naturalHeight * scale) / 2

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale)
}

export default function HeroScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const lastFrameRef = useRef<number>(-1)
  const { images, loaded, progress } = useImagePreloader(FRAME_COUNT, SEQUENCE_PATH)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Canvas resize — keep it pixel-perfect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      // Redraw current frame after resize
      if (loaded && images[lastFrameRef.current]) {
        drawFrame(canvas, images[lastFrameRef.current])
      }
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [loaded, images])

  // Draw first frame once loaded
  useEffect(() => {
    if (!loaded || !canvasRef.current || images.length === 0) return
    lastFrameRef.current = 0
    drawFrame(canvasRef.current, images[0])
  }, [loaded, images])

  // Scroll → frame
  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      if (!loaded || !canvasRef.current) return

      const frameIndex = Math.min(
        Math.floor(v * (FRAME_COUNT - 1)),
        FRAME_COUNT - 1
      )

      // Skip redraw if same frame
      if (frameIndex === lastFrameRef.current) return
      lastFrameRef.current = frameIndex

      const img = images[frameIndex]
      if (img) drawFrame(canvasRef.current, img)
    })
  }, [scrollYProgress, images, loaded])

  // Overlay transforms
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
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <span className="label-caps text-subtle tracking-widest">
              Loading Experience
            </span>
            <div className="w-64 h-px bg-border relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-accent"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <span className="label-caps text-muted">{progress}%</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scrollytelling container — 4× viewport height */}
      <div ref={containerRef} className="relative h-[400vh]">
        {/* Sticky viewport */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          {/* Stronger gradient overlay for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent pointer-events-none" />

          {/* Hero Headline — minimal, left bottom */}
          <motion.div
            className="absolute inset-0 flex flex-col items-start justify-end px-8 md:px-20 pb-24 md:pb-40"
            style={{ opacity: heroTextOpacity, y: heroTextY }}
          >
            <motion.h1
              className="text-display text-primary max-w-5xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : 30 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
            >
              Redefine<br />
              <span className="text-accent">the Horizon</span>
            </motion.h1>
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
