// Genera public/index.html a partir de src/index.html.
// - Expande <x-img name=".."> en <picture> con AVIF/WebP + srcset (según src/images.json)
// - Inyecta FAQ (HTML + JSON-LD), provincias, sprite SVG y metadatos.
// - Emite public/assets/js/kb.js (base de conocimiento del asistente) desde src/faq.json.
// Uso: node scripts/build.mjs   (SITE_URL=https://... node scripts/build.mjs)
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => readFileSync(join(root, p), 'utf8');
const SITE_URL = (process.env.SITE_URL || 'https://cassara.com.ar/nioderm/').replace(/\/?$/, '/');
const VERSION = Date.now().toString(36);

const images = JSON.parse(read('src/images.json'));
const faq = JSON.parse(read('src/faq.json'));
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function picture(attrs) {
  const name = attrs.name;
  const img = images[name];
  if (!img) throw new Error(`Imagen desconocida: ${name}`);
  const sizes = attrs.sizes || '100vw';
  const eager = 'eager' in attrs;
  const largest = Math.max(...img.ws);
  const h = Math.round(img.h * (largest / img.w));
  const set = (ext) => img.ws.map((w) => `assets/img/${name}-${w}.${ext} ${w}w`).join(', ');
  const alt = attrs.alt ?? '';
  const cls = attrs.class ? ` class="${attrs.class}"` : '';
  return `<picture><source type="image/avif" srcset="${set('avif')}" sizes="${sizes}"><source type="image/webp" srcset="${set('webp')}" sizes="${sizes}"><img src="assets/img/${name}-${img.ws[Math.min(1, img.ws.length - 1)]}.webp" width="${largest}" height="${h}" alt="${esc(alt)}"${cls} ${eager ? 'loading="eager" decoding="async"' : 'loading="lazy" decoding="async"'}${eager && name === 'hero-petri' ? ' fetchpriority="high"' : ''}></picture>`;
}

function parseAttrs(s) {
  const out = {};
  const re = /([a-z-]+)(?:="([^"]*)")?/g;
  let m;
  while ((m = re.exec(s))) out[m[1]] = m[2] ?? '';
  return out;
}

const provincias = ['Ciudad Autónoma de Buenos Aires', 'Buenos Aires', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba', 'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja', 'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan', 'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero', 'Tierra del Fuego', 'Tucumán', 'Fuera de Argentina'];
const provHtml = provincias.map((p) => `<option>${p}</option>`).join('');

const svgPath = (file) => read(`public/assets/img/${file}`).match(/d="([^"]+)"/)[1];
const sprite = `<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
<symbol id="logo-nioderm" viewBox="0 0 4084 649"><path fill="currentColor" fill-rule="evenodd" d="${svgPath('nioderm.svg')}"/></symbol>
<symbol id="logo-cassara" viewBox="0 0 1064 588"><path fill="currentColor" fill-rule="evenodd" d="${svgPath('cassara.svg')}"/></symbol>
<symbol id="logo-icon" viewBox="0 0 660 649"><path fill="currentColor" fill-rule="evenodd" d="${svgPath('icon.svg')}"/></symbol>
<symbol id="i-arrow-down" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" d="M12 5v14m-6-6 6 6 6-6"/></symbol>
<symbol id="i-arrow-left" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" d="M19 12H5m6-6-6 6 6 6"/></symbol>
<symbol id="i-arrow-right" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m-6-6 6 6-6 6"/></symbol>
<symbol id="i-play" viewBox="0 0 24 24"><path fill="currentColor" d="M8 5.5v13a.8.8 0 0 0 1.2.7l10.4-6.5a.8.8 0 0 0 0-1.4L9.2 4.8A.8.8 0 0 0 8 5.5Z"/></symbol>
<symbol id="i-info" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8.5v.5"/></g></symbol>
<symbol id="i-chat" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v8a2.5 2.5 0 0 1-2.5 2.5H10l-4.2 3.3a.5.5 0 0 1-.8-.4V17h0A2.5 2.5 0 0 1 4 14.5z"/><g fill="currentColor"><circle cx="8.5" cy="10.5" r="1.1"/><circle cx="12" cy="10.5" r="1.1"/><circle cx="15.5" cy="10.5" r="1.1"/></g></symbol>
<symbol id="i-close" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" d="m6 6 12 12M18 6 6 18"/></symbol>
<symbol id="i-send" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" d="M4 12 20 4l-4 16-4-6.5zm8 1.5L20 4"/></symbol>
</defs></svg>`;

