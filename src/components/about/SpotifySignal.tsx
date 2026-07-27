'use client'

import { useCallback, useEffect, useState } from 'react'

import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { Icon } from '@iconify/react'

import type { AboutSignal, SpotifyActivity, SpotifyTrack } from '@/types/AboutTypes'

type SpotifyState = 'loading' | AboutSignal<SpotifyActivity>

function isSpotifyTrack(value: unknown): value is SpotifyTrack {
  if (!value || typeof value !== 'object') return false
  const track = value as Record<string, unknown>

  return (
    typeof track.id === 'string' &&
    /^[A-Za-z0-9]{22}$/.test(track.id) &&
    typeof track.title === 'string' &&
    typeof track.artist === 'string' &&
    (typeof track.albumImageUrl === 'string' || track.albumImageUrl === null) &&
    typeof track.externalUrl === 'string'
  )
}

function isSpotifySignal(value: unknown): value is AboutSignal<SpotifyActivity> {
  if (!value || typeof value !== 'object' || !('status' in value)) return false
  if (value.status === 'unavailable') return true
  if (value.status !== 'available' || !('data' in value) || !value.data || typeof value.data !== 'object') return false

  const data = value.data as Record<string, unknown>
  return (
    (data.state === 'playing' || data.state === 'recent') &&
    isSpotifyTrack(data.featured) &&
    Array.isArray(data.recent) &&
    data.recent.every(isSpotifyTrack)
  )
}

function TrackCover({ track, alt }: { track: SpotifyTrack; alt: string }) {
  if (track.albumImageUrl) {
    return <Image src={track.albumImageUrl} alt={alt} width={128} height={128} className='h-full w-full object-cover' />
  }

  return (
    <span className='flex h-full w-full items-center justify-center bg-purple-400/8'>
      <Icon icon='lucide:music-2' className='h-7 w-7 text-purple-300/70' aria-hidden='true' />
    </span>
  )
}

export function SpotifySignal() {
  const t = useTranslations('pages.about.signals.spotify')
  const [signal, setSignal] = useState<SpotifyState>('loading')
  const [selectedTrack, setSelectedTrack] = useState<SpotifyTrack | null>(null)

  const loadActivity = useCallback(async (controller: AbortController) => {
    try {
      const response = await fetch('/api/about/spotify', { signal: controller.signal })
      if (!response.ok) throw new Error('request_failed')

      const payload: unknown = await response.json()
      setSignal(isSpotifySignal(payload) ? payload : { status: 'unavailable' })
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) setSignal({ status: 'unavailable' })
    }
  }, [])

  useEffect(() => {
    let controller = new AbortController()

    const refresh = () => {
      if (document.visibilityState !== 'visible') return
      controller.abort()
      controller = new AbortController()
      void loadActivity(controller)
    }

    refresh()
    const interval = window.setInterval(refresh, 60_000)
    document.addEventListener('visibilitychange', refresh)

    return () => {
      controller.abort()
      window.clearInterval(interval)
      document.removeEventListener('visibilitychange', refresh)
    }
  }, [loadActivity])

  if (signal === 'loading') {
    return (
      <div
        className='min-h-72 animate-pulse border border-white/8 bg-white/[0.018] p-6'
        role='status'
        aria-label={t('loading')}
      >
        <div className='h-3 w-28 bg-white/8' />
        <div className='mt-8 h-40 bg-white/5' />
      </div>
    )
  }

  if (signal.status === 'unavailable') return null

  const activity = signal.data
  const activeTrack = selectedTrack ?? activity.featured

  return (
    <div>
      <div className='mx-auto grid gap-4 lg:grid-cols-[700px_400px] lg:justify-center'>
        <article className='relative min-w-0 overflow-hidden border border-purple-400/20 bg-[#070914]/80 p-3 sm:p-4'>
          <div className='absolute inset-y-0 left-0 w-px bg-purple-400/60' aria-hidden='true' />
          <iframe
            key={activeTrack.id}
            title={t('playerFrameTitle', { title: activeTrack.title, artist: activeTrack.artist })}
            src={`https://open.spotify.com/embed/track/${activeTrack.id}?utm_source=generator&theme=0`}
            width='100%'
            height='420'
            allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
            loading='lazy'
            className='block h-[352px] w-full border-0 lg:h-[420px]'
          />
        </article>

        <div className='border border-white/9 bg-[#050a14]/72 p-5 sm:p-6'>
          <h3 className='font-syne-mono text-[9px] tracking-[0.16em] text-slate-500 uppercase'>{t('historyTitle')}</h3>
          <div className='mt-4 divide-y divide-white/7'>
            {activity.recent.map((track, index) => (
              <button
                key={track.id}
                type='button'
                onClick={() => setSelectedTrack(track)}
                className={`group/track focus-visible:ring-tech-teal -mx-2 grid w-[calc(100%+1rem)] grid-cols-[24px_44px_minmax(0,1fr)_20px] items-center gap-3 px-2 py-3 text-left transition-colors focus-visible:ring-1 focus-visible:outline-none ${
                  selectedTrack?.id === track.id ? 'bg-purple-400/[0.07]' : 'hover:bg-white/[0.025]'
                }`}
                aria-label={t('selectTrack', { title: track.title, artist: track.artist })}
                aria-pressed={selectedTrack?.id === track.id}
              >
                <span className='font-syne-mono text-[9px] text-slate-600'>0{index + 1}</span>
                <span className='h-11 w-11 overflow-hidden'>
                  <TrackCover track={track} alt='' />
                </span>
                <span className='min-w-0'>
                  <span className='font-space-grotesk block truncate text-sm font-semibold text-slate-200'>
                    {track.title}
                  </span>
                  <span className='font-outfit mt-0.5 block truncate text-xs font-light text-slate-500'>
                    {track.artist}
                  </span>
                </span>
                <Icon
                  icon='lucide:play'
                  className='h-4 w-4 text-slate-600 transition-colors group-hover/track:text-purple-300'
                  aria-hidden='true'
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <a
        href={activeTrack.externalUrl}
        target='_blank'
        rel='noreferrer'
        className='font-syne-mono focus-visible:ring-tech-teal mx-auto mt-4 flex w-full max-w-[916px] items-center gap-2 text-[9px] tracking-[0.14em] text-slate-500 uppercase transition-colors hover:text-purple-200 focus-visible:ring-1 focus-visible:outline-none'
      >
        {t('action')}
        <Icon icon='lucide:external-link' className='h-3.5 w-3.5' aria-hidden='true' />
      </a>
    </div>
  )
}
