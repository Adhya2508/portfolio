// ========================
// NAVBAR: scroll effect + active link tracking
// ========================
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    // Scrolled class
    if (window.scrollY > 30) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active link
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ========================
// MOBILE MENU TOGGLE
// ========================
const menuToggle = document.getElementById('menuToggle');
const navLinksWrapper = document.getElementById('navLinks');

if (menuToggle && navLinksWrapper) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinksWrapper.classList.toggle('open');
    });

    // Close on nav link click
    navLinksWrapper.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinksWrapper.classList.remove('open');
        });
    });
}

// ========================
// SMOOTH SCROLL
// ========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ========================
// TYPED TEXT ANIMATION
// ========================
const typedEl = document.querySelector('.typed-text');
if (typedEl) {
    const phrases = [
        'Intelligent Systems',
        'Full-Stack Apps',
        'AI/ML Pipelines',
        'Cloud Solutions',
        'NLP Applications',
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function type() {
        const current = phrases[phraseIdx];
        if (isDeleting) {
            typedEl.textContent = current.substring(0, charIdx - 1);
            charIdx--;
            typingSpeed = 50;
        } else {
            typedEl.textContent = current.substring(0, charIdx + 1);
            charIdx++;
            typingSpeed = 90;
        }

        if (!isDeleting && charIdx === current.length) {
            typingSpeed = 1800;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            typingSpeed = 400;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

// ========================
// SCROLL REVEAL ANIMATION
// ========================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

const animatedEls = document.querySelectorAll(
    '.timeline-card, .project-card, .skill-category, .ach-item, .edu-card, .contact-card'
);

animatedEls.forEach((el, idx) => {
    el.style.transitionDelay = `${(idx % 4) * 80}ms`;
    revealObserver.observe(el);
});

// ========================
// 3D TILT ON CARDS
// ========================
document.querySelectorAll('.project-card, .timeline-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-6px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});