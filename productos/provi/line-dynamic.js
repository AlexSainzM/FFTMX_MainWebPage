// Función para detectar el idioma del sitio
function detectLanguage() {
    // Primero intentar detectar por el atributo lang del HTML
    const htmlLang = document.documentElement.lang;
    
    if (htmlLang) {
        return htmlLang.toLowerCase().startsWith('en') ? 'en' : 'es';
    }
    
    // Si no hay lang, detectar por la URL o nombre del archivo
    const currentPath = window.location.pathname;
    if (currentPath.includes('/en.html') || currentPath.includes('/en/')) {
        return 'en';
    }
    
    // Por defecto, usar español
    return 'es';
}

// Función para obtener el archivo JSON correcto según el idioma
function getJsonFileName(language) {
    return `./line-products-${language}.json`;
}

// Función para obtener textos según el idioma
function getTexts(language) {
    const texts = {
        es: {
            launchedIn: 'Lanzado en',
            viewProduct: 'Ver producto',
            moreInfo: 'Más info',
            datasheet: 'Datasheet',
            contact: 'Contactar',
            errorTitle: 'Error al cargar productos',
            errorMessage: 'No se pudieron cargar los productos en este momento. Por favor, intenta recargar la página.',
            errorContact: 'Si el problema persiste, contacta al administrador del sitio.',
            productsLoaded: 'productos cargados dinámicamente'
        },
        en: {
            launchedIn: 'Launched in',
            viewProduct: 'View product',
            moreInfo: 'More info',
            datasheet: 'Datasheet',
            contact: 'Contact',
            errorTitle: 'Error loading products',
            errorMessage: 'Products could not be loaded at this time. Please try reloading the page.',
            errorContact: 'If the problem persists, contact the site administrator.',
            productsLoaded: 'products loaded dynamically'
        }
    };
    
    return texts[language] || texts.es;
}

// Función para cargar y mostrar productos de FFT hemtec dinámicamente
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Detectar idioma automáticamente
        const language = detectLanguage();
        const texts = getTexts(language);
        
        console.log(`Idioma detectado: ${language}`);
        
        // Cargar datos del JSON correspondiente
        const jsonFile = getJsonFileName(language);
        const response = await fetch(jsonFile);
        const data = await response.json();
        
        // Obtener contenedor de productos
        const container = document.getElementById('productos-container');
        
        if (!container) {
            console.error('No se encontró el contenedor de productos');
            return;
        }
        
        // Generar tarjetas para cada producto
        data.productos.forEach(producto => {
            const card = createProductCard(producto, texts);
            container.appendChild(card);
        });
        
        console.log(`${data.productos.length} ${texts.productsLoaded}`);
        
    } catch (error) {
        console.error('Error cargando productos:', error);
        showErrorMessage();
    }
});

// Función para crear una tarjeta de producto
function createProductCard(producto, texts) {
    // Crear columna
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';
    
    // Crear tarjeta
    const card = document.createElement('div');
    card.className = 'menu-card h-100 card-product';
    
    // Crear contenedor de imagen
    const imageContainer = document.createElement('div');
    imageContainer.className = 'ratio ratio-16x9 bg-light rounded-top';
    
    // Crear imagen
    const img = document.createElement('img');
    img.src = `./img/products/${producto.imagen_url}`;
    img.className = 'card-img-top';
    img.style.objectFit = 'cover';
    img.alt = producto.nombre;
    
    // Manejar error de carga de imagen
    img.onerror = function() {
        this.src = './img/main-hero.webp'; // Imagen de respaldo
    };
    
    imageContainer.appendChild(img);
    
    // Crear cuerpo de la tarjeta
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body m-4 p-2';
    
    // Título del producto
    const title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = producto.nombre;
    
    // Descripción del producto
    const description = document.createElement('p');
    description.className = 'card-text';
    description.textContent = producto.descripcion;
    
    // Año de lanzamiento
    const year = document.createElement('small');
    year.className = 'text-muted d-block mb-2';
    year.textContent = `${texts.launchedIn} ${producto.lanzamiento}`;
    
    // Botones de acción
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'd-flex flex-wrap gap-2';
    buttonContainer.style.position = 'relative';
    buttonContainer.style.zIndex = '10';
    
    // Botón principal (solo si existe url_producto)
    const mainButton = document.createElement('a');
    if (producto.enlaces.url_producto) {
        //const mainButton = document.createElement('a');
        mainButton.href = producto.enlaces.url_producto;
        mainButton.className = 'btn btn-sm btn-outline-primary btn-angled-primary-green order-1';
        mainButton.textContent = texts.viewProduct;
        mainButton.target = '';
        mainButton.rel = 'noopener';
        mainButton.style.pointerEvents = 'auto';
        mainButton.style.cursor = 'pointer';
        mainButton.style.position = 'relative';
        mainButton.style.zIndex = '11';
        buttonContainer.appendChild(mainButton);
    }
    
    // Botón de información (si existe)
    if (producto.enlaces.url_informacion) {
        const infoButton = document.createElement('a');
        infoButton.href = producto.enlaces.url_informacion;
        infoButton.className = 'btn btn-sm btn-outline-secondary border-0 order-2';
        infoButton.textContent = texts.moreInfo;
        infoButton.target = '_blank';
        infoButton.rel = 'noopener';
        infoButton.style.pointerEvents = 'auto';
        infoButton.style.cursor = 'pointer';
        infoButton.style.position = 'relative';
        infoButton.style.zIndex = '11';
        buttonContainer.appendChild(infoButton);
    }
    
    // Botón de datasheet (si existe)
    if (producto.enlaces.url_datasheet) {
        const datasheetButton = document.createElement('a');
        datasheetButton.href = producto.enlaces.url_datasheet;
        datasheetButton.className = 'btn btn-sm btn-outline-info border-0 order-3';
        datasheetButton.textContent = texts.datasheet;
        datasheetButton.target = '_blank';
        datasheetButton.rel = 'noopener';
        datasheetButton.style.pointerEvents = 'auto';
        datasheetButton.style.cursor = 'pointer';
        datasheetButton.style.position = 'relative';
        datasheetButton.style.zIndex = '11';
        buttonContainer.appendChild(datasheetButton);
    }
    
    // Ya no se agrega el botón de contacto

    // Ensamblar la tarjeta
    cardBody.appendChild(title);
    cardBody.appendChild(year);
    cardBody.appendChild(description);
    buttonContainer.appendChild(mainButton);
    // No se agrega el botón de contacto aquí
    cardBody.appendChild(buttonContainer);
    
    card.appendChild(imageContainer);
    card.appendChild(cardBody);
    col.appendChild(card);
    
    return col;
}

// Función para mostrar mensaje de error
function showErrorMessage() {
    const container = document.getElementById('productos-container');
    if (container) {
        const language = detectLanguage();
        const texts = getTexts(language);
        
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning" role="alert">
                    <h4 class="alert-heading">${texts.errorTitle}</h4>
                    <p>${texts.errorMessage}</p>
                    <hr>
                    <p class="mb-0">${texts.errorContact}</p>
                </div>
            </div>
        `;
    }
}
