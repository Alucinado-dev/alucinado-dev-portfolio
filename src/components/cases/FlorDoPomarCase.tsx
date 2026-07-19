import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

import { Icon } from '@iconify/react'

import MeshBackground from '@/components/backgrounds/MeshBackground'
import { CaseReveal } from '@/components/cases/CaseReveal'
import { CaseSectionHeading } from '@/components/cases/CaseSectionHeading'
import { CaseTechnologyAside } from '@/components/cases/CaseTechnologyAside'
import { Link } from '@/i18n/navigation'
import { getProjectCaseStudy } from '@/lib/data/CaseStudyData'
import { projects } from '@/lib/data/ProjectData'
import { siteLinks } from '@/lib/data/SiteData'
import type { ProjectDataType } from '@/types/ProjectTypes'

type FlorDoPomarCaseProps = {
  locale: string
  project: ProjectDataType
}

type ProofItem = {
  icon: string
  title: string
  description: string
}

type ContributionItem = {
  title: string
  description: string
}

export async function FlorDoPomarCase({ locale, project }: FlorDoPomarCaseProps) {
  const caseStudy = getProjectCaseStudy(project.slug)
  const t = await getTranslations({ locale, namespace: 'content.projects.flor-do-pomar.case' })
  const actions = await getTranslations({ locale, namespace: 'common.actions' })
  const accessibility = await getTranslations({ locale, namespace: 'common.accessibility' })
  const taxonomy = await getTranslations({ locale, namespace: 'content.taxonomy' })
  const proofs = t.raw('proof.items') as ProofItem[]
  const contributions = t.raw('contribution.items') as ContributionItem[]
  const nextProject = projects.find(item => item.slug === caseStudy.nextProjectSlug)

  return (
    <main className='relative z-10 -mx-4 min-h-screen overflow-x-clip bg-[#020611]/96 px-4 pb-24 text-slate-100'>
      <div className='mx-auto max-w-6xl pt-12 md:pt-16'>
        <CaseReveal immediate>
          <Link
            href={siteLinks.projects}
            className='group font-space-grotesk hover:text-cyan-bright focus-visible:ring-cyan-bright/60 mb-8 inline-flex items-center gap-2 text-xs font-medium text-slate-400 transition-colors focus-visible:ring-2 focus-visible:outline-none'
          >
            <Icon
              icon='lucide:arrow-left'
              className='h-4 w-4 transition-transform group-hover:-translate-x-0.5'
              aria-hidden='true'
            />
            {actions('backToArchive')}
          </Link>
        </CaseReveal>

        <CaseReveal immediate delay={0.08}>
          <header className='relative isolate overflow-hidden border border-white/10 bg-[#050913]/88 shadow-[0_34px_100px_-58px_rgba(0,0,0,0.95)]'>
            <MeshBackground
              background='#040711'
              points={[
                { color: '#6d1532', x: 8, y: 18, spread: 48, opacity: 0.24 },
                { color: '#0ea5e9', x: 92, y: 16, spread: 44, opacity: 0.13 },
                { color: '#8b5cf6', x: 70, y: 94, spread: 42, opacity: 0.1 },
              ]}
              zIndex={-1}
            />

            <div className='grid gap-9 px-6 py-8 sm:px-8 md:px-10 md:py-11 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-center'>
              <div className='max-w-3xl space-y-5'>
                <div className='font-syne-mono flex flex-wrap items-center gap-2 text-[9px] tracking-[0.15em] uppercase'>
                  <span className='text-slate-500'>{t('hero.eyebrow')}</span>
                  <span className='text-white/20'>/</span>
                  <span className='text-rose-200/80'>{taxonomy(`nature.${project.nature}`)}</span>
                  <span className='text-white/20'>/</span>
                  <span className='text-cyan-200'>{taxonomy(`role.${project.role}`)}</span>
                </div>

                <div className='space-y-4'>
                  <h1 className='font-space-grotesk text-4xl leading-none font-bold tracking-[-0.04em] text-slate-50 sm:text-5xl md:text-6xl'>
                    {project.title}
                  </h1>
                  <p className='font-outfit max-w-2xl text-base leading-7 font-light text-slate-200/78 md:text-lg md:leading-8'>
                    {t('hero.description')}
                  </p>
                </div>

                <div className='font-syne-mono flex items-center gap-2 text-[10px] tracking-[0.12em] text-emerald-300 uppercase'>
                  <Icon icon='lucide:circle-check-big' className='h-4 w-4' aria-hidden='true' />
                  {t('hero.status')}
                </div>
              </div>

              <div className='border border-white/9 bg-black/18 p-4 backdrop-blur-sm'>
                <p className='font-syne-mono mb-3 text-[9px] tracking-[0.16em] text-slate-500 uppercase'>
                  {t('hero.accessTitle')}
                </p>
                <a
                  href={project.links.live}
                  target='_blank'
                  rel='noreferrer'
                  aria-label={accessibility('externalProject', { title: project.title })}
                  className='font-space-grotesk border-cyan-bright/35 bg-cyan-bright/10 hover:bg-cyan-bright/16 focus-visible:ring-cyan-bright/60 flex min-h-11 w-full items-center justify-between gap-3 border px-4 py-3 text-xs font-semibold text-cyan-50 transition-colors focus-visible:ring-2 focus-visible:outline-none'
                >
                  {actions('liveDemo')}
                  <Icon icon='lucide:external-link' className='h-4 w-4' aria-hidden='true' />
                </a>
                <div className='mt-4 border-t border-white/8 pt-4'>
                  <div className='flex items-center gap-2 text-slate-300'>
                    <Icon icon='lucide:lock-keyhole' className='h-4 w-4 text-slate-500' aria-hidden='true' />
                    <p className='font-space-grotesk text-xs font-medium'>{actions('privateRepository')}</p>
                  </div>
                  <p className='font-outfit mt-2 text-xs leading-5 text-slate-500'>{t('hero.privateRepositoryHelp')}</p>
                </div>
              </div>
            </div>

            <div className='grid border-t border-white/8 sm:grid-cols-3'>
              {proofs.map(item => (
                <div
                  key={item.title}
                  className='border-b border-white/8 px-6 py-5 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0'
                >
                  <div className='mb-2 flex items-center gap-2'>
                    <Icon icon={item.icon} className='text-tech-teal h-4 w-4' aria-hidden='true' />
                    <p className='font-space-grotesk text-xs font-semibold text-slate-200'>{item.title}</p>
                  </div>
                  <p className='font-outfit text-xs leading-5 text-slate-500'>{item.description}</p>
                </div>
              ))}
            </div>
          </header>
        </CaseReveal>

        <CaseReveal className='mt-8 md:mt-10'>
          <figure className='overflow-hidden border border-white/10 bg-black/30 shadow-[0_36px_100px_-62px_rgba(0,251,234,0.35)]'>
            <div className='relative aspect-[2/1] min-h-64 overflow-hidden'>
              <Image
                src={caseStudy.media[0].src}
                fill
                priority
                sizes='(max-width: 1200px) 100vw, 1152px'
                alt={t(`media.alt.${caseStudy.media[0].altKey}`)}
                className='object-cover'
              />
              <div className='pointer-events-none absolute inset-0 bg-gradient-to-t from-[#020611]/35 via-transparent to-transparent' />
            </div>
            <figcaption className='font-outfit flex items-start gap-3 border-t border-white/8 bg-[#050913] px-5 py-4 text-xs leading-5 text-slate-400 md:px-6'>
              <Icon icon='lucide:scan-eye' className='text-tech-teal mt-0.5 h-4 w-4 shrink-0' aria-hidden='true' />
              {t(`media.caption.${caseStudy.media[0].captionKey}`)}
            </figcaption>
          </figure>
        </CaseReveal>

        <div className='mt-16 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_340px] xl:gap-14'>
          <div className='order-last space-y-16 md:space-y-20 lg:order-none'>
            <CaseReveal>
              <section aria-labelledby='case-context-title'>
                <CaseSectionHeading id='case-context-title' eyebrow={t('context.eyebrow')} title={t('context.title')} />
                <div className='font-outfit max-w-3xl space-y-4 text-[15px] leading-7 font-light text-slate-300/78 md:text-base md:leading-8'>
                  <p>{t('context.paragraphOne')}</p>
                  <p>{t('context.paragraphTwo')}</p>
                </div>
              </section>
            </CaseReveal>

            <CaseReveal>
              <section aria-labelledby='case-contribution-title'>
                <CaseSectionHeading
                  id='case-contribution-title'
                  eyebrow={t('contribution.eyebrow')}
                  title={t('contribution.title')}
                />
                <p className='font-outfit mb-7 max-w-3xl text-[15px] leading-7 text-slate-300/75 md:text-base md:leading-8'>
                  {t('contribution.description')}
                </p>
                <div className='border-y border-white/8'>
                  {contributions.map(item => (
                    <article
                      key={item.title}
                      className='grid gap-2 border-b border-white/8 py-5 last:border-b-0 sm:grid-cols-[170px_minmax(0,1fr)] sm:gap-7'
                    >
                      <h3 className='font-space-grotesk text-sm font-semibold text-slate-100'>{item.title}</h3>
                      <p className='font-outfit text-sm leading-6 text-slate-400'>{item.description}</p>
                    </article>
                  ))}
                </div>
                <div className='mt-5 grid gap-2 border-l border-white/14 pl-4 sm:grid-cols-[72px_minmax(0,1fr)] sm:gap-4'>
                  <span className='font-syne-mono pt-0.5 text-[9px] tracking-[0.15em] text-slate-500 uppercase'>
                    {t('contribution.scopeLabel')}
                  </span>
                  <p className='font-outfit text-xs leading-5 text-slate-400'>{t('contribution.boundary')}</p>
                </div>
              </section>
            </CaseReveal>

            <CaseReveal>
              <section aria-labelledby='case-decisions-title'>
                <CaseSectionHeading
                  id='case-decisions-title'
                  eyebrow={t('technicalDecisions.eyebrow')}
                  title={t('technicalDecisions.title')}
                />
                <p className='font-outfit mb-7 max-w-3xl text-[15px] leading-7 text-slate-300/75 md:text-base md:leading-8'>
                  {t('technicalDecisions.description')}
                </p>
                <div className='border-y border-white/8'>
                  {caseStudy.decisionGroups.map(group => {
                    const groupTechnologies = group.technologyKeys
                      .map(technologyKey => caseStudy.technologies.find(item => item.tech.key === technologyKey)?.tech)
                      .filter(technology => technology !== undefined)

                    return (
                      <article
                        key={group.key}
                        className='grid gap-4 border-b border-white/8 py-6 last:border-b-0 md:grid-cols-[190px_minmax(0,1fr)] md:gap-8'
                      >
                        <div>
                          <div className='mb-3 flex items-center gap-2'>
                            <Icon icon={group.icon} className='text-tech-teal h-4 w-4' aria-hidden='true' />
                            <h3 className='font-space-grotesk text-sm font-semibold text-slate-100'>
                              {t(`technicalDecisions.items.${group.key}.title`)}
                            </h3>
                          </div>
                          <div className='flex flex-wrap gap-1.5'>
                            {groupTechnologies.map(technology => (
                              <span
                                key={technology.key}
                                className='font-syne-mono border border-white/8 bg-white/[0.025] px-2 py-1 text-[9px] tracking-[0.08em] text-slate-500 uppercase'
                              >
                                {technology.name}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className='font-outfit text-sm leading-7 text-slate-400'>
                          {t(`technicalDecisions.items.${group.key}.description`)}
                        </p>
                      </article>
                    )
                  })}
                </div>
              </section>
            </CaseReveal>

            <CaseReveal>
              <section aria-labelledby='case-gallery-title'>
                <CaseSectionHeading id='case-gallery-title' eyebrow={t('gallery.eyebrow')} title={t('gallery.title')} />
                <p className='font-outfit mb-7 max-w-3xl text-[15px] leading-7 text-slate-300/75 md:text-base md:leading-8'>
                  {t('gallery.description')}
                </p>
                <figure className='overflow-hidden border border-white/9 bg-[#050913]'>
                  <Image
                    src={caseStudy.media[1].src}
                    width={caseStudy.media[1].width}
                    height={caseStudy.media[1].height}
                    loading='eager'
                    sizes='(max-width: 1024px) 100vw, 760px'
                    alt={t(`media.alt.${caseStudy.media[1].altKey}`)}
                    className='h-auto w-full'
                  />
                  <figcaption className='font-outfit flex gap-3 border-t border-white/8 px-5 py-4 text-xs leading-5 text-slate-400'>
                    <Icon icon='lucide:images' className='text-tech-teal mt-0.5 h-4 w-4 shrink-0' aria-hidden='true' />
                    {t(`media.caption.${caseStudy.media[1].captionKey}`)}
                  </figcaption>
                </figure>
              </section>
            </CaseReveal>

            <CaseReveal>
              <section aria-labelledby='case-contact-title'>
                <CaseSectionHeading id='case-contact-title' eyebrow={t('contact.eyebrow')} title={t('contact.title')} />
                <p className='font-outfit mb-7 max-w-3xl text-[15px] leading-7 text-slate-300/75 md:text-base md:leading-8'>
                  {t('contact.description')}
                </p>
                <figure className='overflow-hidden border border-white/9 bg-[#050913]'>
                  <Image
                    src={caseStudy.media[2].src}
                    width={caseStudy.media[2].width}
                    height={caseStudy.media[2].height}
                    loading='eager'
                    sizes='(max-width: 1024px) 100vw, 760px'
                    alt={t(`media.alt.${caseStudy.media[2].altKey}`)}
                    className='h-auto w-full'
                  />
                  <figcaption className='font-outfit flex gap-3 border-t border-white/8 px-5 py-4 text-xs leading-5 text-slate-400'>
                    <Icon
                      icon='lucide:mouse-pointer-2'
                      className='text-tech-teal mt-0.5 h-4 w-4 shrink-0'
                      aria-hidden='true'
                    />
                    {t(`media.caption.${caseStudy.media[2].captionKey}`)}
                  </figcaption>
                </figure>
              </section>
            </CaseReveal>

            <CaseReveal>
              <section
                className='relative overflow-hidden border border-white/9 bg-[#050913]/92 p-6 md:p-8'
                aria-labelledby='case-outcome-title'
              >
                <div className='bg-tech-teal/60 absolute inset-y-0 left-0 w-px' aria-hidden='true' />
                <CaseSectionHeading id='case-outcome-title' eyebrow={t('outcome.eyebrow')} title={t('outcome.title')} />
                <div className='font-outfit max-w-3xl space-y-4 text-[15px] leading-7 text-slate-300/75 md:text-base md:leading-8'>
                  <p>{t('outcome.paragraphOne')}</p>
                  <p>{t('outcome.paragraphTwo')}</p>
                </div>
              </section>
            </CaseReveal>
          </div>

          <CaseReveal className='order-first lg:sticky lg:top-24 lg:order-none'>
            <CaseTechnologyAside
              titleId='case-stack-title'
              eyebrow={t('stack.eyebrow')}
              title={t('stack.title')}
              description={t('stack.description')}
              technologies={caseStudy.technologies}
              ecosystemTitle={t('stack.ecosystem.title')}
              ecosystemItems={caseStudy.ecosystem.map(item => ({
                icon: item.icon,
                label: t(`stack.ecosystem.items.${item.labelKey}`),
              }))}
              ecosystemNote={t('stack.ecosystem.note')}
            />
          </CaseReveal>
        </div>

        <CaseReveal className='mt-16 md:mt-20'>
          <nav aria-label={t('navigation.label')} className='grid border border-white/9 bg-[#050913]/90 sm:grid-cols-2'>
            <Link
              href={siteLinks.projects}
              className='group focus-visible:ring-cyan-bright/60 flex min-h-28 flex-col justify-center gap-2 border-b border-white/8 px-6 py-5 transition-colors hover:bg-white/[0.025] focus-visible:ring-2 focus-visible:outline-none sm:border-r sm:border-b-0'
            >
              <span className='font-syne-mono text-[9px] tracking-[0.14em] text-slate-500 uppercase'>
                {t('navigation.archiveLabel')}
              </span>
              <span className='font-space-grotesk flex items-center gap-2 text-sm font-semibold text-slate-200'>
                <Icon
                  icon='lucide:arrow-left'
                  className='h-4 w-4 transition-transform group-hover:-translate-x-1'
                  aria-hidden='true'
                />
                {actions('backToArchive')}
              </span>
            </Link>
            {nextProject && (
              <Link
                href={siteLinks.projectDetails(nextProject.slug)}
                className='group focus-visible:ring-plasma-purple/60 flex min-h-28 flex-col items-end justify-center gap-2 px-6 py-5 text-right transition-colors hover:bg-white/[0.025] focus-visible:ring-2 focus-visible:outline-none'
              >
                <span className='font-syne-mono text-[9px] tracking-[0.14em] text-slate-500 uppercase'>
                  {t('navigation.nextLabel')}
                </span>
                <span className='font-space-grotesk flex items-center gap-2 text-sm font-semibold text-slate-200'>
                  {nextProject.title}
                  <Icon
                    icon='lucide:arrow-right'
                    className='h-4 w-4 transition-transform group-hover:translate-x-1'
                    aria-hidden='true'
                  />
                </span>
              </Link>
            )}
          </nav>
        </CaseReveal>
      </div>
    </main>
  )
}
