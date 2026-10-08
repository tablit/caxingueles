// Atalho de lixeira em cada texto da lista do /admin.
// O Decap não tem botão de apagar na lista; aqui apagamos o texto pela API do GitHub, com o mesmo
// token do login (só funciona para quem tem acesso de escrita ao repositório).
// Um texto é uma pasta (content/publicacoes/<texto>/ com index.md e as imagens): a pasta inteira vai
// embora em um único commit. Textos antigos, de um arquivo só (<texto>.md), também são aceitos.
(function () {
  var REPO = 'tablit/caxingueles';
  var BRANCH = 'main';
  var PASTA = 'content/publicacoes';
  var API = 'https://api.github.com/repos/' + REPO;

  function slugValido(slug) {
    return /^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(slug);
  }

  function cabecalhos(token, comCorpo) {
    var h = { Authorization: 'token ' + token, Accept: 'application/vnd.github+json' };
    if (comCorpo) h['Content-Type'] = 'application/json';
    return h;
  }

  function json(buscar, url, opcoes, erroMsg) {
    return buscar(url, opcoes).then(function (r) {
      if (r.status === 403 || r.status === 404 || r.status === 422) {
        throw new Error(erroMsg + ' Sem permissão ou item não encontrado (erro ' + r.status + '). É preciso ter acesso de escrita ao repositório.');
      }
      if (!r.ok) throw new Error(erroMsg + ' (erro ' + r.status + ').');
      return r.json();
    });
  }

  // Descobre o que seria apagado. Devolve { arquivos: [caminhos], base: shaDoCommit, arvore: shaDaArvore }.
  function listarArquivos(slug, token, buscar) {
    if (!slugValido(slug)) return Promise.reject(new Error('Texto inválido.'));
    var h = { headers: cabecalhos(token) };
    var base, arvore;
    return json(buscar, API + '/git/ref/heads/' + BRANCH, h, 'Não foi possível ler o site.')
      .then(function (ref) {
        base = ref.object.sha;
        return json(buscar, API + '/git/commits/' + base, h, 'Não foi possível ler o site.');
      })
      .then(function (commit) {
        arvore = commit.tree.sha;
        return json(buscar, API + '/git/trees/' + arvore + '?recursive=1', h, 'Não foi possível ler o site.');
      })
      .then(function (dados) {
        if (dados.truncated) throw new Error('O repositório é grande demais para esta operação.');
        var pasta = PASTA + '/' + slug + '/';
        var antigo = PASTA + '/' + slug + '.md';
        var arquivos = dados.tree
          .filter(function (n) { return n.type === 'blob' && (n.path.indexOf(pasta) === 0 || n.path === antigo); })
          .map(function (n) { return n.path; });
        if (!arquivos.length) throw new Error('Os arquivos deste texto não foram encontrados.');
        return { arquivos: arquivos, base: base, arvore: arvore };
      });
  }

  // Apaga os arquivos em um único commit na main.
  function apagarArquivos(slug, plano, token, buscar) {
    var corpo = function (obj) { return { method: 'POST', headers: cabecalhos(token, true), body: JSON.stringify(obj) }; };
    return json(buscar, API + '/git/trees', corpo({
      base_tree: plano.arvore,
      tree: plano.arquivos.map(function (p) { return { path: p, mode: '100644', type: 'blob', sha: null }; }),
    }), 'Não foi possível preparar a remoção.')
      .then(function (arvore) {
        return json(buscar, API + '/git/commits', corpo({
          message: 'Remove texto "' + slug + '"',
          tree: arvore.sha,
          parents: [plano.base],
        }), 'Não foi possível registrar a remoção.');
      })
      .then(function (commit) {
        return json(buscar, API + '/git/refs/heads/' + BRANCH, {
          method: 'PATCH', headers: cabecalhos(token, true), body: JSON.stringify({ sha: commit.sha }),
        }, 'Não foi possível publicar a remoção (alguém pode ter publicado ao mesmo tempo; tente de novo).');
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
      if (botao.getAttribute('data-ocupado')) return;
      var token = tokenDoLogin();
      if (!token) { window.alert('Entre de novo com o GitHub e tente outra vez.'); return; }
      var titulo = card.querySelector('h1, h2, h3, h4');
      var nome = (titulo && titulo.textContent.trim()) || slug;
      botao.setAttribute('data-ocupado', '1');
      botao.style.opacity = '0.4';
      var liberar = function () { botao.removeAttribute('data-ocupado'); botao.style.opacity = ''; };
      listarArquivos(slug, token, window.fetch.bind(window)).then(function (plano) {
        var imagens = plano.arquivos.filter(function (p) { return !/\.md$/.test(p); }).length;
        var resumo = imagens ? 'O texto e ' + imagens + (imagens === 1 ? ' imagem serão apagados.' : ' imagens serão apagadas.') : 'O texto será apagado.';
        if (!window.confirm('Apagar "' + nome + '"?\n\n' + resumo + ' A remoção vai ao ar no site e não dá para desfazer por aqui.')) { liberar(); return; }
        return apagarArquivos(slug, plano, token, window.fetch.bind(window)).then(function () { card.style.display = 'none'; });
      }).catch(function (erro) { liberar(); window.alert(erro.message); });
    }
    botao.addEventListener('click', acionar);
    botao.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') acionar(e); });

    if (window.getComputedStyle(card).position === 'static') card.style.position = 'relative';
    card.appendChild(botao);
  }

  // O endereço de um texto em pasta termina em <texto>/index; o de um texto antigo, em <texto>.
  function slugDoLink(href) {
    var m = /#\/collections\/publicacoes\/entries\/([^?#]+)$/.exec(href || '');
    if (!m) return null;
    var slug;
    try { slug = decodeURIComponent(m[1]); } catch (e) { return null; }
    slug = slug.replace(/\/index$/, '');
    return slugValido(slug) ? slug : null;
  }

  function varrer() {
    document.querySelectorAll('a[href*="#/collections/publicacoes/entries/"]').forEach(function (card) {
      if (card.getAttribute('data-lixeira')) return;
      var slug = slugDoLink(card.getAttribute('href'));
      if (!slug) return;
      card.setAttribute('data-lixeira', '1');
      adicionarLixeira(card, slug);
    });
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { listarArquivos: listarArquivos, apagarArquivos: apagarArquivos, slugValido: slugValido, slugDoLink: slugDoLink };
    return;
  }
  new MutationObserver(varrer).observe(document.body, { childList: true, subtree: true });
  varrer();
})();
