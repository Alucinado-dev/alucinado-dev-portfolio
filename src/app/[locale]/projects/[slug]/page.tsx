'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'

import { Icon } from '@iconify/react'

import { projects } from '@/lib/data/ProjectData'
import { siteLinks } from '@/lib/data/SiteData'

export default function ProjectDetailsPage() {
  const params = useParams<{ slug: string }>()
  const router = useRouter()
  const actions = useTranslations('common.actions')
  const accessibility = useTranslations('common.accessibility')
  const t = useTranslations('pages.projects.details')
  const projectContent = useTranslations('content.projects')
  const technologies = useTranslations('content.technologies')
  const taxonomy = useTranslations('content.taxonomy')
  const project = projects.find(item => item.slug === params.slug)

  if (!project) {
    return (
      <main className='flex min-h-screen flex-col items-center justify-center gap-5 bg-[#020611] px-6 text-center'>
        <Icon icon='lucide:folder-x' className='h-9 w-9 text-amber-400' aria-hidden='true' />
        <p className='font-space-grotesk text-slate-300'>{t('notFound')}</p>
        <button
          type='button'
          onClick={() => router.push(siteLinks.projects)}
          className='font-space-grotesk border-cyan-bright/25 bg-cyan-bright/7 border px-4 py-2 text-xs font-semibold text-cyan-100'
        >
          {actions('backToArchive')}
        </button>
      </main>
    )
  }

  const features = projectContent.raw(`${project.slug}.features`) as string[]

  return (
    <main className='relative z-10 my-24 bg-[#020611]/90 px-4 py-20 text-slate-100 sm:px-6 md:px-12'>
      <div className='mx-auto max-w-6xl space-y-10'>
        <button
          type='button'
          onClick={() => router.push(siteLinks.projects)}
          className='group font-space-grotesk hover:text-cyan-bright flex items-center gap-2 text-xs font-medium text-slate-500 transition-colors'
        >
          <Icon
            icon='lucide:arrow-left'
            className='h-4 w-4 transition-transform group-hover:-translate-x-0.5'
            aria-hidden='true'
          />
          {actions('backToArchive')}
        </button>

        <header className='grid gap-6 border-b border-white/8 pb-8 md:grid-cols-[1fr_auto] md:items-end'>
          <div className='space-y-3'>
            <div className='font-syne-mono flex flex-wrap items-center gap-2 text-[9px] tracking-[0.14em] uppercase'>
              <span className='text-slate-600'>{project.id}</span>
              <span className='text-white/15'>/</span>
              <span className='text-slate-400'>{taxonomy(`nature.${project.nature}`)}</span>
              <span className='text-white/15'>/</span>
              <span className='text-cyan-300'>{taxonomy(`scope.${project.scope}`)}</span>
            </div>
            <h1 className='font-space-grotesk text-4xl font-bold tracking-tight text-slate-50 md:text-5xl'>
              {project.title}
            </h1>
            <p className='font-outfit max-w-3xl text-base leading-7 font-light text-slate-300/75'>
              {projectContent(`${project.slug}.description`)}
            </p>
            <div className='font-syne-mono text-tech-teal flex items-center gap-2 text-[10px] tracking-[0.12em] uppercase'>
              <Icon icon='lucide:user-cog' className='h-3.5 w-3.5' aria-hidden='true' />
              {t('role')}: {taxonomy(`role.${project.role}`)}
            </div>
          </div>

          <div className='flex flex-wrap gap-2'>
            <a
              href={project.links.live}
              target='_blank'
              rel='noreferrer'
              aria-label={accessibility('externalProject', { title: project.title })}
              className='font-space-grotesk border-cyan-bright/30 bg-cyan-bright/10 hover:bg-cyan-bright/15 flex items-center gap-2 border px-4 py-2.5 text-xs font-semibold text-cyan-100 transition-colors'
            >
              {actions('liveDemo')}
              <Icon icon='lucide:external-link' className='h-4 w-4' aria-hidden='true' />
            </a>
            {project.links.isPrivateGithub ? (
              <span
                title={t('privateRepositoryHelp')}
                className='font-space-grotesk flex items-center gap-2 border border-white/8 bg-white/3 px-4 py-2.5 text-xs text-slate-600'
              >
                <Icon icon='lucide:lock-keyhole' className='h-4 w-4' aria-hidden='true' />
                {actions('privateRepository')}
              </span>
            ) : (
              project.links.github && (
                <a
                  href={project.links.github}
                  target='_blank'
                  rel='noreferrer'
                  className='font-space-grotesk hover:border-plasma-purple/35 flex items-center gap-2 border border-white/10 bg-white/4 px-4 py-2.5 text-xs font-medium text-slate-300 transition-colors hover:text-purple-200'
                >
                  <Icon icon='lucide:github' className='h-4 w-4' aria-hidden='true' />
                  {actions('viewCode')}
                </a>
              )
            )}
          </div>
        </header>

        <div className='group relative aspect-video w-full overflow-hidden border border-white/10 bg-slate-950 shadow-[0_35px_100px_-55px_rgba(0,251,234,0.3)]'>
          <Image
            src={project.imageUrl}
            fill
            priority
            loading='eager'
            sizes='(max-width: 1200px) 100vw, 1152px'
            alt={accessibility('projectImageAlt', { title: project.title })}
            className='object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.01]'
          />
          <div className='pointer-events-none absolute inset-0 ring-1 ring-white/5 ring-inset' />
        </div>

        <div className='grid grid-cols-1 items-start gap-8 lg:grid-cols-[1fr_380px]'>
          <div className='space-y-8'>
            <section className='border border-white/9 bg-[#050b18] p-6 shadow-[0_25px_70px_-45px_rgba(0,0,0,0.95)] md:p-8'>
              <div className='mb-5 flex items-center gap-3'>
                <div className='border-cyan-bright/20 bg-cyan-bright/7 text-cyan-bright flex h-9 w-9 items-center justify-center border'>
                  <Icon icon='lucide:scan-search' className='h-4 w-4' aria-hidden='true' />
                </div>
                <h2 className='font-space-grotesk text-xl font-bold text-slate-100'>{t('overview')}</h2>
              </div>
              <p className='font-outfit text-[15px] leading-7 font-light text-slate-300/78 md:text-base md:leading-8'>
                {projectContent(`${project.slug}.extendedDescription`)}
              </p>
            </section>

            <section className='border border-white/9 bg-[#07101f] p-6 md:p-8'>
              <div className='mb-5 flex items-center gap-3'>
                <div className='border-plasma-purple/25 bg-plasma-purple/8 flex h-9 w-9 items-center justify-center border text-purple-300'>
                  <Icon icon='lucide:list-checks' className='h-4 w-4' aria-hidden='true' />
                </div>
                <h2 className='font-space-grotesk text-xl font-bold text-slate-100'>{t('features')}</h2>
              </div>
              <ul className='grid gap-3 sm:grid-cols-2'>
                {features.map(feature => (
                  <li
                    key={feature}
                    className='font-outfit flex gap-3 border border-white/7 bg-black/15 p-4 text-sm leading-6 font-light text-slate-300/75'
                  >
                    <Icon
                      icon='lucide:check'
                      className='text-tech-teal mt-1.5 h-3.5 w-3.5 shrink-0'
                      aria-hidden='true'
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <aside className='border-plasma-purple/20 border bg-[linear-gradient(145deg,rgba(14,22,43,0.97),rgba(5,10,24,0.98))] p-5 shadow-[0_28px_80px_-48px_rgba(139,92,246,0.65)] lg:sticky lg:top-24'>
            <div className='mb-5 flex items-center gap-2 border-b border-white/8 pb-4'>
              <Icon icon='lucide:blocks' className='h-4 w-4 text-purple-300' aria-hidden='true' />
              <h2 className='font-space-grotesk text-sm font-semibold text-slate-200'>{t('stack')}</h2>
            </div>

            <div className='custom-scrollbar max-h-130 space-y-4 overflow-y-auto pr-2'>
              {project.techs.map(tech => (
                <div key={tech.key} className='border-b border-white/6 pb-4 last:border-0 last:pb-0'>
                  <div className='mb-2 flex items-center gap-2.5'>
                    <Icon icon={tech.icon} className='h-4 w-4 text-slate-400' aria-hidden='true' />
                    <h3 className='font-space-grotesk text-xs font-semibold text-slate-200'>{tech.name}</h3>
                  </div>
                  <p className='font-outfit pl-6 text-xs leading-5 font-light text-slate-400'>
                    {technologies(tech.key)}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
