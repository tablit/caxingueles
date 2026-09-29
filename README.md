# caxingueles

Site dos escritos da Turma 12 do mestrado profissional da ESCAS / Instituto de Pesquisas Ecológicas.

- **No ar em:** https://caxingueles.eco.br
- **Gerador:** [Hugo](https://gohugo.io) extended 0.166.0, com templates próprios sobre o kit de identidade visual do Caxinguelês
- **Hospedagem:** Vercel, build automático a cada merge na `main`

## Quero publicar um texto

Leia o [CONTRIBUTING.md](CONTRIBUTING.md) — dá para fazer tudo pelo navegador, sem instalar nada.

## Rodar o site na sua máquina

```sh
winget install Hugo.Hugo.Extended   # uma vez só
hugo server -D                      # abre em http://localhost:1313
```

O `-D` mostra também os textos com `draft: true`, que não vão para o ar.

Antes de abrir um pull request que mexa em templates ou config:

```sh
bash scripts/verificar-site.sh   # constrói o site e confere o HTML
```

## Estrutura

| Pasta | O que tem |
| --- | --- |
| `content/publicacoes/` | Um arquivo `.md` por texto |
| `content/sobre.md`, `content/contato.md` | Páginas fixas |
| `config/_default/` | Configuração do site e do menu |
| `archetypes/publicacoes.md` | Molde de front-matter para textos novos |
| `layouts/` | Templates do site (páginas, partes e shortcodes) |
| `assets/css/`, `assets/js/` | CSS e JS do kit de identidade (`tokens.css` e `caxingueles.css` não se editam à mão) |
| `static/marca/`, `static/grafismos/` | Logos, favicons e flores de ipê do kit |
| `static/img/publicacoes/` | Imagens dos textos |
| `content/categorias/` | Uma pasta por categoria, com o ipê (cor) no campo `ipe` |
| `scripts/verificar-site.sh` | Constrói o site e confere o HTML gerado |

## Licença

Textos sob [CC BY-NC-SA 4.0](LICENSE). Cada autor mantém o direito de republicar o próprio texto em outro lugar.
