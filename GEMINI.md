# Gemini LLM Testing Guidelines

This document outlines the best practices and instructions for the Gemini LLM when writing and running tests within this project.

## General Principles

*   **Adhere to Project Conventions:** Always follow the existing testing patterns, file structures, and naming conventions established in the project (e.g., co-located `*.test.js` files, `*.test.js` naming).
*   **Focus on Unit Tests:** Prioritize writing focused unit tests that isolate individual functions or components.
*   **Mock Dependencies:** Effectively use Jest's mocking capabilities (`jest.mock()`, `jest.spyOn()`) to isolate the code under test from its dependencies (e.g., DOM, other modules, API calls).
*   **Clear Assertions:** Write clear and specific assertions using `expect()` to verify expected behavior.
*   **High Coverage:** Strive for high test coverage, especially for critical logic, edge cases, and error handling.
*   **No Production Code Changes:** When tasked with writing tests, *do not* modify any production code. If a design issue makes testing difficult, note it for future refactoring.
*   **Run Tests Frequently:** After adding or modifying tests, always run `npm run test:unit` to ensure everything passes.

## Test File Location and Naming

*   **Location:** All unit test files should reside in the same directory as the file they are testing.
*   **Structure:** Test files should be co-located with their corresponding source files. For example, tests for `assets/js/components/portfolio.js` should be in `assets/js/components/portfolio.test.js`.
*   **Naming:** Use the `[moduleName].test.js` convention (e.g., `dom.test.js`).

## Jest Configuration and Usage

*   **`jest.config.js`:** Refer to this file for global Jest configurations.
*   **Running Tests:**
    *   To run all unit tests: `npm run test:unit`
    *   To run specific tests: `npm run test:unit -- <path/to/test/file.test.js>`

## Mocking Specifics

*   **DOM Interaction:**
    *   Jest runs in a `jsdom` environment, so basic DOM manipulation works.
    *   For specific DOM elements or methods, use `jest.spyOn(document, 'getElementById')` or create mock elements.
*   **Module Imports:**
    *   To mock a module: `jest.mock('../../path/to/module.js');`
    *   To control mocked module behavior:
        ```javascript
        import { someFunction } from '../../path/to/module.js';
        jest.mock('../../path/to/module.js', () => ({
          someFunction: jest.fn(() => 'mocked value'),
        }));
        ```
*   **Asynchronous Operations (e.g., `fetch`):**
    *   Mock `fetch` globally or per test:
        ```javascript
        global.fetch = jest.fn(() =>
          Promise.resolve({
            json: () => Promise.resolve({ /* mock data */ }),
          })
        );
        ```
    *   Remember to `jest.restoreAllMocks()` or reset mocks in `afterEach()`.

## Example Test Structure

```javascript
// assets/js/utils/someUtility.test.js
import { someFunction } from './someUtility.js';

describe('someUtility', () => {
  beforeEach(() => {
    // Setup mocks or test environment
  });

  afterEach(() => {
    // Clean up mocks or test environment
    jest.restoreAllMocks();
  });

  test('someFunction should return the correct value for valid input', () => {
    // Arrange
    const input = 'test';
    const expected = 'expected result';

    // Act
    const result = someFunction(input);

    // Assert
    expect(result).toBe(expected);
  });

  test('someFunction should handle edge cases', () => {
    // ...
  });
});
```