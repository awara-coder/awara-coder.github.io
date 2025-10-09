import { createElement, getElement } from '../assets/js/utils/dom.js';

describe('DOM Utility Functions', () => {
    test('createElement creates an element with tag, class, and text', () => {
        const element = createElement('div', 'test-class', 'Test Text');
        expect(element.tagName).toBe('DIV');
        expect(element.classList.contains('test-class')).toBe(true);
        expect(element.textContent).toBe('Test Text');
    });

    test('getElement returns the correct element', () => {
        document.body.innerHTML = '<div id="test-id"></div>';
        const element = getElement('#test-id');
        expect(element).not.toBeNull();
        expect(element.id).toBe('test-id');
    });
});
