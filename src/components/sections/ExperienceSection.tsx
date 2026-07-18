'use client'

import { useRef } from 'react'

import { useTranslations } from 'next-intl'

import { Icon } from '@iconify/react'
import { motion, useScroll, useSpring } from 'motion/react'

import MeshBackground from '@/components/backgrounds/MeshBackground'
import Container from '@/components/container/Container'

type TimelineItem = {
  key: 'floathouse' | 'zaffiro' | 'transition' | 'education'
  icon: string
  accent: string
  node: string
  hasHighlights: boolean
}

const timelineItems: TimelineItem[] = [
  {
    key: 'floathouse',
    icon: 'lucide:briefcase-business',
    accent: 'border-l-tech-teal/75',
    node: 'border-tech-teal/50 bg-tech-teal/10 text-tech-teal',
    hasHighlights: true,
  },
  {
    key: 'zaffiro',
    icon: 'lucide:users-round',
    accent: 'border-l-plasma-purple/75',
    node: 'border-plasma-purple/50 bg-plasma-purple/10 text-purple-300',
    hasHighlights: true,
  },
  {
    key: 'transition',
    icon: 'lucide:code-2',
    accent: 'border-l-pink-neon/60',
    node: 'border-pink-neon/40 bg-pink-neon/8 text-pink-300',
    hasHighlights: false,
  },
  {
    key: 'education',
    icon: 'lucide:graduation-cap',
    accent: 'border-l-cyber-orange/65',
    node: 'border-cyber-orange/45 bg-cyber-orange/8 text-orange-300',
    hasHighlights: false,
  },
]

const experienceMesh = [
  { color: '#4c1d95', x: 100, y: 0, spread: 40, opacity: 0.1 },
  { color: '#0f766e', x: 0, y: 34, spread: 38, opacity: 0.09 },
  { color: '#9a3412', x: 88, y: 100, spread: 36, opacity: 0.055 },
]

export default function ExperienceSection() {
  const t = useTranslations('pages.home.experience')
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start center', 'end center'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <section
      id='experience'
      aria-label={t('accessibility.sectionLabel')}
      className='relative w-full scroll-mt-20 py-12 md:py-16'
    >
      <Container className='relative z-10 overflow-hidden border border-white/11 bg-[#050a16]/91 p-5 shadow-[0_38px_96px_-50px_rgba(0,0,0,0.97)] backdrop-blur-xl sm:p-8 md:p-12'>
        <MeshBackground points={experienceMesh} background='transparent' className='opacity-80' />

        <header className='relative z-10 mb-14 max-w-3xl space-y-3 md:mb-16'>
          <div className='font-syne-mono text-plasma-purple flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase'>
            <Icon icon='lucide:route' className='h-4 w-4' aria-hidden='true' />
            {t('eyebrow')}
          </div>
          <h2 className='font-space-grotesk text-2xl font-bold tracking-tight text-slate-50 md:text-3xl'>
            {t('title')}
          </h2>
          <p className='font-outfit text-sm leading-6 font-light text-slate-300/70 md:text-base md:leading-7'>
            {t('description')}
          </p>
        </header>

        <div ref={containerRef} className='relative z-10 mx-auto w-full max-w-5xl'>
          <div className='absolute top-6 bottom-6 left-2 w-px bg-white/12' aria-hidden='true'>
            <motion.div style={{ scaleY }} className='bg-cyan-bright/85 h-full w-full origin-top' />
          </div>

          <div className='space-y-7 md:space-y-9'>
            {timelineItems.map((item, index) => {
              const highlights = item.hasHighlights ? (t.raw(`items.${item.key}.highlights`) as string[]) : []
              const periodEnd = t(`items.${item.key}.periodEnd`)

              return (
                <motion.article
                  key={item.key}
                  className='relative pl-[76px]'
                  initial={{ x: 22, y: 10 }}
                  whileInView={{ x: 0, y: 0 }}
                  viewport={{ once: true, amount: 0.22 }}
                  transition={{ duration: 0.5, delay: index * 0.035, ease: 'easeOut' }}
                >
                  <span className='absolute top-[29px] left-2 h-px w-4 bg-white/15' aria-hidden='true' />
                  <div
                    className={`absolute top-3 left-6 z-20 flex h-9 w-9 items-center justify-center rounded-full border shadow-[0_0_0_6px_#050a16] ${item.node}`}
                    aria-hidden='true'
                  >
                    <Icon icon={item.icon} className='h-4 w-4' />
                  </div>

                  <div
                    className={`border border-l-2 border-white/9 bg-[#091221]/92 p-5 shadow-[0_24px_65px_-42px_rgba(0,0,0,0.95)] transition-colors hover:border-white/14 hover:bg-[#0b1728] md:p-6 ${item.accent}`}
                  >
                    <div className='font-syne-mono mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-[9px] tracking-[0.14em] uppercase'>
                      <span className='flex items-center gap-1.5 font-semibold text-slate-300'>
                        <Icon icon='lucide:calendar-days' className='h-3 w-3 text-slate-500' aria-hidden='true' />
                        {t(`items.${item.key}.periodStart`)}
                      </span>
                      {periodEnd && (
                        <>
                          <span className='text-slate-700' aria-hidden='true'>
                            /
                          </span>
                          <span className='text-slate-500'>{periodEnd}</span>
                        </>
                      )}
                    </div>
                    <div className='mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between'>
                      <div>
                        <h3 className='font-space-grotesk text-base font-bold text-slate-100 md:text-lg'>
                          {t(`items.${item.key}.title`)}
                        </h3>
                        <p className='font-outfit mt-1 text-sm text-slate-400'>{t(`items.${item.key}.organization`)}</p>
                      </div>
                      <span className='font-syne-mono flex items-center gap-1.5 text-[9px] tracking-[0.12em] text-slate-500 uppercase'>
                        <Icon icon='lucide:map-pin' className='h-3 w-3' aria-hidden='true' />
                        {t(`items.${item.key}.location`)}
                      </span>
                    </div>

                    {highlights.length > 0 ? (
                      <ul className='font-outfit space-y-3 text-sm leading-6 font-light text-slate-300/75'>
                        {highlights.map(highlight => (
                          <li key={highlight} className='flex gap-3'>
                            <Icon
                              icon='lucide:check'
                              className='text-tech-teal/75 mt-1.5 h-3.5 w-3.5 shrink-0'
                              aria-hidden='true'
                            />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className='font-outfit text-sm leading-6 font-light text-slate-300/75'>
                        {t(`items.${item.key}.description`)}
                      </p>
                    )}
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}
