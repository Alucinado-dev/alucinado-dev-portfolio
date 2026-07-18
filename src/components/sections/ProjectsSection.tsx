import { getTranslations } from 'next-intl/server'
import Link from 'next/link'

import { Icon } from '@iconify/react'

import MeshBackground from '@/components/backgrounds/MeshBackground'
import Container from '@/components/container/Container'
import { ProjectCard, type ProjectCardAccent } from '@/components/features/ProjectCard'
import { projects } from '@/lib/data/ProjectData'
import { siteLinks } from '@/lib/data/SiteData'

const projectAccents: ProjectCardAccent[] = ['cyan', 'purple', 'pink']
const projectsMesh = [
  { color: '#312e81', x: 92, y: 8, spread: 42, opacity: 0.13 },
  { color: '#0e7490', x: 4, y: 92, spread: 38, opacity: 0.09 },
]

export default async function ProjectsSection() {
  const t = await getTranslations('pages.home.projects')
  const actions = await getTranslations('common.actions')
  const accessibility = await getTranslations('common.accessibility')
  const projectContent = await getTranslations('content.projects')
  const taxonomy = await getTranslations('content.taxonomy')

  return (
    <section
      id='projetos'
      aria-label={t('accessibility.sectionLabel')}
      className='relative z-10 w-full scroll-mt-20 bg-transparent py-10 md:py-14'
    >
      <Container className='relative overflow-hidden border border-white/10 bg-[#030817]/86 p-6 shadow-[0_34px_86px_-48px_rgba(0,0,0,0.96)] backdrop-blur-xl sm:p-8 md:p-12'>
        <MeshBackground points={projectsMesh} background='transparent' className='opacity-80' />
        <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-size-[36px_36px]' />

        <div className='relative z-10 space-y-10'>
          <header className='flex flex-col gap-5 border-b border-white/8 pb-8 md:flex-row md:items-end md:justify-between'>
            <div className='max-w-2xl space-y-3'>
              <div className='font-syne-mono text-plasma-purple flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase'>
                <Icon icon='lucide:folder-kanban' className='h-4 w-4' aria-hidden='true' />
                {t('eyebrow')}
              </div>
              <h2 className='font-space-grotesk text-2xl font-bold tracking-tight text-slate-50 md:text-3xl'>
                {t('title')}
              </h2>
            </div>
            <p className='font-outfit max-w-xl text-sm leading-6 font-light text-slate-300/75 md:text-right'>
              {t('description')}
            </p>
          </header>

          <div className='grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3'>
            {projects.slice(0, 3).map((project, index) => (
              <ProjectCard
                key={project.id}
                slug={project.slug}
                title={project.title}
                description={projectContent(`${project.slug}.description`)}
                imageUrl={project.imageUrl}
                nature={taxonomy(`nature.${project.nature}`)}
                scope={taxonomy(`scope.${project.scope}`)}
                role={taxonomy(`role.${project.role}`)}
                roleLabel={t('card.roleLabel')}
                tags={project.techs}
                accent={projectAccents[index]}
                actionLabel={t('card.viewDetails')}
                accessibilityLabel={accessibility('projectDetails', { title: project.title })}
                technologiesLabel={t('card.technologiesLabel', {
                  technologies: project.techs
                    .slice(0, 5)
                    .map(tech => tech.name)
                    .join(', '),
                })}
                imageAlt={accessibility('projectImageAlt', { title: project.title })}
              />
            ))}
          </div>

          <div className='flex justify-center pt-1'>
            <Link
              href={siteLinks.projects}
              className='group font-space-grotesk hover:border-cyan-bright/35 hover:bg-cyan-bright/6 hover:text-cyan-bright flex items-center gap-2 border border-white/12 bg-white/4 px-5 py-3 text-xs font-semibold tracking-[0.08em] text-slate-300 uppercase transition-all'
            >
              {actions('viewArchive')}
              <Icon
                icon='lucide:arrow-up-right'
                className='h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                aria-hidden='true'
              />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
