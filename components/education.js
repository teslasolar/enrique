export default function education({ t, data }) {
    const education = data?.education?.education?.[0] || {};
    
    return `
        <section id="education" class="section">
            <div class="container">
                <h2 class="section-title">${t.education.title}</h2>
                <div class="education-wrapper">
                    <div class="education-card">
                        <div class="education-icon">
                            <i class="fas fa-graduation-cap"></i>
                        </div>
                        <div class="education-content">
                            <h3>${education.institution}</h3>
                            <p class="degree">${education.fieldOfStudy}</p>
                            <p class="degree-english">${t.education.degree}</p>
                            <p class="education-period">
                                <i class="fas fa-calendar"></i> ${education.startDate} - ${education.endDate}
                            </p>
                        </div>
                        <div class="education-decoration">
                            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                                <path fill="#2563eb20" d="M47.9,-65.9C59.4,-59.4,64.7,-43.1,68.8,-26.8C72.9,-10.5,75.8,5.8,72.3,21.2C68.8,36.6,58.9,51.1,45.2,60.7C31.5,70.3,14,75,-4.9,75.1C-23.8,75.2,-44.3,70.7,-58.5,60.3C-72.7,49.9,-80.6,33.5,-82.9,16.2C-85.2,-1.1,-81.9,-19.3,-73.4,-34.4C-64.9,-49.5,-51.2,-61.5,-36.2,-66.7C-21.2,-71.9,-4.9,-70.3,7.3,-62.6C19.5,-54.8,36.4,-72.4,47.9,-65.9Z" transform="translate(100 100)" />
                            </svg>
                        </div>
                    </div>
                    <div class="education-highlights">
                        <h4>${window.app?.currentLang === 'es' ? 'Áreas de Enfoque' : 'Focus Areas'}</h4>
                        <div class="highlight-grid">
                            <div class="highlight-item">
                                <i class="fas fa-flask"></i>
                                <span>${window.app?.currentLang === 'es' ? 'Química Orgánica' : 'Organic Chemistry'}</span>
                            </div>
                            <div class="highlight-item">
                                <i class="fas fa-cogs"></i>
                                <span>${window.app?.currentLang === 'es' ? 'Ingeniería de Procesos' : 'Process Engineering'}</span>
                            </div>
                            <div class="highlight-item">
                                <i class="fas fa-chart-line"></i>
                                <span>${window.app?.currentLang === 'es' ? 'Optimización' : 'Optimization'}</span>
                            </div>
                            <div class="highlight-item">
                                <i class="fas fa-leaf"></i>
                                <span>${window.app?.currentLang === 'es' ? 'Sostenibilidad' : 'Sustainability'}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}