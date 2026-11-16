/* ===================================================================
   SHREYAS SALIAN — Premium Academic Research Portfolio
   script.js v5
   =================================================================== */
(function () {
    'use strict';

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ── 1. Mobile Navigation ──────────────────────────────────── */
    (function setupNav() {
        const btn   = document.querySelector('.mobile-menu-btn');
        const links = document.getElementById('primary-navigation');
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

        btn.addEventListener('click', () =>
            links.classList.contains('open') ? close() : open());

        links.querySelectorAll('a').forEach(a => a.addEventListener('click', close));

        document.addEventListener('click', e => {
            if (!btn.contains(e.target) && !links.contains(e.target)) close();
        });
        document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    })();

    /* ── 2. Nav scroll shadow + hide/show ─────────────────────── */
    (function setupNavScroll() {
        const nav = document.getElementById('site-nav');
        if (!nav) return;
        window.addEventListener('scroll', () => {
            nav.classList.toggle('scrolled', window.scrollY > 40);
        }, { passive: true });
    })();

    /* ── 3. Smooth scroll for anchor links ────────────────────── */
    (function setupScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(a => {
            a.addEventListener('click', function (e) {
                const id = this.getAttribute('href');
                if (id === '#') return;
                const target = document.querySelector(id);
                if (!target) return;
                e.preventDefault();
                const navH = document.getElementById('site-nav')?.offsetHeight || 68;
                window.scrollTo({
                    top: target.offsetTop - navH,
                    behavior: reduced ? 'auto' : 'smooth'
                });
            });
        });
    })();

    /* ── 4. Active nav link highlight ─────────────────────────── */
    (function setupActiveNav() {
        const links    = Array.from(document.querySelectorAll('.nav-links a'));
        const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

        function update() {
            const pos = window.scrollY + 110;
            let active = -1;
            sections.forEach((s, i) => { if (s.offsetTop <= pos) active = i; });
            links.forEach((a, i) => a.classList.toggle('active', i === active));
        }
        window.addEventListener('scroll', update, { passive: true });
        update();
    })();

    /* ── 5. Scroll-reveal ─────────────────────────────────────── */
    (function setupReveal() {
        const all = document.querySelectorAll('.reveal, .reveal-s');
        if (!all.length) return;

        if (reduced) { all.forEach(el => el.classList.add('visible')); return; }

        const obs = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;
                // stagger siblings of reveal-s
                if (el.classList.contains('reveal-s')) {
                    const siblings = Array.from(
                        el.parentElement?.querySelectorAll('.reveal-s') || []
                    );
                    const idx = siblings.indexOf(el);
                    setTimeout(() => el.classList.add('visible'), Math.min(idx * 90, 500));
                } else {
                    el.classList.add('visible');
                }
                obs.unobserve(el);
            });
        }, { threshold: 0.07, rootMargin: '0px 0px -40px 0px' });

        all.forEach(el => obs.observe(el));
    })();

    /* ── 6. Back to top ───────────────────────────────────────── */
    (function setupBTT() {
        const btn = document.getElementById('backToTop');
        if (!btn) return;
        window.addEventListener('scroll', () =>
            btn.classList.toggle('on', window.scrollY > 450), { passive: true });
        btn.addEventListener('click', () =>
            window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }));
    })();

    /* ── 7. Contact form ──────────────────────────────────────── */
    (function setupForm() {
        const form     = document.getElementById('contactForm');
        const submitBtn = document.getElementById('submitBtn');
        const feedback  = document.getElementById('formFeedback');
        if (!form) return;

        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        function setErr(id, msg) {
            const el = document.getElementById(id);
            if (el) el.textContent = msg;
        }
        function clearErrs() {
            ['nameErr','emailErr','subjectErr','msgErr'].forEach(id => setErr(id, ''));
        }

        form.addEventListener('submit', function (e) {
            clearErrs();
            const name    = this.name.value?.trim();
            const email   = this.email.value?.trim();
            const subject = this.subject.value?.trim();
            const message = this.message.value?.trim();
            let valid = true;

            if (!name)                 { setErr('nameErr',    'Name is required.');          valid = false; }
            if (!email)                { setErr('emailErr',   'Email is required.');         valid = false; }
            else if (!emailRe.test(email)) { setErr('emailErr', 'Enter a valid email.'); valid = false; }
            if (!subject)              { setErr('subjectErr', 'Subject is required.');       valid = false; }
            if (!message)              { setErr('msgErr',     'Message is required.');       valid = false; }

            if (!valid) { e.preventDefault(); return; }

            const btnText = submitBtn.querySelector('.btn-text');
            const btnSpin = submitBtn.querySelector('.btn-spin');
            submitBtn.disabled = true;
            if (btnText) btnText.style.display = 'none';
            if (btnSpin) btnSpin.style.display = 'inline-flex';

            setTimeout(() => {
                feedback.textContent = 'Thank you! Your message has been sent.';
                feedback.className   = 'ffeedback ok';
                form.reset();
                submitBtn.disabled    = false;
                if (btnText) btnText.style.display = '';
                if (btnSpin) btnSpin.style.display = 'none';
                setTimeout(() => { feedback.className = 'ffeedback'; }, 6000);
            }, 1800);
        });
    })();

    /* ── 8. Hero Research Visualization Canvas Overlay ────────── */
    (function setupVizCanvas() {
        const canvas = document.getElementById('viz-canvas');
        if (!canvas || reduced) return;

        const ctx = canvas.getContext('2d');
        let W = 0, H = 0;

        function resize() {
            const rect = canvas.parentElement.getBoundingClientRect();
            W = canvas.width  = Math.round(rect.width  || 540);
            H = canvas.height = Math.round(rect.height || 540);
        }
        resize();

        const ro = new ResizeObserver(resize);
        ro.observe(canvas.parentElement);

        // A small set of slowly drifting particles that form connections
        const N = 22;
        const pts = Array.from({ length: N }, () => ({
            x:  Math.random() * W,
            y:  Math.random() * H,
            vx: (Math.random() - 0.5) * 0.28,
            vy: (Math.random() - 0.5) * 0.28,
        }));
        const D = 90; // connection distance

        let raf;
        function tick() {
            ctx.clearRect(0, 0, W, H);
            pts.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0 || p.x > W) p.vx *= -1;
                if (p.y < 0 || p.y > H) p.vy *= -1;
            });

            ctx.lineWidth = 0.8;
            for (let i = 0; i < N; i++) {
                for (let j = i + 1; j < N; j++) {
                    const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
                    const d = Math.sqrt(dx * dx + dy * dy);
                    if (d < D) {
                        ctx.globalAlpha = (1 - d / D) * 0.22;
                        ctx.strokeStyle = '#7c2d3e';
                        ctx.beginPath();
                        ctx.moveTo(pts[i].x, pts[i].y);
                        ctx.lineTo(pts[j].x, pts[j].y);
                        ctx.stroke();
                    }
                }
            }
            ctx.globalAlpha = 1;

            pts.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(124,45,62,0.35)';
                ctx.fill();
            });

            raf = requestAnimationFrame(tick);
        }

        // Pause when off-screen
        const obs = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) { raf = requestAnimationFrame(tick); }
            else { cancelAnimationFrame(raf); }
        });
        obs.observe(canvas);
    })();

    /* ── 9. Subtle page-level background canvas (hero section) ── */
    (function setupHeroBg() {
        // The hero uses CSS dot-grid + radial gradients — no JS canvas needed.
        // We animate the SVG annotations with a gentle float.
        if (reduced) return;

        const labels = document.querySelectorAll('.viz-label');
        if (!labels.length) return;

        let t = 0;
        function animateLabels() {
            t += 0.012;
            labels.forEach((lbl, i) => {
                const offset = Math.sin(t + i * 1.2) * 2.5;
                lbl.style.transform = `translateY(${offset}px)`;
            });
            requestAnimationFrame(animateLabels);
        }
        animateLabels();
    })();

    /* ── 10. Research SVG: gentle entrance on scroll ──────────── */
    (function setupResearchViz() {
        if (reduced) return;

        const rvizEls = document.querySelectorAll('.rviz');
        if (!rvizEls.length) return;

        const obs = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'none';
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        rvizEls.forEach(el => {
            if (!reduced) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(14px)';
                el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            }
            obs.observe(el);
        });
    })();

    /* ── 11. Scroll-driven ECG SVG trigger ────────────────────── */
    (function setupECGTrigger() {
        // The ECG SVG animations are always running (CSS SVG animateElement).
        // On reduced-motion we simply hide the SVG to avoid any movement.
        if (!reduced) return;
        document.querySelectorAll('.ongoing-ecg svg animate, .cardiac-wave-svg animate, svg animate').forEach(el => {
            el.setAttribute('dur', '0s');
            el.setAttribute('repeatCount', '0');
        });
    })();

    /* ── 12. Smooth card hover depth ─────────────────────────── */
    (function setupCardHover() {
        if (reduced) return;
        document.querySelectorAll('.ritem-visual .rviz').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform   = 'translateY(-4px)';
                card.style.boxShadow   = '0 8px 32px rgba(26,39,68,.12)';
                card.style.transition  = 'transform 0.3s ease, box-shadow 0.3s ease';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform  = '';
                card.style.boxShadow  = '';
            });
        });
    })();

})();
