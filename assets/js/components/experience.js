/**
 * Experience section component
 */

export const populateExperience = (experience) => {
    const experienceContainer = document.getElementById('experience-container');
    if (!experienceContainer) return;

    const experienceHTML = experience.map(exp => {
        // The fallback icon now acts as a base layer.
        const fallbackIconHTML = `<div class="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 grid place-items-center"><i class="fas fa-suitcase text-2xl text-gray-400 dark:text-gray-500"></i></div>`;

        // The image is an overlay that will be removed on error.
        const imageHTML = `
            <img 
                src="${exp.logoUrl}" 
                alt="${exp.company} Logo" 
                class="company-logo w-12 h-12 rounded-full object-cover border border-gray-200 dark:border-gray-700" 
                style="position: absolute; top: 0; left: 0;"
                onerror="this.remove()"
            >`;

        return `
        <div class="experience-item mb-6 flex items-start space-x-4">
            <div class="flex-shrink-0 mt-1" style="position: relative;">
                ${fallbackIconHTML}
                ${exp.logoUrl ? imageHTML : ''}
            </div>
            <div class="flex-grow">
                <h3 class="text-xl font-semibold text-gray-800 dark:text-white">${exp.title}</h3>
                <h4 class="text-lg font-medium text-gray-700 dark:text-gray-200">${exp.company}</h4>
                <p class="text-muted dark:text-gray-400">${exp.period}</p>
                <ul class="list-none space-y-2 mt-4">
                    ${exp.description.map(item => `<li class="flex items-baseline text-gray-700 dark:text-gray-300"><i class="fa-solid fa-angle-right mr-2 text-primary-600"></i><span class="flex-1">${item}</span></li>`).join('')}
                </ul>
            </div>
        </div>
    `}).join('');

    experienceContainer.innerHTML = experienceHTML;
};