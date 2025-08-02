// Variables globales
let allArticles = [];
let filteredArticles = [];
let currentCategory = 'all';
let currentSearchTerm = '';
let currentSort = 'date-desc';

// Variables para paginación
const ARTICLES_PER_PAGE = 15;
let currentPage = 1;
let totalPages = 0;

// Función para obtener todas las categorías únicas
function getUniqueCategories() {
    const categories = [...new Set(allArticles.map(article => article.category))];
    return categories.sort();
}

// Función para crear el HTML de un artículo
function createArticleHTML(article) {
    const featuredClass = article.featured ? 'article-card featured' : 'article-card';
    const featuredBadge = article.featured ? '<div class="featured-badge">Destacado</div>' : '';
    
    return `
        <article class="${featuredClass}" data-article-id="${article.id}" data-category="${article.category.toLowerCase()}">
            ${featuredBadge}
            <div class="article-image">
                <img src="${article.image}" alt="${article.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                <div class="article-image-placeholder">
                    <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                    </svg>
                </div>
            </div>
            <div class="article-content">
                <div class="article-meta">
                    <span class="article-category">${article.category}</span>
                    <span class="article-date">${article.date}</span>
                </div>
                <h3 class="article-title">${article.title}</h3>
                <p class="article-excerpt">${article.excerpt}</p>
                <div class="article-tags">
                    ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="article-footer">
                    <div class="read-time">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <circle cx="12" cy="12" r="10"/>
                            <polyline points="12,6 12,12 16,14"/>
                        </svg>
                        ${article.readTime}
                    </div>
                    <a href="detalle-articulo.html?id=${article.id}" class="read-more">
                        Leer más
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                        </svg>
                    </a>
                </div>
            </div>
        </article>
    `;
}

// Función para crear botones de categoría
function createCategoryButtons() {
    const categoryButtonsContainer = document.getElementById('categoryButtons');
    const categories = getUniqueCategories();
    
    categoryButtonsContainer.innerHTML = categories.map(category => {
        const count = allArticles.filter(article => article.category === category).length;
        return `
            <button class="filter-btn" data-category="${category.toLowerCase()}">
                ${category}
                <span class="count">${count}</span>
            </button>
        `;
    }).join('');
}

// Función para ordenar artículos
function sortArticles(articles, sortType) {
    const sortedArticles = [...articles];
    
    switch(sortType) {
        case 'date-desc':
            return sortedArticles.sort((a, b) => new Date(parseDate(b.date)) - new Date(parseDate(a.date)));
        case 'date-asc':
            return sortedArticles.sort((a, b) => new Date(parseDate(a.date)) - new Date(parseDate(b.date)));
        case 'title-asc':
            return sortedArticles.sort((a, b) => a.title.localeCompare(b.title));
        case 'title-desc':
            return sortedArticles.sort((a, b) => b.title.localeCompare(a.title));
        case 'category':
            return sortedArticles.sort((a, b) => a.category.localeCompare(b.category));
        default:
            return sortedArticles;
    }
}

// Función para parsear fecha en formato "DD Mes YYYY"
function parseDate(dateString) {
    const months = {
        'Enero': '01', 'Febrero': '02', 'Marzo': '03', 'Abril': '04',
        'Mayo': '05', 'Junio': '06', 'Julio': '07', 'Agosto': '08',
        'Septiembre': '09', 'Octubre': '10', 'Noviembre': '11', 'Diciembre': '12'
    };
    
    const parts = dateString.split(' ');
    const day = parts[0];
    const month = months[parts[1]];
    const year = parts[2];
    
    return `${year}-${month}-${day.padStart(2, '0')}`;
}

// Función para calcular páginas
function calculatePagination() {
    totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
    
    // Asegurar que currentPage esté en rango válido
    if (currentPage > totalPages) {
        currentPage = Math.max(1, totalPages);
    }
}

// Función para obtener artículos de la página actual
function getCurrentPageArticles() {
    const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
    const endIndex = startIndex + ARTICLES_PER_PAGE;
    return filteredArticles.slice(startIndex, endIndex);
}

// Función para crear botones de paginación
function createPaginationButtons() {
    const pagination = document.getElementById('pagination');
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let buttonsHTML = '';
    
    // Botón anterior
    buttonsHTML += `
        <button class="pagination-btn nav-btn prev-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="goToPage(${currentPage - 1})">
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
            </svg>
            Ant
        </button>
    `;
    
    // Lógica para mostrar números de página
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);
    
    // Ajustar si estamos cerca del inicio
    if (currentPage <= 3) {
        endPage = Math.min(5, totalPages);
    }
    
    // Ajustar si estamos cerca del final
    if (currentPage > totalPages - 3) {
        startPage = Math.max(1, totalPages - 4);
    }
    
    // Primera página si no está en rango
    if (startPage > 1) {
        buttonsHTML += `<button class="pagination-btn" onclick="goToPage(1)">1</button>`;
        if (startPage > 2) {
            buttonsHTML += '<span class="pagination-dots">...</span>';
        }
    }
    
    // Páginas del rango
    for (let i = startPage; i <= endPage; i++) {
        const activeClass = i === currentPage ? 'active' : '';
        buttonsHTML += `
            <button class="pagination-btn ${activeClass}" onclick="goToPage(${i})">${i}</button>
        `;
    }
    
    // Última página si no está en rango
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            buttonsHTML += '<span class="pagination-dots">...</span>';
        }
        buttonsHTML += `<button class="pagination-btn" onclick="goToPage(${totalPages})">${totalPages}</button>`;
    }
    
    // Botón siguiente
    buttonsHTML += `
        <button class="pagination-btn nav-btn next-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="goToPage(${currentPage + 1})">
            Sig
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
        </button>
    `;
    
    pagination.innerHTML = buttonsHTML;
}

