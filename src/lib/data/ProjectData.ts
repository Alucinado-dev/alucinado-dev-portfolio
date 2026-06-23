export interface ProjectTagType {
  name: string
  icon: string
}

export interface ProjectDataType {
  slug: string
  id: string
  title: string
  description: string
  imageUrl: string
  badgeText: string
  role: string
  deployUrl?: string
  githubUrl?: string
  tags: ProjectTagType[]
  highlights: string[]
  fullStackContext?: string // Detalhe extra para projetos em equipe
}

export const projects: ProjectDataType[] = [
  {
    slug: 'flor-do-pomar',
    id: 'PROJ_01',
    title: 'Flor do Pomar',
    badgeText: 'Freelancer',
    role: 'Lead Frontend Developer',
    deployUrl: 'https://flordopomar.pt',
    imageUrl: '/img/projects/flor-do-pomar.jpeg', // Você adicionará os mockups aqui posteriormente
    description:
      'Aplicação web comercial de alta performance para cliente real em Portugal. Apresenta arquitetura focada em SEO e experiência do usuário fluida.',
    highlights: [
      'Painel administrativo protegido com operações de CRUD completas para upload, edição e remoção de mídias sem intervenção técnica.',
      'Internacionalização dinâmica completa (PT/EN) integrada via react-i18next.',
      'Otimização extrema com Static Site Generation (SSG), Progressive Web App (PWA) instalável e SEO estruturado para o mercado europeu.',
    ],
    tags: [
      { name: 'React 19', icon: 'logos:react' },
      { name: 'TypeScript', icon: 'logos:typescript-icon' },
      { name: 'Tailwind v4', icon: 'logos:tailwindcss-icon' },
      { name: 'Motion', icon: 'logos:framer' },
      { name: 'Zustand', icon: 'logos:zustand' },
      { name: 'PostHog', icon: 'logos:posthog-icon' },
    ],
  },
  {
    slug: 'digital-web-watch',
    id: 'PROJ_02',
    title: 'Digital Web Watch',
    badgeText: 'Autoral',
    role: 'Frontend Architect',
    deployUrl: 'https://digital-web-watch.vercel.app',
    imageUrl: '/img/projects/digital-web-watch.jpeg',
    description:
      'Ecossistema completo de produtividade contendo Pomodoro, Timer e Cronômetro. Reescrita de engenharia de um projeto legível estruturado em Vanilla JS.',
    highlights: [
      'Engine visual com 6 temas customizáveis orientados dinamicamente via CSS Variables e DaisyUI.',
      'Fundo de tela interativo de alta fidelidade renderizado diretamente em baixo nível via Canvas API.',
      'PWA estritamente instalável e integração de áudio resiliente rodando via Howler.js.',
    ],
    tags: [
      { name: 'React 19', icon: 'logos:react' },
      { name: 'TypeScript', icon: 'logos:typescript-icon' },
      { name: 'Tailwind v4', icon: 'logos:tailwindcss-icon' },
      { name: 'Zustand', icon: 'logos:zustand' },
      { name: 'Canvas API', icon: 'current-color' }, // HTML5 Canvas nativo
      { name: 'Router', icon: 'logos:react-router' },
    ],
  },
  {
    slug: 'task-manager',
    id: 'PROJ_03',
    title: 'Task Manager Kanban',
    badgeText: 'Colaborativo',
    role: 'Frontend Engineer',
    deployUrl: 'https://your-taskmanager.vercel.app',
    imageUrl: '/img/projects/task-manager.jpeg',
    description:
      'Plataforma corporativa de gerenciamento de tarefas no estilo Kanban, desenvolvida em colaboração direta com engenheiro backend.',
    highlights: [
      'Responsável isolado por 100% do planejamento, arquitetura e entrega do ecossistema Frontend.',
      'Implementação de arrastar e soltar (Drag and Drop) de alta performance utilizando Pragmatic Drag and Drop da Atlassian.',
      'Validações complexas em tempo de execução combinando React Hook Form com esquemas Zod.',
    ],
    fullStackContext: 'Backend parceiro estruturado de forma distribuída: NestJS, MongoDB, RabbitMQ e Microsserviços.',
    tags: [
      { name: 'React', icon: 'logos:react' },
      { name: 'TypeScript', icon: 'logos:typescript-icon' },
      { name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' },
      { name: 'Zod', icon: 'logos:zod' },
      { name: 'Radix UI', icon: 'logos:radix-ui' },
      { name: 'NestJS', icon: 'logos:nestjs' },
    ],
  },
]
