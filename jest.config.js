/** @type {import('jest').Config} */
const config = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+.js$': 'babel-jest',
    },
    testPathIgnorePatterns: ['/node_modules/', '/e2e/', '/dist/'],
    moduleNameMapper: {
        '^@components/(.*)$': '<rootDir>/src/assets/js/components/$1',
        '^@utils/(.*)$': '<rootDir>/src/assets/js/utils/$1',
    },
};

export default config;
