# NIODERM® — Landing de terapia biológica de heridas

Rediseño de https://cassara.com.ar/nioderm/ con orientación dermatológica.
Sitio estático (HTML + CSS + JS modular, sin frameworks) con una función serverless opcional para el formulario.

## Estructura

```
site/
├── public/                 ← raíz publicable (lo que se sube al hosting)
│   ├── index.html          ← GENERADO por scripts/build.mjs (no editar a mano)
│   ├── assets/css/main.css ← design system + estilos
│   ├── assets/js/
│   │   ├── config.js       ← ⚙️ endpoints, videos, WhatsApp, GTM (editable)
│   │   ├── main.js         ← navegación, motion, parallax, scroll
│   │   ├── form.js         ← validación, envío, fallback por email
│   │   ├── chat.js         ← asistente por reglas (preguntas + evaluación de indicación)
│   │   ├── triage.js       ← ⚕️ preguntas y reglas de la evaluación de indicación (validar con área médica)
│   │   ├── kb.js           ← GENERADO desde src/faq.json
│   │   ├── video.js        ← reproductores con fachada (carga diferida)
│   │   └── analytics.js    ← eventos a dataLayer + GTM opcional
│   ├── assets/img/         ← AVIF + WebP en varios anchos, logos SVG, OG
│   ├── assets/fonts/       ← Newsreader + Montserrat (variables, woff2, autoalojadas)
│   └── robots.txt · sitemap.xml · favicon · manifest
├── src/
│   ├── index.html          ← plantilla fuente (editar acá)
│   ├── faq.json            ← preguntas y respuestas del asistente
│   ├── images.json         ← manifiesto de imágenes (lo actualiza build-images)
│   └── clinical/           ← fotos clínicas extraídas del díptico
├── api/contact.js          ← función serverless (Vercel) que envía el formulario por email
├── scripts/
│   ├── build.mjs           ← genera index.html, kb.js, sitemap y robots
│   ├── build-images.mjs    ← regenera imágenes optimizadas desde ../_sources
│   └── qa.mjs              ← QA automatizado (Playwright + axe)
├── docs/                   ← estrategia, design system, informe de QA
└── vercel.json             ← build, headers de seguridad y caché
```

## Uso local

Requiere Node 18+.

```bash
cd site
npm run build                       # genera public/index.html
npm run serve                       # http://localhost:4173
SITE_URL=https://dominio/ruta/ npm run build   # URL canónica para producción
```

Editar contenidos en `src/index.html` y `src/faq.json`, y volver a correr `npm run build`.
Para regenerar imágenes: `npm i && npm run images && npm run build`.

## Publicación

### Opción A — Vercel (recomendada)
1. Subir la carpeta `site/` a un repositorio (o `vercel` desde la CLI dentro de `site/`).
2. Vercel lee `vercel.json`: corre `node scripts/build.mjs` y publica `public/`.
3. Variables de entorno (Project → Settings → Environment Variables):
   - `SITE_URL` → URL final con barra al final (ej. `https://cassara.com.ar/nioderm/`)
   - `RESEND_API_KEY` → clave de https://resend.com (dominio remitente verificado)
   - `CONTACT_TO` → `consultas@nioderm.com.ar` (o varios, separados por coma)
   - `CONTACT_FROM` → p. ej. `NIODERM <web@cassara.com.ar>`
4. Sin esas variables el formulario igual funciona: el envío devuelve 503 y el sitio ofrece mandar la consulta por email con los datos precargados.

### Opción B — Subcarpeta de cassara.com.ar (WordPress / Apache / Nginx)
1. `SITE_URL=https://cassara.com.ar/nioderm/ npm run build`
2. Subir el contenido de `public/` a `/nioderm/` (todas las rutas son relativas).
3. El formulario necesita un endpoint: apuntar `formEndpoint` en `assets/js/config.js` a un servicio existente (función serverless, Formspree, endpoint propio de WordPress, etc.) que acepte `POST` JSON. `api/contact.js` muestra el contrato esperado.
4. Copiar los headers de `vercel.json` a la configuración del servidor (caché de `/assets/` por un año + headers de seguridad).
5. Ojo: si WordPress ya inyecta GTM en esa ruta, dejar `gtmId` vacío para no duplicarlo.

## Configuración rápida (`public/assets/js/config.js`)

| Clave | Para qué |
|---|---|
| `formEndpoint` | URL que recibe el formulario |
| `videos.aplicacion` | Hoy apunta al MP4 del injerto publicado en cassara.com.ar |
| `videos.entrevista` | `null` = "Próximamente". Cargar `{ type: 'youtube', id: '…' }`, `{ type: 'vimeo', id: '…' }` o `{ type: 'mp4', src: '…', captions: '….vtt' }` |
| `whatsapp` | Número oficial (ej. `5491100000000`). Vacío = no se muestra |
| `gtmId` | `GTM-TRJPBSP` para usar el contenedor de Cassará |

Si se agrega un dominio de video nuevo, sumarlo a `media-src`/`frame-src` del `Content-Security-Policy` en `vercel.json`.

## Eventos de conversión (dataLayer)

`nioderm_cta_click` (label) · `nioderm_form_start` · `nioderm_form_error` · `nioderm_form_submit` (perfil, provincia) · `nioderm_form_fallback` · `nioderm_form_mailto` · `nioderm_chatbot_open` · `nioderm_chatbot_question` · `nioderm_chatbot_fallback` · `nioderm_chatbot_to_form` · `nioderm_chatbot_call` · `nioderm_chatbot_email` · `nioderm_chatbot_eval_start` · `nioderm_chatbot_eval_result` (status: green/yellow/red) · `nioderm_chatbot_eval_to_form` · `nioderm_video_play` (video).

## QA

```bash
npm i -D playwright @axe-core/playwright && npx playwright install chromium
npm run serve &   BASE=http://localhost:4173/ npm run qa
```
Resultados de la última corrida: `docs/QA-REPORT.md`.
