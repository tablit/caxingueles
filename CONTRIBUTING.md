# Como publicar um texto

Dá para fazer tudo pelo navegador, sem instalar nada e sem saber git. São cinco minutos.

## 1. Escreva o texto

Escreva onde você preferir (Word, Google Docs, papel). Na hora de publicar, o texto vira um arquivo com marcações simples:

```
## Um subtítulo
**negrito**  _itálico_
[o texto do link](https://endereco-do-link)

> uma citação
```

## 2. Crie o arquivo no GitHub

1. Abra https://github.com/tablit/caxingueles
2. Clique em **Add file** › **Create new file**
3. No campo do nome, escreva o caminho inteiro:
   `content/publicacoes/nome-do-seu-texto.md`
   - só minúsculas, sem acento, sem cedilha, espaços viram hífen
   - esse nome vira o endereço do texto: `caxingueles.eco.br/publicacoes/nome-do-seu-texto/`
4. Cole o bloco abaixo no começo do arquivo e preencha:

```yaml
---
title: "O título do seu texto"
date: 2026-10-02
author: "Seu Nome"
categorias: ["ensaios"]
tags: []
summary: "Uma ou duas frases. É o que aparece na home e na lista."
draft: true
---
```

5. Abaixo do bloco, cole o seu texto.

As categorias são quatro, escolha uma:

| Categoria | Para que serve |
| --- | --- |
| `ensaios` | Texto autoral longo |
| `campo` | Relato de saída, visita, disciplina prática |
| `resenhas` | Leitura comentada |
| `turma` | Avisos, retrospectivas, o que é da turma |

### Recursos opcionais do texto

- **Imagem de capa:** suba a imagem em `static/img/publicacoes/` (veja "Imagens", mais abaixo) e acrescente ao bloco do começo:
  ```yaml
  capa: "/img/publicacoes/nome-da-imagem.jpg"
  capa_alt: "Descrição da imagem para quem não enxerga"
  capa_legenda: "Legenda. Foto: Nome do autor."
  ```
- **Referências:** uma lista no bloco do começo, cada item em uma linha:
  ```yaml
  referencias:
    - "Sobrenome, A. (2020). Título do artigo. *Periódico*, 1, 1–10."
  ```
- **Caixa "Você sabia?":**
  ```
  {{< destaque titulo="Você sabia?" >}}
  Uma curiosidade curta.
  {{< /destaque >}}
  ```
- **Sumário no topo:** `showTableOfContents: true` no bloco do começo, para textos longos com vários subtítulos.

## 3. Abra o pull request

1. Role até o fim da página e clique em **Commit changes**
2. Escolha **Create a new branch for this commit and start a pull request**
3. Clique em **Propose changes** e depois em **Create pull request**

## 4. Confira o preview

Em um ou dois minutos, um comentário automático da Vercel aparece no pull request com um link. Esse link mostra o site inteiro já com o seu texto — é nele que a revisão acontece, não no Markdown.

Pediram ajustes? Edite o arquivo na mesma branch e o preview se atualiza sozinho.

## 5. Publique

Quando o texto estiver aprovado:

1. Troque `draft: true` por `draft: false`
2. Quem tem permissão faz o merge
3. O site se atualiza sozinho em cerca de um minuto

## Imagens

Suba o arquivo em `static/img/publicacoes/` (no GitHub: abra a pasta e use **Add file** › **Upload files**) e chame no texto assim:

```
![descrição da imagem para quem não enxerga](/img/publicacoes/nome-do-arquivo.jpg)
```

Uma imagem sozinha num parágrafo vira figura. Para ter legenda, escreva o texto entre aspas depois do endereço:

```
![Gráfico de barras com as floradas por mês](/img/publicacoes/grafico.png "Figura 1. Floradas ao longo do ano.")
```

Comprima a imagem antes de subir — acima de 300 KB, a página fica lenta no celular.
