/**
 * Accomplishments section component
 */

export const populateAccomplishments = (accomplishments) => {
    const accomplishmentsContainer = document.getElementById('accomplishments-container');
    if (!accomplishmentsContainer) return;

    const accomplishmentsHTML = `
        <div class="max-w-4xl mx-auto">
            <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 pb-4 border-b border-primary-600 mx-auto w-fit dark:text-white">
                My Accomplishments
            </h2>
            <ul class="list-none space-y-4">
                ${accomplishments.map(acc => `
                    <li class="flex items-baseline text-lg text-gray-700 dark:text-gray-300">
                        <i class="fa-solid fa-trophy mr-3 text-primary-600"></i>
                        <span class="flex-1">${acc}</span>
                    </li>
                `).join('')}
            </ul>
        </div>
    `;

    accomplishmentsContainer.innerHTML = accomplishmentsHTML;
};