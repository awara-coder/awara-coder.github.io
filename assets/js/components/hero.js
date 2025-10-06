/**
 * Hero section component
 */

import { setText } from '../utils/dom.js';

export const populateHero = (name, bio) => {
    try {
        console.log('Populating hero section with:', { name, bio });

        // Check if the elements exist in the DOM
        const nameElement = document.getElementById('user-name');
        const bioElement = document.getElementById('user-bio');

        if (!nameElement) {
            console.error('Hero section name element not found in the DOM');
        } else {
            console.log('Setting name to:', name);
            setText(nameElement, name || 'Your Name');
        }

        if (!bioElement) {
            console.error('Hero section bio element not found in the DOM');
        } else {
            console.log('Setting bio to:', bio);
            setText(bioElement, bio || 'Your professional bio');
        }
    } catch (error) {
        console.error('Error in populateHero:', error);
    }
};
