# NIODERM® — Estrategia, concepto y dirección de arte

## 1. Análisis

**Producto.** NIODERM® es un medicamento combinado de ingeniería tisular de Laboratorio Pablo Cassará: membrana de colágeno (pericardio porcino acelularizado, PM 2312-3) de 6 × 6 cm con ≥ 14 × 10³/cm² queratinocitos autólogos en la cara superior y ≥ 14 × 10³/cm² fibroblastos autólogos en la inferior. Se fabrica a medida para cada paciente a partir de una toma de piel sana.

**Fuentes usadas (en orden de prioridad).**
1. Díptico 2026 (`Sustituto Autologo - Diptico 2026.pdf`, versión exportada del `.ai`): titular, claim ANMAT, composición, mecanismo, biodegradación, indicaciones, caso clínico.
2. Prospecto médico y prospecto paciente (`Data/*.docx`): proceso, estudios previos, precauciones, interacciones, conservación, datos legales.
3. Presentación ANMAT (`Data/*.pptx`): marco regulatorio, controles de calidad, preparación del lecho, resultado del caso (cierre total).
4. `Corrección de imagenes.pptx`: 4 indicaciones (se eliminó "cosmética") y uso de las fotos de células.
5. Sitio actual: dirección y teléfono corporativos, video del injerto, viabilidad.

**Descartado a propósito.** `TExtos.docx` describe otra matriz dérmica (capa de silicona, autoinjerto posterior, días 0–56, "acorta tiempos"). No corresponde a NIODERM y no se usó. Tampoco se usó el presupuesto del Dr. Cutulli (documento comercial interno).

**Público.**
- Primario: dermatólogos, cirujanos plásticos y generales, flebólogos, unidades de quemados y equipos de heridas crónicas. Buscan mecanismo, indicaciones, evidencia, logística y requisitos.
- Secundario: instituciones (compras, servicios hospitalarios).
- Terciario: pacientes y familiares con heridas que no cicatrizan. Necesitan entender qué es y que deben consultar a su médico.

**Marco regulatorio de la comunicación.** Es un medicamento de venta bajo receta y uso profesional exclusivo. En Argentina la publicidad de estos productos al público general está restringida, así que la página se plantea como **información para profesionales**: aviso fijo arriba, sin promesas al paciente, bloque de pacientes que deriva al médico tratante y texto legal completo en el footer. **Recomendación: que Asuntos Regulatorios y Médicos de Cassará validen el texto antes de publicar.**

**Objetivo de conversión.** Generar consultas calificadas de profesionales e instituciones (formulario con perfil) y, en segundo plano, orientar pacientes. Micro-conversiones: consultas al asistente, reproducción de video, clics en teléfono o email.

**Diferenciales.**
- Autólogo: células del propio paciente, sin reacción inmunológica esperada frente a ellas.
- Primer y único medicamento de terapias avanzadas desarrollado y aprobado por ANMAT para la regeneración biológica de la piel (claim del díptico).
- Desarrollo y fabricación nacional, en una planta de terapias avanzadas con BPF.
- Doble capa celular (queratinocitos y fibroblastos) sobre un soporte biodegradable: regenera dermis propia.
- Caso documentado: úlcera venosa de 7 años y 90–100 cm², con cierre total.

**Emociones que tiene que transmitir.** Rigor científico, confianza institucional, precisión clínica y, por debajo, esperanza contenida (nunca promesa).

## 2. Concepto creativo — "La piel, por capas"

NIODERM es literalmente capas: queratinocitos, membrana, fibroblastos. Toda la página se arma con esa idea.
- El **hero** desarma la tapa del díptico en capas independientes (placa de Petri, mano con pinzas y las tres células) que se mueven con parallax, se ensamblan al cargar y se conectan con trazos que se dibujan solos.
- La sección **La terapia** muestra la pila explotada: las capas se separan al entrar en pantalla y se destacan al pasar por cada una.
- El **ritmo de fondos** alterna "laboratorio" (azul profundo) y "piel" (blanco cálido), y lleva la lectura de la ciencia al paciente.

## 3. Dirección de arte

- **Paleta.** Azul tinta `#0A1A3A` (marca Cassará, más profunda), cobalto `#1B4FC4`, cian luminoso `#3CC3F2` (sólo sobre oscuro; sobre claro se usa `#0A6A9B` para cumplir AA). El rosa `#E2566E` sale del medio de cultivo de la placa de Petri y se reserva para la acción principal. Blanco cálido `#F5F3EE` (piel) y blanco frío `#E9EFF5` (clínica).
- **Tipografía.** *Newsreader* (serif editorial, con itálicas para el énfasis) para titulares y datos, que le da voz de publicación médica en lugar de "landing tech". *Montserrat*, la tipografía del díptico, para interfaz y textos, por continuidad de marca.
- **Composición.** Editorial y asimétrica: titulares en 2/3 del ancho, etiquetas en columna lateral, listas con filetes finos en lugar de tarjetas, numeración tipográfica (01, i/ii/iii, A/B/C) que cambia según la sección. Las tarjetas y las sombras se usan muy poco.
- **Imágenes.** Las ilustraciones 3D oficiales para la ciencia y las fotos clínicas reales para la evidencia, siempre con aviso de contenido sensible.
- **Motion.** Duraciones de 160, 320, 700 y 1100 ms, easing `cubic-bezier(.16,1,.3,1)`. Sólo se anima `transform` y `opacity`. No hay scroll hijacking. Todo se desactiva con `prefers-reduced-motion`.

