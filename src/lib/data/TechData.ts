import type { TechDetailType } from '@/types/ProjectTypes'

export const techList: Record<string, TechDetailType> = {
  react: {
    name: 'React',
    icon: 'logos:react',
    justification:
      'Biblioteca core para construção de interfaces reativas e modulares através de componentes funcionais de alta performance.',
  },
  typescript: {
    name: 'TypeScript',
    icon: 'devicon:typescript',
    justification:
      'Injeção de tipagem estrita para mitigação de bugs em tempo de execução e garantia de contratos consistentes de dados para a linguagem JavaScript.',
  },
  zustand: {
    name: 'Zustand',
    icon: 'devicon:zustand',
    justification:
      'Gerenciamento de estado global atômico, simplificado e baseado em stores, isolando os contextos de negócio de forma eficiente.',
  },
  tailwind: {
    name: 'Tailwind CSS',
    icon: 'devicon:zustand',
    justification:
      'Estilização ágil utilitária diretamente no escopo do componente a partir de classes, integrada a variáveis nativas do CSS.',
  },
  motion: {
    name: 'Motion',
    icon: 'devicon:motion',
    justification:
      'Orquestração de animações fluidas, transições de rotas e micro-interações de interface de alta fidelidade visual.',
  },
  canvas: {
    name: 'Canvas API',
    icon: 'arcticons:mi-canvas',
    justification:
      'Renderização gráfica e manipulação de pixels em baixo nível diretamente na GPU, mantendo a thread principal livre.',
  },
  nestjs: {
    name: 'NestJS',
    icon: 'devicon:nestjs',
    justification:
      'Framework arquitetural focado em escalabilidade corporativa sob a plataforma Node.js. Utiliza TypeScript de forma nativa e implementa padrões sólidos de design de software como Inversão de Controle (IoC) e Injeção de Dependência (DI). Sua estrutura altamente modular permite desacoplar lógicas de negócios complexas em serviços, controllers e módulos isolados, facilitando a criação de sistemas distribuídos e microserviços resilientes.',
  },
  rabbitmq: {
    name: 'RabbitMQ',
    icon: 'devicon:rabbitmq',
    justification:
      'Message broker para mensageria assíncrona orientada a eventos, garantindo o total desacoplamento entre microserviços.',
  },
  mongodb: {
    name: 'MongoDB',
    icon: 'skill-icons:mongodb',
    justification:
      'Banco de dados NoSQL distribuído e orientado a documentos BSON. Foi adotado devido à sua capacidade de persistir estruturas de dados dinâmicas e flexíveis com alta taxa de transferência de leitura e escrita.',
  },
  docker: {
    name: 'Docker',
    icon: 'devicon:docker',
    justification:
      'Conteinerização e isolamento da infraestrutura para deploys previsíveis utilizada para empacotar a aplicação e suas dependências exatas em um ambiente isolado, imutável e leve. Isso garante a paridade absoluta de infraestrutura entre as máquinas de desenvolvimento, ambientes de homologação e servidores de produção',
  },
  nginx: {
    name: 'Nginx',
    icon: 'material-icon-theme:nginx',
    justification:
      'Servidor HTTP de altíssima performance e proxy reverso assíncrono. É configurado no ecossistema para atuar na camada mais externa da infraestrutura, servindo arquivos estáticos compressores (Gzip/Brotli) com consumo de memória extremamente baixo e tratando regras de roteamento SPA de forma nativa. Sua arquitetura orientada a eventos permite lidar com milhares de conexões simultâneas de forma segura e resiliente.',
  },
  posthog: {
    name: 'PostHog',
    icon: 'logos:posthog-icon',
    justification:
      'Captura de métricas e product analytics para análise profunda de comportamento do usuário e funis de conversão.',
  },
  zod: {
    name: 'React Hook Form + Zod',
    icon: 'logos:zod',
    justification:
      'Validação rigorosa de esquemas de dados no client-side e gerenciamento de estados internos de formulários complexos.',
  },
  vite: {
    name: 'Vite',
    icon: 'devicon:vitejs',
    justification:
      'Ferramenta de build de ambiente de desenvolvimento. Isso elimina gargalos tradicionais de empacotamento, entregando um Hot Module Replacement (HMR) instantâneo independente do tamanho do projeto. ',
  },
  nextjs: {
    name: 'Next.js',
    icon: 'devicon:nextjs',
    justification:
      'Framework full-stack construído sobre o ecossistema React. Ele viabiliza a implementação de arquiteturas híbridas de renderização, mesclando Server Components (RSC), Server-Side Rendering (SSR) e Incremental Static Regeneration (ISR). Essa flexibilidade otimiza drasticamente os índices de Core Web Vitals, garante indexação impecável em motores de busca (SEO) através da injeção nativa de metadados e abstrai sistemas de roteamento complexos baseados em arquivos.',
  },
  atlassian: {
    name: 'Pragmatic Drag and Drop (Atlassian)',
    icon: 'logos:atlassian',
    justification:
      'Cadeia de ferramentas de manipulação física de elementos em tela desenvolvida pela Atlassian. Diferente de bibliotecas tradicionais que inserem pesadas camadas de abstração e causam dezenas de re-renderizações na árvore do DOM, essa solução atua diretamente nas APIs nativas de arrastar e soltar do navegador. O resultado é uma performance cirúrgica na movimentação de dados em tempo real, sem travamentos ou quebras de layout em listas extensas.',
  },
  i18next: {
    name: 'i18next',
    icon: 'material-icon-theme:i18n',
    justification:
      'Framework completo e maduro para internacionalização (i18n) de aplicações JavaScript. Ele fornece um barramento robusto para gerenciamento de dicionários multi-idiomas, suportando lazy-loading de locales (carregamento sob demanda para não inflar o bundle inicial), interpolação dinâmica de variáveis, pluralização contextualizada e comutação instantânea de linguagem no cliente sem necessidade de recarregar a aplicação.',
  },
}
