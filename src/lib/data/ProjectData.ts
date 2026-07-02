import { techList } from '@/lib/data/TechData'
import type { ProjectDataType } from '@/types/ProjectTypes'

export const projects: ProjectDataType[] = [
  {
    slug: 'flor-do-pomar',
    id: 'PROJ_01',
    title: 'Flor do Pomar',
    nature: 'freelancer',
    scope: 'fullstack',
    role: 'Desenvolvedor Frontend',
    imageUrl: '/img/projects/flor-do-pomar.jpeg',
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
    nature: 'autoral',
    scope: 'frontend',
    role: 'Desenvolvedor Frontend',
    imageUrl: '/img/projects/digital-web-watch.jpeg',
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
    nature: 'colaborativo',
    scope: 'fullstack',
    role: 'Dev Full-Stack',
    imageUrl: '/img/projects/task-manager.jpeg',
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
  {
    slug: 'calculator',
    id: 'PROJ_04',
    title: 'Futuristic Calculator',
    nature: 'autoral',
    scope: 'frontend',
    role: 'Desenvolvedor Frontend',
    imageUrl: '/img/projects/calculator.png',
    description:
      'Calculadora iterativa de alta precisão desenvolvida puramente em Vanilla JS, apresentando histórico persistido e motor dinâmico de multi-temas visuais.',
    extendedDescription:
      'A Futuristic Calculator é uma aplicação web autoral projetada para demonstrar o domínio absoluto e a engenharia fina por trás dos fundamentos do ecossistema web: manipulação limpa do DOM e arquitetura CSS escalável sem o uso de frameworks de abstração. O projeto implementa um interpretador matemático capaz de processar operações matemáticas sequenciais, exponenciações e tratamentos aritméticos rigorosos em tempo real. O grande destaque arquitetural está no seu motor interno de design, que utiliza propriedades customizadas nativas para alternar instantaneamente entre 7 vertentes visuais completas com persistência persistida localmente.',
    links: {
      live: 'https://calculatoralucinado.vercel.app',
      github: 'https://github.com/Alucinado-dev/Futuristic-Calculator',
      isPrivateGithub: false,
    },
    techs: [techList.javascript, techList.css, techList.html],
    features: [
      'Motor matemático robusto com suporte a encadeamento complexo de operações aritméticas (soma, subtração, multiplicação, divisão, exponenciação, raiz quadrada e porcentagem) respeitando o padrão decimal brasileiro.',
      'Arquitetura avançada de design com suporte a 7 temas visuais imersivos (Cyberpunk, Lofi, Rain, Sakura, etc.) injetados dinamicamente via seletores globais e alimentados puramente por CSS Variables.',
      'Persistência imediata e não volátil das configurações de interface e preferências estéticas do usuário armazenadas nativamente via API de LocalStorage do navegador.',
      'Gerenciamento assíncrono de interações na árvore do DOM para controle de sidebars bilaterais independentes (uma para o histórico de cálculos e outra para o seletor de temas).',
      'Tratamento estrito de erros operacionais e exceções matemáticas clássicas (como divisão por zero, raiz quadrada de números negativos ou entradas malformadas), exibindo feedback visual amigável sem interromper a execução do script.',
      'Mapeamento inteligente de fluxo de limpeza em três níveis atômicos através de eventos dedicados: eliminação global de memória (Clear All), descarte de entrada atual (Clear Entry) e deleção unitária via backspace.',
      'Layout responsivo projetado estritamente sobre as regras nativas de CSS Grid e Flexbox, garantindo adaptação cirúrgica e alinhamento perfeito de botões e displays em qualquer resolução de tela.',
    ],
  },
]
