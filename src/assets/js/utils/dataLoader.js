/**
 * Data loading and initialization
 */

import { initializePortfolio } from '../components/portfolio.js';

export const loadPortfolioData = async () => {
    const loadingScreen = document.getElementById('loading-screen');
    try {
        console.log('Fetching portfolio data...');
        const response = await fetch('/data/data.json');
        console.log('Response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Successfully loaded portfolio data. Data structure:', {
            name: data.name,
            bio: data.bio,
            about: data.about,
            skills: data.skills?.length,
            projects: data.projects?.length,
            experience: data.experience,
            accomplishments: data.accomplishments,
            contact: data.contact,
        });

        // Ensure we have the expected data structure
        if (!data || typeof data !== 'object') {
            throw new Error('Invalid data format: expected an object');
        }

        initializePortfolio(data);
    } catch (error) {
        console.error('Error in loadPortfolioData:', error);
        // Show error in the UI
        const errorDiv = document.createElement('div');
        errorDiv.style.position = 'fixed';
        errorDiv.style.top = '10px';
        errorDiv.style.left = '50%';
        errorDiv.style.transform = 'translateX(-50%)';
        errorDiv.style.padding = '10px 20px';
        errorDiv.style.backgroundColor = '#ffebee';
        errorDiv.style.border = '1px solid #ef9a9a';
        errorDiv.style.borderRadius = '4px';
        errorDiv.style.zIndex = '9999';
        errorDiv.textContent = `Failed to load portfolio data: ${error.message}`;
        document.body.appendChild(errorDiv);
    } finally {
        // Hide loading screen after data is loaded or if an error occurs
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
            // Optional: Remove the element from DOM after transition if needed
            loadingScreen.addEventListener(
                'transitionend',
                () => {
                    loadingScreen.remove();
                },
                { once: true }
            );
        }
    }
};
