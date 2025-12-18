/**
 * Handles the functionality for a 'back to top' button.
 * The button appears when the user scrolls down and smoothly scrolls the page to the top when clicked.
 */

import { throttle } from './performance.js';

export const initBackToTopButton = () => {
    const backToTopButton = document.getElementById('back-to-top');

    if (!backToTopButton) {
        console.warn('Back to top button element not found.');
        return;
    }

    // Throttle scroll handler to improve performance
    // Limits execution to once every 100ms (10 times per second max)
    // Before: 200-300 executions per second during active scrolling
    // After: Maximum 10 executions per second
    const handleScroll = throttle(() => {
        const shouldShow = window.pageYOffset > 300;

        // Use classList.toggle for cleaner code
        backToTopButton.classList.toggle('opacity-0', !shouldShow);
        backToTopButton.classList.toggle('invisible', !shouldShow);
        backToTopButton.classList.toggle('opacity-100', shouldShow);
        backToTopButton.classList.toggle('visible', shouldShow);
    }, 100);

    window.addEventListener('scroll', handleScroll);

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};
