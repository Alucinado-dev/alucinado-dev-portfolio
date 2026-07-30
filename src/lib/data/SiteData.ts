function publicUrl(value: string | undefined) {
  const candidate = value?.trim()
  if (!candidate) return null

  try {
    const url = new URL(candidate)
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : null
  } catch {
    return null
  }
}

function publicEmail(value: string | undefined) {
  const candidate = value?.trim()
  return candidate && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate) ? candidate : null
}

export const siteContact = {
  email: publicEmail(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
} as const

export const siteLinks = {
  home: '/',
  about: '/about',
  projects: '/projects',
  projectDetails: (slug: string) => `/projects/${slug}`,
  cv: '/lucino_campos_cv.pdf',
  email: siteContact.email ? `mailto:${siteContact.email}` : null,
  social: {
    github: publicUrl(process.env.NEXT_PUBLIC_GITHUB_URL),
    linkedin: publicUrl(process.env.NEXT_PUBLIC_LINKEDIN_URL),
    instagram: publicUrl(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
  },
} as const

const externalLinkCandidates = [
  { key: 'email', href: siteLinks.email, icon: 'lucide:mail', opensNewTab: false },
  { key: 'github', href: siteLinks.social.github, icon: 'lucide:github', opensNewTab: true },
  { key: 'linkedin', href: siteLinks.social.linkedin, icon: 'lucide:linkedin', opensNewTab: true },
  { key: 'instagram', href: siteLinks.social.instagram, icon: 'lucide:instagram', opensNewTab: true },
] as const

export type ExternalLink = {
  key: (typeof externalLinkCandidates)[number]['key']
  href: string
  icon: (typeof externalLinkCandidates)[number]['icon']
  opensNewTab: boolean
}

export const siteExternalLinks: ExternalLink[] = externalLinkCandidates
  .filter(link => link.href !== null)
  .map(link => ({ ...link, href: link.href as string }))

export const siteSocialLinks = siteExternalLinks.filter(link => link.key !== 'email')

export const siteNavigation = [
  { href: siteLinks.home, labelKey: 'home' },
  { href: siteLinks.about, labelKey: 'about' },
  { href: siteLinks.projects, labelKey: 'projects' },
] as const

export const homeSections = [
  { id: 'inicio', labelKey: 'inicio' },
  { id: 'projetos', labelKey: 'projetos' },
  { id: 'sobre', labelKey: 'sobre' },
  { id: 'stack', labelKey: 'stack' },
  { id: 'experience', labelKey: 'experience' },
  { id: 'contato', labelKey: 'contato' },
] as const

export type HomeSectionId = (typeof homeSections)[number]['id']

export const homeSectionIds = homeSections.map(section => section.id)
