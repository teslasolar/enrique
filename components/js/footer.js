export default function footer({ t, data }) {
    const currentYear = new Date().getFullYear();
    
    return `
        <footer class="footer">
            <div class="container">
                <div class="footer-content">
                    <div class="footer-section">
                        <h3>Enrique Martinez Vargas</h3>
                        <p>${t.hero.subtitle}</p>
                        <div class="social-links">
                            <a href="${data?.contact?.contactInfo?.linkedinUrl}" target="_blank" aria-label="LinkedIn">
                                <i class="fab fa-linkedin"></i>
                            </a>
                            <a href="mailto:enrique.martinez@example.com" aria-label="Email">
                                <i class="fas fa-envelope"></i>
                            </a>
                            <a href="https://github.com" target="_blank" aria-label="GitHub">
                                <i class="fab fa-github"></i>
                            </a>
                        </div>
                    </div>
                    <div class="footer-section">
                        <h4>${window.app?.currentLang === 'es' ? 'Enlaces Rápidos' : 'Quick Links'}</h4>
                        <ul>
                            <li><a href="#about">${t.nav.about}</a></li>
                            <li><a href="#experience">${t.nav.experience}</a></li>
                            <li><a href="#portfolio">${t.nav.portfolio}</a></li>
                            <li><a href="#contact">${t.nav.contact}</a></li>
                        </ul>
                    </div>
                    <div class="footer-section">
                        <h4>${window.app?.currentLang === 'es' ? 'Habilidades Principales' : 'Top Skills'}</h4>
                        <ul>
                            <li>${t.skills.items.processSimulation}</li>
                            <li>${t.skills.items.dataAnalysis}</li>
                            <li>${t.skills.items.project}</li>
                            <li>${t.skills.items.sustainable}</li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <p>&copy; ${currentYear} Enrique Martinez Vargas. ${t.footer.rights}.</p>
                    <p>${t.footer.madeWith} <i class="fas fa-heart"></i> ${t.footer.by} <a href="https://github.com">EMV</a></p>
                </div>
            </div>
        </footer>
    `;
}