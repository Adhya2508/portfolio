document.querySelector('.theme svg').addEventListener('click', () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
});

document.addEventListener('DOMContentLoaded', () => {
    const typingElements = document.querySelectorAll('.typing-animation');
    typingElements.forEach(element => {
       
        const textLength = element.textContent.length;
        element.style.setProperty('--text-length', textLength);
        
        element.addEventListener('animationend', () => {
            element.classList.add('done');
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideUp 0.8s ease forwards';
            }
        });
    }, { threshold: 0.1 });
    const aboutContent = document.querySelector('.about-content');
    if (aboutContent) {
        observer.observe(aboutContent);
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Select the element
    const textElement = document.querySelector(".text-animation span");

    // Add a click event listener
    textElement.addEventListener("click", () => {
        // Toggle between 'default-class' and 'toggle-class'
        if (textElement.classList.contains("text-animation span")) {
            textElement.classList.remove("text-animation span");
            textElement.classList.add("hehe span");
        } else {
            textElement.classList.remove("hehe span");
            textElement.classList.add("text-animation span");
        }
    });
});

// Mouse move effect for cards
document.querySelectorAll('.project-card, .achievement-list li, .social-link').forEach(element => {
    element.addEventListener('mousemove', e => {
        const rect = element.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / element.clientWidth) * 100;
        const y = ((e.clientY - rect.top) / element.clientHeight) * 100;
        element.style.setProperty('--x', `${x}%`);
        element.style.setProperty('--y', `${y}%`);
    });
});

// Smooth section reveal on scroll
const revealSection = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
};

const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
});

document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    sectionObserver.observe(section);
});