import { smoothScroll } from '@utils/smoothScroll.js';

describe('smoothScroll', () => {
    let mockEvent;
    let mockTargetElement;

    beforeEach(() => {
        mockTargetElement = {
            scrollIntoView: jest.fn(),
        };

        mockEvent = {
            preventDefault: jest.fn(),
            target: {
                getAttribute: jest.fn((attr) => {
                    if (attr === 'href') {
                        return '#target-section';
                    }
                    return null;
                }),
            },
        };

        jest.spyOn(document, 'querySelector').mockReturnValue(mockTargetElement);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('should prevent default event behavior', () => {
        smoothScroll(mockEvent);
        expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    test('should scroll to the target section with smooth behavior', () => {
        smoothScroll(mockEvent);
        expect(mockEvent.target.getAttribute).toHaveBeenCalledWith('href');
        expect(document.querySelector).toHaveBeenCalledWith('#target-section');
        expect(mockTargetElement.scrollIntoView).toHaveBeenCalledWith({
            behavior: 'smooth',
        });
    });

    test('should not scroll if target element is not found', () => {
        document.querySelector.mockReturnValue(null);
        smoothScroll(mockEvent);
        expect(mockEvent.target.getAttribute).toHaveBeenCalledWith('href');
        expect(document.querySelector).toHaveBeenCalledWith('#target-section');
        expect(mockTargetElement.scrollIntoView).not.toHaveBeenCalled();
    });

    test('should not scroll if href is null or empty', () => {
        mockEvent.target.getAttribute.mockReturnValue(null);
        smoothScroll(mockEvent);
        expect(mockEvent.target.getAttribute).toHaveBeenCalledWith('href');
        expect(document.querySelector).not.toHaveBeenCalled();
        expect(mockTargetElement.scrollIntoView).not.toHaveBeenCalled();
    });
});
