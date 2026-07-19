import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

import { Icon } from '@iconify/react'

import { Link } from '@/i18n/navigation'
import { siteLinks } from '@/lib/data/SiteData'
import type { ProjectDataType } from '@/types/ProjectTypes'

type LegacyProjectCaseProps = {
  locale: string
  project: ProjectDataType
}

export async function LegacyProjectCase({ locale, project }: LegacyProjectCaseProps) {
  const actions = await getTranslations({ locale, namespace: 'common.actions' })
  const accessibility = await getTranslations({ locale, namespace: 'common.accessibility' })
  const t = await getTranslations({ locale, namespace: 'pages.projects.details' })
  const projectContent = await getTranslations({ locale, namespace: 'content.projects' })
  const technologies = await getTranslations({ locale, namespace: 'content.technologies' })
  const taxonomy = await getTranslations({ locale, namespace: 'content.taxonomy' })
  const features = projectContent.raw(`${project.slug}.features`) as string[]

  return (
    <main className='relative z-10 my-16 min-h-screen bg-[#020611]/94 px-4 py-16 text-slate-100 sm:px-6 md:my-20 md:px-12'>
      <div className='mx-auto max-w-6xl space-y-10'>
        <Link
          href={siteLinks.projects}
          className='group font-space-grotesk hover:text-cyan-bright inline-flex items-center gap-2 text-xs font-medium text-slate-500 transition-colors'
        >
          <Icon
            icon='lucide:arrow-left'
            className='h-4 w-4 transition-transform group-hover:-translate-x-0.5'
            aria-hidden='true'
          />
          {actions('backToArchive')}
        </Link>

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
              <span className='font-space-grotesk flex items-center gap-2 border border-white/8 bg-white/3 px-4 py-2.5 text-xs text-slate-600'>
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

        <div className='relative aspect-video overflow-hidden border border-white/10 bg-slate-950'>
          <Image
            src={project.imageUrl}
            fill
            priority
            sizes='(max-width: 1200px) 100vw, 1152px'
            alt={accessibility('projectImageAlt', { title: project.title })}
            className='object-cover'
          />
        </div>

        <div className='grid items-start gap-8 lg:grid-cols-[1fr_360px]'>
          <div className='space-y-8'>
            <section className='border border-white/9 bg-[#050b18] p-6 md:p-8'>
              <h2 className='font-space-grotesk mb-5 text-xl font-bold text-slate-100'>{t('overview')}</h2>
              <p className='font-outfit text-[15px] leading-7 font-light text-slate-300/78 md:text-base md:leading-8'>
                {projectContent(`${project.slug}.extendedDescription`)}
              </p>
            </section>
            <section className='border border-white/9 bg-[#07101f] p-6 md:p-8'>
              <h2 className='font-space-grotesk mb-5 text-xl font-bold text-slate-100'>{t('features')}</h2>
              <ul className='grid gap-3 sm:grid-cols-2'>
                {features.map(feature => (
                  <li
                    key={feature}
                    className='font-outfit flex gap-3 border border-white/7 bg-black/15 p-4 text-sm leading-6 text-slate-300/75'
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

          <aside className='border-plasma-purple/20 border bg-[#080d1d]/96 p-5 lg:sticky lg:top-24'>
            <h2 className='font-space-grotesk mb-5 border-b border-white/8 pb-4 text-sm font-semibold text-slate-200'>
              {t('stack')}
            </h2>
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
