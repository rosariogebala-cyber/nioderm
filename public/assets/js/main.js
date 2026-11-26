import { track, loadGTM } from './analytics.js';
import { initForm } from './form.js';
import { initChat } from './chat.js';
import { initVideos } from './video.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
const desktop = matchMedia('(min-width: 1024px)');

/* Cada módulo se inicializa aislado: si uno falla, el resto sigue funcionando. */
function safe(name, fn) {
  try { fn(); } catch (err) { console.error(`[nioderm] ${name}`, err); }
}

/* ---------- Header: fondo sólido al scrollear + tono según sección ---------- */
function initHeader() {
  const header = $('[data-header]');
  const hero = $('.hero');
  const darkSections = $$('.section--ink, .section--ink-2, .bio, .footer');
  let ticking = false;
  const update = () => {
    ticking = false;
    const y = window.scrollY;
    const heroBottom = hero.offsetTop + hero.offsetHeight - header.offsetHeight;
    header.classList.toggle('is-solid', y > 8);
    const probe = header.offsetHeight / 2;
    const onDark = y < heroBottom || darkSections.some((s) => {
      const r = s.getBoundingClientRect();
      return r.top <= probe && r.bottom >= probe;
    });
    header.classList.toggle('is-on-dark', onDark);
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener('resize', update, { passive: true });
  update();
}

/* ---------- Menú móvil accesible ---------- */
function initNav() {
  const toggle = $('[data-nav-toggle]');
  const menu = $('[data-nav-menu]');
  const label = $('.nav__toggle-label', toggle);
  const open = (state) => {
    toggle.setAttribute('aria-expanded', String(state));
    menu.classList.toggle('is-open', state);
    label.textContent = state ? 'Cerrar' : 'Menú';
    document.documentElement.style.overflow = state ? 'hidden' : '';
    if (state) $('a', menu)?.focus();
  };
  toggle.addEventListener('click', () => open(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (e) => { if (e.target.closest('a') && !desktop.matches) open(false); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) { open(false); toggle.focus(); }
    // Mantiene el foco dentro del menú abierto
    if (e.key === 'Tab' && menu.classList.contains('is-open')) {
      const items = [toggle, ...$$('a', menu)];
      const i = items.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); items.at(-1).focus(); }
      else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0].focus(); }
    }
  });
  desktop.addEventListener('change', (e) => { if (e.matches) open(false); });

  // Sección activa en la navegación
  const links = $$('.nav__list a');
  const map = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      const a = map.get(en.target.id);
      if (a && en.isIntersecting) { links.forEach((l) => l.removeAttribute('aria-current')); a.setAttribute('aria-current', 'true'); }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  map.forEach((_, id) => { const el = document.getElementById(id); if (el) io.observe(el); });
}

/* ---------- Reveals al entrar en viewport ---------- */
function initReveal() {
  const els = $$('[data-reveal]');
  if (reduceMotion.matches || !('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('is-in')); return; }
  // Escalonado entre hermanos
  els.forEach((el) => {
    const sibs = [...el.parentElement.children].filter((c) => c.hasAttribute('data-reveal'));
    const i = sibs.indexOf(el);
    if (i > 0) el.style.setProperty('--d', `${Math.min(i, 6) * 80}ms`);
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  els.forEach((e) => io.observe(e));
}

/* ---------- Parallax multicapa del hero (puntero + scroll) ---------- */
function initParallax() {
  const root = $('[data-parallax-root]');
  if (!root || reduceMotion.matches) return;
  const layers = $$('[data-depth]', root).map((el) => ({ el, d: parseFloat(el.dataset.depth) }));
  let px = 0, py = 0, tx = 0, ty = 0, sy = 0, raf = 0, visible = true;
  const loop = () => {
    tx += (px - tx) * 0.08; ty += (py - ty) * 0.08;
    layers.forEach(({ el, d }) => {
      el.style.translate = `${(tx * d * 22).toFixed(2)}px ${(ty * d * 22 - sy * d * 0.18).toFixed(2)}px`;
    });
    raf = Math.abs(px - tx) > 0.001 || Math.abs(py - ty) > 0.001 ? requestAnimationFrame(loop) : 0;
  };
  const kick = () => { if (!raf && visible) raf = requestAnimationFrame(loop); };
  if (finePointer.matches) {
    root.closest('.hero').addEventListener('pointermove', (e) => {
      px = e.clientX / innerWidth - 0.5; py = e.clientY / innerHeight - 0.5; kick();
    }, { passive: true });
  }
  addEventListener('scroll', () => { sy = Math.min(window.scrollY, 900); kick(); }, { passive: true });
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) kick(); }).observe(root);
  // El parallax usa la propiedad `translate`, independiente de `transform` (que usan las animaciones de entrada).
}

/* ---------- Pila de capas (composición) ---------- */
function initStack() {
  const stack = $('[data-stack]');
  if (!stack) return;
  const layers = $$('[data-layer]', stack);
  const items = $$('[data-layer-trigger]', stack);
  new IntersectionObserver(([en]) => { if (en.isIntersecting) stack.classList.add('is-exploded'); }, { threshold: 0.35 }).observe(stack);
  const focus = (i) => {
    stack.classList.toggle('has-focus', i != null);
    layers.forEach((l) => l.classList.toggle('is-focus', l.dataset.layer === String(i)));
    items.forEach((it) => it.classList.toggle('is-focus', it.dataset.layerTrigger === String(i)));
  };
  items.forEach((it) => {
    it.addEventListener('pointerenter', () => focus(it.dataset.layerTrigger));
    it.addEventListener('pointerleave', () => focus(null));
  });
  if (reduceMotion.matches) stack.classList.add('is-exploded');
}

/* ---------- Mecanismo: imagen sticky sincronizada con los pasos ---------- */
function initMechanism() {
  const steps = $$('[data-mech-step]');
  const imgs = $$('[data-mech-img]');
  const bar = $('[data-mech-bar]');
  if (!steps.length) return;
  const set = (i) => {
    steps.forEach((s, k) => s.classList.toggle('is-active', k === i));
    imgs.forEach((im, k) => im.classList.toggle('is-active', k === i));
    bar?.parentElement.style.setProperty('--p', ((i + 1) / steps.length).toFixed(3));
    bar && (bar.style.transform = `scaleX(${(i + 1) / steps.length})`);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) set(steps.indexOf(en.target)); });
  }, { rootMargin: '-45% 0px -45% 0px' });
  steps.forEach((s) => io.observe(s));
  set(0);
}

