/**
 * Handles theme toggling (light/dark mode) functionality.
 * Detects system preference, stores user choice, and applies theme classes.
 */

const LOCAL_STORAGE_THEME_KEY = 'portfolio-theme';
const THEME_DARK = 'dark';
const THEME_LIGHT = 'light';

export const initThemeToggle = () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleIcon = document.getElementById('theme-toggle-icon');
    const htmlElement = document.documentElement;

    console.log('initThemeToggle called.');
    console.log('themeToggleBtn:', themeToggleBtn);
    console.log('themeToggleIcon:', themeToggleIcon);

    // Function to set the theme
    const setTheme = (theme) => {
        console.log('setTheme called with:', theme);
        if (theme === THEME_DARK) {
            htmlElement.classList.add(THEME_DARK);
            themeToggleIcon.classList.remove('fa-sun');
            themeToggleIcon.classList.add('fa-moon');
        } else {
            htmlElement.classList.remove(THEME_DARK);
            themeToggleIcon.classList.remove('fa-moon');
            themeToggleIcon.classList.add('fa-sun');
        }
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
        console.log('Current HTML classes:', htmlElement.classList.value);
        console.log('localStorage theme:', localStorage.getItem(LOCAL_STORAGE_THEME_KEY));
    };

    // Function to get the preferred theme
    const getPreferredTheme = () => {
        const storedTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
        if (storedTheme) {
            return storedTheme;
        }
        // Default to light if no stored theme and system preference is not dark
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEME_DARK : THEME_LIGHT;
    };

    // Initialize theme on load
    setTheme(getPreferredTheme());

    // Event listener for theme toggle button
    if (themeToggleBtn) {
        console.log('Adding event listener to themeToggleBtn.');
        themeToggleBtn.addEventListener('click', () => {
            console.log('Theme toggle button clicked!');
            const currentTheme = htmlElement.classList.contains(THEME_DARK) ? THEME_DARK : THEME_LIGHT;
            const newTheme = currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
            setTheme(newTheme);
        });
    } else {
        console.error('Theme toggle button not found!');
    }

    // Listen for changes in system color scheme preference
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        console.log('System theme preference changed.', e.matches);
        // Only update if no explicit user preference is stored
        if (!localStorage.getItem(LOCAL_STORAGE_THEME_KEY)) {
            setTheme(e.matches ? THEME_DARK : THEME_LIGHT);
        }
    });
};
