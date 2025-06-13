export default function certifications({ t, data }) {
    const certifications = data?.certifications?.certifications || [];
    
    return `
        <section id="certifications" class="section">
            <div class="container">
                <h2 class="section-title">${t.certifications.title}</h2>
                <div class="cert-grid">
                    ${certifications.map((cert, index) => `
                        <div class="cert-card" data-aos="fade-up" data-aos-delay="${index * 100}">
                            <div class="cert-icon">
                                ${cert.name.includes('Brewmaster') ? '<i class="fas fa-award"></i>' : 
                                  cert.name.includes('Lean') ? '<i class="fas fa-certificate"></i>' :
                                  cert.name.includes('TOEFL') ? '<i class="fas fa-language"></i>' :
                                  '<i class="fas fa-certificate"></i>'}
                            </div>
                            <h3>${cert.name}</h3>
                            <p class="cert-issuer">${cert.issuingOrganization}</p>
                            <p class="cert-date">
                                ${t.certifications.issued} ${cert.issueDate}
                                ${cert.expirationDate ? ` · ${t.certifications.expires} ${cert.expirationDate}` : ''}
                            </p>
                            ${cert.credentialUrl ? `
                                <a href="${cert.credentialUrl}" target="_blank" class="cert-link">
                                    <i class="fas fa-external-link-alt"></i> ${t.common.viewAll}
                                </a>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `;
}