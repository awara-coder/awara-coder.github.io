import { populateExperience } from '@components/experience.js';

describe('populateExperience', () => {
    let experienceContainer;

    beforeEach(() => {
        document.body.innerHTML = `
      <div id="experience-container"></div>
    `;
        experienceContainer = document.getElementById('experience-container');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should populate experience correctly with logo', () => {
        const experience = [
            {
                title: 'Software Engineer',
                company: 'Tech Corp',
                period: 'Jan 2020 - Dec 2022',
                logoUrl: 'https://example.com/logo.png',
                description: ['Developed web applications', 'Managed databases'],
            },
        ];

        populateExperience(experience);

        expect(experienceContainer.innerHTML).toContain(
            '<h3 class="text-xl font-semibold text-gray-800 dark:text-white">Software Engineer</h3>'
        );
        expect(experienceContainer.innerHTML).toContain(
            '<h4 class="text-lg font-medium text-gray-700 dark:text-gray-200">Tech Corp</h4>'
        );
        expect(experienceContainer.innerHTML).toContain(
            '<p class="text-muted dark:text-gray-400">Jan 2020 - Dec 2022</p>'
        );
        expect(experienceContainer.innerHTML).toContain(
            '<img src="https://example.com/logo.png" alt="Tech Corp Logo" class="company-logo w-12 h-12 rounded-full object-cover border border-gray-200 dark:border-gray-700" style="position: absolute; top: 0; left: 0;" onerror="this.remove()">'
        );
        expect(experienceContainer.innerHTML).toContain(
            '<span class="flex-1">Developed web applications</span>'
        );
        expect(experienceContainer.innerHTML).toContain(
            '<span class="flex-1">Managed databases</span>'
        );
    });

    test('should populate experience correctly without logo', () => {
        const experience = [
            {
                title: 'Junior Developer',
                company: 'Startup Inc.',
                period: 'Jan 2019 - Dec 2019',
                description: ['Assisted senior developers'],
            },
        ];

        populateExperience(experience);

        expect(experienceContainer.innerHTML).toContain(
            '<h3 class="text-xl font-semibold text-gray-800 dark:text-white">Junior Developer</h3>'
        );
        expect(experienceContainer.innerHTML).not.toContain('<img');
        expect(experienceContainer.innerHTML).toContain(
            '<div class="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 grid place-items-center"><i class="fas fa-suitcase text-2xl text-gray-400 dark:text-gray-500"></i></div>'
        );
    });

    test('should handle empty experience array', () => {
        const experience = [];
        populateExperience(experience);
        expect(experienceContainer.innerHTML).toBe('');
    });

    test('should do nothing if experience container is not found', () => {
        document.body.innerHTML = ''; // Clear the DOM
        const experience = [
            {
                title: 'Software Engineer',
                company: 'Tech Corp',
                period: 'Jan 2020 - Dec 2022',
                description: ['Developed web applications'],
            },
        ];
        populateExperience(experience);
        expect(document.body.innerHTML).toBe(''); // Ensure no changes to the body
    });
});
