'use client'

import { useMemo, useState } from 'react'

import { useTranslations } from 'next-intl'

import { Icon } from '@iconify/react'

import { ProjectArchiveCard } from '@/components/features/ProjectArchiveCard'
import { projects } from '@/lib/data/ProjectData'
import type { ProjectNatureType, ProjectScopeType } from '@/types/ProjectTypes'

const natureOptions: (ProjectNatureType | 'all')[] = ['all', 'autoral', 'colaborativo', 'freelancer']
const scopeOptions: (ProjectScopeType | 'all')[] = ['all', 'frontend', 'backend', 'fullstack']

export default function ProjectsArchivePage() {
  const [activeNature, setActiveNature] = useState<ProjectNatureType | 'all'>('all')
  const [activeScope, setActiveScope] = useState<ProjectScopeType | 'all'>('all')
  const t = useTranslations('pages.projects.archive')
  const pageAccessibility = useTranslations('pages.projects.accessibility')
  const actions = useTranslations('common.actions')
  const accessibility = useTranslations('common.accessibility')
  const taxonomy = useTranslations('content.taxonomy')
  const projectContent = useTranslations('content.projects')

  const filteredProjects = useMemo(
    () =>
      projects.filter(project => {
        const matchesNature = activeNature === 'all' || project.nature === activeNature
        const matchesScope = activeScope === 'all' || project.scope === activeScope
        return matchesNature && matchesScope
      }),
    [activeNature, activeScope],
  )

  const getNatureCount = (nature: ProjectNatureType | 'all') =>
    projects.filter(project => {
      const matchesNature = nature === 'all' || project.nature === nature
      const matchesCurrentScope = activeScope === 'all' || project.scope === activeScope
      return matchesNature && matchesCurrentScope
    }).length

  const getScopeCount = (scope: ProjectScopeType | 'all') =>
    projects.filter(project => {
      const matchesScope = scope === 'all' || project.scope === scope
      const matchesCurrentNature = activeNature === 'all' || project.nature === activeNature
      return matchesScope && matchesCurrentNature
    }).length

  const natureLabel = (nature: ProjectNatureType | 'all') =>
    nature === 'all' ? t('filters.all') : taxonomy(`nature.${nature}`)

  const scopeLabel = (scope: ProjectScopeType | 'all') =>
    scope === 'all' ? t('filters.all') : taxonomy(`scope.${scope}`)

  const resetFilters = () => {
    setActiveNature('all')
    setActiveScope('all')
  }

  return (
    <main
      aria-label={pageAccessibility('archiveLabel')}
      className='relative z-10 my-12 min-h-screen px-4 py-14 text-slate-100 sm:px-6 md:my-16 md:px-12 md:py-16'
    >
      <div className='mx-auto max-w-6xl space-y-10'>
        <header className='grid gap-6 border-b border-white/8 pb-8 md:grid-cols-[1fr_auto] md:items-end'>
          <div className='max-w-3xl space-y-3'>
            <div className='font-syne-mono text-cyan-bright/75 flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase'>
              <Icon icon='lucide:folder-git-2' className='h-4 w-4' aria-hidden='true' />
              {t('eyebrow')}
            </div>
            <h1 className='font-space-grotesk text-3xl font-bold tracking-tight text-slate-50 md:text-4xl'>
              {t('title')}
            </h1>
            <p className='font-outfit max-w-2xl text-sm leading-6 font-light text-slate-300/70 md:text-base md:leading-7'>
              {t('description')}
            </p>
          </div>

          <div className='flex flex-col items-start gap-2 md:items-end'>
            <div className='font-syne-mono border-tech-teal/20 bg-tech-teal/6 text-tech-teal flex items-center gap-2 border px-3 py-2 text-[10px] tracking-[0.12em] uppercase'>
              <Icon icon='lucide:layers-3' className='h-3.5 w-3.5' aria-hidden='true' />
              {t('results', { count: filteredProjects.length })}
            </div>
            <div className='font-syne-mono flex items-center gap-2 text-[9px] tracking-[0.12em] text-slate-500 uppercase'>
              <Icon icon='lucide:construction' className='h-3.5 w-3.5 text-amber-400/70' aria-hidden='true' />
              {t('building')}
            </div>
          </div>
        </header>

        <section
          aria-label={pageAccessibility('filtersLabel')}
          className='relative overflow-hidden border border-white/10 bg-[#07101f] p-5 shadow-[0_24px_65px_-42px_rgba(0,0,0,0.96)] md:p-6'
        >
          <div className='bg-plasma-purple/55 pointer-events-none absolute inset-y-0 left-0 w-px' />

          <div className='grid gap-6 lg:grid-cols-2'>
            <fieldset className='space-y-3'>
              <legend className='font-syne-mono flex items-center gap-2 text-[10px] tracking-[0.16em] text-slate-500 uppercase'>
                <Icon icon='lucide:shapes' className='h-3.5 w-3.5' aria-hidden='true' />
                {t('filters.nature')}
              </legend>
              <div className='flex flex-wrap gap-2'>
                {natureOptions.map(nature => {
                  const isActive = activeNature === nature
                  return (
                    <button
                      key={nature}
                      type='button'
                      aria-pressed={isActive}
                      onClick={() => setActiveNature(nature)}
                      className={`font-space-grotesk focus-visible:ring-cyan-bright/60 flex items-center gap-2 border px-3 py-2 text-xs font-medium transition-all focus-visible:ring-2 focus-visible:outline-none ${
                        isActive
                          ? 'border-cyan-bright/35 bg-cyan-bright/10 text-cyan-100 shadow-[0_0_18px_rgba(0,251,234,0.07)]'
                          : 'border-white/8 bg-black/18 text-slate-400 hover:border-white/16 hover:bg-white/5 hover:text-slate-200'
                      }`}
                    >
                      {natureLabel(nature)}
                      <span className={`font-syne-mono text-[9px] ${isActive ? 'text-cyan-bright' : 'text-slate-600'}`}>
                        {getNatureCount(nature)}
                      </span>
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <fieldset className='space-y-3'>
              <legend className='font-syne-mono flex items-center gap-2 text-[10px] tracking-[0.16em] text-slate-500 uppercase'>
                <Icon icon='lucide:panels-top-left' className='h-3.5 w-3.5' aria-hidden='true' />
                {t('filters.scope')}
              </legend>
              <div className='flex flex-wrap gap-2'>
                {scopeOptions.map(scope => {
                  const isActive = activeScope === scope
                  return (
                    <button
                      key={scope}
                      type='button'
                      aria-pressed={isActive}
                      onClick={() => setActiveScope(scope)}
                      className={`font-space-grotesk focus-visible:ring-plasma-purple/60 flex items-center gap-2 border px-3 py-2 text-xs font-medium transition-all focus-visible:ring-2 focus-visible:outline-none ${
                        isActive
                          ? 'border-plasma-purple/40 bg-plasma-purple/12 text-purple-100 shadow-[0_0_18px_rgba(139,92,246,0.09)]'
                          : 'border-white/8 bg-black/18 text-slate-400 hover:border-white/16 hover:bg-white/5 hover:text-slate-200'
                      }`}
                    >
                      {scopeLabel(scope)}
                      <span className={`font-syne-mono text-[9px] ${isActive ? 'text-purple-300' : 'text-slate-600'}`}>
                        {getScopeCount(scope)}
                      </span>
                    </button>
                  )
                })}
              </div>
            </fieldset>
          </div>
        </section>

        {filteredProjects.length === 0 ? (
          <div className='border border-dashed border-white/12 bg-[#050b17] p-10 text-center'>
            <Icon icon='lucide:search-x' className='mx-auto mb-4 h-8 w-8 text-slate-600' aria-hidden='true' />
            <h2 className='font-space-grotesk text-base font-semibold text-slate-300'>{t('empty.title')}</h2>
            <p className='font-outfit mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500'>
              {t('empty.description')}
            </p>
            <button
              type='button'
              onClick={resetFilters}
              className='font-space-grotesk border-cyan-bright/25 bg-cyan-bright/7 hover:bg-cyan-bright/12 mt-5 border px-4 py-2 text-xs font-semibold text-cyan-200 transition-colors'
            >
              {actions('resetFilters')}
            </button>
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
            {filteredProjects.map((project, index) => (
              <ProjectArchiveCard
                key={project.id}
                project={project}
                description={projectContent(`${project.slug}.description`)}
                nature={taxonomy(`nature.${project.nature}`)}
                scope={taxonomy(`scope.${project.scope}`)}
                role={taxonomy(`role.${project.role}`)}
                roleLabel={t('roleLabel')}
                viewLabel={actions('viewCase')}
                codeLabel={actions('viewCode')}
                privateLabel={actions('privateRepository')}
                imageAlt={accessibility('projectImageAlt', { title: project.title })}
                eagerImage={index < 2}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
