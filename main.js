// Array de frases que cambian
const phrases = [
    "Desarrollador Full Stack",
    "Creador de Experiencias Web",
    "Especialista en Frontend",
    "Arquitecto de Soluciones",
    "Desarrollador JavaScript"
];

let currentPhraseIndex = 0;
const dynamicTextElement = document.getElementById('dynamicText');

function typeText(text, callback) {
    dynamicTextElement.textContent = '';
    let i = 0;
    
    const typeInterval = setInterval(() => {
        if (i < text.length) {
            dynamicTextElement.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(typeInterval);
            setTimeout(callback, 2000); // Pausa antes del siguiente cambio
        }
    }, 100);
}

function eraseText(callback) {
    const currentText = dynamicTextElement.textContent;
    let i = currentText.length;
    
    const eraseInterval = setInterval(() => {
        if (i > 0) {
            dynamicTextElement.textContent = currentText.substring(0, i - 1);
            i--;
        } else {
            clearInterval(eraseInterval);
            callback();
        }
    }, 50);
}

function changePhrases() {
    eraseText(() => {
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        typeText(phrases[currentPhraseIndex], () => {
            setTimeout(changePhrases, 3000);
        });
    });
}

// Iniciar la animación de texto
setTimeout(() => {
    changePhrases();
}, 3000);

// Animación de entrada
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ================================
// DATOS DE LOS PROYECTOS
// ================================

