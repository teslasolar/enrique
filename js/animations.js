// Animation Controller
import { isInViewport, animateCounter, debounce, throttle } from './utils.js';

class AnimationController {
    constructor() {
        this.observers = new Map();
        this.animations = new Map();
        this.init();
    }

    init() {
        // Initialize intersection observers
        this.setupObservers();
        
        // Setup scroll animations
        this.setupScrollAnimations();
        
        // Initialize particle effects
        this.initParticles();
        
        // Start animations
        this.startAnimations();
        
        // Setup resize handler
        window.addEventListener('resize', debounce(() => this.handleResize(), 300));
    }

    setupObservers() {
        // Standard reveal observer
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Trigger specific animations
                    if (entry.target.classList.contains('stat-number')) {
                        this.animateStatNumber(entry.target);
                    }
                    
                    // Stagger children animations
                    if (entry.target.classList.contains('stagger-children')) {
                        this.staggerChildren(entry.target);
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        this.observers.set('reveal', revealObserver);

        // Hero observer for parallax
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    window.addEventListener('scroll', this.heroParallax);
                } else {
                    window.removeEventListener('scroll', this.heroParallax);
                }
            });
        });

        this.observers.set('hero', heroObserver);
    }

    setupScrollAnimations() {
        // Progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);

        // Update on scroll
        window.addEventListener('scroll', throttle(() => {
            this.updateScrollProgress(progressBar);
            this.updateBackToTop();
        }, 100));
    }

    updateScrollProgress(progressBar) {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = `${scrollPercentage}%`;
    }

    updateBackToTop() {
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            backToTop.classList.toggle('visible', window.scrollY > 500);
        }
    }

    heroParallax = throttle(() => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const speed = 0.5;
            const yPos = -(scrolled * speed);
            hero.style.transform = `translateY(${yPos}px)`;
        }
    }, 16);

    animateStatNumber(element) {
        const endValue = parseInt(element.dataset.count);
        const duration = 2000;
        animateCounter(element, 0, endValue, duration);
    }

    staggerChildren(parent) {
        parent.classList.add('animated');
    }

    initParticles() {
        const particlesContainer = document.querySelector('.hero-particles');
        if (particlesContainer && window.particlesJS) {
            particlesJS('hero-particles', {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: '#ffffff' },
                    shape: { type: 'circle' },
                    opacity: { value: 0.5, random: false },
                    size: { value: 3, random: true },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#ffffff',
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: false,
                        straight: false,
                        out_mode: 'out',
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: { enable: true, mode: 'grab' },
                        onclick: { enable: true, mode: 'push' },
                        resize: true
                    },
                    modes: {
                        grab: { distance: 140, line_linked: { opacity: 1 } },
                        push: { particles_nb: 4 }
                    }
                },
                retina_detect: true
            });
        }
    }

    startAnimations() {
        // Observe all animatable elements
        const animatableElements = document.querySelectorAll('.animate-on-scroll, .reveal, .reveal-left, .reveal-right');
        const revealObserver = this.observers.get('reveal');
        
        animatableElements.forEach(el => {
            revealObserver.observe(el);
        });

        // Observe hero section
        const hero = document.querySelector('.hero');
        if (hero) {
            const heroObserver = this.observers.get('hero');
            heroObserver.observe(hero);
        }

        // Initialize typing effect
        this.initTypingEffect();

        // Initialize tilt effects
        this.initTiltEffects();

        // Initialize counter animations
        this.initCounterAnimations();
    }

    initTypingEffect() {
        const typedElements = document.querySelectorAll('[data-typed]');
        typedElements.forEach(element => {
            const strings = element.dataset.typed.split('|');
            new Typed(element, {
                strings: strings,
                typeSpeed: 50,
                backSpeed: 30,
                backDelay: 2000,
                loop: true
            });
        });
    }

    initTiltEffects() {
        const tiltElements = document.querySelectorAll('.tilt');
        tiltElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / centerY * 10;
                const rotateY = (centerX - x) / centerX * 10;
                
                element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            element.addEventListener('mouseleave', () => {
                element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
    }

    initCounterAnimations() {
        const counters = document.querySelectorAll('[data-counter]');
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    entry.target.classList.add('counted');
                    const endValue = parseInt(entry.target.dataset.counter);
                    animateCounter(entry.target, 0, endValue, 2000);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    handleResize() {
        // Reinitialize animations that depend on viewport size
        this.initParticles();
    }

    // Public methods
    triggerAnimation(element, animationClass) {
        element.classList.add(animationClass);
        element.addEventListener('animationend', () => {
            element.classList.remove(animationClass);
        }, { once: true });
    }

    addCustomAnimation(name, animationFunction) {
        this.animations.set(name, animationFunction);
    }

    runCustomAnimation(name, element) {
        const animation = this.animations.get(name);
        if (animation) {
            animation(element);
        }
    }
}

// Initialize animation controller when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.animationController = new AnimationController();
});

// Export for use in other modules
export default AnimationController;