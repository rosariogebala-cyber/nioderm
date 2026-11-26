/* Eventos de conversión → window.dataLayer (compatible con GTM / GA4). */
window.dataLayer = window.dataLayer || [];

export function track(event, params = {}) {
  window.dataLayer.push({ event: `nioderm_${event}`, ...params });
}

export function loadGTM() {
  const id = window.NIODERM_CONFIG?.gtmId;
  if (!id || !/^GTM-[A-Z0-9]+$/.test(id)) return;
  const load = () => {
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtm.js?id=${id}`;
    document.head.appendChild(s);
  };
  // Carga diferida para no competir con el render inicial
  if ('requestIdleCallback' in window) requestIdleCallback(load, { timeout: 3000 });
  else setTimeout(load, 2000);
}
