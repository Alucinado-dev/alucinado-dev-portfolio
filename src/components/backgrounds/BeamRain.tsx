import { useEffect, useRef, useState } from 'react'

// ─────────────────────────────────────────────
// Tipos
// ─────────────────────────────────────────────

/**
 * Modos de movimento do beam:
 * - `'loop'`      → desce continuamente de cima pra baixo em loop
 * - `'random'`    → aparece em posição vertical aleatória e some ao sair
 * - `'fade'`      → fade in no topo, visível no meio, fade out no fundo
 * - `'pulse'`     → pisca suavemente enquanto desce (opacidade oscila)
 * - `'burst'`     → aparece do nada em velocidade alta e some rápido — relâmpago
 */
export type BeamMode = 'loop' | 'random' | 'fade' | 'pulse' | 'burst'

/**
 * Estilo de decoração do beam:
 * - `'none'`      → só a linha
 * - `'chevron'`   → setas simples (›) ao longo do beam
 * - `'circuit'`   → setas anguladas estilo circuito (tracejadas)
 * - `'dot'`       → ponto de luz pulsante descendo pelo beam
 */
export type BeamDecoration = 'none' | 'chevron' | 'circuit' | 'dot'

export interface BeamConfig {
  /**
   * Posição horizontal do beam em % da largura do container.
   * @example 50 → centro
   */
  x: number
  /** Cor do beam. @default '#f72585' */
  color?: string
  /** Opacidade máxima do beam (0–1). @default 0.7 */
  opacity?: number
  /** Velocidade em px/frame. @default 1.5 */
  speed?: number
  /** Largura da linha em pixels. @default 1.5 */
  width?: number
  /** Altura do beam em pixels. @default 300 */
  height?: number
  /** Decoração aplicada ao beam. @default 'none' */
  decoration?: BeamDecoration
  /** Atraso inicial em frames — evita que todos comecem no mesmo ponto. @default aleatorio */
  delay?: number
}

export interface BeamRainProps {
  /**
   * Array de configurações de beams.
   * Cada objeto define um beam independente.
   *
   * @example
   * beams={[
   *   { x: 25, color: '#f72585', decoration: 'chevron' },
   *   { x: 50, color: '#4cc9f0', decoration: 'dot', speed: 2 },
   *   { x: 75, color: '#7209b7', decoration: 'circuit' },
   * ]}
   */
  beams: BeamConfig[]

  /**
   * Modo de movimento aplicado a todos os beams.
   * @default 'fade'
   */
  mode?: BeamMode

  /**
   * Se `true`, cobre a viewport inteira (position fixed).
   * Se `false`, cobre o pai (position absolute).
   * @default false
   */
  fixed?: boolean

  /** @default 0 */
  zIndex?: number

  className?: string
}

// ─────────────────────────────────────────────
// Tipos internos
// ─────────────────────────────────────────────

type BeamParticle = {
  x: number
  y: number
  color: string
  opacity: number
  speed: number
  width: number
  height: number
  decoration: BeamDecoration
  maxOpacity: number
  // para pulse
  phase: number
  // para dot
  dotY: number
  // para burst
  isBurst: boolean
  burstOpacity: number
}

