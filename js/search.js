/**
 * Search functionality for tintinweb portfolio
 */
(function() {
    'use strict';
    
    // DOM elements
    const searchBar = document.getElementById('search-bar');
    const searchResults = document.getElementById('search-results');
    const navbar = document.getElementById('navbar');
    
    // Search configuration
    const MIN_SEARCH_LENGTH = 2;
    const MAX_RESULTS = 8;
    
    // Store all searchable content
    let searchableContent = [];
    
    /**
     * Initialize search functionality
     */
    function initializeSearch() {
        if (!searchBar) return;
        
        // Collect all searchable content when DOM is loaded
        collectSearchableContent();
        
        // Event listeners
        searchBar.addEventListener('input', handleSearchInput);
        searchBar.addEventListener('focus', () => {
            if (searchBar.value.length >= MIN_SEARCH_LENGTH) {
                showResults(searchBar.value);
            }
        });
        
        document.addEventListener('click', (e) => {
            if (e.target !== searchBar && !searchResults.contains(e.target)) {
                hideResults();
            }
        });
        
        // Handle keyboard navigation for search results
        searchBar.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                hideResults();
                return;
            }
            
            if (!searchResults.classList.contains('active')) {
                return;
            }
            
            const activeItem = searchResults.querySelector('.search-result-item.active');
            const items = searchResults.querySelectorAll('.search-result-item');
            
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (!activeItem) {
                    items[0]?.classList.add('active');
                } else {
                    const currentIndex = Array.from(items).indexOf(activeItem);
                    activeItem.classList.remove('active');
                    const nextIndex = (currentIndex + 1) % items.length;
                    items[nextIndex].classList.add('active');
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (!activeItem) {
                    items[items.length - 1]?.classList.add('active');
                } else {
                    const currentIndex = Array.from(items).indexOf(activeItem);
                    activeItem.classList.remove('active');
                    const prevIndex = (currentIndex - 1 + items.length) % items.length;
                    items[prevIndex].classList.add('active');
                }
            } else if (e.key === 'Enter' && activeItem) {
                e.preventDefault();
                activeItem.click();
            }
        });
    }
    
    /**
     * Handle search input events
     */
    function handleSearchInput() {
        const query = searchBar.value.trim();
        
        if (query.length >= MIN_SEARCH_LENGTH) {
            showResults(query);
        } else {
            hideResults();
        }
    }
    
    /**
     * Collect all searchable content from the page
     */
    function collectSearchableContent() {
        // Reset the array
        searchableContent = [];
        
        // Get all headings (h1, h2, h3)
        const headings = document.querySelectorAll('h1, h2, h3, h4');
        headings.forEach(heading => {
            if (heading.textContent.trim()) {
                searchableContent.push({
                    element: heading,
                    text: heading.textContent.trim(),
                    type: 'heading',
                    id: heading.id || generateIdFromElement(heading)
                });
                
                // If heading doesn't have an ID, add one
                if (!heading.id) {
                    heading.id = generateIdFromElement(heading);
                }
            }
        });
        
        // Get all paragraphs
        const paragraphs = document.querySelectorAll('main p');
        paragraphs.forEach(paragraph => {
            if (paragraph.textContent.trim() && paragraph.textContent.length > 20) {
                searchableContent.push({
                    element: paragraph,
                    text: paragraph.textContent.trim(),
                    type: 'paragraph',
                    id: paragraph.id || generateIdFromElement(paragraph)
                });
                
                // If paragraph doesn't have an ID, add one
                if (!paragraph.id) {
                    paragraph.id = generateIdFromElement(paragraph);
                }
            }
        });
        
        // Get all section titles
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles.forEach(title => {
            if (title.textContent.trim()) {
                searchableContent.push({
                    element: title,
                    text: title.textContent.trim(),
                    type: 'section',
                    id: title.id || generateIdFromElement(title)
                });
                
                // If title doesn't have an ID, add one
                if (!title.id) {
                    title.id = generateIdFromElement(title);
                }
            }
        });
    }
    
    /**
     * Generate a unique ID for an element based on its content
     */
    function generateIdFromElement(element) {
        const text = element.textContent.trim();
        const id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
        
        // Add the ID to the element
        element.id = id;
        return id;
    }
    
    /**
     * Search for matching content
     */
    function search(query) {
        query = query.toLowerCase();
        const results = [];
        
        for (const item of searchableContent) {
            if (item.text.toLowerCase().includes(query)) {
                results.push({
                    ...item,
                    matchPosition: item.text.toLowerCase().indexOf(query),
                    matchLength: query.length
                });
                
                if (results.length >= MAX_RESULTS) {
                    break;
                }
            }
        }
        
        // Sort results by relevance (headings first, then by match position)
        return results.sort((a, b) => {
            // Headings come before paragraphs
            if (a.type === 'heading' && b.type !== 'heading') return -1;
            if (a.type !== 'heading' && b.type === 'heading') return 1;
            
            // Sort by match position (earlier matches first)
            return a.matchPosition - b.matchPosition;
        });
    }
    
    /**
     * Show search results
     */
    function showResults(query) {
        const results = search(query);
        searchResults.innerHTML = '';
        
        if (results.length === 0) {
            const noResultsItem = document.createElement('div');
            noResultsItem.className = 'search-result-item';
            noResultsItem.innerHTML = '<div class="search-result-title">No results found</div>';
            searchResults.appendChild(noResultsItem);
        } else {
            results.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.dataset.id = result.id;
                
                // Create context with highlighted match
                const beforeMatch = result.text.substring(0, result.matchPosition);
                const match = result.text.substring(result.matchPosition, result.matchPosition + result.matchLength);
                const afterMatch = result.text.substring(result.matchPosition + result.matchLength);
                
                let titleContent;
                let contextContent;
                
                // Format based on type
                if (result.type === 'heading' || result.type === 'section') {
                    titleContent = `${beforeMatch}<span class="search-highlight">${match}</span>${afterMatch}`;
                    contextContent = getContextForElement(result.element);
                } else {
                    titleContent = (result.element.closest('section') && result.element.closest('section').querySelector('h2, h3, h4')) 
                        ? result.element.closest('section').querySelector('h2, h3, h4').textContent
                        : 'Content';
                    contextContent = `...${beforeMatch}<span class="search-highlight">${match}</span>${afterMatch.substring(0, 50)}...`;
                }
                
                resultItem.innerHTML = `
                    <div class="search-result-title">${titleContent}</div>
                    <div class="search-result-context">${contextContent}</div>
                `;
                
                resultItem.addEventListener('click', () => {
                    scrollToElement(result.id);
                    hideResults();
                });
                
                searchResults.appendChild(resultItem);
            });
        }
        
        searchResults.classList.add('active');
    }
    
    /**
     * Get context for an element (e.g., nearby content)
     */
    function getContextForElement(element) {
        // If it's a heading, get the first paragraph after it if possible
        if (element.tagName.match(/^H[1-6]$/)) {
            const nextParagraph = element.nextElementSibling;
            if (nextParagraph && nextParagraph.tagName === 'P') {
                const text = nextParagraph.textContent.trim();
                return text.length > 60 ? text.substring(0, 60) + '...' : text;
            }
        }
        
        // Default: empty context
        return '';
    }
    
    /**
     * Hide search results
     */
    function hideResults() {
        searchResults.classList.remove('active');
    }
    
    /**
     * Scroll to an element with smooth animation
     */
    function scrollToElement(id) {
        const element = document.getElementById(id);
        if (!element) return;
        
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Highlight the element temporarily
        element.classList.add('search-target-highlight');
        setTimeout(() => {
            element.classList.remove('search-target-highlight');
        }, 2000);
    }
    
    // Initialize search when DOM is loaded
    document.addEventListener('DOMContentLoaded', initializeSearch);
    
    // Recollect content when the page has fully loaded
    window.addEventListener('load', collectSearchableContent);
    
    // Handle mobile search
    function handleMobileSearch() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (!hamburger) return;
        
        hamburger.addEventListener('click', () => {
            navbar.classList.toggle('navbar-with-search');
        });
    }
    
    // Initialize mobile search handling
    document.addEventListener('DOMContentLoaded', handleMobileSearch);
    
})();
