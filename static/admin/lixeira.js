// Atalho de lixeira em cada texto da lista do /admin.
// O Decap não tem botão de apagar na lista; aqui apagamos o arquivo do texto pela API do GitHub,
// com o mesmo token do login (só funciona para quem tem acesso de escrita ao repositório).
(function () {
  var REPO = 'tablit/caxingueles';
  var BRANCH = 'main';
  var PASTA = 'content/publicacoes';

  function slugValido(slug) {
    return /^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(slug);
  }

  function urlDoArquivo(slug) {
    return 'https://api.github.com/repos/' + REPO + '/contents/' + PASTA + '/' + encodeURIComponent(slug) + '.md';
  }

  // Apaga content/publicacoes/<slug>.md na main. Lança Error com mensagem legível se falhar.
  function apagarTexto(slug, token, buscar) {
    if (!slugValido(slug)) return Promise.reject(new Error('Texto inválido.'));
    var cabecalhos = { Authorization: 'token ' + token, Accept: 'application/vnd.github+json' };
    return buscar(urlDoArquivo(slug) + '?ref=' + BRANCH, { headers: cabecalhos })
      .then(function (r) {
        if (r.status === 404) throw new Error('O arquivo deste texto não foi encontrado.');
        if (!r.ok) throw new Error('Não foi possível ler o texto (erro ' + r.status + ').');
        return r.json();
      })
      .then(function (arquivo) {
        return buscar(urlDoArquivo(slug), {
          method: 'DELETE',
          headers: Object.assign({ 'Content-Type': 'application/json' }, cabecalhos),
          body: JSON.stringify({ message: 'Remove texto "' + slug + '"', sha: arquivo.sha, branch: BRANCH }),
        });
      })
      .then(function (r) {
        if (r.status === 403 || r.status === 404) throw new Error('Sem permissão para apagar. É preciso ter acesso de escrita ao repositório.');
        if (!r.ok) throw new Error('Não foi possível apagar (erro ' + r.status + ').');
      });
  }

  function tokenDoLogin() {
    var chaves = ['decap-cms-user', 'netlify-cms-user'];
    for (var i = 0; i < chaves.length; i++) {
      try {
        var usuario = JSON.parse(localStorage.getItem(chaves[i]) || 'null');
        if (usuario && usuario.token) return usuario.token;
      } catch (e) {}
    }
    return null;
  }

  var ICONE = '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/></svg>';

  function adicionarLixeira(card, slug) {
    var botao = document.createElement('span');
    botao.setAttribute('role', 'button');
    botao.setAttribute('tabindex', '0');
    botao.setAttribute('aria-label', 'Apagar texto');
    botao.setAttribute('title', 'Apagar texto');
    botao.innerHTML = ICONE;
    botao.style.cssText = 'position:absolute;top:8px;right:8px;z-index:2;display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:50%;background:#fff;color:#b3261e;border:1px solid #d9d9d9;cursor:pointer;';

    function acionar(e) {
      e.preventDefault();
      e.stopPropagation();
      var titulo = card.querySelector('h1, h2, h3, h4');
      var nome = (titulo && titulo.textContent.trim()) || slug;
      if (!window.confirm('Apagar o texto "' + nome + '"?\n\nA remoção vai ao ar no site e não dá para desfazer por aqui.')) return;
      var token = tokenDoLogin();
      if (!token) { window.alert('Entre de novo com o GitHub e tente outra vez.'); return; }
      botao.style.opacity = '0.4';
      apagarTexto(slug, token, window.fetch.bind(window)).then(
        function () { card.style.display = 'none'; },
        function (erro) { botao.style.opacity = ''; window.alert(erro.message); }
      );
    }
    botao.addEventListener('click', acionar);
    botao.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') acionar(e); });

    if (window.getComputedStyle(card).position === 'static') card.style.position = 'relative';
    card.appendChild(botao);
  }

  function varrer() {
    document.querySelectorAll('a[href*="#/collections/publicacoes/entries/"]').forEach(function (card) {
      if (card.getAttribute('data-lixeira')) return;
      var m = /#\/collections\/publicacoes\/entries\/([^/?#]+)$/.exec(card.getAttribute('href') || '');
      if (!m) return;
      var slug;
      try { slug = decodeURIComponent(m[1]); } catch (e) { return; }
      if (!slugValido(slug)) return;
      card.setAttribute('data-lixeira', '1');
      adicionarLixeira(card, slug);
    });
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { apagarTexto: apagarTexto, slugValido: slugValido };
    return;
  }
  new MutationObserver(varrer).observe(document.body, { childList: true, subtree: true });
  varrer();
})();
