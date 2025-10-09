/** @type {import('jest').Config} */
const config = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+.js$': 'babel-jest',
    },
    testPathIgnorePatterns: ['/node_modules/', '/e2e/'],
    moduleNameMapper: {
        '^@components/(.*)$': '<rootDir>/assets/js/components/$1',
        '^@utils/(.*)$': '<rootDir>/assets/js/utils/$1',
    },
};

export default config;
