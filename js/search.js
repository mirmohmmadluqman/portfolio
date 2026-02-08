/**
 * Search functionality for portfolio blog
 */
(function () {
    'use strict';

    // DOM elements
    const searchBar = document.querySelector('input[type="text"]');
    if (!searchBar) return;

    // Create results container
    const searchResults = document.createElement('div');
    searchResults.className = 'absolute top-full left-0 right-0 mt-2 bg-black border border-gray-800 rounded-md shadow-2xl z-50 max-h-96 overflow-y-auto hidden';
    searchBar.parentElement.style.position = 'relative';
    searchBar.parentElement.appendChild(searchResults);

    // Search configuration
    const MIN_SEARCH_LENGTH = 2;
    const MAX_RESULTS = 5;

    // Store all searchable content
    let searchableContent = [];

    /**
     * Initialize search functionality
     */
    function initializeSearch() {
        // Collect all searchable content
        collectSearchableContent();

        // Event listeners
        searchBar.addEventListener('input', handleSearchInput);
        searchBar.addEventListener('focus', () => {
            if (searchBar.value.length >= MIN_SEARCH_LENGTH) {
                showResults(searchBar.value);
            }
        });

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (!searchBar.contains(e.target) && !searchResults.contains(e.target)) {
                hideResults();
            }
        });

        // Add keyboard navigation
        searchBar.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') hideResults();
            if (e.key === 'Enter' && searchResults.querySelector('.search-result-item')) {
                searchResults.querySelector('.search-result-item').click();
            }
        });
    }

    function collectSearchableContent() {
        searchableContent = [];

        // Scan articles and sections
        document.querySelectorAll('article, section').forEach(container => {
            // Get headings
            container.querySelectorAll('h1, h2, h3, h4').forEach(heading => {
                if (heading.textContent.trim()) {
                    searchableContent.push({
                        element: heading,
                        text: heading.textContent.trim(),
                        type: 'heading',
                        link: '#' + (heading.id || generateId(heading))
                    });
                }
            });

            // Get paragraphs (limit length)
            container.querySelectorAll('p').forEach(p => {
                if (p.textContent.trim().length > 20) {
                    searchableContent.push({
                        element: p,
                        text: p.textContent.trim(),
                        type: 'content',
                        link: '#' + (p.parentElement.id || generateId(p.parentElement))
                    });
                }
            });
        });
    }

    function generateId(element) {
        if (!element) return 'content-' + Math.random().toString(36).substr(2, 9);
        const id = element.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        element.id = id;
        return id;
    }

    function handleSearchInput() {
        const query = searchBar.value.trim();

        if (query.length >= MIN_SEARCH_LENGTH) {
            const results = search(query);
            renderResults(results, query);
        } else {
            hideResults();
        }
    }

    function search(query) {
        query = query.toLowerCase();
        return searchableContent
            .filter(item => item.text.toLowerCase().includes(query))
            .slice(0, MAX_RESULTS);
    }

    function renderResults(results, query) {
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="p-4 text-gray-500 font-mono text-sm">No modules found matching query.</div>';
        } else {
            searchResults.innerHTML = results.map(result => {
                // Highlight match
                const regex = new RegExp(`(${query})`, 'gi');
                const highlightedText = result.text.replace(regex, '<span class="text-[#00ff88] bg-[#00ff88]/10">$1</span>');

                return `
                    <div class="search-result-item p-3 hover:bg-white/5 cursor-pointer border-b border-gray-800 last:border-0 transition-colors" data-link="${result.link}">
                        <div class="flex items-center gap-2 mb-1">
                            <span class="text-xs font-mono text-gray-500 uppercase">${result.type}</span>
                            <span class="text-[#00ff88] text-xs">→</span>
                        </div>
                        <div class="text-gray-300 text-sm font-mono truncate">${highlightedText}</div>
                    </div>
                `;
            }).join('');

            // Add click handlers
            searchResults.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => {
                    const link = item.getAttribute('data-link');
                    const target = document.querySelector(link);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        // Flash effect
                        target.classList.add('ring-2', 'ring-[#00ff88]');
                        setTimeout(() => target.classList.remove('ring-2', 'ring-[#00ff88]'), 2000);
                    }
                    hideResults();
                });
            });
        }

        searchResults.classList.remove('hidden');
    }

    function showResults() {
        if (searchResults.innerHTML) searchResults.classList.remove('hidden');
    }

    function hideResults() {
        searchResults.classList.add('hidden');
    }

    // Initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeSearch);
    } else {
        initializeSearch();
    }

})();
