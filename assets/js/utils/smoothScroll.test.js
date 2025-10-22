import { initSmoothScroll } from './smoothScroll.js';

describe('initSmoothScroll', () => {
    let anchors;
    let mockTargetElement;

    beforeEach(() => {
        // Mock window.scrollTo
        window.scrollTo = jest.fn();
        // Mock history.pushState
        history.pushState = jest.fn();

        // Create a mock target element with offsetTop
        mockTargetElement = {
            offsetTop: 1000,
        };

        // Mock document.querySelector to return the mockTargetElement
        jest.spyOn(document, 'querySelector').mockReturnValue(mockTargetElement);

        const createMockAnchor = (href) => {
            const anchor = {
                getAttribute: jest.fn((attr) => (attr === 'href' ? href : null)),
                clickCallback: null,
                addEventListener: jest.fn(function (event, callback) {
                    if (event === 'click') {
                        // Bind the callback to the anchor itself
                        this.clickCallback = callback.bind(this);
                    }
                }),
                click: function (event = { preventDefault: jest.fn() }) {
                    if (this.clickCallback) {
                        this.clickCallback(event);
                    }
                },
            };
            return anchor;
        };

        // Create mock anchor elements using the factory
        anchors = [
            createMockAnchor('#target-section'),
            createMockAnchor('#'),
            createMockAnchor('/'),
        ];

        // Mock document.querySelectorAll to return our mock anchors
        jest.spyOn(document, 'querySelectorAll').mockReturnValue(anchors);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should attach click event listeners to all anchor tags', () => {
        initSmoothScroll();
        expect(document.querySelectorAll).toHaveBeenCalledWith('a[href^="#"]');
        anchors.forEach((anchor) => {
            expect(anchor.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
        });
    });

    test('should prevent default event behavior when an anchor is clicked', () => {
        initSmoothScroll();
        const preventDefaultSpy = jest.fn();
        anchors[0].clickCallback({ preventDefault: preventDefaultSpy });
        expect(preventDefaultSpy).toHaveBeenCalled();
    });

    test('should scroll to top and update history for home link (#)', () => {
        initSmoothScroll();
        anchors[1].click(); // Simulate click on '#'
        expect(window.scrollTo).toHaveBeenCalledWith({
            top: 0,
            behavior: 'smooth',
        });
        expect(history.pushState).toHaveBeenCalledWith(null, '', ' ');
    });

    test('should scroll to top and update history for home link (/)', () => {
        initSmoothScroll();
        anchors[2].click(); // Simulate click on '/'
        expect(window.scrollTo).toHaveBeenCalledWith({
            top: 0,
            behavior: 'smooth',
        });
        expect(history.pushState).toHaveBeenCalledWith(null, '', ' ');
    });

    test('should scroll to the target section with adjusted offset and update history', () => {
        initSmoothScroll();
        anchors[0].click(); // Simulate click on '#target-section'
        expect(document.querySelector).toHaveBeenCalledWith('#target-section');
        expect(window.scrollTo).toHaveBeenCalledWith({
            top: mockTargetElement.offsetTop - 64,
            behavior: 'smooth',
        });
        expect(history.pushState).toHaveBeenCalledWith(null, '', '#target-section');
    });

    test('should not scroll or update history if target element is not found', () => {
        document.querySelector.mockReturnValue(null); // No target element found
        initSmoothScroll();
        anchors[0].click();
        expect(document.querySelector).toHaveBeenCalledWith('#target-section');
        expect(window.scrollTo).not.toHaveBeenCalled();
        expect(history.pushState).not.toHaveBeenCalled();
    });
});
