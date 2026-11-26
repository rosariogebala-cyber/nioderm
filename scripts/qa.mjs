// QA automatizado: screenshots por resolución, scroll horizontal, errores de consola,
// imágenes rotas, axe-core (WCAG 2.2 AA), tamaños táctiles, menú móvil, formulario y asistente.
// Uso: BASE=http://localhost:4173 node scripts/qa.mjs   (requiere playwright y @axe-core/playwright)
import { chromium } from 'playwright';
import { mkdirSync, writeFileSync } from 'node:fs';

const BASE = process.env.BASE || 'http://localhost:4173/';
const OUT = process.env.OUT || 'qa';
mkdirSync(`${OUT}/shots`, { recursive: true });
const widths = [320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920, 2560];
const landscape = [[844, 390], [932, 430]];
const report = { base: BASE, date: new Date().toISOString(), viewports: [], checks: [] };
const browser = await chromium.launch();

async function settle(page) {
  // Recorre la página para disparar reveals/lazy-load y vuelve arriba
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += innerHeight * 0.7) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
    scrollTo(0, 0);
  });
  await page.waitForTimeout(400);
}

for (const w of widths) {
  const h = w < 768 ? 800 : w < 1440 ? 900 : w === 2560 ? 1440 : 1080;
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, hasTouch: w < 1024, isMobile: w < 768 });
  const page = await ctx.newPage();
  const errors = [];
  page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('requestfailed', (r) => { if (!r.url().includes('cassara.com.ar') && !r.url().includes('googletagmanager')) errors.push(`requestfailed ${r.url()}`); });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2600); // animaciones de entrada
  await page.screenshot({ path: `${OUT}/shots/hero-${w}.png` });
  await settle(page);
  const m = await page.evaluate(() => {
    const doc = document.documentElement;
    const overflow = doc.scrollWidth - doc.clientWidth;
    const offenders = [...document.querySelectorAll('body *')].filter((el) => {
      const r = el.getBoundingClientRect();
      return r.width && (r.right > doc.clientWidth + 1) && getComputedStyle(el).position !== 'fixed' && !el.closest('.filmstrip, .hero__bg, .bio__media, .hero__visual, .chat__chips, .contact');
    }).slice(0, 5).map((el) => el.className || el.tagName);
    const broken = [...document.images].filter((i) => i.complete && i.naturalWidth === 0 && !i.closest('[hidden]')).map((i) => i.currentSrc || i.src);
    const small = [...document.querySelectorAll('a, button, input, select, textarea, summary')].filter((el) => {
      if (el.closest('[hidden], .hp') || el.offsetParent === null) return false;
      const r = el.getBoundingClientRect();
      const inline = getComputedStyle(el).display === 'inline' && el.closest('p, li, dd');
      return !inline && (r.width < 24 || r.height < 24);
    }).map((el) => `${el.tagName}.${el.className}`.slice(0, 60));
    const minFont = Math.min(...[...document.querySelectorAll('p, li, a, dd, dt, label, button, span')].filter((el) => el.offsetParent && el.textContent.trim()).map((el) => parseFloat(getComputedStyle(el).fontSize)));
    return { overflow, offenders, broken, small: [...new Set(small)].slice(0, 8), minFont, height: doc.scrollHeight };
  });
  await page.screenshot({ path: `${OUT}/shots/full-${w}.png`, fullPage: true });
  report.viewports.push({ width: w, ...m, errors });
  console.log(w, JSON.stringify({ ...m, errors }));
  await ctx.close();
}

// ---- Orientación horizontal ----
for (const [w, h] of landscape) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, hasTouch: true, isMobile: true });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2600);
  await page.screenshot({ path: `${OUT}/shots/landscape-${w}x${h}.png` });
  const ov = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  report.checks.push({ name: `Horizontal ${w}x${h}: sin scroll horizontal`, ok: ov === 0, detail: `overflow ${ov}px` });
  console.log(ov === 0 ? 'PASS' : 'FAIL', 'landscape', w, h, ov);
  await ctx.close();
}

