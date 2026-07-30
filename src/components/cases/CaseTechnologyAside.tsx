import { Icon } from '@iconify/react'

import MeshBackground from '@/components/backgrounds/MeshBackground'
import type { ProjectCaseTechnologyType } from '@/types/ProjectTypes'

type EcosystemItem = {
  icon: string
  label: string
}

type CaseTechnologyAsideProps = {
  titleId: string
  eyebrow: string
  title: string
  description: string
  technologies: ProjectCaseTechnologyType[]
  ecosystemTitle: string
  ecosystemItems: EcosystemItem[]
  ecosystemNote: string
}

export function CaseTechnologyAside({
  titleId,
  eyebrow,
  title,
  description,
  technologies,
  ecosystemTitle,
  ecosystemItems,
  ecosystemNote,
}: CaseTechnologyAsideProps) {
  return (
    <aside
      className='relative isolate overflow-hidden border border-rose-300/15 bg-[#080b17]/97 shadow-[0_30px_90px_-58px_rgba(109,21,50,0.8)]'
      aria-labelledby={titleId}
    >
      <MeshBackground
        background='#080b17'
        points={[
          { color: '#6d1532', x: 5, y: 5, spread: 55, opacity: 0.18 },
          { color: '#0ea5e9', x: 100, y: 60, spread: 52, opacity: 0.08 },
        ]}
        zIndex={-1}
      />
      <div className='border-b border-white/8 p-5'>
        <p className='font-syne-mono mb-2 text-[9px] tracking-[0.16em] text-rose-200/60 uppercase'>{eyebrow}</p>
        <h2 id={titleId} className='font-space-grotesk text-lg font-semibold text-slate-100'>
          {title}
        </h2>
        <p className='font-outfit mt-2 text-xs leading-5 text-slate-400'>{description}</p>
      </div>

      <div className='grid grid-cols-2 gap-2 p-3'>
        {technologies.map(({ tech }) => (
          <article
            key={tech.key}
            className='group flex min-h-12 items-center gap-3 border border-white/7 bg-black/16 p-2.5 transition-colors hover:border-white/12 hover:bg-white/[0.035]'
          >
            <span className='flex h-8 w-8 shrink-0 items-center justify-center border border-white/8 bg-black/25'>
              <Icon
                icon={tech.icon}
                className='h-4 w-4 text-slate-300 transition-colors group-hover:text-cyan-200'
                aria-hidden='true'
              />
            </span>
            <h3 className='font-space-grotesk text-[11px] leading-4 font-medium text-slate-200'>{tech.name}</h3>
          </article>
        ))}
      </div>

      <div className='border-t border-white/8 bg-black/18 p-5'>
        <p className='font-syne-mono mb-3 text-[9px] tracking-[0.15em] text-slate-500 uppercase'>{ecosystemTitle}</p>
        <div className='flex flex-wrap gap-2'>
          {ecosystemItems.map(item => (
            <span
              key={item.label}
              className='font-outfit flex items-center gap-2 border border-white/8 bg-white/[0.025] px-2.5 py-2 text-[11px] text-slate-400'
            >
              <Icon icon={item.icon} className='h-3.5 w-3.5' aria-hidden='true' />
              {item.label}
            </span>
          ))}
        </div>
        <p className='font-outfit mt-3 text-[11px] leading-5 text-slate-500'>{ecosystemNote}</p>
      </div>
    </aside>
  )
}