// ─────────────────────────────────────────────
// Helpers de desenho
// ─────────────────────────────────────────────

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
  if (isNaN(n)) return '255,255,255'
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`
}

const drawBeamLine = (ctx: CanvasRenderingContext2D, b: BeamParticle, alpha: number, mode: BeamMode) => {
  const rgb = hexToRgb(b.color)

  // Gradiente vertical do beam
  const grad = ctx.createLinearGradient(b.x, b.y, b.x, b.y + b.height)

  if (mode === 'fade') {
    grad.addColorStop(0, `rgba(${rgb}, 0)`)
    grad.addColorStop(0.2, `rgba(${rgb}, ${alpha})`)
    grad.addColorStop(0.8, `rgba(${rgb}, ${alpha})`)
    grad.addColorStop(1, `rgba(${rgb}, 0)`)
  } else if (mode === 'burst') {
    grad.addColorStop(0, `rgba(${rgb}, 0)`)
    grad.addColorStop(0.1, `rgba(${rgb}, ${alpha})`)
    grad.addColorStop(0.5, `rgba(${rgb}, ${alpha * 0.6})`)
    grad.addColorStop(1, `rgba(${rgb}, 0)`)
  } else {
    grad.addColorStop(0, `rgba(${rgb}, 0)`)
    grad.addColorStop(0.15, `rgba(${rgb}, ${alpha})`)
    grad.addColorStop(0.85, `rgba(${rgb}, ${alpha})`)
    grad.addColorStop(1, `rgba(${rgb}, 0)`)
  }

  ctx.beginPath()
  ctx.moveTo(b.x, b.y)
  ctx.lineTo(b.x, b.y + b.height)
  ctx.strokeStyle = grad
  ctx.lineWidth = b.width
  ctx.globalAlpha = 1
  ctx.stroke()
}

const drawChevrons = (ctx: CanvasRenderingContext2D, b: BeamParticle, alpha: number) => {
  const rgb = hexToRgb(b.color)
  const spacing = 28
  const size = 5
  const count = Math.floor(b.height / spacing)

  for (let i = 0; i < count; i++) {
    const cy = b.y + i * spacing + spacing / 2
    const progress = i / count
    // fade nas pontas
    const fade = progress < 0.2 ? progress / 0.2 : progress > 0.8 ? (1 - progress) / 0.2 : 1

    ctx.beginPath()
    ctx.moveTo(b.x - size, cy - size / 2)
    ctx.lineTo(b.x, cy + size / 2)
    ctx.lineTo(b.x + size, cy - size / 2)
    ctx.strokeStyle = `rgba(${rgb}, ${alpha * fade * 0.8})`
    ctx.lineWidth = 1
    ctx.globalAlpha = 1
    ctx.stroke()
  }
}

const drawCircuit = (ctx: CanvasRenderingContext2D, b: BeamParticle, alpha: number) => {
  const rgb = hexToRgb(b.color)
  const spacing = 40
  const count = Math.floor(b.height / spacing)

  ctx.setLineDash([3, 4])

  for (let i = 0; i < count; i++) {
    const cy = b.y + i * spacing + spacing / 2
    const progress = i / count
    const fade = progress < 0.2 ? progress / 0.2 : progress > 0.8 ? (1 - progress) / 0.2 : 1
    const side = i % 2 === 0 ? 1 : -1

    // Traço angular saindo do beam
    ctx.beginPath()
    ctx.moveTo(b.x, cy)
    ctx.lineTo(b.x + side * 8, cy + 6)
    ctx.lineTo(b.x + side * 14, cy + 6)
    ctx.strokeStyle = `rgba(${rgb}, ${alpha * fade * 0.7})`
    ctx.lineWidth = 1
    ctx.globalAlpha = 1
    ctx.stroke()

    // Pontinho no final
    ctx.beginPath()
    ctx.arc(b.x + side * 14, cy + 6, 1.5, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${rgb}, ${alpha * fade})`
    ctx.fill()
  }

  ctx.setLineDash([])
}

const drawDot = (ctx: CanvasRenderingContext2D, b: BeamParticle, alpha: number, timestamp: number) => {
  const rgb = hexToRgb(b.color)
  const dotY = b.y + (b.dotY % b.height)
  const pulse = 0.7 + 0.3 * Math.sin(timestamp * 0.005 + b.phase)

  // Glow
  const glow = ctx.createRadialGradient(b.x, dotY, 0, b.x, dotY, 12)
  glow.addColorStop(0, `rgba(${rgb}, ${alpha * pulse * 0.8})`)
  glow.addColorStop(1, `rgba(${rgb}, 0)`)
  ctx.fillStyle = glow
  ctx.beginPath()
  ctx.arc(b.x, dotY, 12, 0, Math.PI * 2)
  ctx.fill()

  // Ponto central
  ctx.beginPath()
  ctx.arc(b.x, dotY, 2.5, 0, Math.PI * 2)
  ctx.fillStyle = `rgba(255,255,255, ${alpha * pulse})`
  ctx.fill()
}

// ─────────────────────────────────────────────
// useWindowSize inline
// ─────────────────────────────────────────────

