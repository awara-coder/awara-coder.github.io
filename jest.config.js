/** @type {import('jest').Config} */
const config = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+.js$': 'babel-jest',
    },
    testPathIgnorePatterns: ['/node_modules/', '/e2e/'],
};

export default config;
