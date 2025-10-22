import { loadPortfolioData } from '@utils/dataLoader.js';
import { initializePortfolio } from '@components/portfolio.js';

// Mock the initializePortfolio function
jest.mock('@components/portfolio.js', () => ({
    initializePortfolio: jest.fn(),
}));

describe('dataLoader', () => {
    let mockLoadingScreen;

    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();

        // Mock the fetch API
        global.fetch = jest.fn();

        // Mock DOM elements
        document.body.innerHTML = `
      <div id="loading-screen"></div>
    `;
        mockLoadingScreen = document.getElementById('loading-screen');
        mockLoadingScreen.classList.add = jest.fn();
        mockLoadingScreen.remove = jest.fn();
        mockLoadingScreen.addEventListener = jest.fn((event, callback) => {
            if (event === 'transitionend') {
                callback(); // Immediately call the callback for testing purposes
            }
        });

        // Spy on console.error to prevent it from cluttering test output
        jest.spyOn(console, 'error').mockImplementation(() => {});
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => {
        // Restore original console functions
        jest.restoreAllMocks();
    });

    test('should successfully load data and initialize portfolio', async () => {
        const mockData = {
            name: 'Test',
            bio: 'Bio',
            about: 'About',
            skills: [],
            projects: [],
            experience: {},
            accomplishments: {},
            contact: {},
        };

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockData),
        });

        await loadPortfolioData();

        expect(global.fetch).toHaveBeenCalledWith('/data/data.json');
        expect(initializePortfolio).toHaveBeenCalledWith(mockData);
        expect(mockLoadingScreen.classList.add).toHaveBeenCalledWith('hidden');
        expect(mockLoadingScreen.remove).toHaveBeenCalled();
        expect(console.error).not.toHaveBeenCalled();
    });

    test('should handle HTTP errors during data loading', async () => {
        const errorMessage = 'Not Found';
        global.fetch.mockResolvedValueOnce({
            ok: false,
            status: 404,
            text: () => Promise.resolve(errorMessage),
        });

        await loadPortfolioData();

        expect(global.fetch).toHaveBeenCalledWith('/data/data.json');
        expect(initializePortfolio).not.toHaveBeenCalled();
        expect(console.error).toHaveBeenCalledWith(
            'Error in loadPortfolioData:',
            expect.any(Error)
        );
        expect(document.body.innerHTML).toContain(
            `Failed to load portfolio data: HTTP error! status: 404`
        );
        expect(mockLoadingScreen.classList.add).toHaveBeenCalledWith('hidden');
        expect(mockLoadingScreen.remove).toHaveBeenCalled();
    });

    test('should handle invalid JSON data', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.reject(new Error('Invalid JSON')),
        });

        await loadPortfolioData();

        expect(global.fetch).toHaveBeenCalledWith('/data/data.json');
        expect(initializePortfolio).not.toHaveBeenCalled();
        expect(console.error).toHaveBeenCalledWith(
            'Error in loadPortfolioData:',
            expect.any(Error)
        );
        expect(document.body.innerHTML).toContain(`Failed to load portfolio data: Invalid JSON`);
        expect(mockLoadingScreen.classList.add).toHaveBeenCalledWith('hidden');
        expect(mockLoadingScreen.remove).toHaveBeenCalled();
    });

    test('should handle invalid data format (not an object)', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve('not an object'),
        });

        await loadPortfolioData();

        expect(global.fetch).toHaveBeenCalledWith('/data/data.json');
        expect(initializePortfolio).not.toHaveBeenCalled();
        expect(console.error).toHaveBeenCalledWith(
            'Error in loadPortfolioData:',
            expect.any(Error)
        );
        expect(document.body.innerHTML).toContain(
            `Failed to load portfolio data: Invalid data format: expected an object`
        );
        expect(mockLoadingScreen.classList.add).toHaveBeenCalledWith('hidden');
        expect(mockLoadingScreen.remove).toHaveBeenCalled();
    });

    test('should hide loading screen even if an error occurs', async () => {
        global.fetch.mockRejectedValueOnce(new Error('Network error'));

        await loadPortfolioData();

        expect(mockLoadingScreen.classList.add).toHaveBeenCalledWith('hidden');
        expect(mockLoadingScreen.remove).toHaveBeenCalled();
        expect(console.error).toHaveBeenCalledWith(
            'Error in loadPortfolioData:',
            expect.any(Error)
        );
    });

    test('should not try to hide loading screen if it does not exist', async () => {
        document.body.innerHTML = ''; // No loading screen element

        const mockData = {
            name: 'Test',
            bio: 'Bio',
            about: 'About',
            skills: [],
            projects: [],
            experience: {},
            accomplishments: {},
            contact: {},
        };

        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockData),
        });

        await loadPortfolioData();

        // Expect no errors related to loadingScreen being null
        expect(console.error).not.toHaveBeenCalled();
        // Ensure no attempts to call methods on a non-existent loading screen
        // This is implicitly tested by not having mockLoadingScreen.classList.add etc. called
    });
});
