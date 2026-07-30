'use client'

import { type CSSProperties, useEffect, useMemo, useRef, useState } from 'react'

import { useReducedMotion } from 'motion/react'

import { type RandomSeed, createRandom, cssColorToRgb, frameScale, resizeCanvas } from './canvas'
import { usePageVisibility } from './usePageVisibility'

export type HudPresetName = 'minimal' | 'cyberpunk' | 'military' | 'medical' | 'industrial' | 'retro' | 'alien'
export type TrackOrientation = 'vertical' | 'horizontal' | 'diagonal'
export type BeamMovementMode = 'loop' | 'once' | 'ping-pong' | 'pulse' | 'static' | 'random'
export type BeamGradientPreset = 'solid' | 'head' | 'tail' | 'center' | 'pulse'
export type HudLayer = 'tracks' | 'beams' | 'centerpiece' | 'labels'

export interface HudGlow {
  color?: string
  blur?: number
  opacity?: number
  widthMultiplier?: number
}

export interface BeamGradientStop {
  offset: number
  color?: string
  opacity: number
}

export type BeamGradient = BeamGradientPreset | { stops: BeamGradientStop[] }

export interface BeamMovement {
  mode?: BeamMovementMode
  speedMultiplier?: number
  pause?: number
  randomPause?: [number, number]
}

export interface TerminalDecoration {
  type: 'terminal' | 'dot'
  radius?: number
  color?: string
  coreColor?: string
  glowRadius?: number
  glowOpacity?: number
  ring?: boolean
}

export interface ChevronDecoration {
  type: 'chevrons' | 'chevron'
  count?: number
  size?: number
  spacing?: number
  strokeWidth?: number
  direction?: 'forward' | 'backward'
  placement?: 'head' | 'tail' | 'center' | 'distributed'
  fade?: boolean
}

export interface JunctionDecoration {
  type: 'junction' | 'circuit'
  side?: 'left' | 'right' | 'auto'
  length?: number
  offset?: number
  angle?: number
  dashed?: boolean
  node?: 'none' | 'dot' | 'ring' | 'square'
  nodeSize?: number
}

export interface PacketDecoration {
  type: 'packet'
  shape?: 'line' | 'square' | 'diamond' | 'pill'
  count?: number
  size?: number
  spacing?: number
}

export interface ScannerDecoration {
  type: 'scanner'
  width?: number
  thickness?: number
  glow?: number
  pulse?: boolean
}

export interface SparkDecoration {
  type: 'spark'
  count?: number
  radius?: number
  spread?: number
}

export interface BeamDecorationState {
  x: number
  y: number
  tailX: number
  tailY: number
  tangentX: number
  tangentY: number
  normalX: number
  normalY: number
  progress: number
  timestamp: number
  color: string
  opacity: number
}

export type BeamDecorationRenderer = (context: CanvasRenderingContext2D, state: BeamDecorationState) => void

export interface CustomDecoration {
  type: 'custom'
  /**
   * Escape hatch para componentes já dentro de uma fronteira Client Component.
   * Funções não podem ser enviadas por props de um Server Component.
   */
  draw: BeamDecorationRenderer
}

export type BeamDecorationConfig =
  | TerminalDecoration
  | ChevronDecoration
  | JunctionDecoration
  | PacketDecoration
  | ScannerDecoration
  | SparkDecoration
  | CustomDecoration

/** Nomes legados continuam aceitos. */
export type BeamDecoration =
  | 'none'
  | 'dot'
  | 'chevron'
  | 'circuit'
  | 'terminal'
  | 'chevrons'
  | 'junction'
  | 'packet'
  | 'scanner'
  | 'spark'
  | BeamDecorationConfig

export interface TrackBeam {
  color?: string
  speed?: number
  height?: number
  length?: number
  width?: number
  opacity?: number
  decoration?: BeamDecoration
  delay?: number
  direction?: 'forward' | 'reverse'
  gradient?: BeamGradient
  glow?: HudGlow | false
  movement?: BeamMovement
  blendMode?: GlobalCompositeOperation
  lineCap?: CanvasLineCap
}

export interface TrackLineStyle {
  color?: string
  opacity?: number
  width?: number
  dash?: number[]
  lineCap?: CanvasLineCap
  glow?: HudGlow | false
}

export interface TrackTicks {
  enabled?: boolean
  interval?: number
  length?: number
  width?: number
  color?: string
  opacity?: number
  side?: 'left' | 'right' | 'both'
  pattern?: 'uniform' | 'major-minor' | 'random'
  majorEvery?: number
}

export interface HudTrackLabel {
  text: string
  subText?: string
  position?: number
  side?: 'start' | 'end' | 'center'
  offset?: number
  color?: string
  opacity?: number
  fontSize?: number
  subFontSize?: number
  fontFamily?: string
  subFontFamily?: string
  letterSpacing?: string
  align?: 'start' | 'center' | 'end'
  transform?: 'none' | 'uppercase'
  glow?: number
}

export interface HudTrack {
  /** Compatibilidade: posição horizontal em porcentagem. */
  x: number
  /** Posição no eixo principal. Quando omitida, usa `x`. */
  position?: number
  orientation?: TrackOrientation
  angle?: number
  start?: number
  end?: number
  fadeStart?: number
  fadeEnd?: number

  label?: string
  subLabel?: string
  labelColor?: string
  labels?: HudTrackLabel[]

  lineColor?: string
  dashed?: boolean
  lineWidth?: number
  line?: TrackLineStyle
  ticks?: TrackTicks | false
  beams?: TrackBeam[]
}

export interface HudTheme {
  primary: string
  secondary?: string
  accent?: string
  warning?: string
  neutral?: string
  trackOpacity?: number
  beamOpacity?: number
  labelOpacity?: number
  fontFamily?: string
  monoFontFamily?: string
  glowIntensity?: number
  lineWidth?: number
  backgroundBlendMode?: CSSProperties['mixBlendMode']
}

