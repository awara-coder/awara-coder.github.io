/**
 * About section component
 */

import { setText } from '../utils/dom.js';

export const populateAbout = (about) => {
    // Check if the element exists in the DOM
    const aboutElement = document.getElementById('user-about');
    
    if (!aboutElement) {
        console.error('About section element not found in the DOM');
        return;
    }
    
    setText(aboutElement, about);
};
