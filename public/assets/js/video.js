import { track } from './analytics.js';

/* Videos con "fachada": no se descarga nada hasta que el usuario pide reproducir. */
export function initVideos() {
  const cfg = window.NIODERM_CONFIG?.videos || {};
  document.querySelectorAll('[data-video]').forEach((card) => {
    const key = card.dataset.video;
    const src = cfg[key];
    const btn = card.querySelector('[data-video-play]');
    const status = card.querySelector('[data-video-status]');
    const frame = card.querySelector('.video__frame');
    const title = card.querySelector('h3')?.textContent || 'Video';

    if (!src) {
      card.classList.add('is-pending');
      status.textContent = 'Próximamente';
      status.hidden = false;
      btn.setAttribute('aria-disabled', 'true');
      btn.setAttribute('aria-label', `${title}: video disponible próximamente`);
      btn.addEventListener('click', () => {
        status.textContent = 'Este video estará disponible próximamente';
      });
      return;
    }

    btn.addEventListener('click', () => {
      let el;
      if (src.type === 'youtube') {
        el = document.createElement('iframe');
        el.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(src.id)}?autoplay=1&rel=0&modestbranding=1`;
        el.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        el.title = title;
      } else if (src.type === 'vimeo') {
        el = document.createElement('iframe');
        el.src = `https://player.vimeo.com/video/${encodeURIComponent(src.id)}?autoplay=1&dnt=1`;
        el.allow = 'autoplay; fullscreen; picture-in-picture';
        el.title = title;
      } else {
        el = document.createElement('video');
        el.src = src.src;
        el.controls = true;
        el.playsInline = true;
        el.preload = 'auto';
        if (src.captions) {
          const tr = document.createElement('track');
          Object.assign(tr, { kind: 'captions', srclang: 'es', label: 'Español', src: src.captions, default: true });
          el.appendChild(tr);
        }
        el.setAttribute('aria-label', title);
        el.addEventListener('error', () => {
          el.remove();
          card.classList.remove('is-playing');
          btn.hidden = false;
          status.textContent = '';
          status.append('No se pudo cargar el video. ');
          const retry = document.createElement('a');
          retry.href = src.src;
          retry.target = '_blank';
          retry.rel = 'noopener noreferrer';
          retry.textContent = 'Abrir en otra pestaña';
          status.append(retry);
          status.hidden = false;
        }, { once: true });
      }
      frame.appendChild(el);
      card.classList.add('is-playing');
      btn.hidden = true;
      status.hidden = true;
      if (el.tagName === 'VIDEO') el.play().catch(() => {});
      el.focus?.();
      track('video_play', { video: key });
    });
  });
}
