document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        // Add toggle icon
        const icon = this.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.className = 'fas fa-times';
            this.setAttribute('aria-expanded', 'true');
        } else {
            icon.className = 'fas fa-bars';
            this.setAttribute('aria-expanded', 'false');
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenuBtn && navLinks && !mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.className = 'fas fa-bars';
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navLinks.classList.remove('active');
                if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
            }
        });
    });

    // Enhanced sticky navigation behavior
    const stickyNav = document.querySelector('.sticky-nav');
    let lastScrollY = window.scrollY;
    let scrollTimeout;
    
    window.addEventListener('scroll', function() {
        // Clear previous timeout
        clearTimeout(scrollTimeout);
        
        if (window.scrollY > 100) {
            stickyNav.classList.add('scrolled');
            
            if (window.scrollY > lastScrollY && window.scrollY > 200) {
                // Scrolling down - hide nav after 200px
                stickyNav.classList.add('hidden');
            } else {
                // Scrolling up - show nav immediately
                stickyNav.classList.remove('hidden');
            }
        } else {
            stickyNav.classList.remove('scrolled', 'hidden');
        }
        
        // Set timeout to show nav after scrolling stops
        scrollTimeout = setTimeout(() => {
            if (window.scrollY > 100) {
                stickyNav.classList.remove('hidden');
            }
        }, 1000);
        
        lastScrollY = window.scrollY;
    }, { passive: true });

    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    // Show/hide back to top button on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }, { passive: true });
    
    // Back to top functionality
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Project filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Active navigation link highlighting
    const navLinkElements = document.querySelectorAll('.nav-links a');
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        navLinkElements.forEach(link => {
            link.classList.remove('active');
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const sectionTop = targetSection.offsetTop;
                const sectionBottom = sectionTop + targetSection.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    link.classList.add('active');
                }
            }
        });
    }
    
    // Update active link on scroll
    window.addEventListener('scroll', updateActiveNavLink, { passive: true });
    
    // Intersection Observer for section animations
    const sections = document.querySelectorAll('.section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Contact form handling for Netlify
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Get form data for validation
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !subject || !message) {
                e.preventDefault();
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                e.preventDefault();
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.querySelector('.btn-text').style.display = 'none';
            submitBtn.querySelector('.btn-loading').style.display = 'inline-block';
            
            // Let Netlify handle the form submission naturally
            // Show success message after a short delay
            setTimeout(() => {
                showFormMessage('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
                
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.querySelector('.btn-text').style.display = 'inline';
                submitBtn.querySelector('.btn-loading').style.display = 'none';
            }, 2000);
        });
    }
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show form message function
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type} show`;
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            formMessage.classList.remove('show');
        }, 5000);
    }

    // Animate elements on scroll
    const animationObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    // Observe elements for animation
    document.querySelectorAll('.skill-item, .project-card, .timeline-item, .education-card, .certificate-card').forEach(el => {
        animationObserver.observe(el);
    });

    // Skills animation on scroll
    const skillBars = document.querySelectorAll('.skill-level');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.style.width;
                skillBar.style.width = '0%';
                
                setTimeout(() => {
                    skillBar.style.width = width;
                }, 100);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        skillObserver.observe(bar);
    });

    // SS logo refresh control
    const logoEl = document.querySelector('.nav-brand .logo');
    if (logoEl) {
        logoEl.addEventListener('click', () => {
            window.location.reload();
        });
        logoEl.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.location.reload();
            }
        });
    }

    // NEW: Initialize VanillaTilt on cards and buttons (if library loaded)
    if (window.VanillaTilt) {
        const tiltSelectors = '.project-card, .education-card, .certificate-card, .stat-item, .btn';
        document.querySelectorAll(tiltSelectors).forEach(el => {
            window.VanillaTilt.init(el, {
                max: 8,
                speed: 400,
                glare: true,
                'max-glare': 0.15,
                gyroscope: true,
                reverse: false,
            });
        });
    }

    // NEW: Lightweight particles background
    const particleCanvas = document.getElementById('particle-canvas');
    if (particleCanvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const ctx = particleCanvas.getContext('2d');
        let width = particleCanvas.width = window.innerWidth;
        let height = particleCanvas.height = window.innerHeight;
        const particleCount = Math.min(80, Math.floor(width / 20));
        const particles = new Array(particleCount).fill(0).map(() => ({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 1.6 + 0.4,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
        }));
        const connectDist = 110;

        function resize() {
            width = particleCanvas.width = window.innerWidth;
            height = particleCanvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize, { passive: true });

        function draw() {
            ctx.clearRect(0, 0, width, height);
            // Glow effect
            ctx.fillStyle = 'rgba(96, 165, 250, 0.9)';
            ctx.strokeStyle = 'rgba(34, 211, 238, 0.18)';
            ctx.lineWidth = 1;

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();
            }

            // draw connections
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const a = particles[i];
                    const b = particles[j];
                    const dx = a.x - b.x;
                    const dy = a.y - b.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < connectDist) {
                        ctx.globalAlpha = 1 - dist / connectDist;
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            }
            requestAnimationFrame(draw);
        }
        draw();
    }

    // NEW: Subtle parallax on hero elements
    const parallaxEls = document.querySelectorAll('[data-parallax]');
    if (parallaxEls.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        window.addEventListener('scroll', () => {
            const offset = window.scrollY;
            parallaxEls.forEach(el => {
                const factor = parseFloat(el.getAttribute('data-parallax')) || 0.1;
                el.style.transform = `translate3d(0, ${offset * factor}px, 0)`;
                el.style.willChange = 'transform';
            });
        }, { passive: true });
    }
 
    // NEW: Hero network animation (lightweight)
    const heroCanvas = document.getElementById('hero-network');
    if (heroCanvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const ctx = heroCanvas.getContext('2d');
        function sizeHero() {
            heroCanvas.width = heroCanvas.clientWidth;
            heroCanvas.height = heroCanvas.clientHeight;
        }
        sizeHero();
        window.addEventListener('resize', sizeHero, { passive: true });
        const nodes = Array.from({ length: 45 }, () => ({
            x: Math.random() * heroCanvas.width,
            y: Math.random() * heroCanvas.height,
            vx: (Math.random() - 0.5) * 0.35,
            vy: (Math.random() - 0.5) * 0.35,
        }));
        const linkDist = 140;
        function tick() {
            ctx.clearRect(0,0,heroCanvas.width, heroCanvas.height);
            ctx.fillStyle = 'rgba(34, 211, 238, 0.9)';
            ctx.strokeStyle = 'rgba(96, 165, 250, 0.25)';
            ctx.lineWidth = 1;
            for (const n of nodes) {
                n.x += n.vx; n.y += n.vy;
                if (n.x < 0 || n.x > heroCanvas.width) n.vx *= -1;
                if (n.y < 0 || n.y > heroCanvas.height) n.vy *= -1;
                ctx.beginPath(); ctx.arc(n.x, n.y, 1.6, 0, Math.PI*2); ctx.fill();
            }
            for (let i=0;i<nodes.length;i++){
                for (let j=i+1;j<nodes.length;j++){
                    const a = nodes[i], b = nodes[j];
                    const dx=a.x-b.x, dy=a.y-b.y, d=Math.hypot(dx,dy);
                    if (d < linkDist) { ctx.globalAlpha = 1 - d/linkDist; ctx.beginPath(); ctx.moveTo(a.x,a.y); ctx.lineTo(b.x,b.y); ctx.stroke(); ctx.globalAlpha=1; }
                }
            }
            requestAnimationFrame(tick);
        }
        tick();
    }

    // NEW: Typed effect for hero subtitle (no external libs)
    const typedHost = document.getElementById('typed');
    const typedWrapper = document.querySelector('[data-typed]');
    if (typedHost && typedWrapper && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        try {
            const phrases = JSON.parse(typedWrapper.getAttribute('data-typed'));
            let p = 0, i = 0, deleting = false;
            function typeLoop() {
                const full = phrases[p];
                if (!deleting) {
                    i++;
                    if (i > full.length) { deleting = true; setTimeout(typeLoop, 1300); return; }
                } else {
                    i--;
                    if (i <= 0) { deleting = false; p = (p+1) % phrases.length; }
                }
                typedHost.textContent = full.slice(0, Math.max(0,i));
                const delay = deleting ? 40 : 75;
                setTimeout(typeLoop, delay);
            }
            typeLoop();
        } catch {}
    }

    // NEW: Cursor glow tracking
    const cursorGlow = document.querySelector('.cursor-glow');
    if (cursorGlow && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        let x = 0, y = 0, tx = 0, ty = 0;
        const speed = 0.15;
        function loop() {
            x += (tx - x) * speed;
            y += (ty - y) * speed;
            cursorGlow.style.transform = `translate(${x}px, ${y}px)`;
            requestAnimationFrame(loop);
        }
        loop();
        window.addEventListener('pointermove', (e) => { tx = e.clientX; ty = e.clientY; }, { passive: true });
    }

    // NEW: Staggered reveal for groups (skills/projects/education/certificates)
    const groups = ['.projects-grid', '.education-grid', '.certificates-grid'];
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const items = entry.target.querySelectorAll(':scope > *');
                items.forEach((el, i) => { el.style.transitionDelay = `${Math.min(i*70, 600)}ms`; el.classList.add('visible'); });
                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    groups.forEach(sel => { const el = document.querySelector(sel); if (el) staggerObserver.observe(el); });
 
    // Magnetic hover effect
    const magnets = document.querySelectorAll('.magnetic');
    if (magnets.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        magnets.forEach(el => {
            const strength = 18; // px
            let rect;
            function updateRect(){ rect = el.getBoundingClientRect(); }
            updateRect();
            window.addEventListener('resize', updateRect, { passive: true });
            el.addEventListener('mousemove', (e) => {
                const mx = e.clientX - (rect.left + rect.width/2);
                const my = e.clientY - (rect.top + rect.height/2);
                const dx = Math.max(-strength, Math.min(strength, mx * 0.15));
                const dy = Math.max(-strength, Math.min(strength, my * 0.15));
                el.style.transform = `translate(${dx}px, ${dy}px)`;
            });
            el.addEventListener('mouseleave', () => {
                el.style.transform = 'translate(0, 0)';
            });
        });
    }
});