/* Configuración editable sin tocar el código.
   Todo lo que depende del entorno de publicación vive acá. */
window.NIODERM_CONFIG = {
  // Endpoint que recibe el formulario (POST JSON). En Vercel: /api/contact (ver api/contact.js).
  // En GitHub Pages no hay servidor: FormSubmit reenvía la consulta al correo de prueba.
  // La primera vez hay que confirmar el enlace que llega a esa casilla.
  formEndpoint: 'https://formsubmit.co/ajax/ro_gebala@hotmail.com',

  // Email de respaldo para el formulario y el asistente.
  contactEmail: 'ro_gebala@hotmail.com',
  contactPhone: '+541141054100',
  contactPhoneLabel: '(+54) 11 4105-4100',

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
    aplicacion: { type: 'mp4', src: 'https://cassara.com.ar/wp-content/uploads/2022/11/cassara-laboratorio-nioderm-injerto.mp4' },
    entrevista: null
  }
};
