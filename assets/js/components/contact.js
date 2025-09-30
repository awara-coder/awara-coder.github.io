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
        
        let contactHTML = '<div class="contact-methods">';
        
        // Add email if available
        if (contact.email) {
            contactHTML += `
                <p class="contact-item">
                    <i class="fas fa-envelope mr-2"></i>
                    <a href="mailto:${contact.email}">${contact.email}</a>
                </p>`;
        }
        
        // Add GitHub if available
        if (contact.github) {
            const githubUsername = contact.github.split('/').pop();
            contactHTML += `
                <p class="contact-item">
                    <i class="fab fa-github mr-2"></i>
                    <a href="${contact.github}" target="_blank" rel="noopener noreferrer">${githubUsername}</a>
                </p>`;
        }
        
        // Add LinkedIn if available
        if (contact.linkedin) {
            contactHTML += `
                <p class="contact-item">
                    <i class="fab fa-linkedin mr-2"></i>
                    <a href="${contact.linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>
                </p>`;
        }
        
        contactHTML += '</div>';
        contactContainer.innerHTML = contactHTML;
        
    } catch (error) {
        console.error('Error populating contact section:', error);
        contactContainer.innerHTML = '<p>Unable to load contact information. Please check the console for details.</p>';
    }
};
