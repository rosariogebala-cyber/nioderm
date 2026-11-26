/* Configuración editable sin tocar el código.
   Todo lo que depende del entorno de publicación vive acá. */
window.NIODERM_CONFIG = {
  // Endpoint que recibe el formulario (POST JSON). En Vercel: /api/contact (ver api/contact.js).
  // En un hosting estático, FormSubmit reenvía la consulta a consultas@nioderm.com.ar.
  // La primera vez hay que confirmar el enlace que llega a esa casilla.
  formEndpoint: 'https://formsubmit.co/ajax/consultas@nioderm.com.ar',

  // Email de respaldo si el envío automático falla.
  contactEmail: 'consultas@nioderm.com.ar',

  // WhatsApp: dejar vacío hasta tener un número oficial. Formato: '5491100000000'.
  whatsapp: '',

  // Google Tag Manager (cassara.com.ar usa GTM-TRJPBSP). Vacío = no se carga.
  // Los eventos se envían igual a window.dataLayer.
  gtmId: '',

  // Videos. Admiten: { type: 'mp4', src: 'https://…/video.mp4' }
  //                   { type: 'youtube', id: 'XXXXXXXXXXX' }
  //                   { type: 'vimeo', id: '123456789' }
  //                   null → se muestra como "Próximamente".
  videos: {
    aplicacion: { type: 'mp4', src: 'assets/video/aplicacion.mp4' },
    entrevista: { type: 'mp4', src: 'assets/video/entrevista.mp4' }
  }
};
