const menuButton = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
  mobileNav.hidden = true;
}

menuButton.addEventListener('click', () => {
  const opening = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(opening));
  menuButton.setAttribute('aria-label', opening ? 'Fechar menu' : 'Abrir menu');
  mobileNav.hidden = !opening;
});

mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

const address = document.querySelector('#server-address').textContent.trim();
const copyButton = document.querySelector('[data-copy-address]');
const feedback = document.querySelector('#copy-feedback');

copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(address);
    feedback.textContent = 'Endereço copiado! Cole no Minecraft para conectar.';
    copyButton.textContent = 'Copiado!';
    window.setTimeout(() => { copyButton.textContent = 'Copiar IP'; }, 2400);
  } catch {
    feedback.textContent = 'Selecione o endereço acima e copie manualmente.';
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(document.querySelector('#server-address'));
    selection.removeAllRanges();
    selection.addRange(range);
  }
});
