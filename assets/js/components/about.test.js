import { populateAbout } from '@components/about.js';
import { setText } from '@utils/dom.js';

// Mock the setText function
jest.mock('@utils/dom.js', () => ({
    setText: jest.fn(),
}));

describe('populateAbout', () => {
    let aboutElement;

    beforeEach(() => {
        // Create the mock element here, which will be returned by the mocked getElementById
        aboutElement = { innerHTML: '', classList: { add: jest.fn(), remove: jest.fn() } };

        // Mock document.getElementById to control its behavior and simulate element presence/absence.
        jest.spyOn(document, 'getElementById').mockImplementation((id) => {
            if (id === 'user-about') {
                // Only return aboutElement if it's supposed to be in the DOM
                // We can check if document.body.innerHTML contains the element's ID
                if (document.body.innerHTML.includes(`id="${id}"`)) {
                    return aboutElement;
                }
            }
            return null;
        });

        document.body.innerHTML = `
      <div id="user-about"></div>
    `;

        // Spy on console.error
        jest.spyOn(console, 'error').mockImplementation(() => {});

        // Clear mock calls
        setText.mockClear();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should populate the about section if element exists', () => {
        const aboutText = 'This is my about section.';
        populateAbout(aboutText);

        expect(document.getElementById).toHaveBeenCalledWith('user-about');
        expect(setText).toHaveBeenCalledWith(aboutElement, aboutText);
        expect(console.error).not.toHaveBeenCalled();
    });

    test('should log an error if the about section element is not found', () => {
        document.body.innerHTML = ''; // Clear the DOM
        populateAbout('Some text');

        expect(document.getElementById).toHaveBeenCalledWith('user-about');
        expect(setText).not.toHaveBeenCalled();
        expect(console.error).toHaveBeenCalledWith('About section element not found in the DOM');
    });
});
