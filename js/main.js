// === CURSOR CUSTOMIZADO ===
const cursor = document.getElementById('cursor');
if (cursor) {
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('expandido'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('expandido'));
  });
}

// === NAVBAR ===
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
  atualizarNavAtivo();
});

hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('aberto');
});

// Fechar menu ao clicar em link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('aberto'));
});

// Nav link ativo por seção
function atualizarNavAtivo() {
  const secoes = ['inicio', 'beneficios', 'servicos', 'faq', 'contato'];
  let atual = '';
  secoes.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 100) atual = id;
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('ativo', link.getAttribute('href') === '#' + atual);
  });
}

// === SCROLL REVEAL ===
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.card, .ben-card, .reveal').forEach(el => observer.observe(el));

// === CONTADOR ANIMADO ===
const contadorObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animarContadores();
      contadorObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const secaoContador = document.querySelector('.contador');
if (secaoContador) contadorObserver.observe(secaoContador);

function animarContadores() {
  document.querySelectorAll('.contador-num').forEach(el => {
    const target = +el.dataset.target;
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duracao = 1800;
    const inicio = performance.now();

    function atualizar(agora) {
      const progresso = Math.min((agora - inicio) / duracao, 1);
      const easing = 1 - Math.pow(1 - progresso, 3);
      const valor = Math.floor(easing * target);
      el.textContent = prefix + valor + suffix;
      if (progresso < 1) requestAnimationFrame(atualizar);
    }

    requestAnimationFrame(atualizar);
  });
}

// === FAQ ACCORDION ===
document.querySelectorAll('.faq-pergunta').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const aberto = item.classList.contains('aberto');

    // Fecha todos
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('aberto'));

    // Abre o clicado (se não estava aberto)
    if (!aberto) item.classList.add('aberto');
  });
});
