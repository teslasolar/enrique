export default function skills({ t, data }) {
    const skills = data?.skills?.skills || [];
    
    // Group skills by category
    const skillsByCategory = {
        technical: [],
        industry: [],
        business: [],
        languages: []
    };
    
    skills.forEach(skill => {
        switch(skill.category) {
            case 'Technical':
                skillsByCategory.technical.push(skill);
                break;
            case 'Industry Specific':
                skillsByCategory.industry.push(skill);
                break;
            case 'Business':
            case 'Management':
                skillsByCategory.business.push(skill);
                break;
        }
    });
    
    // Add languages
    if (data?.languages?.languages) {
        skillsByCategory.languages = data.languages.languages;
    }
    
    const getSkillName = (name) => {
        const skillMap = {
            'Process Simulation': t.skills.items.processSimulation,
            'Data Analysis': t.skills.items.dataAnalysis,
            'Industrial Process Design': t.skills.items.industrialDesign,
            'Operations Optimization': t.skills.items.operations,
            'Quality Improvement': t.skills.items.quality,
            'Sustainable Solutions': t.skills.items.sustainable,
            'Manufacturing Engineering': t.skills.items.manufacturing,
            'Brewing Process': t.skills.items.brewing,
            'Food Manufacturing': t.skills.items.food,
            'Chemical Engineering': t.skills.items.chemical,
            'Project Management': t.skills.items.project,
            'Cost Reduction': t.skills.items.cost,
            'Process Improvement': t.skills.items.process
        };
        return skillMap[name] || name;
    };
    
    return `
        <section id="skills" class="section section-alt">
            <div class="container">
                <h2 class="section-title">${t.skills.title}</h2>
                <div class="skills-grid">
                    <div class="skill-category">
                        <h3><i class="fas fa-code"></i> ${t.skills.categories.technical}</h3>
                        <div class="skill-tags">
                            ${skillsByCategory.technical.map(skill => 
                                `<span class="skill-tag" data-skill="${skill.name}">${getSkillName(skill.name)}</span>`
                            ).join('')}
                        </div>
                    </div>
                    <div class="skill-category">
                        <h3><i class="fas fa-industry"></i> ${t.skills.categories.industry}</h3>
                        <div class="skill-tags">
                            ${skillsByCategory.industry.map(skill => 
                                `<span class="skill-tag" data-skill="${skill.name}">${getSkillName(skill.name)}</span>`
                            ).join('')}
                        </div>
                    </div>
                    <div class="skill-category">
                        <h3><i class="fas fa-briefcase"></i> ${t.skills.categories.business}</h3>
                        <div class="skill-tags">
                            ${skillsByCategory.business.map(skill => 
                                `<span class="skill-tag" data-skill="${skill.name}">${getSkillName(skill.name)}</span>`
                            ).join('')}
                        </div>
                    </div>
                    <div class="skill-category">
                        <h3><i class="fas fa-language"></i> ${t.skills.categories.languages}</h3>
                        <div class="skill-tags">
                            ${skillsByCategory.languages.map(lang => 
                                `<span class="skill-tag" data-skill="${lang.name}">
                                    ${lang.name === 'Spanish' ? t.skills.items.spanish : t.skills.items.english}
                                </span>`
                            ).join('')}
                        </div>
                    </div>
                </div>
                <div class="skills-visualization">
                    <canvas id="skills-chart"></canvas>
                </div>
            </div>
        </section>
    `;
}