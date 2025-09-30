// Enhanced JavaScript features for tintinweb portfolio
(function() {
    'use strict';

    // Enhanced features initialization
    document.addEventListener('DOMContentLoaded', function() {
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
        const loadingScreen = document.getElementById('loading-screen');
        const loadingProgress = document.getElementById('loading-progress');
        
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
        const loadingText = loadingScreen.querySelector('.loading-text');

        function updateLoading() {
            if (currentStep < loadingSteps.length) {
                const step = loadingSteps[currentStep];
                loadingText.textContent = step.text;
                loadingProgress.style.width = step.progress + '%';
                currentStep++;
                
                setTimeout(updateLoading, 500);
            } else {
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                    document.body.classList.add('loaded');
                    // Trigger celebration effect
                    createCelebrationParticles();
                }, 500);
            }
        }

        updateLoading();
    }

    // Scroll progress indicator
    function initializeScrollProgress() {
        const scrollProgressBar = document.getElementById('scroll-progress-bar');
        if (!scrollProgressBar) return;

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
            
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = '100%';
            particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
            particle.style.animationDelay = Math.random() * 2 + 's';
            
            particleContainer.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 6000);
        }

        // Create particles periodically
        setInterval(createParticle, 2000);
    }

    function createScrollParticles() {
        const hero = document.querySelector('.hero');
        if (!hero) return;

        for (let i = 0; i < 3; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.position = 'absolute';
                particle.style.width = '6px';
                particle.style.height = '6px';
                particle.style.background = 'var(--primary-color)';
                particle.style.borderRadius = '50%';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = '50%';
                particle.style.zIndex = '1';
                particle.style.animation = 'particle-burst 1s ease-out forwards';
                
                hero.appendChild(particle);
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 1000);
            }, i * 100);
        }
    }

    function createCelebrationParticles() {
        const colors = ['var(--primary-color)', 'var(--accent-color)', 'var(--secondary-color)'];
        
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.style.position = 'fixed';
                particle.style.width = '8px';
                particle.style.height = '8px';
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];
                particle.style.borderRadius = '50%';
                particle.style.left = '50%';
                particle.style.top = '50%';
                particle.style.zIndex = '9999';
                particle.style.pointerEvents = 'none';
                
                const angle = (Math.PI * 2 * i) / 20;
                const velocity = 200 + Math.random() * 100;
                const vx = Math.cos(angle) * velocity;
                const vy = Math.sin(angle) * velocity;
                
                particle.style.animation = `celebration-particle 2s ease-out forwards`;
                particle.style.setProperty('--vx', vx + 'px');
                particle.style.setProperty('--vy', vy + 'px');
                
                document.body.appendChild(particle);
                
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }, 2000);
            }, i * 50);
        }
    }

    // Code copy functionality
    function initializeCodeCopyButtons() {
        const codeBlocks = document.querySelectorAll('pre code, .editor-content code');
        
        codeBlocks.forEach(codeBlock => {
            const wrapper = codeBlock.closest('pre, .editor-content');
            if (!wrapper) return;
            
            // Create header if not exists
            let header = wrapper.previousElementSibling;
            if (!header || !header.classList.contains('code-header')) {
                header = document.createElement('div');
                header.className = 'code-header';
                
                const lang = document.createElement('span');
                lang.className = 'code-lang';
                lang.textContent = codeBlock.className.replace('language-', '') || 'code';
                
                const copyBtn = document.createElement('button');
                copyBtn.className = 'copy-btn';
                copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
                copyBtn.onclick = () => copyToClipboard(codeBlock.textContent, copyBtn);
                
                header.appendChild(lang);
                header.appendChild(copyBtn);
                wrapper.parentNode.insertBefore(header, wrapper);
            }
        });
    }

    // Add gutter icons for @audit comments
    function initializeAuditGutterIcons() {
        const codeBlocks = document.querySelectorAll('pre code');
        
        codeBlocks.forEach(codeBlock => {
            const preElement = codeBlock.closest('pre');
            if (!preElement) return;
            
            // Skip if gutter icons already added
            if (preElement.querySelector('.audit-gutter-icon')) return;
            
            const codeText = codeBlock.textContent;
            const codeLines = codeText.split('\n');
            
            // Get computed line height for accurate positioning
            const computedStyle = window.getComputedStyle(preElement);
            const lineHeight = parseFloat(computedStyle.lineHeight) || 24;
            
            codeLines.forEach((line, index) => {
                // Check for @audit patterns
                if (line.includes('@audit')) {
                    const gutterIcon = document.createElement('span');
                    gutterIcon.textContent = '🔺';
                    gutterIcon.className = 'audit-gutter-icon';
                    gutterIcon.style.top = `${(index + 1) * lineHeight}px`;
                    gutterIcon.title = `Audit finding on line ${index + 1}: ${line.trim()}`;
                    
                    preElement.appendChild(gutterIcon);
                }
            });
        });
    }

    function copyToClipboard(text, button) {
        navigator.clipboard.writeText(text).then(() => {
            const originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-check"></i> Copied!';
            button.style.background = 'var(--primary-color)';
            button.style.color = 'var(--background-dark)';
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = 'transparent';
                button.style.color = 'var(--primary-color)';
            }, 2000);
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            
            button.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(() => {
                button.innerHTML = '<i class="fas fa-copy"></i> Copy';
            }, 2000);
        });
    }

    // Achievement badges with tooltips
    function initializeAchievementBadges() {
        const achievements = [
            { icon: '🏆', text: 'Bug Hunter', tooltip: '50+ vulnerabilities disclosed' },
            { icon: '🛠️', text: 'Tool Builder', tooltip: '25+ security tools created' },
            { icon: '⭐', text: 'Star Collector', tooltip: '1600+ GitHub stars' },
            { icon: '🐼', text: 'Panda Trainer', tooltip: 'Uncertified but experienced' },
            { icon: '🍣', text: 'Sushi Master', tooltip: '9999+ sushi consumed' },
            { icon: '🥷', text: 'Cyber Ninja', tooltip: 'Stealthy security research' }
        ];

        const achievementContainer = document.createElement('div');
        achievementContainer.className = 'achievement-container';
        achievementContainer.style.position = 'fixed';
        achievementContainer.style.bottom = '20px';
        achievementContainer.style.right = '20px';
        achievementContainer.style.zIndex = '1000';
        achievementContainer.style.display = 'flex';
        achievementContainer.style.flexDirection = 'column';
        achievementContainer.style.gap = '8px';

        achievements.forEach((achievement, index) => {
            setTimeout(() => {
                const badge = document.createElement('div');
                badge.className = 'achievement-badge hover-glow';
                badge.innerHTML = `
                    <span class="achievement-icon">${achievement.icon}</span>
                    <span>${achievement.text}</span>
                `;
                badge.title = achievement.tooltip;
                badge.style.opacity = '0';
                badge.style.transform = 'translateX(100px)';
                badge.style.transition = 'all 0.5s ease';
                
                achievementContainer.appendChild(badge);
                
                // Animate in
                setTimeout(() => {
                    badge.style.opacity = '1';
                    badge.style.transform = 'translateX(0)';
                }, 100);
                
                // Auto-hide after delay
                setTimeout(() => {
                    badge.style.opacity = '0';
                    badge.style.transform = 'translateX(100px)';
                    setTimeout(() => {
                        if (badge.parentNode) {
                            badge.parentNode.removeChild(badge);
                        }
                    }, 500);
                }, 5000);
                
            }, index * 1000);
        });

        document.body.appendChild(achievementContainer);

        // Clean up container when empty
        setTimeout(() => {
            if (achievementContainer.children.length === 0 && achievementContainer.parentNode) {
                achievementContainer.parentNode.removeChild(achievementContainer);
            }
        }, 12000);
    }

    // Enhanced animations and interactions
    function initializeEnhancedAnimations() {
        // Add hover effects to pandas
        document.querySelectorAll('.floating-panda, .panda-zen, .panda-logo').forEach(panda => {
            panda.addEventListener('mouseenter', () => {
                panda.style.filter = 'drop-shadow(0 0 20px var(--primary-color)) hue-rotate(45deg)';
                panda.style.transform = 'scale(1.1) rotate(5deg)';
            });
            
            panda.addEventListener('mouseleave', () => {
                panda.style.filter = '';
                panda.style.transform = '';
            });
        });

        // Enhanced terminal window effects
        const terminalModal = document.getElementById('terminal-modal');
        if (terminalModal) {
            terminalModal.addEventListener('click', (e) => {
                if (e.target === terminalModal) {
                    terminalModal.classList.add('closing');
                    setTimeout(() => {
                        terminalModal.style.display = 'none';
                        terminalModal.classList.remove('closing');
                    }, 300);
                }
            });
        }

        // Add typing sound effect simulation
        document.addEventListener('keydown', (e) => {
            if (document.getElementById('terminal-modal').style.display === 'flex') {
                // Visual feedback for typing in terminal
                const cursor = document.querySelector('.cursor');
                if (cursor) {
                    cursor.style.background = 'var(--accent-color)';
                    setTimeout(() => {
                        cursor.style.background = 'var(--terminal-green)';
                    }, 100);
                }
            }
        });
    }

    // Accessibility enhancements
    function initializeAccessibilityFeatures() {
        // Add skip navigation link
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.position = 'absolute';
        skipLink.style.top = '-40px';
        skipLink.style.left = '6px';
        skipLink.style.background = 'var(--primary-color)';
        skipLink.style.color = 'var(--background-dark)';
        skipLink.style.padding = '8px';
        skipLink.style.zIndex = '10000';
        skipLink.style.textDecoration = 'none';
        skipLink.style.borderRadius = '4px';
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);

        // Add aria labels to interactive elements
        document.querySelectorAll('.nav-link').forEach(link => {
            if (!link.getAttribute('aria-label')) {
                link.setAttribute('aria-label', `Navigate to ${link.textContent} section`);
            }
        });

        // Add role attributes
        const navbar = document.querySelector('.navbar');
        if (navbar) navbar.setAttribute('role', 'navigation');
        
        const main = document.querySelector('main');
        if (main) {
            main.setAttribute('role', 'main');
            main.id = 'main';
        }
        
        const footer = document.querySelector('.footer');
        if (footer) footer.setAttribute('role', 'contentinfo');

        // Add live region for dynamic content
        const liveRegion = document.createElement('div');
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        liveRegion.className = 'sr-only';
        liveRegion.id = 'live-region';
        document.body.appendChild(liveRegion);

        // Announce section changes
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionName = entry.target.id || 'section';
                    liveRegion.textContent = `Now viewing ${sectionName} section`;
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('section[id]').forEach(section => {
            observer.observe(section);
        });
    }

    // Add dynamic CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particle-burst {
            0% { transform: translate(0, 0) scale(1); opacity: 1; }
            100% { transform: translate(var(--dx, 50px), var(--dy, -50px)) scale(0); opacity: 0; }
        }
        
        @keyframes celebration-particle {
            0% { transform: translate(0, 0) scale(1); opacity: 1; }
            100% { transform: translate(var(--vx), var(--vy)) scale(0); opacity: 0; }
        }
        
        .terminal-modal.closing {
            animation: terminal-hide 0.3s ease-out forwards;
        }
        
        @keyframes terminal-hide {
            from { opacity: 1; transform: scale(1); }
            to { opacity: 0; transform: scale(0.9); }
        }
        
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
        
        .loaded .fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .loaded .fade-in-left {
            animation: fadeInLeft 0.8s ease-out forwards;
        }
        
        .loaded .fade-in-right {
            animation: fadeInRight 0.8s ease-out forwards;
        }
    `;
    document.head.appendChild(style);

})();
