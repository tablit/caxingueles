// Início do login do Decap CMS: redireciona para o GitHub.
// Variáveis de ambiente (definidas na Vercel, nunca no repositório): GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET.
const crypto = require('crypto');

module.exports = (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    res.statusCode = 500;
    res.end('Login não configurado.');
    return;
  }

  // O state liga o retorno do GitHub a este navegador (proteção contra CSRF).
  const state = crypto.randomBytes(16).toString('hex');
  res.setHeader('Set-Cookie', `oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/api; Max-Age=600`);

  const url = new URL('https://github.com/login/oauth/authorize');
  url.searchParams.set('client_id', clientId);
  url.searchParams.set('scope', 'public_repo'); // repositório público: basta para criar o fork e o PR
  url.searchParams.set('state', state);

  res.statusCode = 302;
  res.setHeader('Location', url.toString());
  res.end();
};
