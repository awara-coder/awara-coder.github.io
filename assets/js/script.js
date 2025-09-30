/**
 * Main entry point for the portfolio application
 */

// Import the initialization function from the portfolio component
import { initApp } from './components/portfolio';

// Wait for the DOM to be fully loaded before initializing the app
document.addEventListener('DOMContentLoaded', initApp);