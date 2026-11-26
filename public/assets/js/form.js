import { track } from './analytics.js';

const MSG = {
  nombre: 'Ingresá tu nombre y apellido.',
  emailEmpty: 'Ingresá tu email.',
  emailBad: 'Revisá el formato del email (ej.: nombre@dominio.com).',
  tel: 'Revisá el teléfono: usá sólo números, espacios, guiones o +.',
  provincia: 'Seleccioná una provincia.',
  consentimiento: 'Necesitamos tu autorización para responderte.'
};

export function initForm() {
  const form = document.querySelector('[data-form]');
  if (!form) return;
  const cfg = window.NIODERM_CONFIG || {};
  const summary = form.querySelector('[data-form-summary]');
  const submit = form.querySelector('[data-submit]');
  const done = document.querySelector('[data-form-done]');
  const fallback = document.querySelector('[data-form-fallback]');
  const proOnly = form.querySelector('[data-pro-only]');
  let started = false;

  const field = (name) => form.elements[name];
  const errEl = (input) => document.getElementById(input.getAttribute('aria-describedby'));

  const setError = (input, msg) => {
    const el = errEl(input);
    if (msg) { input.setAttribute('aria-invalid', 'true'); if (el) { el.textContent = msg; el.hidden = false; } }
    else { input.removeAttribute('aria-invalid'); if (el) { el.textContent = ''; el.hidden = true; } }
  };

  const validators = {
    nombre: (v) => (v.trim().length < 2 ? MSG.nombre : ''),
    email: (v) => (!v.trim() ? MSG.emailEmpty : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : MSG.emailBad),
    telefono: (v) => (v && !/^[+()\d\s.-]{6,}$/.test(v.trim()) ? MSG.tel : ''),
    provincia: (v) => (!v ? MSG.provincia : ''),
    consentimiento: (_, el) => (!el.checked ? MSG.consentimiento : '')
  };

  const validateField = (name) => {
    const el = field(name);
    const msg = validators[name](el.value, el);
    setError(el, msg);
    return msg;
  };

  // Valida al salir del campo y corrige en vivo una vez marcado como inválido
  Object.keys(validators).forEach((name) => {
    const el = field(name);
    el.addEventListener('blur', () => { if (el.value || el.type === 'checkbox') validateField(name); });
    el.addEventListener(el.type === 'checkbox' || el.tagName === 'SELECT' ? 'change' : 'input', () => {
      if (el.getAttribute('aria-invalid') === 'true') validateField(name);
    });
  });

  form.addEventListener('focusin', () => { if (!started) { started = true; track('form_start'); } });

  // Campos condicionales según perfil
  const syncProfile = () => {
    const perfil = form.elements.perfil.value;
    proOnly.hidden = perfil === 'paciente';
    const esp = form.elements.especialidad;
    esp.closest('.field').hidden = perfil === 'institucion';
  };
  form.addEventListener('change', (e) => { if (e.target.name === 'perfil') syncProfile(); });
  syncProfile();

  const data = () => {
    const fd = new FormData(form);
    const o = Object.fromEntries(fd.entries());
    o.consentimiento = !!form.elements.consentimiento.checked;
    o.origen = location.href;
    return o;
  };

  const mailtoHref = (o) => {
    const lines = [
      `Perfil: ${o.perfil}`, `Nombre: ${o.nombre}`, `Email: ${o.email}`, o.telefono && `Teléfono: ${o.telefono}`,
      `Provincia: ${o.provincia}`, o.especialidad && `Especialidad: ${o.especialidad}`, o.institucion && `Institución: ${o.institucion}`,
      '', o.mensaje || ''
    ].filter((l) => l !== undefined && l !== false && l !== '');
    return `mailto:${cfg.contactEmail || 'consultas@nioderm.com.ar'}?subject=${encodeURIComponent('Consulta NIODERM — ' + o.nombre)}&body=${encodeURIComponent(lines.join('\n'))}`;
  };

  const show = (el) => { form.hidden = true; [done, fallback].forEach((x) => (x.hidden = x !== el)); el.focus(); };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const errors = Object.keys(validators).map((n) => [n, validateField(n)]).filter(([, m]) => m);
    if (errors.length) {
      summary.innerHTML = `<strong>Revisá ${errors.length === 1 ? 'este campo' : `estos ${errors.length} campos`}:</strong><ul>${errors
        .map(([n, m]) => `<li><a href="#${field(n).id}">${m}</a></li>`).join('')}</ul>`;
      summary.hidden = false;
      summary.focus();
      track('form_error', { fields: errors.map(([n]) => n).join(',') });
      return;
    }
    summary.hidden = true;

    const o = data();
    if (o.website) { show(done); return; } // honeypot: bot

    submit.classList.add('is-loading');
    submit.disabled = true;
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), 12000);
      const endpoint = cfg.formEndpoint || 'api/contact';
      const viaRelay = /formsubmit\.co/.test(endpoint);
      const body = viaRelay ? {
        _subject: `Consulta NIODERM · ${o.perfil} · ${o.nombre}`,
        _template: 'table',
        _captcha: 'false',
        name: o.nombre,
        email: o.email,
        message: o.mensaje || '(sin mensaje)',
        Perfil: o.perfil,
        Teléfono: o.telefono || '',
        Provincia: o.provincia,
        Especialidad: o.especialidad || '',
        Institución: o.institucion || '',
        Página: o.origen
      } : o;
      const res = await fetch(endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body), signal: ctrl.signal
      });
      clearTimeout(t);
      const reply = await res.json().catch(() => ({}));
      if (!res.ok || reply.success === false || reply.success === 'false') throw new Error(reply.message || `HTTP ${res.status}`);
      track('form_submit', { perfil: o.perfil, provincia: o.provincia });
      show(done);
      form.reset();
      syncProfile();
    } catch (err) {
      console.warn('[nioderm] form', err);
      fallback.querySelector('[data-mailto]').href = mailtoHref(o);
      track('form_fallback');
      show(fallback);
    } finally {
      submit.classList.remove('is-loading');
      submit.disabled = false;
    }
  });

  const back = () => { done.hidden = true; fallback.hidden = true; form.hidden = false; form.elements.nombre.focus(); };
  document.querySelector('[data-form-reset]')?.addEventListener('click', back);
  document.querySelector('[data-form-retry]')?.addEventListener('click', back);
  fallback.querySelector('[data-mailto]')?.addEventListener('click', () => track('form_mailto'));
}
