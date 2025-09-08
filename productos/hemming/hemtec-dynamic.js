// Función para cargar y mostrar productos de FFT hemtec dinámicamente
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Cargar datos del JSON
        const response = await fetch('./hemtec-products-es.json');
        const data = await response.json();
        
        // Obtener contenedor de productos
        const container = document.getElementById('productos-container');
        
        if (!container) {
            console.error('No se encontró el contenedor de productos');
            return;
        }
        
        // Generar tarjetas para cada producto
        data.productos.forEach(producto => {
            const card = createProductCard(producto);
            container.appendChild(card);
        });
        
        console.log(`${data.productos.length} productos cargados dinámicamente`);
        
    } catch (error) {
        console.error('Error cargando productos:', error);
        showErrorMessage();
    }
});

// Función para crear una tarjeta de producto
function createProductCard(producto) {
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
    year.textContent = `Lanzado en ${producto.lanzamiento}`;
    
    // Botones de acción
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'd-flex flex-wrap gap-2';
    
    // Botón principal
    const mainButton = document.createElement('a');
    mainButton.href = producto.enlaces.url_producto;
    mainButton.className = 'btn btn-sm btn-outline-primary btn-angled-primary-green';
    mainButton.textContent = 'Ver producto';
    mainButton.target = '_blank';
    mainButton.rel = 'noopener';
    
    // Botón de información (si existe)
    if (producto.enlaces.url_informacion) {
        const infoButton = document.createElement('a');
        infoButton.href = producto.enlaces.url_informacion;
        infoButton.className = 'btn btn-sm btn-outline-secondary';
        infoButton.textContent = 'Más info';
        infoButton.target = '_blank';
        infoButton.rel = 'noopener';
        buttonContainer.appendChild(infoButton);
    }
    
    // Botón de datasheet (si existe)
    if (producto.enlaces.url_datasheet) {
        const datasheetButton = document.createElement('a');
        datasheetButton.href = producto.enlaces.url_datasheet;
        datasheetButton.className = 'btn btn-sm btn-outline-info';
        datasheetButton.textContent = 'Datasheet';
        datasheetButton.target = '_blank';
        datasheetButton.rel = 'noopener';
        buttonContainer.appendChild(datasheetButton);
    }
    
    // Botón de contacto
    const contactButton = document.createElement('a');
    contactButton.href = producto.enlaces.url_contacto;
    contactButton.className = 'btn btn-sm btn-outline-success';
    contactButton.textContent = 'Contactar';
    contactButton.target = '_blank';
    contactButton.rel = 'noopener';
    
    // Ensamblar la tarjeta
    cardBody.appendChild(title);
    cardBody.appendChild(year);
    cardBody.appendChild(description);
    buttonContainer.appendChild(mainButton);
    buttonContainer.appendChild(contactButton);
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
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-warning" role="alert">
                    <h4 class="alert-heading">Error al cargar productos</h4>
                    <p>No se pudieron cargar los productos en este momento. Por favor, intenta recargar la página.</p>
                    <hr>
                    <p class="mb-0">Si el problema persiste, contacta al administrador del sitio.</p>
                </div>
            </div>
        `;
    }
}
