# Tarefa 3 — Publicações, Categorias, página de categoria, paginação.
tem "$T" publicacoes/index.html '<h1 class="secao__titulo">Publicações</h1>'
tem "$T" publicacoes/index.html 'class="grade-posts"'
tem "$T" publicacoes/index.html 'aria-label="Paginação"'
existe "$T" publicacoes/page/2/index.html
tem "$T" categorias/index.html '<h1 class="secao__titulo">Categorias</h1>'
tem "$T" categorias/index.html '<article class="card-post" data-ipe="roxo">'
tem "$T" categorias/index.html 'href="/categorias/turma/">Turma</a>'
tem "$T" categorias/index.html 'Registros da Turma 12.'
tem "$T" categorias/turma/index.html '<p class="hero__resumo">Registros da Turma 12.</p>'
tem "$T" categorias/index.html '<p class="card-post__meta">1 texto</p>'
tem "$T" categorias/turma/index.html 'class="hero hero--categoria" data-ipe="roxo"'
tem "$T" categorias/turma/index.html 'src="/grafismos/ipe-roxo.svg"'
tem "$T" categorias/turma/index.html 'Fixture completo'
tem "$T" categorias/avulsa/index.html 'class="hero hero--categoria"'
tem "$T" categorias/avulsa/index.html 'src="/grafismos/folha-1.svg"'
nao_tem "$T" categorias/avulsa/index.html 'data-ipe=""'
# Produção: listas vazias mostram o estado vazio.
tem "$P" publicacoes/index.html 'class="estado-vazio"'
nao_tem "$P" publicacoes/index.html 'aria-label="Paginação"'
tem "$P" categorias/index.html 'class="estado-vazio"'
# Tags não são exibidas: nenhuma página de tag é gerada (nem com rascunhos que usam tags).
nao_existe "$P" tags/index.html
nao_existe "$T" tags/exemplo/index.html
