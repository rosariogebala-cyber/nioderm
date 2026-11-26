/* Evaluación orientativa de indicación de NIODERM (flujo del asistente).
   Basado en "BOT PARA INDICACIÓN DE NIODERM.docx", con los datos ajustados al prospecto.
   Cada opción puede llevar:
     exclude: motivo  → resultado ROJO (no incluido / diferido)
     observe: motivo  → resultado AMARILLO (incluido con observaciones)
     advice:  texto   → recomendación que se suma al reporte
   Las preguntas marcadas con `added: true` no están en el documento original: se agregaron desde el prospecto.
   ⚠️ Contenido clínico: cualquier cambio debe validarlo el área médica de Cassará. */

export const TRIAGE = {
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
