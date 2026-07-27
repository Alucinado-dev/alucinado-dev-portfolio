import { getTranslations } from 'next-intl/server'

import { Icon } from '@iconify/react'

import { getGitHubActivity, getWakaTimeActivity } from '@/lib/integrations/AboutSignals'

import { AboutReveal } from './AboutReveal'
import { SpotifySignal } from './SpotifySignal'

type AboutDigitalSignalsProps = {
  locale: string
}

const contributionColors = ['bg-white/[0.055]', 'bg-teal-950', 'bg-teal-800', 'bg-teal-500', 'bg-cyan-bright'] as const

const githubActivityItems = [
  { key: 'commits', icon: 'lucide:git-commit-horizontal' },
  { key: 'pullRequests', icon: 'lucide:git-pull-request' },
  { key: 'issues', icon: 'lucide:circle-dot' },
  { key: 'pullRequestReviews', icon: 'lucide:messages-square' },
] as const

function formatDuration(totalSeconds: number, locale: string) {
  const totalMinutes = Math.round(totalSeconds / 60)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  const number = new Intl.NumberFormat(locale)

  return [hours > 0 ? `${number.format(hours)} h` : null, minutes > 0 ? `${number.format(minutes)} min` : null]
    .filter(Boolean)
    .join(' ')
}

