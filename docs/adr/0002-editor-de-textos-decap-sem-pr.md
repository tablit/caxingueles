# 0002. Editor de textos em /admin (Decap CMS) que salva direto na main, só para mantenedores

**Date:** 2026-10-08
**Status:** Accepted
**Deciders:** tablit (mantenedora do site)

## Context and Problem Statement

Os textos do site são arquivos Markdown em `content/publicacoes/`, e a única forma de publicar era editar arquivos no Git. Era preciso dar uma tela de escrita (com imagens) sem depender de Git, sem sair da Vercel Hobby e sem abrir acesso de escrita ao repositório a quem não é mantenedor.

## Decision Drivers

- Custo zero e pouca infraestrutura (site estático na Vercel Hobby).
- Conteúdo continua no Git: histórico, reversão, sem banco de dados.
- Só mantenedores publicam; o repositório é público.
- Editor visual, sem Markdown, para quem escreve.

## Considered Options

- Status quo: editar arquivos no GitHub (web ou fork + PR)
- Decap CMS com open authoring: cada texto de uma autora vira um PR a partir do fork dela
- Decap CMS sem PR, usado só por mantenedores, com commit direto na `main`
- Editor próprio com GitHub App e armazenamento de imagens
- Formulário (Tally) com conversão manual

## Decision Outcome

Chosen option: **Decap CMS sem PR, só para mantenedores**. O open authoring chegou a ser implementado (PRs #2 a #7) e foi retirado (PR #10): por ora só mantenedores escrevem, então o fluxo de revisão por PR só acrescentava passos (fork, autorização do preview na Vercel).

Como funciona:
- `/admin` carrega o Decap (`static/admin/`); o login passa por GitHub OAuth, com um proxy em duas funções da Vercel (`api/auth.js`, `api/callback.js`). `GITHUB_CLIENT_ID` e `GITHUB_CLIENT_SECRET` ficam só nas variáveis de ambiente da Vercel.
- Quem consegue salvar é quem tem acesso de escrita ao repositório; qualquer outra conta entra na tela, mas o commit é recusado.
- A única coleção é Textos (`content/publicacoes`), filtrada por `tipo: texto`. Sem coleções para Início, Sobre, Contato ou Categorias. Cada texto é uma pasta (`content/publicacoes/<texto>/index.md`, um "page bundle" do Hugo) e suas imagens ficam dentro dela. Apagar um texto é pela lixeira em cada item da lista (`static/admin/lixeira.js`), que apaga a pasta inteira, imagens incluídas, em um commit, pela API do GitHub com o token do login. O botão de apagar do Decap fica desligado, porque removeria só o `index.md`.
- O nome da pasta (e o endereço) sai do título, sem campo para editar: minúsculas, sem acento, `_` entre as palavras, no máximo 50 caracteres (`slug` e `truncate` na configuração do Decap).
- As imagens (capa e corpo) ficam na pasta do texto, então não se misturam entre textos. O Hugo reduz (até 1200 px no corpo, 1600 px na capa) e converte para WebP no build, e só as versões reduzidas vão ao ar. Textos antigos, de um arquivo só, com capa em `/img/...`, continuam funcionando. Não há limite de tamanho de imagem (o antigo teto de 300 KB foi retirado em 2026-10-08); o workflow `Formato das imagens` só recusa HEIC/HEIF, que o Hugo não lê.
- A regra de repositório "Proteger main" mantém: exigência de PR, bloqueio de apagar e de force push. Os papéis de admin e de escrita contornam a exigência de PR (`bypass_mode: always`) para o editor poder commitar.
- Mantenedores: `tablit` (admin) e `EdsonSarti` (colaborador com escrita, convidado em 2026-10-08). Contas pessoais do GitHub só oferecem o nível de escrita para colaboradores, sem "Maintain"; a pessoa não altera configurações do repositório nem a regra da `main`.

### Positive Consequences

- Publicar leva um clique e um deploy; sem fork, sem autorização de preview.
- Conteúdo continua no Git, com histórico e reversão.
- Sem custo e com infraestrutura mínima.

### Negative Consequences

- Sem revisão: um erro vai ao ar na hora.
- Sem limite de tamanho de imagem, o Git guarda o original enviado, mesmo que o site publique só a versão reduzida; fotos grandes fazem o repositório crescer. Se isso virar problema, reavaliar um teto, uma redução antes do envio ou armazenamento externo de imagens.
- Rascunhos (`draft: true`) ficam legíveis no GitHub, porque o repositório é público.
- Cada salvamento gera um deploy; há um teto diário no plano Hobby (conferir o número atual).
- O editor ainda permite editar textos já publicados; o Decap não permite proibir isso.
- Todo novo mantenedor recebe o papel de escrita, que já contorna a regra da `main`: quem entra pode publicar direto, sem revisão.

## Pros and Cons of the Options

### Status quo (GitHub)

- ✅ Nenhuma infraestrutura
- ❌ Exige conta e noção de Markdown e Git

### Decap com open authoring (PR por texto)

- ✅ Revisão e preview por texto; autoras sem acesso de escrita
- ❌ Fork e autorização do preview na Vercel a cada PR
- ❌ Peso desnecessário enquanto só mantenedores escrevem

### Decap sem PR, só mantenedores

- ✅ Fluxo mais curto, mesma infraestrutura
- ❌ Sem revisão

### Editor próprio com GitHub App

- ✅ Controle total da experiência
- ❌ Semanas de trabalho e manutenção de autenticação e uploads

### Formulário com conversão manual

- ✅ Sem contas para quem escreve
- ❌ O trabalho de conversão cai nos mantenedores

## Links

- PRs: #2 (editor, login e checagem de imagens), #3, #7 (correções), #10 (remoção do fluxo de PR)
- Se houver autoras externas no futuro, retomar o open authoring (histórico no PR #2) ou a mesclagem automática de autoras confiáveis
