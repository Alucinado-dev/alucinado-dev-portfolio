'use client'

import { useEffect } from 'react'

import { useTranslations } from 'next-intl'

import { useMediaQuery, useWindowSize } from '@uidotdev/usehooks'
import { motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react'

import { BlobBackground } from '@/components/backgrounds/Blobs'
import GrainNoise from '@/components/backgrounds/GrainNoise'
import type { HudTrack } from '@/components/backgrounds/HUDBackground'
import HudTerminal from '@/components/backgrounds/HUDBackground'
import MeshBackground from '@/components/backgrounds/MeshBackground'
import { MeteorShower } from '@/components/backgrounds/MeteorShower'
import { StarField } from '@/components/backgrounds/Starfield'

const Background = () => {
  const t = useTranslations('common.backgroundHud')
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const prefersReducedMotion = useReducedMotion()

  const { width, height } = useWindowSize()
  const isMobile = useMediaQuery('(max-width: 480px)')

  useEffect(() => {
    if (prefersReducedMotion) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY, prefersReducedMotion])

  const xNebula = useTransform(mouseX, [0, width ?? 1], [80, -80])
  const yNebula = useTransform(mouseY, [0, height ?? 1], [80, -80])

  const xStarsFar = useTransform(mouseX, [0, width ?? 1], [15, -15])
  const yStarsFar = useTransform(mouseY, [0, height ?? 1], [15, -15])

  const xStarsMedium = useTransform(mouseX, [0, width ?? 1], [45, -45])
  const yStarsMedium = useTransform(mouseY, [0, height ?? 1], [45, -45])

  const xStarsNear = useTransform(mouseX, [0, width ?? 1], [70, -70])
  const yStarsNear = useTransform(mouseY, [0, height ?? 1], [70, -70])

  const xMeteorFar = useTransform(mouseX, [0, width ?? 1], [15, -15])
  const yMeteorFar = useTransform(mouseY, [0, height ?? 1], [15, -15])

  const xMeteorMid = useTransform(mouseX, [0, width ?? 1], [30, -30])
  const yMeteorMid = useTransform(mouseY, [0, height ?? 1], [30, -30])

  const xMeteorNear = useTransform(mouseX, [0, width ?? 1], [75, -75])
  const yMeteorNear = useTransform(mouseY, [0, height ?? 1], [75, -75])

  // Visor compacto: mantém a leitura cyberpunk sem disputar espaço com o conteúdo.
  const mobileTracks: HudTrack[] = [
    {
      x: 8,
      start: 4,
      end: 96,
      fadeStart: 8,
      fadeEnd: 10,
      line: {
        color: '#00fbea',
        opacity: 0.1,
        width: 1,
        dash: [2, 9],
      },
      ticks: {
        enabled: true,
        interval: 44,
        length: 4,
        color: '#00fbea',
        opacity: 0.16,
        side: 'right',
        pattern: 'major-minor',
        majorEvery: 4,
      },
      beams: [
        {
          color: '#00fbea',
          speed: 1.9,
          length: 82,
          opacity: 0.72,
          gradient: 'head',
          glow: { blur: 9, opacity: 0.55 },
          movement: { mode: 'random', randomPause: [45, 150] },
          decoration: { type: 'packet', count: 2, shape: 'line', size: 5, spacing: 11 },
        },
      ],
    },
    {
      x: 27,
      start: 14,
      end: 88,
      fadeStart: 12,
      fadeEnd: 16,
      line: {
        color: '#dffeff',
        opacity: 0.045,
        width: 0.75,
      },
      beams: [
        {
          color: '#dffeff',
          speed: 2.8,
          length: 58,
          width: 0.75,
          opacity: 0.45,
          gradient: 'center',
          glow: { blur: 5, opacity: 0.3 },
          movement: { mode: 'random', randomPause: [100, 260] },
          delay: 120,
        },
      ],
    },
    {
      x: 50,
      start: 2,
      end: 98,
      fadeStart: 5,
      fadeEnd: 8,
      line: {
        color: '#ff00bb',
        opacity: 0.14,
        width: 1.35,
        glow: { color: '#ff00bb', blur: 5, opacity: 0.28 },
      },
      ticks: {
        enabled: true,
        interval: 52,
        length: 5,
        color: '#ff00bb',
        opacity: 0.18,
        side: 'both',
        pattern: 'major-minor',
        majorEvery: 3,
      },
      beams: [
        {
          color: '#ff00bb',
          speed: 2.5,
          length: 132,
          width: 1.8,
          opacity: 0.78,
          gradient: 'head',
          glow: { blur: 13, opacity: 0.62 },
          movement: { mode: 'ping-pong', pause: 55 },
          decoration: {
            type: 'terminal',
            radius: 1.7,
            glowRadius: 9,
            glowOpacity: 0.65,
            ring: true,
          },
        },
      ],
    },
    {
      x: 78,
      start: 10,
      end: 92,
      fadeStart: 10,
      fadeEnd: 12,
      line: {
        color: '#00fbea',
        opacity: 0.075,
        width: 1,
        dash: [1, 12],
      },
      beams: [
        {
          color: '#00fbea',
          speed: 2.1,
          length: 74,
          opacity: 0.6,
          gradient: 'head',
          glow: { blur: 8, opacity: 0.45 },
          movement: { mode: 'random', randomPause: [70, 190] },
          decoration: {
            type: 'chevrons',
            count: 2,
            size: 4,
            spacing: 9,
            strokeWidth: 0.9,
            placement: 'head',
          },
        },
      ],
    },
    {
      x: 93,
      start: 5,
      end: 95,
      fadeStart: 8,
      fadeEnd: 8,
      line: {
        color: '#ffcf40',
        opacity: 0.045,
        width: 0.75,
      },
      beams: [
        {
          color: '#ffcf40',
          speed: 3.1,
          length: 44,
          width: 1,
          opacity: 0.48,
          gradient: 'pulse',
          glow: { blur: 6, opacity: 0.35 },
          movement: { mode: 'random', randomPause: [220, 520] },
          decoration: { type: 'scanner', width: 10, thickness: 0.75, glow: 4, pulse: true },
        },
      ],
    },
  ]

  // Visor desktop: estrutura periférica, telemetria, núcleo, navegação e alerta.
  const desktopTracks: HudTrack[] = [
    {
      x: 5,
      start: 3,
      end: 97,
      fadeStart: 6,
      fadeEnd: 8,
      line: {
        color: '#00fbea',
        opacity: 0.07,
        width: 1,
      },
      ticks: {
        enabled: true,
        interval: 36,
        length: 5,
        color: '#00fbea',
        opacity: 0.13,
        side: 'right',
        pattern: 'major-minor',
        majorEvery: 5,
      },
    },
    {
      x: 11,
      start: 5,
      end: 95,
      fadeStart: 8,
      fadeEnd: 12,
      label: t('sectorOne'),
      subLabel: t('sideAxis'),
      line: {
        color: '#00fbea',
        opacity: 0.12,
        width: 1,
        dash: [2, 9],
      },
      beams: [
        {
          color: '#00fbea',
          speed: 1.9,
          length: 112,
          opacity: 0.72,
          gradient: 'head',
          glow: { blur: 10, opacity: 0.52 },
          movement: { mode: 'random', randomPause: [45, 160] },
          decoration: { type: 'packet', count: 3, shape: 'line', size: 6, spacing: 13 },
        },
      ],
    },
    {
      x: 24,
      start: 14,
      end: 89,
      fadeStart: 12,
      fadeEnd: 16,
      label: t('flow'),
      subLabel: t('bufferReady'),
      line: {
        color: '#dffeff',
        opacity: 0.045,
        width: 0.75,
      },
      beams: [
        {
          color: '#dffeff',
          speed: 2.8,
          length: 68,
          width: 0.8,
          opacity: 0.46,
          gradient: 'center',
          glow: { blur: 5, opacity: 0.28 },
          movement: { mode: 'random', randomPause: [100, 280] },
          delay: 100,
        },
      ],
    },
    {
      x: 50,
      start: 1,
      end: 99,
      fadeStart: 4,
      fadeEnd: 7,
      label: t('core'),
      subLabel: t('warning'),
      labelColor: '#ff00bb',
      line: {
        color: '#ff00bb',
        opacity: 0.17,
        width: 1.6,
        glow: { color: '#ff00bb', blur: 6, opacity: 0.32 },
      },
      ticks: {
        enabled: true,
        interval: 50,
        length: 7,
        color: '#ff00bb',
        opacity: 0.2,
        side: 'both',
        pattern: 'major-minor',
        majorEvery: 4,
      },
      beams: [
        {
          color: '#ff00bb',
          speed: 2.55,
          length: 220,
          width: 2.25,
          opacity: 0.84,
          gradient: 'head',
          glow: { blur: 15, opacity: 0.68, widthMultiplier: 1.25 },
          movement: { mode: 'ping-pong', pause: 45 },
          decoration: {
            type: 'terminal',
            radius: 2,
            coreColor: '#fff2fc',
            glowRadius: 12,
            glowOpacity: 0.72,
            ring: true,
          },
        },
        {
          color: '#ff00bb',
          speed: 3.4,
          length: 72,
          width: 0.9,
          opacity: 0.48,
          gradient: 'tail',
          glow: { blur: 7, opacity: 0.36 },
          movement: { mode: 'random', randomPause: [130, 340] },
          delay: 380,
        },
      ],
    },
    {
      x: 78,
      start: 8,
      end: 94,
      fadeStart: 10,
      fadeEnd: 12,
      label: t('indexData'),
      subLabel: t('stableSystem'),
      line: {
        color: '#00fbea',
        opacity: 0.1,
        width: 1,
        dash: [2, 11],
      },
      beams: [
        {
          color: '#00fbea',
          speed: 2.2,
          length: 138,
          opacity: 0.67,
          gradient: 'head',
          glow: { blur: 10, opacity: 0.5 },
          movement: { mode: 'random', randomPause: [70, 210] },
          decoration: {
            type: 'chevrons',
            count: 3,
            size: 4.5,
            spacing: 10,
            strokeWidth: 1,
            placement: 'head',
          },
        },
      ],
    },
    {
      x: 92,
      start: 6,
      end: 94,
      fadeStart: 8,
      fadeEnd: 10,
      label: t('trace'),
      subLabel: t('altitude'),
      labelColor: 'rgba(255, 207, 64, 0.72)',
      line: {
        color: '#ffcf40',
        opacity: 0.052,
        width: 0.8,
      },
      ticks: {
        enabled: true,
        interval: 72,
        length: 4,
        color: '#ffcf40',
        opacity: 0.12,
        side: 'left',
        pattern: 'uniform',
      },
      beams: [
        {
          color: '#ffcf40',
          speed: 3.2,
          length: 54,
          width: 1,
          opacity: 0.52,
          gradient: 'pulse',
          glow: { blur: 7, opacity: 0.4 },
          movement: { mode: 'random', randomPause: [240, 560] },
          decoration: { type: 'scanner', width: 14, thickness: 0.8, glow: 5, pulse: true },
        },
      ],
    },
  ]

  return (
    <>
      <MeshBackground
        fixed
        background='#010205'
        points={[
          { color: '#071030', x: 20, y: 20, spread: 40, opacity: 0.6 },
          { color: '#05031a', x: 80, y: 80, spread: 50, opacity: 0.8 },
          { color: '#001a33', x: 50, y: 50, spread: 30, opacity: 0.4 },
        ]}
      />
      <GrainNoise opacity={0.06} density={0.15} zIndex={10} fixed />

      <HudTerminal
        fixed
        zIndex={6}
        seed='portfolio-helmet-hud-v1'
        preset='cyberpunk'
        opacity={0.92}
        theme={{
          primary: '#00fbea',
          secondary: '#dffeff',
          accent: '#ff00bb',
          warning: '#ffcf40',
          neutral: '#dffeff',
          trackOpacity: 1,
          beamOpacity: 1,
          labelOpacity: 0.66,
          glowIntensity: 0.82,
          lineWidth: 1,
          backgroundBlendMode: 'screen',
        }}
        centerpiece={
          isMobile
            ? false
            : {
                type: 'brackets',
                width: 190,
                height: 122,
                cornerSize: 15,
                color: '#00fbea',
                opacity: 0.2,
                lineWidth: 1,
                crosshair: {
                  color: '#ff00bb',
                  opacity: 0.24,
                  size: 17,
                  gap: 6,
                },
              }
        }
        parallax={{
          strengthX: isMobile ? 4 : 10,
          strengthY: isMobile ? 3 : 7,
          smoothing: 0.14,
        }}
        motion={{
          speedMultiplier: 0.82,
          reducedMotion: 'simplified',
        }}
        edgeFade={{ top: 3, right: 2, bottom: 5, left: 2 }}
        responsive={{
          hideLabelsBelow: 640,
          labelScaleBelow: 900,
          labelScale: 0.82,
        }}
        tracks={isMobile ? mobileTracks : desktopTracks}
        labelFontSize={8}
        subLabelFontSize={5}
        labelFontFamily='var(--font-space-grotesk)'
        subLabelFontFamily='var(--font-syne-mono)'
      />

      <motion.div
        style={prefersReducedMotion ? undefined : { x: xNebula, y: yNebula }}
        className='fixed -inset-64 mix-blend-screen'
      >
        <BlobBackground
          fixed
          zIndex={1}
          blobs={[
            { color: '#38bdf8', width: 800, x: '60%', y: '30%', blur: 180, opacity: 0.08, shape: 'organic' }, // Ciano
            { color: '#a855f7', width: 900, x: '20%', y: '70%', blur: 180, opacity: 0.06, shape: 'organic' }, // Roxo
            { color: '#818cf8', width: 600, x: '40%', y: '50%', blur: 150, opacity: 0.05, shape: 'circle' }, // Indigo
          ]}
        />
      </motion.div>
      <motion.div
        style={prefersReducedMotion ? undefined : { x: xStarsFar, y: yStarsFar }}
        className='pointer-events-none fixed inset-0'
      >
        <StarField
          fixed
          zIndex={2}
          count={400}
          minRadius={0.1}
          maxRadius={0.4}
          minOpacity={0.1}
          maxOpacity={0.4}
          twinkleIntensity={0.3}
          twinkle
        />
      </motion.div>

      <motion.div
        style={prefersReducedMotion ? undefined : { x: xStarsMedium, y: yStarsMedium }}
        className='pointer-events-none fixed inset-0'
      >
        <StarField
          fixed
          zIndex={3}
          count={100}
          minRadius={0.5}
          maxRadius={1.0}
          minOpacity={0.3}
          maxOpacity={0.7}
          twinkleIntensity={0.6}
          twinkle
        />
      </motion.div>

      <motion.div
        style={prefersReducedMotion ? undefined : { x: xStarsNear, y: yStarsNear }}
        className='pointer-events-none fixed inset-0'
      >
        <StarField
          fixed
          zIndex={4}
          count={30}
          minRadius={1.2}
          maxRadius={2.0}
          minOpacity={0.6}
          maxOpacity={1}
          twinkleIntensity={0.8}
          twinkle
        />
      </motion.div>
      <motion.div
        style={prefersReducedMotion ? undefined : { x: xMeteorFar, y: yMeteorFar }}
        className='pointer-events-none fixed -inset-96'
      >
        <MeteorShower
          fixed
          zIndex={3}
          count={20}
          angle={35}
          speed={isMobile ? 3 : 7}
          minLength={100}
          maxLength={200}
          minWidth={0.5}
          maxWidth={1.5}
          opacity={0.6}
          color='rgba(186, 230, 253, 0.8)'
        />
      </motion.div>

      <motion.div
        style={prefersReducedMotion ? undefined : { x: xMeteorMid, y: yMeteorMid }}
        className='pointer-events-none fixed -inset-96'
      >
        <MeteorShower
          fixed
          zIndex={4}
          count={5}
          angle={35}
          speed={isMobile ? 5 : 9}
          minLength={150}
          maxLength={300}
          minWidth={1.5}
          maxWidth={2.5}
          opacity={0.7}
          color='rgba(200,230,255,0.85)'
        />
      </motion.div>

      <motion.div
        style={prefersReducedMotion ? undefined : { x: xMeteorNear, y: yMeteorNear }}
        className='pointer-events-none fixed -inset-96'
      >
        <MeteorShower
          fixed
          zIndex={5}
          count={2}
          angle={30}
          speed={isMobile ? 7 : 12}
          minLength={200}
          maxLength={400}
          minWidth={1.8}
          maxWidth={3}
          opacity={0.9}
          color='rgba(255,255,255,0.95)'
        />
      </motion.div>
    </>
  )
}

export default Background