export interface BracketCenterpiece {
  type: 'brackets'
  width?: number
  height?: number
  cornerSize?: number
  corners?: Array<'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'>
  color?: string
  opacity?: number
  lineWidth?: number
  crosshair?: boolean | CrosshairConfig
}

export interface CrosshairConfig {
  color?: string
  opacity?: number
  size?: number
  gap?: number
}

export interface ReticleCenterpiece {
  type: 'reticle'
  radius?: number
  rings?: number
  segments?: number
  color?: string
  opacity?: number
  lineWidth?: number
}

export interface ScannerCenterpiece {
  type: 'scanner'
  radius?: number
  color?: string
  opacity?: number
  lineWidth?: number
  sweep?: boolean
  speed?: number
}

export interface CustomCenterpiece {
  type: 'custom'
  draw: (context: CanvasRenderingContext2D, state: { width: number; height: number; timestamp: number }) => void
}

export type HudCenterpiece = BracketCenterpiece | ReticleCenterpiece | ScannerCenterpiece | CustomCenterpiece

export interface HudEdgeFade {
  top?: number
  right?: number
  bottom?: number
  left?: number
}

export interface HudParallax {
  strengthX?: number
  strengthY?: number
  smoothing?: number
  invert?: boolean
}

export interface HudMotion {
  speedMultiplier?: number
  paused?: boolean
  reducedMotion?: 'static' | 'hidden' | 'simplified'
}

export interface HudResponsive {
  hideLabelsBelow?: number
  labelScaleBelow?: number
  labelScale?: number
}

export interface HudPreset {
  theme: HudTheme
  centerpiece?: HudCenterpiece | false
  parallax?: HudParallax | false
  motion?: HudMotion
}

export interface HudTerminalProps {
  tracks: HudTrack[]
  preset?: HudPresetName
  theme?: Partial<HudTheme>
  centerpiece?: HudCenterpiece | false
  parallax?: HudParallax | false
  motion?: HudMotion
  edgeFade?: HudEdgeFade | false
  layers?: HudLayer[]
  responsive?: HudResponsive
  placement?: 'viewport' | 'container'
  inset?: number | string
  clip?: boolean
  blendMode?: CSSProperties['mixBlendMode']

  opacity?: number
  fixed?: boolean
  zIndex?: number
  className?: string
  showCenterBracket?: boolean
  labelFontSize?: number
  subLabelFontSize?: number
  labelFontFamily?: string
  subLabelFontFamily?: string
  seed?: RandomSeed
}

const baseTheme: HudTheme = {
  primary: '#00fbea',
  secondary: '#ffffff',
  accent: '#ff00bb',
  warning: '#ffcc33',
  neutral: '#ffffff',
  trackOpacity: 0.12,
  beamOpacity: 0.8,
  labelOpacity: 0.7,
  fontFamily: 'var(--font-space-grotesk)',
  monoFontFamily: 'var(--font-syne-mono)',
  glowIntensity: 0.6,
  lineWidth: 1,
}

const DEFAULT_LAYERS: HudLayer[] = ['tracks', 'beams', 'centerpiece', 'labels']

export const hudPresets: Record<HudPresetName, HudPreset> = {
  minimal: {
    theme: { ...baseTheme, primary: '#b7c5d3', accent: '#dce6ef', trackOpacity: 0.08, glowIntensity: 0.15 },
    centerpiece: false,
    parallax: { strengthX: 2, strengthY: 2, smoothing: 0.25 },
    motion: { speedMultiplier: 0.65, reducedMotion: 'static' },
  },
  cyberpunk: {
    theme: { ...baseTheme, primary: '#00fbea', accent: '#ff00bb', warning: '#ffea00', glowIntensity: 0.9 },
    centerpiece: { type: 'brackets', crosshair: true },
    parallax: { strengthX: 12, strengthY: 12, smoothing: 0.2 },
    motion: { speedMultiplier: 1, reducedMotion: 'static' },
  },
  military: {
    theme: {
      ...baseTheme,
      primary: '#8cff66',
      accent: '#d7ff8a',
      warning: '#ffb347',
      trackOpacity: 0.16,
      glowIntensity: 0.3,
    },
    centerpiece: { type: 'reticle', rings: 2, segments: 8 },
    parallax: { strengthX: 4, strengthY: 4, smoothing: 0.18 },
    motion: { speedMultiplier: 0.8, reducedMotion: 'simplified' },
  },
  medical: {
    theme: {
      ...baseTheme,
      primary: '#78e7ff',
      accent: '#e8fbff',
      warning: '#ff758f',
      trackOpacity: 0.09,
      glowIntensity: 0.25,
    },
    centerpiece: { type: 'scanner', sweep: true, radius: 90 },
    parallax: false,
    motion: { speedMultiplier: 0.55, reducedMotion: 'static' },
  },
  industrial: {
    theme: {
      ...baseTheme,
      primary: '#ff8a3d',
      accent: '#ffd166',
      warning: '#ff4d35',
      trackOpacity: 0.14,
      glowIntensity: 0.2,
    },
    centerpiece: { type: 'brackets', corners: ['top-left', 'bottom-right'], crosshair: false },
    parallax: { strengthX: 3, strengthY: 3, smoothing: 0.22 },
    motion: { speedMultiplier: 0.75, reducedMotion: 'simplified' },
  },
  retro: {
    theme: {
      ...baseTheme,
      primary: '#7dff72',
      accent: '#caffbf',
      warning: '#ffe66d',
      trackOpacity: 0.18,
      glowIntensity: 0.5,
    },
    centerpiece: { type: 'reticle', rings: 1, segments: 4 },
    parallax: false,
    motion: { speedMultiplier: 0.7, reducedMotion: 'static' },
  },
  alien: {
    theme: {
      ...baseTheme,
      primary: '#9d7bff',
      accent: '#4dffd2',
      warning: '#ff6bf2',
      trackOpacity: 0.1,
      glowIntensity: 0.75,
    },
    centerpiece: { type: 'scanner', sweep: true, radius: 120, speed: 0.0007 },
    parallax: { strengthX: 8, strengthY: 5, smoothing: 0.28, invert: true },
    motion: { speedMultiplier: 0.65, reducedMotion: 'simplified' },
  },
}

