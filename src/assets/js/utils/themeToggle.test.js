// Mock localStorage at the top level
const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    writable: true,
});

// Mock document.documentElement at the top level
const mockHtmlElement = {
    classList: { add: jest.fn(), remove: jest.fn(), contains: jest.fn() },
};
Object.defineProperty(document, 'documentElement', {
    value: mockHtmlElement,
    writable: true,
});

import { initThemeToggle } from '@utils/themeToggle.js';

describe('themeToggle', () => {
    let themeToggleButton;
    let themeToggleIcon;

    beforeEach(() => {
        // Reset mocks before each test
        localStorageMock.clear();
        localStorageMock.getItem.mockClear();
        localStorageMock.setItem.mockClear();
        mockHtmlElement.classList.add.mockClear();
        mockHtmlElement.classList.remove.mockClear();
        mockHtmlElement.classList.contains.mockClear();

        // Mock DOM structure
        document.body.innerHTML = `
      <button id="theme-toggle"></button>
      <i id="theme-toggle-icon" class="fa-sun"></i>
    `;
        themeToggleButton = document.getElementById('theme-toggle');
        themeToggleIcon = document.getElementById('theme-toggle-icon');

        // Spy on themeToggleIcon.classList methods
        jest.spyOn(themeToggleIcon.classList, 'remove');
        jest.spyOn(themeToggleIcon.classList, 'add');

        // Mock window.matchMedia
        Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation((query) => ({
                matches: query === '(prefers-color-scheme: dark)' ? true : false,
                media: query,
                onchange: null,
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should initialize with dark theme if preferred by system and no localStorage preference', () => {
        // Mock system preference for dark theme
        window.matchMedia.mockImplementation((query) => ({
            matches: query === '(prefers-color-scheme: dark)' ? true : false,
            media: query,
            onchange: null,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        }));

        initThemeToggle();

        expect(localStorageMock.getItem).toHaveBeenCalledWith('portfolio-theme');
        expect(mockHtmlElement.classList.add).toHaveBeenCalledWith('dark');
        expect(localStorageMock.setItem).toHaveBeenCalledWith('portfolio-theme', 'dark');
        expect(themeToggleIcon.classList.remove).toHaveBeenCalledWith('fa-sun');
        expect(themeToggleIcon.classList.add).toHaveBeenCalledWith('fa-moon');
    });

    test('should initialize with light theme if preferred by system and no localStorage preference', () => {
        // Mock system preference for light theme
        window.matchMedia.mockImplementation((query) => ({
            matches: query === '(prefers-color-scheme: dark)' ? false : true,
            media: query,
            onchange: null,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        }));

        initThemeToggle();

        expect(localStorageMock.getItem).toHaveBeenCalledWith('portfolio-theme');
        expect(mockHtmlElement.classList.remove).toHaveBeenCalledWith('dark');
        expect(localStorageMock.setItem).toHaveBeenCalledWith('portfolio-theme', 'light');
        expect(themeToggleIcon.classList.remove).toHaveBeenCalledWith('fa-moon');
        expect(themeToggleIcon.classList.add).toHaveBeenCalledWith('fa-sun');
    });

    test('should initialize with theme from localStorage if available', () => {
        localStorageMock.getItem.mockReturnValue('light');
        initThemeToggle();

        expect(localStorageMock.getItem).toHaveBeenCalledWith('portfolio-theme');
        expect(mockHtmlElement.classList.remove).toHaveBeenCalledWith('dark');
        expect(localStorageMock.setItem).toHaveBeenCalledWith('portfolio-theme', 'light'); // Should be called once during init
        expect(themeToggleIcon.classList.remove).toHaveBeenCalledWith('fa-moon');
        expect(themeToggleIcon.classList.add).toHaveBeenCalledWith('fa-sun');
    });

    test('should toggle theme from dark to light on button click', () => {
        // Initial state: dark theme
        localStorageMock.getItem.mockReturnValue('dark');
        mockHtmlElement.classList.contains.mockReturnValue(true); // Simulate html element has 'dark' class
        initThemeToggle();
        expect(mockHtmlElement.classList.add).toHaveBeenCalledWith('dark');

        // Click to toggle
        themeToggleButton.click();

        expect(mockHtmlElement.classList.remove).toHaveBeenCalledWith('dark');
        expect(localStorageMock.setItem).toHaveBeenCalledWith('portfolio-theme', 'light');
        expect(themeToggleIcon.classList.remove).toHaveBeenCalledWith('fa-moon');
        expect(themeToggleIcon.classList.add).toHaveBeenCalledWith('fa-sun');
    });

    test('should toggle theme from light to dark on button click', () => {
        // Initial state: light theme
        localStorageMock.getItem.mockReturnValue('light');
        mockHtmlElement.classList.contains.mockReturnValue(false); // Simulate html element does not have 'dark' class
        initThemeToggle();
        expect(mockHtmlElement.classList.remove).toHaveBeenCalledWith('dark');

        // Click to toggle
        themeToggleButton.click();

        expect(mockHtmlElement.classList.add).toHaveBeenCalledWith('dark');
        expect(localStorageMock.setItem).toHaveBeenCalledWith('portfolio-theme', 'dark');
        expect(themeToggleIcon.classList.remove).toHaveBeenCalledWith('fa-sun');
        expect(themeToggleIcon.classList.add).toHaveBeenCalledWith('fa-moon');
    });

    test('should not throw error if theme toggle icon is not found', () => {
        document.body.innerHTML = `
      <button id="theme-toggle"></button>
    `; // Clear the DOM, only button exists
        themeToggleButton = document.getElementById('theme-toggle');
        themeToggleIcon = document.getElementById('theme-toggle-icon'); // This will be null

        localStorageMock.getItem.mockReturnValue(null); // No stored preference
        window.matchMedia.mockImplementation((query) => ({
            matches: query === '(prefers-color-scheme: dark)' ? true : false,
            media: query,
            onchange: null,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        }));

        // Expect no error to be thrown
        expect(() => initThemeToggle()).not.toThrow();

        expect(localStorageMock.getItem).toHaveBeenCalledWith('portfolio-theme');
        expect(mockHtmlElement.classList.add).toHaveBeenCalledWith('dark');
        expect(localStorageMock.setItem).toHaveBeenCalledWith('portfolio-theme', 'dark');
        // Since themeToggleIcon is null, its classList methods should not be called
        expect(themeToggleIcon).toBeNull();
    });

    test('should update theme when system preference changes and no user preference is stored', () => {
        let mediaQueryListener = null;
        window.matchMedia.mockImplementation((query) => ({
            matches: query === '(prefers-color-scheme: dark)' ? false : true, // Initially light
            media: query,
            onchange: null,
            addEventListener: jest.fn((event, callback) => {
                if (event === 'change') {
                    mediaQueryListener = callback;
                }
            }),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        }));

        localStorageMock.getItem.mockReturnValue(null); // No stored preference
        initThemeToggle();

        // Initially light theme
        expect(mockHtmlElement.classList.remove).toHaveBeenCalledWith('dark');
        expect(localStorageMock.setItem).toHaveBeenCalledWith('portfolio-theme', 'light');

        // Simulate system preference changing to dark
        mockHtmlElement.classList.add.mockClear();
        localStorageMock.setItem.mockClear();
        if (mediaQueryListener) {
            mediaQueryListener({ matches: true }); // System prefers dark
        }

        expect(mockHtmlElement.classList.add).toHaveBeenCalledWith('dark');
        expect(localStorageMock.setItem).toHaveBeenCalledWith('portfolio-theme', 'dark');
    });

    test('should not update theme when system preference changes if user preference is stored', () => {
        let mediaQueryListener = null;
        window.matchMedia.mockImplementation((query) => ({
            matches: query === '(prefers-color-scheme: dark)' ? false : true, // Initially light
            media: query,
            onchange: null,
            addEventListener: jest.fn((event, callback) => {
                if (event === 'change') {
                    mediaQueryListener = callback;
                }
            }),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        }));

        localStorageMock.getItem.mockReturnValue('dark'); // User preference is dark
        initThemeToggle();

        // Initially dark theme due to user preference
        expect(mockHtmlElement.classList.add).toHaveBeenCalledWith('dark');
        expect(localStorageMock.setItem).toHaveBeenCalledWith('portfolio-theme', 'dark');

        // Simulate system preference changing to light
        mockHtmlElement.classList.add.mockClear();
        mockHtmlElement.classList.remove.mockClear();
        localStorageMock.setItem.mockClear();
        if (mediaQueryListener) {
            mediaQueryListener({ matches: false }); // System prefers light
        }

        // Should not change theme because user preference is stored
        expect(mockHtmlElement.classList.remove).not.toHaveBeenCalledWith('dark');
        expect(mockHtmlElement.classList.add).not.toHaveBeenCalledWith('light'); // No 'light' class is added, 'dark' is removed
        expect(localStorageMock.setItem).not.toHaveBeenCalled();
    });
});