## 4. Arquitectura y recorrido

| # | Sección | Función en el recorrido |
|---|---|---|
| — | Aviso profesional + header fijo | Encuadre legal; CTA siempre visible |
| 0 | Hero | Titular, claim ANMAT y un solo CTA sobre la composición de capas (versión simplificada) |
| 1 | La terapia | Qué es y de qué está hecho (capas) |
| 2 | Mecanismo | Cómo actúa (3 mecanismos, imagen fija sincronizada) |
| — | Banda biología | Respiro visual; biodegradación |
| 3 | Indicaciones | ¿Aplica a mi paciente? (4 indicaciones) |
| 4 | Caso clínico | Prueba real: datos + secuencia de 5 imágenes |
| 5 | Videos | Aplicación del producto + entrevista a paciente |
| 6 | Cómo funciona | Logística: de la toma de piel a la aplicación (6 pasos) |
| 7 | Calidad y regulación | Reducción de objeciones (controles, marco ANMAT) |
| — | Pacientes | Desvío ético: consulte a su médico, con CTA de orientación |
| 8 | Contacto | Conversión |
| — | Asistente fijo + barra móvil | Conversión desde cualquier punto del scroll. El asistente concentra las 11 preguntas frecuentes (no hay sección de FAQ en la página para no duplicar) |

## 5. Decisiones tomadas y supuestos

- **Asistente sin IA generativa.** Responde sólo con texto aprobado (`src/faq.json`) y deriva a una persona cuando no tiene la respuesta. En un medicamento, una respuesta inventada es un riesgo regulatorio. Se puede migrar a un LLM más adelante, con la misma base como contexto y revisión médica.
- **Formulario con perfil** (profesional, institución, paciente), para que el equipo comercial priorice las consultas. Los campos profesionales se ocultan para pacientes.
- **Si falla el envío**, el formulario ofrece mandar la consulta por email con los datos ya cargados, así no se pierde ningún lead.
- **WhatsApp** queda preparado pero apagado: no hay un número oficial en el material.
- **Video "Entrevista a paciente"**: no venía en la carpeta, así que queda como "Próximamente" y se activa desde `config.js`. **Video "Aplicación"**: usa el MP4 del injerto que ya está publicado en cassara.com.ar.
- **Indicaciones**: se usan las 4 del díptico 2026. La presentación ANMAT menciona como indicación registral "úlceras crónicas que no respondieron a tratamientos habituales". Si el registro final es más acotado, hay que ajustar esa sección.
- **Leyendas del caso clínico**: "Pre-tratamiento / Aplicación / Seguimiento / Cierre". No se informan días porque el material no los da.
- **Domicilios**: el corporativo (Av. Gral. Paz 14268) va en contacto; el legal del prospecto (Carhué 1096/86) y el de elaboración (Saladillo 2452) van en el footer.

## 6. Pendientes para el cliente

1. Validación regulatoria y médica de los textos (sobre todo el claim "primer y único", las indicaciones y el caso clínico).
2. Video de la entrevista a paciente (con subtítulos `.vtt`) y consentimiento de imagen de la paciente.
3. Número oficial de WhatsApp, si se quiere usar ese canal.
4. Credenciales de Resend (o el endpoint propio) para el formulario y una política de privacidad a la que enlazar desde el consentimiento.
5. Confirmar la URL definitiva (`SITE_URL`) y el GTM.

## 7. Evaluación de indicación en el asistente

Fuente: `_sources/BOT PARA INDICACIÓN DE NIODERM.docx`. Se integró al asistente ("Evaluar a mi paciente"): 5 bloques guiados → resultado 🟢 apto / 🟡 apto con observaciones / 🔴 no incluido (diferido). En verde o amarillo pide medidas y estima la cantidad de membranas de 6 × 6 cm. El resumen se puede volcar al formulario de contacto con un clic. Reglas editables en `public/assets/js/triage.js`.

**Ajustes respecto del documento, para que coincida con el prospecto (a validar por el área médica):**
- Hipersensibilidad: colágeno **porcino**, **gentamicina**, **anfotericina B** y medio de cultivo (el doc decía bovino y vancomicina).
- Dimensionamiento: membranas de **6 × 6 cm (36 cm²)**, estimación = área ÷ 36 redondeado hacia arriba (el doc decía kits de 5×5, 10×10 y 10×20).
- Se eliminó la sugerencia de "matriz dérmica bicapa con silicona" (es otro producto). En su lugar: consultar con el equipo la cobertura previa.
- Se eliminó "cadena de frío": NIODERM viaja a temperatura ambiente, con máximo 6 h desde el acondicionamiento.
- La pregunta de profundidad estaba repetida en los bloques 1 y 2: se pregunta una sola vez.
- Exudado abundante → 🔴 diferido (tabla de resultados del doc); el bloque 3 lo trataba como recomendación.
- Se agregaron, desde el prospecto: menor de 18 años → 🟡 (no evaluado en pediatría); fiebre reciente dentro de "infección"; embarazo o lactancia → 🟡.
- La foto clínica no se sube por el chat (no hay servidor de archivos): se indica enviarla por email.