const projectsData = {
    //Pagina web de Dynamo
    'site-web': {
        title: 'Dynamo Oficial',
        description: 'Sitio web oficial del Club Deportivo Dynamo, creado para conectar con aficionados, destacar el talento del equipo y brindar acceso directo a noticias, galería, tienda y contacto para nuevos integrantes.',
        purpose: 'Proporcionar una plataforma digital que acerque al Club Deportivo Dynamo con la comunidad, permitiendo conocer su historia, jugadores destacados, y facilitar la interacción con personas interesadas en formar parte del equipo.',
        technologies: ['HTML5', 'CSS3', 'JavaScript'],
        features: [
            'Sección de noticias sobre el club y sus actividades',
            'Perfiles de jugadores destacados con trayectoria profesional y en la Selección Colombia',
            'Galería multimedia de imágenes y videos del equipo',
            'Zona de contacto para aspirantes a jugadores o entrenadores',
            'Tienda en línea de prendas deportivas oficiales',
            'Diseño adaptable para dispositivos móviles y escritorio'
        ],
        images: [
            './img/dynamo-proyect/1.png',
            './img/dynamo-proyect/2.png',
            './img/dynamo-proyect/3.png',
            './img/dynamo-proyect/4.png',
            './img/dynamo-proyect/5.png',
            './img/dynamo-proyect/6.png',
            './img/dynamo-proyect/7.png',
            './img/dynamo-proyect/8.png',
            './img/dynamo-proyect/9.png',
        ],
        liveUrl: 'https://clubdeportivodynamo.netlify.app',
        status: 'Completado'
    },
    //Sistema de Facutracion
    'billing-system': {
        title: 'Sistema de Inventario',
        description: 'Aplicación de escritorio integral para facturación, control de inventario y gestión de ventas, diseñada para pequeñas y medianas tiendas.',
        purpose: 'Brindar a los comercios una herramienta eficiente para registrar ventas, gestionar productos, controlar el inventario y obtener informes detallados del rendimiento del negocio.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'SQL'],
        features: [
            'Facturación y registro de ventas',
            'Gestión completa de productos e inventario',
            'Control de stock con alertas de agotamiento',
            'Reportes de ventas diarios, mensuales y anuales',
            'Gráficos estadísticos de productos más y menos vendidos',
            'Exportación de datos en Excel y PDF',
            'Historial detallado de transacciones',
            'Backup automático de la base de datos'
        ],
        images: [
            './img/sistema de inventario/1.png',
            './img/sistema de inventario/2.png',
            './img/sistema de inventario/3.png',
            './img/sistema de inventario/4.png',
            './img/sistema de inventario/5.png',
            './img/sistema de inventario/6.png',
            './img/sistema de inventario/7.png',
        ],
        liveUrl: null,
        githubUrl: 'https://github.com/AndruRz/Sistema-Facturacion.git',
        status: 'Completado'
    },
    // Simulador de Viento Cruzado
    'site-web-simulation': {
        title: 'Simulador de Viento Cruzado',
        description: 'Proyecto educativo presentado en la 2da Muestra Básica Expoingenio, organizada por la base aérea colombiana en Cali, Colombia. Este simulador busca ilustrar de forma sencilla cómo el viento cruzado afecta el comportamiento de una aeronave durante el vuelo.',
        purpose: 'Servir como base didáctica para introducir conceptos de aerodinámica, como la influencia del viento cruzado, el peso, la distancia y el tipo de aeronave en el consumo de combustible y su maniobrabilidad. Es un punto de partida para futuras mejoras y dinamización en entornos educativos militares o aeronáuticos.',
        technologies: ['HTML5', 'CSS3', 'JavaScript'],
        features: [
            'Interfaz intuitiva para simular viento cruzado',
            'Visualización de cambios en trayectoria según variables físicas',
            'Ajuste de parámetros como peso, tipo de aeronave y velocidad del viento',
            'Simulación visual de rotación y desvío',
            'Enlace con fundamentos físicos básicos',
            'Posibilidad de extensión educativa para futuras versiones'
        ],
        images: [
            './img/simulador-viento-cruzado/2.png',
            './img/simulador-viento-cruzado/5.png',
            './img/simulador-viento-cruzado/6.png',
            './img/simulador-viento-cruzado/8.png',
            './img/simulador-viento-cruzado/9.png',
            './img/simulador-viento-cruzado/14.png',
            './img/simulador-viento-cruzado/15.png',
        ],
        liveUrl: 'https://andrurz.github.io/',
        status: 'Completado'
    },
    // ArrendaFácil
    'site-web-arrendamiento': {
        title: 'ArrendaFácil',
        description: 'Plataforma digital desarrollada como proyecto universitario, pensada para facilitar el arrendamiento de propiedades en Cali, Colombia. Permite conectar de forma rápida y directa a propietarios e interesados en alquilar, optimizando la comunicación y negociación.',
        purpose: 'Brindar una solución ágil y accesible para centralizar procesos de arriendo, ofreciendo una interfaz intuitiva que permita contactar, conversar en tiempo real y planificar acuerdos entre ambas partes. Sirve como base funcional para futuras mejoras en plataformas de arriendo digital.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'MySQL'],
        features: [
            'Publicación de propiedades disponibles',
            'Búsqueda filtrada por ubicación y tipo de propiedad',
            'Mensajería en tiempo real entre arrendador y arrendatario',
            'Formulario de contacto para concretar acuerdos',
            'Diseño centrado en la usabilidad móvil y desktop',
            'Pensado como prototipo base para futura expansión',
        ],
        images: [
            './img/arrenda-facil/1.png',
            './img/arrenda-facil/2.png',
            './img/arrenda-facil/3.png',
            './img/arrenda-facil/4.png',
            './img/arrenda-facil/5.png',
            './img/arrenda-facil/6.png',
            './img/arrenda-facil/7.png',
            './img/arrenda-facil/8.png',
            './img/arrenda-facil/9.png',
            './img/arrenda-facil/10.png',
            './img/arrenda-facil/11.png',
            './img/arrenda-facil/12.png',
            './img/arrenda-facil/13.png',
            './img/arrenda-facil/14.png',
        ],
        githubUrl: 'https://github.com/AndruRz/ArrendaFacil.git',
        status: 'Completado'
    },
    //Aplicacion Movil
    'mobile-fitness': {
        title: 'FitUp',
        description: 'Aplicación móvil centrada en el deporte y la salud, que conecta deportistas con entrenadores personales para entrenamientos, recuperación física y seguimiento personalizado. Dividida en dos roles principales: deportista y entrenador.',
        purpose: 'Crear un espacio digital que facilite el acceso a servicios de entrenamiento físico personalizado y recuperación, promoviendo hábitos saludables y aprovechando la tecnología para conectar profesionales con usuarios de forma directa y eficiente.',
        technologies: ['Flutter', 'Firebase'],
        features: [
            'Conexión entre deportistas y entrenadores',
            'Perfiles diferenciados para entrenadores y usuarios',
            'Creación y asignación de rutinas personalizadas',
            'Seguimiento de entrenamientos y progreso físico',
            'Base de datos de ejercicios por categorías',
            'Soporte para objetivos como preparación física o recuperación',
            'Chat en tiempo real',
            'Sincronización de datos en la nube'
        ],
        images: [
            './img/fitup/1.jpg',
            './img/fitup/2.jpg',
            './img/fitup/3.jpg',
            './img/fitup/4.jpg',
            './img/fitup/5.jpg',
            './img/fitup/6.jpg',
            './img/fitup/7.jpg',
            './img/fitup/8.jpg'
        ],
    // Nuevas propiedades para las tiendas
 ///   playStoreUrl: '#', 
 //   appStoreUrl: '#', 
    status: 'En Desarrollo'
    }
};

