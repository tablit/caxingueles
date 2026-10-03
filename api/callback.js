// Fim do login do Decap CMS: troca o código do GitHub por um token e o entrega à janela do /admin.
const ORIGENS_PERMITIDAS = ['https://caxingueles.eco.br', 'http://localhost:1313'];

function pagina(mensagem, conteudo) {
  return `<!doctype html><html><body><script>
(function () {
  var permitidas = ${JSON.stringify(ORIGENS_PERMITIDAS)};
  function receber(e) {
    if (permitidas.indexOf(e.origin) === -1) return;
    window.opener.postMessage(${JSON.stringify(`authorization:github:${mensagem}:`)} + ${JSON.stringify(JSON.stringify(conteudo))}, e.origin);
    window.removeEventListener('message', receber, false);
  }
  window.addEventListener('message', receber, false);
  window.opener.postMessage('authorizing:github', '*');
})();
</script></body></html>`;
}

module.exports = async (req, res) => {
  const { code, state } = req.query || {};
  const cookie = (req.headers.cookie || '').split(/;\s*/).find((c) => c.startsWith('oauth_state='));
  const esperado = cookie && cookie.slice('oauth_state='.length);

  res.setHeader('Set-Cookie', 'oauth_state=; HttpOnly; Secure; SameSite=Lax; Path=/api; Max-Age=0');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  if (!code || !state || !esperado || state !== esperado) {
    res.statusCode = 400;
    res.end(pagina('error', { message: 'Login inválido ou expirado. Tente de novo.' }));
    return;
  }

  try {
    const resposta = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });
    const dados = await resposta.json();
    if (!dados.access_token) throw new Error(dados.error_description || 'sem token');
    res.statusCode = 200;
    res.end(pagina('success', { token: dados.access_token, provider: 'github' }));
  } catch (erro) {
    res.statusCode = 502;
    res.end(pagina('error', { message: 'Não foi possível entrar com o GitHub.' }));
  }
};
