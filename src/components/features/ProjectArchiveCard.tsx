'use client'

import { useLocale } from 'next-intl'
import Image from 'next/image'

import { Icon } from '@iconify/react'

import TrackedExternalLink from '@/components/features/TrackedExternalLink'
import { Link } from '@/i18n/navigation'
import { capturePortfolioEvent } from '@/lib/analytics'
import { siteLinks } from '@/lib/data/SiteData'
import type { ProjectDataType } from '@/types/ProjectTypes'

interface ProjectArchiveCardProps {
  project: ProjectDataType
  description: string
  nature: string
  scope: string
  role: string
  roleLabel: string
  viewLabel: string
  codeLabel: string
  privateLabel: string
  imageAlt: string
  eagerImage?: boolean
}

export function ProjectArchiveCard({
  project,
  description,
  nature,
  scope,
  role,
  roleLabel,
  viewLabel,
  codeLabel,
  privateLabel,
  imageAlt,
  eagerImage = false,
}: ProjectArchiveCardProps) {
  const locale = useLocale()

  return (
    <article className='group hover:border-cyan-bright/25 relative flex min-h-105 flex-col overflow-hidden border border-white/9 bg-[#050b18] shadow-[0_28px_75px_-45px_rgba(0,0,0,0.95)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#071120]'>
      <div className='relative aspect-video overflow-hidden border-b border-white/7 bg-black/30'>
        <Image
          src={project.imageUrl}
          alt={imageAlt}
          fill
          loading={eagerImage ? 'eager' : 'lazy'}
          sizes='(max-width: 768px) 100vw, 50vw'
          className='object-cover opacity-75 grayscale-[35%] saturate-[0.7] transition-all duration-500 group-hover:scale-[1.025] group-hover:opacity-100 group-hover:grayscale-0 group-hover:saturate-100'
        />
        <div className='absolute inset-0 bg-linear-to-t from-[#050b18] via-transparent to-black/15' />
        <div className='font-syne-mono absolute top-3 right-3 flex gap-1.5 text-[9px] uppercase'>
          <span className='border-cyan-bright/20 border bg-black/70 px-2 py-1 text-cyan-200 backdrop-blur-md'>
            {scope}
          </span>
          <span className='border border-white/10 bg-black/70 px-2 py-1 text-slate-300 backdrop-blur-md'>{nature}</span>
        </div>
      </div>

      <div className='flex flex-1 flex-col p-5'>
        <div className='mb-4 flex items-start justify-between gap-4'>
          <div>
            <span className='font-syne-mono text-[9px] tracking-[0.16em] text-slate-400'>{project.id}</span>
            <h2 className='font-asimovian mt-1 text-xl font-normal text-slate-100 transition-colors group-hover:text-cyan-100'>
              {project.title}
            </h2>
            <p className='font-syne-mono text-tech-teal mt-1.5 text-[9px] tracking-[0.12em] uppercase'>
              {roleLabel} · {role}
            </p>
          </div>
          <Icon icon='lucide:folder-code' className='h-5 w-5 text-slate-700' aria-hidden='true' />
        </div>

        <p className='font-outfit line-clamp-3 text-sm leading-6 font-light text-slate-400'>{description}</p>

        <div className='mt-auto pt-6'>
          <div className='mb-5 flex flex-wrap gap-2 border-t border-white/6 pt-4'>
            {project.techs.map(tech => (
              <span
                key={tech.key}
                title={tech.name}
                className='flex h-7 w-7 items-center justify-center border border-white/8 bg-white/3 text-slate-300 transition-all hover:border-white/15 hover:bg-white/6'
              >
                <Icon
                  icon={tech.icon}
                  className='h-4 w-4'
                  style={{ color: tech.color, fill: tech.color }}
                  aria-hidden='true'
                />
                <span className='sr-only'>{tech.name}</span>
              </span>
            ))}
          </div>

          <div className='flex items-center justify-between gap-3'>
            {project.links.isPrivateGithub ? (
              <span
                className='font-space-grotesk flex items-center gap-1.5 text-xs text-slate-400'
                title={privateLabel}
              >
                <Icon icon='lucide:lock-keyhole' className='h-3.5 w-3.5' aria-hidden='true' />
                {privateLabel}
              </span>
            ) : (
              project.links.github && (
                <TrackedExternalLink
                  href={project.links.github}
                  target='_blank'
                  rel='noreferrer'
                  event='project_source_clicked'
                  slug={project.slug}
                  source='archive'
                  aria-label={`${codeLabel}: ${project.title}`}
                  className='font-space-grotesk flex items-center gap-1.5 text-xs text-slate-400 transition-colors hover:text-purple-300'
                >
                  <Icon icon='lucide:github' className='h-3.5 w-3.5' aria-hidden='true' />
                  {codeLabel}
                </TrackedExternalLink>
              )
            )}

            <Link
              href={siteLinks.projectDetails(project.slug)}
              aria-label={`${viewLabel}: ${project.title}`}
              onClick={() =>
                capturePortfolioEvent({
                  name: 'project_case_viewed',
                  properties: { locale, slug: project.slug, source: 'archive' },
                })
              }
              className='group/action font-space-grotesk border-cyan-bright/20 bg-cyan-bright/6 hover:bg-cyan-bright/11 flex items-center gap-2 border px-3 py-2 text-xs font-semibold text-cyan-100 transition-colors'
            >
              {viewLabel}
              <Icon
                icon='lucide:arrow-right'
                className='h-3.5 w-3.5 transition-transform group-hover/action:translate-x-0.5'
                aria-hidden='true'
              />
            </Link>
          </div>
        </div>
      </div>
    </article>
  )
}
