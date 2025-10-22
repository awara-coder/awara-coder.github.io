import { populateHero } from '@components/hero.js';
import { setText } from '@utils/dom.js';

// Mock the setText function
jest.mock('@utils/dom.js', () => ({
    setText: jest.fn(),
}));

describe('populateHero', () => {
    let nameElement;
    let bioElement;
    let getElementByIdSpy;

    beforeEach(() => {
        document.body.innerHTML = `
      <div id="user-name"></div>
      <div id="user-bio"></div>
    `;
        nameElement = document.getElementById('user-name');
        bioElement = document.getElementById('user-bio');

        // Spy on console.error and console.log
        jest.spyOn(console, 'error').mockImplementation(() => {});
        jest.spyOn(console, 'log').mockImplementation(() => {});

        getElementByIdSpy = jest.spyOn(document, 'getElementById');

        // Clear mock calls
        setText.mockClear();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should populate name and bio if elements exist', () => {
        const name = 'John Doe';
        const bio = 'Software Developer';
        populateHero(name, bio);

        expect(console.log).toHaveBeenCalledWith('Populating hero section with:', { name, bio });
        expect(getElementByIdSpy).toHaveBeenCalledWith('user-name');
        expect(setText).toHaveBeenCalledWith(nameElement, name);
        expect(getElementByIdSpy).toHaveBeenCalledWith('user-bio');
        expect(setText).toHaveBeenCalledWith(bioElement, bio);
        expect(console.error).not.toHaveBeenCalled();
    });

    test('should use default name if name is not provided', () => {
        const name = '';
        const bio = 'Software Developer';
        populateHero(name, bio);

        expect(setText).toHaveBeenCalledWith(nameElement, 'Sagar Gupta');
    });

    test('should use default bio if bio is not provided', () => {
        const name = 'John Doe';
        const bio = '';
        populateHero(name, bio);

        expect(setText).toHaveBeenCalledWith(bioElement, '');
    });

    test('should log an error if name element is not found', () => {
        document.body.innerHTML = `
      <div id="user-bio"></div>
    `; // Only bio element exists
        bioElement = document.getElementById('user-bio'); // Re-get bioElement

        const name = 'John Doe';
        const bio = 'Software Developer';
        populateHero(name, bio);

        expect(console.error).toHaveBeenCalledWith(
            'Hero section name element not found in the DOM'
        );
        expect(setText).not.toHaveBeenCalledWith(nameElement, expect.any(String));
        expect(setText).toHaveBeenCalledWith(bioElement, bio);
    });

    test('should log an error if bio element is not found', () => {
        document.body.innerHTML = `
      <div id="user-name"></div>
    `; // Only name element exists
        nameElement = document.getElementById('user-name'); // Re-get nameElement

        const name = 'John Doe';
        const bio = 'Software Developer';
        populateHero(name, bio);

        expect(console.error).toHaveBeenCalledWith('Hero section bio element not found in the DOM');
        expect(setText).toHaveBeenCalledWith(nameElement, name);
        expect(setText).not.toHaveBeenCalledWith(bioElement, expect.any(String));
    });

    test('should handle errors during population', () => {
        // Force an error by making setText throw
        setText.mockImplementation(() => {
            throw new Error('Mock setText error');
        });

        const name = 'John Doe';
        const bio = 'Software Developer';
        populateHero(name, bio);

        expect(console.error).toHaveBeenCalledWith('Error in populateHero:', expect.any(Error));
    });
});
