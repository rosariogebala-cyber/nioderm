# Design System — NIODERM

Todos los tokens están definidos como variables CSS en `:root` (`public/assets/css/main.css`).

## Color
| Token | Valor | Uso |
|---|---|---|
| `--ink` | `#0A1A3A` | Fondos oscuros (hero, caso, contacto), texto de titulares |
| `--ink-2` / `--ink-3` | `#0F2552` / `#163571` | Variaciones de fondo oscuro, hover |
| `--cobalt` | `#1B4FC4` | Énfasis sobre fondo claro, progreso, foco |
| `--cyan` | `#3CC3F2` | Acento **sólo sobre fondos oscuros** |
| `--cyan-ink` | `#0A6A9B` | Acento para texto sobre fondos claros (AA) |
| `--rose` / `--rose-ink` | `#E2566E` / `#B02F48` | CTA principal / texto rosa sobre claro |
| `--paper` | `#F5F3EE` | Fondo claro cálido |
| `--mist` | `#E9EFF5` | Fondo claro frío |
| `--text` / `--muted` | `#121F3D` / `#4A5672` | Texto principal / secundario sobre claro |
| `--muted-light` | `#B7C3DC` | Texto secundario sobre oscuro |

Todas las combinaciones de texto que usa la página pasan WCAG AA (verificado con axe-core).

## Tipografía
- Display: **Newsreader** variable (200–800, normal e itálica), con `opsz 72`.
- Texto e interfaz: **Montserrat** variable (100–900).
- Fallbacks con métricas ajustadas (`size-adjust`, `ascent-override`) para evitar saltos de layout.
- Escala fluida con `clamp()`: `--fs-xs` 0.7 → `--fs-hero` 4.6rem.
- Etiquetas: 0.72–0.78rem, peso 650, `letter-spacing: .16em`, mayúsculas.

## Espaciado y grilla
- Escala 4/8: `--sp-1` (4px) … `--sp-10` (128px).
- `--section-y`: padding vertical de sección, fluido (72 → 160px).
- `--gutter`: margen lateral fluido (20 → 48px). `--container`: 1320px (1480px desde 1920 y 1640px desde 2400).
- Layouts con CSS Grid. Breakpoints definidos por contenido: **640**, **768**, **1024**, **1600 / 1920 / 2400**.
- Container queries en la composición del hero (etiquetas de células).

## Forma y profundidad
- Radios: `--r-sm` 6, `--r-md` 14, `--r-lg` 28, `--r-pill`.
- Sombras: `--shadow-1` (sutil) y `--shadow-2` (sólo en el frame del mecanismo).

## Componentes
- **Botones**: `.btn` + `--primary` (rosa), `--dark`, `--ghost-light`, `--lg`, `--block`. Mínimo 48px de alto (54 en `--lg`). Estados: hover (brillo que sigue al puntero), active (scale .98), focus (anillo doble), disabled y loading (spinner).
- **Formulario**: `.field`, `.segmented` (radios), `.field--check`, `.field__error`, `.form__summary`. Inputs de 50px y 16px de fuente (evita el zoom en iOS).
- **Listas editoriales** con filetes (`.stack__list`, `.ind__list`, `.quality__list`).
- **Filmstrip**: scroll-snap horizontal, botones y flechas de teclado.
- **Video**: fachada con póster; carga el reproductor recién al hacer clic.
- **Chat**: botón fijo (56px) y panel (bottom-sheet en móvil, flotante en desktop).

## Movimiento
| Token | Valor |
|---|---|
| `--dur-1` | 160ms (micro: color, borde) |
| `--dur-2` | 320ms (UI: menús, botones) |
| `--dur-3` | 700ms (reveals, crossfades) |
| `--dur-4` | 1100ms (entradas grandes) |
| `--ease-out` | `cubic-bezier(.16,1,.3,1)` |
| `--ease-in-out` | `cubic-bezier(.65,0,.35,1)` |

Reglas: sólo `transform`, `translate` y `opacity`; nada de scroll hijacking; el contenido es visible sin JS (`.no-js`) y con `prefers-reduced-motion`.

## Estados interactivos
`:hover`, `:focus-visible` (anillo doble, en azul sobre claro y cian sobre oscuro), `:active`, `[disabled]`, `[aria-invalid]`, `[aria-current]` (navegación), `[aria-expanded]` (menú y chat).
