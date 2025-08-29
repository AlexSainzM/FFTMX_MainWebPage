// Añadir año dinámico en el footer
document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  
    // Resaltar el item activo del navbar según la ruta
    const path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if ((path === '' && href === 'index.html') || href === path) {
        link.classList.add('active');
        link.setAttribute('aria-current', 'page');
      }
    });
  
    // Ejemplo: leer param ?q= para futura búsqueda
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    if (q) {
      const searchInputs = document.querySelectorAll('input[type="search"]');
      searchInputs.forEach(inp => inp.value = q);
    }
  });