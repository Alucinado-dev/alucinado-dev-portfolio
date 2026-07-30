'use client'

import { useEffect, useState } from 'react'

import { useTranslations } from 'next-intl'

import { Icon } from '@iconify/react'

import { isAnalyticsEnabled, setAnalyticsEnabled } from '@/lib/analytics'

export default function AnalyticsPreference() {
  const footer = useTranslations('common.footer')
  const [enabled, setEnabled] = useState<boolean | null>(null)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setEnabled(isAnalyticsEnabled()), 0)
    return () => window.clearTimeout(timeoutId)
  }, [])

  if (enabled === null) return null

  return (
    <div className='flex flex-wrap items-center justify-center gap-x-3 gap-y-2 md:justify-start'>
      <span className='flex items-center gap-1.5'>
        <Icon icon='lucide:chart-no-axes-column-increasing' className='h-3 w-3' aria-hidden='true' />
        {footer('analyticsNotice')}
      </span>
      <button
        type='button'
        onClick={() => {
          const nextState = !enabled
          setAnalyticsEnabled(nextState)
          setEnabled(nextState)
        }}
        className='hover:text-cyan-bright focus-visible:ring-cyan-bright/60 min-h-7 cursor-pointer border border-white/9 bg-white/3 px-2.5 py-1 text-slate-400 transition-colors outline-none focus-visible:ring-2'
        aria-pressed={enabled}
      >
        {enabled ? footer('disableAnalytics') : footer('enableAnalytics')}
      </button>
    </div>
  )
}
