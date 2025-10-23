import { initializePortfolio, initApp } from '@components/portfolio.js';
import { populateHero } from '@components/hero.js';
import { populateAbout } from '@components/about.js';
import { populateSkills } from '@components/skills.js';
import { populateProjects } from '@components/projects.js';
import { populateExperience } from '@components/experience.js';
import { populateAccomplishments } from '@components/accomplishments.js';
import { populateContact } from '@components/contact.js';

let mockLoadPortfolioData = jest.fn();

// Mock all dependent populate functions
jest.mock('@components/hero.js', () => ({
    populateHero: jest.fn(),
}));
jest.mock('@components/about.js', () => ({
    populateAbout: jest.fn(),
}));
jest.mock('@components/skills.js', () => ({
    populateSkills: jest.fn(),
}));
jest.mock('@components/projects.js', () => ({
    populateProjects: jest.fn(),
}));
jest.mock('@components/experience.js', () => ({
    populateExperience: jest.fn(),
}));
jest.mock('@components/accomplishments.js', () => ({
    populateAccomplishments: jest.fn(),
}));
jest.mock('@components/contact.js', () => ({
    populateContact: jest.fn(),
}));

// Mock dynamic imports for initApp
jest.mock('@utils/dataLoader.js', () => ({
    loadPortfolioData: mockLoadPortfolioData,
}));

describe('portfolio.js', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, 'log');
        jest.spyOn(console, 'error');
        jest.spyOn(console, 'warn');
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('initializePortfolio', () => {
        test('should call all populate functions with correct data', () => {
            const mockData = {
                name: 'Test Name',
                bio: 'Test Bio',
                about: 'Test About',
                skills: ['JS'],
                projects: [{}],
                experience: [{}],
                accomplishments: [{}],
                contact: {},
            };

            initializePortfolio(mockData);

            expect(console.log).toHaveBeenCalledWith('Initializing portfolio with data:', mockData);
            expect(populateHero).toHaveBeenCalledWith(mockData.name, mockData.bio);
            expect(populateAbout).toHaveBeenCalledWith(mockData.about);
            expect(populateSkills).toHaveBeenCalledWith(mockData.skills);
            expect(populateProjects).toHaveBeenCalledWith(mockData.projects);
            expect(populateExperience).toHaveBeenCalledWith(mockData.experience);
            expect(populateAccomplishments).toHaveBeenCalledWith(mockData.accomplishments);
            expect(populateContact).toHaveBeenCalledWith(mockData.contact);
            expect(console.error).not.toHaveBeenCalled();
        });

        test('should handle missing name and bio data', () => {
            const mockData = {
                about: 'Test About',
                skills: ['JS'],
                projects: [{}],
                experience: [{}],
                accomplishments: [{}],
                contact: {},
            };

            initializePortfolio(mockData);

            expect(populateHero).toHaveBeenCalledWith('', '');
        });

        test('should warn if skills data is missing or malformed', () => {
            const mockData = {
                name: 'Test Name',
                bio: 'Test Bio',
                about: 'Test About',
                projects: [{}],
                experience: [{}],
                accomplishments: [{}],
                contact: {},
            };

            initializePortfolio(mockData);

            expect(populateSkills).not.toHaveBeenCalled();
            expect(console.warn).toHaveBeenCalledWith(
                'Skills data is missing or in an unexpected format:',
                undefined
            );

            jest.clearAllMocks();
            const malformedSkillsData = {
                ...mockData,
                skills: 'not an array',
            };
            initializePortfolio(malformedSkillsData);
            expect(populateSkills).not.toHaveBeenCalled();
            expect(console.warn).toHaveBeenCalledWith(
                'Skills data is missing or in an unexpected format:',
                'not an array'
            );
        });

        test('should throw error if no data is provided', () => {
            expect(() => initializePortfolio(null)).toThrow(
                'No data provided to initialize portfolio'
            );
            expect(console.error).toHaveBeenCalledWith(
                'Error initializing portfolio:',
                expect.any(Error)
            );
        });

        test('should catch and re-throw errors from populate functions', () => {
            populateHero.mockImplementation(() => {
                throw new Error('Hero error');
            });
            const mockData = {
                name: 'Test Name',
                bio: 'Test Bio',
                about: 'Test About',
                skills: ['JS'],
                projects: [{}],
                experience: [{}],
                accomplishments: [{}],
                contact: {},
            };

            expect(() => initializePortfolio(mockData)).toThrow('Hero error');
            expect(console.error).toHaveBeenCalledWith(
                'Error initializing portfolio:',
                expect.any(Error)
            );
        });
    });

    describe('initApp', () => {
        beforeEach(() => {
            // Mock dynamic imports
            mockLoadPortfolioData.mockImplementation(() => Promise.resolve());
        });

        test('should load portfolio data and initialize smooth scroll', async () => {
            await expect(initApp()).resolves.toBe();

            expect(mockLoadPortfolioData).toHaveBeenCalled();
            expect(console.error).not.toHaveBeenCalled();
        });

        test('should catch and re-throw errors from loadPortfolioData', async () => {
            mockLoadPortfolioData.mockRejectedValueOnce(new Error('Data load error'));

            await expect(initApp()).rejects.toThrow('Data load error');
            expect(console.error).toHaveBeenCalledWith('Error in initApp:', expect.any(Error));
        });
    });
});
