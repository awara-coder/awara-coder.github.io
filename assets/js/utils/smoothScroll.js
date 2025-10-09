/**
 * Smooth scrolling functionality with highlight effect
 */

/* eslint-disable no-unused-vars */
const highlightSection = (element) => {
    if (!element) return;

    // Create a highlight overlay
    const highlight = document.createElement('div');
    highlight.style.position = 'absolute';
    highlight.style.top = '0';
    highlight.style.left = '0';
    highlight.style.right = '0';
    highlight.style.bottom = '0';
    highlight.style.borderRadius = '4px';
    highlight.style.pointerEvents = 'none';
    highlight.style.animation = 'highlight 1.5s ease-out';
    highlight.style.zIndex = '-1';

    // Make sure the section has position relative
    element.style.position = 'relative';
    element.style.zIndex = '1';

    // Add the highlight
    element.appendChild(highlight);

    // Remove the highlight after animation completes
    const handleAnimationEnd = () => {
        highlight.remove();
    };

    highlight.addEventListener('animationend', handleAnimationEnd);
};

export const smoothScroll = (event) => {
    event.preventDefault();
    const targetId = event.target.getAttribute('href');
    if (targetId) {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
};
