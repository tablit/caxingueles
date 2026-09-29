# Tarefa 1 — marca, head, header, rodapé, config e assets.
tem "$T" index.html 'lang="pt-BR"'
tem "$T" index.html '<title>Caxinguelês · Escritos da Turma 12'
tem "$T" index.html 'class="pular" href="#conteudo"'
tem "$T" index.html 'src="/marca/logo-horizontal-verde.svg"'
tem "$T" index.html 'src="/marca/logo-horizontal-branco.svg"'
tem "$T" index.html 'rel="icon" href="/marca/favicon.svg"'
tem "$T" index.html 'rel="apple-touch-icon" href="/marca/apple-touch-icon-180.png"'
tem "$T" index.html 'property="og:image" content="https://caxingueles.eco.br/marca/og-image-padrao.png"'
tem "$T" index.html 'name="theme-color" content="#00833F"'
tem "$T" index.html 'family=Baloo+2'
tem "$T" index.html "classList.add('js')"
tem "$T" index.html 'data-menu-toggle'
tem "$T" index.html 'CC BY-NC-SA 4.0'
tem "$T" publicacoes/index.html 'aria-current="page">Publicações'
tem "$T" contato/index.html 'aria-current="page">Contato'
tem "$T" publicacoes/fixture-completo/index.html 'property="og:image" content="https://caxingueles.eco.br/grafismos/ipe-roxo.svg"'
tem "$T" sobre/index.html 'class="prosa"'
nao_tem "$T" index.html 'Congo'
nao_tem "$T" index.html 'appearance'
nao_tem "$T" index.html 'busca__input'
existe "$T" marca/favicon.svg
existe "$T" grafismos/ipe-roxo.svg
existe "$T" index.xml
nao_existe "$T" index.json

css="$(cd "$T" && ls css/site.min.*.css 2>/dev/null | head -1)"
if [ -n "$css" ]; then
  ok "CSS gerado: $css"
  tem "$T" "$css" '--ipe-roxo'
  tem "$T" "$css" '.card-post'
  tem "$T" "$css" 'data-ipe'
  nao_tem "$T" "$css" 'botanica'
else
  falha "CSS css/site.min.*.css não foi gerado"
fi
js="$(cd "$T" && ls js/site.min.*.js 2>/dev/null | head -1)"
if [ -n "$js" ]; then ok "JS gerado: $js"; else falha "JS js/site.min.*.js não foi gerado"; fi
# Licença explícita no rodapé: nome completo com link oficial e legenda.
tem "$T" index.html 'rel="license" href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.pt-br"'
tem "$T" index.html 'Creative Commons Atribuição-NãoComercial-CompartilhaIgual 4.0 Internacional'
tem "$T" index.html 'citando a autoria, sem fins comerciais e mantendo esta mesma licença'
# Texto do rodapé.
tem "$T" index.html '<p class="site-footer__texto">Ensaios e registros dos Caxinguelês<br>Coletivo de mestrandos da Turma 12 da <a href="https://www.escas.org.br/cursos/mestrado/">ESCAS/IPÊ</a>*</p>'
tem "$T" index.html '<p class="site-footer__texto" style="font-size: var(--fs-14)">* Iniciativa independente dos mestrandos, sem vínculo oficial com a ESCAS ou o IPÊ.</p>'
nao_tem "$T" publicacoes/index.html 'Escola Superior de Conservação Ambiental e Sustentabilidade'
nao_tem "$T" index.html 'IPÊ — Instituto de Pesquisas Ecológicas'
# Apoio no rodapé.
tem "$T" index.html '<h2 class="site-footer__titulo">Apoio</h2>'
tem "$T" index.html '<li><a href="https://www.instagram.com/icama_org/"><img src="/img/apoio/icama.webp" alt="ICAMA" height="80"></a></li>'
existe "$T" img/apoio/icama.webp
# Extensões do site sobre o CSS do kit.
if [ -n "$css" ]; then tem "$T" "$css" '.hero__ipes'; fi
