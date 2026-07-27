'use client'

import { useEffect, useRef, useState } from 'react'

import { useReducedMotion } from 'motion/react'

export type BeamDecoration = 'none' | 'chevron' | 'circuit' | 'dot'

export interface TrackBeam {
  color?: string
  speed?: number
  height?: number
  width?: number
  opacity?: number
  decoration?: BeamDecoration
  delay?: number
}

export interface HudTrack {
  /** Posição horizontal em % */
  x: number
  label?: string
  /** Texto menor ou código técnico abaixo/ao lado da label principal */
  subLabel?: string
  lineColor?: string
  dashed?: boolean
  lineWidth?: number
  labelColor?: string
  beams?: TrackBeam[]
}

export interface HudTerminalProps {
  tracks: HudTrack[]
  opacity?: number
  fixed?: boolean
  zIndex?: number
  className?: string
  /** Ativa miras/cantoneiras no centro da tela. @default true */
  showCenterBracket?: boolean
  /** Tamanho da fonte da label principal (ex: 10 ou 8) @default 10 */
  labelFontSize?: number
  /** Tamanho da fonte da sublabel (ex: 8 ou 6) @default 8 */
  subLabelFontSize?: number
  /** Variável CSS ou classe da fonte da label (ex: 'var(--font-mono)') @default 'monospace' */
  labelFontFamily?: string
  /** Variável CSS ou classe da fonte da sublabel @default 'monospace' */
  subLabelFontFamily?: string
}

type Particle = TrackBeam & {
  y: number
  trackX: number
}

const hexToRgb = (hex: string): string => {
  const clean = hex.replace('#', '')
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map(c => c + c)
          .join('')
      : clean
  const n = parseInt(full, 16)
  return isNaN(n) ? '0, 251, 234' : `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`
}

