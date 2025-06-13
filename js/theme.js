// Theme Management
class ThemeManager {
    constructor() {
        this.themes = ['default', 'dark', 'chocolate', 'beer', 'ocean', 'forest', 'sunset', 'purple', 'high-contrast'];
        this.currentTheme = this.getStoredTheme() || this.getSystemTheme();
        this.init();
    }

    init() {
        // Apply initial theme
        this.applyTheme(this.currentTheme);
        
        // Create theme selector
        this.createThemeSelector();
        
        // Listen for system theme changes
        this.listenForSystemThemeChanges();
        
        // Setup event listeners
        this.setupEventListeners();
    }

    getStoredTheme() {
        return localStorage.getItem('theme');
    }

    getSystemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default';
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
        
        // Update theme toggle icon
        this.updateThemeIcon(theme);
        
        // Update theme selector
        this.updateThemeSelector(theme);
    }

    updateThemeIcon(theme) {
        const themeToggle = document.querySelector('.theme-toggle i');
        if (themeToggle) {
            if (theme === 'dark' || theme === 'high-contrast') {
                themeToggle.className = 'fas fa-sun';
            } else {
                themeToggle.className = 'fas fa-moon';
            }
        }
    }

    createThemeSelector() {
        const selector = document.createElement('div');
        selector.className = 'theme-selector';
        selector.innerHTML = `
            <h4>Choose Theme</h4>
            <div class="theme-options">
                ${this.themes.map(theme => `
                    <button class="theme-option ${theme === this.currentTheme ? 'active' : ''}" 
                            data-theme="${theme}" 
                            title="${this.getThemeName(theme)}"
                            aria-label="Switch to ${this.getThemeName(theme)} theme">
                    </button>
                `).join('')}
            </div>
        `;
        
        document.body.appendChild(selector);
    }

    getThemeName(theme) {
        const names = {
            'default': 'Default',
            'dark': 'Dark',
            'chocolate': 'Chocolate',
            'beer': 'Brewery',
            'ocean': 'Ocean',
            'forest': 'Forest',
            'sunset': 'Sunset',
            'purple': 'Purple',
            'high-contrast': 'High Contrast'
        };
        return names[theme] || theme;
    }

    updateThemeSelector(theme) {
        const options = document.querySelectorAll('.theme-option');
        options.forEach(option => {
            option.classList.toggle('active', option.dataset.theme === theme);
        });
    }

    toggleThemeSelector() {
        const selector = document.querySelector('.theme-selector');
        if (selector) {
            selector.classList.toggle('active');
        }
    }

    setupEventListeners() {
        // Theme toggle button
        document.addEventListener('click', (e) => {
            if (e.target.closest('.theme-toggle')) {
                e.preventDefault();
                this.toggleThemeSelector();
            }
        });

        // Theme options
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('theme-option')) {
                const theme = e.target.dataset.theme;
                this.applyTheme(theme);
                this.toggleThemeSelector();
            }
        });

        // Close theme selector when clicking outside
        document.addEventListener('click', (e) => {
            const selector = document.querySelector('.theme-selector');
            const toggle = document.querySelector('.theme-toggle');
            
            if (selector && !selector.contains(e.target) && !toggle.contains(e.target)) {
                selector.classList.remove('active');
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Shift + T to toggle theme selector
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.toggleThemeSelector();
            }
            
            // Ctrl/Cmd + Shift + D to toggle dark mode
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                const newTheme = this.currentTheme === 'dark' ? 'default' : 'dark';
                this.applyTheme(newTheme);
            }
        });
    }

    listenForSystemThemeChanges() {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        darkModeQuery.addEventListener('change', (e) => {
            // Only auto-switch if user hasn't manually selected a theme
            if (!this.getStoredTheme()) {
                this.applyTheme(e.matches ? 'dark' : 'default');
            }
        });
    }

    // Cycle through themes
    cycleTheme() {
        const currentIndex = this.themes.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % this.themes.length;
        this.applyTheme(this.themes[nextIndex]);
    }

    // Get theme colors for charts and visualizations
    getThemeColors() {
        const computedStyle = getComputedStyle(document.documentElement);
        return {
            primary: computedStyle.getPropertyValue('--primary-color').trim(),
            secondary: computedStyle.getPropertyValue('--secondary-color').trim(),
            accent: computedStyle.getPropertyValue('--accent-color').trim(),
            background: computedStyle.getPropertyValue('--background-color').trim(),
            surface: computedStyle.getPropertyValue('--surface-color').trim(),
            text: computedStyle.getPropertyValue('--text-primary').trim(),
            textSecondary: computedStyle.getPropertyValue('--text-secondary').trim()
        };
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
});

// Export for use in other modules
export default ThemeManager;