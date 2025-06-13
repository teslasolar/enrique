export default function experience({ t, data }) {
    const experiences = data?.experience?.experience || [];
    
    const getPositionName = (title) => {
        const positionMap = {
            'Chemical Engineer': t.experience.positions.chemicalEngineer,
            'Brewing Process Supervisor': t.experience.positions.brewingSupervisor,
            'Brewing Intern': t.experience.positions.brewingIntern
        };
        return positionMap[title] || title;
    };
    
    const getDescription = (id) => {
        const descMap = {
            1: t.experience.descriptions.hershey,
            2: t.experience.descriptions.supervisor,
            3: t.experience.descriptions.intern
        };
        return descMap[id] || '';
    };
    
    return `
        <section id="experience" class="section section-alt">
            <div class="container">
                <h2 class="section-title">${t.experience.title}</h2>
                <div class="timeline">
                    ${experiences.map((exp, index) => `
                        <div class="timeline-item">
                            <div class="timeline-marker"></div>
                            <div class="timeline-content">
                                <div class="timeline-header">
                                    <h3>${getPositionName(exp.title)}</h3>
                                    <span class="company">${exp.company}</span>
                                </div>
                                <div class="timeline-meta">
                                    <span><i class="fas fa-calendar"></i> ${exp.startDate} - ${exp.endDate === 'Present' ? t.experience.current : exp.endDate}</span>
                                    <span><i class="fas fa-map-marker-alt"></i> ${exp.location}</span>
                                    <span><i class="fas fa-briefcase"></i> ${exp.employmentType}</span>
                                </div>
                                <p>${getDescription(exp.id)}</p>
                                <div class="timeline-badge">${exp.duration}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `;
}