/**
 * Contact section component
 */

export const populateContact = (contact) => {
    const contactContainer = document.getElementById('contact-container');
    if (!contactContainer) {
        console.error('Contact container not found');
        return;
    }

    try {
        console.log('Populating contact section with:', contact);

        let contactHTML = '<div class="flex flex-col gap-4">'; // contact-methods

        // Add email if available
        if (contact.email) {
            contactHTML += `
                <p class="flex items-center mb-2">
                    <i class="fa-regular fa-envelope w-6 text-center text-gray-600 mr-3"></i>
                    <a href="mailto:${contact.email}" class="text-blue-600 no-underline transition-colors duration-200 hover:text-blue-800 hover:underline">${contact.email}</a>
                </p>`;
        }

        // Add GitHub if available
        if (contact.github) {
            const githubUsername = contact.github.split('/').pop();
            contactHTML += `
                <p class="flex items-center mb-2">
                    <i class="fab fa-github w-6 text-center text-gray-600 mr-3"></i>
                    <a href="${contact.github}" class="text-blue-600 no-underline transition-colors duration-200 hover:text-blue-800 hover:underline" target="_blank" rel="noopener noreferrer">${githubUsername}</a>
                </p>`;
        }

        // Add LinkedIn if available
        if (contact.linkedin) {
            contactHTML += `
                <p class="flex items-center mb-2">
                    <i class="fab fa-linkedin w-6 text-center text-gray-600 mr-3"></i>
                    <a href="${contact.linkedin}" class="text-blue-600 no-underline transition-colors duration-200 hover:text-blue-800 hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
                </p>`;
        }

        contactHTML += '</div>';
        contactContainer.innerHTML = contactHTML;
    } catch (error) {
        console.error('Error populating contact section:', error);
        contactContainer.innerHTML =
            '<p>Unable to load contact information. Please check the console for details.</p>';
    }
};
