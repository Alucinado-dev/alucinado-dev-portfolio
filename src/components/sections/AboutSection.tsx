'use client'

import { useTranslations } from 'next-intl'

import { Icon } from '@iconify/react'
import { motion } from 'motion/react'

import MeshBackground from '@/components/backgrounds/MeshBackground'
import Container from '@/components/container/Container'

const aboutMesh = [
  { color: '#0f766e', x: 0, y: 48, spread: 36, opacity: 0.1 },
  { color: '#4c1d95', x: 100, y: 18, spread: 34, opacity: 0.09 },
]

const evidenceCards = [
  {
    key: 'freelance',
    icon: 'lucide:briefcase-business',
    accent: 'border-l-cyan-bright/70',
    iconStyle: 'border-cyan-bright/20 bg-cyan-bright/8 text-cyan-bright',
  },
  {
    key: 'leadership',
    icon: 'lucide:users-round',
    accent: 'border-l-plasma-purple/70',
    iconStyle: 'border-plasma-purple/25 bg-plasma-purple/8 text-purple-300',
  },
  {
    key: 'communication',
    icon: 'lucide:languages',
    accent: 'border-l-pink-neon/60',
    iconStyle: 'border-pink-neon/20 bg-pink-neon/7 text-pink-300',
  },
] as const

export default function AboutSection() {
  const t = useTranslations('pages.home.about')

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
  }

  const itemVariants = {
    hidden: { y: 14 },
    visible: { y: 0, transition: { duration: 0.45, ease: 'easeOut' } as const },
  }

  return (
    <section
      id='sobre'
      aria-label={t('accessibility.sectionLabel')}
      className='relative z-10 w-full scroll-mt-20 bg-transparent py-10 md:py-14'
    >
      <Container className='relative overflow-hidden border border-white/9 bg-[#040914]/92 py-12 shadow-[0_35px_90px_-45px_rgba(0,0,0,0.95)] backdrop-blur-xl md:py-16'>
        <MeshBackground points={aboutMesh} background='transparent' className='opacity-75' />
        <div className='bg-tech-teal/35 absolute top-0 left-0 h-12 w-px' />
        <div className='bg-tech-teal/35 absolute top-0 left-0 h-px w-12' />
        <div className='bg-plasma-purple/30 absolute right-0 bottom-0 h-12 w-px' />
        <div className='bg-plasma-purple/30 absolute right-0 bottom-0 h-px w-12' />

        <motion.div
          className='relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:gap-16'
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true, margin: '-90px' }}
        >
          <div className='flex flex-col justify-center lg:col-span-7'>
            <motion.div variants={itemVariants} className='mb-7 space-y-3'>
              <div className='font-syne-mono text-tech-teal flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase'>
                <Icon icon='lucide:user-round-search' className='h-4 w-4' aria-hidden='true' />
                {t('eyebrow')}
              </div>
              <h2 className='font-space-grotesk max-w-2xl text-2xl leading-tight font-bold tracking-tight text-slate-50 md:text-3xl'>
                {t('title')}
              </h2>
            </motion.div>

            <div className='font-outfit space-y-5 text-[15px] leading-7 font-light text-slate-300/80 md:text-base md:leading-8'>
              <motion.p variants={itemVariants}>{t('paragraphs.commercial')}</motion.p>
              <motion.p variants={itemVariants}>{t('paragraphs.profile')}</motion.p>
              <motion.p variants={itemVariants}>{t('paragraphs.background')}</motion.p>
            </div>
          </div>

          <div className='flex flex-col justify-center gap-4 lg:col-span-5'>
            {evidenceCards.map(card => (
              <motion.article
                key={card.key}
                variants={itemVariants}
                whileHover={{ y: -3 }}
                className={`border border-l-2 border-white/8 bg-[#07101e]/88 p-5 shadow-[0_18px_50px_-35px_rgba(0,0,0,0.95)] transition-colors hover:border-white/13 hover:bg-[#091425] ${card.accent}`}
              >
                <div className='flex items-start gap-4'>
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center border ${card.iconStyle}`}>
                    <Icon icon={card.icon} className='h-5 w-5' aria-hidden='true' />
                  </div>
                  <div className='min-w-0 space-y-2'>
                    <div>
                      <h3 className='font-space-grotesk text-base font-semibold text-slate-100'>
                        {t(`cards.${card.key}.title`)}
                      </h3>
                      <p className='font-syne-mono mt-1 text-[9px] tracking-[0.16em] text-slate-500 uppercase'>
                        {t(`cards.${card.key}.label`)}
                      </p>
                    </div>
                    <p className='font-outfit text-sm leading-6 font-light text-slate-400'>
                      {t(`cards.${card.key}.description`)}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
