export default function portfolio({ t, data }) {
    // Mock portfolio items - in a real app, these would come from data
    const portfolioItems = [
        {
            id: 1,
            title: t.portfolio.processOptimization,
            description: window.app?.currentLang === 'es' 
                ? 'Optimización del proceso de elaboración que resultó en 15% de reducción de costos'
                : 'Brewing process optimization resulting in 15% cost reduction',
            technologies: ['MATLAB', 'Excel', 'SAP'],
            impact: window.app?.currentLang === 'es'
                ? '15% reducción de costos, 20% aumento en eficiencia'
                : '15% cost reduction, 20% efficiency increase',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop'
        },
        {
            id: 2,
            title: t.portfolio.qualityImprovement,
            description: window.app?.currentLang === 'es'
                ? 'Implementación de sistema de control de calidad para productos de chocolate'
                : 'Quality control system implementation for chocolate products',
            technologies: ['Six Sigma', 'Statistical Analysis', 'Python'],
            impact: window.app?.currentLang === 'es'
                ? '30% reducción en defectos, 25% mejora en satisfacción del cliente'
                : '30% defect reduction, 25% customer satisfaction improvement',
            image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=600&h=400&fit=crop'
        },
        {
            id: 3,
            title: t.portfolio.sustainabilityProject,
            description: window.app?.currentLang === 'es'
                ? 'Proyecto de sostenibilidad para reducir desperdicios y emisiones'
                : 'Sustainability project to reduce waste and emissions',
            technologies: ['LCA Software', 'AutoCAD', 'Process Simulation'],
            impact: window.app?.currentLang === 'es'
                ? '40% reducción en desperdicios, 25% reducción en emisiones de CO2'
                : '40% waste reduction, 25% CO2 emissions reduction',
            image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=400&fit=crop'
        }
    ];
    
    return `
        <section id="portfolio" class="section section-alt">
            <div class="container">
                <h2 class="section-title">${t.portfolio.title}</h2>
                <div class="portfolio-grid">
                    ${portfolioItems.map((item, index) => `
                        <div class="portfolio-item" data-aos="fade-up" data-aos-delay="${index * 100}">
                            <div class="portfolio-image">
                                <img src="${item.image}" alt="${item.title}" loading="lazy">
                                <div class="portfolio-overlay">
                                    <button class="portfolio-view" onclick="window.app.viewProject(${item.id})">
                                        ${t.portfolio.viewDetails}
                                    </button>
                                </div>
                            </div>
                            <div class="portfolio-content">
                                <h3>${item.title}</h3>
                                <p>${item.description}</p>
                                <div class="portfolio-meta">
                                    <div class="portfolio-tech">
                                        <strong>${t.portfolio.technologies}:</strong>
                                        <div class="tech-tags">
                                            ${item.technologies.map(tech => 
                                                `<span class="tech-tag">${tech}</span>`
                                            ).join('')}
                                        </div>
                                    </div>
                                    <div class="portfolio-impact">
                                        <strong>${t.portfolio.impact}:</strong>
                                        <p>${item.impact}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `;
}