// ================================
// VARIABLES GLOBALES
// ================================

let currentProject = null;
let currentImageIndex = 0;
let currentImages = [];

// ================================
// FILTROS DE PROYECTOS - MEJORADO
// ================================

// Inicializar filtros
document.addEventListener('DOMContentLoaded', function() {
    initializeFilters();
    initializeModal();
});

function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Actualizar botón activo
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filtrar proyectos
            filterProjects(filter, projectCards);
        });
    });
}

function filterProjects(filter, projectCards) {
    projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
            // Mostrar carta
            card.style.display = 'flex'; // Cambiado de 'block' a 'flex'
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            // Animación de entrada
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        } else {
            // Ocultar carta
            card.style.opacity = '0';
            card.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// ================================
// MODAL DE PROYECTO - MEJORADO
// ================================

function initializeModal() {
    const modal = document.getElementById('projectModal');
    
    // Cerrar modal con Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeProjectModal();
        }
    });
    
    // Navegación con teclado mejorada
    document.addEventListener('keydown', function(e) {
        if (modal.classList.contains('active') && currentImages.length > 1) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevImage();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextImage();
            }
        }
    });
    
    // Navegación con gestos táctiles (básico)
    let touchStartX = 0;
    let touchEndX = 0;
    
    modal.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    modal.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const difference = touchStartX - touchEndX;
        
        if (Math.abs(difference) > swipeThreshold && currentImages.length > 1) {
            if (difference > 0) {
                nextImage(); // Swipe left = next image
            } else {
                prevImage(); // Swipe right = previous image
            }
        }
    }
}

// ================================
// DETECCIÓN DE TIPO DE PROYECTO PARA IMÁGENES
// ================================

function detectProjectType(projectId) {
    const project = projectsData[projectId];
    const card = document.querySelector(`[data-project="${projectId}"]`);
    
    if (project && card) {
        const category = card.getAttribute('data-category');
        
        // Aplicar estilos específicos según el tipo
        if (category === 'mobile') {
            // Aplicar estilos especiales para móviles en el modal también
            const modalGallery = document.querySelector('.modal-gallery');
            modalGallery.classList.add('mobile-project');
        } else {
            const modalGallery = document.querySelector('.modal-gallery');
            modalGallery.classList.remove('mobile-project');
        }
    }
}

function openProjectModal(projectId) {
    const modal = document.getElementById('projectModal');
    const project = projectsData[projectId];
    
    if (!project) {
        console.error('Proyecto no encontrado:', projectId);
        return;
    }
    
    currentProject = projectId;
    currentImages = project.images;
    currentImageIndex = 0;
    
    // Detectar tipo de proyecto
    detectProjectType(projectId);
    
    // Actualizar contenido del modal
    updateModalContent(project);
    
    // Mostrar modal con animación
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Enfocar el modal para navegación con teclado
    modal.focus();
    
    // Precargar todas las imágenes del proyecto
    preloadProjectImages(project.images);
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Reset
    currentProject = null;
    currentImages = [];
    currentImageIndex = 0;
}

