# Informe de QA — NIODERM

**Fecha:** 26/11/2026 · **Entorno:** build de producción servido localmente con compresión (`serve`), Chromium headless.
Todos los valores son mediciones reales de esta corrida. Los archivos crudos están en `docs/qa/`.

## Lighthouse (laboratorio)

| | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Móvil (Moto G emulado, 4G lento simulado) | **100** | **100** | **100** | **100** |
| Desktop | **100** | **100** | **100** | **100** |

| Métrica | Móvil | Desktop | Objetivo |
|---|---|---|---|
| LCP | 0,9 s | 0,3 s | ≤ 2,5 s ✅ |
| CLS | 0,003 | 0,001 | ≤ 0,1 ✅ |
| TBT (proxy de INP en laboratorio) | 70 ms | 0 ms | — |
| FCP | 0,9 s | 0,3 s | — |
| Peso transferido (carga inicial) | 322 KiB | 369 KiB | — |

> El **INP** no se puede medir en laboratorio, sólo con usuarios reales (CrUX o RUM) cuando el sitio esté publicado. El proxy de laboratorio (TBT de 70 ms) y el JS liviano (~35 KB sin comprimir, sin dependencias) dan margen amplio para el objetivo de ≤ 200 ms. Los puntajes reales en producción van a depender del hosting (CDN, HTTP/2, caché). `vercel.json` ya configura caché inmutable para `/assets/`.

## Responsive — 11 resoluciones + horizontal

320 · 360 · 375 · 390 · 430 · 768 · 1024 · 1280 · 1440 · 1920 · 2560 px, y horizontal 844×390 y 932×430.

| Verificación | Resultado |
|---|---|
| Scroll horizontal involuntario | 0 px en todas ✅ |
| Imágenes rotas | 0 ✅ |
| Errores de consola o de JS | 0 ✅ |
| Objetivos táctiles < 24 px | 0 ✅ |
| Fuente mínima de texto | 11,5 px (etiquetas) · cuerpo ≥ 15,7 px ✅ |

Capturas en `docs/qa/shots/`.

## Accesibilidad (axe-core 4, WCAG 2.0/2.1/2.2 A y AA + buenas prácticas)

- 375 px: **0 violaciones** (54 reglas aprobadas).
- 1280 px: **0 violaciones** (54 reglas aprobadas).

Corregido durante el QA (con regresión posterior):
1. Contraste de pasos inactivos del mecanismo: se reemplazó la opacidad por un cambio de color con contraste AA.
2. `<dl>` con un `<p>` adentro: se reestructuró.
3. Contenido fuera de landmarks (aviso, chat, barra móvil): ahora son `<aside>` con etiqueta.
4. Checkbox de consentimiento de 22 px: llevado a 24 px.

Verificación manual y por script: navegación completa por teclado, skip link, foco visible en fondos claros y oscuros, trampa de foco en el menú móvil, Escape cierra el menú y el asistente, `aria-expanded`, `aria-current` en la navegación, `role="log"` + `aria-live` en el chat, errores de formulario vinculados con `aria-describedby` y resumen enfocable con enlaces a cada campo, `alt` descriptivo en imágenes clínicas y vacío en las decorativas.

## Funcional (Playwright, 375 px táctil)

| Prueba | Resultado |
|---|---|
| Menú móvil abre y cierra (Escape) | ✅ |
| Asistente abre, responde con la base y deriva cuando no sabe | ✅ |
| Evaluación de indicación: verde, amarillo y rojo; precarga del formulario | ✅ |
| Formulario: resumen de errores (4 campos) | ✅ |
| Formulario: campos condicionales según perfil | ✅ |
| Formulario: estado de éxito (endpoint 200) | ✅ |
| Formulario: fallback a email con datos (endpoint 503) | ✅ |
| Eventos en dataLayer (form, chatbot, CTA) | ✅ |
| Video: la fachada carga el reproductor o muestra error recuperable | ✅ * |
| Video pendiente marcado "Próximamente" | ✅ |
| `prefers-reduced-motion`: todo visible sin animación | ✅ |
| Sin JavaScript: todo el contenido visible | ✅ |

\* El entorno de prueba no tiene acceso a cassara.com.ar, así que el MP4 del injerto no se pudo descargar y se comprobó el camino de error ("No se pudo cargar el video · Abrir en otra pestaña"). **Hay que confirmar la reproducción en el dominio final.**

## Limitaciones y pendientes

- **Navegadores:** se probó sólo en Chromium. No se pudieron descargar Firefox ni WebKit en el entorno (red restringida). El código usa *progressive enhancement*: `animation-timeline`, `::details-content` y `interpolate-size` están detrás de `@supports` o degradan sin romper, y `:has()` y `translate` tienen soporte en las versiones actuales de los cuatro navegadores. **Antes de publicar, recorrer Safari iOS, Chrome Android, Firefox y Edge.**
- **Conexiones lentas:** cubiertas por la emulación móvil de Lighthouse (4G lento). Fuentes con `font-display: swap`, imágenes fuera del viewport con `loading="lazy"` y videos sin descargar hasta el clic.
- **Envío real de email:** `api/contact.js` se validó en su lógica (validación, honeypot, rate limit, 503 sin configurar), pero no con credenciales reales de Resend.
- **Seguridad:** headers en `vercel.json` (CSP, HSTS, nosniff, frame-options, referrer y permissions policy). El CSP permite `'unsafe-inline'` en scripts por el bloque mínimo que detecta JS. Si se quiere un CSP estricto, se puede reemplazar por su hash.