export async function AboutDigitalSignals({ locale }: AboutDigitalSignalsProps) {
  const t = await getTranslations({ locale, namespace: 'pages.about.signals' })
  const [githubResult, wakaTimeResult] = await Promise.allSettled([getGitHubActivity(), getWakaTimeActivity()])
  const github = githubResult.status === 'fulfilled' ? githubResult.value : { status: 'unavailable' as const }
  const wakaTime = wakaTimeResult.status === 'fulfilled' ? wakaTimeResult.value : { status: 'unavailable' as const }
  const githubUsername = process.env.GITHUB_USERNAME?.trim()
  const githubFallback = githubUsername ? `https://github.com/${encodeURIComponent(githubUsername)}` : null
  const dayFormatter = new Intl.DateTimeFormat(locale, { weekday: 'short', timeZone: 'UTC' })
  const maxDaySeconds =
    wakaTime.status === 'available' ? Math.max(...wakaTime.data.days.map(day => day.totalSeconds), 1) : 1
  const activeDays = wakaTime.status === 'available' ? wakaTime.data.days.filter(day => day.totalSeconds > 0).length : 0

  return (
    <>
      <section className='mx-auto max-w-6xl px-2 py-20 sm:px-6 md:py-28' aria-label={t('github.accessibilityLabel')}>
        <AboutReveal className='grid gap-7 border-b border-white/8 pb-9 lg:grid-cols-[0.78fr_1.22fr] lg:items-end'>
          <div>
            <div className='font-syne-mono text-tech-teal flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase'>
              <Icon icon='lucide:github' className='h-4 w-4' aria-hidden='true' />
              {t('github.eyebrow')}
            </div>
            <h2 className='font-space-grotesk mt-5 text-3xl leading-tight font-bold tracking-tight text-slate-50 md:text-4xl'>
              {t('github.sectionTitle')}
            </h2>
          </div>
          <p className='font-outfit max-w-2xl text-base leading-8 font-light text-slate-400 lg:justify-self-end'>
            {t('github.description')}
          </p>
        </AboutReveal>

        {github.status === 'available' ? (
          <AboutReveal className='mt-9 border border-white/9 bg-[#050a14]/76 p-5 sm:p-7'>
            <div className='flex flex-wrap items-start justify-between gap-5'>
              <p className='font-space-grotesk text-lg font-semibold text-slate-100'>
                {t('github.summary', { count: github.data.totalContributions })}
              </p>
              <a
                href={github.data.profileUrl}
                target='_blank'
                rel='noreferrer'
                className='font-syne-mono focus-visible:ring-tech-teal inline-flex items-center gap-2 text-[9px] tracking-[0.14em] text-slate-400 uppercase transition-colors hover:text-cyan-200 focus-visible:ring-1 focus-visible:outline-none'
              >
                {t('github.action')}
                <Icon icon='lucide:external-link' className='h-3.5 w-3.5' aria-hidden='true' />
              </a>
            </div>

            <div className='mt-8' aria-label={t('github.mapLabel')} role='img'>
              <div
                className='grid gap-[2px]'
                style={{ gridTemplateColumns: `repeat(${github.data.weeks.length}, minmax(0, 1fr))` }}
                aria-hidden='true'
              >
                {github.data.weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className='grid grid-rows-7 gap-[2px]'>
                    {week.days.map(day => (
                      <span
                        key={day.date}
                        className={`aspect-square min-h-1 ${contributionColors[day.level] ?? contributionColors[0]}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className='font-syne-mono mt-4 flex items-center justify-end gap-2 text-[8px] tracking-[0.12em] text-slate-600 uppercase'>
                {t('github.less')}
                {contributionColors.map(color => (
                  <span key={color} className={`h-2.5 w-2.5 ${color}`} aria-hidden='true' />
                ))}
                {t('github.more')}
              </div>
            </div>

            <div className='mt-8 grid border-t border-white/8 lg:grid-cols-2'>
              <div className='py-7 lg:border-r lg:border-white/8 lg:pr-8'>
                <h3 className='font-syne-mono text-tech-teal text-[10px] tracking-[0.18em] uppercase'>
                  {t('github.activityTitle')}
                </h3>

                <dl className='mt-6 grid grid-cols-2 gap-x-5 gap-y-6'>
                  {githubActivityItems.map(item => (
                    <div key={item.key} className='min-w-0 border-l border-white/8 pl-4'>
                      <dt className='font-outfit flex items-center gap-2 text-xs leading-5 text-slate-500'>
                        <Icon icon={item.icon} className='h-3.5 w-3.5 shrink-0 text-cyan-300/70' aria-hidden='true' />
                        {t(`github.${item.key}`)}
                      </dt>
                      <dd className='font-space-grotesk mt-2 text-2xl font-semibold text-slate-100 tabular-nums'>
                        {new Intl.NumberFormat(locale).format(github.data.activity[item.key])}
                      </dd>
                    </div>
                  ))}
                </dl>

                {github.data.activity.privateContributions > 0 && (
                  <p className='font-outfit mt-7 border-l border-fuchsia-400/35 pl-4 text-xs leading-6 text-slate-500'>
                    {t('github.privateContributions', { count: github.data.activity.privateContributions })}
                  </p>
                )}
              </div>

              <div className='border-t border-white/8 py-7 lg:border-t-0 lg:pl-8'>
                <h3 className='font-syne-mono text-plasma-purple text-[10px] tracking-[0.18em] uppercase'>
                  {t('github.languagesTitle')}
                </h3>
                <p className='font-outfit mt-3 max-w-md text-sm leading-6 text-slate-500'>
                  {t('github.languagesDescription')}
                </p>

                {github.data.languages.length > 0 && (
                  <div className='mt-6' aria-label={t('github.languagesLabel')} role='img'>
                    <div className='flex h-2.5 overflow-hidden bg-white/[0.045]' aria-hidden='true'>
                      {github.data.languages.map(language => (
                        <span
                          key={language.name}
                          className='h-full'
                          style={{ width: `${language.percent}%`, backgroundColor: language.color }}
                        />
                      ))}
                    </div>

                    <ul className='mt-6 grid gap-3 sm:grid-cols-2'>
                      {github.data.languages.map(language => (
                        <li key={language.name} className='flex items-center justify-between gap-4 text-sm'>
                          <span className='font-outfit flex min-w-0 items-center gap-2 text-slate-300'>
                            <span
                              className='h-2.5 w-2.5 shrink-0 rounded-full'
                              style={{ backgroundColor: language.color }}
                              aria-hidden='true'
                            />
                            <span className='truncate'>{language.name}</span>
                          </span>
                          <span className='font-syne-mono text-[9px] text-slate-500 tabular-nums'>
                            {new Intl.NumberFormat(locale, {
                              minimumFractionDigits: 1,
                              maximumFractionDigits: 1,
                            }).format(language.percent)}
                            %
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </AboutReveal>
        ) : githubFallback ? (
          <AboutReveal className='mt-9 flex min-h-44 items-center justify-between gap-6 border border-white/8 bg-white/[0.015] p-6'>
            <span className='font-space-grotesk font-semibold text-slate-300'>{t('github.fallbackTitle')}</span>
            <a
              href={githubFallback}
              target='_blank'
              rel='noreferrer'
              className='font-syne-mono text-[9px] tracking-[0.14em] text-slate-400 uppercase hover:text-cyan-200'
            >
              {t('github.fallback')}
            </a>
          </AboutReveal>
        ) : null}
      </section>

      {wakaTime.status === 'available' && (
        <section
          className='mx-auto max-w-6xl border-y border-white/8 px-2 py-20 sm:px-6 md:py-24'
          aria-label={t('wakatime.accessibilityLabel')}
        >
          <AboutReveal className='grid gap-7 lg:grid-cols-[0.78fr_1.22fr] lg:items-end'>
            <div>
              <div className='font-syne-mono text-plasma-purple flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase'>
                <Icon icon='lucide:keyboard' className='h-4 w-4' aria-hidden='true' />
                {t('wakatime.eyebrow')}
              </div>
              <h2 className='font-space-grotesk mt-5 text-3xl leading-tight font-bold tracking-tight text-slate-50 md:text-4xl'>
                {t('wakatime.sectionTitle')}
              </h2>
            </div>
            <p className='font-outfit max-w-2xl text-base leading-8 font-light text-slate-400 lg:justify-self-end'>
              {t('wakatime.description')}
            </p>
          </AboutReveal>

          <AboutReveal
            delay={0.06}
            className='mt-9 grid gap-px overflow-hidden border border-white/9 bg-white/8 lg:grid-cols-[0.7fr_0.8fr_1.5fr]'
          >
            <dl className='grid grid-cols-2 gap-5 bg-[#070914] p-5 sm:p-7 lg:grid-cols-1'>
              <div>
                <dt className='font-syne-mono text-[8px] tracking-[0.14em] text-slate-500 uppercase'>
                  {t('wakatime.totalLabel')}
                </dt>
                <dd className='font-space-grotesk mt-2 text-2xl font-semibold text-slate-100'>
                  {formatDuration(wakaTime.data.totalSeconds, locale)}
                </dd>
              </div>
              <div>
                <dt className='font-syne-mono text-[8px] tracking-[0.14em] text-slate-500 uppercase'>
                  {t('wakatime.averageLabel')}
                </dt>
                <dd className='font-space-grotesk mt-2 text-lg font-semibold text-slate-200'>
                  {formatDuration(wakaTime.data.dailyAverageSeconds, locale)}
                </dd>
              </div>
              <div>
                <dt className='font-syne-mono text-[8px] tracking-[0.14em] text-slate-500 uppercase'>
                  {t('wakatime.activeDaysLabel')}
                </dt>
                <dd className='font-space-grotesk mt-2 text-lg font-semibold text-purple-200'>
                  {t('wakatime.activeDays', { count: activeDays })}
                </dd>
              </div>
            </dl>

            <div className='bg-[#060a14] p-5 sm:p-7'>
              <h3 className='font-syne-mono text-[8px] tracking-[0.14em] text-slate-500 uppercase'>
                {t('wakatime.languagesLabel')}
              </h3>
              <div className='mt-5 space-y-5'>
                {wakaTime.data.languages.map(language => (
                  <div key={language.name}>
                    <div className='font-outfit mb-1.5 flex justify-between text-xs text-slate-300'>
                      <span>{language.name === 'Other' ? t('wakatime.otherLanguage') : language.name}</span>
                      <span className='text-slate-500'>{language.percent}%</span>
                    </div>
                    <div className='h-1 bg-white/6'>
                      <div className='bg-plasma-purple h-full' style={{ width: `${language.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className='bg-[#050a14] p-5 sm:p-7'>
              <h3 className='font-syne-mono text-[8px] tracking-[0.14em] text-slate-500 uppercase'>
                {t('wakatime.rhythmLabel')}
              </h3>
              <div className='mt-6 grid h-36 grid-cols-7 items-end gap-2 sm:gap-3'>
                {wakaTime.data.days.map(day => {
                  const height = day.totalSeconds === 0 ? 3 : Math.max(12, (day.totalSeconds / maxDaySeconds) * 100)
                  const label = dayFormatter.format(new Date(`${day.date}T12:00:00Z`)).replace('.', '')

                  return (
                    <div key={day.date} className='flex h-full min-w-0 flex-col items-center justify-end gap-2'>
                      <div className='flex h-full w-full items-end bg-white/[0.025]'>
                        <span
                          className='block w-full bg-linear-to-t from-purple-700 to-cyan-400'
                          style={{ height: `${height}%` }}
                          title={t('wakatime.dayActivity', { day: label })}
                        />
                      </div>
                      <time
                        dateTime={day.date}
                        className='font-syne-mono text-[7px] tracking-[0.08em] text-slate-600 uppercase'
                      >
                        {label}
                      </time>
                    </div>
                  )
                })}
              </div>
            </div>
          </AboutReveal>
        </section>
      )}

      <section className='mx-auto max-w-6xl px-2 py-20 sm:px-6 md:py-28' aria-label={t('spotify.accessibilityLabel')}>
        <AboutReveal className='grid gap-7 border-b border-white/8 pb-9 lg:grid-cols-[0.78fr_1.22fr] lg:items-end'>
          <div>
            <div className='font-syne-mono text-plasma-purple flex items-center gap-3 text-[10px] tracking-[0.2em] uppercase'>
              <Icon icon='lucide:headphones' className='h-4 w-4' aria-hidden='true' />
              {t('spotify.eyebrow')}
            </div>
            <h2 className='font-space-grotesk mt-5 text-3xl leading-tight font-bold tracking-tight text-slate-50 md:text-4xl'>
              {t('spotify.sectionTitle')}
            </h2>
          </div>
          <p className='font-outfit max-w-2xl text-base leading-8 font-light text-slate-400 lg:justify-self-end'>
            {t('spotify.description')}
          </p>
        </AboutReveal>

        <AboutReveal delay={0.08} className='mt-9'>
          <SpotifySignal />
        </AboutReveal>
      </section>
    </>
  )
}

export function AboutDigitalSignalsFallback() {
  return (
    <div className='mx-auto max-w-6xl px-2 py-20 sm:px-6 md:py-28' aria-hidden='true'>
      <div className='h-10 w-2/3 animate-pulse bg-white/[0.035]' />
      <div className='mt-10 h-64 animate-pulse border border-white/6 bg-white/[0.015]' />
    </div>
  )
}