function updateModalContent(project) {
    // Título
    document.getElementById('modalTitle').textContent = project.title;
    
    // Descripción
    document.getElementById('modalDescription').textContent = project.description;
    
    // Propósito
    document.getElementById('modalPurpose').textContent = project.purpose;
    
    // Enlaces existentes
    const liveLink = document.getElementById('projectLiveLink');
    const githubLink = document.getElementById('projectGithubLink');
    
    // Nuevos enlaces de tiendas
    const playStoreLink = document.getElementById('projectPlayStoreLink');
    const appStoreLink = document.getElementById('projectAppStoreLink');
    
    // Manejar enlace en vivo
    if (project.liveUrl) {
        liveLink.href = project.liveUrl;
        liveLink.style.display = 'flex';
    } else {
        liveLink.style.display = 'none';
    }
    
    // Manejar enlace de GitHub
    if (project.githubUrl) {
        githubLink.href = project.githubUrl;
        githubLink.style.display = 'flex';
    } else {
        githubLink.style.display = 'none';
    }
    
    // Manejar enlace de Play Store
    if (project.playStoreUrl) {
        playStoreLink.href = project.playStoreUrl;
        playStoreLink.style.display = 'flex';
    } else {
        playStoreLink.style.display = 'none';
    }
    
    // Manejar enlace de App Store
    if (project.appStoreUrl) {
        appStoreLink.href = project.appStoreUrl;
        appStoreLink.style.display = 'flex';
    } else {
        appStoreLink.style.display = 'none';
    }
    
    // Tecnologías
    const techContainer = document.getElementById('modalTechTags');
    techContainer.innerHTML = '';
    project.technologies.forEach(tech => {
        const tag = document.createElement('span');
        tag.className = 'tech-tag';
        tag.textContent = tech;
        techContainer.appendChild(tag);
    });
    
    // Características
    const featuresList = document.getElementById('modalFeatures');
    featuresList.innerHTML = '';
    project.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });
    
    // Galería
    updateGallery();
}
// ================================
// GALERÍA DE IMÁGENES - ACTUALIZADA CON INDICADORES
// ================================

function updateGallery() {
    const mainImage = document.getElementById('modalMainImage');
    const indicatorsContainer = document.getElementById('galleryIndicators');
    
    // Imagen principal
    mainImage.src = currentImages[currentImageIndex];
    mainImage.alt = `${currentProject} - Imagen ${currentImageIndex + 1}`;
    
    // Crear indicadores de puntos
    indicatorsContainer.innerHTML = '';
    
    // Solo mostrar indicadores si hay más de una imagen
    if (currentImages.length > 1) {
        currentImages.forEach((image, index) => {
            const dot = document.createElement('div');
            dot.className = `gallery-dot ${index === currentImageIndex ? 'active' : ''}`;
            dot.onclick = () => selectImage(index);
            dot.setAttribute('aria-label', `Ir a imagen ${index + 1}`);
            indicatorsContainer.appendChild(dot);
        });
    }
    
    // Mostrar/ocultar botones de navegación
    const prevBtn = document.querySelector('.nav-btn.prev');
    const nextBtn = document.querySelector('.nav-btn.next');
    
    if (currentImages.length <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
    }
}

function selectImage(index) {
    if (index >= 0 && index < currentImages.length) {
        currentImageIndex = index;
        
        // Actualizar imagen principal con animación
        const mainImage = document.getElementById('modalMainImage');
        mainImage.style.opacity = '0.7';
        mainImage.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            mainImage.src = currentImages[currentImageIndex];
            updateIndicators();
            
            // Restaurar animación
            mainImage.style.opacity = '1';
            mainImage.style.transform = 'scale(1)';
        }, 200);
    }
}

