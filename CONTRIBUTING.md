# Como publicar um texto

Quem mantém o site publica pelo editor em **https://caxingueles.eco.br/admin**, sem instalar nada e sem saber git. Cada texto vira uma pasta no repositório, com as imagens dentro dela, e o site se atualiza sozinho.

Para entrar é preciso uma conta no GitHub com acesso de escrita ao repositório (hoje, as pessoas mantenedoras). Quem não tem esse acesso consegue abrir a tela de login, mas não consegue salvar nada.

## 1. Entre no editor

1. Abra https://caxingueles.eco.br/admin
2. Clique em **Login with GitHub** e autorize o app, se o GitHub pedir.
3. Você vê a lista de **Textos**.

## 2. Escreva o texto

Clique em **Novo Texto** e preencha:

| Campo | O que colocar |
| --- | --- |
| Título | O título do texto. Ele também define o endereço (veja "O endereço do texto") |
| Data | A data de publicação |
| Autoria | Como o nome deve aparecer no texto |
| Categoria | Uma ou mais, da lista abaixo |
| Etiquetas | Opcional. Palavras-chave |
| Resumo | Uma ou duas frases. É o que aparece nos cartões e nas buscas |
| Imagem de capa | Opcional. Botão que abre a escolha de um arquivo do computador |
| Legenda da capa | Opcional. Aparece sob a imagem no topo do artigo |
| Rascunho | Marcado, o texto não vai para o ar |
| Texto | O corpo, em um editor visual (negrito, itálico, links, títulos, listas, citações, imagens) |

As categorias saem da seção **Categorias** do editor (veja "Categorias", mais abaixo). Hoje há uma, Caxinguelês; novas categorias são criadas ali.

### Imagens

- **Capa:** use o botão **Imagem de capa** e escolha o arquivo no computador.
- **No corpo do texto:** use o botão de imagem do editor (ou o **+**), escolha o arquivo e preencha a descrição, que serve a quem não enxerga a imagem. O título é opcional e aparece como legenda da figura.
- As imagens ficam na pasta do próprio texto. Não é preciso comprimir: o site reduz e converte para WebP ao publicar, e não há limite de tamanho.
- Use JPEG ou PNG. HEIC, o formato de fotos de iPhone, não funciona: o site ficaria sem a imagem. Exporte como JPEG antes.

### O endereço do texto

A pasta e o endereço saem do título, de forma automática: só minúsculas, sem acento, com `_` entre as palavras e no máximo 50 caracteres (títulos maiores são cortados). O título "Floradas do Cerrado" vira a pasta `floradas_do_cerrado` e o endereço `caxingueles.eco.br/publicacoes/floradas_do_cerrado/`. Depois de publicado, o título pode mudar sem mudar o endereço.

## 3. Publique

1. Para guardar sem publicar, marque **Rascunho**.
2. Para publicar, desmarque **Rascunho** e clique em **Publicar**.
3. O texto é salvo direto no repositório e o site se atualiza em cerca de um minuto. **Não há revisão** entre o clique e o site: confira antes de publicar.

Para ver como o texto fica enquanto escreve, use o painel de pré-visualização ao lado do editor. A pré-visualização é aproximada; o visual final é o do site.

## 4. Gerencie as categorias

Na seção **Categorias** do editor, clique em **Nova Categoria** e preencha o nome, uma descrição curta e a cor. A categoria passa a aparecer na escolha de categorias dos textos e ganha a própria página no site (`/categorias/<identificador>/`).

- O identificador (o endereço) sai do nome na criação, pelas mesmas regras dos textos, e **não muda** depois. Editar o nome ou a descrição só muda o que aparece no site.
- Não há botão de apagar categorias, porque textos podem estar usando uma. Para remover, apague o arquivo `data/categorias/<identificador>.yml` pelo GitHub, depois de tirar a categoria dos textos que a usam.
- Uma categoria só aparece nas listas do site quando tem pelo menos um texto.

## 5. Apague um texto

Na lista de Textos, cada item tem uma **lixeira**. Ela pede confirmação e apaga a pasta inteira, com as imagens, de uma vez. A remoção vai ao ar no site. O histórico do repositório guarda o texto, então ele pode ser recuperado pelo GitHub.

## Outros recursos, só pelo GitHub

O editor cobre o que é comum. Para os itens abaixo, edite o arquivo `index.md` do texto pelo GitHub (`content/publicacoes/<pasta-do-texto>/index.md`), no bloco do começo ou no corpo:

- **Referências:** uma lista no bloco do começo, cada item em uma linha:
  ```yaml
  referencias:
    - "Sobrenome, A. (2020). Título do artigo. *Periódico*, 1, 1–10."
  ```
- **Caixa "Você sabia?"**, no corpo do texto:
  ```
  {{< destaque titulo="Você sabia?" >}}
  Uma curiosidade curta.
  {{< /destaque >}}
  ```
- **Sumário no topo:** `showTableOfContents: true` no bloco do começo, para textos longos com vários subtítulos.
- **Imagem com legenda no corpo**, em Markdown (o arquivo fica na pasta do texto):
  ```
  ![Gráfico de barras com as floradas por mês](grafico.png "Figura 1. Floradas ao longo do ano.")
  ```

## Como o repositório guarda um texto

```
content/publicacoes/floradas_do_cerrado/
  index.md      o texto, com um bloco de dados no começo
  capa.jpg      a capa
  grafico.png   imagens do corpo
```

O bloco de dados no começo do `index.md`:

```yaml
---
tipo: texto
title: "Floradas do Cerrado"
date: 2026-10-08
author: "Seu Nome"
categorias: ["caxingueles"]
summary: "Uma ou duas frases."
capa: capa.jpg
capa_legenda: "Legenda. Foto: Nome."
draft: false
---
```

O `tipo: texto` é o que faz o texto aparecer na lista do editor; sem ele o texto continua no site, mas some da lista. Textos criados pelo editor já saem com ele.

## Mudanças no código do site

Layout, configuração e o próprio editor mudam por pull request, não pelo `/admin`. A regra da `main` exige PR, e o template de PR lembra de conferir o build. As decisões de arquitetura estão em `docs/adr/`.
