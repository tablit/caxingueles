# Tarefa 5 — páginas fixas, 404, arquivos gerados e documentação.
tem "$T" sobre/index.html '<h1>Sobre</h1>'
tem "$T" contato/index.html 'tally.so/embed/VL2jZN'
tem "$T" contato/index.html 'class="prosa"'
existe "$T" 404.html
tem "$T" 404.html 'class="estado-vazio"'
tem "$T" 404.html 'Página não encontrada'
existe "$P" sitemap.xml
existe "$P" robots.txt
existe "$P" index.xml
nao_existe . layouts/shortcodes/tally.html
nao_tem . README.md 'Congo'
tem . README.md 'scripts/verificar-site.sh'
tem . CONTRIBUTING.md 'destaque'
tem . CONTRIBUTING.md 'referencias'
tem . archetypes/publicacoes.md 'capa'
existe . docs/adr/0001-templates-proprios-com-kit-de-identidade.md
tem "$T" 404.html '<title>Página não encontrada · Caxinguelês</title>'
tem "$T" 404.html 'property="og:title" content="Página não encontrada"'
