// Caxinguelês: comportamentos mínimos. Opcional: sem JS, o menu do celular aparece aberto e empilhado
// (a classe "js" abaixo é o que permite escondê-lo atrás do hambúrguer).
document.documentElement.classList.add('js');

// Menu mobile
document.querySelectorAll('[data-menu-toggle]').forEach((botao) => {
  const header = botao.closest('.site-header');
  if (!header) return;
  const fechar = () => {
    header.removeAttribute('data-aberto');
    botao.setAttribute('aria-expanded', 'false');
  };
  botao.addEventListener('click', () => {
    const aberto = header.toggleAttribute('data-aberto');
    botao.setAttribute('aria-expanded', String(aberto));
  });
  // Fecha ao clicar num link do menu (inclusive âncoras para a própria página, como #autores).
  header.querySelectorAll('.nav__link').forEach((link) => {
    link.addEventListener('click', fechar);
  });
  // Fecha com Escape e devolve o foco ao botão do hambúrguer, se o foco estava dentro do menu.
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && header.hasAttribute('data-aberto')) {
      const focoDentroDoMenu = header.contains(document.activeElement);
      fechar();
      if (focoDentroDoMenu) botao.focus();
    }
  });
});

// Sumário do post: começa recolhido no celular
if (window.matchMedia('(max-width: 1023px)').matches) {
  document.querySelectorAll('.post-sumario[open]').forEach((d) => d.removeAttribute('open'));
}

// Filtro por categoria (chips da Home)
const chips = document.querySelectorAll('[data-filtro]');
const grade = document.querySelector('[data-grade-filtravel]');
if (chips.length && grade) {
  const vazio = document.querySelector('[data-estado-vazio]');
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const filtro = chip.dataset.filtro;
      chips.forEach((c) => c.setAttribute('aria-pressed', String(c === chip)));
      let visiveis = 0;
      grade.querySelectorAll(':scope > li').forEach((item) => {
        const categoria = item.querySelector('[data-categoria]')?.dataset.categoria;
        const mostrar = filtro === 'todos' || categoria === filtro;
        item.hidden = !mostrar;
        if (mostrar) visiveis += 1;
      });
      if (vazio) vazio.hidden = visiveis > 0;
    });
  });
}

// Copiar link do post
document.querySelectorAll('[data-copiar]').forEach((botao) => {
  botao.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      botao.textContent = 'Link copiado!';
    } catch {
      botao.textContent = 'Copie da barra de endereço';
    }
  });
});
