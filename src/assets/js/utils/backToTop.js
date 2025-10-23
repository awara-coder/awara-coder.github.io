/**
 * Handles the functionality for a 'back to top' button.
 * The button appears when the user scrolls down and smoothly scrolls the page to the top when clicked.
 */
export const initBackToTopButton = () => {
    const backToTopButton = document.getElementById('back-to-top');

    if (!backToTopButton) {
        console.warn('Back to top button element not found.');
        return;
    }

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('opacity-0', 'invisible');
            backToTopButton.classList.add('opacity-100', 'visible');
        } else {
            backToTopButton.classList.remove('opacity-100', 'visible');
            backToTopButton.classList.add('opacity-0', 'invisible');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};
