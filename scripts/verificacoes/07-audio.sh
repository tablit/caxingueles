# Áudio junto ao texto: arquivo na pasta do texto (audio: leitura.mp3), tocador no topo do artigo.
A=publicacoes/fixture-audio/index.html
tem "$T" "$A" '<figure class="post-audio">'
tem "$T" "$A" '<audio controls preload="none" src="/publicacoes/fixture-audio/leitura.mp3">'
tem "$T" "$A" 'href="/publicacoes/fixture-audio/leitura.mp3" download'
tem "$T" "$A" '<figcaption>Leitura de teste pela autora</figcaption>'
existe "$T" publicacoes/fixture-audio/leitura.mp3
# Sem o campo audio, nada de tocador.
nao_tem "$T" publicacoes/fixture-completo/index.html 'class="post-audio"'
