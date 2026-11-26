import { FAQ } from './kb.js';
import { TRIAGE } from './triage.js';
import { track } from './analytics.js';

/* Asistente por reglas, con dos modos:
   1. Preguntas: responde sólo con información verificada (src/faq.json). Si no encuentra
      coincidencia, deriva a una persona.
   2. Evaluación de indicación: cuestionario guiado (triage.js) que devuelve
      apto / apto con observaciones / no incluido, y precarga el formulario de contacto. */

const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9ñ\s.,x]/g, ' ');
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const SUGGESTED = ['que-es', 'indicaciones', 'proceso', 'estudios', 'seguridad', 'acceso'];
const SHORT = {
  'que-es': '¿Qué es?', indicaciones: 'Indicaciones', proceso: 'Cómo funciona', estudios: 'Estudios previos',
  seguridad: 'Seguridad', acceso: 'Cómo solicitarlo', lecho: 'Preparación del lecho', conservacion: 'Conservación',
  interacciones: 'Interacciones', poblaciones: 'Embarazo y pediatría', quien: '¿Quién lo indica?'
};
const EVAL_INTENT = /\b(evaluar|evaluacion|apto|candidato|criterios de inclusion|mi paciente|incluir a)\b/;

function score(q, item) {
  const words = norm(q).split(/\s+/).filter(Boolean);
  const phrase = ` ${words.join(' ')} `;
  let s = 0;
  for (const k of item.keys) {
    const nk = norm(k).trim().replace(/\s+/g, ' ');
    if (!nk) continue;
    if (nk.includes(' ')) { if (phrase.includes(` ${nk} `)) s += 3; continue; }
    if (words.includes(nk)) { s += 2; continue; }
    // singular/plural y variantes: comparte raíz de al menos 5 letras desde el inicio de la palabra
    const stem = nk.length > 5 ? nk.slice(0, -1) : null;
    if (stem && words.some((w) => w.startsWith(stem) && Math.abs(w.length - nk.length) <= 2)) s += 1;
  }
  return s;
}

/* Área en cm² a partir de "12 x 8", "12x8", "12 por 8" o "96" */
function parseArea(text) {
  const t = norm(text).replace(/,/g, '.');
  const m = t.match(/(\d+(?:\.\d+)?)\s*(?:x|por|\*)\s*(\d+(?:\.\d+)?)/);
  if (m) return { area: +m[1] * +m[2], dims: `${m[1]} × ${m[2]} cm` };
  const n = t.match(/(\d+(?:\.\d+)?)/);
  if (n && +n[1] > 0) return { area: +n[1], dims: null };
  return null;
}

