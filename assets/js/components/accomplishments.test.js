import { populateAccomplishments } from '@components/accomplishments.js';

describe('populateAccomplishments', () => {
    let accomplishmentsContainer;

    beforeEach(() => {
        document.body.innerHTML = `
      <div id="accomplishments-container"></div>
    `;
        accomplishmentsContainer = document.getElementById('accomplishments-container');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should populate accomplishments correctly with links', () => {
        const accomplishments = [
            { text: 'Accomplishment 1', link: 'https://example.com/1' },
            { text: 'Accomplishment 2', link: 'https://example.com/2' },
        ];

        populateAccomplishments(accomplishments);

        expect(accomplishmentsContainer.innerHTML).toContain(
            '<i class="fa-solid fa-trophy mr-3 text-primary-600"></i>'
        );
        expect(accomplishmentsContainer.innerHTML).toContain(
            '<span class="flex-1">Accomplishment 1</span>'
        );
        expect(accomplishmentsContainer.innerHTML).toContain(
            '<a href="https://example.com/1" target="_blank" rel="noopener noreferrer" class="ml-2 text-primary-600 hover:text-primary-dark"><i class="fas fa-external-link-alt"></i></a>'
        );
        expect(accomplishmentsContainer.innerHTML).toContain(
            '<span class="flex-1">Accomplishment 2</span>'
        );
        expect(accomplishmentsContainer.innerHTML).toContain(
            '<a href="https://example.com/2" target="_blank" rel="noopener noreferrer" class="ml-2 text-primary-600 hover:text-primary-dark"><i class="fas fa-external-link-alt"></i></a>'
        );
    });

    test('should populate accomplishments correctly without links', () => {
        const accomplishments = [{ text: 'Accomplishment 3' }, { text: 'Accomplishment 4' }];

        populateAccomplishments(accomplishments);

        expect(accomplishmentsContainer.innerHTML).toContain(
            '<span class="flex-1">Accomplishment 3</span>'
        );
        expect(accomplishmentsContainer.innerHTML).not.toContain('<a href="https://example.com/3"');
        expect(accomplishmentsContainer.innerHTML).toContain(
            '<span class="flex-1">Accomplishment 4</span>'
        );
        expect(accomplishmentsContainer.innerHTML).not.toContain('<a href="https://example.com/4"');
    });

    test('should handle empty accomplishments array', () => {
        const accomplishments = [];
        populateAccomplishments(accomplishments);
        expect(accomplishmentsContainer.innerHTML).toBe(`
        <div class="max-w-4xl mx-auto">
            <ul class="list-none space-y-4">
                
            </ul>
        </div>
    `);
    });

    test('should do nothing if accomplishments container is not found', () => {
        document.body.innerHTML = ''; // Clear the DOM
        const accomplishments = [{ text: 'Accomplishment 1' }];
        populateAccomplishments(accomplishments);
        expect(document.body.innerHTML).toBe(''); // Ensure no changes to the body
    });
});