type Point = { x: number; y: number }
type TrackGeometry = {
  start: Point
  end: Point
  tangent: Point
  normal: Point
  length: number
}

type Particle = {
  trackIndex: number
  beam: TrackBeam
  distance: number
  direction: 1 | -1
  waiting: number
  completed: boolean
}

const clamp01 = (value: number): number => Math.max(0, Math.min(1, value))
const percent = (value: number): number => clamp01(value / 100)

const resolveGeometry = (track: HudTrack, width: number, height: number): TrackGeometry => {
  const orientation = track.orientation ?? 'vertical'
  const position = percent(track.position ?? track.x)
  const from = percent(track.start ?? 0)
  const to = percent(track.end ?? 100)

  let start: Point
  let end: Point

  if (orientation === 'horizontal') {
    start = { x: from * width, y: position * height }
    end = { x: to * width, y: position * height }
  } else if (orientation === 'diagonal') {
    const angle = ((track.angle ?? 18) * Math.PI) / 180
    const center = { x: position * width, y: ((from + to) / 2) * height }
    const available = Math.hypot(width, height) * Math.max(0.05, to - from)
    const dx = Math.sin(angle) * available * 0.5
    const dy = Math.cos(angle) * available * 0.5
    start = { x: center.x - dx, y: center.y - dy }
    end = { x: center.x + dx, y: center.y + dy }
  } else {
    start = { x: position * width, y: from * height }
    end = { x: position * width, y: to * height }
  }

  const dx = end.x - start.x
  const dy = end.y - start.y
  const length = Math.max(1, Math.hypot(dx, dy))
  const tangent = { x: dx / length, y: dy / length }

  return {
    start,
    end,
    tangent,
    normal: { x: -tangent.y, y: tangent.x },
    length,
  }
}

const pointAt = (geometry: TrackGeometry, distance: number): Point => ({
  x: geometry.start.x + geometry.tangent.x * distance,
  y: geometry.start.y + geometry.tangent.y * distance,
})

const rgba = (context: CanvasRenderingContext2D, color: string, opacity: number): string => {
  const rgb = cssColorToRgb(context, color) ?? '255, 255, 255'
  return `rgba(${rgb}, ${clamp01(opacity)})`
}

const resolveDecoration = (decoration: BeamDecoration | undefined): BeamDecorationConfig | null => {
  if (!decoration || decoration === 'none') return null
  if (typeof decoration === 'object') return decoration
  if (decoration === 'dot' || decoration === 'terminal') return { type: decoration }
  if (decoration === 'chevron' || decoration === 'chevrons') return { type: decoration }
  if (decoration === 'circuit' || decoration === 'junction') return { type: decoration }
  return { type: decoration }
}

const drawGlowLine = (
  context: CanvasRenderingContext2D,
  start: Point,
  end: Point,
  color: string,
  width: number,
  opacity: number,
  glow: HudGlow | false | undefined,
  theme: HudTheme,
) => {
  if (!glow) return
  context.save()
  context.beginPath()
  context.moveTo(start.x, start.y)
  context.lineTo(end.x, end.y)
  context.strokeStyle = rgba(context, glow.color ?? color, (glow.opacity ?? 0.35) * (theme.glowIntensity ?? 1))
  context.lineWidth = width * (glow.widthMultiplier ?? 2)
  context.shadowColor = glow.color ?? color
  context.shadowBlur = (glow.blur ?? 10) * (theme.glowIntensity ?? 1)
  context.globalAlpha = opacity
  context.stroke()
  context.restore()
}

const drawTrack = (
  context: CanvasRenderingContext2D,
  track: HudTrack,
  geometry: TrackGeometry,
  theme: HudTheme,
  random: () => number,
) => {
  const line = track.line ?? {}
  const color = line.color ?? track.lineColor ?? theme.primary
  const width = line.width ?? track.lineWidth ?? theme.lineWidth ?? 1
  const opacity = line.opacity ?? theme.trackOpacity ?? 0.12
  const dash = line.dash ?? (track.dashed ? [4, 12] : [])
  const fadeStart = percent(track.fadeStart ?? 0)
  const fadeEnd = percent(track.fadeEnd ?? 0)

  context.save()
  context.lineCap = line.lineCap ?? 'butt'
  context.lineWidth = width
  context.setLineDash(dash)

  const gradient = context.createLinearGradient(geometry.start.x, geometry.start.y, geometry.end.x, geometry.end.y)
  if (fadeStart > 0) {
    gradient.addColorStop(0, rgba(context, color, 0))
    gradient.addColorStop(fadeStart, rgba(context, color, opacity))
  } else {
    gradient.addColorStop(0, rgba(context, color, opacity))
  }
  if (fadeEnd > 0) {
    gradient.addColorStop(1 - fadeEnd, rgba(context, color, opacity))
    gradient.addColorStop(1, rgba(context, color, 0))
  } else {
    gradient.addColorStop(1, rgba(context, color, opacity))
  }

  context.strokeStyle = gradient
  context.beginPath()
  context.moveTo(geometry.start.x, geometry.start.y)
  context.lineTo(geometry.end.x, geometry.end.y)
  context.stroke()
  context.restore()

  const legacyTicks = !track.ticks && track.lineWidth !== undefined && track.lineWidth > 1
  const ticks = track.ticks === false ? null : (track.ticks ?? (legacyTicks ? { enabled: true } : null))
  if (!ticks?.enabled) return

  const interval = Math.max(8, ticks.interval ?? 150)
  const majorEvery = Math.max(1, ticks.majorEvery ?? 5)
  const count = Math.floor(geometry.length / interval)

  context.save()
  context.strokeStyle = rgba(context, ticks.color ?? color, ticks.opacity ?? 0.45)
  context.lineWidth = ticks.width ?? 1

  for (let index = 1; index < count; index++) {
    if (ticks.pattern === 'random' && random() < 0.35) continue
    const center = pointAt(geometry, index * interval)
    const isMajor = ticks.pattern === 'major-minor' && index % majorEvery === 0
    const length = (ticks.length ?? 10) * (isMajor ? 1.7 : 1)
    const left = ticks.side !== 'right'
    const right = ticks.side !== 'left'

    context.beginPath()
    context.moveTo(
      center.x - geometry.normal.x * (left ? length : 0),
      center.y - geometry.normal.y * (left ? length : 0),
    )
    context.lineTo(
      center.x + geometry.normal.x * (right ? length : 0),
      center.y + geometry.normal.y * (right ? length : 0),
    )
    context.stroke()
  }
  context.restore()
}