/* ---------- Proceso: línea de progreso según scroll ---------- */
function initProcess() {
  const list = $('.process__steps');
  if (!list) return;
  const items = $$('li', list);
  let ticking = false;
  const update = () => {
    ticking = false;
    const r = list.getBoundingClientRect();
    const mid = innerHeight * 0.55;
    const p = Math.min(1, Math.max(0, (mid - r.top) / r.height));
    list.style.setProperty('--progress', p.toFixed(3));
    items.forEach((li) => li.classList.toggle('is-passed', li.getBoundingClientRect().top + 20 < mid));
  };
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

/* ---------- Filmstrip del caso clínico ---------- */
function initFilmstrip() {
  const strip = $('.filmstrip');
  if (!strip) return;
  const prev = $('[data-strip="prev"]');
  const next = $('[data-strip="next"]');
  const step = () => strip.querySelector('li').getBoundingClientRect().width + 16;
  const sync = () => {
    prev.disabled = strip.scrollLeft < 4;
    next.disabled = strip.scrollLeft + strip.clientWidth >= strip.scrollWidth - 4;
  };
  prev.addEventListener('click', () => strip.scrollBy({ left: -step(), behavior: reduceMotion.matches ? 'auto' : 'smooth' }));
  next.addEventListener('click', () => strip.scrollBy({ left: step(), behavior: reduceMotion.matches ? 'auto' : 'smooth' }));
  strip.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next.click(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev.click(); }
  });
  strip.addEventListener('scroll', sync, { passive: true });
  addEventListener('resize', sync, { passive: true });
  sync();
}

/* ---------- Barra móvil de conversión ---------- */
function initMobileBar() {
  const bar = $('[data-mobile-bar]');
  const hero = $('.hero');
  const contact = $('#contacto');
  if (!bar) return;
  let pastHero = false, atContact = false;
  const sync = () => bar.classList.toggle('is-visible', pastHero && !atContact);
  new IntersectionObserver(([en]) => { pastHero = !en.isIntersecting; sync(); }).observe(hero);
  new IntersectionObserver(([en]) => { atContact = en.isIntersecting; sync(); }, { rootMargin: '0px 0px -20% 0px' }).observe(contact);
}

/* ---------- Brillo que sigue al puntero en botones ---------- */
function initButtonGlow() {
  if (!finePointer.matches) return;
  document.addEventListener('pointermove', (e) => {
    const b = e.target.closest?.('.btn');
    if (!b) return;
    const r = b.getBoundingClientRect();
    b.style.setProperty('--mx', `${e.clientX - r.left}px`);
    b.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, { passive: true });
}

/* ---------- Tracking de CTAs ---------- */
function initTracking() {
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-track]');
    if (el) track(el.dataset.track, { label: el.dataset.trackLabel || el.textContent.trim().slice(0, 60) });
    const prof = e.target.closest('[data-profile]');
    if (prof) {
      const radio = document.querySelector(`input[name="perfil"][value="${prof.dataset.profile}"]`);
      if (radio) { radio.checked = true; radio.dispatchEvent(new Event('change', { bubbles: true })); }
    }
  });
}

safe('header', initHeader);
safe('nav', initNav);
safe('reveal', initReveal);
safe('parallax', initParallax);
safe('stack', initStack);
safe('mechanism', initMechanism);
safe('process', initProcess);
safe('filmstrip', initFilmstrip);
safe('mobileBar', initMobileBar);
safe('glow', initButtonGlow);
safe('tracking', initTracking);
safe('form', initForm);
safe('chat', initChat);
safe('videos', initVideos);
safe('gtm', loadGTM);
