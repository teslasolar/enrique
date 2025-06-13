export default function navbar({ t, data }) {
    return `
        <nav class="navbar">
            <div class="nav-container">
                <div class="nav-brand">
                    <img src="picture/face.png" alt="EMV" class="nav-profile-img" />
                    <span>EMV</span>
                </div>
                <ul class="nav-menu">
                    <li><a href="#about">${t.nav.about}</a></li>
                    <li><a href="#experience">${t.nav.experience}</a></li>
                    <li><a href="#education">${t.nav.education}</a></li>
                    <li><a href="#skills">${t.nav.skills}</a></li>
                    <li><a href="#certifications">${t.nav.certifications}</a></li>
                    <li><a href="#portfolio">${t.nav.portfolio}</a></li>
                    <li><a href="#contact">${t.nav.contact}</a></li>
                </ul>
                <div class="nav-actions">
                    <div class="language-switcher">
                        <button class="lang-btn ${window.app?.currentLang === 'en' ? 'active' : ''}" data-lang="en">EN</button>
                        <button class="lang-btn ${window.app?.currentLang === 'es' ? 'active' : ''}" data-lang="es">ES</button>
                    </div>
                    <button class="theme-toggle" aria-label="Toggle theme">
                        <i class="fas fa-moon"></i>
                    </button>
                </div>
                <div class="nav-toggle">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </nav>
    `;
}