const addGradientStops = (
  context: CanvasRenderingContext2D,
  gradient: CanvasGradient,
  spec: BeamGradient | undefined,
  color: string,
  opacity: number,
  timestamp: number,
) => {
  if (typeof spec === 'object') {
    const stops = [...spec.stops].sort((a, b) => a.offset - b.offset)
    stops.forEach(stop =>
      gradient.addColorStop(clamp01(stop.offset), rgba(context, stop.color ?? color, opacity * stop.opacity)),
    )
    return
  }

  const pulse = spec === 'pulse' ? 0.55 + Math.sin(timestamp * 0.004) * 0.25 : 1
  if (spec === 'solid') {
    gradient.addColorStop(0, rgba(context, color, opacity * pulse))
    gradient.addColorStop(1, rgba(context, color, opacity * pulse))
  } else if (spec === 'tail') {
    gradient.addColorStop(0, rgba(context, color, opacity * pulse))
    gradient.addColorStop(1, rgba(context, color, 0))
  } else if (spec === 'center') {
    gradient.addColorStop(0, rgba(context, color, 0))
    gradient.addColorStop(0.5, rgba(context, color, opacity * pulse))
    gradient.addColorStop(1, rgba(context, color, 0))
  } else {
    gradient.addColorStop(0, rgba(context, color, 0))
    gradient.addColorStop(0.7, rgba(context, color, opacity * 0.4 * pulse))
    gradient.addColorStop(1, rgba(context, color, opacity * pulse))
  }
}

const drawDecorationNode = (
  context: CanvasRenderingContext2D,
  point: Point,
  node: JunctionDecoration['node'],
  size: number,
  color: string,
  opacity: number,
) => {
  if (!node || node === 'none') return
  context.beginPath()
  if (node === 'square') {
    context.rect(point.x - size, point.y - size, size * 2, size * 2)
  } else {
    context.arc(point.x, point.y, size, 0, Math.PI * 2)
  }
  if (node === 'ring') {
    context.strokeStyle = rgba(context, color, opacity)
    context.stroke()
  } else {
    context.fillStyle = rgba(context, color, opacity)
    context.fill()
  }
}

