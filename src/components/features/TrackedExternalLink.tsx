'use client'

import type { AnchorHTMLAttributes, PropsWithChildren } from 'react'

import { useLocale } from 'next-intl'

import { capturePortfolioEvent } from '@/lib/analytics'

type TrackedExternalLinkProps = PropsWithChildren<
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    event: 'project_live_demo_clicked' | 'project_source_clicked'
    slug: string
    source: 'archive' | 'case'
  }
>

export default function TrackedExternalLink({
  children,
  event,
  onClick,
  slug,
  source,
  ...props
}: TrackedExternalLinkProps) {
  const locale = useLocale()

  return (
    <a
      {...props}
      onClick={clickEvent => {
        onClick?.(clickEvent)
        if (event === 'project_live_demo_clicked') {
          capturePortfolioEvent({
            name: event,
            properties: { locale, slug, source: 'case' },
          })
        } else {
          capturePortfolioEvent({
            name: event,
            properties: { locale, slug, source },
          })
        }
      }}
    >
      {children}
    </a>
  )
}
