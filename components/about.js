export default function about({ t, data }) {
    const summary = data?.summary?.summary || {};
    
    return `
        <section id="about" class="section">
            <div class="container">
                <h2 class="section-title">${t.about.title}</h2>
                <div class="about-wrapper">
                    <div class="about-image">
                        <img src="picture/face.png" alt="${data?.profile?.name || 'Enrique Martinez Vargas'}" />
                        <div class="about-image-bg"></div>
                    </div>
                    <div class="about-content">
                        <div class="about-text">
                            <p>${t.about.description}</p>
                        </div>
                    </div>
                </div>
                <div class="stats">
                    <div class="stat-item">
                        <div class="stat-icon">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="stat-number" data-count="${summary.yearsOfExperience || 6}">0</div>
                        <div class="stat-label">${t.about.stats.yearsExperience}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-icon">
                            <i class="fas fa-building"></i>
                        </div>
                        <div class="stat-number" data-count="2">0</div>
                        <div class="stat-label">${t.about.stats.companies}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-icon">
                            <i class="fas fa-certificate"></i>
                        </div>
                        <div class="stat-number" data-count="${data?.certifications?.certifications?.length || 4}">0</div>
                        <div class="stat-label">${t.about.stats.certifications}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-icon">
                            <i class="fas fa-project-diagram"></i>
                        </div>
                        <div class="stat-number" data-count="15">0</div>
                        <div class="stat-label">${t.about.stats.projects}</div>
                    </div>
                </div>
            </div>
        </section>
    `;
}