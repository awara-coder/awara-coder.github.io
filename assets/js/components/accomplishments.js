/**
 * Accomplishments section component
 */

export const populateAccomplishments = (accomplishments) => {
    const accomplishmentsContainer = document.getElementById('accomplishments-container');
    if (!accomplishmentsContainer) return;

    const accomplishmentsHTML = `
        <div class="max-w-4xl mx-auto">
            <ul class="list-none space-y-4">
                ${accomplishments.map(acc => `
                    <li class="flex items-baseline text-lg text-gray-700 dark:text-gray-300">
                        <i class="fa-solid fa-trophy mr-3 text-primary-600"></i>
                        <span class="flex-1">${acc.text}</span>
                        ${acc.link ? `<a href="${acc.link}" target="_blank" rel="noopener noreferrer" class="ml-2 text-primary-600 hover:text-primary-dark"><i class="fas fa-external-link-alt"></i></a>` : ''}
                    </li>
                `).join('')}
            </ul>
        </div>
    `;

    accomplishmentsContainer.innerHTML = accomplishmentsHTML;
};