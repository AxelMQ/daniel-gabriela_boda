/* ============================================
   SISTEMA DE CONFIRMACIÓN RSVP
   Manejo de confirmaciones de asistencia
   ============================================ */

// ===== CONFIGURACIÓN =====
const RSVP_CONFIG = {
    // Configuración de la confirmación
    maxGuests: 4,
    deadlineDate: new Date('2025-10-29'),
    
    // Mensajes
    messages: {
        success: '¡Gracias por confirmar tu asistencia! Te esperamos el 31 de octubre.',
        error: 'Hubo un error al enviar tu confirmación. Por favor, inténtalo de nuevo.',
        deadline: 'La fecha límite para confirmar ha pasado.',
        required: 'Por favor, completa todos los campos obligatorios.'
    },
    
    // Validaciones
    validations: {
        name: {
            required: true,
            minLength: 2,
            maxLength: 50,
            pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
        },
        email: {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        guests: {
            required: true,
            min: 1,
            max: 4
        }
    }
};

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    initRSVP();
    checkDeadline();
});

// ===== FUNCIONES PRINCIPALES =====
function initRSVP() {
    const confirmBtn = document.getElementById('confirmBtn');
    const modal = document.getElementById('rsvpModal');
    const closeBtn = document.querySelector('.modal__close');
    const form = document.getElementById('rsvpForm');
    
    // Abrir modal al hacer clic en el botón
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
            openRSVPModal();
        });
    }
    
    // Cerrar modal
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            closeRSVPModal();
        });
    }
    
    // Cerrar modal al hacer clic fuera
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeRSVPModal();
            }
        });
    }
    
    // Manejar envío del formulario
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleRSVPSubmission();
        });
    }
    
    // Validación en tiempo real
    initFormValidation();
}

// ===== MODAL =====
function openRSVPModal() {
    const modal = document.getElementById('rsvpModal');
    if (modal) {
        modal.classList.add('show');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Enfocar el primer campo
        const firstInput = modal.querySelector('input');
        if (firstInput) {
            setTimeout(() => firstInput.focus(), 100);
        }
        
        // Animación de entrada
        const modalContent = modal.querySelector('.modal__content');
        if (modalContent) {
            modalContent.style.transform = 'scale(0.8)';
            modalContent.style.opacity = '0';
            
            setTimeout(() => {
                modalContent.style.transform = 'scale(1)';
                modalContent.style.opacity = '1';
            }, 10);
        }
    }
}

function closeRSVPModal() {
    const modal = document.getElementById('rsvpModal');
    if (modal) {
        const modalContent = modal.querySelector('.modal__content');
        
        // Animación de salida
        if (modalContent) {
            modalContent.style.transform = 'scale(0.8)';
            modalContent.style.opacity = '0';
        }
        
        setTimeout(() => {
            modal.classList.remove('show');
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Limpiar formulario
            resetRSVPForm();
        }, 300);
    }
}

// ===== FORMULARIO =====
function initFormValidation() {
    const form = document.getElementById('rsvpForm');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        // Validación en tiempo real
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateField(field) {
    const fieldName = field.name;
    const value = field.value.trim();
    const validation = RSVP_CONFIG.validations[fieldName];
    
    if (!validation) return true;
    
    let isValid = true;
    let errorMessage = '';
    
    // Validación requerida
    if (validation.required && !value) {
        isValid = false;
        errorMessage = 'Este campo es obligatorio';
    }
    
    // Validación de longitud mínima
    if (isValid && validation.minLength && value.length < validation.minLength) {
        isValid = false;
        errorMessage = `Mínimo ${validation.minLength} caracteres`;
    }
    
    // Validación de longitud máxima
    if (isValid && validation.maxLength && value.length > validation.maxLength) {
        isValid = false;
        errorMessage = `Máximo ${validation.maxLength} caracteres`;
    }
    
    // Validación de patrón
    if (isValid && validation.pattern && !validation.pattern.test(value)) {
        isValid = false;
        if (fieldName === 'email') {
            errorMessage = 'Ingresa un email válido';
        } else if (fieldName === 'name') {
            errorMessage = 'Solo se permiten letras y espacios';
        }
    }
    
    // Validación de número de invitados
    if (isValid && fieldName === 'guests') {
        const numGuests = parseInt(value);
        if (numGuests < validation.min || numGuests > validation.max) {
            isValid = false;
            errorMessage = `Entre ${validation.min} y ${validation.max} invitados`;
        }
    }
    
    // Mostrar/ocultar error
    if (isValid) {
        clearFieldError(field);
    } else {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    field.classList.add('error');
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    
    // Estilos del error
    Object.assign(errorDiv.style, {
        color: '#F44336',
        fontSize: '14px',
        marginTop: '4px',
        fontWeight: '500'
    });
    
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.classList.remove('error');
    
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

function resetRSVPForm() {
    const form = document.getElementById('rsvpForm');
    if (form) {
        form.reset();
        
        // Limpiar errores
        const errorFields = form.querySelectorAll('.error');
        errorFields.forEach(field => clearFieldError(field));
    }
}

// ===== ENVÍO DE CONFIRMACIÓN =====
function handleRSVPSubmission() {
    const form = document.getElementById('rsvpForm');
    if (!form) return;
    
    // Validar todos los campos
    const inputs = form.querySelectorAll('input, select, textarea');
    let allValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            allValid = false;
        }
    });
    
    if (!allValid) {
        showNotification(RSVP_CONFIG.messages.required, 'error');
        return;
    }
    
    // Obtener datos del formulario
    const formData = new FormData(form);
    const rsvpData = {
        name: formData.get('name'),
        email: formData.get('email'),
        guests: parseInt(formData.get('guests')),
        message: formData.get('message') || '',
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent
    };
    
    // Mostrar loading
    showLoadingState();
    
    // Simular envío (aquí conectarías con tu backend)
    setTimeout(() => {
        handleRSVPResponse(rsvpData);
    }, 2000);
}