const drawDecoration = (
  context: CanvasRenderingContext2D,
  decoration: BeamDecorationConfig,
  state: BeamDecorationState,
  theme: HudTheme,
) => {
  if (decoration.type === 'custom') {
    context.save()
    decoration.draw(context, state)
    context.restore()
    return
  }

  const head = { x: state.x, y: state.y }
  const color = 'color' in decoration && decoration.color ? decoration.color : state.color

  context.save()

  if (decoration.type === 'terminal' || decoration.type === 'dot') {
    const radius = decoration.radius ?? (decoration.type === 'dot' ? 2.5 : 1.8)
    const glowRadius = decoration.glowRadius ?? (decoration.type === 'dot' ? 14 : 7)
    const glow = context.createRadialGradient(head.x, head.y, 0, head.x, head.y, glowRadius)
    glow.addColorStop(0, rgba(context, color, (decoration.glowOpacity ?? 0.6) * (theme.glowIntensity ?? 1)))
    glow.addColorStop(1, rgba(context, color, 0))
    context.fillStyle = glow
    context.beginPath()
    context.arc(head.x, head.y, glowRadius, 0, Math.PI * 2)
    context.fill()

    context.beginPath()
    context.arc(head.x, head.y, radius, 0, Math.PI * 2)
    if (decoration.ring) {
      context.strokeStyle = rgba(context, decoration.coreColor ?? color, state.opacity)
      context.stroke()
    } else {
      context.fillStyle = rgba(context, decoration.coreColor ?? color, state.opacity)
      context.fill()
    }
  }

  if (decoration.type === 'chevrons' || decoration.type === 'chevron') {
    const count = Math.max(1, decoration.count ?? (decoration.type === 'chevron' ? 3 : 2))
    const size = decoration.size ?? 5
    const spacing = decoration.spacing ?? 12
    const direction = decoration.direction === 'backward' ? -1 : 1
    context.lineWidth = decoration.strokeWidth ?? 1.2

    for (let index = 0; index < count; index++) {
      const distributedOffset =
        decoration.placement === 'distributed'
          ? (state.progress * 80 + index * spacing) % 80
          : decoration.placement === 'tail'
            ? 60 + index * spacing
            : decoration.placement === 'center'
              ? 30 + index * spacing
              : index * spacing
      const center = {
        x: head.x - state.tangentX * distributedOffset,
        y: head.y - state.tangentY * distributedOffset,
      }
      const alpha = decoration.fade === false ? state.opacity : state.opacity * (1 - index / (count + 1))
      context.beginPath()
      context.moveTo(
        center.x - state.normalX * size - state.tangentX * size * direction,
        center.y - state.normalY * size - state.tangentY * size * direction,
      )
      context.lineTo(center.x, center.y)
      context.lineTo(
        center.x + state.normalX * size - state.tangentX * size * direction,
        center.y + state.normalY * size - state.tangentY * size * direction,
      )
      context.strokeStyle = rgba(context, color, alpha)
      context.stroke()
    }
  }

  if (decoration.type === 'junction' || decoration.type === 'circuit') {
    const autoSide = state.x > state.tailX ? -1 : 1
    const side = decoration.side === 'left' ? -1 : decoration.side === 'right' ? 1 : autoSide
    const length = decoration.length ?? 22
    const offset = decoration.offset ?? 15
    const angle = ((decoration.angle ?? 35) * Math.PI) / 180
    const branchStart = {
      x: head.x - state.tangentX * offset,
      y: head.y - state.tangentY * offset,
    }
    const branchEnd = {
      x: branchStart.x + state.normalX * side * length * Math.cos(angle) + state.tangentX * length * Math.sin(angle),
      y: branchStart.y + state.normalY * side * length * Math.cos(angle) + state.tangentY * length * Math.sin(angle),
    }
    context.setLineDash((decoration.dashed ?? decoration.type === 'circuit') ? [2, 3] : [])
    context.strokeStyle = rgba(context, color, state.opacity)
    context.lineWidth = 1
    context.beginPath()
    context.moveTo(branchStart.x, branchStart.y)
    context.lineTo(branchEnd.x, branchEnd.y)
    context.stroke()
    context.setLineDash([])
    drawDecorationNode(
      context,
      branchEnd,
      decoration.node ?? (decoration.type === 'circuit' ? 'dot' : 'ring'),
      decoration.nodeSize ?? 1.5,
      color,
      state.opacity,
    )
  }

  if (decoration.type === 'packet') {
    const count = Math.max(1, decoration.count ?? 2)
    const size = decoration.size ?? 5
    const spacing = decoration.spacing ?? 14
    for (let index = 0; index < count; index++) {
      const center = {
        x: head.x - state.tangentX * (index * spacing + 5),
        y: head.y - state.tangentY * (index * spacing + 5),
      }
      context.save()
      context.translate(center.x, center.y)
      context.rotate(Math.atan2(state.tangentY, state.tangentX))
      context.fillStyle = rgba(context, color, state.opacity * (1 - index * 0.2))
      if (decoration.shape === 'square') context.fillRect(-size / 2, -size / 2, size, size)
      else if (decoration.shape === 'diamond') {
        context.rotate(Math.PI / 4)
        context.fillRect(-size / 2, -size / 2, size, size)
      } else if (decoration.shape === 'pill') {
        context.beginPath()
        context.roundRect(-size, -size / 3, size * 2, (size * 2) / 3, size / 3)
        context.fill()
      } else {
        context.fillRect(-1, -size, 2, size * 2)
      }
      context.restore()
    }
  }

  if (decoration.type === 'scanner') {
    const width = decoration.width ?? 24
    const thickness = decoration.thickness ?? 1
    const pulse = decoration.pulse ? 0.6 + Math.sin(state.timestamp * 0.006) * 0.4 : 1
    context.strokeStyle = rgba(context, color, state.opacity * pulse)
    context.lineWidth = thickness
    context.shadowColor = color
    context.shadowBlur = decoration.glow ?? 6
    context.beginPath()
    context.moveTo(head.x - state.normalX * width * 0.5, head.y - state.normalY * width * 0.5)
    context.lineTo(head.x + state.normalX * width * 0.5, head.y + state.normalY * width * 0.5)
    context.stroke()
  }

  if (decoration.type === 'spark') {
    const count = Math.max(2, decoration.count ?? 5)
    const spread = decoration.spread ?? 10
    const radius = decoration.radius ?? 1
    for (let index = 0; index < count; index++) {
      const phase = (index / count) * Math.PI * 2 + state.timestamp * 0.001
      const distance = spread * (0.45 + ((index * 37) % 10) / 20)
      context.beginPath()
      context.arc(head.x + Math.cos(phase) * distance, head.y + Math.sin(phase) * distance, radius, 0, Math.PI * 2)
      context.fillStyle = rgba(context, color, state.opacity * (0.35 + (index % 3) * 0.2))
      context.fill()
    }
  }

  context.restore()
}

const drawBeam = (
  context: CanvasRenderingContext2D,
  particle: Particle,
  geometry: TrackGeometry,
  theme: HudTheme,
  timestamp: number,
) => {
  const beam = particle.beam
  const beamLength = Math.max(1, beam.length ?? beam.height ?? 200)
  const color = beam.color ?? theme.primary
  const opacity =
    (beam.opacity ?? theme.beamOpacity ?? 0.8) *
    (beam.movement?.mode === 'pulse' ? 0.65 + Math.sin(timestamp * 0.004) * 0.35 : 1)
  const head = pointAt(geometry, particle.distance)
  const tail = pointAt(geometry, particle.distance - beamLength * particle.direction)
  const gradient = context.createLinearGradient(tail.x, tail.y, head.x, head.y)
  addGradientStops(context, gradient, beam.gradient, color, opacity, timestamp)

  context.save()
  context.globalCompositeOperation = beam.blendMode ?? 'source-over'
  context.lineCap = beam.lineCap ?? 'round'
  drawGlowLine(context, tail, head, color, beam.width ?? 2, opacity, beam.glow, theme)
  context.beginPath()
  context.moveTo(tail.x, tail.y)
  context.lineTo(head.x, head.y)
  context.strokeStyle = gradient
  context.lineWidth = beam.width ?? 2
  context.stroke()

  const decoration = resolveDecoration(beam.decoration)
  if (decoration) {
    drawDecoration(
      context,
      decoration,
      {
        x: head.x,
        y: head.y,
        tailX: tail.x,
        tailY: tail.y,
        tangentX: geometry.tangent.x * particle.direction,
        tangentY: geometry.tangent.y * particle.direction,
        normalX: geometry.normal.x,
        normalY: geometry.normal.y,
        progress: particle.distance / geometry.length,
        timestamp,
        color,
        opacity,
      },
      theme,
    )
  }
  context.restore()
}

