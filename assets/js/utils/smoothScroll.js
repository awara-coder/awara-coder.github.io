/**
 * Smooth scrolling functionality with highlight effect
 */

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

export const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Handle home link (My Portfolio)
            if (targetId === '#' || targetId === '/') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                history.pushState(null, '', ' ');
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Scroll to the section
                window.scrollTo({
                    top: targetElement.offsetTop - 60, // Adjust for fixed header
                    behavior: 'smooth'
                });
                
                // Apply highlight effect
                setTimeout(() => {
                    highlightSection(targetElement);
                }, 300); // Small delay to sync with scroll
                
                // Update URL without adding to browser history
                history.pushState(null, '', targetId);
            }
        });
    });
    
    // Handle direct URL hashes on page load
    window.addEventListener('load', () => {
        if (window.location.hash) {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                setTimeout(() => {
                    highlightSection(targetElement);
                }, 1000); // Delay to ensure page is fully loaded
            }
        }
    });
};