// ---- Interacciones (móvil 375) ----
{
  const ctx = await browser.newContext({ viewport: { width: 375, height: 800 }, hasTouch: true, isMobile: true });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: 'networkidle' });
  const check = (name, ok, detail = '') => { report.checks.push({ name, ok, detail }); console.log(ok ? 'PASS' : 'FAIL', name, detail); };

  await page.click('[data-nav-toggle]');
  await page.waitForTimeout(400);
  check('Menú móvil abre', await page.isVisible('#nav-menu .nav__list a'));
  await page.screenshot({ path: `${OUT}/shots/menu-375.png` });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(400);
  check('Menú móvil cierra con Escape', (await page.getAttribute('[data-nav-toggle]', 'aria-expanded')) === 'false');

  await page.click('.chat__fab');
  await page.waitForTimeout(700);
  check('Asistente abre', await page.isVisible('#chat-panel'));
  await page.fill('[data-chat-input]', '¿qué estudios necesito antes?');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(900);
  const ans = await page.locator('.msg--bot').last().innerText();
  check('Asistente responde estudios previos', /HTLV|Chagas/.test(ans), ans.slice(0, 60));
  await page.fill('[data-chat-input]', 'cual es el horario del kiosco');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(900);
  const fb = await page.locator('.msg--bot').last().innerText();
  check('Asistente deriva cuando no sabe', /No tengo una respuesta verificada/.test(fb));
  await page.screenshot({ path: `${OUT}/shots/chat-375.png` });
  await page.click('.chat__chips >> text=Evaluar a mi paciente');
  await page.waitForTimeout(900);
  await page.fill('[data-chat-input]', '70'); await page.keyboard.press('Enter'); await page.waitForTimeout(700);
  for (const c of ['Úlcera venosa crónica', 'Crónica', 'Profunda', 'Sí']) { await page.locator('.msg--question').last().locator(`button:has-text("${c}")`).first().click(); await page.waitForTimeout(650); }
  for (const c of ['No', 'No aplica', 'No', 'No / No aplica', 'Tejido de granulación', 'Escaso']) { await page.locator('.msg--question').last().locator(`button:has-text("${c}")`).first().click(); await page.waitForTimeout(650); }
  await page.locator('.msg--question').last().locator('button:has-text("Ninguno")').click();
  await page.locator('.msg--question').last().locator('button:has-text("Continuar")').click();
  await page.waitForTimeout(900);
  const tri = await page.locator('.msg--result').innerText().catch(() => '');
  check('Evaluación de indicación: infección activa → No incluido', /No incluido/.test(tri) && /Infección activa/.test(tri));
  await page.screenshot({ path: `${OUT}/shots/triage-375.png` });
  await page.keyboard.press('Escape');

  await page.locator('#contacto').scrollIntoViewIfNeeded();
  await page.click('[data-submit]');
  await page.waitForTimeout(300);
  const summaryVisible = await page.isVisible('[data-form-summary]');
  const invalid = await page.locator('[aria-invalid="true"]').count();
  check('Formulario: validación muestra resumen de errores', summaryVisible && invalid >= 3, `${invalid} campos inválidos`);
  await page.screenshot({ path: `${OUT}/shots/form-errors-375.png`, fullPage: false });
  await page.fill('#f-nombre', 'Dra. Prueba QA');
  await page.fill('#f-email', 'qa@example.com');
  await page.selectOption('#f-prov', { index: 1 });
  await page.check('#f-ok');
  await page.click('input[name="perfil"][value="paciente"]', { force: true });
  check('Formulario: oculta campos profesionales para pacientes', await page.isHidden('[data-pro-only]'));
  await page.route('**/api/contact', (r) => r.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }));
  await page.click('[data-submit]');
  await page.waitForTimeout(600);
  check('Formulario: estado de éxito', await page.isVisible('[data-form-done]'));
  await page.click('[data-form-reset]');
  await page.unroute('**/api/contact');
  await page.route('**/api/contact', (r) => r.fulfill({ status: 503, body: '{}' }));
  await page.fill('#f-nombre', 'Dra. Prueba QA');
  await page.fill('#f-email', 'qa@example.com');
  await page.selectOption('#f-prov', { index: 2 });
  await page.check('#f-ok');
  await page.click('[data-submit]');
  await page.waitForTimeout(600);
  const mailto = await page.getAttribute('[data-mailto]', 'href');
  check('Formulario: fallback mailto con datos', (await page.isVisible('[data-form-fallback]')) && mailto.includes('Prueba'));
  await page.screenshot({ path: `${OUT}/shots/form-fallback-375.png` });

  const dl = await page.evaluate(() => window.dataLayer.map((e) => e.event).filter(Boolean));
  check('Eventos de conversión en dataLayer', ['nioderm_form_submit', 'nioderm_chatbot_open', 'nioderm_form_error'].every((e) => dl.includes(e)), [...new Set(dl)].join(', '));

  await page.locator('[data-video="aplicacion"] [data-video-play]').click();
  await page.waitForTimeout(300);
  const vState = await page.evaluate(() => ({ video: !!document.querySelector('[data-video="aplicacion"] video'), err: document.querySelector('[data-video="aplicacion"] [data-video-status]').textContent }));
  check('Video: la fachada carga el reproductor (o muestra un error recuperable si la red bloquea el archivo)', vState.video || /No se pudo cargar/.test(vState.err), JSON.stringify(vState));
  check('Video pendiente marcado como "Próximamente"', (await page.locator('[data-video="entrevista"] [data-video-status]').textContent()).includes('Próximamente'));
  await ctx.close();
}

