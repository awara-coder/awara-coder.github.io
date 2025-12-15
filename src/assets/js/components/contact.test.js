import { populateContact } from '@components/contact.js';

describe('populateContact', () => {
    let contactContainer;

    beforeEach(() => {
        // Mock document.getElementById
        jest.spyOn(document, 'getElementById').mockImplementation((id) => {
            if (id === 'contact-container') {
                return contactContainer;
            }
            return null;
        });

        document.body.innerHTML = `
      <div id="contact-container"></div>
    `;
        // Create the mock element here
        contactContainer = {
            _innerHTML: '',
            // Mock innerHTML setter to throw an error for testing purposes
            set innerHTML(value) {
                this._innerHTML = value;
                if (this._throwError) {
                    this._throwError = false; // Reset to prevent subsequent throws
                    throw new Error('Mock innerHTML error');
                }
            },
            get innerHTML() {
                return this._innerHTML;
            },
            _throwError: false, // Flag to control error throwing
        };

        // Spy on console.error and console.log
        jest.spyOn(console, 'error');
        jest.spyOn(console, 'log');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should populate contact section with email, github, and linkedin', () => {
        const contact = {
            email: 'test@example.com',
            github: 'https://github.com/testuser',
            linkedin: 'https://linkedin.com/in/testuser',
        };

        populateContact(contact);

        expect(contactContainer.innerHTML).toContain(
            '<a href="mailto:test@example.com" class="text-blue-600 no-underline transition-colors duration-200 hover:text-blue-800 hover:underline">test@example.com</a>'
        );
        expect(contactContainer.innerHTML).toContain(
            '<a href="https://github.com/testuser" class="text-blue-600 no-underline transition-colors duration-200 hover:text-blue-800 hover:underline" target="_blank" rel="noopener noreferrer">testuser</a>'
        );
        expect(contactContainer.innerHTML).toContain(
            '<a href="https://linkedin.com/in/testuser" class="text-blue-600 no-underline transition-colors duration-200 hover:text-blue-800 hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>'
        );
        expect(console.log).toHaveBeenCalledWith('Populating contact section with:', contact);
        expect(console.error).not.toHaveBeenCalled();
    });

    test('should populate contact section with github, and linkedin', () => {
        const contact = {
            github: 'https://github.com/testuser',
            linkedin: 'https://linkedin.com/in/testuser',
        };

        populateContact(contact);

        expect(contactContainer.innerHTML).not.toContain('@');
        expect(contactContainer.innerHTML).toContain(
            '<a href="https://github.com/testuser" class="text-blue-600 no-underline transition-colors duration-200 hover:text-blue-800 hover:underline" target="_blank" rel="noopener noreferrer">testuser</a>'
        );
        expect(contactContainer.innerHTML).toContain(
            '<a href="https://linkedin.com/in/testuser" class="text-blue-600 no-underline transition-colors duration-200 hover:text-blue-800 hover:underline" target="_blank" rel="noopener noreferrer">LinkedIn Profile</a>'
        );
        expect(console.log).toHaveBeenCalledWith('Populating contact section with:', contact);
        expect(console.error).not.toHaveBeenCalled();
    });

    test('should populate contact section with only email', () => {
        const contact = {
            email: 'test@example.com',
        };

        populateContact(contact);

        expect(contactContainer.innerHTML).toContain('<a href="mailto:test@example.com"');
        expect(contactContainer.innerHTML).not.toContain('github.com');
        expect(contactContainer.innerHTML).not.toContain('linkedin.com');
    });

    test('should log an error if contact container is not found', () => {
        // Temporarily override the mock to return null for 'contact-container'
        jest.spyOn(document, 'getElementById').mockImplementation((id) => {
            if (id === 'contact-container') {
                return null;
            }
            return null;
        });
        document.body.innerHTML = ''; // Clear the DOM after the mock is set
        const contact = { email: 'test@example.com' };
        populateContact(contact);

        expect(console.error).toHaveBeenCalledWith('Contact container not found');
        // Assert that no innerHTML changes occurred on the body
        expect(document.body.innerHTML).toBe('');
    });

    test('should handle error during population and display message', () => {
        const contact = { email: 'test@example.com' }; // Provide valid contact to reach innerHTML setter
        // Set the flag to make innerHTML setter throw
        contactContainer._throwError = true;

        populateContact(contact);

        expect(console.error).toHaveBeenCalledWith(
            'Error populating contact section:',
            expect.any(Error)
        );
        expect(contactContainer.innerHTML).toContain(
            '<p>Unable to load contact information. Please check the console for details.</p>'
        );
    });
});
