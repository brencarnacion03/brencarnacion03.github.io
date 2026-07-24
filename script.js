// ===== TYPING ANIMATION =====
class TypeWriter {
    constructor(element, text, speed = 50, callback = null) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.callback = callback;
        this.index = 0;
    }

    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            // Add keystroke sound effect visually
            this.createKeystrokeEffect();
            setTimeout(() => this.type(), this.speed + Math.random() * 30);
        } else if (this.callback) {
            this.callback();
        }
    }

    createKeystrokeEffect() {
        const char = this.text.charAt(this.index - 1);
        if (char === ' ') return;
        
        const effect = document.createElement('span');
        effect.className = 'keypress-effect';
        effect.textContent = char;
        effect.style.left = `${Math.random() * window.innerWidth}px`;
        effect.style.top = `${Math.random() * window.innerHeight}px`;
        document.body.appendChild(effect);
        
        setTimeout(() => effect.remove(), 800);
    }
}

// ===== HERO TYPING ANIMATION =====
document.addEventListener('DOMContentLoaded', () => {
    const heroTyped = document.getElementById('hero-typed');
    const heroOutput = document.getElementById('hero-output');
    
    const writer = new TypeWriter(
        heroTyped,
        'cat welcome.txt',
        80,
        () => {
            setTimeout(() => {
                heroOutput.classList.add('visible');
            }, 300);
        }
    );

    setTimeout(() => writer.type(), 1000);

    // Initialize other features
    initKeyboardBackground();
    initFloatingKeys();
    initScrollAnimations();
    initNavigation();
    initKeyboardListener();
    initMatrixRain();
    initContactForm();
    initSlideshow();
});

// ===== KEYBOARD BACKGROUND PARTICLES =====
function initKeyboardBackground() {
    const container = document.getElementById('keyboard-bg');
    const keys = ['⌘', '⌥', '⇧', '⏎', '⇥', '⌫', '{', '}', '(', ')', '<', '>', '/', '*', '=', '+', ';', ':', '#', '0', '1'];
    
    function createParticle() {
        const particle = document.createElement('span');
        particle.className = 'key-particle';
        particle.textContent = keys[Math.floor(Math.random() * keys.length)];
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${6 + Math.random() * 6}s`;
        particle.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(particle);

        setTimeout(() => particle.remove(), 12000);
    }

    // Create initial batch
    for (let i = 0; i < 15; i++) {
        setTimeout(() => createParticle(), i * 200);
    }

    // Keep creating particles
    setInterval(createParticle, 800);
}

// ===== FLOATING KEYS IN HERO =====
function initFloatingKeys() {
    const container = document.getElementById('floating-keys');
    const keyLabels = ['Ctrl', 'Alt', 'Fn', 'Esc', 'Tab', '⇧', '⌘', 'Enter', 'Space', '{}', '[]', '</>'];
    
    keyLabels.forEach((label, i) => {
        const key = document.createElement('div');
        key.className = 'floating-key';
        key.textContent = label;
        key.style.left = `${10 + Math.random() * 80}%`;
        key.style.top = `${10 + Math.random() * 80}%`;
        key.style.animationDelay = `${i * 0.5}s`;
        key.style.animationDuration = `${4 + Math.random() * 4}s`;
        container.appendChild(key);
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe section titles
    document.querySelectorAll('.section-title').forEach(el => observer.observe(el));
    
    // Observe terminal cards
    document.querySelectorAll('.terminal-card').forEach(el => observer.observe(el));
    
    // Observe typing reveals
    document.querySelectorAll('.typing-reveal').forEach(el => observer.observe(el));
}

// ===== NAVIGATION =====
function initNavigation() {
    const nav = document.getElementById('nav');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

// ===== REAL-TIME KEYBOARD LISTENER =====
function initKeyboardListener() {
    document.addEventListener('keydown', (e) => {
        // Show keystroke on screen
        const effect = document.createElement('div');
        effect.className = 'keypress-effect';
        effect.textContent = e.key.length === 1 ? e.key : `[${e.key}]`;
        effect.style.left = `${Math.random() * (window.innerWidth - 60)}px`;
        effect.style.top = `${Math.random() * (window.innerHeight - 40)}px`;
        document.body.appendChild(effect);

        setTimeout(() => effect.remove(), 800);
    });
}

// ===== MATRIX RAIN =====
function initMatrixRain() {
    const chars = '01アイウエオカキクケコサシスセソタチツテト';
    const columns = Math.floor(window.innerWidth / 30);

    for (let i = 0; i < Math.min(columns, 20); i++) {
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = `${(i / columns) * 100}%`;
        column.style.animationDuration = `${8 + Math.random() * 12}s`;
        column.style.animationDelay = `${Math.random() * 5}s`;
        
        let text = '';
        for (let j = 0; j < 30; j++) {
            text += chars[Math.floor(Math.random() * chars.length)] + '\n';
        }
        column.textContent = text;
        document.body.appendChild(column);
    }
}

// ===== CONTACT FORM =====
function initContactForm() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('.submit-btn');
        const btnText = btn.querySelector('.btn-text');
        const btnLoading = btn.querySelector('.btn-loading');
        
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline';
        
        // Simulate sending (replace with actual form handler like Formspree/Netlify)
        setTimeout(() => {
            btnText.textContent = '$ message_sent [SUCCESS]';
            btnText.style.display = 'inline';
            btnLoading.style.display = 'none';
            btn.style.borderColor = '#50fa7b';
            btn.style.color = '#50fa7b';
            
            form.reset();
            
            setTimeout(() => {
                btnText.textContent = '$ send_message --execute';
                btn.style.borderColor = '';
                btn.style.color = '';
            }, 3000);
        }, 1500);
    });
}

// ===== SMOOTH SCROLL FOR HASH LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== CUSTOM CURSOR TRAIL (subtle) =====
let trail = [];
const trailLength = 8;

// ===== SLIDESHOW =====
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const dotsContainer = document.getElementById('slide-dots');
    
    if (!slides.length || !prevBtn || !nextBtn) return;

    let currentSlide = 0;
    let autoPlayInterval;

    // Create dots
    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = `slide-dot${i === 0 ? ' active' : ''}`;
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });

    function goToSlide(index, direction = 'right') {
        const dots = document.querySelectorAll('.slide-dot');
        
        // Remove active from current
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');

        // Update index
        currentSlide = index;
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;

        // Add active to new slide
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentSlide + 1, 'right');
    }

    function prevSlide() {
        goToSlide(currentSlide - 1, 'left');
    }

    // Controls
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });

    // Auto-play
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 4000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    startAutoPlay();

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { nextSlide(); resetAutoPlay(); }
        if (e.key === 'ArrowLeft') { prevSlide(); resetAutoPlay(); }
    });
}

document.addEventListener('mousemove', (e) => {
    const dot = document.createElement('div');
    dot.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: var(--accent-green);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9997;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        opacity: 0.6;
        transition: opacity 0.5s, transform 0.5s;
    `;
    document.body.appendChild(dot);
    trail.push(dot);

    setTimeout(() => {
        dot.style.opacity = '0';
        dot.style.transform = 'scale(0)';
    }, 100);

    setTimeout(() => {
        dot.remove();
        trail.shift();
    }, 600);

    // Limit trail elements
    if (trail.length > trailLength) {
        const old = trail.shift();
        old.remove();
    }
});
