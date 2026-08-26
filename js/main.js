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

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('aberto'));
});

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

// === PARTÍCULAS FLUTUANTES NO HERO ===
function criarParticulas() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  for (let i = 0; i < 28; i++) {
    const p = document.createElement('span');
    p.className = 'particula';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      animation-delay: ${Math.random() * 6}s;
      animation-duration: ${Math.random() * 8 + 6}s;
      opacity: ${Math.random() * 0.5 + 0.1};
    `;
    hero.appendChild(p);
  }
}
criarParticulas();

// === EFEITO DIGITAÇÃO NO TÍTULO ===
function efetitoDigitacao() {
  const titulo = document.querySelector('.hero-titulo');
  if (!titulo) return;
  const textoCompleto = titulo.innerHTML;
  titulo.style.opacity = '1';

  const textoSpan = titulo.querySelector('span');
  const textoAlana = 'Alana';
  const textoTech = textoSpan ? textoSpan.textContent : 'Tech';

  titulo.innerHTML = '';
  let i = 0;
  let fase = 0; // 0 = Alana, 1 = Tech

  function digitar() {
    if (fase === 0) {
      titulo.textContent = textoAlana.slice(0, i + 1);
      i++;
      if (i >= textoAlana.length) { fase = 1; i = 0; setTimeout(digitar, 200); return; }
    } else {
      const span = document.createElement('span');
      span.textContent = textoTech.slice(0, i + 1);
      titulo.innerHTML = textoAlana;
      titulo.appendChild(span);
      i++;
      if (i >= textoTech.length) return;
    }
    setTimeout(digitar, 80 + Math.random() * 40);
  }

  setTimeout(digitar, 400);
}
efetitoDigitacao();

// === SCROLL REVEAL com easing escalonado ===
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

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
    const duracao = 2000;
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
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('aberto'));
    if (!aberto) item.classList.add('aberto');
  });
});

// === FORMULÁRIO → WHATSAPP ===
const form = document.getElementById('formContato');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const nome = document.getElementById('nome').value.trim();
    const whatsapp = document.getElementById('whatsapp').value.trim();
    const tipo = document.getElementById('tipoSite').value;
    const msg = document.getElementById('mensagem').value.trim();

    const texto = `Olá Alana! 👋\n\n*Nome:* ${nome}\n*WhatsApp:* ${whatsapp}\n*Tipo de site:* ${tipo || 'Não informado'}\n*Mensagem:* ${msg || 'Nenhuma mensagem adicional'}\n\nGostaria de saber mais sobre os seus serviços!`;
    window.open(`https://wa.me/5567991077340?text=${encodeURIComponent(texto)}`, '_blank');
  });
}

// === EFEITO PARALLAX SUAVE NO HERO ===
window.addEventListener('scroll', () => {
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg && window.scrollY < window.innerHeight) {
    heroBg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
  }
});
