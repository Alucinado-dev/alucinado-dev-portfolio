'use client'

import { useEffect, useRef } from 'react'

import { type RandomSeed, createRandom } from './canvas'

type GrainNoiseProps = {
  opacity?: number
  /** Intensidade luminosa do ruído entre 0 e 1. @default 1 */
  intensity?: number
  /** @deprecated Use `intensity`. Mantido para compatibilidade. */
  density?: number
  zIndex?: number
  fixed?: boolean
  className?: string
  /** Seed opcional para reproduzir exatamente a mesma textura. */
  seed?: RandomSeed
}

export default function GrainNoise({
  opacity = 0.05,
  intensity,
  density,
  zIndex = 1,
  fixed = true,
  className,
  seed,
}: GrainNoiseProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const resolvedIntensity = Math.max(0, Math.min(1, intensity ?? density ?? 1))

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const size = 100
    canvas.width = size
    canvas.height = size

    const imageData = ctx.createImageData(size, size)
    const data = imageData.data
    const random = createRandom(seed)

    for (let i = 0; i < data.length; i += 4) {
      const value = random() * 255 * resolvedIntensity

      data[i] = value
      data[i + 1] = value
      data[i + 2] = value
      data[i + 3] = 255
    }

    ctx.putImageData(imageData, 0, 0)
  }, [resolvedIntensity, seed])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{
        position: fixed ? 'fixed' : 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        opacity,
        pointerEvents: 'none',
        zIndex,
        imageRendering: 'pixelated',
      }}
    />
  )
}
