'use client'

import { useEffect } from 'react'

import { useTranslations } from 'next-intl'

import { Icon } from '@iconify/react'
import posthog from 'posthog-js'

type ErrorPageProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const t = useTranslations('pages.error')

  useEffect(() => {
    console.error('[page/error]', error.digest ?? 'unknown')
    posthog.captureException(error, {
      digest: error.digest ?? 'unknown',
      error_boundary: 'locale_page',
    })
  }, [error])

  return (
    <main className='relative flex min-h-[calc(100vh-3.5rem)] items-center justify-center overflow-hidden px-4 py-20'>
      <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.08),transparent_46%)]' />
      <section className='relative w-full max-w-2xl border border-white/10 bg-[#050817]/88 px-6 py-12 text-center shadow-[0_28px_80px_-48px_rgba(0,0,0,0.95)] sm:px-10'>
        <span className='font-syne-mono text-cyber-orange text-[9px] tracking-[0.2em] uppercase'>{t('eyebrow')}</span>
        <Icon icon='lucide:triangle-alert' className='text-cyber-orange mx-auto mt-6 h-8 w-8' aria-hidden='true' />
        <h1 className='font-zen-dots mt-5 text-3xl font-normal tracking-tight text-slate-50 sm:text-4xl'>
          {t('title')}
        </h1>
        <p className='font-outfit mx-auto mt-5 max-w-lg text-base leading-8 font-light text-slate-400'>
          {t('description')}
        </p>
        <button
          type='button'
          onClick={reset}
          className='font-space-grotesk border-cyber-orange/35 bg-cyber-orange/8 hover:bg-cyber-orange/14 focus-visible:ring-cyber-orange/60 mt-8 inline-flex min-h-12 cursor-pointer items-center gap-2 border px-5 py-3 text-xs font-semibold tracking-[0.08em] text-orange-100 uppercase outline-none focus-visible:ring-2'
        >
          <Icon icon='lucide:refresh-cw' className='h-4 w-4' aria-hidden='true' />
          {t('retryAction')}
        </button>
      </section>
    </main>
  )
}
