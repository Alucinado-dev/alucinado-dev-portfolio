'use client'

import { useTranslations } from 'next-intl'

import { Icon } from '@iconify/react'

import MeshBackground from '@/components/backgrounds/MeshBackground'
import Container from '@/components/container/Container'
import BrandName from '@/components/ui/BrandName'
import Logo from '@/components/ui/Logo'
import { Link } from '@/i18n/navigation'
import { siteExternalLinks, siteLinks, siteNavigation } from '@/lib/data/SiteData'

const linkStyles = {
  email: 'hover:border-tech-teal/35 hover:bg-tech-teal/8 hover:text-tech-teal',
  github: 'hover:border-plasma-purple/35 hover:bg-plasma-purple/8 hover:text-purple-300',
  linkedin: 'hover:border-cyan-bright/35 hover:bg-cyan-bright/7 hover:text-cyan-bright',
  instagram: 'hover:border-pink-neon/30 hover:bg-pink-neon/7 hover:text-pink-300',
} as const

const footerMesh = [
  { color: '#0e7490', x: 12, y: 10, spread: 44, opacity: 0.08 },
  { color: '#7c3aed', x: 88, y: 90, spread: 48, opacity: 0.07 },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const navigation = useTranslations('common.navigation')
  const footer = useTranslations('common.footer')
  const accessibility = useTranslations('common.accessibility')

  return (
    <footer className='relative z-10 w-full overflow-hidden border-t border-white/10 bg-[#030611]/96 backdrop-blur-xl'>
      <MeshBackground points={footerMesh} background='transparent' className='opacity-80' />

      <div className='pointer-events-none absolute top-0 right-0 left-0 h-16 opacity-35' aria-hidden='true'>
        <svg viewBox='0 0 1200 64' className='h-full w-full' preserveAspectRatio='none'>
          <path
            d='M0 32H180L210 10H430L460 32H740L775 52H990L1020 32H1200'
            fill='none'
            stroke='#00fbea'
            strokeWidth='0.7'
          />
          <circle cx='210' cy='10' r='2.5' fill='#8b5cf6' />
          <circle cx='775' cy='52' r='2.5' fill='#00fbea' />
          <circle cx='1020' cy='32' r='2.5' fill='#f97316' />
        </svg>
      </div>

      <Container className='relative grid gap-10 px-2 py-12 sm:px-6 md:grid-cols-[1.25fr_0.75fr_0.85fr] md:gap-8 md:py-14'>
        <div className='max-w-sm'>
          <Link
            href={siteLinks.home}
            aria-label={footer('logoHome')}
            className='focus-visible:ring-cyan-bright/60 inline-flex items-center gap-4 outline-none focus-visible:ring-2'
          >
            <Logo size='footer' />
            <BrandName size='footer'>{footer('brand')}</BrandName>
          </Link>
          <p className='font-outfit mt-5 max-w-xs text-sm leading-7 font-light text-slate-400'>
            {footer('description')}
          </p>
          <div className='font-syne-mono mt-5 flex items-center gap-2 text-[9px] tracking-[0.14em] text-emerald-300/70 uppercase'>
            <span className='h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.65)] motion-safe:animate-pulse' />
            {footer('onlineStatus')}
          </div>
        </div>

        <div>
          <h2 className='font-syne-mono text-tech-teal text-[9px] tracking-[0.18em] uppercase'>
            {footer('navigationTitle')}
          </h2>
          <nav className='font-space-grotesk mt-5 flex flex-col items-start gap-3 text-sm font-medium text-slate-400'>
            {siteNavigation.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className='group hover:text-cyan-bright focus-visible:text-cyan-bright flex min-h-8 items-center gap-2 transition-colors outline-none'
              >
                <span
                  className='bg-cyan-bright/25 group-hover:bg-cyan-bright h-px w-3 transition-colors'
                  aria-hidden='true'
                />
                {navigation(link.labelKey)}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h2 className='font-syne-mono text-plasma-purple text-[9px] tracking-[0.18em] uppercase'>
            {footer('contactTitle')}
          </h2>
          <p className='font-outfit mt-5 text-sm leading-6 font-light text-slate-500'>{footer('contactDescription')}</p>
          <div className='mt-5 flex flex-wrap items-center gap-3'>
            {siteExternalLinks.map(link => (
              <a
                key={link.key}
                href={link.href}
                target={link.opensNewTab ? '_blank' : undefined}
                rel={link.opensNewTab ? 'noopener noreferrer' : undefined}
                aria-label={accessibility(`${link.key}Profile`)}
                className={`flex h-10 w-10 items-center justify-center border border-white/9 bg-white/3 text-slate-500 transition-all outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${linkStyles[link.key]}`}
              >
                <Icon icon={link.icon} className='h-4 w-4' aria-hidden='true' />
              </a>
            ))}
          </div>
        </div>
      </Container>

      <div className='relative border-t border-white/7'>
        <Container className='font-syne-mono flex flex-col items-center justify-between gap-3 px-2 py-4 text-[8px] tracking-[0.13em] text-slate-400 uppercase sm:px-6 md:flex-row'>
          <div className='flex items-center gap-2'>
            <Icon icon='lucide:copyright' className='h-3 w-3' aria-hidden='true' />
            <span>{currentYear}</span>
            <span className='text-slate-400'>{footer('copyright')}</span>
          </div>
          <span>{footer('builtWith')}</span>
        </Container>
      </div>

      <div className='via-plasma-purple/35 pointer-events-none absolute top-0 right-0 left-0 h-px bg-linear-to-r from-transparent to-transparent' />
    </footer>
  )
}
