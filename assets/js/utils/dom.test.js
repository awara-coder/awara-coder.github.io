// assets/js/utils/dom.test.js
import { setText } from './dom.js';

describe('setText', () => {
    let mockElement;
    let consoleErrorSpy;

    beforeEach(() => {
        mockElement = { textContent: '' };
        jest.spyOn(document, 'getElementById').mockReturnValue(mockElement);
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should set text content when a valid ID is provided', () => {
        setText('someId', 'Hello World');
        expect(document.getElementById).toHaveBeenCalledWith('someId');
        expect(mockElement.textContent).toBe('Hello World');
        expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    test('should set text content when a valid element is provided', () => {
        const directElement = { textContent: '' };
        setText(directElement, 'Test Text');
        expect(document.getElementById).not.toHaveBeenCalled();
        expect(directElement.textContent).toBe('Test Text');
        expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    test('should log an error if element with ID is not found', () => {
        document.getElementById.mockReturnValue(null);
        setText('nonExistentId', 'Some Text');
        expect(document.getElementById).toHaveBeenCalledWith('nonExistentId');
        expect(consoleErrorSpy).toHaveBeenCalledWith('Element with ID "nonExistentId" not found');
    });

    test('should log an error if an invalid element is provided', () => {
        setText(null, 'Some Text');
        expect(document.getElementById).not.toHaveBeenCalled();
        expect(consoleErrorSpy).toHaveBeenCalledWith('Invalid element provided to setText');
    });
});
