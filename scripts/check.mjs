// Controles estáticos del HTML generado. No reemplaza axe-core ni Lighthouse.
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'public/index.html'), 'utf8');
const config = readFileSync(join(root, 'public/assets/js/config.js'), 'utf8');
const robots = readFileSync(join(root, 'public/robots.txt'), 'utf8');
const sitemap = readFileSync(join(root, 'public/sitemap.xml'), 'utf8');
const bundle = readFileSync(join(root, 'public/assets/js/bundle.js'), 'utf8');

const checks = [];
const ok = (name, pass, detail = '') => checks.push({ name, pass, detail });

ok('Un solo h1', (html.match(/<h1[\s>]/g) || []).length === 1);
ok('lang es-AR', html.includes('lang="es-AR"'));
ok('Canonical de producción', html.includes('rel="canonical" href="https://nioderm.com.ar/"'));
ok('Sin casilla de prueba en el HTML', !/hotmail/i.test(html));
ok('Sin casilla de prueba en config', !/hotmail/i.test(config));
ok('Formulario apunta a consultas@nioderm.com.ar', config.includes('formsubmit.co/ajax/consultas@nioderm.com.ar'));
ok('Sitemap del dominio', sitemap.includes('<loc>https://nioderm.com.ar/</loc>'));
ok('robots apunta al sitemap', robots.includes('Sitemap: https://nioderm.com.ar/sitemap.xml'));
ok('Enlace externo con rel', html.includes('rel="noopener noreferrer"'));
ok('El bundle no inyecta HTML del video con innerHTML', !bundle.includes("status.innerHTML = 'No se pudo cargar el video."));

const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
ok('Sin ids duplicados', dup.length === 0, dup.join(', '));

const h1 = html.indexOf('<h1');
const h2 = html.indexOf('<h2');
ok('El h1 aparece antes del primer h2', h1 !== -1 && h2 !== -1 && h1 < h2);

let failed = 0;
for (const c of checks) {
  console.log(`${c.pass ? 'OK' : 'FAIL'}  ${c.name}${c.detail ? ` — ${c.detail}` : ''}`);
  if (!c.pass) failed += 1;
}
if (failed) {
  console.error(`${failed} control(es) fallaron`);
  process.exit(1);
}
console.log(`${checks.length} controles estáticos OK`);
