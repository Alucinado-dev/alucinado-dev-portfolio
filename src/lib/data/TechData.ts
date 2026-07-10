import type { TechDetailType } from '@/types/ProjectTypes'

export const techList: Record<string, TechDetailType> = {
  react: {
    name: 'React',
    icon: 'logos:react',
    justification:
      'Biblioteca para a construção de interfaces de usuário baseadas em componentes reaproveitáveis. Permite a criação de aplicações dinâmicas de página única (SPA), facilitando a sincronização eficiente do estado com os elementos visuais.',
  },
  typescript: {
    name: 'TypeScript',
    icon: 'devicon:typescript',
    justification:
      'Superset do JavaScript que adiciona tipagem estática opcional ao código. Auxilia no desenvolvimento ao detectar erros em tempo de compilação, documentar contratos de dados e garantir maior segurança em refatorações de sistemas complexos.',
  },
  zustand: {
    name: 'Zustand',
    icon: 'devicon:zustand',
    justification:
      'Gerenciador de estado global para aplicações React focado em simplicidade e performance. Evita re-renderizações desnecessárias na árvore de componentes e centraliza dados compartilhados de forma leve, direta e sem boilerplate.',
  },
  tailwind: {
    name: 'Tailwind CSS',
    icon: 'devicon:tailwindcss', // ✅ CORRIGIDO: Ícone correto do Tailwind
    justification:
      'Framework CSS baseado em classes utilitárias para estilização ágil diretamente no escopo dos componentes. Otimiza o carregamento da página ao gerar um arquivo final enxuto contendo apenas os estilos efetivamente utilizados no projeto.',
  },
  motion: {
    name: 'Motion',
    icon: 'devicon:motion',
    justification:
      'Biblioteca de animações para React utilizada para criar transições fluidas e micro-interações de interface. Melhora a experiência do usuário ao fornecer feedback visual intuitivo sobre mudanças de estado e navegação de páginas.',
  },
  canvas: {
    name: 'Canvas API',
    icon: 'arcticons:mi-canvas',
    justification:
      'API nativa do navegador para renderização de gráficos bidimensionais e manipulação de pixels em alto desempenho. Permite desenhar elementos visuais complexos e animações interativas diretamente na GPU, sem sobrecarregar a thread principal.',
  },
  nestjs: {
    name: 'NestJS',
    icon: 'devicon:nestjs',
    justification:
      'Framework backend para construção de aplicações server-side eficientes e escaláveis sob a plataforma Node.js. Implementa uma arquitetura modular estrita baseada em TypeScript, organizando o código em controladores, serviços e módulos independentes.',
  },
  rabbitmq: {
    name: 'RabbitMQ',
    icon: 'devicon:rabbitmq',
    justification:
      'Mensageria e corretor de mensagens (message broker) voltado para comunicação assíncrona. Permite que diferentes partes de um sistema distribuído troquem dados de forma segura, garantindo resiliência e desacoplamento de serviços sob alta carga.',
  },
  mongodb: {
    name: 'MongoDB',
    icon: 'skill-icons:mongodb',
    justification:
      'Banco de dados NoSQL orientado a documentos flexíveis no formato BSON. Oferece alta escalabilidade e performance para armazenar e consultar grandes volumes de dados estruturados de forma dinâmica ou em constante evolução.',
  },
  docker: {
    name: 'Docker',
    icon: 'devicon:docker',
    justification:
      'Plataforma de conteinerização que isola aplicações e suas dependências em ambientes leves e independentes. Garante consistência total no comportamento do software, desde a máquina local de desenvolvimento até o servidor final de produção.',
  },
  nginx: {
    name: 'Nginx',
    icon: 'material-icon-theme:nginx',
    justification:
      'Servidor web e proxy reverso de alta performance orientado a eventos. Atua na distribuição de tráfego, compressão de arquivos estáticos e gerenciamento de conexões simultâneas, otimizando o tempo de resposta e a segurança da infraestrutura.',
  },
  posthog: {
    name: 'PostHog',
    icon: 'logos:posthog-icon',
    justification:
      'Plataforma de análise de produto e comportamento do usuário em tempo real. Permite monitorar eventos na interface, analisar funis de conversão e capturar gravações de sessão para identificar pontos de melhoria na usabilidade.',
  },
  zod: {
    name: 'Zod', // ✅ POLIDO: Nome focado na biblioteca de schemas
    icon: 'logos:zod',
    justification:
      'Biblioteca de declaração e validação de esquemas de dados em TypeScript. Garante a integridade de dados vindos de formulários ou requisições HTTP, validando as estruturas e os tipos antes que as informações entrem na lógica de negócio.',
  },
  vite: {
    name: 'Vite',
    icon: 'devicon:vitejs',
    justification:
      'Ferramenta de build moderna que acelera o ambiente de desenvolvimento. Utiliza módulos nativos do navegador para entregar um carregamento inicial instantâneo e atualizações de código eficientes (HMR) em tempo real.',
  },
  nextjs: {
    name: 'Next.js',
    icon: 'devicon:nextjs',
    justification:
      'Framework React voltado para produção que possibilita renderização tanto no servidor quanto no cliente. Otimiza a velocidade de carregamento e o SEO de aplicações web por meio de estratégias de cache dinâmico e roteamento integrado.',
  },
  atlassian: {
    name: 'Pragmatic Drag and Drop',
    icon: 'logos:atlassian',
    justification:
      'Conjunto de ferramentas para implementação de interfaces de arrastar e soltar (drag and drop). Atua diretamente nas APIs nativas do navegador, eliminando sobrecargas na árvore do DOM e mantendo excelente desempenho em listas extensas.',
  },
  i18next: {
    name: 'i18next',
    icon: 'material-icon-theme:i18n',
    justification:
      'Framework de internacionalização para aplicações JavaScript. Fornece uma infraestrutura completa para tradução de idiomas, suportando o carregamento sob demanda de dicionários regionais e formatação dinâmica de moedas e datas locais.',
  },
  javascript: {
    name: 'JavaScript',
    icon: 'logos:javascript',
    justification:
      'Linguagem de programação core da web executada de forma nativa pelos navegadores. Utilizada para conferir dinamismo às interfaces, processar requisições assíncronas de dados e gerenciar listeners de eventos em tempo real.',
  },
  css: {
    name: 'CSS3',
    icon: 'logos:css-3',
    justification:
      'Linguagem de estilização nativa utilizada para definir a identidade visual de páginas web. Permite o controle de cores, tipografia e a criação de layouts responsivos complexos por meio de especificações como Flexbox e CSS Grid.',
  },
  html: {
    name: 'HTML5',
    icon: 'logos:html-5',
    justification:
      'Linguagem de marcação que define a estrutura fundamental e o conteúdo de páginas web. Fornece os elementos semânticos essenciais que auxiliam na acessibilidade do sistema para leitores de tela e na indexação correta por motores de busca.',
  },
}
