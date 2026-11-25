(function () {
    'use strict';

    const nav = document.getElementById('site-nav');
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.getElementById('primary-navigation');

    function closeMenu() {
        if (!toggle || !menu) return;
        toggle.classList.remove('open');
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Open navigation menu');
        document.body.style.overflow = '';
    }

    function openMenu() {
        if (!toggle || !menu) return;
        toggle.classList.add('open');
        menu.classList.add('open');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', 'Close navigation menu');
        document.body.style.overflow = 'hidden';
    }

    if (toggle && menu) {
        toggle.addEventListener('click', function () {
            menu.classList.contains('open') ? closeMenu() : openMenu();
        });
        menu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') closeMenu();
        });
        document.addEventListener('click', function (event) {
            if (!menu.contains(event.target) && !toggle.contains(event.target)) closeMenu();
        });
        window.addEventListener('resize', function () {
            if (window.innerWidth > 768) closeMenu();
        });
    }

    const navLinks = Array.from(document.querySelectorAll('.nav-links a'));
    const sections = navLinks.map(function (link) {
        return document.querySelector(link.getAttribute('href'));
    }).filter(Boolean);

    function updateActiveLink() {
        const position = window.scrollY + 140;
        let activeIndex = -1;
        sections.forEach(function (section, index) {
            if (section.offsetTop <= position) activeIndex = index;
        });
        navLinks.forEach(function (link, index) {
            link.classList.toggle('active', index === activeIndex);
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (event) {
            const target = document.querySelector(link.getAttribute('href'));
            if (!target) return;
            event.preventDefault();
            const offset = nav ? nav.offsetHeight : 68;
            window.scrollTo({
                top: target.offsetTop - offset,
                behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
            });
        });
    });

    const year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());

    const form = document.getElementById('contactForm');
    const submit = document.getElementById('submitBtn');
    const feedback = document.getElementById('formFeedback');

    if (form && submit && feedback) {
        form.addEventListener('submit', async function (event) {
            event.preventDefault();

            const fields = {
                name: document.getElementById('name'),
                email: document.getElementById('email'),
                subject: document.getElementById('subject'),
                message: document.getElementById('message')
            };
            const errors = {
                name: document.getElementById('nameErr'),
                email: document.getElementById('emailErr'),
                subject: document.getElementById('subjectErr'),
                message: document.getElementById('msgErr')
            };

            Object.keys(errors).forEach(function (key) {
                errors[key].textContent = '';
                fields[key].removeAttribute('aria-invalid');
            });

            let valid = true;
            Object.keys(fields).forEach(function (key) {
                if (!fields[key].value.trim()) {
                    errors[key].textContent = 'This field is required.';
                    fields[key].setAttribute('aria-invalid', 'true');
                    valid = false;
                }
            });
            if (fields.email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.value.trim())) {
                errors.email.textContent = 'Enter a valid email address.';
                fields.email.setAttribute('aria-invalid', 'true');
                valid = false;
            }
            if (!valid) {
                const firstInvalid = Object.keys(fields).find(function (key) {
                    return fields[key].getAttribute('aria-invalid') === 'true' || !fields[key].value.trim();
                });
                if (firstInvalid) fields[firstInvalid].focus();
                return;
            }

            submit.disabled = true;
            submit.textContent = 'Sending…';
            feedback.textContent = '';

            try {
                const response = await fetch('/', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams(new FormData(form)).toString()
                });
                if (!response.ok) throw new Error('Submission failed');
                form.reset();
                feedback.textContent = 'Thank you. Your message was submitted successfully.';
            } catch (error) {
                feedback.textContent = 'The form could not be submitted. Please try again or email shreyassalian1806@gmail.com directly.';
            } finally {
                submit.disabled = false;
                submit.textContent = 'Send Message';
            }
        });
    }
})();
