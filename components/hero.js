export default function hero({ t, data }) {
    const profile = data?.profile || {};
    
    return `
        <header class="hero" id="hero">
            <div class="hero-background">
                <div class="hero-particles"></div>
            </div>
            <div class="hero-content">
                <div class="hero-profile-image">
                    <img src="picture/face.png" alt="${t.hero.title}" />
                    <div class="hero-image-decoration"></div>
                </div>
                <h1 class="hero-title">${t.hero.title}</h1>
                <p class="hero-subtitle">${t.hero.subtitle}</p>
                <p class="hero-location">
                    <i class="fas fa-map-marker-alt"></i> ${t.hero.location}
                </p>
                <div class="hero-cta">
                    <a href="${profile.profileUrl}" target="_blank" class="btn btn-primary">
                        <i class="fab fa-linkedin"></i> ${t.hero.connectLinkedIn}
                    </a>
                    <a href="#contact" class="btn btn-secondary">
                        <i class="fas fa-envelope"></i> ${t.hero.getInTouch}
                    </a>
                    <button class="btn btn-outline" onclick="window.app.downloadCV()">
                        <i class="fas fa-download"></i> ${t.hero.downloadCV}
                    </button>
                </div>
                <div class="hero-scroll">
                    <a href="#about" class="scroll-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                    </a>
                </div>
            </div>
        </header>
    `;
}