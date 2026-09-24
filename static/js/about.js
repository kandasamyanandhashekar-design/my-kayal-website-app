document.addEventListener('DOMContentLoaded', function() {
    // ===== COUNTER ANIMATION =====
    const counters = document.querySelectorAll('.counter');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                let current = 0;
                const duration = 2000;
                const steps = 60;
                const increment = target / steps;
                let step = 0;

                const timer = setInterval(() => {
                    step++;
                    current += increment;
                    if (step >= steps) {
                        entry.target.textContent = target;
                        clearInterval(timer);
                    } else {
                        entry.target.textContent = Math.floor(current);
                    }
                }, duration / steps);

                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    counters.forEach(counter => counterObserver.observe(counter));

    // ===== FADE IN ANIMATION =====
    const fadeElements = document.querySelectorAll('.about-section, .mv-section, .values-section, .why-section, .cta-section');

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.15 });

    fadeElements.forEach((el, index) => {
        el.classList.add('fade-in');
        el.style.transitionDelay = `${index * 0.1}s`;
        fadeObserver.observe(el);
    });

    // ===== HERO SCROLL EFFECTS =====
    const heroContent = document.querySelector('.hero-content');
    const heroBg = document.querySelector('.hero-bg');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    let isFaded = false;

    window.addEventListener('scroll', function() {
        const scrollY = window.scrollY;

        // Fade hero content on scroll
        if (heroContent) {
            if (scrollY > 100 && !isFaded) {
                heroContent.classList.add('fade-out');
                isFaded = true;
            } else if (scrollY <= 100 && isFaded) {
                heroContent.classList.remove('fade-out');
                isFaded = false;
            }
        }

        // Parallax background zoom effect
        if (heroBg) {
            const scale = 1 + (scrollY * 0.0003);
            heroBg.style.transform = `scale(${scale})`;
        }

        // Hide scroll indicator on scroll
        if (scrollIndicator) {
            if (scrollY > 200) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.transition = 'opacity 0.5s ease';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        }
    });

    // ===== SMOOTH SCROLL FOR NAVIGATION =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});