const drawBrackets = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  config: BracketCenterpiece,
  theme: HudTheme,
) => {
  const centerX = width / 2
  const centerY = height / 2
  const halfWidth = config.width ?? 160
  const halfHeight = config.height ?? 100
  const size = config.cornerSize ?? 15
  const corners = config.corners ?? ['top-left', 'top-right', 'bottom-left', 'bottom-right']

  context.save()
  context.strokeStyle = rgba(context, config.color ?? theme.primary, config.opacity ?? 0.25)
  context.lineWidth = config.lineWidth ?? 1.5

  const cornerPoints: Record<(typeof corners)[number], [number, number, number, number]> = {
    'top-left': [centerX - halfWidth, centerY - halfHeight, 1, 1],
    'top-right': [centerX + halfWidth, centerY - halfHeight, -1, 1],
    'bottom-left': [centerX - halfWidth, centerY + halfHeight, 1, -1],
    'bottom-right': [centerX + halfWidth, centerY + halfHeight, -1, -1],
  }

  corners.forEach(corner => {
    const [x, y, horizontal, vertical] = cornerPoints[corner]
    context.beginPath()
    context.moveTo(x, y + size * vertical)
    context.lineTo(x, y)
    context.lineTo(x + size * horizontal, y)
    context.stroke()
  })

  if (config.crosshair) {
    const crosshair = typeof config.crosshair === 'object' ? config.crosshair : {}
    const crossSize = crosshair.size ?? 8
    const gap = crosshair.gap ?? 0
    context.strokeStyle = rgba(context, crosshair.color ?? theme.accent ?? theme.primary, crosshair.opacity ?? 0.3)
    context.beginPath()
    context.moveTo(centerX - crossSize, centerY)
    context.lineTo(centerX - gap, centerY)
    context.moveTo(centerX + gap, centerY)
    context.lineTo(centerX + crossSize, centerY)
    context.moveTo(centerX, centerY - crossSize)
    context.lineTo(centerX, centerY - gap)
    context.moveTo(centerX, centerY + gap)
    context.lineTo(centerX, centerY + crossSize)
    context.stroke()
  }
  context.restore()
}

const drawReticle = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  config: ReticleCenterpiece,
  theme: HudTheme,
) => {
  const centerX = width / 2
  const centerY = height / 2
  const radius = config.radius ?? 70
  const rings = Math.max(1, config.rings ?? 2)
  const segments = Math.max(2, config.segments ?? 8)
  context.save()
  context.strokeStyle = rgba(context, config.color ?? theme.primary, config.opacity ?? 0.22)
  context.lineWidth = config.lineWidth ?? 1
  for (let ring = 1; ring <= rings; ring++) {
    context.beginPath()
    context.arc(centerX, centerY, (radius * ring) / rings, 0, Math.PI * 2)
    context.stroke()
  }
  for (let index = 0; index < segments; index++) {
    const angle = (index / segments) * Math.PI * 2
    context.beginPath()
    context.moveTo(centerX + Math.cos(angle) * radius * 0.8, centerY + Math.sin(angle) * radius * 0.8)
    context.lineTo(centerX + Math.cos(angle) * radius * 1.12, centerY + Math.sin(angle) * radius * 1.12)
    context.stroke()
  }
  context.restore()
}

const drawScannerCenterpiece = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  timestamp: number,
  config: ScannerCenterpiece,
  theme: HudTheme,
) => {
  const centerX = width / 2
  const centerY = height / 2
  const radius = config.radius ?? 90
  const color = config.color ?? theme.primary
  context.save()
  context.strokeStyle = rgba(context, color, config.opacity ?? 0.2)
  context.lineWidth = config.lineWidth ?? 1
  context.beginPath()
  context.arc(centerX, centerY, radius, 0, Math.PI * 2)
  context.stroke()
  if (config.sweep) {
    const angle = timestamp * (config.speed ?? 0.001)
    context.beginPath()
    context.moveTo(centerX, centerY)
    context.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius)
    context.strokeStyle = rgba(context, color, (config.opacity ?? 0.2) * 2)
    context.stroke()
  }
  context.restore()
}

const drawCenterpiece = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  timestamp: number,
  centerpiece: HudCenterpiece,
  theme: HudTheme,
) => {
  if (centerpiece.type === 'custom') {
    context.save()
    centerpiece.draw(context, { width, height, timestamp })
    context.restore()
  } else if (centerpiece.type === 'reticle') {
    drawReticle(context, width, height, centerpiece, theme)
  } else if (centerpiece.type === 'scanner') {
    drawScannerCenterpiece(context, width, height, timestamp, centerpiece, theme)
  } else {
    drawBrackets(context, width, height, centerpiece, theme)
  }
}

const resolveLabelPoint = (track: HudTrack, label: HudTrackLabel): { left: string; top: string } => {
  const orientation = track.orientation ?? 'vertical'
  const position = track.position ?? track.x
  const along =
    label.position ?? (label.side === 'start' ? (track.start ?? 0) : label.side === 'center' ? 50 : (track.end ?? 100))
  if (orientation === 'horizontal') return { left: `${along}%`, top: `${position}%` }
  return { left: `${position}%`, top: `${along}%` }
}

const defaultEdgeFade: HudEdgeFade = { top: 8, bottom: 8 }

/**
 * Canvas HUD reutilizável com trilhos, beams, labels e centerpiece configuráveis.
 *
 * A API curta preserva o uso original:
 * @example
 * <HudTerminal
 *   fixed
 *   tracks={[
 *     {
 *       x: 20,
 *       label: 'SECTOR_01',
 *       dashed: true,
 *       beams: [{ color: '#00fbea', decoration: 'dot' }],
 *     },
 *   ]}
 * />
 *
 * A API avançada permite trocar completamente a linguagem visual:
 * @example
 * <HudTerminal
 *   preset='industrial'
 *   placement='container'
 *   theme={{ primary: '#ff8a3d', accent: '#ffd166' }}
 *   centerpiece={{
 *     type: 'brackets',
 *     corners: ['top-left', 'bottom-right'],
 *     crosshair: false,
 *   }}
 *   responsive={{ hideLabelsBelow: 480 }}
 *   tracks={[
 *     {
 *       x: 25,
 *       orientation: 'vertical',
 *       start: 8,
 *       end: 92,
 *       line: { dash: [3, 10], opacity: 0.16 },
 *       ticks: { enabled: true, pattern: 'major-minor', interval: 32 },
 *       beams: [{
 *         speed: 2,
 *         gradient: 'head',
 *         glow: { blur: 8, opacity: 0.25 },
 *         movement: { mode: 'random', randomPause: [20, 160] },
 *         decoration: { type: 'packet', count: 2, shape: 'line' },
 *       }],
 *     },
 *   ]}
 * />
 *
 * Renderizadores `custom` são um escape hatch para uso dentro do grafo cliente.
 * Como funções não são serializáveis pelo React, Server Components devem usar
 * apenas as configurações declarativas e os presets incorporados.
 */
