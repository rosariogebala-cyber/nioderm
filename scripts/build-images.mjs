// Regenera las imágenes optimizadas (AVIF + WebP, varios anchos) en public/assets/img
// y actualiza src/images.json. Correr desde site/:  npm i && npm run images
// Fuentes: carpeta ../_sources/NIODERM (material entregado por Cassará).
// Las fotos clínicas (case-*, ind-*) se extrajeron del PDF del díptico con
//   pdfimages -f 2 -l 2 -j "Sustituto Autologo - Diptico 2026.pdf" px/i
// (las CMYK se invierten con ImageMagick: convert i-001.jpg -negate -colorspace sRGB c001.jpg)
// y se guardaron en src/clinical/. Si cambia el díptico, repetir ese paso.
import sharp from 'sharp';
import { readFileSync, writeFileSync, readdirSync, unlinkSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const S = join(root, '..', '_sources', 'NIODERM');
const C = join(root, 'src', 'clinical');
const O = join(root, 'public', 'assets', 'img');

const jobs = [
  ['hero-petri', `${S}/Data/2026/NIODERM_Petri_circulos_sin_conectores/01_Placa_de_Petri.png`, [480, 800, 989]],
  ['hero-hand', `${S}/Data/2026/Mano enguantada sosteniendo pinzas negras.png`, [400, 700, 1092], { trim: true }],
  ['cell-queratinocitos', `${S}/Data/2026/NIODERM_Petri_circulos_sin_conectores/02_Queratinocitos.png`, [180, 345]],
  ['cell-membrana', `${S}/Data/2026/NIODERM_Petri_circulos_sin_conectores/03_Membrana.png`, [180, 327]],
  ['cell-fibroblastos', `${S}/Data/2026/NIODERM_Petri_circulos_sin_conectores/04_Fibroblastos.png`, [180, 345]],
  ['mech-1', `${S}/Data/2026/NIODERM_3_imagenes_mejoradas/01_Soporte_estructural.png`, [480, 800]],
  ['mech-2', `${S}/Data/2026/NIODERM_3_imagenes_mejoradas/02_Actividad_celular.png`, [480, 764]],
  ['mech-3', `${S}/Data/2026/NIODERM_3_imagenes_mejoradas/03_Remodelacion_tisular.png`, [480, 766]],
  ['tissue-cube', `${S}/Data/2026/Cubo de tejido cutáneo detallado.png`, [500, 900, 1366]],
  ['membrane-wound', `${S}/Insert/Imagen de ChatGPT 29 oct 2026, 12_48_13 p.m-1.png`, [800, 1280, 1853]],
  ['membrane-cells', `${S}/Insert/Imagen de ChatGPT 29 oct 2026, 12_48_14 p.m-2.png`, [800, 1280, 1932]],
  ['lab-petri', `${S}/Data/2026/Ingeniería tisular en placa de Petri.png`, [600, 1000, 1600]],
  ['applied', `${S}/Insert/magnific_unknown12.jpeg_bxV1G0L5Y2.jpg`, [640, 1280, 1832]],
  ['case-1', `${C}/case-1.jpg`, [480, 960]], ['case-2', `${C}/case-2.jpg`, [480, 979]],
  ['case-3', `${C}/case-3.jpg`, [480, 879]], ['case-4', `${C}/case-4.jpg`, [480, 1040]],
  ['case-5', `${C}/case-5.jpg`, [400, 780]],
  ['ind-quemaduras', `${C}/ind-quemaduras.jpg`, [531]], ['ind-cronicas', `${C}/ind-cronicas.jpg`, [480, 843]],
  ['ind-reseccion', `${C}/ind-reseccion.png`, [590]], ['ind-traumatismos', `${C}/ind-traumatismos.jpg`, [480, 902]]
];

const manifest = JSON.parse(readFileSync(join(root, 'src/images.json'), 'utf8'));
for (const [name, src, widths, opts = {}] of jobs) {
  if (!existsSync(src)) { console.warn(`· sin fuente, se conserva: ${name}`); continue; }
  let input = sharp(src).rotate();
  if (opts.trim) input = sharp(await input.trim({ threshold: 5 }).png().toBuffer());
  const meta = await input.metadata();
  readdirSync(O).filter((f) => f.startsWith(`${name}-`) && /\.(avif|webp)$/.test(f)).forEach((f) => unlinkSync(join(O, f)));
  const ws = [];
  for (const w of widths) {
    const ww = Math.min(w, meta.width);
    const p = input.clone().resize({ width: ww, withoutEnlargement: true });
    await p.clone().avif({ quality: 52, effort: 6 }).toFile(join(O, `${name}-${ww}.avif`));
    await p.clone().webp({ quality: 76, effort: 6 }).toFile(join(O, `${name}-${ww}.webp`));
    ws.push(ww);
  }
  manifest[name] = { w: meta.width, h: meta.height, ws };
  console.log(`✓ ${name} ${ws.join('/')}`);
}
writeFileSync(join(root, 'src/images.json'), JSON.stringify(manifest));
console.log('Listo. Ejecutá `npm run build` para regenerar index.html.');
