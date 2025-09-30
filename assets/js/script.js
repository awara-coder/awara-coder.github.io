/**
 * Main entry point for the portfolio application
 */

// Import the initialization function from the portfolio component
import { initApp } from './components/portfolio.js';

// Add global error handler for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    // Optionally show an error message to the user
    const errorDiv = document.createElement('div');
    errorDiv.style.position = 'fixed';
    errorDiv.style.bottom = '10px';
    errorDiv.style.right = '10px';
    errorDiv.style.padding = '10px';
    errorDiv.style.backgroundColor = '#ffebee';
    errorDiv.style.border = '1px solid #ef9a9a';
    errorDiv.style.borderRadius = '4px';
    errorDiv.style.zIndex = '9999';
    errorDiv.textContent = 'An error occurred. Please check the console for details.';
    document.body.appendChild(errorDiv);
});

// Wait for the DOM to be fully loaded before initializing the app
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded, initializing app...');
    initApp().catch(error => {
        console.error('Error initializing application:', error);
        // Optionally show an error message to the user
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
        errorDiv.textContent = 'Failed to initialize the application. Please check the console for details.';
        document.body.appendChild(errorDiv);
    });

    // Navbar toggling functionality
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('#navbarNav');

    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', () => {
            navbarCollapse.classList.toggle('show');
        });
    }
});