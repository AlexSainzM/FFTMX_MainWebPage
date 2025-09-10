// Función para detectar el idioma actual
function getCurrentLanguage() {
    const htmlLang = document.documentElement.lang;
    if (htmlLang) {
        return htmlLang.toLowerCase().startsWith('en') ? 'en' : 'es';
    }
    
    const currentPath = window.location.pathname;
    if (currentPath.includes('/en.html') || currentPath.includes('/en/')) {
        return 'en';
    }
    
    return 'es';
}

// Función para actualizar el botón de idioma
function updateLanguageButton() {
    const currentLang = getCurrentLanguage();
    const languageBtn = document.getElementById('languageBtn');
    const currentLangSpan = languageBtn.querySelector('.current-lang');
    
    if (currentLang === 'en') {
        currentLangSpan.textContent = 'EN';
    } else {
        currentLangSpan.textContent = 'ES';
    }
    
    // Marcar el idioma activo en el dropdown
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.lang === currentLang) {
            item.classList.add('active');
        }
    });
}

// Función para cambiar idioma
function switchLanguage(targetLang) {
    const currentLang = getCurrentLanguage();
    
    if (currentLang === targetLang) {
        return; // Ya está en el idioma correcto
    }
    
    // Determinar la URL de destino
    let targetUrl = '';
    if (targetLang === 'en') {
        targetUrl = 'en.html';
    } else {
        targetUrl = 'index.html';
    }
    
    // Redirigir a la página en el idioma correcto
    window.location.href = targetUrl;
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    updateLanguageButton();
    
    // Agregar event listeners a los elementos del dropdown
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetLang = this.dataset.lang;
            switchLanguage(targetLang);
        });
    });
});
