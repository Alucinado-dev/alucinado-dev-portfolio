'use client'

import { useState } from 'react'

import { useTranslations } from 'next-intl'

import { Icon } from '@iconify/react'
import { motion } from 'motion/react'

import MeshBackground from '@/components/backgrounds/MeshBackground'
import Container from '@/components/container/Container'
import { techList } from '@/lib/data/TechData'

type TechAccent = 'cyan' | 'purple' | 'pink'

const stackTechs: { key: string; accent: TechAccent }[] = [
  { key: 'react', accent: 'cyan' },
  { key: 'nextjs', accent: 'cyan' },
  { key: 'typescript', accent: 'cyan' },
  { key: 'tailwind', accent: 'cyan' },
  { key: 'zustand', accent: 'cyan' },
  { key: 'motion', accent: 'pink' },
  { key: 'html', accent: 'purple' },
  { key: 'css', accent: 'purple' },
  { key: 'javascript', accent: 'purple' },
  { key: 'vite', accent: 'purple' },
  { key: 'zod', accent: 'pink' },
  { key: 'posthog', accent: 'pink' },
]

const accents: Record<TechAccent, { selected: string; corner: string; icon: string }> = {
  cyan: {
    selected: 'border-cyan-bright/45 bg-cyan-bright/8 shadow-[0_18px_36px_-28px_rgba(0,0,0,0.98)]',
    corner: 'border-cyan-bright/70',
    icon: 'text-cyan-200',
  },
  purple: {
    selected: 'border-plasma-purple/50 bg-plasma-purple/9 shadow-[0_18px_36px_-28px_rgba(0,0,0,0.98)]',
    corner: 'border-plasma-purple/75',
    icon: 'text-purple-200',
  },
  pink: {
    selected: 'border-pink-neon/40 bg-pink-neon/7 shadow-[0_18px_36px_-28px_rgba(0,0,0,0.98)]',
    corner: 'border-pink-neon/65',
    icon: 'text-pink-200',
  },
}

const stackMesh = [
  { color: '#0e7490', x: 2, y: 94, spread: 42, opacity: 0.11 },
  { color: '#312e81', x: 94, y: 4, spread: 44, opacity: 0.14 },
]

const detailMesh = [
  { color: '#4338ca', x: 90, y: 5, spread: 62, opacity: 0.16 },
  { color: '#0f766e', x: 8, y: 92, spread: 54, opacity: 0.08 },
]

export default function StackSection() {
  const t = useTranslations('pages.home.stack')
  const technologies = useTranslations('content.technologies')
  const [selectedTechKey, setSelectedTechKey] = useState('react')
  const selectedTech = techList[selectedTechKey]

  return (
    <section
      id='stack'
      aria-label={t('accessibility.sectionLabel')}
      className='relative z-10 w-full scroll-mt-20 py-12 md:py-16'
    >
      <Container className='relative overflow-hidden border border-white/10 bg-[#050b18]/88 p-6 shadow-[0_36px_90px_-48px_rgba(0,0,0,0.96)] backdrop-blur-xl md:p-10'>
        <MeshBackground points={stackMesh} background='transparent' className='opacity-80' />

        <div className='relative z-10'>
          <header className='mb-10 max-w-3xl space-y-3'>
            <div className='font-syne-mono text-cyan-bright/75 flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase'>
              <Icon icon='lucide:blocks' className='h-4 w-4' aria-hidden='true' />
              {t('eyebrow')}
            </div>
            <h2 className='font-zen-dots text-2xl font-normal tracking-tight text-slate-50 md:text-3xl'>
              {t('title')}
            </h2>
            <p className='font-outfit text-sm leading-6 font-light text-slate-300/70 md:text-base md:leading-7'>
              {t('description')}
            </p>
          </header>

          <div className='grid gap-6 lg:grid-cols-[1fr_0.72fr] lg:items-stretch'>
            <div className='grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4'>
              {stackTechs.map(({ key, accent }) => {
                const tech = techList[key]
                const isSelected = selectedTechKey === key
                const color = accents[accent]

                return (
                  <button
                    key={key}
                    type='button'
                    aria-pressed={isSelected}
                    aria-controls='stack-tech-details'
                    aria-label={t('accessibility.selectTechnology', { technology: tech.name })}
                    onClick={() => setSelectedTechKey(key)}
                    className={`group focus-visible:ring-cyan-bright/60 relative flex min-h-28 flex-col items-center justify-center border p-4 transition-all duration-250 outline-none focus-visible:ring-2 ${
                      isSelected
                        ? color.selected
                        : 'border-white/8 bg-[#081120]/72 hover:-translate-y-0.5 hover:border-white/16 hover:bg-[#0b1729]'
                    }`}
                  >
                    <span
                      className={`absolute top-0 left-0 h-3 w-3 border-t border-l transition-opacity ${color.corner} ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`}
                      aria-hidden='true'
                    />
                    <span
                      className={`absolute right-0 bottom-0 h-3 w-3 border-r border-b transition-opacity ${color.corner} ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`}
                      aria-hidden='true'
                    />

                    <Icon
                      icon={tech.icon}
                      className={`h-8 w-8 transition-all duration-250 ${key === 'motion' ? 'invert' : ''} ${isSelected ? `${color.icon} scale-105 opacity-100` : 'text-slate-500 opacity-70 grayscale-[55%] group-hover:text-slate-200 group-hover:opacity-100 group-hover:grayscale-0'}`}
                      aria-hidden='true'
                    />
                    <span
                      className={`font-space-grotesk mt-3 text-center text-xs font-medium ${isSelected ? 'text-slate-100' : 'text-slate-400'}`}
                    >
                      {tech.name}
                    </span>
                  </button>
                )
              })}
            </div>

            <div
              id='stack-tech-details'
              role='region'
              aria-label={t('accessibility.detailsRegion')}
              aria-live='polite'
              className='border-plasma-purple/25 relative min-h-64 overflow-hidden border bg-[#080d20]/92 p-6 shadow-[0_28px_65px_-42px_rgba(0,0,0,0.96)]'
            >
              <MeshBackground points={detailMesh} background='transparent' className='opacity-85' />
              <div className='from-cyan-bright/40 via-plasma-purple/30 pointer-events-none absolute bottom-0 left-0 h-px w-full bg-linear-to-r to-transparent' />

              <motion.div
                key={selectedTechKey}
                initial={{ opacity: 0.35, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className='relative z-10 flex h-full flex-col'
              >
                <div className='font-syne-mono mb-8 text-[9px] tracking-[0.16em] text-slate-500 uppercase'>
                  {t('selectedLabel')}
                </div>

                <div className='mb-5 flex items-center gap-4'>
                  <div className='flex h-14 w-14 items-center justify-center border border-white/10 bg-white/5'>
                    <Icon icon={selectedTech.icon} className='h-8 w-8 text-slate-100' aria-hidden='true' />
                  </div>
                  <h3 className='font-asimovian text-2xl font-normal text-slate-50'>{selectedTech.name}</h3>
                </div>

                <p className='font-outfit text-sm leading-7 font-light text-slate-300/78 md:text-base'>
                  {technologies(selectedTech.key)}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
