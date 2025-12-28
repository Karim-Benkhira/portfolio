// Matrix Rain Effect
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?/~`';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
    ctx.fillStyle = 'rgba(5, 8, 22, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff41';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 35);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Typing Animation
const typingText = document.querySelector('.typing-text');
const texts = [
    'Penetration Tester',
    'Red Team Operator',
    'Bug Bounty Hunter',
    'Security Researcher',
    'Cloud Security Expert'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
        typingText.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000);
});

// Navigation Scroll Effect
const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScrollTop = scrollTop;
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animate on Scroll (AOS) - Simple Implementation
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 100 &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function animateOnScroll() {
    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach(el => {
        if (isElementInViewport(el)) {
            el.classList.add('aos-animate');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Stats Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            animateCounter(entry.target, target);
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// Skills Bar Animation
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const progress = entry.target.getAttribute('data-progress');
            entry.target.style.width = progress + '%';
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-progress').forEach(skill => {
    skillsObserver.observe(skill);
});

// Particle Effect on Mouse Move (Cyber Theme)
const particles = [];
const particleCount = 50;

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = Math.random() > 0.5 ? '#00ff41' : '#0ff';
        this.life = 100;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= 2;
        if (this.size > 0.1) this.size -= 0.05;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life / 100;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

document.addEventListener('mousemove', (e) => {
    if (particles.length < particleCount) {
        particles.push(new Particle(e.clientX, e.clientY));
    }
});

function animateParticles() {
    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.life <= 0) {
            particles.splice(index, 1);
        }
    });
    requestAnimationFrame(animateParticles);
}

animateParticles();

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.add('active');
        } else {
            document.querySelector(`.nav-link[href="#${sectionId}"]`)?.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Add active class style
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color);
    }
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Glitch Effect on Hero Title (Random Trigger)
function triggerGlitch() {
    const glitchElement = document.querySelector('.glitch');
    if (glitchElement) {
        glitchElement.style.animation = 'none';
        setTimeout(() => {
            glitchElement.style.animation = '';
        }, 10);
    }
}

setInterval(triggerGlitch, 3000);

// Add cursor pointer effect
document.addEventListener('mousemove', (e) => {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    document.body.appendChild(cursor);

    setTimeout(() => {
        cursor.remove();
    }, 600);
});

// Add cursor trail style
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .cursor-trail {
        position: fixed;
        width: 10px;
        height: 10px;
        background: var(--primary-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.5;
        animation: cursorFade 0.6s ease-out forwards;
    }

    @keyframes cursorFade {
        to {
            opacity: 0;
            transform: scale(2);
        }
    }
`;
document.head.appendChild(cursorStyle);

// Console Easter Egg
console.log('%c🔐 Security Notice', 'color: #00ff41; font-size: 20px; font-weight: bold;');
console.log('%cThis is a browser feature intended for developers.', 'color: #0ff; font-size: 14px;');
console.log('%cIf someone told you to copy-paste something here, it is likely a scam.', 'color: #ff00ff; font-size: 14px;');
console.log('%c- Karim Benkhira', 'color: #00ff41; font-size: 12px; font-style: italic;');

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const throttledScroll = throttle(() => {
    animateOnScroll();
    highlightNavigation();
}, 100);

window.addEventListener('scroll', throttledScroll);

// Preloader (Optional - uncomment to enable)
/*
window.addEventListener('load', () => {
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    preloader.innerHTML = '<div class="loader"></div>';
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--darker-bg);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }, 1000);
});
*/
