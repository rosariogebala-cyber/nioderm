// Función serverless (Vercel, Node 18+) que recibe el formulario y lo envía por email con Resend.
// Variables de entorno:
//   RESEND_API_KEY   (obligatoria)  — https://resend.com
//   CONTACT_TO       (obligatoria)  — destinatario(s), separados por coma. Ej.: consultas@cassara.com.ar
//   CONTACT_FROM     (obligatoria)  — remitente verificado en Resend. Ej.: "NIODERM <web@cassara.com.ar>"
//   ALLOWED_ORIGIN   (opcional)     — origen permitido para CORS si el front vive en otro dominio.
// Sin variables configuradas responde 503 y el front ofrece enviar por email (mailto) con los datos precargados.

const PERFILES = new Set(['profesional', 'institucion', 'paciente']);
const LIMITS = { nombre: 120, email: 160, telefono: 40, provincia: 60, especialidad: 120, institucion: 160, mensaje: 2000, origen: 300 };
const hits = new Map(); // rate-limit básico por instancia

const clean = (v, max) => String(v ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);
const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export default async function handler(req, res) {
  const origin = process.env.ALLOWED_ORIGIN;
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'method_not_allowed' });

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  if (recent.length >= 5) return res.status(429).json({ ok: false, error: 'too_many_requests' });
  hits.set(ip, [...recent, now]);

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch { body = {}; } }
  body = body || {};

  if (body.website) return res.status(200).json({ ok: true }); // honeypot

  const d = Object.fromEntries(Object.entries(LIMITS).map(([k, max]) => [k, clean(body[k], max)]));
  d.perfil = PERFILES.has(body.perfil) ? body.perfil : 'profesional';
  const errors = [];
  if (d.nombre.length < 2) errors.push('nombre');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email)) errors.push('email');
  if (!d.provincia) errors.push('provincia');
  if (body.consentimiento !== true) errors.push('consentimiento');
  if (errors.length) return res.status(422).json({ ok: false, error: 'validation', fields: errors });

  const { RESEND_API_KEY, CONTACT_TO, CONTACT_FROM } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO || !CONTACT_FROM) return res.status(503).json({ ok: false, error: 'not_configured' });

  const rows = [
    ['Perfil', d.perfil], ['Nombre', d.nombre], ['Email', d.email], ['Teléfono', d.telefono], ['Provincia', d.provincia],
    ['Especialidad', d.especialidad], ['Institución', d.institucion], ['Consulta', d.mensaje], ['Página', d.origen]
  ].filter(([, v]) => v);
  const html = `<h2>Nueva consulta NIODERM</h2><table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif">${rows
    .map(([k, v]) => `<tr><th align="left" style="border-bottom:1px solid #ddd">${k}</th><td style="border-bottom:1px solid #ddd;white-space:pre-wrap">${esc(v)}</td></tr>`).join('')}</table>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: CONTACT_FROM, to: CONTACT_TO.split(',').map((s) => s.trim()), reply_to: d.email,
        subject: `Consulta NIODERM · ${d.perfil} · ${d.nombre}`, html, text
      })
    });
    if (!r.ok) { console.error('resend', r.status, await r.text()); return res.status(502).json({ ok: false, error: 'mail_failed' }); }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('resend', err);
    return res.status(502).json({ ok: false, error: 'mail_failed' });
  }
}
