'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'

import { Icon } from '@iconify/react'
import { motion } from 'motion/react'

import MeshBackground from '@/components/backgrounds/MeshBackground'
import { ProjectButton } from '@/components/external/GlowingButton'
import { AnimatedSpan, Terminal, TypingAnimation } from '@/components/external/Terminal'
import { siteLinks } from '@/lib/data/SiteData'

type ProofPoint = {
  icon: string
  label: string
}

const heroPanelMesh = [
  { color: '#0e7490', x: 4, y: 12, spread: 38, opacity: 0.13 },
  { color: '#312e81', x: 92, y: 88, spread: 44, opacity: 0.12 },
]

export default function HeroSection() {
  const t = useTranslations('pages.home.hero')
  const actions = useTranslations('common.actions')
  const accessibility = useTranslations('common.accessibility')
  const proofPoints = t.raw('proofPoints') as ProofPoint[]
  const opportunityTypes = t.raw('opportunityTypes') as string[]

  const fadeUpVariant = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } as const },
  }

  return (
    <section
      id='inicio'
      aria-label={t('accessibility.sectionLabel')}
      className='relative flex w-full scroll-mt-20 items-center justify-center overflow-hidden px-4 py-6 sm:px-6 sm:py-8 md:py-10'
    >
      <div className='relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-7 lg:grid-cols-[minmax(0,1.16fr)_minmax(22rem,0.84fr)] lg:gap-8 xl:gap-10'>
        <motion.div
          className='relative flex min-w-0 flex-col justify-center overflow-hidden border border-white/11 bg-[#030817]/10 p-6 text-left shadow-[0_28px_70px_-38px_rgba(0,0,0,0.96)] backdrop-blur-xs sm:p-8'
          initial='hidden'
          animate='visible'
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <MeshBackground points={heroPanelMesh} background='transparent' className='opacity-80' />
          <div className='bg-cyan-bright/50 absolute top-0 left-0 h-14 w-px' />
          <div className='bg-cyan-bright/50 absolute top-0 left-0 h-px w-14' />
          <div className='bg-plasma-purple/40 absolute right-0 bottom-0 h-14 w-px' />
          <div className='bg-plasma-purple/40 absolute right-0 bottom-0 h-px w-14' />

          <div className='relative z-10 space-y-6'>
            <motion.div variants={fadeUpVariant} className='flex flex-wrap items-center gap-2 sm:flex-nowrap'>
              <div className='font-rajdhani flex items-center gap-2 border border-emerald-400/25 bg-emerald-400/9 px-2.5 py-1.5 text-[10px] font-semibold tracking-[0.11em] whitespace-nowrap text-emerald-300 uppercase sm:text-[11px]'>
                <span className='relative flex h-2 w-2' aria-hidden='true'>
                  <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60' />
                  <span className='relative inline-flex h-2 w-2 rounded-full bg-emerald-400' />
                </span>
                {t('availability')}
              </div>

              {opportunityTypes.map(type => (
                <span
                  key={type}
                  className='font-syne-mono border border-white/10 bg-black/30 px-2.5 py-1 text-[9px] tracking-[0.13em] whitespace-nowrap text-slate-300/80 sm:text-[10px]'
                >
                  {type}
                </span>
              ))}
            </motion.div>

            <div className='space-y-3'>
              <motion.div
                variants={fadeUpVariant}
                className='font-syne-mono text-cyan-bright/70 flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase'
              >
                <Icon icon='lucide:user-round' className='h-3.5 w-3.5' aria-hidden='true' />
                {t('professionalLabel')}
              </motion.div>

              <motion.h1
                variants={fadeUpVariant}
                className='font-exo-2 text-4xl leading-[0.95] font-extrabold tracking-[-0.035em] text-slate-50 uppercase sm:text-5xl md:text-6xl'
              >
                {t('name')}
              </motion.h1>

              <motion.h2
                variants={fadeUpVariant}
                className='font-space-grotesk flex items-center gap-2.5 text-lg font-medium tracking-tight text-slate-300 sm:text-xl md:text-2xl'
              >
                <Icon icon='lucide:code-2' className='text-pink-neon/80 h-5 w-5' aria-hidden='true' />
                {t('role')}
              </motion.h2>
            </div>

            <motion.p
              variants={fadeUpVariant}
              className='font-outfit border-cyan-bright/25 max-w-2xl border-l-2 pl-4 text-base leading-7 font-light text-slate-300/85 md:text-lg md:leading-8'
            >
              {t('description')}
            </motion.p>

            <motion.ul
              variants={fadeUpVariant}
              className='grid gap-2 sm:grid-cols-3'
              aria-label={t('accessibility.sectionLabel')}
            >
              {proofPoints.map(point => (
                <li
                  key={point.label}
                  className='flex items-center gap-2 border border-white/7 bg-white/3 px-3 py-2.5 text-xs text-slate-300'
                >
                  <Icon icon={point.icon} className='text-tech-teal h-4 w-4 shrink-0' aria-hidden='true' />
                  <span className='font-rajdhani font-medium'>{point.label}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUpVariant} className='flex flex-wrap gap-3 pt-1'>
              <ProjectButton href={siteLinks.projects}>{actions('viewProjects')}</ProjectButton>

              <Link
                href={siteLinks.cv}
                download='Lucino_Campos_CV.pdf'
                aria-label={accessibility('downloadCv')}
                className='group font-space-grotesk hover:border-pink-neon/30 hover:bg-pink-neon/6 flex items-center justify-center gap-2.5 border border-white/12 bg-white/4 px-6 py-3.5 text-xs font-semibold tracking-[0.08em] text-slate-300 uppercase transition-colors hover:text-slate-50'
              >
                {actions('downloadCv')}
                <Icon
                  icon='lucide:download'
                  className='group-hover:text-pink-neon h-4 w-4 text-slate-500 transition-transform group-hover:translate-y-0.5'
                  aria-hidden='true'
                />
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <div className='flex w-full items-center justify-center lg:-translate-y-2 lg:justify-end'>
          <h3 className='sr-only'>{accessibility('terminalLog')}</h3>
          <Terminal className='min-h-92 max-w-lg'>
            <TypingAnimation icon='lucide:chevron-right' iconClass='text-cyan-500' className='font-bold text-cyan-300'>
              {t('terminal.command')}
            </TypingAnimation>
            <TypingAnimation icon='lucide:user-search' iconClass='text-slate-500' postDelay={700}>
              {t('terminal.loadingProfile')}
            </TypingAnimation>
            <TypingAnimation icon='lucide:activity' iconClass='text-cyan-400' postDelay={750}>
              {t('terminal.telemetry')}
            </TypingAnimation>
            <TypingAnimation icon='lucide:sparkles' iconClass='text-purple-400' postDelay={500}>
              {t('terminal.background')}
            </TypingAnimation>
            <TypingAnimation icon='lucide:badge-check' iconClass='text-emerald-400' postDelay={550}>
              {t('terminal.integrity')}
            </TypingAnimation>
            <TypingAnimation icon='lucide:server-cog' iconClass='text-emerald-400' postDelay={550}>
              {t('terminal.environment')}
            </TypingAnimation>
            <TypingAnimation icon='lucide:boxes' iconClass='text-cyan-400' postDelay={750} className='text-slate-300'>
              {t('terminal.coreStack')}
            </TypingAnimation>
            <TypingAnimation icon='lucide:route' iconClass='text-amber-400' postDelay={650} className='text-amber-200'>
              {t('terminal.workflow')}
            </TypingAnimation>
            <AnimatedSpan postDelay={900} className='flex min-h-6 items-center gap-2 pl-6 text-slate-400'>
              <Icon icon='lucide:crosshair' className='h-3.5 w-3.5 shrink-0 text-cyan-500' aria-hidden='true' />
              <span>{t('terminal.priorities')}</span>
            </AnimatedSpan>
            <TypingAnimation icon='eos-icons:loading' iconClass='text-slate-500' postDelay={500}>
              {t('terminal.synchronizing')}
            </TypingAnimation>
            <TypingAnimation
              icon='lucide:shield-check'
              iconClass='text-cyan-400'
              postDelay={900}
              className='font-bold text-slate-100'
            >
              {t('terminal.success')}
            </TypingAnimation>
          </Terminal>
        </div>
      </div>
    </section>
  )
}
