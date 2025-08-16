document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', function() {
        navLinks.classList.toggle('active');
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
    });

    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    // Show/hide back to top button on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
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
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Intersection Observer for section animations
    const sections = document.querySelectorAll('.section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Here you would typically send the form data to a server
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }
});