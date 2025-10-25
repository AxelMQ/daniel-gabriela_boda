/* ============================================
   ANIMACIONES Y EFECTOS VISUALES
   Efectos especiales para la invitación
   ============================================ */

// ===== CONFIGURACIÓN DE ANIMACIONES =====
const ANIMATION_CONFIG = {
    duration: 800,
    easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
    stagger: 200,
    threshold: 0.1
};

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initParallaxEffects();
    initHoverAnimations();
    initLoadingAnimations();
    initTypingEffect();
});

// ===== ANIMACIONES DE SCROLL =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: ANIMATION_CONFIG.threshold,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = index * ANIMATION_CONFIG.stagger;
                
                setTimeout(() => {
                    element.classList.add('animate-fadeInUp');
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, delay);
            }
        });
    }, observerOptions);
    
    // Elementos a animar
    const animatedElements = document.querySelectorAll(`
        .hero__content,
        .story__content,
        .event__content,
        .rsvp__content,
        .footer__content
    `);
    
    animatedElements.forEach(element => {
        // Estado inicial
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all ${ANIMATION_CONFIG.duration}ms ${ANIMATION_CONFIG.easing}`;
        
        observer.observe(element);
    });
}

// ===== EFECTOS PARALLAX =====
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.hero__decoration, .story__image, .event__image');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible) {
                element.style.transform = `translateY(${rate}px)`;
            }
        });
    });
}

// ===== ANIMACIONES DE HOVER =====
function initHoverAnimations() {
    // Efecto de hover en imágenes
    const images = document.querySelectorAll('.story__img, .event__img');
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(1deg)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        });
    });
    
    // Efecto de hover en botones
    const buttons = document.querySelectorAll('.btn, .rsvp__btn, .info__map-btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Efecto de hover en enlaces de navegación
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.color = 'var(--color-secondary)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.color = 'var(--color-primary)';
        });
    });
}

// ===== ANIMACIONES DE CARGA =====
function initLoadingAnimations() {
    // Animación de los anillos en el hero
    const rings = document.querySelectorAll('.ring');
    rings.forEach((ring, index) => {
        ring.style.animation = `float 3s ease-in-out infinite`;
        ring.style.animationDelay = `${index * 1.5}s`;
    });
    
    // Animación de las hojas en el footer
    const branches = document.querySelectorAll('.branch');
    branches.forEach((branch, index) => {
        branch.style.animation = `sway 4s ease-in-out infinite`;
        branch.style.animationDelay = `${index * 2}s`;
    });
    
    // Agregar keyframes para las animaciones
    addKeyframes();
}

// ===== EFECTO DE TECLADO =====
function initTypingEffect() {
    const typingElements = document.querySelectorAll('[data-typing]');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid var(--color-primary)';
        
        let index = 0;
        const typeInterval = setInterval(() => {
            element.textContent += text[index];
            index++;
            
            if (index >= text.length) {
                clearInterval(typeInterval);
                element.style.borderRight = 'none';
            }
        }, 100);
    });
}

// ===== KEYFRAMES DINÁMICOS =====
function addKeyframes() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { 
                transform: translateY(0px) rotate(0deg); 
            }
            50% { 
                transform: translateY(-10px) rotate(5deg); 
            }
        }
        
        @keyframes sway {
            0%, 100% { 
                transform: rotate(0deg); 
            }
            25% { 
                transform: rotate(2deg); 
            }
            75% { 
                transform: rotate(-2deg); 
            }
        }
        
        @keyframes pulse {
            0%, 100% { 
                transform: scale(1); 
                opacity: 1; 
            }
            50% { 
                transform: scale(1.05); 
                opacity: 0.8; 
            }
        }
        
        @keyframes shimmer {
            0% { 
                background-position: -200% 0; 
            }
            100% { 
                background-position: 200% 0; 
            }
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { 
                transform: translateY(0); 
            }
            40% { 
                transform: translateY(-10px); 
            }
            60% { 
                transform: translateY(-5px); 
            }
        }
        
        @keyframes fadeInScale {
            0% { 
                opacity: 0; 
                transform: scale(0.8); 
            }
            100% { 
                opacity: 1; 
                transform: scale(1); 
            }
        }
        
        @keyframes slideInFromLeft {
            0% { 
                opacity: 0; 
                transform: translateX(-50px); 
            }
            100% { 
                opacity: 1; 
                transform: translateX(0); 
            }
        }
        
        @keyframes slideInFromRight {
            0% { 
                opacity: 0; 
                transform: translateX(50px); 
            }
            100% { 
                opacity: 1; 
                transform: translateX(0); 
            }
        }
        
        @keyframes rotateIn {
            0% { 
                opacity: 0; 
                transform: rotate(-180deg) scale(0.5); 
            }
            100% { 
                opacity: 1; 
                transform: rotate(0deg) scale(1); 
            }
        }
        
        @keyframes zoomIn {
            0% { 
                opacity: 0; 
                transform: scale(0.3); 
            }
            50% { 
                opacity: 0.8; 
                transform: scale(1.1); 
            }
            100% { 
                opacity: 1; 
                transform: scale(1); 
            }
        }
    `;
    
    document.head.appendChild(style);
}

// ===== ANIMACIONES DE ENTRADA =====
function animateElement(element, animationType, delay = 0) {
    setTimeout(() => {
        element.classList.add(`animate-${animationType}`);
        
        // Remover clase después de la animación
        setTimeout(() => {
            element.classList.remove(`animate-${animationType}`);
        }, ANIMATION_CONFIG.duration);
    }, delay);
}

// ===== EFECTOS ESPECIALES =====
function createParticleEffect(container) {
    const particles = [];
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Estilos de la partícula
        Object.assign(particle.style, {
            position: 'absolute',
            width: '4px',
            height: '4px',
            backgroundColor: 'var(--color-gold)',
            borderRadius: '50%',
            pointerEvents: 'none',
            animation: `float ${2 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`
        });
        
        container.appendChild(particle);
        particles.push(particle);
    }
    
    // Limpiar partículas después de un tiempo
    setTimeout(() => {
        particles.forEach(particle => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        });
    }, 5000);
}

// ===== ANIMACIÓN DE CONTADOR =====
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        element.textContent = Math.floor(current);
        
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// ===== EFECTOS DE MOUSE =====
function initMouseEffects() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    
    // Estilos del cursor personalizado
    Object.assign(cursor.style, {
        position: 'fixed',
        width: '20px',
        height: '20px',
        backgroundColor: 'var(--color-primary)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: '9999',
        opacity: '0.7',
        transform: 'translate(-50%, -50%)',
        transition: 'all 0.1s ease'
    });
    
    document.body.appendChild(cursor);
    
    // Seguir el mouse
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Efectos en hover
    const hoverElements = document.querySelectorAll('a, button, .nav__link');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.backgroundColor = 'var(--color-secondary)';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.backgroundColor = 'var(--color-primary)';
        });
    });
}

// ===== ANIMACIONES DE SCROLL SUAVE =====
function smoothScrollTo(target, duration = 800) {
    const targetPosition = target.offsetTop - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// ===== FUNCIONES GLOBALES =====
window.Animations = {
    animateElement,
    createParticleEffect,
    animateCounter,
    smoothScrollTo,
    initMouseEffects
};

// ===== INICIALIZAR EFECTOS ADICIONALES =====
document.addEventListener('DOMContentLoaded', function() {
    // Descomenta si quieres efectos adicionales
    // initMouseEffects();
});
