// Component Router Configuration
const routerConfig = {
    // Component combinations for each route
    routes: {
        home: {
            components: ['hero', 'about', 'skills'],
            title: 'Home - Enrique Martinez Vargas'
        },
        about: {
            components: ['about', 'skills'],
            title: 'About - Enrique Martinez Vargas'
        },
        experience: {
            components: ['experience'],
            title: 'Experience - Enrique Martinez Vargas'
        },
        education: {
            components: ['education', 'certifications'],
            title: 'Education - Enrique Martinez Vargas'
        },
        skills: {
            components: ['skills'],
            title: 'Skills - Enrique Martinez Vargas'
        },
        certifications: {
            components: ['certifications'],
            title: 'Certifications - Enrique Martinez Vargas'
        },
        contact: {
            components: ['contact'],
            title: 'Contact - Enrique Martinez Vargas'
        },
        portfolio: {
            components: ['portfolio'],
            title: 'Portfolio - Enrique Martinez Vargas'
        }
    },
    
    // Default route
    defaultRoute: 'home',
    
    // 404 route
    notFoundRoute: {
        components: ['404'],
        title: '404 - Page Not Found'
    },
    
    // Navigation menu items
    navigation: [
        { name: 'Home', route: 'home', icon: 'fas fa-home' },
        { name: 'About', route: 'about', icon: 'fas fa-user' },
        { name: 'Experience', route: 'experience', icon: 'fas fa-briefcase' },
        { name: 'Education', route: 'education', icon: 'fas fa-graduation-cap' },
        { name: 'Skills', route: 'skills', icon: 'fas fa-cogs' },
        { name: 'Contact', route: 'contact', icon: 'fas fa-envelope' }
    ],
    
    // Component dependencies (scripts to load)
    scripts: {
        navbar: 'navbar.js',
        hero: 'hero.js',
        contact: 'contact.js'
    }
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = routerConfig;
}
