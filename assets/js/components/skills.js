/**
 * Skills section component
 */

export const populateSkills = (skills) => {
    const skillsContainer = document.getElementById('skills-container');
    if (!skillsContainer) return;

    const skillsHTML = skills.map(skill => `
        <div class="skill-category mb-4">
            <h4>${skill.name}</h4>
            <p class="text-muted">${skill.description}</p>
        </div>
    `).join('');

    skillsContainer.innerHTML = skillsHTML;
};
