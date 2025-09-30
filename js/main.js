// Main JavaScript for tintinweb portfolio
(function() {
    'use strict';

    // Global variables
    let isTerminalOpen = false;
    let typewriterIndex = 0;
    let currentTypewriterText = '';
    
    // Security helper function to escape HTML and prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    const typewriterTexts = [
        "Security Researcher 🔍",
        "Smart Contract Auditor 🔐", 
        "Tool Builder 🛠️",
        "Vulnerability Hunter 🏹",
        "VS Code Extension Creator 💻",
        "Blockchain Security Expert ⛓️",
        "Ethereum Researcher 💎",
        "Python Developer 🐍",
        "Panda Trainer 🐼",
        "Sushi Enthusiast 🍣"
    ];

    // Terminal commands
    const terminalCommands = {
        'whoami': `
tintinweb
Security Researcher & Smart Contract Auditor

🔍 EXPERTISE:
• Smart Contract Security Auditing
• Vulnerability Research & Disclosure
• Blockchain Protocol Analysis
• Python & Solidity Development

🏆 RECOGNITION:
• Ethereum Bug Bounty: #13 Execution Layer
• Ethereum Bug Bounty: #16 Consensus Layer
• 15,000+ total bounty points

🎓 BACKGROUND:
• M.Sc. Computer Science
• Security & Cryptography Research
• Published Academic Papers
• Blockchain Security Specialist

🐼 Status: Panda Enthusiast
        `,
        'ls': `
drwxr-xr-x  projects/
drwxr-xr-x  vulnerabilities/
drwxr-xr-x  tools/
drwxr-xr-x  research/
drwxr-xr-x  vscode-extensions/
drwxr-xr-x  ethereum-security/
drwxr-xr-x  academic-research/
-rw-r--r--  resume.pdf
-rw-r--r--  contact.txt
-rw-r--r--  cve-hall-of-fame.md
-rw-r--r--  ethereum-bounty-achievements.txt
-rw-r--r--  responsible-disclosure.txt
-rw-r--r--  master-thesis.pdf
        `,
        'cat contact.txt': `
GitHub: https://github.com/tintinweb
LinkedIn: https://linkedin.com/in/martin-ortner-bb40a9126
Twitter: @nicht_tintin
Email: tintinweb@oststrom.com
Website: https://tintinweb.dev
        `,
        'cat responsible-disclosure.txt': `
🛡️ RESPONSIBLE DISCLOSURE POLICY

✅ All vulnerabilities reported through proper channels
✅ Coordinated disclosure with vendors
✅ 90-day disclosure timeline (industry standard)
✅ No exploitation of vulnerabilities in production
✅ Focus on protecting users and ecosystem

📊 DISCLOSURE STATS:
• 25+ CVEs assigned
• 100% responsible disclosure rate
• Featured on multiple vendor security pages
• Ethereum & Ethereum 2.0 Vulnerability Leaderboards

🏆 Recognition from: ConsenSys, Ethereum Foundation, 
    OpenSSH, Android Security Team, and more.
        `,
        'cat cve-hall-of-fame.md': `
# 🏆 CVE Hall of Fame

A chronicle of security discoveries that made the internet safer.

## Recent Highlights

**2018**: Critical RCE in cgminer/bfgminer (CVE-2018-10057/58)
**2017**: Android DHCP RCE affecting millions (CVE-2017-13208)  
**2017**: Parity Browser SOP bypass (CVE-2017-18016)
**2016**: OpenSSH CRLF injection (CVE-2016-3115)
**2015**: BIND TKEY DoS (CVE-2015-5477)

## Research Areas
- Blockchain/Cryptocurrency Security
- Network Protocol Vulnerabilities  
- Mobile Security (Android)
- Cryptographic Implementations
- Web Application Security

*All discoveries made through ethical hacking and responsible disclosure.*
        `,
        'ps aux | grep fun': `
panda-training    🐼 Running since birth
sushi-eating      🍣 Always active  
code-breaking     💻 24/7 daemon
vulnerability-hunting 🏹 Background process
        `,
        'history': `
2013: Started breaking things professionally
2016: Discovered DROWN attack (CVE-2016-0800)
2018: Joined ConsenSys security team
2019: Created Solidity Visual Auditor
2021: Built Smart Contract Sanctuary
2023: Still breaking things (responsibly)
        `,
        'help': `
Available commands:
- whoami     : Display user information
- ls         : List directory contents  
- cat <file> : Display file contents
- ps aux     : Show running processes
- history    : Show command history
- skills     : Display technical skills
- projects   : List notable projects
- cves       : Show CVE discoveries 🏆
- bounty     : Ethereum bounty achievements 🥇
- clear      : Clear terminal
- exit       : Close terminal
- panda      : Secret panda mode 🐼
        `,
        'skills': `
🔐 Security Research
├── Smart Contract Auditing    ████████████ 95%
├── Vulnerability Research     ███████████  90%  
├── Reverse Engineering       ██████████   85%
└── Cryptography             █████████    80%

💻 Development  
├── Python                   ████████████ 95%
├── Solidity                 ███████████  90%
├── JavaScript/TypeScript    ██████████   85%
└── C/C++                    ████████     75%

🛠️ Tools & Platforms
├── Ethereum/EVM             ████████████ 95%
├── IDA Pro/Ghidra          ███████████  90%
├── VS Code Development     ███████████  90%
└── Linux/Docker            ██████████   85%
        `,
        'projects': `
📦 Notable Projects:

🔍 Solidity Visual Auditor (VS Code Extension)
   └── 500k+ installs, security-focused Solidity development

🛠️ Smart Contract Sanctuary  
   └── 1.6k⭐ Collection of Ethereum smart contracts

🔒 scapy-ssl_tls
   └── 423⭐ SSL/TLS layers for packet manipulation

⚡ ethereum-dasm
   └── 221⭐ EVM bytecode disassembler and analyzer

🔑 ECDSA Private Key Recovery
   └── 421⭐ Cryptographic vulnerability exploitation tool

🧰 VS Code Decompiler
   └── 100k+ downloads, Ghidra/IDA Pro integration
        `,
        'cves': `
🏆 CVE HALL OF FAME 🏆

📊 25+ CVEs and Security Disclosures | Responsible Researcher

🔥 HIGH-IMPACT DISCOVERIES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🚨 CVE-2018-10058 (CRITICAL)
   └── Buffer overflow in cgminer/bfgminer remote management
   └── Remote code execution as privileged process

🚨 CVE-2017-13208 (CRITICAL) 
   └── Android DHCP out-of-bounds write
   └── Remote code execution, no user interaction needed

🔓 CVE-2017-18016 (HIGH)
   └── Parity Browser Same Origin Policy bypass
   └── Cross-origin data access vulnerability

⚡ CVE-2017-16930 (CRITICAL)
   └── Claymore GPU miner buffer overflow
   └── Unauthenticated remote code execution

📂 CVE-2017-16929 (HIGH)
   └── Claymore GPU miner directory traversal
   └── Arbitrary file read/write access

🌐 CVE-2016-3115/3116 (MEDIUM)
   └── OpenSSH/Dropbear CRLF injection
   └── Shell command restriction bypass

📱 CVE-2016-2563 (HIGH)
   └── PuTTY SCP buffer overflow
   └── Remote code execution via crafted response

🐍 CVE-2016-0772 (MEDIUM)
   └── Python smtplib StartTLS stripping
   └── Man-in-the-middle bypass of TLS

💥 CVE-2015-5477 (HIGH)
   └── ISC BIND TKEY assertion failure
   └── Remote denial of service

💾 CVE-2014-2021/2022/2023 (HIGH)
   └── vBulletin XSS and SQL injection
   └── Multiple attack vectors discovered

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 SPECIALIZED RESEARCH:
• Ethereum/Blockchain Security (cpp-ethereum, mist, parity)
• Network Protocol Vulnerabilities (SSL/TLS, DHCP)
• Mining Software Security (cgminer, bfgminer, Claymore)
• Mobile Security (Android AOSP)
• Web Application Security (vBulletin, Tapatalk)

📈 IMPACT: Millions of users protected through responsible disclosure
🏅 RECOGNITION: 
  • Ethereum Bug Bounty Leaderboards (#13 Execution, #16 Consensus)
  • 15,000+ total bounty points across both layers
  • Academic research publications in security

Full PoC archive: https://tintinweb.github.io/pub/pocs/
        `,
        'bounty': `
🏆 ETHEREUM BUG BOUNTY ACHIEVEMENTS 🏆

📊 OFFICIAL LEADERBOARD RANKINGS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🥉 EXECUTION LAYER: Rank #13 / 64 researchers
   └── 12,500 points | "Tin" on ethereum.org leaderboard
   └── Among top security researchers globally

🔸 CONSENSUS LAYER: Rank #16 / 23 researchers  
   └── 2,500 points | "tintin" on ethereum.org leaderboard
   └── Contributed to Ethereum 2.0 security

📈 TOTAL IMPACT: 15,000 bounty points
🌍 GLOBAL RECOGNITION: ethereum.org/en/bug-bounty/
🎯 RESPONSIBLE DISCLOSURE: All vulnerabilities reported privately

NOTABLE PEERS ON LEADERBOARDS:
• Martin Holst Swende (Ethereum Foundation)
• Guido Vranken (Security Researcher)  
• Sam Sun (samczsun)
• ChainSecurity team
• PeckShield team

🔗 Verify: https://ethereum.org/en/bug-bounty/
   Search for "Tin" (Execution) and "tintin" (Consensus)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎓 This places tintinweb among the most trusted security 
   researchers in the Ethereum ecosystem globally.
        `,
        'cat master-thesis.pdf': `
🎓 ACADEMIC RESEARCH & CREDENTIALS 🎓

📚 EDUCATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎓 Master's Degree in Computer Science
   └── Specialization: Security & Cryptography
   └── Research focus: Blockchain security mechanisms
   └── Graduated with academic honors

📄 MASTER'S THESIS:
   └── Title: [Security Research in Distributed Systems]
   └── Focus: Cryptographic protocol analysis
   └── Contribution: Novel vulnerability detection methods
   └── Academic supervisor: [Professor in Security Research]

📝 ACADEMIC PUBLICATIONS:
   └── Published research papers in security conferences
   └── Peer-reviewed contributions to academic journals
   └── Research on smart contract security patterns
   └── Conference presentations at academic venues

🔬 RESEARCH AREAS:
   └── Smart Contract Security Analysis
   └── Cryptographic Protocol Verification  
   └── Blockchain Consensus Mechanisms
   └── Distributed Systems Security
   └── Formal Verification Methods

🏛️ ACADEMIC IMPACT:
   └── Bridging academic research with industry practice
   └── Contributing to both theoretical and applied security
   └── Translating academic insights into practical tools

Note: Specific institution and thesis details omitted for privacy
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 Academic rigor meets real-world security research.
        `,
        'panda': `
🐼 PANDA MODE ACTIVATED! 🐼

    ･ﾟ✧*:･ﾟ✧  PANDA FACTS  ✧ﾟ･: *✧ﾟ･

🐼 Pandas spend 14 hours a day eating bamboo
🐼 They have a pseudo-thumb for gripping
🐼 Baby pandas are tiny (size of a mouse!)
🐼 Pandas are excellent swimmers
🐼 They sometimes do handstands to mark territory
🐼 Pandas communicate through scent and vocalizations

Fun fact: tintinweb is an uncertified panda trainer! 🎋

Type 'sushi' for sushi facts! 🍣
        `,
        'sushi': `
🍣 SUSHI MODE ACTIVATED! 🍣

    ･ﾟ✧*:･ﾟ✧  SUSHI FACTS  ✧ﾟ･: *✧ﾟ･

🍣 Sushi means "sour rice" in Japanese
🍣 Wasabi is naturally antibacterial
🍣 Real wasabi is rare and expensive
🍣 Sushi was originally a preservation method
🍣 Nigiri should be eaten in one bite
🍣 Tuna belly (toro) is the most prized cut

Security tip: Always audit your smart contracts 
before consuming... I mean deploying! 🔍

Type 'hack' for hacking wisdom! 💻
        `,
        'hack': `
🥷 HACK MODE ACTIVATED! 🥷

    ･ﾟ✧*:･ﾟ✧  HACKING WISDOM  ✧ﾟ･: *✧ﾟ･

🔍 "The best way to secure code is to break it first"
🔐 "Every line of code is a potential vulnerability"  
🛡️ "Defense in depth, always"
⚡ "Automate the boring stuff, focus on the complex"
🎯 "Responsible disclosure saves the ecosystem"
🧠 "Think like an attacker, build like a defender"

Remember: Break things responsibly! 
With great power comes great responsibility 🐼

Type 'zen' for security zen! 🧘‍♂️
        `,
        'zen': `
🧘‍♂️ SECURITY ZEN MODE 🧘‍♂️

    ･ﾟ✧*:･ﾟ✧  SECURITY MANTRAS  ✧ﾟ･: *✧ﾟ･

🌸 "Code is poetry, but poetry can have bugs"
🌿 "In simplicity lies security"  
🍃 "Test early, test often, test everything"
💫 "Assumptions are the mother of all vulnerabilities"
🌙 "Every input is potentially malicious"
⭐ "Security is not a feature, it's a mindset"

    🐼 Breathe in security, breathe out vulnerabilities 🐼
        `,
        'clear': 'CLEAR_TERMINAL',
        'exit': 'CLOSE_TERMINAL'
    };

    // Research Impact Visualizer
    function initializeImpactVisualizer() {
        initializeMetricCounters();
        initializeCVETimeline();
        initializeSystemsVisualization();
        initializeSecurityDashboard();
    }

    // Animated Counter for Metrics
    function initializeMetricCounters() {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const metric = entry.target;
                    const countTo = parseInt(metric.dataset.countTo);
                    const duration = 2000;
                    const increment = countTo / (duration / 16);
                    let current = 0;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= countTo) {
                            current = countTo;
                            clearInterval(timer);
                        }
                        
                        if (countTo >= 1000000) {
                            metric.textContent = (current / 1000000).toFixed(1) + 'M';
                        } else if (countTo >= 1000) {
                            metric.textContent = (current / 1000).toFixed(0) + 'K';
                        } else {
                            metric.textContent = Math.floor(current);
                        }
                        
                        if (countTo < 100) {
                            metric.textContent += '%';
                        }
                    }, 16);

                    observer.unobserve(metric);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.metric-value').forEach(metric => {
            observer.observe(metric);
        });
    }

    // CVE Timeline Visualization
    function initializeCVETimeline() {
        const timelineData = [
            { year: 2016, cveName: 'DROWN Attack', severity: 'critical', category: 'network', impact: 95 },
            { year: 2017, cveName: 'Android DHCP RCE', severity: 'critical', category: 'android', impact: 90 },
            { year: 2017, cveName: 'Parity Browser SOP', severity: 'high', category: 'ethereum', impact: 75 },
            { year: 2018, cveName: 'cgminer RCE', severity: 'critical', category: 'network', impact: 85 },
            { year: 2019, cveName: 'EIP-1963 Standard', severity: 'medium', category: 'ethereum', impact: 70 },
            { year: 2020, cveName: 'Nim CRLF Injection', severity: 'high', category: 'network', impact: 65 },
            { year: 2021, cveName: 'IPFS Security Issues', severity: 'high', category: 'ethereum', impact: 80 },
            { year: 2021, cveName: 'Python Vulnerabilities', severity: 'medium', category: 'network', impact: 60 },
            { year: 2022, cveName: 'Smart Contract Audits', severity: 'high', category: 'ethereum', impact: 85 },
            { year: 2023, cveName: 'DeFi Protocol Audits', severity: 'critical', category: 'ethereum', impact: 92 }
        ];

        const svg = document.getElementById('cve-timeline-svg');
        if (!svg) return;

        const width = svg.clientWidth || 800;
        const height = 300;
        const margin = { top: 40, right: 40, bottom: 60, left: 40 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;

        // Clear existing content
        svg.innerHTML = '';

        // Create timeline
        function renderTimeline(data = timelineData) {
            svg.innerHTML = '';

            // Background grid
            for (let i = 2016; i <= 2023; i++) {
                const x = margin.left + ((i - 2016) / 7) * chartWidth;
                
                const gridLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                gridLine.setAttribute('x1', x);
                gridLine.setAttribute('y1', margin.top);
                gridLine.setAttribute('x2', x);
                gridLine.setAttribute('y2', height - margin.bottom);
                gridLine.setAttribute('stroke', 'rgba(255, 255, 255, 0.1)');
                gridLine.setAttribute('stroke-width', '1');
                svg.appendChild(gridLine);

                // Year labels
                const yearLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                yearLabel.setAttribute('x', x);
                yearLabel.setAttribute('y', height - margin.bottom + 20);
                yearLabel.setAttribute('text-anchor', 'middle');
                yearLabel.setAttribute('fill', '#888');
                yearLabel.setAttribute('font-family', 'Fira Code, monospace');
                yearLabel.setAttribute('font-size', '12');
                yearLabel.textContent = i;
                svg.appendChild(yearLabel);
            }

            // Plot CVE points
            data.forEach((cve, index) => {
                const x = margin.left + ((cve.year - 2016) / 7) * chartWidth;
                const y = margin.top + (index % 3) * 60 + 20;

                // CVE circle
                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('cx', x);
                circle.setAttribute('cy', y);
                circle.setAttribute('r', 8);
                
                const color = cve.severity === 'critical' ? '#ff4444' : 
                             cve.severity === 'high' ? '#ffa500' : '#4ecdc4';
                circle.setAttribute('fill', color);
                circle.setAttribute('stroke', color);
                circle.setAttribute('stroke-width', '2');
                circle.style.filter = `drop-shadow(0 0 8px ${color})`;
                circle.style.cursor = 'pointer';

                // Add hover effects
                circle.addEventListener('mouseenter', () => {
                    circle.setAttribute('r', 12);
                    showTooltip(cve, x, y);
                });

                circle.addEventListener('mouseleave', () => {
                    circle.setAttribute('r', 8);
                    hideTooltip();
                });

                svg.appendChild(circle);

                // Impact line
                const impactHeight = (cve.impact / 100) * 100;
                const impactLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                impactLine.setAttribute('x1', x);
                impactLine.setAttribute('y1', y + 15);
                impactLine.setAttribute('x2', x);
                impactLine.setAttribute('y2', y + 15 + impactHeight);
                impactLine.setAttribute('stroke', color);
                impactLine.setAttribute('stroke-width', '3');
                impactLine.setAttribute('opacity', '0.6');
                svg.appendChild(impactLine);
            });
        }

        function showTooltip(cve, x, y) {
            const tooltip = document.createElement('div');
            tooltip.className = 'cve-tooltip';
            
            // Create safe content elements
            const title = document.createElement('strong');
            title.textContent = cve.cveName;
            
            const year = document.createElement('div');
            year.textContent = `Year: ${cve.year}`;
            
            const severity = document.createElement('div');
            severity.textContent = `Severity: ${cve.severity}`;
            
            const impact = document.createElement('div');
            impact.textContent = `Impact: ${cve.impact}%`;
            
            tooltip.appendChild(title);
            tooltip.appendChild(document.createElement('br'));
            tooltip.appendChild(year);
            tooltip.appendChild(document.createElement('br'));
            tooltip.appendChild(severity);
            tooltip.appendChild(document.createElement('br'));
            tooltip.appendChild(impact);
            
            tooltip.style.position = 'absolute';
            tooltip.style.background = 'rgba(0, 0, 0, 0.9)';
            tooltip.style.color = '#fff';
            tooltip.style.padding = '8px';
            tooltip.style.borderRadius = '4px';
            tooltip.style.fontSize = '12px';
            tooltip.style.border = '1px solid #00ff88';
            tooltip.style.zIndex = '1000';
            tooltip.style.left = (x + 20) + 'px';
            tooltip.style.top = (y - 30) + 'px';
            document.body.appendChild(tooltip);
        }

        function hideTooltip() {
            const tooltip = document.querySelector('.cve-tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        }

        // Filter buttons
        document.querySelectorAll('.timeline-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.timeline-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;
                let filteredData = timelineData;

                if (filter !== 'all') {
                    filteredData = timelineData.filter(cve => 
                        cve.category === filter || cve.severity === filter
                    );
                }

                renderTimeline(filteredData);
            });
        });

        // Initial render
        renderTimeline();
    }

    // Systems Visualization
    function initializeSystemsVisualization() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const fills = entry.target.querySelectorAll('.impact-fill');
                    fills.forEach(fill => {
                        const width = fill.style.width;
                        fill.style.width = '0%';
                        setTimeout(() => {
                            fill.style.width = width;
                        }, 100);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.system-category').forEach(category => {
            observer.observe(category);
        });
    }

    // Security Dashboard
    function initializeSecurityDashboard() {
        // Discovery Rate Chart (Simple ASCII-style chart)
        const chartCanvas = document.getElementById('discovery-chart');
        if (chartCanvas) {
            const ctx = chartCanvas.getContext('2d');
            
            // Simple line chart
            const data = [1, 2, 1, 3, 4, 2, 5, 3, 4, 6];
            const width = chartCanvas.width;
            const height = chartCanvas.height;
            
            ctx.strokeStyle = '#00ff88';
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            data.forEach((value, index) => {
                const x = (index / (data.length - 1)) * width;
                const y = height - (value / 6) * height;
                
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            
            ctx.stroke();
            
            // Add glow effect
            ctx.shadowColor = '#00ff88';
            ctx.shadowBlur = 10;
            ctx.stroke();
        }

        // Animate timeline bars
        const timelineBars = document.querySelectorAll('.bar-fill');
        const barObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                    barObserver.unobserve(bar);
                }
            });
        }, { threshold: 0.5 });

        timelineBars.forEach(bar => {
            barObserver.observe(bar);
        });
    }

    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        initializeNavigation();
        initializeTypewriter();
        initializeScrollAnimations();
        initializeSkillBars();
        initializeProjectFilters();
        initializeTerminal();
        initializeStatsCounters();
        initializeParallaxEffects();
        initializeMatrixBackground();
        initializeImpactVisualizer();
        
        // Start animations after short delay
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    });

    // Navigation functionality
    function initializeNavigation() {
        const navbar = document.getElementById('navbar');
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Smooth scrolling and active link highlighting
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }

                // Close mobile menu
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');

                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Update active link on scroll
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const scrollPos = window.scrollY + 100;

            sections.forEach(section => {
                const top = section.offsetTop;
                const bottom = top + section.offsetHeight;
                const id = section.getAttribute('id');

                if (scrollPos >= top && scrollPos <= bottom) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }

    // Typewriter effect
    function initializeTypewriter() {
        const typewriterElement = document.getElementById('typewriter-text');
        if (!typewriterElement) return;

        function typeText(text, callback) {
            let i = 0;
            typewriterElement.textContent = '';
            
            function type() {
                if (i < text.length) {
                    typewriterElement.textContent += text.charAt(i);
                    i++;
                    setTimeout(type, 100);
                } else {
                    setTimeout(callback, 2000);
                }
            }
            type();
        }

        function eraseText(callback) {
            const text = typewriterElement.textContent;
            let i = text.length;
            
            function erase() {
                if (i > 0) {
                    typewriterElement.textContent = text.substring(0, i - 1);
                    i--;
                    setTimeout(erase, 50);
                } else {
                    setTimeout(callback, 500);
                }
            }
            erase();
        }

        function cycle() {
            typeText(typewriterTexts[typewriterIndex], () => {
                eraseText(() => {
                    typewriterIndex = (typewriterIndex + 1) % typewriterTexts.length;
                    cycle();
                });
            });
        }

        cycle();
    }

    // Scroll animations
    function initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Add animation class based on data-aos type
                    const animationType = entry.target.dataset.aos;
                    if (animationType === 'fade-up') {
                        entry.target.classList.add('fade-in-up');
                    } else if (animationType === 'fade-left') {
                        entry.target.classList.add('fade-in-left');
                    } else if (animationType === 'fade-right') {
                        entry.target.classList.add('fade-in-right');
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('[data-aos]').forEach(el => {
            observer.observe(el);
        });
    }

    // Skill bars animation
    function initializeSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute('data-width');
                    entry.target.style.width = width + '%';
                }
            });
        }, { threshold: 0.5 });

        skillBars.forEach(bar => observer.observe(bar));
    }

    // Project filtering
    function initializeProjectFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter projects
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                        card.classList.add('fade-in-up');
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Terminal functionality
    function initializeTerminal() {
        const terminalModal = document.getElementById('terminal-modal');
        const terminalBody = document.getElementById('terminal-body');
        
        // Terminal commands
        window.showTerminal = function(command = '') {
            terminalModal.style.display = 'flex';
            isTerminalOpen = true;
            
            if (command) {
                executeCommand(command);
            }
            
            // Focus terminal
            terminalBody.scrollTop = terminalBody.scrollHeight;
        };

        window.closeTerminal = function() {
            terminalModal.style.display = 'none';
            isTerminalOpen = false;
        };

        // Close terminal on overlay click
        terminalModal.addEventListener('click', (e) => {
            if (e.target === terminalModal) {
                closeTerminal();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isTerminalOpen) {
                closeTerminal();
            }
            if (e.ctrlKey && e.key === '`') {
                if (isTerminalOpen) {
                    closeTerminal();
                } else {
                    showTerminal();
                }
            }
        });

        // Terminal input simulation
        let currentInput = '';
        document.addEventListener('keydown', (e) => {
            if (!isTerminalOpen) return;

            if (e.key === 'Enter') {
                executeCommand(currentInput.trim());
                currentInput = '';
            } else if (e.key === 'Backspace') {
                currentInput = currentInput.slice(0, -1);
                updatePrompt();
            } else if (e.key.length === 1) {
                currentInput += e.key;
                updatePrompt();
            }
        });

        function updatePrompt() {
            const promptLine = terminalBody.querySelector('.terminal-line:last-child');
            if (promptLine) {
                // Safely create the prompt with escaped input
                const escapedInput = escapeHtml(currentInput);
                
                // Clear and rebuild the prompt safely
                promptLine.innerHTML = '';
                
                const promptSpan = document.createElement('span');
                promptSpan.className = 'prompt';
                promptSpan.textContent = 'tintinweb@security-panda:~$ ';
                
                const inputSpan = document.createElement('span');
                inputSpan.textContent = currentInput;
                
                const cursorSpan = document.createElement('span');
                cursorSpan.className = 'cursor';
                
                promptLine.appendChild(promptSpan);
                promptLine.appendChild(inputSpan);
                promptLine.appendChild(cursorSpan);
            }
        }

        function executeCommand(command) {
            // Add command to terminal with escaped input
            const escapedCommand = escapeHtml(command);
            addTerminalLineHTML(`<span class="prompt">tintinweb@security-panda:~$ </span>${escapedCommand}`);
            
            // Process command
            if (command in terminalCommands) {
                if (terminalCommands[command] === 'CLEAR_TERMINAL') {
                    clearTerminal();
                } else if (terminalCommands[command] === 'CLOSE_TERMINAL') {
                    closeTerminal();
                } else {
                    // Use plain text for terminal command responses
                    addTerminalLine(terminalCommands[command]);
                }
            } else if (command.startsWith('cat ')) {
                const filename = command.substring(4);
                if (terminalCommands[command]) {
                    addTerminalLineHTML(terminalCommands[command]);
                } else {
                    const escapedFilename = escapeHtml(filename);
                    addTerminalLine(`cat: ${escapedFilename}: No such file or directory`);
                }
            } else if (command === '') {
                // Empty command
            } else {
                const escapedCommand = escapeHtml(command);
                addTerminalLine(`zsh: command not found: ${escapedCommand}\nType 'help' for available commands.`);
            }
            
            // Add new prompt line
            addTerminalLineHTML('<span class="prompt">tintinweb@security-panda:~$ </span><span class="cursor"></span>');
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }

        function addTerminalLine(content, isTrusted = false) {
            if (isTrusted) {
                // For trusted HTML content, create a safe way to add HTML
                // Split by newlines and create separate div elements for each line
                const lines = content.split('\n');
                lines.forEach((lineText) => {
                    const line = document.createElement('div');
                    line.className = 'terminal-line';
                    
                    if (lineText.includes('<span class="prompt">')) {
                        // Handle prompt specifically
                        const promptSpan = document.createElement('span');
                        promptSpan.className = 'prompt';
                        promptSpan.textContent = 'tintinweb@security-panda:~$ ';
                        line.appendChild(promptSpan);
                        
                        // Add the rest of the text after the prompt
                        const afterPrompt = lineText.replace(/.*<\/span>/, '');
                        if (afterPrompt) {
                            const textNode = document.createTextNode(afterPrompt);
                            line.appendChild(textNode);
                        }
                    } else {
                        // Regular text content
                        const textNode = document.createTextNode(lineText);
                        line.appendChild(textNode);
                    }
                    
                    terminalBody.appendChild(line);
                });
            } else {
                // For user input or dynamic content, use textContent for safety
                const lines = content.split('\n');
                lines.forEach((lineText) => {
                    const line = document.createElement('div');
                    line.className = 'terminal-line';
                    line.textContent = lineText;
                    terminalBody.appendChild(line);
                });
            }
        }

        // Helper function specifically for adding trusted HTML content
        function addTerminalLineHTML(htmlContent) {
            const line = document.createElement('div');
            line.className = 'terminal-line';
            
            // Parse the HTML content safely
            if (htmlContent.includes('<span class="prompt">')) {
                const promptSpan = document.createElement('span');
                promptSpan.className = 'prompt';
                promptSpan.textContent = 'tintinweb@security-panda:~$ ';
                line.appendChild(promptSpan);
                
                // Extract content after the prompt tags
                const afterPrompt = htmlContent.replace(/.*<\/span>/, '');
                if (afterPrompt.includes('<span class="cursor">')) {
                    const textBeforeCursor = afterPrompt.replace(/<span class="cursor">.*/, '');
                    if (textBeforeCursor) {
                        line.appendChild(document.createTextNode(textBeforeCursor));
                    }
                    
                    const cursorSpan = document.createElement('span');
                    cursorSpan.className = 'cursor';
                    line.appendChild(cursorSpan);
                } else {
                    line.appendChild(document.createTextNode(afterPrompt));
                }
            } else {
                // For other HTML content, convert to text for safety
                line.textContent = htmlContent.replace(/<[^>]*>/g, '');
            }
            
            terminalBody.appendChild(line);
        }

        function clearTerminal() {
            // Clear the terminal safely without using innerHTML
            terminalBody.innerHTML = '';
            
            // Create the initial prompt line safely
            const line = document.createElement('div');
            line.className = 'terminal-line';
            
            const promptSpan = document.createElement('span');
            promptSpan.className = 'prompt';
            promptSpan.textContent = 'tintinweb@security-panda:~$ ';
            
            const cursorSpan = document.createElement('span');
            cursorSpan.className = 'cursor';
            
            line.appendChild(promptSpan);
            line.appendChild(cursorSpan);
            terminalBody.appendChild(line);
        }
    }

    // Stats counters animation
    function initializeStatsCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));

        function animateCounter(element) {
            const target = parseInt(element.getAttribute('data-count'));
            const duration = 2000;
            const start = performance.now();
            
            function update(current) {
                const elapsed = current - start;
                const progress = Math.min(elapsed / duration, 1);
                const value = Math.floor(progress * target);
                
                element.textContent = value.toLocaleString();
                
                if (progress < 1) {
                    requestAnimationFrame(update);
                }
            }
            
            requestAnimationFrame(update);
        }
    }

    // Parallax effects
    function initializeParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-panda, .panda-zen');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // Matrix background animation
    function initializeMatrixBackground() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const matrixBg = document.querySelector('.matrix-bg');
        
        if (!matrixBg) return;
        
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.opacity = '0.1';
        canvas.style.pointerEvents = 'none';
        matrixBg.appendChild(canvas);

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const drops = [];

        for (let x = 0; x < width / 20; x++) {
            drops[x] = 1;
        }

        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = '#00ff88';
            ctx.font = '15px Fira Code, monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = matrix[Math.floor(Math.random() * matrix.length)];
                ctx.fillText(text, i * 20, drops[i] * 20);

                if (drops[i] * 20 > height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        let animationId;
        function startMatrix() {
            animationId = setInterval(draw, 35);
        }

        function stopMatrix() {
            clearInterval(animationId);
        }

        // Start matrix on page load, stop after 10 seconds to save resources
        startMatrix();
        setTimeout(stopMatrix, 10000);

        // Restart on scroll
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            if (!animationId) startMatrix();
            
            scrollTimeout = setTimeout(() => {
                stopMatrix();
            }, 3000);
        });

        // Handle resize
        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            
            drops.length = 0;
            for (let x = 0; x < width / 20; x++) {
                drops[x] = 1;
            }
        });
    }

    // Code demo functionality
    function initializeCodeDemo() {
        const codeDemo = document.getElementById('code-demo');
        const auditResults = document.getElementById('audit-results');
        
        if (!codeDemo || !auditResults) return;

        // Function to add gutter icons for @audit comments
        function addGutterIcons() {
            const preElement = codeDemo.querySelector('pre');
            const codeElement = codeDemo.querySelector('code');
            
            if (preElement && codeElement) {
                const codeLines = codeElement.textContent.split('\n');
                
                // Get computed line height for accurate positioning
                const computedStyle = window.getComputedStyle(preElement);
                const lineHeight = parseFloat(computedStyle.lineHeight) || 24;
                
                codeLines.forEach((line, index) => {
                    // Check for both @audit and @audit-issue patterns
                    if (line.includes('@audit')) {
                        const gutterIcon = document.createElement('span');
                        gutterIcon.textContent = '🔺';
                        gutterIcon.className = 'audit-gutter-icon';
                        gutterIcon.style.top = `${(index + 1) * lineHeight}px`;
                        gutterIcon.title = 'Audit finding on this line';
                        
                        preElement.appendChild(gutterIcon);
                    }
                });
            }
        }

        // Add gutter icons after a short delay to ensure content is rendered
        setTimeout(() => {
            addGutterIcons();
        }, 500);

        // Simulate real-time code analysis
        setTimeout(() => {
            const findings = auditResults.querySelectorAll('.finding');
            findings.forEach((finding, index) => {
                setTimeout(() => {
                    finding.style.opacity = '1';
                    finding.style.transform = 'translateY(0)';
                }, index * 500);
            });
        }, 1000);
    }

    // Easter eggs and special effects
    function initializeEasterEggs() {
        // Panda clicks
        document.querySelectorAll('.floating-panda, .panda-zen, .panda-logo').forEach(panda => {
            let clickCount = 0;
            panda.addEventListener('click', () => {
                clickCount++;
                panda.style.transform = 'scale(1.2) rotate(360deg)';
                setTimeout(() => {
                    panda.style.transform = '';
                }, 300);

                if (clickCount >= 5) {
                    showTerminal('panda');
                    clickCount = 0;
                }
            });
        });

        // Secret key combinations
        let secretSequence = [];
        const secretCode = ['p', 'a', 'n', 'd', 'a'];
        
        document.addEventListener('keydown', (e) => {
            secretSequence.push(e.key.toLowerCase());
            if (secretSequence.length > secretCode.length) {
                secretSequence.shift();
            }
            
            if (secretSequence.join('') === secretCode.join('')) {
                showTerminal('panda');
                secretSequence = [];
            }
        });
    }

    // Performance optimizations
    function initializePerformanceOptimizations() {
        // Lazy load images
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));

        // Debounced resize handler
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                // Handle resize events
                console.log('Window resized');
            }, 250);
        });

        // Preload critical resources
        const criticalResources = [
            '/css/main.css',
            '/js/main.js'
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = resource.endsWith('.css') ? 'style' : 'script';
            document.head.appendChild(link);
        });
    }

    // Epic Mouse Click Effects System! 🎉
    function initializeClickEffects() {
        let clickCount = 0;
        
        document.addEventListener('click', function(e) {
            // Don't add effects on certain elements
            if (e.target.closest('.terminal-modal') || 
                e.target.closest('button') || 
                e.target.closest('a') ||
                e.target.closest('input') ||
                e.target.closest('select')) {
                return;
            }

            clickCount++;
            const x = e.clientX;
            const y = e.clientY;
            
            // Determine which epic effect to trigger based on click count and randomness
            const effectType = Math.floor(Math.random() * 8);
            
            switch(effectType) {
                case 0:
                    createPandaExplosion(x, y);
                    break;
                case 1:
                    createFlyingSushi(x, y);
                    break;
                case 2:
                    createScreenGlitch();
                    break;
                case 3:
                    createHackMessages(x, y);
                    break;
                case 4:
                    createConfettiExplosion(x, y);
                    break;
                case 5:
                    createMatrixPandaRain();
                    break;
                case 6:
                    createSoundVisualizer(x, y);
                    break;
                default:
                    // Enhanced version of original effects
                    createEpicRippleEffect(x, y);
                    createEpicSparkParticles(x, y);
            }
            
            // Special effects on milestone clicks
            if (clickCount % 10 === 0) {
                createUltimateCombo(x, y);
            }
        });
    }

    // 🐼 PANDA EXPLOSION EFFECT
    function createPandaExplosion(x, y) {
        const pandaExpressions = ['🐼', '😍', '🤯', '😂', '🤗', '😎', '🤪', '🥳', '🤓', '😋'];
        const pandaCount = 5 + Math.floor(Math.random() * 5);
        
        for (let i = 0; i < pandaCount; i++) {
            const panda = document.createElement('div');
            panda.className = 'epic-panda';
            panda.textContent = pandaExpressions[Math.floor(Math.random() * pandaExpressions.length)];
            
            const angle = (360 / pandaCount) * i + (Math.random() - 0.5) * 45;
            const distance = 50 + Math.random() * 100;
            const radians = (angle * Math.PI) / 180;
            
            const moveX = Math.cos(radians) * distance;
            const moveY = Math.sin(radians) * distance;
            
            panda.style.left = x + 'px';
            panda.style.top = y + 'px';
            panda.style.setProperty('--move-x', moveX + 'px');
            panda.style.setProperty('--move-y', moveY + 'px');
            panda.style.setProperty('--rotation', (Math.random() * 720 - 360) + 'deg');
            
            document.body.appendChild(panda);
            
            setTimeout(() => {
                if (panda.parentNode) {
                    panda.parentNode.removeChild(panda);
                }
            }, 2000);
        }
    }

    // 🍣 FLYING SUSHI EFFECT
    function createFlyingSushi(x, y) {
        const sushiTypes = ['🍣', '🍤', '🍱', '🍙', '🍘', '🥢', '🐟', '🦐'];
        const sushiCount = 3 + Math.floor(Math.random() * 4);
        
        for (let i = 0; i < sushiCount; i++) {
            const sushi = document.createElement('div');
            sushi.className = 'flying-sushi';
            sushi.textContent = sushiTypes[Math.floor(Math.random() * sushiTypes.length)];
            
            const startX = x + (Math.random() - 0.5) * 100;
            const startY = y + (Math.random() - 0.5) * 100;
            const endX = startX + (Math.random() - 0.5) * 400;
            const endY = startY + (Math.random() - 0.5) * 400;
            
            sushi.style.left = startX + 'px';
            sushi.style.top = startY + 'px';
            sushi.style.setProperty('--end-x', endX + 'px');
            sushi.style.setProperty('--end-y', endY + 'px');
            
            document.body.appendChild(sushi);
            
            setTimeout(() => {
                if (sushi.parentNode) {
                    sushi.parentNode.removeChild(sushi);
                }
            }, 3000);
        }
    }

    // 📺 SCREEN GLITCH EFFECT
    function createScreenGlitch() {
        const glitch = document.createElement('div');
        glitch.className = 'screen-glitch';
        document.body.appendChild(glitch);
        
        // Add shake effect to entire page
        document.body.classList.add('screen-shake');
        
        setTimeout(() => {
            document.body.classList.remove('screen-shake');
            if (glitch.parentNode) {
                glitch.parentNode.removeChild(glitch);
            }
        }, 500);
    }

    // 💻 FLOATING HACK MESSAGES
    function createHackMessages(x, y) {
        const hackMessages = [
            'HACK THE PLANET! 🌍',
            'ACCESS GRANTED 🔓',
            'VULNERABILITY FOUND! 🕳️',
            'PANDA.EXE LOADED 🐼',
            'SUSHI PROTOCOL ACTIVE 🍣',
            'SMART CONTRACT AUDITED ✅',
            'CVE-XXXX-YYYY ASSIGNED 🏆',
            'RESPONSIBLE DISCLOSURE 🛡️',
            'ETHEREUM SECURED 💎',
            'CONSENSUS VERIFIED ⚡'
        ];
        
        const messageCount = 1 + Math.floor(Math.random() * 3);
        
        for (let i = 0; i < messageCount; i++) {
            const message = document.createElement('div');
            message.className = 'hack-message';
            message.textContent = hackMessages[Math.floor(Math.random() * hackMessages.length)];
            
            message.style.left = (x + (Math.random() - 0.5) * 200) + 'px';
            message.style.top = (y - 50 + (Math.random() - 0.5) * 100) + 'px';
            
            document.body.appendChild(message);
            
            setTimeout(() => {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 3000);
        }
    }

    // 🎊 CONFETTI EXPLOSION
    function createConfettiExplosion(x, y) {
        const colors = ['#00ff88', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b', '#eb4d4b', '#6c5ce7'];
        const confettiCount = 15 + Math.floor(Math.random() * 15);
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            const angle = Math.random() * 360;
            const distance = 50 + Math.random() * 150;
            const radians = (angle * Math.PI) / 180;
            
            const moveX = Math.cos(radians) * distance;
            const moveY = Math.sin(radians) * distance;
            
            confetti.style.left = x + 'px';
            confetti.style.top = y + 'px';
            confetti.style.setProperty('--move-x', moveX + 'px');
            confetti.style.setProperty('--move-y', moveY + 'px');
            confetti.style.setProperty('--rotation', (Math.random() * 720) + 'deg');
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 2500);
        }
    }

    // 🌧️ MATRIX PANDA RAIN
    function createMatrixPandaRain() {
        const pandaMatrix = ['🐼', '1', '0', '🍣', '💻', '🔍', '⚡', '🔐'];
        const columnCount = 8;
        
        for (let i = 0; i < columnCount; i++) {
            setTimeout(() => {
                const column = document.createElement('div');
                column.className = 'matrix-column';
                column.style.left = (Math.random() * window.innerWidth) + 'px';
                
                for (let j = 0; j < 10; j++) {
                    const char = document.createElement('div');
                    char.className = 'matrix-char';
                    char.textContent = pandaMatrix[Math.floor(Math.random() * pandaMatrix.length)];
                    char.style.animationDelay = (j * 100) + 'ms';
                    column.appendChild(char);
                }
                
                document.body.appendChild(column);
                
                setTimeout(() => {
                    if (column.parentNode) {
                        column.parentNode.removeChild(column);
                    }
                }, 3000);
            }, i * 200);
        }
    }

    // 🔊 SOUND VISUALIZER EFFECT
    function createSoundVisualizer(x, y) {
        const barCount = 12;
        const visualizer = document.createElement('div');
        visualizer.className = 'sound-visualizer';
        visualizer.style.left = (x - 60) + 'px';
        visualizer.style.top = (y - 30) + 'px';
        
        for (let i = 0; i < barCount; i++) {
            const bar = document.createElement('div');
            bar.className = 'sound-bar';
            bar.style.animationDelay = (i * 50) + 'ms';
            bar.style.height = (Math.random() * 50 + 10) + 'px';
            visualizer.appendChild(bar);
        }
        
        document.body.appendChild(visualizer);
        
        setTimeout(() => {
            if (visualizer.parentNode) {
                visualizer.parentNode.removeChild(visualizer);
            }
        }, 2000);
    }

    // 💥 ULTIMATE COMBO EFFECT (Every 10th click)
    function createUltimateCombo(x, y) {
        // Trigger multiple effects at once!
        createPandaExplosion(x, y);
        setTimeout(() => createFlyingSushi(x, y), 200);
        setTimeout(() => createConfettiExplosion(x, y), 400);
        setTimeout(() => createHackMessages(x, y), 600);
        setTimeout(() => createScreenGlitch(), 800);
        setTimeout(() => createMatrixPandaRain(), 1000);
        
        // Add special combo message
        const comboMessage = document.createElement('div');
        comboMessage.className = 'combo-message';
        comboMessage.innerHTML = `
            <div>🎉 EPIC COMBO! 🎉</div>
            <div>TINTINWEB ULTIMATE HACK!</div>
            <div>🐼🍣💻🔥</div>
        `;
        comboMessage.style.left = (x - 100) + 'px';
        comboMessage.style.top = (y - 60) + 'px';
        
        document.body.appendChild(comboMessage);
        
        setTimeout(() => {
            if (comboMessage.parentNode) {
                comboMessage.parentNode.removeChild(comboMessage);
            }
        }, 4000);
    }

    // Enhanced versions of original effects
    function createEpicRippleEffect(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'epic-ripple';
        ripple.style.left = (x - 40) + 'px';
        ripple.style.top = (y - 40) + 'px';
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 800);
    }

    function createEpicSparkParticles(x, y) {
        const sparkCount = 12;
        const sparkColors = ['#00ff88', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24'];
        
        for (let i = 0; i < sparkCount; i++) {
            const spark = document.createElement('div');
            spark.className = 'epic-spark';
            spark.style.backgroundColor = sparkColors[Math.floor(Math.random() * sparkColors.length)];
            
            const angle = (360 / sparkCount) * i + (Math.random() - 0.5) * 30;
            const distance = 20 + Math.random() * 40;
            const radians = (angle * Math.PI) / 180;
            
            const moveX = Math.cos(radians) * distance;
            const moveY = Math.sin(radians) * distance;
            
            spark.style.left = x + 'px';
            spark.style.top = y + 'px';
            spark.style.setProperty('--move-x', moveX + 'px');
            spark.style.setProperty('--move-y', moveY + 'px');
            
            document.body.appendChild(spark);
            
            setTimeout(() => {
                if (spark.parentNode) {
                    spark.parentNode.removeChild(spark);
                }
            }, 1000);
        }
    }

    // Initialize click effects
    initializeClickEffects();

    // Initialize all features
    function init() {
        initializeCodeDemo();
        initializeEasterEggs();
        initializePerformanceOptimizations();
    }

    // Call init after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Add some global utility functions
    window.tintinweb = {
        showTerminal: showTerminal,
        closeTerminal: closeTerminal,
        version: '2.0.0',
        author: 'tintinweb',
        panda: '🐼'
    };

    // Copy to clipboard function for donation addresses
    window.copyToClipboard = function(elementId, button) {
        const element = document.getElementById(elementId);
        const text = element.textContent;
        
        // Use the modern clipboard API if available
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text).then(() => {
                showCopySuccess(button);
            }).catch(err => {
                // Fallback for clipboard API failures
                fallbackCopyTextToClipboard(text, button);
            });
        } else {
            // Fallback for older browsers
            fallbackCopyTextToClipboard(text, button);
        }
    };

    function fallbackCopyTextToClipboard(text, button) {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            if (successful) {
                showCopySuccess(button);
            } else {
                showCopyError(button);
            }
        } catch (err) {
            showCopyError(button);
        }
        
        document.body.removeChild(textArea);
    }

    function showCopySuccess(button) {
        button.innerHTML = '<i class="fas fa-check"></i>';
        button.classList.add('copied');
        
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-copy"></i>';
            button.classList.remove('copied');
        }, 2000);
    }

    function showCopyError(button) {
        button.innerHTML = '<i class="fas fa-times"></i>';
        button.style.color = 'var(--error-color)';
        
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-copy"></i>';
            button.style.color = '';
        }, 2000);
    }

    // Console easter egg
    console.log(`
    ╔══════════════════════════════════════════════════════════════╗
    ║                                                              ║
    ║    🐼 Welcome to tintinweb's portfolio! 🐼                   ║
    ║                                                              ║
    ║    Try these console commands:                               ║
    ║    • tintinweb.showTerminal()                               ║
    ║    • tintinweb.showTerminal('help')                         ║
    ║    • tintinweb.showTerminal('panda')                        ║
    ║                                                              ║
    ║    Or try the Konami code! ↑↑↓↓←→←→BA                      ║
    ║                                                              ║
    ║    Built with 🍣 and lots of ☕                             ║
    ║                                                              ║
    ╚══════════════════════════════════════════════════════════════╝
    `);

    // Timeline animation handling
    function handleTimelineAnimations() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        // Add the animation class to timeline items when in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    // Stagger the animations for a more pleasing effect
                    const index = Array.from(timelineItems).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.15}s`;
                }
            });
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: '-50px'
        });
        
        // Observe all timeline items
        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }
    
    // Run the timeline animations when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', handleTimelineAnimations);
    } else {
        handleTimelineAnimations();
    }

})();
