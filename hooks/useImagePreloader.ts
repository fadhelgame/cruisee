'use client'

import { useEffect, useRef, useState } from 'react'

interface UseImagePreloaderResult {
  images: HTMLImageElement[]
  loaded: boolean
  progress: number
}

export function useImagePreloader(
  frameCount: number,
  basePath: string,
  prefix: string = 'ezgif-frame-',
  ext: string = 'jpg'
): UseImagePreloaderResult {
  const [loaded, setLoaded] = useState(false)
  const [progress, setProgress] = useState(0)
  const imagesRef = useRef<HTMLImageElement[]>([])

  useEffect(() => {
    let loadedCount = 0
    const images: HTMLImageElement[] = new Array(frameCount)

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image()
      const padded = String(i).padStart(3, '0')
      img.src = `${basePath}/${prefix}${padded}.${ext}`
      const idx = i - 1

      const onDone = () => {
        loadedCount++
        setProgress(Math.round((loadedCount / frameCount) * 100))
        if (loadedCount === frameCount) {
          imagesRef.current = images
          setLoaded(true)
        }
      }

      img.onload = onDone
      img.onerror = onDone
      images[idx] = img
    }

    imagesRef.current = images
  }, [frameCount, basePath, prefix, ext])

  return { images: imagesRef.current, loaded, progress }
}
