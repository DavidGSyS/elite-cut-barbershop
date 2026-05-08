/* =========================================
   ELITE CUT — Premium Barbershop Script
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ===== CUSTOM CURSOR ===== */
    const cursorDot = document.getElementById('cursorDot');
    const cursorRing = document.getElementById('cursorRing');

    if (cursorDot && cursorRing && window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX - 3 + 'px';
            cursorDot.style.top = mouseY - 3 + 'px';
        });

        const animateRing = () => {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            cursorRing.style.left = ringX - 18 + 'px';
            cursorRing.style.top = ringY - 18 + 'px';
            requestAnimationFrame(animateRing);
        };
        animateRing();

        // Cursor hover effects on interactive elements
        const interactives = document.querySelectorAll('a, button, .service-card, .gallery-item');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorRing.style.width = '50px';
                cursorRing.style.height = '50px';
                cursorRing.style.borderColor = 'rgba(201,168,76,0.8)';
                cursorRing.style.left = ringX - 25 + 'px';
                cursorRing.style.top = ringY - 25 + 'px';
            });
            el.addEventListener('mouseleave', () => {
                cursorRing.style.width = '36px';
                cursorRing.style.height = '36px';
                cursorRing.style.borderColor = 'rgba(201,168,76,0.4)';
            });
        });
    }

    /* ===== NAVBAR SCROLL ===== */
    const header = document.getElementById('mainHeader');

    const handleHeaderScroll = () => {
        if (window.scrollY > 60) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });

    /* ===== ACTIVE NAV LINK ===== */
    const navLinks = document.querySelectorAll('.nav-link:not(.btn-nav)');
    const sections = document.querySelectorAll('section[id]');

    const updateActiveLink = () => {
        const scrollPos = window.scrollY + 200;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    window.addEventListener('scroll', updateActiveLink, { passive: true });

    /* ===== MOBILE MENU ===== */
    const menuToggle = document.getElementById('menuToggle');
    const navLinksContainer = document.getElementById('navLinks');

    if (menuToggle && navLinksContainer) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinksContainer.classList.remove('active');
            });
        });
    }

    /* ===== SECTION REVEAL (IntersectionObserver) ===== */
    const revealSections = () => {
        const sectionEls = document.querySelectorAll('section');
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        sectionEls.forEach(section => sectionObserver.observe(section));
    };
    revealSections();

    /* ===== ELEMENT REVEAL ===== */
    const revealElements = () => {
        const elements = document.querySelectorAll('[data-reveal]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

        elements.forEach(el => observer.observe(el));
    };
    revealElements();

    /* ===== STATS COUNTER ===== */
    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000;
                    const startTime = performance.now();

                    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

                    const updateCounter = (currentTime) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const easedProgress = easeOutQuart(progress);
                        const current = Math.floor(easedProgress * target);
                        counter.textContent = current.toLocaleString();

                        if (progress < 1) {
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target.toLocaleString();
                        }
                    };

                    requestAnimationFrame(updateCounter);
                    counterObserver.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    };
    animateCounters();

    /* ===== HERO PARTICLES ===== */
    const createParticles = () => {
        const container = document.getElementById('heroParticles');
        if (!container) return;

        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 6 + 's';
            particle.style.animationDuration = (4 + Math.random() * 4) + 's';
            particle.style.width = (2 + Math.random() * 3) + 'px';
            particle.style.height = particle.style.width;
            container.appendChild(particle);
        }
    };
    createParticles();

    /* ===== HERO PARALLAX ===== */
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                hero.style.backgroundPositionY = scrolled * 0.4 + 'px';
            }
        }, { passive: true });
    }

    /* ===== FORM HANDLING ===== */
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.btn');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span>✓ ¡Solicitud Enviada!</span>';
            btn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';

            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                contactForm.reset();
            }, 3000);
        });
    }

    /* ===== SMOOTH SCROLL FOR SAFARI ===== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});