// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('rsvpModal');
    const formBtn = document.getElementById('formBtn');
    const closeBtn = document.querySelector('.modal__close');
    const form = document.getElementById('rsvpForm');

    // Abrir modal
    formBtn.addEventListener('click', function() {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    });

    // Cerrar modal
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    });

    // Cerrar modal al hacer clic fuera
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });

    // Manejar envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const guests = formData.get('guests');
        const message = formData.get('message') || 'Sin mensaje adicional';
        
        // Crear mensaje personalizado para WhatsApp
        const whatsappMessage = `¡Hola! Confirmo mi asistencia a la boda de Daniel y Gabriela el 31 de octubre.

👤 Nombre: ${name}
📧 Email: ${email}
👥 Número de invitados: ${guests}
💌 Mensaje: ${message}

¡Gracias por la invitación!`;

        // Crear enlace de WhatsApp con mensaje personalizado
        const whatsappUrl = `https://wa.me/59171355794?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Abrir WhatsApp
        window.open(whatsappUrl, '_blank');
        
        // Cerrar modal
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
        
        // Limpiar formulario
        form.reset();
        
        // Mostrar mensaje de confirmación
        showNotification('¡Formulario enviado! Se abrirá WhatsApp con tu mensaje personalizado.');
    });

    // Función para mostrar notificaciones
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #25D366, #128C7E);
            color: white;
            padding: 15px 25px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
});

// Agregar animaciones CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
