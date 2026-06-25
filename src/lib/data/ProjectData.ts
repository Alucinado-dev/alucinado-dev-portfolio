import { techList } from '@/lib/data/TechData'
import type { ProjectDataType } from '@/types/ProjectTypes'

export const projects: ProjectDataType[] = [
  {
    slug: 'flor-do-pomar',
    id: 'PROJ_01',
    title: 'Flor do Pomar',
    badgeText: 'Freelancer',
    role: 'Desenvolvedor Frontend',
    imageUrl: '/images/projects/flor-do-pomar.jpg',
    description:
      'Plataforma institucional premium e multilíngue voltada para o mercado de casamentos em Portugal, com SEO otimizado, Cookies e métricas personalizadas e infraestrutura em Docker.',
    extendedDescription:
      'A Flor do Pomar é uma aplicação web de alto padrão desenvolvida para uma agência de Wedding Planning e decoração de casamentos de luxo em Portugal. O ecossistema foi projetado para entregar uma experiência digital altamente sofisticada e fluida, unindo internacionalização nativa com espelhamento de rotas idiomáticas, conformidade rigorosa à LGPD/GDPR por meio de gestão de consentimento de cookies, Gerenciamento independente do portfólio, métricas personalizadas e infraestrutura conteinerizada de alta disponibilidade.',
    links: {
      live: 'https://www.flordopomar.pt/',
      isPrivateGithub: true,
    },
    techs: [
      techList.react,
      techList.typescript,
      techList.vite,
      techList.tailwind,
      techList.motion,
      techList.zustand,
      techList.zod,
      techList.i18next,
      techList.posthog,
      techList.docker,
      techList.nginx,
    ],
    features: [
      'Roteamento internacional robusto com prefixos de idioma (/pt e /en) espelhados nativamente através do React Router DOM.',
      'Formulário avançado de briefing com validação estrita de dados, máscaras adaptativas e motor de upload seguro de anexos.',
      'Barra de privacidade em conformidade com a GDPR européia, bloqueando scripts de rastreamento até a autorização explícita do usuário.',
      'Geração automatizada de sitemaps dinâmicos e arquivos robots.txt estruturados para indexação em motores de busca (Google).',
      'Suporte a Progressive Web App (PWA) injetando Service Workers via Vite para cache de assets e experiência offline resiliente.',
      'Integração de clientes HTTP otimizados via Axios, preparados com tratamento de erros global e barramento de proxy para ambiente local.',
    ],
  },
  {
    slug: 'digital-web-watch',
    id: 'PROJ_02',
    title: 'Digital Web Watch',
    badgeText: 'Autoral',
    role: 'Desenvolvedor Frontend',
    imageUrl: '/images/projects/digital-web-watch.jpg',
    description:
      'App de produtividade com Pomodoro, Timer e Cronômetro. Reescrita completa de versão anterior em Vanilla JS.',
    extendedDescription:
      'O Digital Web Watch é um ecossistema focado em gerenciamento de tempo e produtividade que agrupa três modos distintos de cronometragem. O projeto foi estruturado como uma reescrita completa de engenharia de uma aplicação legada desenvolvida em Vanilla JS, servindo para consolidar a manipulação avançada de estados atômicos, renderização gráfica de alta performance na GPU e as novas diretrizes do React 19.',
    links: {
      live: 'https://digital-web-watch.vercel.app',
      github: 'https://github.com/Alucinado-dev/Digital-Web-Watch',
      isPrivateGithub: false,
      legacy: 'https://github.com/Alucinado-dev/Digital-Web-Watch',
    },
    techs: [
      techList.react,
      techList.typescript,
      techList.vite,
      techList.zustand,
      techList.tailwind,
      techList.motion,
      techList.canvas,
      techList.zod,
      techList.i18next,
    ],
    features: [
      'Três modos de cronometragem centralizados: Pomodoro com ciclos customizáveis, Timer regressivo e Cronômetro com histórico de voltas.',
      'Seletor dinâmico com 6 temas visuais completos que alteram toda a paleta cromática do app instantaneamente via atributo de dados.',
      'Mecanismo de animação fluida rodando a 60 FPS via Canvas API para efeitos imersivos no background.',
      'Sistema de internacionalização completo (PT-BR e EN-US) integrado de ponta a ponta via react-i18next.',
      'Persistência total das configurações de preferências, volume e tempos customizados do usuário no localStorage.',
      'Suporte a Progressive Web App (PWA), permitindo instalação nativa e execução isolada no ambiente desktop ou mobile.',
    ],
  },
  {
    slug: 'task-manager',
    id: 'PROJ_03',
    title: 'Task Manager',
    badgeText: 'Full-Stack',
    role: 'Co-autor e Dev Full-Stack',
    imageUrl: '/images/projects/task-manager.jpg',
    description:
      'Plataforma Kanban full-stack estruturada em microserviços isolados, utilizando NestJS, com RabbitMQ e banco de dados NoSQL.',
    extendedDescription:
      'O Task Manager é um ecossistema full-stack de gerenciamento de tarefas escalável baseado na arquitetura de microserviços. O projeto foi desenhado para resolver problemas de concorrência e desacoplamento comuns em cenários corporativos, separando o contexto de autenticação (Account Service) e gestão de demandas (Task Service). A comunicação entre os serviços é assíncrona e orientada a eventos, enquanto o frontend entrega uma experiência Kanban fluida com controle estrito de renderização.',
    links: {
      live: 'https://task-manager-demo.vercel.app', // Substitua pela URL de produção real se houver
      github: 'https://github.com/Nibirutta/task-manager',
      isPrivateGithub: false,
      // legacy não foi incluído por não se aplicar a este projeto
    },
    techs: [
      techList.react,
      techList.vite,
      techList.typescript,
      techList.tailwind,
      techList.atlassian,
      techList.motion,
      techList.zod,
      techList.i18next,
      techList.mongodb,
      techList.rabbitmq,
      techList.nestjs,
    ],
    features: [
      'Painel Kanban iterativo permitindo fluxo operacional completo de criação, edição e movimentação de tarefas entre colunas de status.',
      'Arquitetura distribuída em microserviços independentes comunicando-se de forma assíncrona orientada a eventos através de filas estruturadas.',
      'Sistema de segurança robusto com autenticação baseada em tokens JWT triplos (Access, Session e Reset Token para recuperação de conta).',
      'Classificação e priorização dinâmica de demandas, permitindo filtragem inteligente no painel principal por nível de criticidade técnica.',
      'Internacionalização adaptativa nativa (i18n) configurada para suporte multilingue entre os idiomas Português e Inglês.',
      'Interface totalmente responsiva e acessível construída sobre as primitivas de baixo nível fornecidas pelo Radix UI e Framer Motion.',
    ],
  },
]