function updateIndicators() {
    const dots = document.querySelectorAll('.gallery-dot');
    dots.forEach((dot, index) => {
        if (index === currentImageIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function prevImage() {
    const newIndex = currentImageIndex - 1;
    const targetIndex = newIndex < 0 ? currentImages.length - 1 : newIndex;
    selectImage(targetIndex);
}

function nextImage() {
    const newIndex = currentImageIndex + 1;
    const targetIndex = newIndex >= currentImages.length ? 0 : newIndex;
    selectImage(targetIndex);
}

// ================================
// ANIMACIONES Y EFECTOS - MEJORADOS
// ================================

// Animación de entrada de las tarjetas mejorada
function animateProjectCards() {
    const cards = document.querySelectorAll('.project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150); // Reducido el delay para mejor experiencia
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(card);
    });
}

// Efecto de hover mejorado
function enhanceHoverEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Efecto más sutil para mantener el diseño
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = 'var(--shadow-large)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// ================================
// FUNCIÓN PARA PRECARGAR IMÁGENES
// ================================

function preloadProjectImages(images) {
    images.forEach(imageSrc => {
        const img = new Image();
        img.src = imageSrc;
    });
}

// ================================
// UTILIDADES
// ================================

// Función para lazy loading de imágenes
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Función para precargar imágenes del modal
function preloadModalImages(projectId) {
    const project = projectsData[projectId];
    if (project && project.images) {
        project.images.forEach(imageSrc => {
            const img = new Image();
            img.src = imageSrc;
        });
    }
}

// ================================
// INICIALIZACIÓN
// ================================

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Pequeño delay para que las animaciones CSS se establezcan
    setTimeout(() => {
        animateProjectCards();
        enhanceHoverEffects();
        lazyLoadImages();
    }, 100);
    
    // Precargar imágenes de los primeros proyectos
    Object.keys(projectsData).slice(0, 2).forEach(projectId => {
        preloadModalImages(projectId);
    });
});

// Nueva apartado

    // Carrusel de testimonios
        let currentTestimonial = 0;
        const testimonials = document.querySelectorAll('.testimonial-card');
        const dots = document.querySelectorAll('.dot');

        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.classList.toggle('active', i === index);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }

        function prevTestimonial() {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentTestimonial);
        }

        function currentTestimonialFunc(index) {
            currentTestimonial = index;
            showTestimonial(currentTestimonial);
        }

        // Formulario de contacto
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí puedes agregar la lógica para enviar el formulario
            // Por ejemplo, usando EmailJS o un backend
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            console.log('Datos del formulario:', data);
            
            // Mostrar mensaje de éxito
            alert('¡Mensaje enviado correctamente! Te responderé pronto.');
            
            // Limpiar formulario
            this.reset();
        });

        // Botón volver arriba
        function scrollToTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }

        // Mostrar/ocultar botón volver arriba
        window.addEventListener('scroll', function() {
            const backToTopBtn = document.querySelector('.back-to-top');
            if (window.pageYOffset > 300) {
                backToTopBtn.style.opacity = '1';
                backToTopBtn.style.visibility = 'visible';
            } else {
                backToTopBtn.style.opacity = '0';
                backToTopBtn.style.visibility = 'hidden';
            }
        });

        // Animaciones de entrada
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observar elementos para animaciones
        document.querySelectorAll('.service-card, .testimonial-card, .blog-card, .contact-form, .contact-info').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });


// Contribucciones

function openNequiModal() {
    document.getElementById('nequiModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeNequiModal() {
    document.getElementById('nequiModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

function copyPhone() {
    const phoneNumber = '3214554594';
    navigator.clipboard.writeText(phoneNumber).then(() => {
        const btn = document.querySelector('.btn-copy');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>Copiado!';
        btn.style.background = 'var(--color-primary)';
        btn.style.color = 'var(--color-bg-primary)';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.style.color = '';
        }, 2000);
    });
}

// Cerrar modal con Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeNequiModal();
    }
});