// ---- Movimiento reducido + sin JS ----
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(BASE, { waitUntil: 'networkidle' });
  const hidden = await page.evaluate(() => [...document.querySelectorAll('[data-reveal], [data-hero-in]')].filter((e) => parseFloat(getComputedStyle(e).opacity) < 0.99).length);
  report.checks.push({ name: 'prefers-reduced-motion: todo el contenido visible sin scrollear', ok: hidden === 0, detail: `${hidden} ocultos` });
  console.log(hidden === 0 ? 'PASS' : 'FAIL', 'reduced motion', hidden);
  await ctx.close();
  const ctx2 = await browser.newContext({ viewport: { width: 1280, height: 900 }, javaScriptEnabled: false });
  const p2 = await ctx2.newPage();
  await p2.goto(BASE, { waitUntil: 'networkidle' });
  const hidden2 = await p2.evaluate(() => [...document.querySelectorAll('[data-reveal], .hero__headline .line > span')].filter((e) => parseFloat(getComputedStyle(e).opacity) < 0.99).length);
  report.checks.push({ name: 'Sin JavaScript: contenido visible', ok: hidden2 === 0, detail: `${hidden2} ocultos` });
  console.log(hidden2 === 0 ? 'PASS' : 'FAIL', 'no-js', hidden2);
  await p2.screenshot({ path: `${OUT}/shots/nojs-1280.png` });
  await ctx2.close();
}

// ---- axe-core ----
try {
  const { default: AxeBuilder } = await import('@axe-core/playwright');
  for (const w of [375, 1280]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: 'networkidle' });
    const res = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice']).analyze();
    report[`axe_${w}`] = res.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length, targets: v.nodes.slice(0, 3).map((n) => n.target.join(' ')) }));
    console.log(`axe ${w}:`, res.violations.length ? JSON.stringify(report[`axe_${w}`], null, 1) : 'sin violaciones', '| passes', res.passes.length);
    await ctx.close();
  }
} catch (e) { console.log('axe no disponible', e.message); }

await browser.close();
writeFileSync(`${OUT}/qa-report.json`, JSON.stringify(report, null, 2));
