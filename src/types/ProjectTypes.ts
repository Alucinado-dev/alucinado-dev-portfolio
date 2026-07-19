export type TechDetailType = {
  key: string
  name: string
  icon: string
}

export type ProjectFeatureType = {
  title: string
  description: string
}

export type ProjectLinksType = {
  live: string
  github?: string
  isPrivateGithub: boolean
  legacy?: string
  legacyLive?: string
}

export type FolderStructureType = {
  path: string
  purpose: string
}

export type ProjectNatureType = 'autoral' | 'colaborativo' | 'freelancer'
export type ProjectScopeType = 'frontend' | 'backend' | 'fullstack'
export type ProjectRoleType = 'frontendDeveloper'

export type ProjectDataType = {
  slug: string
  id: string
  title: string
  nature: ProjectNatureType // Substitui o antigo badgeText confuso
  scope: ProjectScopeType // Define a camada arquitetural
  role: ProjectRoleType
  imageUrl: string
  links: ProjectLinksType
  techs: TechDetailType[]
}

export type ProjectCaseMediaType = {
  src: string
  width: number
  height: number
  altKey: string
  captionKey: string
}

export type ProjectCaseTechnologyType = {
  tech: TechDetailType
}

export type ProjectCaseDecisionGroupType = {
  key: string
  icon: string
  technologyKeys: string[]
}

export type ProjectCaseStudyType = {
  slug: string
  media: ProjectCaseMediaType[]
  technologies: ProjectCaseTechnologyType[]
  decisionGroups: ProjectCaseDecisionGroupType[]
  ecosystem: Array<{
    icon: string
    labelKey: string
  }>
  previousProjectSlug?: string
  nextProjectSlug?: string
}
