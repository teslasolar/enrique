export default function contact({ t, data }) {
    const contactInfo = data?.contact?.contactInfo || {};
    
    return `
        <section id="contact" class="section">
            <div class="container">
                <h2 class="section-title">${t.contact.title}</h2>
                <div class="contact-wrapper">
                    <div class="contact-info">
                        <p class="contact-description">${t.contact.description}</p>
                        <div class="contact-details">
                            <div class="contact-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <div>
                                    <h4>${t.contact.info.location}</h4>
                                    <p>${contactInfo.location || 'Monterrey, Nuevo León, Mexico'}</p>
                                </div>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-envelope"></i>
                                <div>
                                    <h4>${t.contact.info.email}</h4>
                                    <p>enrique.martinez@example.com</p>
                                </div>
                            </div>
                            <div class="contact-item">
                                <i class="fab fa-linkedin"></i>
                                <div>
                                    <h4>${t.contact.info.linkedin}</h4>
                                    <a href="${contactInfo.linkedinUrl}" target="_blank">LinkedIn Profile</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="contact-form-wrapper">
                        <form id="contact-form" class="contact-form">
                            <div class="form-group">
                                <input type="text" name="name" required placeholder="${t.contact.form.name}">
                                <label>${t.contact.form.name}</label>
                            </div>
                            <div class="form-group">
                                <input type="email" name="email" required placeholder="${t.contact.form.email}">
                                <label>${t.contact.form.email}</label>
                            </div>
                            <div class="form-group">
                                <input type="text" name="subject" required placeholder="${t.contact.form.subject}">
                                <label>${t.contact.form.subject}</label>
                            </div>
                            <div class="form-group">
                                <textarea name="message" rows="5" required placeholder="${t.contact.form.message}"></textarea>
                                <label>${t.contact.form.message}</label>
                            </div>
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-paper-plane"></i> ${t.contact.form.send}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    `;
}