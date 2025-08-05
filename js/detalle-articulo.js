        // Función para obtener parámetros de la URL
        function getUrlParameter(name) {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get(name);
        }

        // Función para formatear la fecha
        function formatDate(dateString) {
            return dateString; // Ya viene formateada desde los datos
        }

        // Función para crear el HTML del artículo
        function createArticleHTML(article) {
            return `
                <header class="article-header">
                    <div class="article-meta">
                        <span class="article-category">${article.category}</span>
                        <span class="article-date">${article.date}</span>
                        <span class="article-read-time">
                            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10"/>
                                <polyline points="12,6 12,12 16,14"/>
                            </svg>
                            ${article.readTime}
                        </span>
                    </div>
                    
                    <h1 class="article-title">${article.title}</h1>
                    
                    <div class="article-tags">
                        ${article.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                    
                    <div class="article-author">
                        Por: ${article.author}
                    </div>
                </header>

                <div class="article-image">
                    <img src="${article.image}" alt="${article.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                    <div class="article-image-placeholder">
                        <svg width="64" height="64" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                        </svg>
                    </div>
                </div>

                <div class="article-body">
                    ${article.content}
                </div>
            `;
        }

        // Función para crear las referencias
        function createReferencesHTML(references) {
            return references.map(ref => `
                <li class="reference-item">
                    <a href="${ref.url}" target="_blank" rel="noopener noreferrer" class="reference-link">
                        ${ref.title}
                    </a>
                    <p class="reference-description">${ref.description}</p>
                </li>
            `).join('');
        }

        // Función para crear la navegación entre artículos
        function createNavigationHTML(currentArticleId) {
            const allArticles = getAllArticles();
            const currentIndex = allArticles.findIndex(article => article.id === currentArticleId);
            
            const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
            const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;
            
            let navHTML = '<div class="article-nav-links">';
            
            if (prevArticle) {
                navHTML += `
                    <a href="detalle-articulo.html?id=${prevArticle.id}" class="nav-link prev-article">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                        </svg>
                        <div class="nav-text">
                            <span class="nav-label">Anterior</span>
                            <span class="nav-title">${prevArticle.title}</span>
                        </div>
                    </a>
                `;
            }
            
            if (nextArticle) {
                navHTML += `
                    <a href="detalle-articulo.html?id=${nextArticle.id}" class="nav-link next-article">
                        <div class="nav-text">
                            <span class="nav-label">Siguiente</span>
                            <span class="nav-title">${nextArticle.title}</span>
                        </div>
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                        </svg>
                    </a>
                `;
            }
            
            navHTML += '</div>';
            return navHTML;
        }

        // Función principal para cargar el artículo
        function loadArticle() {
            const articleId = getUrlParameter('id');
            const articleContentDiv = document.getElementById('articleContent');
            const referencesSection = document.getElementById('referencesSection');
            const referencesList = document.getElementById('referencesList');
            const articleNavigation = document.getElementById('articleNavigation');
            const pageTitle = document.getElementById('pageTitle');
            
            if (!articleId) {
                articleContentDiv.innerHTML = `
                    <div class="error">
                        <h2>Artículo no encontrado</h2>
                        <p>No se especificó un ID de artículo válido.</p>
                        <a href="../index.html">Volver al inicio</a>
                    </div>
                `;
                return;
            }
            
            const article = getArticleById(articleId);
            
            if (!article) {
                articleContentDiv.innerHTML = `
                    <div class="error">
                        <h2>Artículo no encontrado</h2>
                        <p>El artículo solicitado no existe.</p>
                        <a href="../index.html">Volver al inicio</a>
                    </div>
                `;
                return;
            }
            
            // Actualizar el título de la página
            pageTitle.textContent = article.title;
            
            // Cargar el contenido del artículo
            articleContentDiv.innerHTML = createArticleHTML(article);
            
            // Cargar las referencias si existen
            if (article.references && article.references.length > 0) {
                referencesList.innerHTML = createReferencesHTML(article.references);
                referencesSection.style.display = 'block';
            }
            
            // Cargar la navegación entre artículos
            articleNavigation.innerHTML = createNavigationHTML(articleId);
        }

        // Cargar el artículo cuando el DOM esté listo
        document.addEventListener('DOMContentLoaded', loadArticle);