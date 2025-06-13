// Component Loader Utility
class ComponentLoader {
    constructor() {
        this.loadedComponents = new Set();
        this.basePath = this.getBasePath();
    }
    
    getBasePath() {
        // Detect if we're on GitHub Pages
        if (window.location.hostname.includes('github.io')) {
            const pathParts = window.location.pathname.split('/');
            return pathParts[1] ? `/${pathParts[1]}` : '';
        }
        return '';
    }
    
    fixRelativePaths(html) {
        // Fix image sources
        html = html.replace(/src="(?!http|https|\/)([^"]+)"/g, `src="${this.basePath}/$1"`);
        
        // Fix link hrefs (but not anchors)
        html = html.replace(/href="(?!http|https|\/|#)([^"]+)"/g, `href="${this.basePath}/$1"`);
        
        // Fix script sources
        html = html.replace(/src="js\//g, `src="${this.basePath}/js/`);
        
        // If no basePath (local development), ensure paths start with ./
        if (!this.basePath) {
            html = html.replace(/src="\/([^"]+)"/g, 'src="./$1"');
            html = html.replace(/href="\/([^"]+)"/g, 'href="./$1"');
        }
        
        return html;
    }
    
    async loadComponent(componentName, targetElement) {
        try {
            // Check if element exists
            const container = typeof targetElement === 'string' 
                ? document.getElementById(targetElement) 
                : targetElement;
                
            if (!container) {
                console.error(`Container not found for component: ${componentName}`);
                return false;
            }
            
            // Load HTML
            const htmlPath = `${this.basePath}/html-components/${componentName}.html`;
            const response = await fetch(htmlPath);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            let html = await response.text();
            
            // Fix relative paths in the HTML
            html = this.fixRelativePaths(html);
            
            container.innerHTML = html;
            
            // Mark as loaded
            this.loadedComponents.add(componentName);
            
            // Dispatch event
            window.dispatchEvent(new CustomEvent('componentLoaded', {
                detail: { 
                    component: componentName,
                    container: container
                }
            }));
            
            console.log(`Component loaded: ${componentName}`);
            return true;
            
        } catch (error) {
            console.error(`Failed to load component ${componentName}:`, error);
            return false;
        }
    }
    
    async loadMultiple(components) {
        const results = [];
        
        for (const comp of components) {
            const result = await this.loadComponent(comp.name, comp.container);
            results.push({ name: comp.name, loaded: result });
        }
        
        return results;
    }
    
    isLoaded(componentName) {
        return this.loadedComponents.has(componentName);
    }
    
    // Inject a component into the current position in the DOM
    async injectComponent(componentName) {
        const script = document.currentScript;
        const container = document.createElement('div');
        container.id = `${componentName}-injected`;
        
        script.parentNode.insertBefore(container, script);
        
        return await this.loadComponent(componentName, container);
    }
}

// Create global instance
window.componentLoader = new ComponentLoader();

// Helper function for inline loading
window.loadComponent = function(name, container) {
    return window.componentLoader.loadComponent(name, container);
};
