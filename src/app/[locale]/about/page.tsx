import { Suspense } from 'react'

import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

import { Icon } from '@iconify/react'

import { AboutDigitalSignals, AboutDigitalSignalsFallback } from '@/components/about/AboutDigitalSignals'
import { AboutReveal } from '@/components/about/AboutReveal'
import MeshBackground from '@/components/backgrounds/MeshBackground'
import { Link } from '@/i18n/navigation'
import { siteLinks } from '@/lib/data/SiteData'
import { localizedAlternates } from '@/lib/site-url'

type AboutPageProps = {
  params: Promise<{ locale: string }>
}

const learningItems = [
  { key: 'rendering', icon: 'lucide:layers-3' },
  { key: 'server', icon: 'lucide:waypoints' },
  { key: 'delivery', icon: 'lucide:shield-check' },
] as const

const heroMesh = [
  { color: '#0e7490', x: 12, y: 24, spread: 38, opacity: 0.12 },
  { color: '#7c3aed', x: 86, y: 68, spread: 42, opacity: 0.1 },
]

const personalMesh = [
  { color: '#f97316', x: 8, y: 75, spread: 34, opacity: 0.08 },
  { color: '#8b5cf6', x: 88, y: 20, spread: 42, opacity: 0.1 },
]

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.about.seo' })

  return {
    title: t('title'),
    description: t('description'),
    alternates: localizedAlternates(locale, '/about'),
    openGraph: {
      title: t('title'),
      description: t('description'),
    },
  }
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'pages.about' })
  const actions = await getTranslations({ locale, namespace: 'common.actions' })

  return (
    <main aria-label={t('accessibility.pageLabel')} className='relative z-10 overflow-hidden pb-16 md:pb-24'>
      <section className='relative mx-auto max-w-6xl overflow-hidden border-b border-white/8 px-2 py-16 sm:px-6 md:py-24 lg:min-h-[calc(100vh-5rem)] lg:py-28'>
        <MeshBackground points={heroMesh} background='transparent' className='opacity-90' />

        <div className='relative z-10 grid items-center gap-14 lg:grid-cols-[minmax(0,1.12fr)_minmax(320px,0.72fr)] lg:gap-20'>
          <AboutReveal immediate className='max-w-3xl'>
            <div className='font-syne-mono text-tech-teal mb-6 flex items-center gap-3 text-[10px] tracking-[0.22em] uppercase'>
              <span className='h-px w-10 bg-current' aria-hidden='true' />
              {t('hero.eyebrow')}
            </div>

            <h1 className='font-audiowide text-4xl leading-[1.04] font-normal tracking-[-0.045em] text-slate-50 sm:text-5xl md:text-6xl lg:text-7xl'>
              {t('hero.title')}
            </h1>

            <div className='font-outfit mt-8 max-w-2xl space-y-5 text-base leading-8 font-light text-slate-300/80 md:text-lg md:leading-9'>
              <p>{t('hero.introduction')}</p>
              <p>{t('hero.direction')}</p>
            </div>

            <div className='mt-9 flex flex-wrap gap-3'>
              <Link
                href={siteLinks.projects}
                className='font-space-grotesk border-cyan-bright/35 bg-cyan-bright/8 hover:bg-cyan-bright/14 focus-visible:ring-cyan-bright/60 inline-flex min-h-12 items-center gap-2 border px-5 py-3 text-xs font-semibold tracking-[0.08em] text-cyan-100 uppercase transition-colors outline-none focus-visible:ring-2'
              >
                {actions('viewProjects')}
                <Icon icon='lucide:arrow-up-right' className='h-4 w-4' aria-hidden='true' />
              </Link>
              <Link
                href={`${siteLinks.home}#contato`}
                className='font-space-grotesk focus-visible:ring-plasma-purple/60 inline-flex min-h-12 items-center gap-2 border border-white/10 bg-black/15 px-5 py-3 text-xs font-semibold tracking-[0.08em] text-slate-300 uppercase transition-colors outline-none hover:border-white/20 hover:bg-white/5 focus-visible:ring-2'
              >
                {t('hero.contactAction')}
                <Icon icon='lucide:message-circle' className='h-4 w-4' aria-hidden='true' />
              </Link>
            </div>
          </AboutReveal>

          <AboutReveal
            immediate
            delay={0.12}
            className='relative mx-auto w-full max-w-97.5 lg:mx-0 lg:justify-self-end'
          >
            <div
              className='border-cyan-bright/18 absolute -top-5 -right-5 h-28 w-28 border-t border-r'
              aria-hidden='true'
            />
            <div
              className='border-plasma-purple/20 absolute -bottom-5 -left-5 h-32 w-32 border-b border-l'
              aria-hidden='true'
            />
            <figure className='relative aspect-4/5 overflow-hidden bg-[#07101c] shadow-[0_35px_80px_-38px_rgba(0,0,0,0.95)]'>
              <Image
                src='/img/Lucino_Campos.webp'
                alt={t('hero.portraitAlt')}
                fill
                priority
                sizes='(max-width: 1023px) 390px, 31vw'
                className='object-cover object-[50%_28%] contrast-[1.04] saturate-[0.82]'
              />
              <div className='pointer-events-none absolute inset-0 bg-linear-to-t from-[#02050d]/70 via-transparent to-cyan-950/10' />
              <figcaption className='font-syne-mono absolute right-5 bottom-5 left-5 flex items-center justify-between border-t border-white/15 pt-3 text-[9px] tracking-[0.16em] text-slate-300/80 uppercase'>
                <span>{t('hero.portraitCaption')}</span>
                <Icon icon='lucide:scan-face' className='text-tech-teal h-4 w-4' aria-hidden='true' />
              </figcaption>
            </figure>
          </AboutReveal>
        </div>
      </section>

      <section className='mx-auto grid max-w-6xl gap-12 px-2 py-20 sm:px-6 md:py-28 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20'>
        <AboutReveal>
          <div className='font-syne-mono text-cyan-bright/75 flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase'>
            <Icon icon='lucide:route' className='h-4 w-4' aria-hidden='true' />
            {t('journey.eyebrow')}
          </div>
          <h2 className='font-zen-dots mt-5 text-3xl leading-tight font-normal tracking-tight text-slate-50 md:text-4xl'>
            {t('journey.title')}
          </h2>
          <figure className='relative mt-9 aspect-3/2 overflow-hidden border border-white/9 bg-[#050a14]'>
            <Image
              src='/img/about-teamwork.webp'
              alt={t('journey.imageAlt')}
              fill
              sizes='(max-width: 1023px) 100vw, 43vw'
              className='object-cover'
            />
            <div className='pointer-events-none absolute inset-0 bg-linear-to-t from-[#02050d]/55 via-transparent to-transparent' />
            <figcaption className='font-syne-mono absolute right-4 bottom-4 border border-white/10 bg-[#02050d]/75 px-3 py-2 text-[8px] tracking-[0.14em] text-slate-400 uppercase backdrop-blur-sm'>
              {t('journey.imageCaption')}
            </figcaption>
          </figure>
        </AboutReveal>

        <AboutReveal
          delay={0.08}
          className='font-outfit space-y-6 text-base leading-8 font-light text-slate-300/78 md:text-lg md:leading-9'
        >
          <p>{t('journey.beginning')}</p>
          <p>{t('journey.team')}</p>
          <p className='border-l-2 border-purple-400/45 pl-6 text-slate-200/85'>{t('journey.present')}</p>
        </AboutReveal>
      </section>

      <section className='mx-auto max-w-6xl border-y border-white/8 px-2 py-20 sm:px-6 md:py-24'>
        <div className='grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20'>
          <AboutReveal>
            <div className='font-syne-mono text-plasma-purple flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase'>
              <Icon icon='lucide:book-open-check' className='h-4 w-4' aria-hidden='true' />
              {t('learning.eyebrow')}
            </div>
            <h2 className='font-zen-dots mt-5 text-3xl leading-tight font-normal tracking-tight text-slate-50 md:text-4xl'>
              {t('learning.title')}
            </h2>
            <p className='font-outfit mt-5 max-w-md text-base leading-7 font-light text-slate-400'>
              {t('learning.description')}
            </p>
            <figure className='relative mt-9 aspect-3/2 overflow-hidden border border-purple-400/12 bg-[#050a14]'>
              <Image
                src='/img/about-interface.webp'
                alt={t('learning.imageAlt')}
                fill
                sizes='(max-width: 1023px) 100vw, 38vw'
                className='object-cover'
              />
              <div className='pointer-events-none absolute inset-0 bg-linear-to-t from-[#02050d]/45 via-transparent to-transparent' />
              <figcaption className='font-syne-mono absolute right-4 bottom-4 border border-white/10 bg-[#02050d]/75 px-3 py-2 text-[8px] tracking-[0.14em] text-slate-400 uppercase backdrop-blur-sm'>
                {t('learning.imageCaption')}
              </figcaption>
            </figure>
          </AboutReveal>

          <div>
            {learningItems.map((item, index) => (
              <AboutReveal
                key={item.key}
                delay={index * 0.06}
                className='group grid gap-4 border-t border-white/9 py-7 first:border-t-0 first:pt-0 sm:grid-cols-[48px_1fr]'
              >
                <div className='border-plasma-purple/20 bg-plasma-purple/6 flex h-11 w-11 items-center justify-center border text-purple-300 transition-colors group-hover:border-purple-400/35 group-hover:bg-purple-400/10'>
                  <Icon icon={item.icon} className='h-5 w-5' aria-hidden='true' />
                </div>
                <div>
                  <h3 className='font-space-grotesk text-lg font-semibold text-slate-100'>
                    {t(`learning.items.${item.key}.title`)}
                  </h3>
                  <p className='font-outfit mt-2 text-sm leading-7 font-light text-slate-400 md:text-base'>
                    {t(`learning.items.${item.key}.description`)}
                  </p>
                </div>
              </AboutReveal>
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={<AboutDigitalSignalsFallback />}>
        <AboutDigitalSignals locale={locale} />
      </Suspense>

      <section className='relative mx-auto my-20 max-w-6xl overflow-hidden px-2 py-4 sm:px-6 md:my-28'>
        <MeshBackground points={personalMesh} background='transparent' className='opacity-85' />

        <div className='relative z-10 grid items-center gap-12 lg:grid-cols-[minmax(300px,0.78fr)_minmax(0,1.22fr)] lg:gap-20'>
          <AboutReveal className='relative mx-auto w-full max-w-95'>
            <div
              className='border-cyber-orange/25 pointer-events-none absolute -top-4 -right-4 h-28 w-28 border-t border-r'
              aria-hidden='true'
            />
            <div
              className='border-plasma-purple/20 pointer-events-none absolute -bottom-4 -left-4 h-32 w-32 border-b border-l'
              aria-hidden='true'
            />
            <figure className='relative aspect-9/16 overflow-hidden border border-white/10 bg-[#050a15] shadow-[0_32px_80px_-42px_rgba(0,0,0,0.95)]'>
              <Image
                src='/img/volei.jpg'
                alt={t('personal.photoAlt')}
                fill
                sizes='(max-width: 1023px) min(100vw, 380px), 27vw'
                className='object-cover'
              />
              <div className='pointer-events-none absolute inset-0 bg-linear-to-t from-[#02050d]/65 via-transparent to-orange-950/5' />
              <figcaption className='font-syne-mono absolute right-4 bottom-4 left-4 flex items-center justify-between border-t border-white/15 pt-3 text-[8px] tracking-[0.16em] text-slate-200/85 uppercase'>
                <span>{t('personal.photoCaption')}</span>
                <Icon icon='lucide:volleyball' className='text-cyber-orange h-4 w-4' aria-hidden='true' />
              </figcaption>
            </figure>
          </AboutReveal>

          <AboutReveal className='flex flex-col justify-center'>
            <div className='font-syne-mono text-cyber-orange flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase'>
              <Icon icon='lucide:sun-medium' className='h-4 w-4' aria-hidden='true' />
              {t('personal.eyebrow')}
            </div>
            <h2 className='font-zen-dots mt-5 text-3xl leading-tight font-normal tracking-tight text-slate-50 md:text-4xl'>
              {t('personal.title')}
            </h2>
            <div className='font-outfit mt-6 space-y-5 text-base leading-8 font-light text-slate-300/78'>
              <p>{t('personal.volleyball')}</p>
              <p>{t('personal.balance')}</p>
            </div>
          </AboutReveal>
        </div>
      </section>

      <AboutReveal className='mx-auto max-w-6xl px-2 sm:px-6'>
        <section className='relative overflow-hidden border border-white/10 bg-[#050b16]/86 px-6 py-12 text-center shadow-[0_28px_70px_-45px_rgba(0,0,0,0.95)] sm:px-10 md:py-16'>
          <div className='bg-cyan-bright/35 absolute top-0 left-0 h-px w-24' aria-hidden='true' />
          <div className='bg-plasma-purple/35 absolute right-0 bottom-0 h-px w-24' aria-hidden='true' />
          <Icon icon='lucide:messages-square' className='text-tech-teal mx-auto h-6 w-6' aria-hidden='true' />
          <h2 className='font-zen-dots mx-auto mt-5 max-w-2xl text-2xl font-normal tracking-tight text-slate-50 md:text-3xl'>
            {t('closing.title')}
          </h2>
          <p className='font-outfit mx-auto mt-4 max-w-xl text-sm leading-7 font-light text-slate-400 md:text-base'>
            {t('closing.description')}
          </p>
          <div className='mt-7 flex flex-wrap justify-center gap-3'>
            <Link
              href={`${siteLinks.home}#contato`}
              className='font-space-grotesk border-cyan-bright/35 bg-cyan-bright/8 hover:bg-cyan-bright/14 focus-visible:ring-cyan-bright/60 inline-flex min-h-12 items-center gap-2 border px-5 py-3 text-xs font-semibold tracking-[0.08em] text-cyan-100 uppercase transition-colors outline-none focus-visible:ring-2'
            >
              {t('closing.contactAction')}
              <Icon icon='lucide:arrow-right' className='h-4 w-4' aria-hidden='true' />
            </Link>
            <Link
              href={siteLinks.projects}
              className='font-space-grotesk focus-visible:ring-plasma-purple/60 inline-flex min-h-12 items-center border border-white/10 px-5 py-3 text-xs font-semibold tracking-[0.08em] text-slate-300 uppercase transition-colors outline-none hover:border-white/20 hover:bg-white/5 focus-visible:ring-2'
            >
              {actions('viewProjects')}
            </Link>
          </div>
        </section>
      </AboutReveal>
    </main>
  )
}
