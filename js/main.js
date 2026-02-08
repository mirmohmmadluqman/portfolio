/**
 * Main application logic for tintinweb portfolio
 */
document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');

            // Animate hamburger icon
            const icon = mobileMenuBtn.querySelector('iconify-icon');
            icon.setAttribute('icon', isExpanded ? 'lucide:menu' : 'lucide:x');
        });
    }

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    mobileMenuBtn.querySelector('iconify-icon').setAttribute('icon', 'lucide:menu');
                }

                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update URL hash without scroll jump
                history.pushState(null, null, targetId);
            }
        });
    });

    // Active Link Highlighting on Scroll
    const observerOptions = {
        threshold: 0.2, // Trigger when 20% of section is visible
        rootMargin: "-10% 0px -50% 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                // Remove active class from all links
                document.querySelectorAll('.nav-item').forEach(link => {
                    link.classList.remove('active');
                    link.setAttribute('aria-current', 'false');
                });

                // Add active class to current section link
                const activeLink = document.querySelector(`.nav-item[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                    activeLink.setAttribute('aria-current', 'page');
                }
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section[id]').forEach(section => {
        observer.observe(section);
    });

    // Typewriter Effect for Hero Section
    const typewriterElement = document.getElementById('typewriter-text');
    if (typewriterElement) {
        const phrases = [
            'Analyzing Smart Contracts...',
            'Building Secure dApps...',
            'Auditing DeFi Protocols...',
            'Exploring Zero Knowledge Proofs...'
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50; // Faster deletion
            } else {
                typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100; // Normal typing speed
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at end of phrase
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500; // Small pause before next phrase
            }

            setTimeout(type, typeSpeed);
        }

        // Start typing loop
        setTimeout(type, 1000);
    }

    // Terminal Command History Simulation (Easter egg)
    const terminalInput = document.querySelector('.terminal-input');
    if (terminalInput) {
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = terminalInput.value.trim();
                // Add simple logic for "clear", "help", etc. could go here
                terminalInput.value = ''; // Clear input
            }
        });
    }

});
