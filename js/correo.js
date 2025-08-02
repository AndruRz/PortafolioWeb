// 1. Primero agrega este script en tu HTML (antes del </body>)
// <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>

// 2. Inicializar EmailJS con tu Public Key
(function() {
    emailjs.init('-72EbidqkXF-8o4Qt'); // ⚠️ REEMPLAZA con tu Public Key de EmailJS
})();

// 3. Función mejorada para el formulario de contacto
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener el botón de envío para mostrar estado de carga
    const submitBtn = this.querySelector('.btn-submit');
    const btnText = submitBtn.querySelector('span');
    const originalText = btnText.textContent;
    
    // Cambiar estado del botón a "enviando"
    submitBtn.disabled = true;
    btnText.textContent = 'Enviando...';
    submitBtn.style.opacity = '0.7';
    
    // Obtener datos del formulario
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Mapear los valores del select a texto legible
    const subjectMap = {
        'web-development': 'Desarrollo Web',
        'full-stack': 'Aplicación Full Stack',
        'consultation': 'Consultoría',
        'collaboration': 'Colaboración',
        'other': 'Otro'
    };
    
    // Preparar parámetros para EmailJS
    const templateParams = {
        from_name: data.name,
        from_email: data.email,
        phone: data.phone || 'No proporcionado',
        subject: subjectMap[data.subject] || data.subject,
        message: data.message
    };
    
    // Enviar email usando EmailJS
    emailjs.send('service_1q6rzq7', 'template_tv3e1ll', templateParams)
        .then(function(response) {
            console.log('Email enviado exitosamente!', response.status, response.text);
            
            // Mostrar mensaje de éxito
            showNotification('¡Mensaje enviado correctamente! Te responderé pronto.', 'success');
            
            // Limpiar formulario
            document.getElementById('contactForm').reset();
            
        }, function(error) {
            console.error('Error al enviar email:', error);
            
            // Mostrar mensaje de error
            showNotification('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.', 'error');
        })
        .finally(function() {
            // Restaurar estado del botón
            submitBtn.disabled = false;
            btnText.textContent = originalText;
            submitBtn.style.opacity = '1';
        });
});

// Función para mostrar notificaciones (reemplaza el alert básico)
function showNotification(message, type = 'success') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 1000;
        font-family: inherit;
        font-size: 14px;
        max-width: 300px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    notification.textContent = message;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// CONFIGURACIÓN PASO A PASO:

/*
PASO 1: Crear cuenta en EmailJS
1. Ve a https://www.emailjs.com/
2. Crea una cuenta gratuita
3. Verifica tu email

PASO 2: Configurar servicio de email
1. En el dashboard, ve a "Email Services"
2. Haz clic en "Add New Service"
3. Selecciona "Gmail" (recomendado)
4. Conecta tu cuenta de Gmail (pablorodriguezperez69@gmail.com)
5. Copia el SERVICE_ID que se genera

PASO 3: Crear plantilla de email
1. Ve a "Email Templates"
2. Haz clic en "Create New Template"
3. Usa esta plantilla:

Subject: Nuevo mensaje de contacto - {{subject}}

Cuerpo del email:
Has recibido un nuevo mensaje de contacto desde tu portafolio:

Nombre: {{from_name}}
Email: {{from_email}}
Teléfono: {{phone}}
Asunto: {{subject}}

Mensaje:
{{message}}

---
Este mensaje fue enviado desde tu formulario de contacto.

4. Guarda y copia el TEMPLATE_ID

PASO 4: Obtener Public Key
1. Ve a "Account" en el menú
2. Copia tu "Public Key"

PASO 5: Reemplazar valores en el código
1. Reemplaza 'TU_PUBLIC_KEY' con tu Public Key
2. Reemplaza 'TU_SERVICE_ID' con tu Service ID  
3. Reemplaza 'TU_TEMPLATE_ID' con tu Template ID

PASO 6: Agregar script de EmailJS a tu HTML
Agrega antes del cierre </body>:
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
*/