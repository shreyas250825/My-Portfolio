/* ===================================================================
   SHREYAS SALIAN — Academic Research Portfolio
   script.js v4
   =================================================================== */

(function () {
    'use strict';

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ── 1. Mobile Navigation ────────────────────────────────────── */
    (function setupNav() {
        const btn   = document.querySelector('.mobile-menu-btn');
        const links = document.querySelector('.nav-links');
        if (!btn || !links) return;

        function open() {
            links.classList.add('open');
            btn.classList.add('open');
            btn.setAttribute('aria-expanded', 'true');
            btn.setAttribute('aria-label', 'Close navigation menu');
        }

        function close() {
            links.classList.remove('open');
            btn.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
            btn.setAttribute('aria-label', 'Open navigation menu');
        }

        btn.addEventListener('click', () => {
            if (links.classList.contains('open')) close(); else open();
        });

        // Close on link click
        links.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', close);
        });

        // Close on outside click
        document.addEventListener('click', e => {
            if (!btn.contains(e.target) && !links.contains(e.target)) close();
        });

        // Close on Escape
        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') close();
        });
    })();

    /* ── 2. Sticky nav shadow on scroll ─────────────────────────── */
    (function setupNavScroll() {
        const nav = document.getElementById('site-nav');
        if (!nav) return;
        const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    })();

    /* ── 3. Smooth scroll for anchor links ──────────────────────── */
    (function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const id = this.getAttribute('href');
                if (id === '#') return;
                const target = document.querySelector(id);
                if (!target) return;
                e.preventDefault();
                const offset = document.getElementById('site-nav')?.offsetHeight || 68;
                window.scrollTo({ top: target.offsetTop - offset, behavior: reducedMotion ? 'auto' : 'smooth' });
            });
        });
    })();

    /* ── 4. Active nav link highlight ───────────────────────────── */
    (function setupActiveNav() {
        const links    = document.querySelectorAll('.nav-links a');
        const sections = Array.from(links).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

        function update() {
            const scrollPos = window.scrollY + 100;
            let active = null;
            sections.forEach((sec, i) => {
                if (sec.offsetTop <= scrollPos) active = i;
            });
            links.forEach((a, i) => a.classList.toggle('active', i === active));
        }

        window.addEventListener('scroll', update, { passive: true });
        update();
    })();

    /* ── 5. Scroll-reveal animations ─────────────────────────────── */
    (function setupReveal() {
        const all = document.querySelectorAll('.reveal, .reveal-stagger');
        if (!all.length) return;

        if (reducedMotion) {
            all.forEach(el => el.classList.add('visible'));
            return;
        }

        const obs = new IntersectionObserver((entries) => {
            entries.forEach((entry, idx) => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                const siblings = Array.from(el.parentElement?.querySelectorAll('.reveal-stagger') || []);
                const delay = el.classList.contains('reveal-stagger')
                    ? Math.min(siblings.indexOf(el) * 80, 480)
                    : 0;
                setTimeout(() => el.classList.add('visible'), delay);
                obs.unobserve(el);
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

        all.forEach(el => obs.observe(el));
    })();

    /* ── 6. Back to top button ───────────────────────────────────── */
    (function setupBackToTop() {
        const btn = document.getElementById('backToTop');
        if (!btn) return;

        const toggle = () => btn.classList.toggle('visible', window.scrollY > 400);
        window.addEventListener('scroll', toggle, { passive: true });
        toggle();

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
        });
    })();

    /* ── 7. Contact form ─────────────────────────────────────────── */
    (function setupContactForm() {
        const form     = document.getElementById('contactForm');
        const submitBtn = document.getElementById('submitBtn');
        const feedback  = document.getElementById('formFeedback');
        if (!form) return;

        function validateEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

        function setFieldError(id, msg) {
            const el = document.getElementById(id);
            if (el) el.textContent = msg;
        }

        function clearErrors() {
            ['nameError','emailError','subjectError','messageError'].forEach(id => setFieldError(id, ''));
        }

        form.addEventListener('submit', function (e) {
            clearErrors();
            const name    = this.name.value.trim();
            const email   = this.email.value.trim();
            const subject = this.subject.value.trim();
            const message = this.message.value.trim();
            let valid = true;

            if (!name)             { setFieldError('nameError',    'Name is required.'); valid = false; }
            if (!email)            { setFieldError('emailError',   'Email is required.'); valid = false; }
            else if (!validateEmail(email)) { setFieldError('emailError', 'Enter a valid email address.'); valid = false; }
            if (!subject)          { setFieldError('subjectError', 'Subject is required.'); valid = false; }
            if (!message)          { setFieldError('messageError', 'Message is required.'); valid = false; }

            if (!valid) { e.preventDefault(); return; }

            // Show loading state
            const btnText    = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            submitBtn.disabled = true;
            if (btnText)    btnText.style.display    = 'none';
            if (btnLoading) btnLoading.style.display = 'inline-flex';

            // Let Netlify handle submission naturally; show optimistic feedback
            setTimeout(() => {
                feedback.textContent = 'Thank you! Your message has been sent.';
                feedback.className = 'form-feedback success';
                form.reset();
                submitBtn.disabled = false;
                if (btnText)    btnText.style.display    = '';
                if (btnLoading) btnLoading.style.display = 'none';
            }, 1800);
        });
    })();

    /* ── 8. Hero network canvas (right column decoration) ────────── */
    (function setupHeroNetwork() {
        const canvas = document.getElementById('hero-network-canvas');
        if (!canvas || reducedMotion) return;

        const ctx = canvas.getContext('2d');
        let W = 0, H = 0;

        function resize() {
            const rect = canvas.parentElement.getBoundingClientRect();
            W = canvas.width  = rect.width  || 480;
            H = canvas.height = rect.height || 480;
        }

        window.addEventListener('resize', resize, { passive: true });
        resize();

        const NODE_COUNT = 38;
        const CONNECT    = 110;

        const nodes = Array.from({ length: NODE_COUNT }, () => ({
            x:  Math.random() * W,
            y:  Math.random() * H,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            r:  Math.random() * 1.5 + 1,
        }));

        // A few "hub" nodes that are slightly larger
        [0, 7, 15, 22, 30].forEach(i => { if (nodes[i]) nodes[i].r = 3.5; });

        let raf;
        function tick() {
            ctx.clearRect(0, 0, W, H);

            // Move nodes
            nodes.forEach(n => {
                n.x += n.vx; n.y += n.vy;
                if (n.x < 0 || n.x > W) n.vx *= -1;
                if (n.y < 0 || n.y > H) n.vy *= -1;
            });

            // Draw edges
            ctx.lineWidth = 1;
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const a = nodes[i], b = nodes[j];
                    const dist = Math.hypot(a.x - b.x, a.y - b.y);
                    if (dist < CONNECT) {
                        ctx.globalAlpha = (1 - dist / CONNECT) * 0.5;
                        ctx.strokeStyle = '#7c2d3e';
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.stroke();
                    }
                }
            }
            ctx.globalAlpha = 1;

            // Draw nodes
            nodes.forEach(n => {
                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
                ctx.fillStyle = n.r > 2 ? 'rgba(124,45,62,0.7)' : 'rgba(124,45,62,0.45)';
                ctx.fill();
            });

            raf = requestAnimationFrame(tick);
        }

        // Pause when not visible
        const obs = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) { raf = requestAnimationFrame(tick); }
            else { cancelAnimationFrame(raf); }
        });
        obs.observe(canvas);
    })();

    /* ── 9. Full-page subtle background canvas ───────────────────── */
    (function setupBgCanvas() {
        const canvas = document.getElementById('hero-canvas');
        if (!canvas || reducedMotion) return;

        const ctx = canvas.getContext('2d');
        let W = 0, H = 0;

        function resize() {
            W = canvas.width  = window.innerWidth;
            H = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize, { passive: true });
        resize();

        const COUNT = Math.min(55, Math.floor(window.innerWidth / 22));
        const pts   = Array.from({ length: COUNT }, () => ({
            x:  Math.random() * W,
            y:  Math.random() * H,
            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25,
        }));
        const D = 130;

        function draw() {
            ctx.clearRect(0, 0, W, H);
            pts.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0 || p.x > W) p.vx *= -1;
                if (p.y < 0 || p.y > H) p.vy *= -1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(124,45,62,0.55)';
                ctx.fill();
            });
            ctx.lineWidth = 1;
            for (let i = 0; i < pts.length; i++) {
                for (let j = i + 1; j < pts.length; j++) {
                    const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
                    const d = Math.hypot(dx, dy);
                    if (d < D) {
                        ctx.globalAlpha = (1 - d / D) * 0.3;
                        ctx.strokeStyle = '#7c2d3e';
                        ctx.beginPath();
                        ctx.moveTo(pts[i].x, pts[i].y);
                        ctx.lineTo(pts[j].x, pts[j].y);
                        ctx.stroke();
                    }
                }
            }
            ctx.globalAlpha = 1;
            requestAnimationFrame(draw);
        }
        draw();
    })();

})();
