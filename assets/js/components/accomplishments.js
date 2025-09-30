/**
 * Accomplishments section component
 */

export const populateAccomplishments = (accomplishments) => {
    const accomplishmentsContainer = document.getElementById('accomplishments-container');
    if (!accomplishmentsContainer) return;

    const accomplishmentsHTML = `
        <ul class="list-unstyled">
            ${accomplishments.map(accomplishment => `
                <li class="mb-2">
                    <i class="fas fa-trophy text-warning mr-2"></i>
                    ${accomplishment}
                </li>
            `).join('')}
        </ul>
    `;

    accomplishmentsContainer.innerHTML = accomplishmentsHTML;
};
