/**
 * Contact section component
 */

export const populateContact = (contact) => {
    const contactContainer = document.getElementById('contact-container');
    if (!contactContainer) return;

    const contactHTML = `
        <div class="contact-methods">
            ${contact.email ? `
                <p>
                    <i class="fas fa-envelope mr-2"></i>
                    <a href="mailto:${contact.email}">${contact.email}</a>
                </p>
            ` : ''}
            ${contact.phone ? `
                <p>
                    <i class="fas fa-phone mr-2"></i>
                    <a href="tel:${contact.phone}">${contact.phone}</a>
                </p>
            ` : ''}
            ${contact.linkedin ? `
                <p>
                    <i class="fab fa-linkedin mr-2"></i>
                    <a href="${contact.linkedin}" target="_blank">LinkedIn Profile</a>
                </p>
            ` : ''}
            ${contact.github ? `
                <p>
                    <i class="fab fa-github mr-2"></i>
                    <a href="${contact.github}" target="_blank">GitHub Profile</a>
                </p>
            ` : ''}
        </div>
    `;

    contactContainer.innerHTML = contactHTML;
};
