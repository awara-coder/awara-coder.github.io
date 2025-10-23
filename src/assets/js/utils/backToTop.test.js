import { initBackToTopButton } from '@utils/backToTop.js';

describe('backToTop', () => {
    let backToTopButton;

    beforeEach(() => {
        document.body.innerHTML = `
      <button id="back-to-top" class="opacity-0 invisible"></button>
    `;
        backToTopButton = document.getElementById('back-to-top');

        // Spy on classList methods
        jest.spyOn(backToTopButton.classList, 'remove');
        jest.spyOn(backToTopButton.classList, 'add');

        // Spy on window.scrollTo
        jest.spyOn(window, 'scrollTo').mockImplementation(() => {});

        // Spy on console.warn
        jest.spyOn(console, 'warn').mockImplementation(() => {});

        // Reset scroll position for each test
        Object.defineProperty(window, 'pageYOffset', {
            writable: true,
            value: 0,
        });

        initBackToTopButton();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should log a warning if the back to top button is not found', () => {
        document.body.innerHTML = ''; // Clear the DOM
        initBackToTopButton();
        expect(console.warn).toHaveBeenCalledWith('Back to top button element not found.');
    });

    test('should show button when scrolling down past 300px', () => {
        Object.defineProperty(window, 'pageYOffset', {
            writable: true,
            value: 301,
        });
        window.dispatchEvent(new Event('scroll'));

        expect(backToTopButton.classList.remove).toHaveBeenCalledWith('opacity-0', 'invisible');
        expect(backToTopButton.classList.add).toHaveBeenCalledWith('opacity-100', 'visible');
    });

    test('should hide button when scrolling up above 300px', () => {
        // First, make it visible
        Object.defineProperty(window, 'pageYOffset', {
            writable: true,
            value: 301,
        });
        window.dispatchEvent(new Event('scroll'));
        backToTopButton.classList.remove.mockClear();
        backToTopButton.classList.add.mockClear();

        // Then scroll up
        Object.defineProperty(window, 'pageYOffset', {
            writable: true,
            value: 299,
        });
        window.dispatchEvent(new Event('scroll'));

        expect(backToTopButton.classList.remove).toHaveBeenCalledWith('opacity-100', 'visible');
        expect(backToTopButton.classList.add).toHaveBeenCalledWith('opacity-0', 'invisible');
    });

    test('should scroll to top when button is clicked', () => {
        backToTopButton.click();
        expect(window.scrollTo).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });
});
