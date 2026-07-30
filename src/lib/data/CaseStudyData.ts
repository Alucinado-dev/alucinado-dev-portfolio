import { projectMedia } from '@/lib/data/ProjectMediaData'
import { techList } from '@/lib/data/TechData'
import type { ProjectCaseStudyType } from '@/types/ProjectTypes'

export const projectCaseStudies: Record<string, ProjectCaseStudyType> = {
  'flor-do-pomar': {
    slug: 'flor-do-pomar',
    media: [
      {
        src: projectMedia.florDoPomar.cover,
        width: 1536,
        height: 768,
        altKey: 'hero',
        captionKey: 'hero',
      },
      {
        src: projectMedia.florDoPomar.portfolio,
        width: 1440,
        height: 1000,
        altKey: 'portfolio',
        captionKey: 'portfolio',
      },
      {
        src: projectMedia.florDoPomar.contact,
        width: 1440,
        height: 1000,
        altKey: 'contact',
        captionKey: 'contact',
      },
    ],
    technologies: [
      { tech: techList.react },
      { tech: techList.typescript },
      { tech: techList.vite },
      { tech: techList.tailwind },
      { tech: techList.motion },
      { tech: techList.zustand },
      { tech: techList.zod },
      { tech: techList.i18next },
      { tech: techList.posthog },
    ],
    decisionGroups: [
      {
        key: 'foundation',
        icon: 'lucide:blocks',
        technologyKeys: ['react', 'typescript', 'vite'],
      },
      {
        key: 'interface',
        icon: 'lucide:panels-top-left',
        technologyKeys: ['tailwind', 'motion', 'i18next'],
      },
      {
        key: 'reliability',
        icon: 'lucide:waypoints',
        technologyKeys: ['zustand', 'zod', 'posthog'],
      },
    ],
    ecosystem: [
      { icon: 'lucide:server-cog', labelKey: 'api' },
      { icon: 'simple-icons:docker', labelKey: 'docker' },
      { icon: 'simple-icons:nginx', labelKey: 'nginx' },
    ],
    nextProjectSlug: 'digital-web-watch',
  },
  'digital-web-watch': {
    slug: 'digital-web-watch',
    media: [
      {
        src: projectMedia.digitalWebWatch.cover,
        width: 1855,
        height: 969,
        altKey: 'hero',
        captionKey: 'hero',
      },
    ],
    technologies: [
      { tech: techList.react },
      { tech: techList.typescript },
      { tech: techList.vite },
      { tech: techList.tailwind },
      { tech: techList.motion },
      { tech: techList.zustand },
      { tech: techList.zod },
      { tech: techList.i18next },
      { tech: techList.canvas },
    ],
    decisionGroups: [
      {
        key: 'foundation',
        icon: 'lucide:refresh-cw',
        technologyKeys: ['react', 'typescript', 'vite'],
      },
      {
        key: 'experience',
        icon: 'lucide:palette',
        technologyKeys: ['tailwind', 'motion', 'i18next'],
      },
      {
        key: 'state',
        icon: 'lucide:timer-reset',
        technologyKeys: ['zustand', 'zod', 'canvas'],
      },
    ],
    ecosystem: [
      { icon: 'lucide:hard-drive', labelKey: 'localStorage' },
      { icon: 'lucide:download', labelKey: 'pwa' },
      { icon: 'simple-icons:vercel', labelKey: 'vercel' },
    ],
    previousProjectSlug: 'flor-do-pomar',
    nextProjectSlug: 'task-manager',
  },
  'task-manager': {
    slug: 'task-manager',
    media: [
      {
        src: projectMedia.taskManager.cover,
        width: 1843,
        height: 953,
        altKey: 'hero',
        captionKey: 'hero',
      },
    ],
    technologies: [
      { tech: techList.react },
      { tech: techList.typescript },
      { tech: techList.vite },
      { tech: techList.tailwind },
      { tech: techList.motion },
      { tech: techList.i18next },
      { tech: techList.reactRouter },
      { tech: techList.reactHookForm },
      { tech: techList.zod },
      { tech: techList.atlassian },
    ],
    decisionGroups: [
      {
        key: 'foundation',
        icon: 'lucide:blocks',
        technologyKeys: ['react', 'typescript', 'vite'],
      },
      {
        key: 'interface',
        icon: 'lucide:panel-top',
        technologyKeys: ['tailwind', 'motion', 'i18next'],
      },
      {
        key: 'flows',
        icon: 'lucide:workflow',
        technologyKeys: ['reactRouter', 'reactHookForm', 'zod', 'atlassian'],
      },
    ],
    ecosystem: [
      { icon: 'lucide:plug-zap', labelKey: 'api' },
      { icon: 'devicon:nestjs', labelKey: 'nestjs' },
      { icon: 'skill-icons:mongodb', labelKey: 'mongodb' },
      { icon: 'devicon:rabbitmq', labelKey: 'rabbitmq' },
    ],
    previousProjectSlug: 'digital-web-watch',
    nextProjectSlug: 'calculator',
  },
  calculator: {
    slug: 'calculator',
    media: [
      {
        src: projectMedia.calculator.cover,
        width: 1325,
        height: 653,
        altKey: 'hero',
        captionKey: 'hero',
      },
    ],
    technologies: [{ tech: techList.html }, { tech: techList.css }, { tech: techList.javascript }],
    decisionGroups: [
      {
        key: 'logic',
        icon: 'lucide:square-function',
        technologyKeys: ['javascript'],
      },
      {
        key: 'interface',
        icon: 'lucide:panels-top-left',
        technologyKeys: ['html', 'css'],
      },
    ],
    ecosystem: [
      { icon: 'lucide:braces', labelKey: 'dom' },
      { icon: 'lucide:hard-drive', labelKey: 'localStorage' },
      { icon: 'simple-icons:vercel', labelKey: 'vercel' },
    ],
    previousProjectSlug: 'task-manager',
  },
}

export const getProjectCaseStudy = (slug: string) => projectCaseStudies[slug]
