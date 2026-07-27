import { getTranslations } from 'next-intl/server'

import { Icon } from '@iconify/react'

import { Link } from '@/i18n/navigation'
import { siteLinks } from '@/lib/data/SiteData'

export default async function NotFound() {
  const t = await getTranslations('pages.notFound')

  return (
    <main className='relative flex min-h-[calc(100vh-3.5rem)] items-center justify-center overflow-hidden px-4 py-20'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,251,234,0.06),transparent_46%)]' />
      <section className='relative w-full max-w-3xl overflow-hidden border border-white/10 bg-[#050817]/88 px-6 py-14 text-center shadow-[0_28px_80px_-48px_rgba(0,0,0,0.95)] sm:px-10'>
        <div className='font-syne-mono text-cyan-bright/75 text-[10px] tracking-[0.22em] uppercase'>{t('eyebrow')}</div>
        <div className='font-audiowide mt-5 text-7xl tracking-[-0.06em] text-slate-50 sm:text-8xl' aria-hidden='true'>
          404
        </div>
        <h1 className='font-space-grotesk mt-5 text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl'>
          {t('title')}
        </h1>
        <p className='font-outfit mx-auto mt-5 max-w-xl text-base leading-8 font-light text-slate-400'>
          {t('description')}
        </p>
        <Link
          href={siteLinks.home}
          className='font-space-grotesk border-cyan-bright/35 bg-cyan-bright/8 hover:bg-cyan-bright/14 focus-visible:ring-cyan-bright/60 mt-8 inline-flex min-h-12 items-center gap-2 border px-5 py-3 text-xs font-semibold tracking-[0.08em] text-cyan-100 uppercase outline-none focus-visible:ring-2'
        >
          <Icon icon='lucide:arrow-left' className='h-4 w-4' aria-hidden='true' />
          {t('homeAction')}
        </Link>
        <span className='border-plasma-purple/30 absolute top-4 left-4 h-8 w-8 border-t border-l' aria-hidden='true' />
        <span
          className='border-cyan-bright/25 absolute right-4 bottom-4 h-8 w-8 border-r border-b'
          aria-hidden='true'
        />
      </section>
    </main>
  )
}
