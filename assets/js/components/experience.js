/**
 * Experience section component
 */

export const populateExperience = (experience) => {
    const experienceContainer = document.getElementById('experience-container');
    if (!experienceContainer) return;

    const experienceHTML = experience.map(exp => `
        <div class="experience-item mb-4">
            <h3>${exp.title}</h3>
            <h4>${exp.company}</h4>
            <p class="text-muted">${exp.period}</p>
            <ul>
                ${exp.description.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </div>
    `).join('');

    experienceContainer.innerHTML = experienceHTML;
};
