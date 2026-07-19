import type { TechDetailType } from '@/types/ProjectTypes'

const tech = (key: string, name: string, icon: string): TechDetailType => ({ key, name, icon })

export const techList: Record<string, TechDetailType> = {
  react: tech('react', 'React', 'logos:react'),
  typescript: tech('typescript', 'TypeScript', 'devicon:typescript'),
  zustand: tech('zustand', 'Zustand', 'devicon:zustand'),
  tailwind: tech('tailwind', 'Tailwind CSS', 'devicon:tailwindcss'),
  motion: tech('motion', 'Motion', 'devicon:motion'),
  canvas: tech('canvas', 'Canvas API', 'arcticons:mi-canvas'),
  nestjs: tech('nestjs', 'NestJS', 'devicon:nestjs'),
  rabbitmq: tech('rabbitmq', 'RabbitMQ', 'devicon:rabbitmq'),
  mongodb: tech('mongodb', 'MongoDB', 'skill-icons:mongodb'),
  docker: tech('docker', 'Docker', 'devicon:docker'),
  nginx: tech('nginx', 'Nginx', 'material-icon-theme:nginx'),
  posthog: tech('posthog', 'PostHog', 'logos:posthog-icon'),
  zod: tech('zod', 'Zod', 'logos:zod'),
  vite: tech('vite', 'Vite', 'devicon:vitejs'),
  nextjs: tech('nextjs', 'Next.js', 'devicon:nextjs'),
  atlassian: tech('atlassian', 'Pragmatic Drag and Drop', 'logos:atlassian'),
  reactRouter: tech('reactRouter', 'React Router', 'devicon:reactrouter'),
  reactHookForm: tech('reactHookForm', 'React Hook Form', 'simple-icons:reacthookform'),
  i18next: tech('i18next', 'i18next', 'material-icon-theme:i18n'),
  javascript: tech('javascript', 'JavaScript', 'logos:javascript'),
  css: tech('css', 'CSS3', 'logos:css-3'),
  html: tech('html', 'HTML5', 'logos:html-5'),
}
