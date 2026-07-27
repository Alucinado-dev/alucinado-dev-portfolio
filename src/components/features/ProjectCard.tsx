'use client'

import { useLocale } from 'next-intl'
import Image from 'next/image'

import { Icon } from '@iconify/react'

import { Link } from '@/i18n/navigation'
import { capturePortfolioEvent } from '@/lib/analytics'
import { siteLinks } from '@/lib/data/SiteData'
import type { TechDetailType } from '@/types/ProjectTypes'

export type ProjectCardAccent = 'cyan' | 'purple' | 'pink'

interface ProjectCardProps {
  slug: string
  title: string
  description: string
  imageUrl: string
  tags: TechDetailType[]
  nature: string
  scope: string
  role: string
  roleLabel: string
  accent: ProjectCardAccent
  actionLabel: string
  accessibilityLabel: string
  technologiesLabel: string
  imageAlt: string
}

const accentStyles: Record<ProjectCardAccent, { border: string; line: string; text: string; glow: string }> = {
  cyan: {
    border: 'hover:border-cyan-bright/40',
    line: 'bg-cyan-bright',
    text: 'group-hover:text-cyan-bright',
    glow: 'group-hover:bg-cyan-bright/8',
  },
  purple: {
    border: 'hover:border-plasma-purple/45',
    line: 'bg-plasma-purple',
    text: 'group-hover:text-purple-300',
    glow: 'group-hover:bg-plasma-purple/8',
  },
  pink: {
    border: 'hover:border-pink-neon/40',
    line: 'bg-pink-neon',
    text: 'group-hover:text-pink-300',
    glow: 'group-hover:bg-pink-neon/7',
  },
}

export function ProjectCard({
  slug,
  title,
  description,
  imageUrl,
  tags,
  nature,
  scope,
  role,
  roleLabel,
  accent,
  actionLabel,
  accessibilityLabel,
  technologiesLabel,
  imageAlt,
}: ProjectCardProps) {
  const colors = accentStyles[accent]
  const locale = useLocale()

  return (
    <Link
      href={siteLinks.projectDetails(slug)}
      aria-label={`${accessibilityLabel}. ${technologiesLabel}`}
      onClick={() =>
        capturePortfolioEvent({
          name: 'project_case_viewed',
          properties: { locale, slug, source: 'home' },
        })
      }
      className={`group relative flex min-h-full flex-col overflow-hidden rounded-sm border border-white/9 bg-[#050b18] shadow-[0_24px_60px_-35px_rgba(0,0,0,0.95)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#07101f] hover:shadow-[0_32px_75px_-38px_rgba(0,0,0,0.98)] ${colors.border}`}
    >
      <div
        className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ${colors.glow}`}
      />
      <div className={`absolute top-0 left-0 z-20 h-0.5 w-20 ${colors.line}`} />

      <div className='relative aspect-video w-full overflow-hidden border-b border-white/8 bg-slate-950'>
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          loading='lazy'
          sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
          className='object-cover opacity-80 grayscale-[35%] saturate-[0.7] transition-all duration-500 group-hover:scale-[1.035] group-hover:opacity-100 group-hover:grayscale-0 group-hover:saturate-100'
        />
        <div className='pointer-events-none absolute inset-0 bg-linear-to-t from-[#050b18] via-transparent to-black/20' />

        <div className='font-syne-mono absolute top-3 right-3 flex gap-1.5 text-[9px] tracking-wider uppercase'>
          <span className='border border-white/10 bg-black/70 px-2 py-1 text-slate-300 backdrop-blur-md'>{scope}</span>
          <span className='border border-white/10 bg-black/70 px-2 py-1 text-slate-400 backdrop-blur-md'>{nature}</span>
        </div>
      </div>

      <div className='relative z-10 flex flex-1 flex-col p-5'>
        <div className='mb-4 flex items-start justify-between gap-4'>
          <div className='space-y-1'>
            <h3
              className={`font-space-grotesk text-lg font-bold tracking-tight text-slate-100 transition-colors ${colors.text}`}
            >
              {title}
            </h3>
            <span className='font-syne-mono text-tech-teal/80 mt-1.5 block text-[9px] tracking-[0.12em] uppercase'>
              {roleLabel} · {role}
            </span>
          </div>
          <Icon
            icon='lucide:folder-code'
            className='h-5 w-5 shrink-0 text-slate-700 transition-colors group-hover:text-slate-400'
            aria-hidden='true'
          />
        </div>

        <p className='font-outfit line-clamp-3 text-sm leading-6 font-light text-slate-400'>{description}</p>

        <div className='mt-auto pt-6'>
          <div className='mb-4 flex flex-wrap items-center gap-2 border-t border-white/6 pt-4'>
            {tags.slice(0, 5).map(tag => (
              <span
                key={tag.key}
                title={tag.name}
                role='img'
                aria-label={tag.name}
                className='flex h-7 w-7 items-center justify-center border border-white/8 bg-white/3 text-slate-500 grayscale transition-all group-hover:border-white/12 group-hover:text-slate-300 group-hover:grayscale-0'
              >
                <Icon icon={tag.icon} className='h-4 w-4' aria-hidden='true' />
              </span>
            ))}
            {tags.length > 5 && <span className='font-syne-mono text-[10px] text-slate-400'>+{tags.length - 5}</span>}
          </div>

          <span
            className={`font-space-grotesk flex items-center justify-between text-xs font-semibold tracking-[0.08em] text-slate-300 uppercase transition-colors ${colors.text}`}
          >
            {actionLabel}
            <Icon
              icon='lucide:arrow-right'
              className='h-4 w-4 transition-transform group-hover:translate-x-1'
              aria-hidden='true'
            />
          </span>
        </div>
      </div>
    </Link>
  )
}