const jsonld = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization', '@id': `${SITE_URL}#org`, name: 'Laboratorio Pablo Cassará', url: 'https://cassara.com.ar/',
      email: 'consultas@nioderm.com.ar',
      address: { '@type': 'PostalAddress', streetAddress: 'Av. Gral. Paz 14268', postalCode: 'C1439GBV', addressLocality: 'Buenos Aires', addressCountry: 'AR' },
    },
    {
      '@type': 'MedicalWebPage', '@id': `${SITE_URL}#webpage`, url: SITE_URL, inLanguage: 'es-AR',
      name: 'NIODERM® | Terapia biológica de heridas', audience: { '@type': 'MedicalAudience', audienceType: 'Clinician' },
      about: { '@id': `${SITE_URL}#drug` }, publisher: { '@id': `${SITE_URL}#org` },
    },
    {
      '@type': 'Drug', '@id': `${SITE_URL}#drug`, name: 'NIODERM', prescriptionStatus: 'https://schema.org/PrescriptionOnly',
      description: 'Medicamento combinado de ingeniería tisular: membrana de colágeno con queratinocitos y fibroblastos autólogos viables para la regeneración de heridas profundas.',
      manufacturer: { '@id': `${SITE_URL}#org` }, image: `${SITE_URL}assets/img/og-nioderm.jpg`,
    },
  ],
};

let html = read('src/index.html')
  .replace(/<x-img([^>]*)><\/x-img>/g, (_, a) => picture(parseAttrs(a)))
  .replace('{{PROVINCIAS}}', provHtml)
  .replace('{{SPRITE}}', sprite)
  .replace('{{JSONLD}}', JSON.stringify(jsonld))
  .replaceAll('{{SITE_URL}}', SITE_URL)
  .replaceAll('{{VERSION}}', VERSION);

// Precarga de las dos familias. En file:// Chrome avisa, pero el sitio publicado es HTTP.
html = html.replace('<link rel="stylesheet"', '<link rel="preload" href="assets/fonts/newsreader.woff2" as="font" type="font/woff2" crossorigin>\n<link rel="preload" href="assets/fonts/montserrat.woff2" as="font" type="font/woff2" crossorigin>\n<link rel="stylesheet"');

if (/\{\{[A-Z_]+\}\}/.test(html)) throw new Error('Quedaron placeholders sin reemplazar');
writeFileSync(join(root, 'public/index.html'), html);

const kbFaq = faq.map(({ id, q, a, keys }) => ({ id, q, a, keys }));
const kb = `// Generado por scripts/build.mjs desde src/faq.json — no editar a mano.\nexport const FAQ = ${JSON.stringify(faq.map(({ id, q, a, keys }) => ({ id, q, a, keys })), null, 1)};\n`;
writeFileSync(join(root, 'public/assets/js/kb.js'), kb);

// Bundle clásico (IIFE): funciona con file:// y reduce requests. Orden = dependencias.
const strip = (f) => read(`public/assets/js/${f}`)
  .replace(/^import[^;]+;\s*$/gm, '')
  .replace(/^export (default )?/gm, '');
const bundle = `/* Generado por scripts/build.mjs — editar los módulos individuales. */\n(() => {\n'use strict';\n${
  ['analytics.js', 'kb.js', 'triage.js', 'form.js', 'chat.js', 'video.js', 'main.js'].map(strip).join('\n')}\n})();\n`;
writeFileSync(join(root, 'public/assets/js/bundle.js'), bundle);

writeFileSync(join(root, 'public/sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${SITE_URL}</loc><lastmod>${new Date().toISOString().slice(0, 10)}</lastmod></url>\n</urlset>\n`);
writeFileSync(join(root, 'public/robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE_URL}sitemap.xml\n`);

console.log(`OK · ${SITE_URL} · ${(html.length / 1024).toFixed(1)} KB`);
