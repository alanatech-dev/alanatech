// === CURSOR ===
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
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  atualizarNavAtivo();
  animarFogueteLateral();
});

hamburger?.addEventListener('click', () => navLinks.classList.toggle('aberto'));
document.querySelectorAll('.nav-link').forEach(l => l.addEventListener('click', () => navLinks.classList.remove('aberto')));

function atualizarNavAtivo() {
  const ids = ['inicio','sobre','servicos','planos','faq','contato'];
  let atual = '';
  ids.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 120) atual = id;
  });
  document.querySelectorAll('.nav-link').forEach(l =>
    l.classList.toggle('ativo', l.getAttribute('href') === '#' + atual)
  );
}

// === PARTÍCULAS HERO ===
(function criarParticulas() {
  const container = document.getElementById('heroParticles');
  if (!container) return;
  for (let i = 0; i < 32; i++) {
    const p = document.createElement('span');
    p.className = 'particula';
    const dur = (Math.random() * 8 + 6).toFixed(1) + 's';
    p.style.cssText = `
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      width:${Math.random() * 3 + 1}px;
      height:${Math.random() * 3 + 1}px;
      animation-delay:${(Math.random() * 6).toFixed(1)}s;
      animation-duration:${dur};
      opacity:${(Math.random() * 0.5 + 0.1).toFixed(2)};
    `;
    container.appendChild(p);
  }
})();

// === SCROLL REVEAL ===
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 100);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .card, .ben-card').forEach(el => revealObs.observe(el));

// === FOGUETE NO GRÁFICO ===
const foguete = document.getElementById('fogueteGrafico');
const fogueteSecao = document.getElementById('foguete-secao');

if (foguete && fogueteSecao) {
  let animado = false;
  const fogueteObs = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting && !animado) {
      animado = true;
      fogueteObs.disconnect();

      // Sobe ao longo do gráfico
      setTimeout(() => {
        foguete.style.bottom = '88%';
      }, 300);

      // Depois de subir, voa para fora
      setTimeout(() => {
        foguete.classList.add('lancado');
      }, 2400);
    }
  }, { threshold: 0.4 });

  fogueteObs.observe(fogueteSecao);
}

// === FOGUETE LATERAL (scroll) ===
const fogueteLateral = document.getElementById('fogueteLateral');
const footerEl = document.getElementById('footer');

function animarFogueteLateral() {
  if (!fogueteLateral) return;

  const scrollY    = window.scrollY;
  const docHeight  = document.body.scrollHeight;
  const winHeight  = window.innerHeight;
  const heroHeight = winHeight;

  // Mostrar após passar do hero
  if (scrollY > heroHeight * 0.7) {
    fogueteLateral.classList.add('visivel');
  } else {
    fogueteLateral.classList.remove('visivel');
    return;
  }

  // Esconder perto do footer
  if (footerEl) {
    const footerTop = footerEl.getBoundingClientRect().top;
    if (footerTop < winHeight * 0.5) {
      fogueteLateral.classList.remove('visivel');
      return;
    }
  }

  // Posição Y: sobe conforme scrollY aumenta
  const scrollMax   = docHeight - winHeight;
  const progresso   = Math.min(scrollY / scrollMax, 1);
  const topMin      = 10;   // % do topo quando quase no final
  const topMax      = 85;   // % quando começa a aparecer
  const topPct      = topMax - progresso * (topMax - topMin);

  fogueteLateral.style.top = topPct + 'vh';
}

// === CONTADOR ANIMADO ===
const contadorObs = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) {
    contadorObs.disconnect();
    document.querySelectorAll('.contador-num').forEach(el => {
      const target  = +el.dataset.target;
      const prefix  = el.dataset.prefix  || '';
      const suffix  = el.dataset.suffix  || '';
      const duracao = 2000;
      const inicio  = performance.now();
      function tick(agora) {
        const t = Math.min((agora - inicio) / duracao, 1);
        const e = 1 - Math.pow(1 - t, 3);
        el.textContent = prefix + Math.floor(e * target) + suffix;
        if (t < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }
}, { threshold: 0.5 });

const secContador = document.querySelector('.contador');
if (secContador) contadorObs.observe(secContador);

// === FAQ ACCORDION ===
document.querySelectorAll('.faq-pergunta').forEach(btn => {
  btn.addEventListener('click', () => {
    const item   = btn.closest('.faq-item');
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
    const nome     = document.getElementById('nome').value.trim();
    const whats    = document.getElementById('whatsapp').value.trim();
    const tipo     = document.getElementById('tipoSite').value;
    const msg      = document.getElementById('mensagem').value.trim();
    const texto    = `Olá Alana! 👋\n\n*Nome:* ${nome}\n*WhatsApp:* ${whats}\n*Tipo de site:* ${tipo || 'Não informado'}\n*Mensagem:* ${msg || 'Nenhuma mensagem adicional'}\n\nGostaria de um orçamento!`;
    window.open(`https://wa.me/5567991077340?text=${encodeURIComponent(texto)}`, '_blank');
  });
}
