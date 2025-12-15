/**
 * DOM Utility Functions
 */

export const setText = (elementOrSelector, text) => {
    let element;

    // If elementOrSelector is a string, treat it as a selector
    if (typeof elementOrSelector === 'string') {
        element = document.getElementById(elementOrSelector);
        if (!element) {
            console.error(`Element with ID "${elementOrSelector}" not found`);
            return;
        }
    } else {
        // Otherwise, assume it's an element
        element = elementOrSelector;
        if (!element) {
            console.error('Invalid element provided to setText');
            return;
        }
    }

    // Now set the text content
    element.textContent = text;
};
