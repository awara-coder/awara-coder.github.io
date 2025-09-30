/**
 * Skills section component
 */

export const populateSkills = (skills) => {
    const skillsContainer = document.getElementById('skills-container');
    if (!skillsContainer) {
        console.error('Skills container not found');
        return;
    }

    try {
        const skillsHTML = `
            <div class="skills-grid">
                ${skills.map(skill => `
                    <div class="skill-category">
                        <h4 class="skill-title">${skill.name}</h4>
                        <p class="skill-description">${skill.description}</p>
                    </div>
                `).join('')}
            </div>
        `;

        skillsContainer.innerHTML = skillsHTML;
    } catch (error) {
        console.error('Error populating skills:', error);
        skillsContainer.innerHTML = '<p>Unable to load skills. Please check the console for details.</p>';
    }
};
