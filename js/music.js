/* ============================================
   CONTROL DE MÚSICA DE FONDO
   Funcionalidad para reproducir música de fondo
   ============================================ */

// ===== CONFIGURACIÓN =====
const MUSIC_CONFIG = {
    volume: 0.3, // Volumen bajo para no ser intrusivo
    fadeInDuration: 2000, // 2 segundos para fade in
    fadeOutDuration: 1000, // 1 segundo para fade out
    autoPlay: false, // No reproducir automáticamente (requiere interacción del usuario)
    loop: true
};

// ===== VARIABLES GLOBALES =====
let audio = null;
let isPlaying = false;
let isFading = false;

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    initMusic();
});

// ===== FUNCIONES PRINCIPALES =====
function initMusic() {
    audio = document.getElementById('backgroundMusic');
    const playBtn = document.getElementById('playMusic');
    const pauseBtn = document.getElementById('pauseMusic');
    
    if (!audio || !playBtn || !pauseBtn) {
        console.warn('Elementos de música no encontrados');
        return;
    }
    
    // Configurar audio
    audio.volume = MUSIC_CONFIG.volume;
    audio.loop = MUSIC_CONFIG.loop;
    
    // Event listeners
    playBtn.addEventListener('click', playMusic);
    pauseBtn.addEventListener('click', pauseMusic);
    
    // Eventos del audio
    audio.addEventListener('loadstart', function() {
        console.log('Cargando música...');
    });
    
    audio.addEventListener('canplay', function() {
        console.log('Música lista para reproducir');
        showMusicControls();
    });
    
    audio.addEventListener('error', function(e) {
        console.error('Error cargando música:', e);
        hideMusicControls();
        showNotification('⚠️ No se pudo cargar la música de fondo', 'error');
    });
    
    // Detectar cuando el usuario interactúa por primera vez
    document.addEventListener('click', function() {
        if (!isPlaying && audio.readyState >= 2) {
            // Mostrar sugerencia de música después de la primera interacción
            setTimeout(() => {
                showMusicSuggestion();
            }, 3000);
        }
    }, { once: true });
}

// ===== CONTROL DE REPRODUCCIÓN =====
function playMusic() {
    if (!audio || isFading) return;
    
    if (audio.paused) {
        audio.play().then(() => {
            isPlaying = true;
            updateMusicControls();
            showNotification('🎵 Reproduciendo música de fondo', 'success');
            
            // Fade in suave
            fadeIn();
        }).catch(error => {
            console.error('Error reproduciendo música:', error);
            showNotification('⚠️ No se pudo reproducir la música', 'error');
        });
    }
}

function pauseMusic() {
    if (!audio || isFading) return;
    
    if (!audio.paused) {
        // Fade out suave antes de pausar
        fadeOut(() => {
            audio.pause();
            isPlaying = false;
            updateMusicControls();
            showNotification('⏸️ Música pausada', 'info');
        });
    }
}

// ===== EFECTOS DE FADE =====
function fadeIn() {
    if (isFading) return;
    
    isFading = true;
    audio.volume = 0;
    
    const fadeInterval = setInterval(() => {
        if (audio.volume < MUSIC_CONFIG.volume) {
            audio.volume = Math.min(audio.volume + 0.05, MUSIC_CONFIG.volume);
        } else {
            clearInterval(fadeInterval);
            isFading = false;
        }
    }, 100);
}

function fadeOut(callback) {
    if (isFading) return;
    
    isFading = true;
    
    const fadeInterval = setInterval(() => {
        if (audio.volume > 0) {
            audio.volume = Math.max(audio.volume - 0.05, 0);
        } else {
            clearInterval(fadeInterval);
            isFading = false;
            if (callback) callback();
        }
    }, 50);
}

// ===== CONTROL DE INTERFAZ =====
function updateMusicControls() {
    const playBtn = document.getElementById('playMusic');
    const pauseBtn = document.getElementById('pauseMusic');
    
    if (isPlaying) {
        playBtn.style.display = 'none';
        pauseBtn.style.display = 'flex';
    } else {
        playBtn.style.display = 'flex';
        pauseBtn.style.display = 'none';
    }
}

function showMusicControls() {
    const controls = document.querySelector('.music-controls');
    if (controls) {
        controls.style.opacity = '1';
        controls.style.transform = 'translateY(0)';
    }
}

function hideMusicControls() {
    const controls = document.querySelector('.music-controls');
    if (controls) {
        controls.style.opacity = '0';
        controls.style.transform = 'translateY(20px)';
    }
}

// ===== SUGERENCIAS =====
function showMusicSuggestion() {
    if (isPlaying) return;
    
    const suggestion = document.createElement('div');
    suggestion.className = 'music-suggestion';
    suggestion.innerHTML = `
        <div class="suggestion-content">
            <span class="suggestion-icon">🎵</span>
            <p>¿Te gustaría escuchar música de fondo?</p>
            <button class="suggestion-btn" onclick="playMusic()">Sí, reproducir</button>
            <button class="suggestion-close" onclick="closeSuggestion()">×</button>
        </div>
    `;
    
    // Estilos de la sugerencia
    Object.assign(suggestion.style, {
        position: 'fixed',
        bottom: '80px',
        right: '20px',
        background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
        color: 'white',
        padding: '15px',
        borderRadius: '10px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        zIndex: '1001',
        maxWidth: '250px',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease-out'
    });
    
    document.body.appendChild(suggestion);
    
    // Animar entrada
    setTimeout(() => {
        suggestion.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto-ocultar después de 10 segundos
    setTimeout(() => {
        if (suggestion.parentNode) {
            closeSuggestion();
        }
    }, 10000);
}

function closeSuggestion() {
    const suggestion = document.querySelector('.music-suggestion');
    if (suggestion) {
        suggestion.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (suggestion.parentNode) {
                suggestion.parentNode.removeChild(suggestion);
            }
        }, 300);
    }
}

// ===== UTILIDADES =====
function setVolume(volume) {
    if (audio) {
        audio.volume = Math.max(0, Math.min(1, volume));
    }
}

function toggleMusic() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

// ===== FUNCIONES GLOBALES =====
window.Music = {
    play: playMusic,
    pause: pauseMusic,
    toggle: toggleMusic,
    setVolume: setVolume,
    isPlaying: () => isPlaying
};

// ===== ESTILOS DINÁMICOS =====
const style = document.createElement('style');
style.textContent = `
    .music-controls {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease-out;
    }
    
    .music-suggestion {
        font-family: var(--font-secondary);
    }
    
    .suggestion-content {
        position: relative;
    }
    
    .suggestion-icon {
        font-size: 24px;
        margin-right: 10px;
    }
    
    .suggestion-btn {
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.3);
        color: white;
        padding: 8px 16px;
        border-radius: 5px;
        cursor: pointer;
        margin: 10px 5px 0 0;
        transition: all 0.2s ease;
    }
    
    .suggestion-btn:hover {
        background: rgba(255, 255, 255, 0.3);
    }
    
    .suggestion-close {
        position: absolute;
        top: -5px;
        right: -5px;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .suggestion-close:hover {
        background: rgba(255, 255, 255, 0.3);
    }
`;
document.head.appendChild(style);
