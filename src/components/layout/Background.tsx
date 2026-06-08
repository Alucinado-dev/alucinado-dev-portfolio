'use client'

import { useEffect } from 'react'

import { useMediaQuery, useWindowSize } from '@uidotdev/usehooks'
import { motion, useMotionValue, useTransform } from 'motion/react'

import { BlobBackground } from '@/components/backgrounds/Blobs'
import GrainNoise from '@/components/backgrounds/GrainNoise'
import type { HudTrack } from '@/components/backgrounds/HUDBackground'
import HudTerminal from '@/components/backgrounds/HUDBackground'
import MeshBackground from '@/components/backgrounds/MeshBackground'
import { MeteorShower } from '@/components/backgrounds/MeteorShower'
import { StarField } from '@/components/backgrounds/Starfield'

const Background = () => {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const { width, height } = useWindowSize()
  const isMobile = useMediaQuery('(max-width: 480px)')

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

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

  // Definição dos Trilhos Mobile (Simétricos, limpos e sem poluição visual)
  const mobileTracks: HudTrack[] = [
    {
      x: 15,
      label: '// M_01',
      subLabel: '0x15',
      lineColor: 'rgba(0, 251, 234, 0.1)',
      dashed: true,
      beams: [{ color: '#00fbea', speed: 1.8, height: 80, decoration: 'dot' }],
    },
    {
      x: 30,
      label: '// STRE_04',
      subLabel: 'BUFF_OK',
      lineColor: 'rgba(255, 255, 255, 0.04)',
      beams: [{ color: '#ffffff', speed: 7.5, height: 90, width: 1, delay: 100 }],
    },
    {
      x: 50,
      label: '// M_CTR',
      subLabel: 'SYS_MID',
      lineColor: 'rgba(255, 0, 187, 0.12)',
      labelColor: '#ff00bb',
      lineWidth: 1.5,
      beams: [{ color: '#ff00bb', speed: 3.0, height: 140, decoration: 'none' }],
    },
    {
      x: 70,
      label: '// M_02',
      subLabel: '0x85',
      lineColor: 'rgba(0, 251, 234, 0.1)',
      dashed: true,
      beams: [{ color: '#00fbea', speed: 2.2, height: 80, decoration: 'chevron' }],
    },
    {
      x: 85,
      label: '// TRAC_90',
      subLabel: 'ALT_982m',
      lineColor: 'rgba(255, 234, 0, 0.08)',
      labelColor: 'rgba(255, 234, 0, 0.7)',
      beams: [{ color: '#ffea00', speed: 13, height: 400, width: 1 }],
    },
  ]

  // Definição dos Trilhos Originais do seu Desktop
  const desktopTracks: HudTrack[] = [
    {
      x: 6,
      lineColor: 'rgba(0, 251, 234, 0.08)',
    },
    {
      x: 10,
      label: '// SEC_01',
      subLabel: 'LAT_0x94B',
      lineColor: 'rgba(0, 251, 234, 0.15)',
      dashed: true,
      beams: [{ color: '#00fbea', speed: 2.2, height: 120, decoration: 'circuit' }],
    },
    {
      x: 22,
      label: '// STRE_04',
      subLabel: 'BUFF_OK',
      lineColor: 'rgba(255, 255, 255, 0.04)',
      beams: [{ color: '#ffffff', speed: 7.5, height: 90, width: 1, delay: 100 }],
    },
    {
      x: 50,
      label: '// CORE_OVERRIDE',
      subLabel: 'WARN_LEVEL_02',
      lineColor: 'rgba(255, 0, 187, 0.2)',
      labelColor: '#ff00bb',
      lineWidth: 2,
      beams: [
        { color: '#ff00bb', speed: 3.8, height: 260, width: 2.5, decoration: 'dot' },
        { color: '#ff00bb', speed: 5.5, height: 110, width: 1, delay: 400 },
      ],
    },
    {
      x: 78,
      label: '// INDEX_DATA',
      subLabel: 'SYS_STABLE',
      lineColor: 'rgba(0, 251, 234, 0.12)',
      dashed: true,
      beams: [{ color: '#00fbea', speed: 3.2, height: 180, decoration: 'chevron' }],
    },
    {
      x: 92,
      label: '// TRAC_90',
      subLabel: 'ALT_982m',
      lineColor: 'rgba(255, 234, 0, 0.08)',
      labelColor: 'rgba(255, 234, 0, 0.7)',
      beams: [{ color: '#ffea00', speed: 13, height: 400, width: 1 }],
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
        opacity={0.95}
        showCenterBracket={!isMobile}
        tracks={isMobile ? mobileTracks : desktopTracks}
        labelFontSize={isMobile ? 5 : 8}
        subLabelFontSize={isMobile ? 3 : 5}
        labelFontFamily='var(--font-space-grotesk), monospace'
        subLabelFontFamily='var(--font-syne-mono), monospace'
      />

      <motion.div style={{ x: xNebula, y: yNebula }} className='fixed -inset-64 mix-blend-screen'>
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
      <motion.div style={{ x: xStarsFar, y: yStarsFar }} className='pointer-events-none fixed inset-0'>
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

      <motion.div style={{ x: xStarsMedium, y: yStarsMedium }} className='pointer-events-none fixed inset-0'>
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

      <motion.div style={{ x: xStarsNear, y: yStarsNear }} className='pointer-events-none fixed inset-0'>
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
      <motion.div style={{ x: xMeteorFar, y: yMeteorFar }} className='pointer-events-none fixed -inset-96'>
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

      <motion.div style={{ x: xMeteorMid, y: yMeteorMid }} className='pointer-events-none fixed -inset-96'>
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

      <motion.div style={{ x: xMeteorNear, y: yMeteorNear }} className='pointer-events-none fixed -inset-96'>
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
