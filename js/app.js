// Main Application Controller
class App {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'es'; // Default to Spanish
        this.translations = {};
        this.components = {};
        this.init();
    }

    async init() {
        try {
            // Load translations
            await this.loadTranslations();
            
            // Load profile data
            await this.loadProfileData();
            
            // Initialize components
            await this.initializeComponents();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Render initial content
            this.render();
            
            // Initialize animations
            this.initAnimations();
            
        } catch (error) {
            console.error('Error initializing app:', error);
        }
    }

    async loadTranslations() {
        try {
            const enResponse = await fetch('lang/en.json');
            const esResponse = await fetch('lang/es.json');
            
            this.translations.en = await enResponse.json();
            this.translations.es = await esResponse.json();
        } catch (error) {
            console.error('Error loading translations:', error);
        }
    }

    async loadProfileData() {
        try {
            const files = [
                'profile.json',
                'experience.json',
                'education.json',
                'skills.json',
                'certifications.json',
                'contact.json',
                'summary.json'
            ];

            const promises = files.map(file => fetch(file).then(res => res.json()));
            const data = await Promise.all(promises);
            
            this.profileData = {
                profile: data[0],
                experience: data[1],
                education: data[2],
                skills: data[3],
                certifications: data[4],
                contact: data[5],
                summary: data[6]
            };
        } catch (error) {
            console.error('Error loading profile data:', error);
        }
    }

    async initializeComponents() {
        // Import all components
        const componentModules = [
            'navbar',
            'hero',
            'about',
            'experience',
            'education',
            'skills',
            'certifications',
            'portfolio',
            'contact',
            'footer'
        ];

        for (const module of componentModules) {
            try {
                const component = await import(`./components/${module}.js`);
                this.components[module] = component.default;
            } catch (error) {
                console.warn(`Could not load component ${module}:`, error);
            }
        }
    }

    setupEventListeners() {
        // Language switcher
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-lang]')) {
                this.switchLanguage(e.target.dataset.lang);
            }
        });

        // Smooth scrolling
        document.addEventListener('click', (e) => {
            if (e.target.matches('a[href^="#"]')) {
                e.preventDefault();
                const target = document.querySelector(e.target.getAttribute('href'));
                if (target) {
                    const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
                    const targetPosition = target.offsetTop - navHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });

        // Mobile menu toggle
        document.addEventListener('click', (e) => {
            if (e.target.closest('.nav-toggle')) {
                document.querySelector('.nav-menu')?.classList.toggle('active');
                e.target.closest('.nav-toggle')?.classList.toggle('active');
            }
        });

        // Close mobile menu on link click
        document.addEventListener('click', (e) => {
            if (e.target.matches('.nav-menu a')) {
                document.querySelector('.nav-menu')?.classList.remove('active');
                document.querySelector('.nav-toggle')?.classList.remove('active');
            }
        });

        // Navbar scroll effect
        window.addEventListener('scroll', this.handleNavbarScroll);

        // Form submission
        document.addEventListener('submit', (e) => {
            if (e.target.matches('#contact-form')) {
                e.preventDefault();
                this.handleContactForm(e.target);
            }
        });
    }

    handleNavbarScroll() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }

    switchLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        this.render();
        
        // Update language buttons
        document.querySelectorAll('[data-lang]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
    }

    getTranslation(key) {
        const keys = key.split('.');
        let value = this.translations[this.currentLang];
        
        for (const k of keys) {
            value = value?.[k];
        }
        
        return value || key;
    }

    render() {
        const app = document.getElementById('app');
        if (!app) return;

        const t = this.translations[this.currentLang];
        const data = this.profileData;

        app.innerHTML = `
            ${this.renderComponent('navbar', { t, data })}
            ${this.renderComponent('hero', { t, data })}
            ${this.renderComponent('about', { t, data })}
            ${this.renderComponent('experience', { t, data })}
            ${this.renderComponent('education', { t, data })}
            ${this.renderComponent('skills', { t, data })}
            ${this.renderComponent('certifications', { t, data })}
            ${this.renderComponent('portfolio', { t, data })}
            ${this.renderComponent('contact', { t, data })}
            ${this.renderComponent('footer', { t, data })}
        `;

        // Re-initialize animations after render
        setTimeout(() => this.initAnimations(), 100);
    }

    renderComponent(name, props) {
        const component = this.components[name];
        if (component && typeof component === 'function') {
            return component(props);
        }
        return '';
    }

    initAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Add animation classes to elements
        const animateElements = [
            '.stat-item',
            '.timeline-item',
            '.education-card',
            '.skill-category',
            '.cert-card',
            '.about-content',
            '.contact-content',
            '.portfolio-item'
        ];

        animateElements.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                el.classList.add('animate-on-scroll');
                observer.observe(el);
            });
        });

        // Parallax effect for hero
        this.initParallax();
        
        // Typing effect for hero title
        this.initTypingEffect();
    }

    initParallax() {
        const hero = document.querySelector('.hero');
        if (hero) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallax = hero.querySelector('.hero-content');
                if (parallax) {
                    parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
                }
            });
        }
    }

    initTypingEffect() {
        const titleElement = document.querySelector('.hero-title');
        if (titleElement && !titleElement.classList.contains('typed')) {
            const text = titleElement.textContent;
            titleElement.textContent = '';
            titleElement.classList.add('typed');
            
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    titleElement.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            };
            
            setTimeout(typeWriter, 500);
        }
    }

    // Download CV functionality
    downloadCV() {
        // Create a download link for the CV
        const cvData = this.generateCVData();
        const blob = new Blob([JSON.stringify(cvData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Enrique_Martinez_Vargas_CV_${this.currentLang}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showNotification(
            this.getTranslation('common.success'),
            'CV downloaded successfully!',
            'success'
        );
    }

    generateCVData() {
        return {
            personal: this.profileData.profile,
            experience: this.profileData.experience,
            education: this.profileData.education,
            skills: this.profileData.skills,
            certifications: this.profileData.certifications,
            languages: this.profileData.languages,
            contact: this.profileData.contact
        };
    }

    // View project details
    viewProject(projectId) {
        // This would open a modal or navigate to project details
        console.log('Viewing project:', projectId);
        this.showNotification(
            'Project Details',
            'Project details feature coming soon!',
            'info'
        );
    }

    async handleContactForm(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = this.getTranslation('common.loading');
        submitBtn.disabled = true;
        
        try {
            // In a real application, you would send this to a server
            // For now, we'll just show a success message
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show success message
            this.showNotification(
                this.getTranslation('common.success'),
                'Your message has been sent successfully!',
                'success'
            );
            
            // Reset form
            form.reset();
        } catch (error) {
            this.showNotification(
                this.getTranslation('common.error'),
                'There was an error sending your message.',
                'error'
            );
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    showNotification(title, message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
            <button class="notification-close">&times;</button>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => this.removeNotification(notification), 5000);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.removeNotification(notification);
        });
    }

    removeNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
    
    // Hide loading screen after a short delay
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    }, 1000);
});