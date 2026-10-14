(() => {
  const menuBtn = document.getElementById('menuBtn');
  const menu = document.getElementById('menu');
  const themeBtn = document.getElementById('themeBtn');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxClose = document.getElementById('lightboxClose');

  // Menu mobile : ouverture/fermeture et fermeture après sélection d'un lien.
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      menuBtn.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
      menuBtn.textContent = isOpen ? '×' : '☰';
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      menu.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.setAttribute('aria-label', 'Ouvrir le menu');
      menuBtn.textContent = '☰';
    }));
  }

  // Thème clair/sombre sans dépendance à un service externe.
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isLight = document.body.classList.toggle('light-theme');
      themeBtn.textContent = isLight ? '🌙' : '☀️';
      themeBtn.setAttribute('aria-label', isLight ? 'Activer le thème sombre' : 'Activer le thème clair');
    });
  }

  // Compteurs qui s'animent quand la zone devient visible.
  const counters = document.querySelectorAll('.counter');
  const animateCounter = element => {
    const target = Number(element.dataset.target || 0);
    const duration = 700;
    const start = performance.now();
    const step = now => {
      const progress = Math.min((now - start) / duration, 1);
      element.textContent = String(Math.round(target * progress));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if ('IntersectionObserver' in window && counters.length) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.5 });
    counters.forEach(counter => observer.observe(counter));
  }

  // Galerie : ouvrir une photo en grand, puis fermer par le bouton, l'arrière-plan ou Échap.
  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    if (lightboxImage) lightboxImage.src = '';
  };
  document.querySelectorAll('[data-gallery-image]').forEach(button => button.addEventListener('click', () => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = button.dataset.galleryImage;
    lightboxImage.alt = button.querySelector('img')?.alt || 'Photo de MON ÉQUIPE';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    lightboxClose?.focus();
  }));
  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', event => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeLightbox(); });

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
