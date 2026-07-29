const MAX_CANVAS_DPR = 2
const REFERENCE_FRAME_MS = 1000 / 60

export type RandomSeed = number | string

export const createRandom = (seed?: RandomSeed): (() => number) => {
  if (seed === undefined) return Math.random

  let state =
    typeof seed === 'number'
      ? seed >>> 0
      : Array.from(seed).reduce(
          (hash, character) => Math.imul(hash ^ character.charCodeAt(0), 16777619),
          2166136261,
        ) >>> 0

  return () => {
    state += 0x6d2b79f5
    let value = state
    value = Math.imul(value ^ (value >>> 15), value | 1)
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61)
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

export const resizeCanvas = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
): void => {
  const dpr = Math.min(window.devicePixelRatio || 1, MAX_CANVAS_DPR)

  canvas.width = Math.max(1, Math.round(width * dpr))
  canvas.height = Math.max(1, Math.round(height * dpr))
  context.setTransform(dpr, 0, 0, dpr, 0, 0)
}

export const frameScale = (timestamp: number, previousTimestamp: number): number => {
  if (previousTimestamp === 0) return 1

  const elapsed = Math.min(timestamp - previousTimestamp, 50)
  return elapsed / REFERENCE_FRAME_MS
}

export const cssColorToRgb = (context: CanvasRenderingContext2D, color: string): string | null => {
  context.fillStyle = '#010203'
  context.fillStyle = color

  const hexMatch = context.fillStyle.match(/^#([\da-f]{6})$/i)
  if (hexMatch) {
    const value = Number.parseInt(hexMatch[1], 16)
    return `${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255}`
  }

  const rgbMatch = context.fillStyle.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i)
  if (!rgbMatch) return null

  return `${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}`
}
