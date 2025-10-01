/**
 * Experience section component
 */

export const populateExperience = (experience) => {
    const experienceContainer = document.getElementById('experience-container');
    if (!experienceContainer) return;

    const experienceHTML = experience.map(exp => `
        <div class="experience-item mb-6">
            <div class="text-xl font-semibold text-gray-800">${exp.title}</div>
            <div class="text-lg font-medium text-gray-700">${exp.company}</div>
            <p class="text-muted">${exp.period}</p>
            <ul>
                ${exp.description.map(item => `<li class="flex items-baseline"><i class="fa-solid fa-angle-right mr-2 text-primary-600"></i><span class="flex-1">${item}</span></li>`).join('')}
            </ul>
        </div>
    `).join('');

    experienceContainer.innerHTML = experienceHTML;
};
