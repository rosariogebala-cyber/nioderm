/* Generado por scripts/build.mjs — editar los módulos individuales. */
(() => {
'use strict';
/* Eventos de conversión → window.dataLayer (compatible con GTM / GA4). */
window.dataLayer = window.dataLayer || [];

function track(event, params = {}) {
  window.dataLayer.push({ event: `nioderm_${event}`, ...params });
}

function loadGTM() {
  const id = window.NIODERM_CONFIG?.gtmId;
  if (!id || !/^GTM-[A-Z0-9]+$/.test(id)) return;
  const load = () => {
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtm.js?id=${id}`;
    document.head.appendChild(s);
  };
  // Carga diferida para no competir con el render inicial
  if ('requestIdleCallback' in window) requestIdleCallback(load, { timeout: 3000 });
  else setTimeout(load, 2000);
}

// Generado por scripts/build.mjs desde src/faq.json — no editar a mano.
const FAQ = [
 {
  "id": "que-es",
  "q": "¿Qué es NIODERM®?",
  "a": "Es un medicamento combinado de ingeniería tisular: una membrana de colágeno de 6 × 6 cm que contiene queratinocitos (cara superior) y fibroblastos (cara inferior) autólogos viables, obtenidos de la piel sana del mismo paciente y amplificados ex vivo en el laboratorio de terapias avanzadas de Cassará.",
  "keys": [
   "que es",
   "qué es",
   "nioderm",
   "producto",
   "medicamento",
   "sustituto",
   "membrana",
   "parche",
   "composicion",
   "composición"
  ]
 },
 {
  "id": "indicaciones",
  "q": "¿En qué casos está indicado?",
  "a": "Está orientado al tratamiento y la regeneración de espesor total de heridas profundas: quemaduras profundas (tipo B), heridas crónicas como úlceras venosas, arteriales o de pie diabético, cobertura tras resecciones quirúrgicas programadas (cicatrices hipertróficas, nevus, lesiones oncológicas) y traumatismos. La indicación en cada caso la define el médico tratante.",
  "keys": [
   "indicacion",
   "indicación",
   "indicado",
   "sirve",
   "casos",
   "quemadura",
   "ulcera",
   "úlcera",
   "pie diabetico",
   "diabético",
   "venosa",
   "herida",
   "cronica",
   "crónica",
   "trauma",
   "cicatriz",
   "nevus"
  ]
 },
 {
  "id": "quien",
  "q": "¿Quién puede indicarlo y aplicarlo?",
  "a": "Es un medicamento de venta bajo receta y uso profesional exclusivo. Lo indica el médico tratante y lo aplica un cirujano idóneo siguiendo el prospecto profesional. La toma de piel sana la realiza un médico de especialidad afín a la cirugía, con matrícula profesional.",
  "keys": [
   "quien",
   "quién",
   "indicar",
   "recetar",
   "receta",
   "aplicar",
   "aplica",
   "medico",
   "médico",
   "cirujano",
   "profesional",
   "dermatologo",
   "dermatólogo"
  ]
 },
 {
  "id": "estudios",
  "q": "¿Qué estudios previos se necesitan?",
  "a": "El médico tratante prescribe análisis para descartar HIV, HTLV, hepatitis B (HBsAg) y hepatitis C, y reacciones negativas para Chagas, VDRL (sífilis) y brucelosis, realizados en sitios autorizados. Con todos los resultados negativos se realiza la toma de piel sana.",
  "keys": [
   "estudio",
   "analisis",
   "análisis",
   "serologia",
   "serología",
   "hiv",
   "hepatitis",
   "chagas",
   "vdrl",
   "previo",
   "requisito"
  ]
 },
 {
  "id": "proceso",
  "q": "¿Cómo es el proceso desde la toma de piel hasta la aplicación?",
  "a": "El flujo operativo tiene cinco pasos. 1) Solicitud médica: el médico tratante evalúa la herida de espesor total y solicita NIODERM® a Cassará, con consentimiento informado, formulario de datos y solicitud de análisis. 2) Muestra de piel sana: se toma en consultorio y se envía refrigerada de inmediato a planta. 3) Cultivo ex vivo bajo normas GMP: aislamiento celular, expansión y siembra sobre ambos lados de la membrana de colágeno. La manufactura lleva de 3 a 4 semanas. 4) Coordinación del procedimiento: el laboratorio avisa la fecha de entrega con 5 a 10 días de anticipación y el médico prepara el lecho para mantenerlo libre de infección. 5) Entrega y aplicación: el envío va en doble pouch estéril con certificado de análisis (CoA). La aplicación es aséptica, en consultorio, con la cara dérmica en contacto con el lecho de la lesión.",
  "keys": [
   "proceso",
   "pasos",
   "como funciona",
   "cómo funciona",
   "flujo",
   "operativo",
   "toma",
   "muestra",
   "biopsia",
   "cultivo",
   "gmp",
   "laboratorio",
   "tiempo",
   "tiempos",
   "cuanto tarda",
   "cuánto tarda",
   "demora",
   "semanas",
   "manufactura",
   "solicitud",
   "coordinacion",
   "coordinación",
   "entrega",
   "pouch",
   "coa",
   "cara dermica",
   "cara dérmica"
  ]
 },
 {
  "id": "lecho",
  "q": "¿Cómo debe prepararse el lecho de la herida?",
  "a": "El laboratorio avisa la fecha de entrega con 5 a 10 días de anticipación. En ese plazo el médico prepara el lecho de la herida para mantenerlo libre de infección. La aplicación es aséptica, en consultorio, y la membrana se coloca con la cara dérmica en contacto con el lecho de la lesión.",
  "keys": [
   "lecho",
   "preparar",
   "preparacion",
   "preparación",
   "debridamiento",
   "infeccion",
   "infección",
   "infectada",
   "antiseptico",
   "antiséptico",
   "clorhexidina",
   "iodo",
   "povidona"
  ]
 },
 {
  "id": "interacciones",
  "q": "¿Qué productos no deben usarse junto con el tratamiento?",
  "a": "No deben usarse agentes citotóxicos o antimicrobianos (acetato de mafenida, sulfato de zinc, iodopovidona, clorhexidina, polimixina/nistatina) sobre las membranas o sobre el lecho inmediatamente antes o después de la aplicación, porque pueden disminuir la viabilidad de las células.",
  "keys": [
   "interaccion",
   "interacción",
   "no usar",
   "evitar",
   "mafenida",
   "zinc",
   "polimixina",
   "nistatina",
   "combinar",
   "medicamentos"
  ]
 },
 {
  "id": "seguridad",
  "q": "¿Tiene efectos adversos?",
  "a": "Como las células son del propio paciente, no se espera una reacción inmunológica frente a ellas y el tratamiento suele ser bien tolerado; no se han detectado efectos indeseados en las aplicaciones realizadas. Debe informarse al médico cualquier antecedente de hipersensibilidad a sus componentes, a gentamicina o a anfotericina B, y vigilarse signos de infección luego de la aplicación.",
  "keys": [
   "efecto",
   "adverso",
   "seguridad",
   "seguro",
   "rechazo",
   "alergia",
   "hipersensibilidad",
   "reaccion",
   "reacción",
   "riesgo",
   "contraindicacion",
   "contraindicación"
  ]
 },
 {
  "id": "poblaciones",
  "q": "¿Puede usarse en embarazo, lactancia o en niños?",
  "a": "No se ha estudiado en mujeres embarazadas ni en período de lactancia, ni se ha evaluado en niños o adolescentes. Sí se ha evaluado en personas mayores de 60 años. En embarazo o lactancia, el médico evalúa si es oportuno su uso.",
  "keys": [
   "embarazo",
   "embarazada",
   "lactancia",
   "niño",
   "niños",
   "pediatria",
   "pediatría",
   "adolescente",
   "anciano",
   "mayor",
   "edad"
  ]
 },
 {
  "id": "conservacion",
  "q": "¿Cómo se conserva y cuánto tiempo hay para aplicarlo?",
  "a": "Se conserva a temperatura ambiente dentro de su envase cerrado. El tiempo desde el acondicionamiento hasta su uso no debe superar las 6 horas, y cada membrana debe colocarse dentro de los 30 minutos de abierto el envase. No debe reutilizarse, congelarse ni esterilizarse.",
  "keys": [
   "conserva",
   "conservacion",
   "conservación",
   "temperatura",
   "horas",
   "vence",
   "vencimiento",
   "almacenamiento",
   "guardar",
   "transporte"
  ]
 },
 {
  "id": "acceso",
  "q": "¿Cómo solicito el tratamiento o más información?",
  "a": "Completá el formulario de contacto de esta página indicando tu perfil y el equipo de Terapias Avanzadas te va a responder. Si sos paciente, consultá primero con tu médico tratante.",
  "keys": [
   "solicitar",
   "pedir",
   "comprar",
   "precio",
   "costo",
   "cuanto sale",
   "cuánto sale",
   "cobertura",
   "obra social",
   "prepaga",
   "contacto",
   "telefono",
   "teléfono",
   "email",
   "mail",
   "acceder",
   "conseguir"
  ]
 }
];

/* Evaluación orientativa de indicación de NIODERM (flujo del asistente).
   Basado en "BOT PARA INDICACIÓN DE NIODERM.docx", con los datos ajustados al prospecto.
   Cada opción puede llevar:
     exclude: motivo  → resultado ROJO (no incluido / diferido)
     observe: motivo  → resultado AMARILLO (incluido con observaciones)
     advice:  texto   → recomendación que se suma al reporte
   Las preguntas marcadas con `added: true` no están en el documento original: se agregaron desde el prospecto.
   ⚠️ Contenido clínico: cualquier cambio debe validarlo el área médica de Cassará. */

const TRIAGE = {
  intro: 'Esta evaluación orientativa te ayuda a saber si tu paciente podría ser candidato a NIODERM®. Son unas 12 preguntas y lleva 2 minutos. <strong>No reemplaza tu criterio médico ni la evaluación del equipo de Terapias Avanzadas.</strong>',
  steps: [
    // ── Bloque 1: Identificación y etiología
    { id: 'edad', label: 'Edad', block: 'Identificación', q: '¿Qué edad tiene el paciente? (en años)', type: 'number', min: 0, max: 120,
      check: (v) => (v < 18 ? { observe: 'Paciente menor de 18 años: el tratamiento no se ha evaluado en niños ni adolescentes.' } : null) },
    { id: 'diagnostico', label: 'Diagnóstico', block: 'Identificación', q: '¿Cuál es el diagnóstico principal de la lesión?', type: 'single', options: [
      { v: 'Quemadura profunda (espesor total)' },
      { v: 'Úlcera de pie diabético' },
      { v: 'Úlcera venosa crónica' },
      { v: 'Úlcera arterial o mixta' },
      { v: 'Herida traumática / pérdida de sustancia' },
      { v: 'Defecto post-resección (cicatriz hipertrófica, nevus, oncológico)' },
      { v: 'Otro', observe: 'Etiología fuera de las indicaciones descriptas: requiere evaluación del equipo.' }
    ] },
    { id: 'evolucion', label: 'Evolución', block: 'Identificación', q: '¿Cuál es el tiempo de evolución de la herida?', type: 'single', options: [
      { v: 'Aguda (menos de 4 semanas)' },
      { v: 'Crónica (4 semanas o más sin reducción mayor al 40–50% con terapia estándar)' }
    ] },
    { id: 'profundidad', label: 'Profundidad', block: 'Identificación', q: '¿Qué profundidad tiene la herida?', type: 'single', options: [
      { v: 'Profunda (compromiso total de epidermis y dermis)' },
      { v: 'Intermedia (epidermis y dermis parcial)', exclude: 'Profundidad intermedia: NIODERM está indicado para heridas profundas de espesor total.' },
      { v: 'Superficial (sólo epidermis)', exclude: 'Herida superficial: NIODERM está indicado para heridas profundas de espesor total.' }
    ] },

    // ── Bloque 2: Criterios de exclusión
    { id: 'infeccion', label: 'Infección activa', block: 'Criterios de exclusión', q: '¿La herida presenta signos clínicos de infección no controlada, celulitis perilesional aguda o biofilm activo? ¿O el paciente tuvo fiebre reciente?', type: 'single', options: [
      { v: 'Sí', exclude: 'Infección activa: el tratamiento no debe aplicarse sobre lesiones infectadas.', advice: 'Debridar y controlar la carga microbiana (hisopado o biopsia cuantitativa) y tratar la infección antes de reevaluar.' },
      { v: 'No' }
    ] },
    { id: 'necrosis', label: 'Tejido no viable', block: 'Criterios de exclusión', q: '¿Hay tejido necrótico seco (escara) o esfacelo abundante sin desbridar en el lecho?', type: 'single', options: [
      { v: 'Sí', exclude: 'Tejido no viable en el lecho: la membrana requiere un lecho limpio y vascularizado.', advice: 'Debridar hasta tejido vital y reevaluar.' },
      { v: 'No' }
    ] },
    { id: 'isquemia', label: 'Isquemia crítica', block: 'Criterios de exclusión', q: 'En lesiones de miembro inferior: ¿el paciente presenta isquemia crítica sin revascularizar (p. ej. ITB menor a 0,5 o ausencia de pulsos distales sin Doppler viable)?', type: 'single', options: [
      { v: 'Sí', exclude: 'Isquemia crítica sin revascularizar: la integración fracasaría por hipoxia.', advice: 'Derivar a cirugía vascular y resolver la oclusión antes de reevaluar.' },
      { v: 'No' },
      { v: 'No aplica' }
    ] },
    { id: 'alergia', label: 'Hipersensibilidad', block: 'Criterios de exclusión', q: '¿El paciente tiene hipersensibilidad conocida a algún componente: colágeno porcino, gentamicina, anfotericina B o componentes del medio de cultivo (p. ej. agarosa)?', type: 'single', options: [
      { v: 'Sí', exclude: 'Hipersensibilidad conocida a componentes del tratamiento: requiere evaluación del balance beneficio-riesgo por el equipo.' },
      { v: 'No' }
    ] },
    { id: 'embarazo', label: 'Embarazo / lactancia', block: 'Criterios de exclusión', added: true, q: '¿La paciente está embarazada o en período de lactancia?', type: 'single', options: [
      { v: 'Sí', observe: 'Embarazo o lactancia: el tratamiento no se ha estudiado en esta población; el médico debe evaluar si es oportuno.' },
      { v: 'No / No aplica' }
    ] },

    // ── Bloque 3: Lecho de la herida
    { id: 'lecho', label: 'Lecho', block: 'Lecho de la herida', q: '¿Cómo describirías el lecho actual tras la última limpieza o desbridamiento?', type: 'single', options: [
      { v: 'Tejido de granulación sano y vascularizado' },
      { v: 'Tejido pálido o friable', observe: 'Lecho pálido o friable: requiere optimización antes de la aplicación.', advice: 'Optimizar el lecho hasta lograr granulación sana y vascularizada.' },
      { v: 'Exposición de hueso, tendón o cápsula articular sin cubierta vascular', observe: 'Exposición ósea o tendinosa sin cubierta vascular.', advice: 'Se requiere un lecho vascularizado para la integración de las células: consultar con el equipo la estrategia previa de cobertura.' }
    ] },
    { id: 'exudado', label: 'Exudado', block: 'Lecho de la herida', q: '¿Cuál es el nivel de exudado actual?', type: 'single', options: [
      { v: 'Escaso' },
      { v: 'Moderado' },
      { v: 'Abundante', exclude: 'Exudado abundante: puede desplazar la membrana y reducir su adherencia.', advice: 'Controlar edema y exudado (p. ej. terapia de presión negativa previa) antes de aplicar.' }
    ] },

    // ── Bloque 4: Factores sistémicos
    { id: 'sistemicos', label: 'Factores sistémicos', block: 'Factores sistémicos', q: '¿Presenta alguno de estos factores? Podés elegir varios.', type: 'multi', options: [
      { v: 'Diabetes descompensada (HbA1c mayor a 8,5%)', observe: 'Diabetes descompensada (HbA1c > 8,5%).' },
      { v: 'Desnutrición severa / albúmina menor a 2,5 g/dL', observe: 'Desnutrición severa o hipoalbuminemia.' },
      { v: 'Corticoides sistémicos a dosis altas o inmunosupresores', observe: 'Uso de corticoides sistémicos a dosis altas o inmunosupresores.' },
      { v: 'Tabaquismo activo pesado', observe: 'Tabaquismo activo pesado.' },
      { v: 'Ninguno', none: true }
    ], advice: 'Optimizar en paralelo los factores sistémicos señalados: aumentan el riesgo de fracaso.' },

    // ── Bloque 5: Dimensionamiento y logística (sólo si es apto o apto con observaciones)
    { id: 'area', label: 'Dimensiones', block: 'Dimensionamiento', q: 'Ingresá las dimensiones aproximadas de la lesión: largo × ancho en cm (p. ej. 12 x 8) o el área total en cm² (p. ej. 96).', type: 'area', onlyIfEligible: true },
    { id: 'logistica', label: 'Fecha y centro', block: 'Logística', q: 'Fecha estimada del procedimiento y centro asistencial (opcional).', type: 'text', optional: true, onlyIfEligible: true }
  ],

  // Membrana NIODERM = 6 × 6 cm = 36 cm². Estimación orientativa: el equipo define la cantidad final.
  membraneArea: 36,

  results: {
    green: { label: 'Paciente incluido (apto)', icon: '🟢', text: 'Cumple la etiología, sin criterios de exclusión, con lecho granulado y exudado controlado.' },
    yellow: { label: 'Incluido con observaciones', icon: '🟡', text: 'El lecho es apto, pero hay condiciones a optimizar o evaluar con el equipo antes de la aplicación.' },
    red: { label: 'No incluido por ahora (diferido)', icon: '🔴', text: 'Hay criterios que impiden la aplicación en este momento. Se sugiere preparar el lecho y reevaluar en 7 a 14 días.' }
  }
};


const MSG = {
  nombre: 'Ingresá tu nombre y apellido.',
  emailEmpty: 'Ingresá tu email.',
  emailBad: 'Revisá el formato del email (ej.: nombre@dominio.com).',
  tel: 'Revisá el teléfono: usá sólo números, espacios, guiones o +.',
  provincia: 'Seleccioná una provincia.',
  consentimiento: 'Necesitamos tu autorización para responderte.'
};

function initForm() {
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




/* Asistente por reglas, con dos modos:
   1. Preguntas: responde sólo con información verificada (src/faq.json). Si no encuentra
      coincidencia, deriva al formulario de contacto.
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

function initChat() {
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
    const actions = [
      button('Completar formulario', prefillForm),
      button('Nueva evaluación', () => { userSays('Nueva evaluación'); startEval(); })
    ];
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


/* Videos con "fachada": no se descarga nada hasta que el usuario pide reproducir. */
function initVideos() {
  const cfg = window.NIODERM_CONFIG?.videos || {};
  document.querySelectorAll('[data-video]').forEach((card) => {
    const key = card.dataset.video;
    const src = cfg[key];
    const btn = card.querySelector('[data-video-play]');
    const status = card.querySelector('[data-video-status]');
    const frame = card.querySelector('.video__frame');
    const title = card.querySelector('h3')?.textContent || 'Video';

    if (!src) {
      card.classList.add('is-pending');
      status.textContent = 'Próximamente';
      status.hidden = false;
      btn.setAttribute('aria-disabled', 'true');
      btn.setAttribute('aria-label', `${title}: video disponible próximamente`);
      btn.addEventListener('click', () => {
        status.textContent = 'Este video estará disponible próximamente';
      });
      return;
    }

    btn.addEventListener('click', () => {
      let el;
      if (src.type === 'youtube') {
        el = document.createElement('iframe');
        el.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(src.id)}?autoplay=1&rel=0&modestbranding=1`;
        el.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        el.title = title;
      } else if (src.type === 'vimeo') {
        el = document.createElement('iframe');
        el.src = `https://player.vimeo.com/video/${encodeURIComponent(src.id)}?autoplay=1&dnt=1`;
        el.allow = 'autoplay; fullscreen; picture-in-picture';
        el.title = title;
      } else {
        el = document.createElement('video');
        el.src = src.src;
        el.controls = true;
        el.playsInline = true;
        el.preload = 'auto';
        if (src.captions) {
          const tr = document.createElement('track');
          Object.assign(tr, { kind: 'captions', srclang: 'es', label: 'Español', src: src.captions, default: true });
          el.appendChild(tr);
        }
        el.setAttribute('aria-label', title);
        el.addEventListener('error', () => {
          el.remove();
          card.classList.remove('is-playing');
          btn.hidden = false;
          status.textContent = '';
          status.append('No se pudo cargar el video. ');
          const retry = document.createElement('a');
          retry.href = src.src;
          retry.target = '_blank';
          retry.rel = 'noopener noreferrer';
          retry.textContent = 'Abrir en otra pestaña';
          status.append(retry);
          status.hidden = false;
        }, { once: true });
      }
      frame.appendChild(el);
      card.classList.add('is-playing');
      btn.hidden = true;
      status.hidden = true;
      if (el.tagName === 'VIDEO') el.play().catch(() => {});
      el.focus?.();
      track('video_play', { video: key });
    });
  });
}





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

})();