export const HudTerminal = ({
  tracks,
  opacity = 1,
  fixed = false,
  zIndex = 0,
  className,
  showCenterBracket = true,
  labelFontSize = 10,
  subLabelFontSize = 8,
  labelFontFamily = 'monospace',
  subLabelFontFamily = 'monospace',
}: HudTerminalProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const sizeRef = useRef({ W: 0, H: 0 })
  const prefersReducedMotion = useReducedMotion()

  // Estado interno para reatividade física ao mouse (Efeito de Profundidade do HUD)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!fixed || prefersReducedMotion) return
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 12
      const ny = (e.clientY / window.innerHeight - 0.5) * 12
      setMouseOffset({ x: nx, y: ny })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [fixed, prefersReducedMotion])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animFrame: number
    let particles: Particle[] = []

    const initParticles = (W: number, _H: number) => {
      particles = tracks.flatMap(track =>
        (track.beams || []).map(beam => ({
          color: beam.color || '#00fbea',
          speed: beam.speed || 3,
          height: beam.height || 200,
          width: beam.width || 2,
          opacity: beam.opacity || 0.8,
          decoration: beam.decoration || 'none',
          y: -(beam.height || 200) - (beam.delay || Math.random() * 600),
          trackX: (track.x / 100) * W,
        })),
      )
    }

    const applySize = (W: number, H: number) => {
      if (W === 0 || H === 0) return
      sizeRef.current = { W, H }
      canvas.width = W
      canvas.height = H
      initParticles(W, H)
    }

    const observer = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect
      applySize(width, height)
    })

    if (canvas.parentElement) observer.observe(canvas.parentElement)

    const draw = (_timestamp: number) => {
      const { W, H } = sizeRef.current
      if (W === 0 || H === 0) {
        if (!prefersReducedMotion) animFrame = requestAnimationFrame(draw)
        return
      }

      ctx.clearRect(0, 0, W, H)

      // 1. Desenha os Trilhos Verticais
      tracks.forEach(track => {
        const x = (track.x / 100) * W
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, H)
        ctx.strokeStyle = track.lineColor || 'rgba(0, 251, 234, 0.1)'
        ctx.lineWidth = track.lineWidth || 1
        if (track.dashed) ctx.setLineDash([4, 12])
        else ctx.setLineDash([])
        ctx.stroke()

        if (track.lineWidth && track.lineWidth > 1) {
          ctx.setLineDash([])
          ctx.strokeStyle = track.lineColor || 'rgba(0, 251, 234, 0.3)'
          for (let y = 100; y < H; y += 150) {
            ctx.beginPath()
            ctx.moveTo(x - 5, y)
            ctx.lineTo(x + 5, y)
            ctx.stroke()
          }
        }
      })
      ctx.setLineDash([])

      // 2. Desenha os Feixes de Dados (Beams)
      particles.forEach(p => {
        p.y += p.speed!
        if (p.y > H + 60) p.y = -p.height! - Math.random() * 400

        const rgb = hexToRgb(p.color!)
        const h = p.height!
        const tipY = p.y + h

        const grad = ctx.createLinearGradient(p.trackX, p.y, p.trackX, tipY)
        grad.addColorStop(0, `rgba(${rgb}, 0)`)
        grad.addColorStop(0.7, `rgba(${rgb}, ${p.opacity! * 0.4})`)
        grad.addColorStop(1, `rgba(${rgb}, ${p.opacity!})`)

        ctx.beginPath()
        ctx.moveTo(p.trackX, p.y)
        ctx.lineTo(p.trackX, tipY)
        ctx.strokeStyle = grad
        ctx.lineWidth = p.width!
        ctx.stroke()

        if (p.decoration === 'dot') {
          ctx.beginPath()
          ctx.arc(p.trackX, tipY, 2.5, 0, Math.PI * 2)
          ctx.fillStyle = '#ffffff'
          ctx.fill()

          const glow = ctx.createRadialGradient(p.trackX, tipY, 0, p.trackX, tipY, 18)
          glow.addColorStop(0, `rgba(${rgb}, ${p.opacity! * 0.9})`)
          glow.addColorStop(1, `rgba(${rgb}, 0)`)
          ctx.fillStyle = glow
          ctx.beginPath()
          ctx.arc(p.trackX, tipY, 18, 0, Math.PI * 2)
          ctx.fill()
        }

        if (p.decoration === 'chevron') {
          const size = 5
          ctx.lineWidth = 1.2
          for (let i = 0; i < 3; i++) {
            const cy = tipY - i * 12
            ctx.beginPath()
            ctx.moveTo(p.trackX - size, cy - size)
            ctx.lineTo(p.trackX, cy)
            ctx.lineTo(p.trackX + size, cy - size)
            ctx.strokeStyle = `rgba(${rgb}, ${p.opacity! * (1 - i * 0.35)})`
            ctx.stroke()
          }
        }

        if (p.decoration === 'circuit') {
          const side = p.trackX > W / 2 ? -1 : 1
          ctx.lineWidth = 1.2
          ctx.setLineDash([2, 3])
          ctx.beginPath()
          ctx.moveTo(p.trackX, tipY - 15)
          ctx.lineTo(p.trackX + side * 12, tipY - 5)
          ctx.lineTo(p.trackX + side * 22, tipY - 5)
          ctx.strokeStyle = `rgba(${rgb}, ${p.opacity!})`
          ctx.stroke()
          ctx.setLineDash([])

          ctx.beginPath()
          ctx.arc(p.trackX + side * 22, tipY - 5, 1.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${rgb}, ${p.opacity!})`
          ctx.fill()
        }
      })

      // 3. Molduras Centrais Assimétricas
      if (showCenterBracket) {
        const midX = W / 2
        const midY = H / 2
        const bW = 160
        const bH = 100
        const size = 15

        ctx.strokeStyle = 'rgba(0, 251, 234, 0.25)'
        ctx.lineWidth = 1.5

        ctx.beginPath()
        ctx.moveTo(midX - bW, midY - bH + size)
        ctx.lineTo(midX - bW, midY - bH)
        ctx.lineTo(midX - bW + size, midY - bH)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(midX + bW, midY - bH + size)
        ctx.lineTo(midX + bW, midY - bH)
        ctx.lineTo(midX + bW - size, midY - bH)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(midX - bW, midY + bH - size)
        ctx.lineTo(midX - bW, midY + bH)
        ctx.lineTo(midX - bW + size, midY + bH)
        ctx.stroke()

        ctx.beginPath()
        ctx.moveTo(midX + bW, midY + bH - size)
        ctx.lineTo(midX + bW, midY + bH)
        ctx.lineTo(midX + bW - size, midY + bH)
        ctx.stroke()

        ctx.strokeStyle = 'rgba(255, 0, 187, 0.3)'
        ctx.beginPath()
        ctx.moveTo(midX - 8, midY)
        ctx.lineTo(midX + 8, midY)
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(midX, midY - 8)
        ctx.lineTo(midX, midY + 8)
        ctx.stroke()
      }

      if (!prefersReducedMotion) animFrame = requestAnimationFrame(draw)
    }

    animFrame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animFrame)
      observer.disconnect()
    }
  }, [tracks, showCenterBracket, prefersReducedMotion])

  const edgeFade = `linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)`

  return (
    <div
      ref={containerRef}
      aria-hidden='true'
      className={className}
      style={{
        position: fixed ? 'fixed' : 'absolute',
        inset: 0,
        zIndex,
        opacity,
        pointerEvents: 'none',
        transform: prefersReducedMotion ? 'none' : `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
        transition: prefersReducedMotion ? 'none' : 'transform 0.2s cubic-bezier(0.25, 1, 0.5, 1)',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          maskImage: edgeFade,
          WebkitMaskImage: edgeFade,
        }}
      />

      {/* Camada DOM de Labels Assimétricas no Rodapé Customizadas */}
      {tracks.map(
        (track, i) =>
          (track.label || track.subLabel) && (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${track.x}%`,
                bottom: 35,
                transform: 'translateX(-50%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                pointerEvents: 'none',
              }}
            >
              {track.label && (
                <span
                  style={{
                    color: track.labelColor || track.lineColor || '#00fbea',
                    fontSize: labelFontSize,
                    fontFamily: labelFontFamily,
                    fontWeight: 800,
                    letterSpacing: '0.2em',
                    textShadow: `0 0 6px ${track.labelColor || track.lineColor || '#00fbea'}`,
                  }}
                >
                  {track.label}
                </span>
              )}
              {track.subLabel && (
                <span
                  style={{
                    color: 'rgba(255,255,255,0.35)',
                    fontSize: subLabelFontSize,
                    fontFamily: subLabelFontFamily,
                    marginTop: 2,
                    letterSpacing: '0.1em',
                  }}
                >
                  {track.subLabel}
                </span>
              )}
            </div>
          ),
      )}
    </div>
  )
}

export default HudTerminal
