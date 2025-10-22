/**
 * Smooth scrolling functionality
 */

export const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');

            // Handle home link (My Portfolio)
            if (targetId === '#' || targetId === '/') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                });
                history.pushState(null, '', ' ');
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Scroll to the section
                window.scrollTo({
                    top: targetElement.offsetTop - 64, // Adjust for fixed header (h-16 = 64px)
                    behavior: 'smooth',
                });

                // Update URL without adding to browser history
                history.pushState(null, '', targetId);
            }
        });
    });
};
