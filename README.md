# Alucinado.Dev

Portfólio pessoal de Lucino Campos, desenvolvido para apresentar projetos, experiência profissional e o processo por trás de cada case.

O projeto combina uma interface inspirada em HUDs e ficção científica com uma estrutura editorial voltada à leitura. Além da Home, o site possui um arquivo de projetos, cases individuais e uma página Sobre enriquecida com atividade real do GitHub, WakaTime e Spotify.

**Produção:** [alucinado-dev.vercel.app](https://alucinado-dev.vercel.app/)

## Principais recursos

- Conteúdo completo em português e inglês com `next-intl`.
- Home com apresentação, projetos em destaque, trajetória, stacks e contato.
- Arquivo de projetos com filtros e estados vazios.
- Cases responsivos com estrutura adaptada ao tamanho e à natureza de cada projeto.
- Página Sobre com dados normalizados do GitHub, WakaTime e Spotify.
- Formulário real de contato com Resend, React Email, Turnstile, honeypot e validação no servidor.
- Telemetria cookieless com PostHog, sem session replay, perfis identificados ou conteúdo do formulário.
- Metadados localizados, Open Graph, sitemap, `robots.txt` e páginas de erro personalizadas.
- Animações e backgrounds em Canvas com suporte a `prefers-reduced-motion`.

## Tecnologias

| Área | Tecnologias |
| --- | --- |
| Aplicação | Next.js 16, React 19, TypeScript |
| Interface | Tailwind CSS 4, Motion, Iconify |
| Internacionalização | next-intl |
| Formulários | React Hook Form, Zod, React Toastify |
| E-mail e proteção | Resend, React Email, Cloudflare Turnstile |
| Dados externos | GitHub GraphQL API, WakaTime API, Spotify Web API |
| Analytics | PostHog em modo cookieless |
| Hospedagem | Vercel |

## Estrutura do projeto

```text
src/
├── app/
│   ├── [locale]/          # Páginas localizadas e cases
│   └── api/               # Contato e integração normalizada do Spotify
├── components/
│   ├── about/             # Sinais digitais da página Sobre
│   ├── backgrounds/       # Backgrounds e animações em Canvas
│   ├── cases/             # Estruturas dos estudos de caso
│   ├── layout/            # Header, Footer e navegação
│   └── sections/          # Seções da Home
├── lib/
│   ├── data/              # Projetos, cases, stacks e links
│   ├── integrations/      # Consulta e normalização das APIs externas
│   └── validation/        # Contratos compartilhados do formulário
└── messages/                   # Textos em português e inglês
```

As páginas e os dados principais permanecem no servidor. Componentes cliente são usados apenas onde existe interação, animação ou atualização periódica.

## Executando localmente

### Requisitos

- Node.js 20.9 ou superior.
- npm.

### Instalação

```bash
git clone https://github.com/Alucinado-dev/alucinado-dev-portfolio.git
cd alucinado-dev-portfolio
npm install
```

Copie o arquivo de exemplo e preencha somente as integrações que deseja testar:

```powershell
Copy-Item .env.example .env.local
```

Em sistemas Unix:

```bash
cp .env.example .env.local
```

Depois, inicie o servidor:

```bash
npm run dev
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000).

## Variáveis de ambiente

O arquivo [`.env.example`](./.env.example) contém a lista completa. Nenhuma chave privada deve receber o prefixo `NEXT_PUBLIC_`.

### Identidade e links públicos

| Variável | Finalidade |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL canônica do site |
| `NEXT_PUBLIC_CONTACT_EMAIL` | E-mail exibido como alternativa de contato |
| `NEXT_PUBLIC_GITHUB_URL` | Perfil público no GitHub |
| `NEXT_PUBLIC_LINKEDIN_URL` | Perfil público no LinkedIn |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Perfil público no Instagram |

### Página Sobre

| Variável | Finalidade |
| --- | --- |
| `GITHUB_USERNAME` | Usuário consultado na atividade do GitHub |
| `GITHUB_TOKEN` | Token somente leitura usado no servidor |
| `WAKATIME_API_KEY` | Chave privada da API do WakaTime |
| `SPOTIFY_CLIENT_ID` | Identificador da aplicação Spotify |
| `SPOTIFY_CLIENT_SECRET` | Segredo da aplicação Spotify |
| `SPOTIFY_REDIRECT_URI` | Callback local usado para autorização |
| `SPOTIFY_REFRESH_TOKEN` | Token privado de renovação |
| `SPOTIFY_AUTHORIZED_AT` | Data da última autorização |

Com as credenciais do aplicativo Spotify preenchidas, o refresh token pode ser obtido por:

```bash
npm run spotify:auth
```

### Contato e analytics

| Variável | Finalidade |
| --- | --- |
| `RESEND_API_KEY` | Envio da mensagem pelo servidor |
| `CONTACT_TO_EMAIL` | Destinatário fixo do formulário |
| `CONTACT_FROM_EMAIL` | Remetente autorizado no Resend |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Chave pública do widget Turnstile |
| `TURNSTILE_SECRET_KEY` | Validação privada do Turnstile |
| `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` | Token público do projeto PostHog |
| `NEXT_PUBLIC_POSTHOG_HOST` | Host de ingestão do PostHog |

Quando uma integração da página Sobre está indisponível, sua falha fica isolada e o restante da página continua funcional. O formulário, por outro lado, precisa das credenciais do Resend e do Turnstile para realizar envios reais.

## Scripts

| Comando | Ação |
| --- | --- |
| `npm run dev` | Inicia o ambiente de desenvolvimento |
| `npm run build` | Gera e valida a versão de produção |
| `npm start` | Executa a build de produção |
| `npm run lint` | Executa o ESLint |
| `npm run spotify:auth` | Inicia a autorização local do Spotify |

## Privacidade

- O formulário não armazena contatos em banco de dados.
- Nome, e-mail e mensagem não são enviados ao PostHog.
- O analytics opera sem cookies, identificação persistente ou gravação de sessão.
- O código de país pode ser anexado aos eventos a partir do cabeçalho da Vercel, sem enviar o endereço IP como propriedade.
- Tokens do GitHub, WakaTime, Spotify, Resend e Turnstile permanecem exclusivamente no servidor.

## Autoria

Desenvolvido por [Lucino Campos](https://github.com/Alucinado-dev).

Este repositório não declara uma licença de uso. O código permanece sob os direitos de seu autor.
