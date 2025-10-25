/* ============================================
   DANIEL & GABRIELA - INVITACIÓN DE BODA
   JavaScript principal - Funcionalidades generales
   ============================================ */

// ===== CONFIGURACIÓN INICIAL =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎉 Invitación de boda cargada correctamente');
    
    // Inicializar todas las funcionalidades
    initNavigation();
    initScrollEffects();
    initAnimations();
    initMapButton();
    initSmoothScrolling();
});

// ===== NAVEGACIÓN =====
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav__link');
    const sections = document.querySelectorAll('section[id]');
    
    // Navegación suave
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Ajuste para header fijo
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Highlight de sección activa
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav(); // Ejecutar al cargar
}

// ===== EFECTOS DE SCROLL =====
function initScrollEffects() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Mostrar/ocultar header
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        // Cambiar opacidad del header
        if (currentScrollY > 50) {
            header.style.backgroundColor = 'rgba(245, 245, 220, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.backgroundColor = 'rgba(245, 245, 220, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// ===== ANIMACIONES =====
function initAnimations() {
    // Intersection Observer para animaciones al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                
                // Animación especial para elementos con delay
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, delay);
            }
        });
    }, observerOptions);
    
    // Observar elementos animables
    const animatedElements = document.querySelectorAll('.story__content, .event__content, .rsvp__content');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        el.dataset.delay = index * 200; // Delay escalonado
        observer.observe(el);
    });
}

// ===== BOTÓN DE MAPA =====
function initMapButton() {
    const mapButton = document.querySelector('.info__map-btn');
    
    if (mapButton) {
        mapButton.addEventListener('click', function() {
            // Coordenadas del Condominio Torres Solaris (ejemplo)
            const latitude = -17.7833; // Latitud de Santa Cruz, Bolivia
            const longitude = -63.1833; // Longitud de Santa Cruz, Bolivia
            const address = 'Condominio Torres Solaris, Radial 19, 5to. Anillo, Santa Cruz, Bolivia';
            
            // Crear URL de Google Maps
            const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
            
            // Abrir en nueva pestaña
            window.open(mapsUrl, '_blank');
            
            // Mostrar notificación
            showNotification('🗺️ Abriendo ubicación en Google Maps...', 'success');
        });
    }
}

// ===== SCROLL SUAVE =====
function initSmoothScrolling() {
    // Asegurar que el scroll suave funcione en todos los navegadores
    if (!('scrollBehavior' in document.documentElement.style)) {
        // Polyfill para navegadores que no soportan scroll-behavior
        const smoothScrollPolyfill = function(target) {
            const targetPosition = target.offsetTop - 80;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 800;
            let start = null;
            
            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }
            
            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }
            
            requestAnimationFrame(animation);
        };
        
        // Aplicar polyfill a todos los enlaces de navegación
        document.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) smoothScrollPolyfill(target);
            });
        });
    }
}

// ===== UTILIDADES =====
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    // Estilos de la notificación
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '12px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '600',
        zIndex: '10000',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease-out',
        backgroundColor: type === 'success' ? '#4CAF50' : type === 'error' ? '#F44336' : '#2196F3'
    });
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ===== EFECTOS DE HOVER =====
function initHoverEffects() {
    // Efecto de hover en imágenes
    const images = document.querySelectorAll('.story__img, .event__img');
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Efecto de hover en botones
    const buttons = document.querySelectorAll('.btn, .rsvp__btn, .info__map-btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// ===== PRELOADER (OPCIONAL) =====
function initPreloader() {
    // Crear preloader
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = `
        <div class="preloader__content">
            <div class="preloader__rings">
                <div class="ring"></div>
                <div class="ring"></div>
            </div>
            <p class="preloader__text">Daniel & Gabriela</p>
        </div>
    `;
    
    // Estilos del preloader
    const style = document.createElement('style');
    style.textContent = `
        #preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--color-cream);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: opacity 0.5s ease-out;
        }
        
        .preloader__content {
            text-align: center;
        }
        
        .preloader__rings {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            margin-bottom: 20px;
        }
        
        .preloader__rings .ring {
            width: 40px;
            height: 40px;
            border: 3px solid var(--color-primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        .preloader__rings .ring:nth-child(2) {
            animation-delay: 0.5s;
        }
        
        .preloader__text {
            font-family: var(--font-primary);
            font-size: 24px;
            color: var(--color-primary);
            font-weight: 600;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(preloader);
    
    // Ocultar preloader cuando la página esté cargada
    window.addEventListener('load', function() {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                if (preloader.parentNode) {
                    preloader.parentNode.removeChild(preloader);
                }
            }, 500);
        }, 1000);
    });
}

// ===== INICIALIZAR EFECTOS ADICIONALES =====
document.addEventListener('DOMContentLoaded', function() {
    initHoverEffects();
    // initPreloader(); // Descomenta si quieres el preloader
});

// ===== MANEJO DE ERRORES =====
window.addEventListener('error', function(e) {
    console.error('Error en la aplicación:', e.error);
    showNotification('⚠️ Ha ocurrido un error. Por favor, recarga la página.', 'error');
});

// ===== FUNCIONES DE UTILIDAD GLOBAL =====
window.WeddingInvitation = {
    showNotification,
    initNavigation,
    initScrollEffects,
    initAnimations
};
