/**
 * Main portfolio component that coordinates all other components
 */

import { populateHero } from './hero.js';
import { populateAbout } from './about.js';
import { populateSkills } from './skills.js';
import { populateProjects } from './projects.js';
import { populateExperience } from './experience.js';
import { populateAccomplishments } from './accomplishments.js';
import { populateContact } from './contact.js';

export const initializePortfolio = (data) => {
    try {
        console.log('Initializing portfolio with data:', data);

        // Check if data exists and has the required properties
        if (!data) {
            throw new Error('No data provided to initialize portfolio');
        }

        populateHero(data.name || '', data.bio || '');

        if (data.about) {
            populateAbout(data.about);
        }

        if (data.skills && (Array.isArray(data.skills) || typeof data.skills === 'object')) {
            populateSkills(data.skills);
        } else {
            console.warn('Skills data is missing or in an unexpected format:', data.skills);
        }

        if (data.projects && Array.isArray(data.projects)) {
            populateProjects(data.projects);
        }

        if (data.experience) {
            populateExperience(data.experience);
        }

        if (data.accomplishments) {
            populateAccomplishments(data.accomplishments);
        }

        if (data.contact) {
            populateContact(data.contact);
        }
    } catch (error) {
        console.error('Error initializing portfolio:', error);
        throw error; // Re-throw to be caught by the caller
    }
};

// Initialize the application
export const initApp = async () => {
    try {
        // Load portfolio data
        const { loadPortfolioData } = await import('../utils/dataLoader.js');
        await loadPortfolioData();
    } catch (error) {
        console.error('Error in initApp:', error);
        throw error; // Re-throw to be caught by the caller
    }
};
