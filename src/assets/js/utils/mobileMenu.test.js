import { initMobileMenu } from '@utils/mobileMenu.js';

describe('mobileMenu', () => {
    let mobileMenuButton;
    let mobileMenu;

    beforeEach(() => {
        document.body.innerHTML = `
      <button id="mobile-menu-button"></button>
      <nav id="mobile-menu" class="hidden">
        <a href="#home">Home</a>
        <a href="#about">About</a>
      </nav>
    `;
        mobileMenuButton = document.getElementById('mobile-menu-button');
        mobileMenu = document.getElementById('mobile-menu');

        // Spy on classList methods
        jest.spyOn(mobileMenu.classList, 'toggle');
        jest.spyOn(mobileMenu.classList, 'add');

        // Initialize the mobile menu functionality
        initMobileMenu();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should toggle mobile menu visibility when button is clicked', () => {
        expect(mobileMenu.classList.contains('hidden')).toBe(true);

        mobileMenuButton.click();
        expect(mobileMenu.classList.toggle).toHaveBeenCalledWith('hidden');
        expect(mobileMenu.classList.contains('hidden')).toBe(false);

        mobileMenuButton.click();
        expect(mobileMenu.classList.toggle).toHaveBeenCalledWith('hidden');
        expect(mobileMenu.classList.contains('hidden')).toBe(true);
    });

    test('should close mobile menu when clicking outside of menu and button', () => {
        // Open the menu first
        mobileMenuButton.click();
        expect(mobileMenu.classList.contains('hidden')).toBe(false);

        // Simulate a click outside
        document.body.click();

        expect(mobileMenu.classList.add).toHaveBeenCalledWith('hidden');
        expect(mobileMenu.classList.contains('hidden')).toBe(true);
    });

    test('should not close mobile menu when clicking inside the menu', () => {
        // Open the menu first
        mobileMenuButton.click();
        expect(mobileMenu.classList.contains('hidden')).toBe(false);

        // Simulate a click inside the menu
        mobileMenu.click();

        expect(mobileMenu.classList.add).not.toHaveBeenCalledWith('hidden');
        expect(mobileMenu.classList.contains('hidden')).toBe(false);
    });

    test('should not close mobile menu when clicking on the button', () => {
        // Open the menu first
        mobileMenuButton.click();
        expect(mobileMenu.classList.contains('hidden')).toBe(false);

        // Simulate a click on the button again
        mobileMenuButton.click(); // This will toggle it closed, but the document click listener shouldn't interfere

        // The toggle handles the close, not the document listener in this specific case
        // We are testing that the document listener *doesn't* add 'hidden' if the button was clicked
        expect(mobileMenu.classList.add).not.toHaveBeenCalledWith('hidden');
    });

    test('should close mobile menu when a navigation link is clicked', () => {
        // Open the menu first
        mobileMenuButton.click();
        expect(mobileMenu.classList.contains('hidden')).toBe(false);

        const navLink = mobileMenu.querySelector('a');
        navLink.click();

        expect(mobileMenu.classList.add).toHaveBeenCalledWith('hidden');
        expect(mobileMenu.classList.contains('hidden')).toBe(true);
    });

    test('should do nothing if mobile menu button or menu are not found', () => {
        document.body.innerHTML = ''; // Clear the DOM
        // Re-initialize without the elements
        initMobileMenu();

        // Expect no errors from initMobileMenu itself
        expect(() => initMobileMenu()).not.toThrow();
    });
});
