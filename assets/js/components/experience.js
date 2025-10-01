/**
 * Experience section component
 */

export const populateExperience = (experience) => {
    const experienceContainer = document.getElementById('experience-container');
    if (!experienceContainer) return;

    const experienceHTML = experience.map(exp => `
        <div class="experience-item mb-6">
            <h3 class="text-xl font-semibold text-gray-800 dark:text-white">${exp.title}</h3>
            <h4 class="text-lg font-medium text-gray-700 dark:text-gray-200">${exp.company}</h4>
            <p class="text-muted dark:text-gray-400">${exp.period}</p>
            <ul class="list-none space-y-2 mt-4">
                ${exp.description.map(item => `<li class="flex items-baseline text-gray-700 dark:text-gray-300"><i class="fa-solid fa-angle-right mr-2 text-primary-600"></i><span class="flex-1">${item}</span></li>`).join('')}
            </ul>
        </div>
    `).join('');

    experienceContainer.innerHTML = experienceHTML;
};
