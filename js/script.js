// js/script.js
// Tecno Frío 212 - Funcionalidades Completas

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ============================================
    // 1. NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ============================================
    // 2. MENÚ HAMBURGUESA (Mobile)
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Cerrar menú al hacer click en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ============================================
    // 3. FILTRO DE GALERÍA (Tabs)
    // ============================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const galleryItems = document.querySelectorAll('.g-card');

    function filterGallery(category) {
        galleryItems.forEach(item => {
            if (category === 'all') {
                item.classList.remove('hidden');
            } else {
                const itemCategory = item.getAttribute('data-cat');
                if (itemCategory === category) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            }
        });
    }

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remover clase active de todos los botones
                tabBtns.forEach(b => b.classList.remove('active'));
                // Agregar clase active al botón clickeado
                btn.classList.add('active');
                // Filtrar productos
                const category = btn.getAttribute('data-tab');
                filterGallery(category);
            });
        });
    }

    // ============================================
    // 4. SCROLL SUAVE PARA ENLACES INTERNOS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Evitar scroll si es solo "#" o está vacío
            if (targetId === '#' || targetId === '') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const navbarHeight = navbar ? navbar.offsetHeight : 72;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // 5. ANIMACIONES AL HACER SCROLL (Intersection Observer)
    // ============================================
    const animatedElements = document.querySelectorAll('.card-vendedor, .g-card, .why-card, .info-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Configurar estilos iniciales y observar
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ============================================
    // 6. EFECTO DE CARGA PARA IMÁGENES (Lazy Loading)
    // ============================================
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ============================================
    // 7. EFECTO DE ESCRITURA EN HERO (Opcional - Mejora visual)
    // ============================================
    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle && !heroTitle.hasAttribute('data-typed')) {
        // Solo ejecutar si no se ha hecho antes
        heroTitle.setAttribute('data-typed', 'true');
    }

    // ============================================
    // 8. PREVENIR CLICK EN ENLACES VACÍOS O ROTOS
    // ============================================
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', (e) => e.preventDefault());
    });

    // ============================================
    // 9. AGREGAR AÑO ACTUAL AL FOOTER (Opcional)
    // ============================================
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = `© ${currentYear} Tecno Frío 212 · Todos los derechos reservados.`;
    }

    // ============================================
    // 10. VALIDACIÓN DE ENLACES DE WHATSAPP Y EMAIL
    // ============================================
    const wsLinks = document.querySelectorAll('.btn-ws, .btn-ws-big, a[href*="wa.me"]');
    wsLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Los links de WhatsApp ya están correctamente formados
            console.log('Abriendo WhatsApp...');
        });
    });

    // ============================================
    // 11. EFECTO DE PARALLAX SUAVE EN HERO
    // ============================================
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            if (scrolled < heroSection.offsetHeight) {
                heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
            }
        });
    }

    // ============================================
    // 12. TOOLTIP PARA BOTONES DE CORREO (Opcional)
    // ============================================
    const mailBtns = document.querySelectorAll('.btn-mail');
    mailBtns.forEach(btn => {
        btn.addEventListener('mouseenter', (e) => {
            const tooltip = document.createElement('span');
            tooltip.textContent = 'Enviar correo';
            tooltip.style.position = 'absolute';
            tooltip.style.background = '#1a2f45';
            tooltip.style.color = '#fff';
            tooltip.style.fontSize = '0.7rem';
            tooltip.style.padding = '4px 8px';
            tooltip.style.borderRadius = '8px';
            tooltip.style.bottom = '100%';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%)';
            tooltip.style.whiteSpace = 'nowrap';
            tooltip.style.zIndex = '1000';
            btn.style.position = 'relative';
            btn.setAttribute('data-tooltip', 'true');
            btn.appendChild(tooltip);
            
            setTimeout(() => {
                if (btn.contains(tooltip)) btn.removeChild(tooltip);
            }, 1500);
        });
    });
});

// ============================================
// 13. PREVENIR ERRORES DE CONSOLA (Opcional)
// ============================================
window.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.warn('Imagen no cargada:', e.target.src);
        // Opcional: asignar imagen por defecto
        // e.target.src = '/img/placeholder.jpg';
    }
});

// ============================================
// 14. FUNCIÓN PARA COPIAR TELÉFONO (Opcional)
// ============================================
function copyPhoneNumber(phoneNumber) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(phoneNumber).then(() => {
            // Mostrar notificación temporal
            const notification = document.createElement('div');
            notification.textContent = '¡Número copiado!';
            notification.style.position = 'fixed';
            notification.style.bottom = '20px';
            notification.style.left = '50%';
            notification.style.transform = 'translateX(-50%)';
            notification.style.backgroundColor = '#2ECC71';
            notification.style.color = '#fff';
            notification.style.padding = '12px 24px';
            notification.style.borderRadius = '50px';
            notification.style.zIndex = '9999';
            notification.style.fontFamily = 'Outfit, sans-serif';
            notification.style.fontWeight = '600';
            notification.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.remove();
            }, 2000);
        });
    }
}

// ============================================
// 15. INICIALIZACIÓN DE MAPA (Si se necesita interacción)
// ============================================
const mapIframe = document.querySelector('.map-container iframe');
if (mapIframe) {
    mapIframe.addEventListener('load', () => {
        console.log('Mapa cargado correctamente');
    });
}

// Exportar funciones útiles globalmente (opcional)
window.TecnoFrio212 = {
    copyPhone: copyPhoneNumber,
    filterProducts: (category) => {
        const tabBtn = document.querySelector(`.tab-btn[data-tab="${category}"]`);
        if (tabBtn) tabBtn.click();
    }
};