export const HudTerminal = ({
  tracks,
  preset = 'cyberpunk',
  theme: themeOverrides,
  centerpiece: centerpieceProp,
  parallax: parallaxProp,
  motion: motionOverrides,
  edgeFade = defaultEdgeFade,
  layers = DEFAULT_LAYERS,
  responsive,
  placement,
  inset = 0,
  clip = true,
  blendMode,
  opacity = 1,
  fixed = false,
  zIndex = 0,
  className,
  showCenterBracket = true,
  labelFontSize = 10,
  subLabelFontSize = 8,
  labelFontFamily,
  subLabelFontFamily,
  seed,
}: HudTerminalProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sizeRef = useRef({ width: 0, height: 0 })
  const [renderWidth, setRenderWidth] = useState(0)
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 })
  const prefersReducedMotion = useReducedMotion()
  const isPageVisible = usePageVisibility()

  const selectedPreset = hudPresets[preset]
  const theme = useMemo(
    () => ({
      ...selectedPreset.theme,
      ...themeOverrides,
      fontFamily: labelFontFamily ?? themeOverrides?.fontFamily ?? selectedPreset.theme.fontFamily,
      monoFontFamily: subLabelFontFamily ?? themeOverrides?.monoFontFamily ?? selectedPreset.theme.monoFontFamily,
    }),
    [labelFontFamily, selectedPreset.theme, subLabelFontFamily, themeOverrides],
  )
  const centerpiece = useMemo<HudCenterpiece | false>(
    () =>
      centerpieceProp !== undefined
        ? centerpieceProp
        : showCenterBracket
          ? (selectedPreset.centerpiece ?? { type: 'brackets', crosshair: true })
          : false,
    [centerpieceProp, selectedPreset.centerpiece, showCenterBracket],
  )
  const parallax = parallaxProp !== undefined ? parallaxProp : selectedPreset.parallax
  const motion = useMemo(
    () => ({ ...selectedPreset.motion, ...motionOverrides }),
    [motionOverrides, selectedPreset.motion],
  )
  const placementMode = placement ?? (fixed ? 'viewport' : 'container')

  useEffect(() => {
    if (!isPageVisible || !parallax || prefersReducedMotion) return
    let pointerFrame: number | null = null
    const direction = parallax.invert ? -1 : 1

    const handlePointerMove = (event: PointerEvent) => {
      if (pointerFrame !== null) cancelAnimationFrame(pointerFrame)
      pointerFrame = requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5) * 2
        const y = (event.clientY / window.innerHeight - 0.5) * 2
        setMouseOffset({
          x: x * (parallax.strengthX ?? 8) * direction,
          y: y * (parallax.strengthY ?? 8) * direction,
        })
        pointerFrame = null
      })
    }

    window.addEventListener('pointermove', handlePointerMove)
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      if (pointerFrame !== null) cancelAnimationFrame(pointerFrame)
    }
  }, [isPageVisible, parallax, prefersReducedMotion])

  useEffect(() => {
    if (!isPageVisible) return
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    const random = createRandom(seed)
    let animationFrame = 0
    let previousTimestamp = 0
    let geometries: TrackGeometry[] = []
    let particles: Particle[] = []

    const initialize = (width: number, height: number) => {
      if (width <= 0 || height <= 0) return
      sizeRef.current = { width, height }
      setRenderWidth(current => (Math.abs(current - width) > 1 ? width : current))
      resizeCanvas(canvas, context, width, height)
      geometries = tracks.map(track => resolveGeometry(track, width, height))
      particles = tracks.flatMap((track, trackIndex) =>
        (track.beams ?? []).map((beam, beamIndex, beams) => {
          const geometry = geometries[trackIndex]
          const direction = beam.direction === 'reverse' ? -1 : 1
          const delay = beam.delay ?? random() * Math.min(600, geometry.length)
          const reducedDistance =
            prefersReducedMotion && motion.reducedMotion !== 'hidden'
              ? geometry.length * ((beamIndex + 1) / (beams.length + 1))
              : null
          return {
            trackIndex,
            beam,
            distance: reducedDistance ?? (direction === 1 ? -delay : geometry.length + delay),
            direction,
            waiting: 0,
            completed: false,
          }
        }),
      )
    }

    const parent = canvas.parentElement
    const observer = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect
      initialize(width, height)
    })
    if (parent) {
      observer.observe(parent)
      initialize(parent.clientWidth, parent.clientHeight)
    }

    const updateParticle = (particle: Particle, geometry: TrackGeometry, delta: number) => {
      const movement = particle.beam.movement ?? {}
      const mode = movement.mode ?? 'loop'
      if (motion.paused || mode === 'static' || particle.completed) return
      if (particle.waiting > 0) {
        particle.waiting -= delta
        return
      }

      const speed =
        (particle.beam.speed ?? 3) *
        (movement.speedMultiplier ?? 1) *
        (motion.speedMultiplier ?? 1) *
        particle.direction
      particle.distance += speed * delta
      const beamLength = particle.beam.length ?? particle.beam.height ?? 200
      const passedForward = particle.distance > geometry.length + beamLength
      const passedReverse = particle.distance < -beamLength
      if (!passedForward && !passedReverse) return

      if (mode === 'once') {
        particle.completed = true
      } else if (mode === 'ping-pong') {
        particle.direction *= -1
        particle.distance = particle.direction === 1 ? -beamLength : geometry.length + beamLength
      } else {
        particle.distance = particle.direction === 1 ? -beamLength : geometry.length + beamLength
        const randomPause = movement.randomPause
        const pause = randomPause
          ? randomPause[0] + random() * Math.max(0, randomPause[1] - randomPause[0])
          : (movement.pause ?? (mode === 'random' ? random() * 180 : 0))
        particle.waiting = pause
      }
    }

    const draw = (timestamp: number) => {
      const { width, height } = sizeRef.current
      if (width <= 0 || height <= 0) {
        animationFrame = requestAnimationFrame(draw)
        return
      }

      context.clearRect(0, 0, width, height)
      const delta = frameScale(timestamp, previousTimestamp)
      previousTimestamp = timestamp
      const reducedMode = motion.reducedMotion ?? 'static'
      const shouldAnimate = !prefersReducedMotion && !motion.paused
      const shouldDrawMovingParts = !prefersReducedMotion || reducedMode !== 'hidden'

      layers.forEach(layer => {
        if (layer === 'tracks') {
          tracks.forEach((track, index) => drawTrack(context, track, geometries[index], theme, random))
        }
        if (layer === 'beams' && shouldDrawMovingParts) {
          particles.forEach(particle => {
            const geometry = geometries[particle.trackIndex]
            if (shouldAnimate) updateParticle(particle, geometry, delta)
            drawBeam(context, particle, geometry, theme, timestamp)
          })
        }
        if (layer === 'centerpiece' && centerpiece) {
          drawCenterpiece(context, width, height, timestamp, centerpiece, theme)
        }
      })

      if (shouldAnimate) animationFrame = requestAnimationFrame(draw)
    }

    draw(0)
    return () => {
      cancelAnimationFrame(animationFrame)
      observer.disconnect()
    }
  }, [centerpiece, isPageVisible, layers, motion, prefersReducedMotion, seed, theme, tracks])

  const hideLabels = responsive?.hideLabelsBelow !== undefined && renderWidth < responsive.hideLabelsBelow
  const labelScale =
    responsive?.labelScaleBelow !== undefined && renderWidth < responsive.labelScaleBelow
      ? (responsive.labelScale ?? 0.8)
      : 1
  const renderLabels = layers.includes('labels') && !hideLabels

  const verticalMask =
    edgeFade &&
    `linear-gradient(to bottom, transparent 0%, black ${edgeFade.top ?? 0}%, black ${
      100 - (edgeFade.bottom ?? 0)
    }%, transparent 100%)`
  const horizontalMask =
    edgeFade &&
    `linear-gradient(to right, transparent 0%, black ${edgeFade.left ?? 0}%, black ${
      100 - (edgeFade.right ?? 0)
    }%, transparent 100%)`
  const maskImage = edgeFade ? `${verticalMask}, ${horizontalMask}` : undefined

  return (
    <div
      aria-hidden='true'
      className={className}
      style={{
        position: placementMode === 'viewport' ? 'fixed' : 'absolute',
        inset,
        zIndex,
        opacity,
        pointerEvents: 'none',
        overflow: clip ? 'hidden' : 'visible',
        mixBlendMode: blendMode ?? theme.backgroundBlendMode,
        transform: prefersReducedMotion ? 'none' : `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
        transition:
          prefersReducedMotion || !parallax
            ? 'none'
            : `transform ${Math.max(0.05, parallax.smoothing ?? 0.2)}s cubic-bezier(0.25, 1, 0.5, 1)`,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          maskImage,
          WebkitMaskImage: maskImage,
          maskComposite: edgeFade ? 'intersect' : undefined,
          WebkitMaskComposite: edgeFade ? 'source-in' : undefined,
        }}
      />

      {renderLabels &&
        tracks.flatMap((track, trackIndex) => {
          const labels: HudTrackLabel[] =
            track.labels ??
            (track.label || track.subLabel
              ? [
                  {
                    text: track.label ?? '',
                    subText: track.subLabel,
                    side: 'end',
                    position: 96,
                    color: track.labelColor,
                  },
                ]
              : [])

          return labels.map((label, labelIndex) => {
            const position = resolveLabelPoint(track, label)
            const align = label.align ?? 'center'
            const offset = label.offset ?? 0
            return (
              <div
                key={`${trackIndex}-${labelIndex}-${label.text}`}
                style={{
                  position: 'absolute',
                  ...position,
                  translate:
                    align === 'start'
                      ? `${offset}px ${offset}px`
                      : align === 'end'
                        ? `calc(-100% + ${offset}px) calc(-100% + ${offset}px)`
                        : `calc(-50% + ${offset}px) calc(-50% + ${offset}px)`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : 'center',
                  opacity: label.opacity ?? theme.labelOpacity,
                  textTransform: label.transform ?? 'uppercase',
                  whiteSpace: 'nowrap',
                }}
              >
                {label.text && (
                  <span
                    style={{
                      color: label.color ?? track.labelColor ?? track.line?.color ?? track.lineColor ?? theme.primary,
                      fontSize: (label.fontSize ?? labelFontSize) * labelScale,
                      fontFamily: label.fontFamily ?? theme.fontFamily,
                      fontWeight: 800,
                      letterSpacing: label.letterSpacing ?? '0.2em',
                      textShadow:
                        label.glow === 0
                          ? undefined
                          : `0 0 ${label.glow ?? 6}px ${
                              label.color ?? track.labelColor ?? track.lineColor ?? theme.primary
                            }`,
                    }}
                  >
                    {label.text}
                  </span>
                )}
                {label.subText && (
                  <span
                    style={{
                      color: theme.neutral,
                      opacity: 0.5,
                      fontSize: (label.subFontSize ?? subLabelFontSize) * labelScale,
                      fontFamily: label.subFontFamily ?? theme.monoFontFamily,
                      marginTop: 2,
                      letterSpacing: label.letterSpacing ?? '0.1em',
                    }}
                  >
                    {label.subText}
                  </span>
                )}
              </div>
            )
          })
        })}
    </div>
  )
}

export default HudTerminal