// Función para ir a una página específica
function goToPage(page) {
    if (page < 1 || page > totalPages || page === currentPage) return;
    
    currentPage = page;
    updateDisplay();
    scrollToTop();
}

// Función para scroll suave al inicio
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Función para actualizar información de rango
function updatePaginationInfo() {
    const currentRange = document.getElementById('currentRange');
    const totalCount = document.getElementById('totalCount');
    const paginationSection = document.getElementById('paginationSection');
    
    if (filteredArticles.length === 0) {
        paginationSection.style.display = 'none';
        return;
    }
    
    if (filteredArticles.length <= ARTICLES_PER_PAGE) {
        paginationSection.style.display = 'none';
        return;
    }
    
    paginationSection.style.display = 'flex';
    
    const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE + 1;
    const endIndex = Math.min(currentPage * ARTICLES_PER_PAGE, filteredArticles.length);
    
    currentRange.textContent = `${startIndex}-${endIndex}`;
    totalCount.textContent = filteredArticles.length;
}

// Función para filtrar artículos
function filterArticles() {
    let filtered = allArticles;
    
    // Filtrar por categoría
    if (currentCategory !== 'all') {
        filtered = filtered.filter(article => 
            article.category.toLowerCase() === currentCategory.toLowerCase()
        );
    }
    
    // Filtrar por término de búsqueda
    if (currentSearchTerm) {
        filtered = filtered.filter(article =>
            article.title.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
            article.excerpt.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
            article.tags.some(tag => tag.toLowerCase().includes(currentSearchTerm.toLowerCase()))
        );
    }
    
    // Ordenar
    filtered = sortArticles(filtered, currentSort);
    
    filteredArticles = filtered;
    currentPage = 1; // Resetear a página 1 cuando se filtran
    calculatePagination();
    updateDisplay();
}

// Función para actualizar la visualización
function updateDisplay() {
    const articlesGrid = document.getElementById('articlesGrid');
    const noResults = document.getElementById('noResults');
    const visibleArticlesCount = document.getElementById('visibleArticles');
    
    // Agregar clase de animación
    articlesGrid.classList.add('page-changing');
    
    setTimeout(() => {
        const currentPageArticles = getCurrentPageArticles();
        visibleArticlesCount.textContent = currentPageArticles.length;
        
        if (filteredArticles.length === 0) {
            articlesGrid.style.display = 'none';
            noResults.style.display = 'block';
            document.getElementById('paginationSection').style.display = 'none';
        } else {
            articlesGrid.style.display = 'grid';
            noResults.style.display = 'none';
            articlesGrid.innerHTML = currentPageArticles.map(article => createArticleHTML(article)).join('');
            
            // Agregar event listeners para los clicks
            addArticleClickListeners();
            
            // Actualizar paginación
            createPaginationButtons();
            updatePaginationInfo();
        }
        
        // Remover clase de animación
        articlesGrid.classList.remove('page-changing');
    }, 100);
}

// Función para agregar event listeners a los artículos
function addArticleClickListeners() {
    const articleCards = document.querySelectorAll('.article-card');
    articleCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('.read-more')) {
                const articleId = this.dataset.articleId;
                window.location.href = `detalle-articulo.html?id=${articleId}`;
            }
        });
    });
}

// Función para actualizar estadísticas
function updateStats() {
    document.getElementById('totalArticles').textContent = allArticles.length;
    document.getElementById('countAll').textContent = allArticles.length;
}

// Función para limpiar todos los filtros
function clearAllFilters() {
    currentCategory = 'all';
    currentSearchTerm = '';
    currentSort = 'date-desc';
    currentPage = 1;
    
    document.getElementById('searchInput').value = '';
    document.getElementById('sortSelect').value = 'date-desc';
    
    // Actualizar botones de categoría
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector('[data-category="all"]').classList.add('active');
    
    filterArticles();
}

// Función para configurar event listeners
function setupEventListeners() {
    // Búsqueda
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function() {
        currentSearchTerm = this.value.trim();
        filterArticles();
    });
    
    // Filtros de categoría
    document.addEventListener('click', function(e) {
        if (e.target.matches('.filter-btn') || e.target.closest('.filter-btn')) {
            const button = e.target.matches('.filter-btn') ? e.target : e.target.closest('.filter-btn');
            const category = button.dataset.category;
            
            // Remover clase activa de todos los botones
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Agregar clase activa al botón clickeado
            button.classList.add('active');
            
            currentCategory = category;
            filterArticles();
        }
    });
    
    // Ordenamiento
    const sortSelect = document.getElementById('sortSelect');
    sortSelect.addEventListener('change', function() {
        currentSort = this.value;
        filterArticles();
    });
}

// Función principal para inicializar la página
function initializeArticlesPage() {
    // Cargar todos los artículos
    allArticles = getAllArticles();
    filteredArticles = [...allArticles];
    
    // Crear botones de categoría
    createCategoryButtons();
    
    // Actualizar estadísticas
    updateStats();
    
    // Configurar event listeners
    setupEventListeners();
    
    // Mostrar artículos iniciales (ordenados por fecha descendente)
    filterArticles();
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initializeArticlesPage);