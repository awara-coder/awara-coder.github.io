/**
 * Mobile menu functionality
 */

// Store cleanup function to prevent memory leaks
let cleanupMobileMenu = null;

export const initMobileMenu = () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!mobileMenuButton || !mobileMenu) return;

    // Cleanup previous listeners if reinitializing
    if (cleanupMobileMenu) {
        cleanupMobileMenu();
    }

    // Define event handlers so they can be removed later
    const handleMenuToggle = () => {
        mobileMenu.classList.toggle('hidden');
    };

    const handleOutsideClick = (event) => {
        const isClickInsideMenu = mobileMenu.contains(event.target);
        const isClickOnButton = mobileMenuButton.contains(event.target);

        if (!isClickInsideMenu && !isClickOnButton && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    };

    // Close mobile menu when a navigation link is clicked
    const mobileNavLinks = mobileMenu.querySelectorAll('a');
    const handleLinkClick = () => {
        mobileMenu.classList.add('hidden');
    };

    // Attach event listeners
    mobileMenuButton.addEventListener('click', handleMenuToggle);
    document.addEventListener('click', handleOutsideClick);
    mobileNavLinks.forEach((link) => {
        link.addEventListener('click', handleLinkClick);
    });

    // Store cleanup function to remove all event listeners
    cleanupMobileMenu = () => {
        mobileMenuButton.removeEventListener('click', handleMenuToggle);
        document.removeEventListener('click', handleOutsideClick);
        mobileNavLinks.forEach((link) => {
            link.removeEventListener('click', handleLinkClick);
        });
        cleanupMobileMenu = null;
    };

    return cleanupMobileMenu;
};

/**
 * Cleanup function to remove mobile menu event listeners
 * Call this when the mobile menu is no longer needed (e.g., SPA navigation)
 */
export const cleanup = () => {
    if (cleanupMobileMenu) {
        cleanupMobileMenu();
    }
};
