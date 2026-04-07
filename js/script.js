document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Inicializar AOS (Animaciones al scroll)
    AOS.init({
        duration: 1000,
        once: true
    });

    // 2. Menú Hamburguesa
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('open');
        });
    }

    // 3. Efecto Sticky Navbar al Scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.navbar');
        if (header) {
            header.classList.toggle('sticky-active', window.scrollY > 50);
        }
    });

    // 4. === GALERÍA DE FOTOS EXPANDIBLE CON AUTO-PLAY ===
    const galleryItems = document.querySelectorAll('.gallery-item');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;
    let autoPlayInterval;

    // Función principal para actualizar la vista
    function updateGallery(index) {
        // Limpiar estados anteriores
        galleryItems.forEach(item => item.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Activar nuevos elementos
        if (galleryItems[index]) {
            galleryItems[index].classList.add('active');
        }
        
        // Sincronizar indicadores (buscando por data-slide o por orden)
        const currentIndicator = document.querySelector(`.indicator[data-slide="${index}"]`) || indicators[index];
        if (currentIndicator) {
            currentIndicator.classList.add('active');
        }

        currentIndex = index;
    }

    // Eventos de clic en imágenes
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            updateGallery(index);
            resetAutoPlay(); // Reinicia el tiempo si el usuario hace clic
        });
    });

    // Eventos de clic en indicadores
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            const slideIndex = parseInt(indicator.getAttribute('data-slide')) || index;
            updateGallery(slideIndex);
            resetAutoPlay();
        });
    });

    // Lógica de Auto-Play
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            let nextIndex = (currentIndex + 1) % galleryItems.length;
            updateGallery(nextIndex);
        }, 5000); // Cambio cada 5 segundos
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Iniciar el carrusel al cargar
    startAutoPlay();

    // Detener auto-play al pasar el mouse por encima
    const galleryContainer = document.querySelector('.gallery-container');
    if (galleryContainer) {
        galleryContainer.addEventListener('mouseenter', stopAutoPlay);
        galleryContainer.addEventListener('mouseleave', startAutoPlay);
    }

    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            let prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            updateGallery(prevIndex);
            resetAutoPlay();
        } else if (e.key === 'ArrowRight') {
            let nextIndex = (currentIndex + 1) % galleryItems.length;
            updateGallery(nextIndex);
            resetAutoPlay();
        }
    });
});