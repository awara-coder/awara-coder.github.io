/**
 * Main portfolio component that coordinates all other components
 */

import { populateHero } from './hero';
import { populateAbout } from './about';
import { populateSkills } from './skills';
import { populateProjects } from './projects';
import { populateExperience } from './experience';
import { populateAccomplishments } from './accomplishments';
import { populateContact } from './contact';

export const initializePortfolio = (data) => {
    // Initialize all components with their respective data
    populateHero(data.name, data.bio);
    populateAbout(data.about);
    populateSkills(data.skills);
    populateProjects(data.projects);
    populateExperience(data.experience);
    populateAccomplishments(data.accomplishments);
    populateContact(data.contact);
};

// Initialize the application
export const initApp = async () => {
    // Initialize smooth scrolling
    const { initSmoothScroll } = await import('../utils/smoothScroll');
    initSmoothScroll();

    // Load portfolio data
    const { loadPortfolioData } = await import('../utils/dataLoader');
    await loadPortfolioData();
};
