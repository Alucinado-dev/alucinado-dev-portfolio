export type TechDetailType = {
  name: string
  icon: string
  justification: string
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
}

export type FolderStructureType = {
  path: string
  purpose: string
}

export type ProjectNatureType = 'autoral' | 'colaborativo' | 'freelancer'
export type ProjectScopeType = 'frontend' | 'backend' | 'fullstack'

export type ProjectDataType = {
  slug: string
  id: string
  title: string
  nature: ProjectNatureType // Substitui o antigo badgeText confuso
  scope: ProjectScopeType // Define a camada arquitetural
  role: string
  imageUrl: string
  description: string // Descrição curta (para os cards da Home)
  extendedDescription: string // O "O que é" profundo para a página interna
  links: ProjectLinksType
  techs: TechDetailType[]
  features: string[] // Funcionalidades em lista
}