function showLoadingState() {
    const submitBtn = document.querySelector('.form__submit');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'ENVIANDO...';
        submitBtn.style.opacity = '0.7';
    }
}

function hideLoadingState() {
    const submitBtn = document.querySelector('.form__submit');
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'CONFIRMAR';
        submitBtn.style.opacity = '1';
    }
}

function handleRSVPResponse(data) {
    hideLoadingState();
    
    // Aquí normalmente enviarías los datos a tu servidor
    console.log('Datos de confirmación:', data);
    
    // Simular respuesta exitosa
    const success = Math.random() > 0.1; // 90% de éxito
    
    if (success) {
        // Guardar en localStorage como respaldo
        saveRSVPToLocal(data);
        
        // Mostrar mensaje de éxito
        showNotification(RSVP_CONFIG.messages.success, 'success');
        
        // Cerrar modal
        setTimeout(() => {
            closeRSVPModal();
        }, 1500);
        
        // Actualizar contador (si existe)
        updateRSVPCounter();
        
    } else {
        showNotification(RSVP_CONFIG.messages.error, 'error');
    }
}

// ===== ALMACENAMIENTO LOCAL =====
function saveRSVPToLocal(data) {
    try {
        const existingRSVPs = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
        existingRSVPs.push(data);
        localStorage.setItem('wedding_rsvps', JSON.stringify(existingRSVPs));
    } catch (error) {
        console.error('Error guardando RSVP:', error);
    }
}

function getRSVPsFromLocal() {
    try {
        return JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
    } catch (error) {
        console.error('Error leyendo RSVPs:', error);
        return [];
    }
}

// ===== CONTADOR DE CONFIRMACIONES =====
function updateRSVPCounter() {
    const rsvps = getRSVPsFromLocal();
    const totalGuests = rsvps.reduce((total, rsvp) => total + rsvp.guests, 0);
    
    // Actualizar contador si existe en el DOM
    const counter = document.querySelector('.rsvp__counter');
    if (counter) {
        counter.textContent = `${rsvps.length} confirmaciones • ${totalGuests} invitados`;
    }
}

// ===== VERIFICACIÓN DE FECHA LÍMITE =====
function checkDeadline() {
    const now = new Date();
    const deadline = RSVP_CONFIG.deadlineDate;
    
    if (now > deadline) {
        // Deshabilitar formulario si ha pasado la fecha límite
        const confirmBtn = document.getElementById('confirmBtn');
        const form = document.getElementById('rsvpForm');
        
        if (confirmBtn) {
            confirmBtn.disabled = true;
            confirmBtn.textContent = 'FECHA LÍMITE PASADA';
            confirmBtn.style.opacity = '0.5';
            confirmBtn.style.cursor = 'not-allowed';
        }
        
        if (form) {
            form.style.opacity = '0.5';
            form.style.pointerEvents = 'none';
        }
        
        showNotification(RSVP_CONFIG.messages.deadline, 'error');
    }
}

// ===== EXPORTAR DATOS (PARA ADMINISTRADOR) =====
function exportRSVPData() {
    const rsvps = getRSVPsFromLocal();
    
    if (rsvps.length === 0) {
        showNotification('No hay confirmaciones para exportar', 'info');
        return;
    }
    
    // Crear CSV
    const headers = ['Nombre', 'Email', 'Invitados', 'Mensaje', 'Fecha'];
    const csvContent = [
        headers.join(','),
        ...rsvps.map(rsvp => [
            `"${rsvp.name}"`,
            `"${rsvp.email}"`,
            rsvp.guests,
            `"${rsvp.message}"`,
            new Date(rsvp.timestamp).toLocaleDateString()
        ].join(','))
    ].join('\n');
    
    // Descargar archivo
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `confirmaciones_boda_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    showNotification('📊 Datos exportados correctamente', 'success');
}

// ===== FUNCIONES GLOBALES =====
window.RSVP = {
    openModal: openRSVPModal,
    closeModal: closeRSVPModal,
    exportData: exportRSVPData,
    getRSVPs: getRSVPsFromLocal,
    updateCounter: updateRSVPCounter
};
