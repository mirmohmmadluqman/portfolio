// Enhanced JavaScript features for tintinweb portfolio
(function () {
    'use strict';

    // Enhanced features initialization
    document.addEventListener('DOMContentLoaded', function () {
        initializeLoadingScreen();
        initializeScrollProgress();
        initializeParticleEffects();
        initializeCodeCopyButtons();
        initializeAuditGutterIcons();
        initializeAchievementBadges();
        initializeEnhancedAnimations();
        initializeAccessibilityFeatures();
    });

    // Loading screen with progress simulation
    function initializeLoadingScreen() {
        // Check if we are on the main page (index.html or root)
        const path = window.location.pathname;
        const isMainPage = path.endsWith('index.html') || path.endsWith('/') || path.endsWith('portfolio/'); // flexible for local/gh-pages

        // precise check for main page + only once per lifetime
        if (!isMainPage || localStorage.getItem('hasSeenLoadingScreen') === 'true') {
            return;
        }

        // Create loading screen if not already present
        if (!document.getElementById('loading-screen')) {
            const loadingScreen = document.createElement('div');
            loadingScreen.id = 'loading-screen';
            loadingScreen.innerHTML = `
                <div class="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center transition-opacity duration-500" id="loader">
                    <div class="font-mono text-[#00ff88] mb-4 text-xl font-bold animate-pulse">Running diagnostics...</div>
                    <div class="w-64 h-2 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
                        <div id="loading-progress" class="h-full bg-[#00ff88] w-0 transition-all duration-300"></div>
                    </div>
                    <div class="mt-2 font-mono text-xs text-gray-500 loading-text">Initializing system...</div>
                </div>
            `;
            document.body.appendChild(loadingScreen);
        }

        const loadingScreen = document.getElementById('loader');
        const loadingProgress = document.getElementById('loading-progress');
        const loadingText = document.querySelector('.loading-text');

        if (!loadingScreen || !loadingProgress) return;

        const loadingSteps = [
            { text: "Initializing Security Panda...", progress: 0 },
            { text: "Loading vulnerability database...", progress: 20 },
            { text: "Compiling smart contracts...", progress: 40 },
            { text: "Activating audit tools...", progress: 60 },
            { text: "Preparing sushi supply...", progress: 80 },
            { text: "Ready to break things! 🐼", progress: 100 }
        ];

        let currentStep = 0;

        function updateLoading() {
            if (currentStep < loadingSteps.length) {
                const step = loadingSteps[currentStep];
                if (loadingText) loadingText.textContent = step.text;
                loadingProgress.style.width = step.progress + '%';
                currentStep++;

                setTimeout(updateLoading, 200 + Math.random() * 300);
            } else {
                setTimeout(() => {
                    loadingScreen.style.opacity = '0';
                    loadingScreen.style.pointerEvents = 'none';
                    document.body.classList.add('loaded');

                    // Mark as seen in localStorage
                    localStorage.setItem('hasSeenLoadingScreen', 'true');

                    // Trigger celebration effect
                    createCelebrationParticles();

                    // Remove from DOM after transition
                    setTimeout(() => {
                        loadingScreen.parentElement.remove();
                    }, 500);
                }, 500);
            }
        }

        updateLoading();
    }

    // Scroll progress indicator
    function initializeScrollProgress() {
        // Create progress bar if missing
        if (!document.getElementById('scroll-progress-bar')) {
            const progressBar = document.createElement('div');
            progressBar.id = 'scroll-progress-bar';
            progressBar.className = 'fixed top-0 left-0 h-1 bg-[#00ff88] z-[100] transition-all duration-100';
            progressBar.style.width = '0%';
            document.body.appendChild(progressBar);
        }

        const scrollProgressBar = document.getElementById('scroll-progress-bar');

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;

            scrollProgressBar.style.width = Math.min(scrollPercent, 100) + '%';
        });
    }

    // Particle effects system
    function initializeParticleEffects() {
        createFloatingParticles();

        // Add particles on scroll
        let particleTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(particleTimeout);
            particleTimeout = setTimeout(() => {
                createScrollParticles();
            }, 100);
        });
    }

    function createFloatingParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particle-container';
        particleContainer.style.position = 'fixed';
        particleContainer.style.top = '0';
        particleContainer.style.left = '0';
        particleContainer.style.width = '100%';
        particleContainer.style.height = '100%';
        particleContainer.style.pointerEvents = 'none';
        particleContainer.style.zIndex = '-1';
        document.body.appendChild(particleContainer);

        function createParticle() {
            const particle = document.createElement('div');
            particle.className = 'particle';

            const size = Math.random() * 3 + 1;
            particle.style.position = 'absolute';
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.background = 'rgba(0, 255, 136, 0.2)';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = '100%';
            particle.style.transition = `top ${(Math.random() * 5 + 5)}s linear, opacity 1s ease`;

            particleContainer.appendChild(particle);

            // Animate
            requestAnimationFrame(() => {
                particle.style.top = '-10px';
                particle.style.opacity = '0';
            });

            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 10000);
        }

        // Create particles periodically
        setInterval(createParticle, 800);
    }

    function createScrollParticles() {
        // Only run occasionally to save performance
        if (Math.random() > 0.3) return;

        const scrollY = window.scrollY;
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '4px';
        particle.style.height = '4px';
        particle.style.background = '#00ff88';
        particle.style.borderRadius = '50%';
        particle.style.right = '4px';
        particle.style.top = (scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100) + '%';
        particle.style.zIndex = '90';
        particle.style.opacity = '0.7';
        particle.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';

        document.body.appendChild(particle);

        requestAnimationFrame(() => {
            particle.style.transform = 'translateX(-20px) scale(0)';
            particle.style.opacity = '0';
        });

        setTimeout(() => {
            if (particle.parentNode) particle.remove();
        }, 500);
    }

    function createCelebrationParticles() {
        const colors = ['#00ff88', '#22d3ee', '#c084fc'];

        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.position = 'fixed';
                particle.style.width = '6px';
                particle.style.height = '6px';
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                particle.style.borderRadius = '50%';
                particle.style.left = '50%';
                particle.style.top = '50%';
                particle.style.zIndex = '9999';
                particle.style.pointerEvents = 'none';

                const angle = Math.random() * Math.PI * 2;
                const velocity = 100 + Math.random() * 200;
                const tx = Math.cos(angle) * velocity;
                const ty = Math.sin(angle) * velocity;

                particle.style.transition = 'transform 1s cubic-bezier(0,0,0.2,1), opacity 1s ease-in';

                document.body.appendChild(particle);

                requestAnimationFrame(() => {
                    particle.style.transform = `translate(${tx}px, ${ty}px)`;
                    particle.style.opacity = '0';
                });

                setTimeout(() => {
                    if (particle.parentNode) particle.remove();
                }, 1000);
            }, i * 30);
        }
    }

    // Code copy functionality
    function initializeCodeCopyButtons() {
        const codeBlocks = document.querySelectorAll('pre code, .editor-content code');

        codeBlocks.forEach(codeBlock => {
            const wrapper = codeBlock.closest('pre') || codeBlock.parentElement;
            if (!wrapper) return;

            // Check if button already exists
            if (wrapper.querySelector('.copy-btn')) return;

            // Make wrapper relative for positioning
            if (getComputedStyle(wrapper).position === 'static') {
                wrapper.style.position = 'relative';
            }

            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn absolute top-2 right-2 text-xs font-mono bg-gray-800 text-gray-300 border border-gray-700 rounded px-2 py-1 opacity-0 transition-opacity hover:bg-gray-700 hover:text-white group-hover:opacity-100';
            copyBtn.innerHTML = '<iconify-icon icon="lucide:copy"></iconify-icon> Copy';

            // Show button on hover
            wrapper.addEventListener('mouseenter', () => {
                copyBtn.style.opacity = '1';
            });
            wrapper.addEventListener('mouseleave', () => {
                copyBtn.style.opacity = '0';
            });

            copyBtn.onclick = () => copyToClipboard(codeBlock.textContent, copyBtn);

            wrapper.appendChild(copyBtn);
        });
    }

    // Add gutter icons for @audit comments
    function initializeAuditGutterIcons() {
        const codeBlocks = document.querySelectorAll('pre code');

        codeBlocks.forEach(codeBlock => {
            const preElement = codeBlock.closest('pre');
            if (!preElement) return;

            const codeText = codeBlock.textContent;
            if (!codeText.includes('@audit')) return;

            // Simple visual indicator for blocks containing audits
            const indicator = document.createElement('div');
            indicator.className = 'absolute top-0 right-0 w-2 h-full bg-red-500/20 border-l border-red-500/50 pointer-events-none';
            preElement.appendChild(indicator);

            const badge = document.createElement('div');
            badge.className = 'absolute top-2 right-12 bg-red-900/80 text-red-200 text-[10px] font-mono px-2 py-0.5 rounded border border-red-700/50';
            badge.textContent = 'AUDIT FINDINGS';
            preElement.appendChild(badge);
        });
    }

    function copyToClipboard(text, button) {
        navigator.clipboard.writeText(text).then(() => {
            const originalHTML = button.innerHTML;
            button.innerHTML = '<iconify-icon icon="lucide:check"></iconify-icon> Copied!';
            button.classList.add('text-[#00ff88]', 'border-[#00ff88]');

            setTimeout(() => {
                button.innerHTML = originalHTML;
                button.classList.remove('text-[#00ff88]', 'border-[#00ff88]');
            }, 2000);
        }).catch(() => {
            console.error('Failed to copy text');
        });
    }

    // Achievement badges with tooltips
    function initializeAchievementBadges() {
        const achievements = [
            { icon: '🏆', text: 'Bug Hunter', tooltip: '50+ vulnerabilities disclosed', delay: 1000 },
            { icon: '🛠️', text: 'Tool Builder', tooltip: '25+ security tools created', delay: 2000 },
            { icon: '⭐', text: 'Star Collector', tooltip: '1600+ GitHub stars', delay: 3000 },
            { icon: '🐼', text: 'Panda Trainer', tooltip: 'Uncertified but experienced', delay: 4000 }
        ];

        const achievementContainer = document.createElement('div');
        achievementContainer.className = 'achievement-container fixed bottom-20 right-6 flex flex-col gap-2 pointer-events-none z-50';
        document.body.appendChild(achievementContainer);

        achievements.forEach((achievement) => {
            setTimeout(() => {
                const badge = document.createElement('div');
                badge.className = 'bg-black/80 border border-[#00ff88]/30 backdrop-blur-md px-3 py-2 rounded-lg flex items-center gap-2 transform translate-x-full transition-all duration-500 hover:scale-105 hover:border-[#00ff88] pointer-events-auto';
                badge.innerHTML = `
                    <span class="text-xl">${achievement.icon}</span>
                    <span class="font-mono text-xs text-white hidden md:inline">${achievement.text}</span>
                `;
                badge.title = achievement.tooltip;

                achievementContainer.appendChild(badge);

                // Animate in
                requestAnimationFrame(() => {
                    badge.classList.remove('translate-x-full');
                });

                // Auto-hide after delay
                setTimeout(() => {
                    badge.classList.add('translate-x-full', 'opacity-0');
                    setTimeout(() => {
                        if (badge.parentNode) badge.remove();
                    }, 500);
                }, 5000);

            }, achievement.delay);
        });
    }

    // Enhanced animations and interactions
    function initializeEnhancedAnimations() {
        // Add hover effects to cards
        document.querySelectorAll('.project-card, article').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    // Accessibility enhancements
    function initializeAccessibilityFeatures() {
        // Add skip navigation link
        if (!document.querySelector('.skip-link')) {
            const skipLink = document.createElement('a');
            skipLink.href = '#main';
            skipLink.textContent = 'Skip to main content';
            skipLink.className = 'skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#00ff88] focus:text-black focus:px-4 focus:py-2 focus:font-bold focus:rounded';
            document.body.insertBefore(skipLink, document.body.firstChild);
        }

        // Add aria labels to interactive elements if missing
        document.querySelectorAll('a, button').forEach(el => {
            if (!el.getAttribute('aria-label') && !el.textContent.trim()) {
                const icon = el.querySelector('iconify-icon');
                if (icon) {
                    el.setAttribute('aria-label', icon.getAttribute('icon').split(':')[1] || 'Link');
                }
            }
        });
    }

})();
