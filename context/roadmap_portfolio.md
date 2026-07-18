# Roadmap atual do portfólio

Atualizado em: 18 de julho de 2026.

Este arquivo registra a ordem de trabalho confirmada para o projeto. A diretriz consolidada continua sendo a referência de arquitetura e intenção, mas o estado real deve ser determinado pelo código atual e pelas decisões mais recentes confirmadas por Lucino.

## Regras de acompanhamento

- Não considerar uma etapa concluída apenas porque a diretriz antiga a marcou dessa forma.
- Não alterar a ordem deste roadmap sem alinhar antes com Lucino.
- Centralizar primeiro o conteúdo em português no `src/messages/pt.json`.
- Traduzir para inglês somente depois que o conteúdo em português estiver fechado.
- Não inventar URLs sociais, experiências, tecnologias dominadas ou integrações ainda inexistentes.
- Preservar a identidade Deep Space HUD, priorizando legibilidade, clareza e credibilidade profissional.

## 1. Encerrar a revisão das seções atuais da Home — concluída

- [x] Hero e terminal aprovados.
- [x] Revisar Projetos em destaque.
- [x] Revisar Sobre.
- [x] Revisar Stack.
- [x] Revisar Experiência.
- [x] Conferir as quatro seções em desktop, tablet e mobile.
- [x] Conferir contraste, legibilidade, ritmo vertical, animações e estados interativos.

Critério de conclusão: todas as seções atuais da Home devem estar aprovadas visual e textualmente, sem falhas relevantes de responsividade ou interação.

### Pendências encontradas na auditoria inicial

- [x] Projetos: os IDs visuais foram removidos e as tecnologias receberam nomes acessíveis.
- [x] Sobre: o conteúdo permanece visível mesmo se a animação de entrada não iniciar.
- [x] Sobre: o primeiro parágrafo passou a destacar processo e responsabilidade, sem repetir o card de experiência comercial.
- [x] Stack: o selo global `EM USO` foi removido; PostHog foi mantido por decisão de produto de Lucino.
- [x] Experiência: timeline confirmada visual e textualmente em desktop e mobile.

## 2. Criar a seção Contato — somente UI — implementada, aguardando aprovação

- [x] Campos de nome, e-mail e mensagem.
- [x] Estados inicial, preenchimento, validação, erro e processamento preparados; sucesso de envio permanece reservado para a integração real.
- [x] E-mail copiável.
- [x] Link confirmado do GitHub.
- [x] Centralizar e-mail, GitHub, LinkedIn e Instagram em variáveis públicas de ambiente; links sem valor configurado permanecem ocultos para não gerar navegação quebrada.
- [x] Adicionar feedbacks com React Toastify e indicador de processamento com React Loader Spinner.
- [x] Não integrar o Resend nesta etapa.

## 3. Finalizar a navegação global — concluída

- [x] Tornar o Header sticky e mantê-lo dedicado às rotas Início, Sobre e Projetos.
- [x] Fazer Header e Footer consumirem a mesma configuração central de rotas.
- [x] Criar menu mobile compacto, com fechamento por seleção, Escape e clique externo.
- [x] Substituir a antiga ideia de sidebar por um rail compacto da Home, sem alterar o `Container` global.
- [x] Tornar o rail interativo a partir de 1024 px, com hashes reais, foco visível, labels contextuais e seção ativa via `IntersectionObserver`.
- [x] Usar abaixo de 1024 px somente um indicador visual passivo, sem interceptar toques.
- [x] Remover formalmente a Bottom Navigation Bar do plano por decisão de produto.
- [x] Manter `/about` visível em todas as navegações globais enquanto a rota é preparada.
- [x] Validar em navegador os breakpoints, teclado, foco, hashes, movimento reduzido e ausência do rail fora da Home.

## 4. Revisar profundamente os cases individuais — em andamento

- [x] Criar um inventário em `context/cases`, com um formulário por projeto e um modelo vazio reutilizável.
- [x] Preencher automaticamente os fatos sustentados pelo portfólio, pelos READMEs e pelos `package.json` disponíveis.
- [ ] Lucino revisar os fatos preenchidos e responder às perguntas marcadas como `Resposta pendente`.
- [ ] Consolidar o modelo de conteúdo dos cases a partir das respostas aprovadas.
- [ ] Hero específico de cada projeto.
- [ ] Screenshot principal bem enquadrado.
- [ ] Problema, público e objetivo do produto.
- [ ] Atuação exata de Lucino.
- [ ] Desafios e decisões técnicas.
- [ ] Justificativa individual das tecnologias.
- [ ] Distinguir tecnologias usadas por Lucino das tecnologias usadas por parceiros.
- [ ] Navegação entre projeto anterior e próximo.
- [ ] Revisão completa de responsividade, legibilidade e acessibilidade.

Observação: esta etapa reabre uma parte que a diretriz antiga marcou prematuramente como concluída.

## 5. Revisar o acervo `/projects`

- [ ] Conferir filtros cruzados, contadores e combinações sem resultado.
- [ ] Refinar o estado vazio e a mensagem sobre novos projetos em desenvolvimento.
- [ ] Preparar o layout para o crescimento futuro do acervo.
- [ ] Revisar cards, screenshots, hierarquia e responsividade.
- [ ] Garantir que os cards levem a cases completos e coerentes.

## 6. Integrar o formulário de contato

- [ ] Route Handler no Next.js 16.
- [ ] Resend e React Email.
- [ ] Validação no servidor.
- [ ] Proteção proporcional contra spam e abuso.
- [ ] Estados reais de sucesso e falha.
- [ ] Variáveis de ambiente e tratamento seguro de erros.

## 7. Construir a rota `/about`

- [ ] Criar primeiro a página pessoal estática.
- [ ] Adicionar atualmente aprendendo, interesses e apresentação fora do código.
- [ ] Adicionar Spotify posteriormente.
- [ ] Adicionar WakaTime e GitHub posteriormente.
- [ ] Não bloquear a publicação inicial da página por APIs externas.

## 8. Completar a internacionalização

- [ ] Remover textos de interface ainda espalhados pelos componentes.
- [ ] Completar chaves de SEO, acessibilidade, estados, botões e imagens no `pt.json`.
- [ ] Fechar e revisar todo o conteúdo em português.
- [ ] Traduzir para o `en.json`.
- [ ] Validar layout, rotas e metadados em inglês.

## 9. Integrar APIs e telemetria

- [ ] GitHub.
- [ ] WakaTime.
- [ ] Spotify.
- [ ] PostHog.
- [ ] Remover qualquer copy que afirme uma integração antes de ela existir.
- [ ] Tratar indisponibilidade das APIs sem quebrar as páginas.
- [ ] Aplicar consentimento quando necessário.

## 10. Polimento e publicação

- [ ] Acessibilidade manual e automática.
- [ ] Contraste, teclado, foco, zoom e reflow.
- [ ] `prefers-reduced-motion`.
- [ ] Otimização de imagens e backgrounds.
- [ ] SEO, metadados, Open Graph, sitemap e robots.
- [ ] Estados de loading, erro, 404 e conteúdo vazio.
- [ ] Testes proporcionais ao risco.
- [ ] Build de produção.
- [ ] Validação final em navegador.
- [ ] Deploy.

## Próxima sequência imediata

1. Lucino revisar e completar os formulários em `context/cases`.
2. Definir e implementar o novo modelo dos cases individuais.
3. Revisar o acervo `/projects`.
