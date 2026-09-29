# 0001. Templates próprios sobre o kit de identidade visual, no lugar do tema Congo

**Date:** 2026-09-28
**Status:** Accepted
**Deciders:** tablit (mantenedor do site)

## Context and Problem Statement

Chegou o kit de design do Caxinguelês: tokens, CSS de componentes, marca, grafismos e cinco páginas de referência. O site usava o tema Congo, que traz Tailwind compilado, modo escuro e seletor de aparência, e tudo isso conflita com o reset e as cores do kit. Era preciso decidir como aplicar a identidade visual sem manter dois sistemas de estilo.

## Decision Drivers

- Fidelidade à marca: `tokens.css` e `caxingueles.css` são fixos e não devem ser adaptados a outro CSS.
- Manter a estrutura simples do site (Início, Publicações, Categorias, Sobre, Contato).
- Base fácil de evoluir e de verificar.

## Considered Options

- Sobrescrever os templates do Congo, um por um, e neutralizar o CSS do tema
- Templates Hugo próprios, com o CSS do kit como única fonte de estilo

## Decision Outcome

Chosen option: **Templates Hugo próprios**, porque é a única forma de ter o CSS do kit como fonte de estilo única, sem briga com o Tailwind do Congo, mantendo a estrutura atual do site.

A cor de cada categoria vem do campo `ipe` do `_index.md` da categoria, renderizado como `data-ipe`.

### Positive Consequences

- Uma única fonte de estilo, com visual fiel à marca.
- O HTML gerado é verificável por `scripts/verificar-site.sh`.

### Negative Consequences

- RSS, sitemap, paginação, sumário e meta tags passam a ser responsabilidade dos templates do site.
- Sem modo escuro (o kit não prevê um).
- Adiados: página de autor, busca, "Leia também".

## Pros and Cons of the Options

### Sobrescrever os templates do Congo

- ✅ Mantém de graça o que o Congo já fazia (SEO, paginação, sumário)
- ❌ Dois sistemas de CSS brigando (Tailwind do Congo e o reset do kit)
- ❌ Quase todos os templates precisariam ser sobrescritos mesmo assim

### Templates Hugo próprios

- ✅ Uma fonte de estilo só, usando as classes do kit como estão
- ✅ Poucos templates, fáceis de ler e de testar
- ❌ Funções que o tema entregava precisam ser escritas (partials pequenos)

## Links

- Kit: `design/HANDOFF.md` do pacote `caxingueles-kit-de-design.zip`
- Plano de implementação: vault `Efforts/caxingueles/2026-09-28-kit-identidade-visual-plan.md`