const useWindowSize = () => {
  const [size, setSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })
  useEffect(() => {
    const h = () => setSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return size
}

// ─────────────────────────────────────────────
// Componente
// ─────────────────────────────────────────────

/**
 * `BeamRain`
 *
 * Beams verticais animados descendo pela tela — efeito tecnológico/sci-fi.
 * Cada beam é configurável individualmente: posição, cor, velocidade, decoração.
 *
 * Modos de movimento (`mode`):
 * - `'loop'`   → desce continuamente em loop
 * - `'random'` → aparece em posição aleatória e reinicia ao sair
 * - `'fade'`   → fade in no topo, fade out no fundo
 * - `'pulse'`  → opacidade oscila enquanto desce
 * - `'burst'`  → relâmpago — aparece rápido e some
 *
 * Decorações (`decoration` por beam):
 * - `'none'`    → só a linha
 * - `'chevron'` → setas › ao longo do beam
 * - `'circuit'` → ramificações anguladas estilo circuito
 * - `'dot'`     → ponto de luz descendo pelo beam
 *
 * @example
 * // Grid de beams como no AnimatedBackground original
 * <BeamRain
 *   mode="fade"
 *   beams={[
 *     { x: 20, color: '#f72585', decoration: 'chevron' },
 *     { x: 50, color: '#4cc9f0', decoration: 'dot', speed: 2 },
 *     { x: 80, color: '#7209b7', decoration: 'circuit' },
 *   ]}
 * />
 *
 * @example
 * // Beam central com burst
 * <BeamRain
 *   mode="burst"
 *   beams={[{ x: 50, color: '#ffffff', width: 2, decoration: 'dot' }]}
 * />
 */
export const BeamRain = ({
  beams: beamConfigs,
  mode = 'fade',
  fixed = false,
  zIndex = 0,
  className,
}: BeamRainProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const windowSize = useWindowSize()
  const sizeRef = useRef({ W: 0, H: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animFrame: number
    let particles: BeamParticle[] = []

    const applySize = (W: number, H: number) => {
      if (W === 0 || H === 0) return
      sizeRef.current = { W, H }
      canvas.width = W
      canvas.height = H
      initBeams(W, H)
    }

    const initBeams = (W: number, H: number) => {
      particles = beamConfigs.map((cfg, i) => {
        const height = cfg.height ?? 300
        const delay = cfg.delay ?? Math.random() * H
        return {
          x: (cfg.x / 100) * W,
          y: mode === 'random' ? Math.random() * H : -height - delay,
          color: cfg.color ?? '#f72585',
          maxOpacity: cfg.opacity ?? 0.7,
          opacity: cfg.opacity ?? 0.7,
          speed: cfg.speed ?? 1.5,
          width: cfg.width ?? 1.5,
          height,
          decoration: cfg.decoration ?? 'none',
          phase: i * (Math.PI / beamConfigs.length),
          dotY: 0,
          isBurst: false,
          burstOpacity: 0,
        }
      })
    }

    let observer: ResizeObserver | null = null

    if (fixed) {
      applySize(windowSize.width || window.innerWidth, windowSize.height || window.innerHeight)
    } else {
      const parent = canvas.parentElement
      if (parent) {
        observer = new ResizeObserver(entries => {
          const { width, height } = entries[0].contentRect
          applySize(width, height)
        })
        observer.observe(parent)
        applySize(parent.clientWidth, parent.clientHeight)
      }
    }

    const draw = (timestamp: number) => {
      const { W, H } = sizeRef.current
      if (W === 0 || H === 0) {
        animFrame = requestAnimationFrame(draw)
        return
      }

      ctx.clearRect(0, 0, W, H)

      particles.forEach((b, i) => {
        // ── Atualiza posição e opacidade por modo ──────────────────
        let alpha = b.maxOpacity

        if (mode === 'loop') {
          b.y += b.speed
          if (b.y > H) b.y = -b.height
          alpha = b.maxOpacity
        } else if (mode === 'random') {
          b.y += b.speed
          if (b.y > H + b.height) {
            b.y = -b.height - Math.random() * H * 0.5
            b.x = ((beamConfigs[i].x + (Math.random() - 0.5) * 10) / 100) * W
          }
          alpha = b.maxOpacity
        } else if (mode === 'fade') {
          b.y += b.speed
          if (b.y > H + b.height) b.y = -b.height
          // Fade baseado na posição: 0 no topo, máximo no meio, 0 no fundo
          const progress = (b.y + b.height) / (H + b.height * 2)
          alpha = b.maxOpacity * Math.sin(Math.PI * Math.max(0, Math.min(1, progress)))
        } else if (mode === 'pulse') {
          b.y += b.speed
          if (b.y > H) b.y = -b.height
          alpha = b.maxOpacity * (0.4 + 0.6 * Math.sin(timestamp * 0.002 + b.phase))
        } else if (mode === 'burst') {
          // Burst: velocidade alta, aparece e some rápido
          b.y += b.speed * 4
          const progress = (b.y + b.height) / (H + b.height * 2)
          // Curva sharp: sobe rápido e cai rápido
          alpha = b.maxOpacity * Math.pow(Math.sin(Math.PI * Math.max(0, Math.min(1, progress))), 3)
          if (b.y > H + b.height) {
            b.y = -b.height - Math.random() * H * 0.3
          }
        }

        // Atualiza posição do dot
        b.dotY = (b.dotY + b.speed * 1.5) % b.height

        if (alpha <= 0.01) return

        // ── Desenha beam ───────────────────────────────────────────
        drawBeamLine(ctx, b, alpha, mode)

        // ── Desenha decoração ──────────────────────────────────────
        if (b.decoration === 'chevron') drawChevrons(ctx, b, alpha)
        if (b.decoration === 'circuit') drawCircuit(ctx, b, alpha)
        if (b.decoration === 'dot') drawDot(ctx, b, alpha, timestamp)
      })

      animFrame = requestAnimationFrame(draw)
    }

    animFrame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animFrame)
      observer?.disconnect()
    }
  }, [beamConfigs, mode, fixed, windowSize.width, windowSize.height])

  const edgeFade = `linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)`

  return (
    <canvas
      ref={canvasRef}
      aria-hidden='true'
      className={className}
      style={{
        position: fixed ? 'fixed' : 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex,
        pointerEvents: 'none',
        maskImage: edgeFade,
        WebkitMaskImage: edgeFade,
      }}
    />
  )
}

export default BeamRain
