// ---- Obtenemos las imagenes que se van a mostrar en el carousel ----
    const url = 'https://www.difusion-fft.com'; // Cambia por la URL que deseas inspeccionar

    // Realiza una solicitud a la URL proporcionada
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al realizar la solicitud: ' + response.status);
        }
        return response.text();
      })
      .then(html => {
        // Crear un elemento temporal para analizar el HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Buscar todas las imágenes dentro de los elementos con clase 'carousel-item'
        const images = doc.querySelectorAll('.carousel-item img');

        // Crear un array para almacenar los valores src
        const srcValues = [];
        images.forEach(img => {
          if (img.src) {
            srcValues.push(img.src);
          }
        });

        // Mostrar los resultados en la consola
        console.log('Imágenes del carrusel:', srcValues);

        // Seleccionar el contenedor del carrusel
        const carouselInner = document.getElementById("carouselInner");
        const carouselIndicators = document.querySelector(".carousel-indicators");

        // Iterar sobre las URLs y crear elementos dinámicamente
        srcValues.forEach((url, index) => {
          // Crear el elemento div para la clase 'carousel-item'
          const carouselItem = document.createElement("div");
          carouselItem.classList.add("carousel-item");
          if (index === 0) {
            // Hacer el primer elemento activo
            carouselItem.classList.add("active");
          }

          // Crear la imagen y asignarle los atributos
          const img = document.createElement("img");
          img.src = url;
          img.classList.add("d-block", "w-100", "rounded-5");
          img.alt = "Carrusel Image";

          // Agregar la imagen al div y luego el div al carrusel
          carouselItem.appendChild(img);
          carouselInner.appendChild(carouselItem);

          // Crear dinámicamente los indicadores del carrusel
          const indicator = document.createElement("button");
          indicator.type = "button";
          indicator.dataset.bsTarget = "#lastestNewsCarrousel";
          indicator.dataset.bsSlideTo = index;
          indicator.setAttribute("aria-label", `Slide ${index + 1}`);
          if (index === 0) {
            // Hacer el primer indicador activo
            indicator.classList.add("active");
            indicator.setAttribute("aria-current", "true");
          }
          carouselIndicators.appendChild(indicator);
        });
      })
      .catch(error => {
        console.error('Error:', error.message);
      });







// ---- Obtenemos los comunicados de la pagina ----
    const url2 = 'https://difusion-fft.com/archivos/56'; // URL del sitio

    // Realiza una solicitud a la URL proporcionada
    fetch(url2)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al realizar la solicitud: ' + response.status);
        }
        return response.text();
      })
      .then(html => {
        // Crear un elemento temporal para analizar el HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Buscar todas las etiquetas <a> con el atributo href que contiene ".pdf"
        const pdfData = [];
        const items = doc.querySelectorAll('.col.bloq');
        items.forEach(item => {
          const anchor = item.querySelector('.thumb a[href*=".pdf"]');
          const title = item.querySelector('.title')?.textContent.trim();
          if (anchor && title) {
            const href = anchor.getAttribute('href');
            const pdfUrl = new URL(href).searchParams.get('path');
            if (pdfUrl && pdfUrl.endsWith('.pdf')) {
              pdfData.push({ title, href });
            }
          }
        });

        // Renderizar la lista en el contenedor 'pdf-list-container'
        const renderList = (containerId, data, limit = null) => {
          const container = document.getElementById(containerId);
          const ul = document.createElement('ul');
          ul.classList.add('list-unstyled', 'list-group-flush', 'mt-3', 'mb-4');

          // Si se especifica un límite, usarlo; de lo contrario, renderizar todo
          const itemsToRender = limit ? data.slice(0, limit) : data;

          itemsToRender.forEach(({ title, href }) => {
            const li = document.createElement('li');
            li.classList.add('list-group-item');

            const a = document.createElement('a');
            a.href = href;
            a.textContent = title;
            a.target = '_blank';

            li.appendChild(a);
            ul.appendChild(li);
          });

          container.appendChild(ul);
        };

        // Renderizar los primeros 4 elementos en 'pdf-list-container'
        renderList('pdf-list-container', pdfData, 3);

        // Renderizar la lista completa en 'listaCompletaComunicados'
        renderList('listaCompletaComunicados', pdfData);
      })
      .catch(error => {
        console.error('Error:', error.message);
      });








// Función para actualizar la hora actual
    function updateCurrentTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      document.getElementById('current-time').textContent = `${hours}:${minutes}`;
    }
    // Inicializar y actualizar hora 
    document.addEventListener('DOMContentLoaded', function() {
      // Actualizar la hora inmediatamente y luego cada minuto
      updateCurrentTime();
      setInterval(updateCurrentTime, 60000);
    });

      
