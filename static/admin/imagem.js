// Botão de imagem do corpo do texto: só envio de arquivo do computador (sem "Inserir de URL").
// O Decap traz um componente "image" embutido que pergunta um endereço; registrar outro com o
// mesmo id o substitui. O formato no Markdown continua o mesmo: ![descrição](/img/...  "título")
(function () {
  function escapar(texto) {
    return String(texto == null ? '' : texto)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  var componente = {
    id: 'image',
    label: 'Imagem',
    icon: 'image',
    fields: [
      { label: 'Imagem', name: 'image', widget: 'image', choose_url: false, media_library: { allow_multiple: false } },
      { label: 'Descrição da imagem', name: 'alt', widget: 'string', required: false, hint: 'Para leitores de tela.' },
      { label: 'Título', name: 'title', widget: 'string', required: false, hint: 'Opcional. Aparece ao passar o mouse.' },
    ],
    pattern: /^!\[(.*)\]\((.*?)(\s"(.*)")?\)$/,
    fromBlock: function (m) {
      return m && { image: m[2], alt: m[1], title: m[4] };
    },
    toBlock: function (o) {
      var titulo = o.title ? ' "' + o.title.replace(/"/g, '\\"') + '"' : '';
      return '![' + (o.alt || '') + '](' + (o.image || '') + titulo + ')';
    },
    toPreview: function (o, getAsset, fields) {
      var src = o.image || '';
      try {
        var campo = fields && fields.find && fields.find(function (f) { return f.get('widget') === 'image'; });
        var asset = getAsset(o.image, campo);
        if (asset) src = asset.toString();
      } catch (e) {}
      return '<img src="' + escapar(src) + '" alt="' + escapar(o.alt) + '" title="' + escapar(o.title) + '">';
    },
  };

  if (typeof module !== 'undefined' && module.exports) { module.exports = componente; return; }
  CMS.registerEditorComponent(componente);
})();
