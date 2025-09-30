/**
 * Data loading and initialization
 */

import { initializePortfolio } from '../components/portfolio';

export const loadPortfolioData = async () => {
    try {
        const response = await fetch('data/data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        initializePortfolio(data);
    } catch (error) {
        console.error('Error loading portfolio data:', error);
    }
};
