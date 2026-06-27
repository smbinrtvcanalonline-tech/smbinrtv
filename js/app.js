// ============================================
// SMBINRTV Canal Online - App JS
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Fecha en topbar ----
  const dateEl = document.getElementById('topbar-date');
  if (dateEl) {
    const now = new Date();
    const opts = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateEl.textContent = now.toLocaleDateString('es-PE', opts);
  }

  // ---- Año en footer ----
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Dark / Light Mode ----
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const body = document.body;

  const savedTheme = localStorage.getItem('smbinrtv-theme') || 'light';
  body.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = body.getAttribute('data-theme');
      const next = current === 'light' ? 'dark' : 'light';
      body.setAttribute('data-theme', next);
      localStorage.setItem('smbinrtv-theme', next);
      updateThemeIcon(next);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    themeIcon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-fill';
  }

  // ---- Ticker noticias ----
  const tickerItems = [
    'Autoridades refuerzan la seguridad ciudadana con nuevo patrullaje nocturno',
    'Fiscalía formaliza investigación por presunto desvío de recursos',
    'Plan de modernización vial recibirá inversión histórica',
    'Economía regional crece por tercer trimestre consecutivo',
    'Estudiantes de la región destacan en olimpiada nacional'
  ];
  let tickerIndex = 0;
  const tickerEl = document.getElementById('ticker-text');
  if (tickerEl) {
    setInterval(() => {
      tickerIndex = (tickerIndex + 1) % tickerItems.length;
      tickerEl.style.opacity = '0';
      setTimeout(() => {
        tickerEl.textContent = tickerItems[tickerIndex];
        tickerEl.style.opacity = '1';
      }, 300);
    }, 5000);
    tickerEl.textContent = tickerItems[0];
  }

  // ---- Buscador ----
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && searchInput.value.trim()) {
        const q = encodeURIComponent(searchInput.value.trim());
        window.location.href = `pages/noticias.html?q=${q}`;
      }
    });
  }

  // ---- Lazy Loading fallback ----
  if ('loading' in HTMLImageElement.prototype) {
    // nativo soportado
  } else {
    // fallback para browsers viejos
    const imgs = document.querySelectorAll('img[loading="lazy"]');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const img = e.target;
          img.src = img.dataset.src || img.src;
          io.unobserve(img);
        }
      });
    });
    imgs.forEach(img => io.observe(img));
  }

  // ---- Compartir noticias ----
  document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const title = btn.closest('.news-card')?.querySelector('.nc-title')?.textContent || document.title;
      const url = window.location.href;
      const icon = btn.querySelector('i');

      if (icon?.classList.contains('bi-facebook')) {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
      } else if (icon?.classList.contains('bi-whatsapp')) {
        window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`, '_blank');
      } else if (icon?.classList.contains('bi-twitter-x')) {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
      }
    });
  });

  // ---- Carga noticias automáticas (simulada) ----
  // Para activar: agrega tu clave de NewsAPI en news-api.js
  loadAutoNews();

});

// ---- Carga noticias externas (placeholder) ----
function loadAutoNews() {
  const grid = document.getElementById('noticias-auto-grid');
  if (!grid) return;

  // Placeholder estático (reemplazar con llamada real a NewsAPI)
  const placeholderNews = [
    { title: 'Congreso debate nueva ley de presupuesto nacional 2027', source: 'Agencia Andina', time: 'hace 1h', img: 'https://images.unsplash.com/photo-1577791465485-b28ed2eb0c38?w=400&q=60', url: '#' },
    { title: 'Banco Central mantiene tasa de interés en reunión mensual', source: 'El Peruano', time: 'hace 2h', img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=60', url: '#' },
    { title: 'Nuevas medidas de seguridad en aeropuertos internacionales', source: 'RPP Noticias', time: 'hace 3h', img: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=60', url: '#' },
    { title: 'Lluvias intensas afectan vías en la sierra central del país', source: 'La República', time: 'hace 4h', img: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=400&q=60', url: '#' },
  ];

  grid.innerHTML = placeholderNews.map(n => `
    <div class="col-md-3">
      <div class="auto-card">
        <img src="${n.img}" alt="${n.title}" class="skeleton-img" style="height:140px;width:100%;object-fit:cover;border-radius:6px;margin-bottom:10px;" loading="lazy" />
        <div class="badge-cat-sm text-secondary" style="font-size:0.65rem;font-weight:600;">${n.source}</div>
        <h5 style="font-size:0.85rem;font-weight:700;margin:6px 0;color:var(--black-title);line-height:1.3;">${n.title}</h5>
        <div class="leida-meta mb-2"><i class="bi bi-clock"></i> ${n.time}</div>
        <a href="${n.url}" class="ver-mas" style="font-size:0.78rem;">Leer más <i class="bi bi-arrow-right"></i></a>
      </div>
    </div>
  `).join('');
}