export function initChat() {
  const root = document.querySelector('[data-chat]');
  if (!root) return;
  const cfg = window.NIODERM_CONFIG || {};
  const toggle = root.querySelector('[data-chat-toggle]');
  const panel = root.querySelector('[data-chat-panel]');
  const close = root.querySelector('[data-chat-close]');
  const log = root.querySelector('[data-chat-log]');
  const chips = root.querySelector('[data-chat-chips]');
  const form = root.querySelector('[data-chat-form]');
  const input = root.querySelector('[data-chat-input]');
  const defaultPlaceholder = input.placeholder;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let greeted = false;
  let lastFocus = null;
  let ev = null; // estado de la evaluación en curso

  const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
  const scroll = () => { log.scrollTop = log.scrollHeight; };

  const say = (html, actions = [], cls = '') => new Promise((resolve) => {
    const typing = el('div', 'msg msg--bot msg--typing', '<i></i><i></i><i></i>');
    typing.setAttribute('aria-hidden', 'true');
    log.appendChild(typing); scroll();
    setTimeout(() => {
      typing.remove();
      const m = el('div', `msg msg--bot ${cls}`.trim(), html);
      if (actions.length) {
        const wrap = el('div', 'msg__actions');
        actions.forEach((a) => wrap.appendChild(a));
        m.appendChild(wrap);
      }
      log.appendChild(m); scroll(); resolve(m);
    }, reduce ? 0 : 420);
  });

  const userSays = (text) => { const m = el('div', 'msg msg--user'); m.textContent = text; log.appendChild(m); scroll(); };

  const link = (label, href, ev2) => {
    const a = el('a', null); a.href = href; a.textContent = label;
    if (href.startsWith('#')) a.addEventListener('click', () => setOpen(false));
    if (ev2) a.addEventListener('click', () => track(ev2));
    if (/^https?:/.test(href)) { a.target = '_blank'; a.rel = 'noopener'; }
    return a;
  };
  const button = (label, fn, cls) => { const b = el('button', cls || null); b.type = 'button'; b.textContent = label; b.addEventListener('click', fn); return b; };
  // Única vía de derivación: el formulario de contacto.
  const goToForm = () => {
    track('chatbot_to_form');
    setOpen(false);
    document.getElementById('contacto')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    setTimeout(() => document.querySelector('[data-form]')?.elements.nombre.focus({ preventScroll: true }), reduce ? 0 : 600);
  };
  const formAction = () => [button('Completar formulario', goToForm)];

  const setChips = (list) => { chips.innerHTML = ''; list.forEach((b) => chips.appendChild(b)); };

  const renderChips = (ids) => {
    setChips([
      button('Evaluar a mi paciente', () => { userSays('Quiero evaluar a mi paciente'); startEval(); }, 'chip--accent'),
      ...ids.map((id) => button(SHORT[id] || id, () => ask(FAQ.find((f) => f.id === id).q, id))),
      button('Completar formulario', goToForm)
    ]);
  };

  /* ───────────── Modo preguntas ───────────── */
  async function ask(text, forcedId) {
    userSays(text);
    track('chatbot_question', { q: forcedId || text.slice(0, 80) });
    if (!forcedId && EVAL_INTENT.test(norm(text))) { startEval(); return; }
    let item = forcedId && FAQ.find((f) => f.id === forcedId);
    if (!item) {
      const ranked = FAQ.map((f) => [f, score(text, f)]).sort((a, b) => b[1] - a[1]);
      if (ranked[0][1] > 0) item = ranked[0][0];
    }
    if (/^(hola|buenas|buen dia|buenos dias|buenas tardes|hey)\b/.test(norm(text).trim()) && !item) {
      await say('¡Hola! ¿Sobre qué tema de NIODERM® querés saber? También puedo ayudarte a evaluar si tu paciente es candidato.');
      return;
    }
    if (!item) {
      await say('No tengo una respuesta verificada para esa consulta. Prefiero no improvisar: dejanos tu consulta en el formulario y el equipo de Terapias Avanzadas te responde.', formAction());
      track('chatbot_fallback');
      return;
    }
    await say(esc(item.a), item.id === 'acceso' ? formAction() : []);
    renderChips(FAQ.filter((f) => f.id !== item.id && SHORT[f.id]).slice(0, 4).map((f) => f.id));
  }

  /* ───────────── Modo evaluación ───────────── */
  const steps = TRIAGE.steps;

  function status() {
    if (ev.excludes.length) return 'red';
    if (ev.observes.length) return 'yellow';
    return 'green';
  }

  async function startEval() {
    ev = { i: -1, answers: {}, excludes: [], observes: [], advice: [], multi: new Set() };
    track('chatbot_eval_start');
    await say(TRIAGE.intro);
    next();
  }

  function cancelEval(silent) {
    ev = null;
    input.placeholder = defaultPlaceholder;
    input.removeAttribute('inputmode');
    if (!silent) { userSays('Cancelar evaluación'); say('Listo, cancelé la evaluación. ¿En qué más te ayudo?'); }
    renderChips(SUGGESTED);
  }

  async function next() {
    // Avanza al siguiente paso aplicable
    do { ev.i += 1; } while (ev.i < steps.length && steps[ev.i].onlyIfEligible && status() === 'red');
    if (ev.i >= steps.length) { finish(); return; }
    const s = steps[ev.i];
    const blockChanged = ev.i === 0 || steps[ev.i - 1].block !== s.block;
    const head = blockChanged ? `<span class="msg__eyebrow">${esc(s.block)}</span>` : '';
    const cancel = button('Cancelar evaluación', () => cancelEval(), 'chip--ghost');
    input.placeholder = 'Elegí una opción o escribí…';
    input.removeAttribute('inputmode');
    setChips([cancel]);

    // Las opciones van dentro del mensaje de la pregunta, así pregunta y respuestas se leen juntas.
    const lock = (msg) => msg.querySelectorAll('.msg__options button').forEach((x) => { x.disabled = true; });
    if (s.type === 'single') {
      const msg = await say(`${head}${esc(s.q)}`, [], 'msg--question');
      const wrap = el('div', 'msg__options');
      s.options.forEach((o) => wrap.appendChild(button(o.v, (e) => {
        lock(msg); e.currentTarget.setAttribute('aria-pressed', 'true'); answer(o.v);
      })));
      msg.appendChild(wrap); scroll();
      ev.lockCurrent = () => lock(msg);
    } else if (s.type === 'multi') {
      const msg = await say(`${head}${esc(s.q)}`, [], 'msg--question');
      const wrap = el('div', 'msg__options');
      ev.multi = new Set();
      const noneOpt = s.options.find((o) => o.none);
      const btns = [];
      s.options.forEach((o) => {
        const b = button(o.v, () => {
          const on = b.getAttribute('aria-pressed') !== 'true';
          if (o.none) {
            btns.forEach((x) => x.setAttribute('aria-pressed', 'false'));
            ev.multi = on ? new Set([o.v]) : new Set();
          } else {
            if (noneOpt) { btns[s.options.indexOf(noneOpt)].setAttribute('aria-pressed', 'false'); ev.multi.delete(noneOpt.v); }
            if (on) ev.multi.add(o.v); else ev.multi.delete(o.v);
          }
          b.setAttribute('aria-pressed', String(on));
        }, 'is-toggle');
        b.setAttribute('aria-pressed', 'false');
        btns.push(b); wrap.appendChild(b);
      });
      const go = button('Continuar', () => {
        if (!ev.multi.size) { say('Elegí al menos una opción, o "Ninguno".'); return; }
        lock(msg);
        answer([...ev.multi].join(', '), [...ev.multi]);
      }, 'is-primary');
      wrap.appendChild(go);
      msg.appendChild(wrap); scroll();
      ev.lockCurrent = () => lock(msg);
    } else {
      await say(`${head}${esc(s.q)}`, [], 'msg--question');
      ev.lockCurrent = null;
      input.placeholder = s.type === 'number' ? 'Ej.: 64' : s.type === 'area' ? 'Ej.: 12 x 8' : 'Ej.: 15/12, Hospital…';
      if (s.type === 'number') input.setAttribute('inputmode', 'numeric');
      if (s.optional) setChips([button('Omitir', () => answer('—')), cancel]);
      input.focus();
    }
  }

  async function answer(text, multiValues) {
    const s = steps[ev.i];
    userSays(text);
    if (s.type === 'single') {
      const opt = s.options.find((o) => o.v === text);
      if (!opt) { await say('No entendí la respuesta. Elegí una de las opciones de arriba.'); return; }
      ev.lockCurrent?.();
      ev.answers[s.id] = opt.v;
      if (opt.exclude) ev.excludes.push(opt.exclude);
      if (opt.observe) ev.observes.push(opt.observe);
      if (opt.advice) ev.advice.push(opt.advice);
    } else if (s.type === 'multi') {
      ev.answers[s.id] = text;
      let flagged = false;
      multiValues.forEach((v) => { const o = s.options.find((x) => x.v === v); if (o?.observe) { ev.observes.push(o.observe); flagged = true; } });
      if (flagged && s.advice) ev.advice.push(s.advice);
    } else if (s.type === 'number') {
      const n = parseFloat(text.replace(',', '.'));
      if (!Number.isFinite(n) || n < s.min || n > s.max) { await say(`Ingresá un número entre ${s.min} y ${s.max}.`); return; }
      ev.answers[s.id] = `${n} años`;
      const r = s.check?.(n);
      if (r?.observe) ev.observes.push(r.observe);
    } else if (s.type === 'area') {
      const a = parseArea(text);
      if (!a || a.area <= 0 || a.area > 5000) { await say('No pude leer las medidas. Escribí, por ejemplo, "12 x 8" o "96".'); return; }
      const n = Math.max(1, Math.ceil(a.area / TRIAGE.membraneArea));
      ev.answers[s.id] = `${a.dims ? `${a.dims} · ` : ''}${Math.round(a.area)} cm²`;
      ev.membranes = n;
    } else {
      ev.answers[s.id] = text.trim().slice(0, 200) || '—';
    }
    next();
  }

  function summaryText() {
    const r = TRIAGE.results[status()];
    const lines = ['EVALUACIÓN ORIENTATIVA DE INDICACIÓN — NIODERM', `Resultado: ${r.label}`, ''];
    steps.forEach((s) => { if (ev.answers[s.id]) lines.push(`• ${s.label}: ${ev.answers[s.id]}`); });
    if (ev.membranes) lines.push(`• Estimación: ${ev.membranes} membrana${ev.membranes > 1 ? 's' : ''} de 6 × 6 cm (orientativo)`);
    if (ev.excludes.length) lines.push('', 'Motivos de exclusión:', ...ev.excludes.map((x) => `- ${x}`));
    if (ev.observes.length) lines.push('', 'Observaciones:', ...ev.observes.map((x) => `- ${x}`));
    if (ev.advice.length) lines.push('', 'Recomendaciones:', ...[...new Set(ev.advice)].map((x) => `- ${x}`));
    return lines.join('\n').slice(0, 1990);
  }

  function prefillForm() {
    const formEl = document.querySelector('[data-form]');
    if (!formEl) return;
    const pro = formEl.querySelector('input[name="perfil"][value="profesional"]');
    if (pro) { pro.checked = true; pro.dispatchEvent(new Event('change', { bubbles: true })); }
    formEl.elements.mensaje.value = summaryText();
    track('chatbot_eval_to_form', { status: status() });
    setOpen(false);
    document.getElementById('contacto')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    setTimeout(() => formEl.elements.nombre.focus({ preventScroll: true }), reduce ? 0 : 600);
  }

  async function finish() {
    const st = status();
    const r = TRIAGE.results[st];
    input.placeholder = defaultPlaceholder;
    input.removeAttribute('inputmode');
    track('chatbot_eval_result', { status: st });
    const list = (title, arr) => (arr.length ? `<p class="msg__label">${title}</p><ul>${[...new Set(arr)].map((x) => `<li>${esc(x)}</li>`).join('')}</ul>` : '');
    const size = ev.membranes && st !== 'red'
      ? `<p class="msg__label">Dimensionamiento</p><p>${esc(ev.answers.area)} → aprox. <strong>${ev.membranes} membrana${ev.membranes > 1 ? 's' : ''} de 6 × 6 cm</strong>. Es una estimación: la cantidad final la define el equipo según la superficie a cubrir.</p>` : '';
    const html = `<div class="result result--${st}"><span class="result__dot" aria-hidden="true"></span><strong>${r.label}</strong></div>
      <p>${r.text}</p>${list('Motivos', ev.excludes)}${list('Observaciones', ev.observes)}${list('Recomendaciones', ev.advice)}${size}
      ${st !== 'red' ? '<p class="msg__note">Podés enviar fotografías clínicas del lecho limpio, con regla métrica, por email al equipo.</p>' : ''}
      <p class="msg__note">Resultado orientativo. La indicación final depende del criterio médico y de la evaluación del equipo de Terapias Avanzadas.</p>`;
    const actions = st === 'red'
      ? [button('Consultar con el equipo', prefillForm), button('Nueva evaluación', () => { userSays('Nueva evaluación'); startEval(); })]
      : [button('Enviar solicitud con este resumen', prefillForm), button('Nueva evaluación', () => { userSays('Nueva evaluación'); startEval(); })];
    await say(html, actions, 'msg--result');
    ev.done = true;
    setChips([]);
  }

  /* ───────────── Panel ───────────── */
  function setOpen(state) {
    toggle.setAttribute('aria-expanded', String(state));
    panel.hidden = !state;
    root.classList.add('has-opened');
    if (state) {
      lastFocus = document.activeElement;
      if (!greeted) {
        greeted = true;
        say('Hola, soy el asistente de NIODERM®. Respondo con información del prospecto y materiales oficiales, y puedo ayudarte a <strong>evaluar si tu paciente es candidato</strong>. No reemplazo la consulta médica. ¿En qué te ayudo?');
        renderChips(SUGGESTED);
      }
      setTimeout(() => input.focus(), 50);
    } else if (lastFocus && document.contains(lastFocus) && !panel.contains(lastFocus)) {
      toggle.focus();
    }
  }

  toggle.addEventListener('click', () => setOpen(panel.hidden));
  close.addEventListener('click', () => setOpen(false));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !panel.hidden) setOpen(false); });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const v = input.value.trim();
    if (!v) return;
    input.value = '';
    if (ev && !ev.done) {
      const s = steps[ev.i];
      if (/^cancelar/.test(norm(v))) { cancelEval(); return; }
      if (s.type === 'single') {
        const nv = norm(v);
        const opt = s.options.find((o) => norm(o.v).startsWith(nv) || nv.startsWith(norm(o.v).split(' ')[0]));
        answer(opt ? opt.v : v);
        return;
      }
      if (s.type === 'multi') { userSays(v); say('Tocá las opciones que correspondan y después "Continuar".'); return; }
      answer(v);
      return;
    }
    ask(v);
  });
}
