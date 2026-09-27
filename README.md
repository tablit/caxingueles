# caxingueles

Site dos escritos da Turma 12 do mestrado profissional da ESCAS / Instituto de Pesquisas Ecológicas.

- **No ar em:** https://caxingueles.eco.br
- **Gerador:** [Hugo](https://gohugo.io) extended 0.166.0, tema [Congo](https://github.com/jpanther/congo) (copiado em `themes/congo`)
- **Hospedagem:** Vercel, build automático a cada merge na `main`

## Quero publicar um texto

Leia o [CONTRIBUTING.md](CONTRIBUTING.md) — dá para fazer tudo pelo navegador, sem instalar nada.

## Rodar o site na sua máquina

```sh
winget install Hugo.Hugo.Extended   # uma vez só
hugo server -D                      # abre em http://localhost:1313
```

O `-D` mostra também os textos com `draft: true`, que não vão para o ar.

## Estrutura

| Pasta | O que tem |
| --- | --- |
| `content/publicacoes/` | Um arquivo `.md` por texto |
| `content/sobre.md`, `content/contato.md` | Páginas fixas |
| `config/_default/` | Configuração do site e do menu |
| `archetypes/publicacoes.md` | Molde de front-matter para textos novos |
| `themes/congo/` | O tema, versionado aqui de propósito |

## Licença

Textos sob [CC BY-NC-SA 4.0](LICENSE). Cada autor mantém o direito de republicar o próprio texto em outro lugar.
