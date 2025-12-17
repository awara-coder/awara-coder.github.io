/**
 * Performance optimization utilities
 */

/**
 * Throttles a function to limit how often it can be called
 * Useful for expensive operations triggered by high-frequency events (scroll, resize, etc.)
 *
 * @param {Function} func - The function to throttle
 * @param {number} delay - Minimum time between function calls in milliseconds
 * @returns {Function} - Throttled function
 *
 * @example
 * const throttledScroll = throttle(() => {
 *   console.log('Scroll handler called');
 * }, 100); // Max 10 calls per second
 *
 * window.addEventListener('scroll', throttledScroll);
 */
export const throttle = (func, delay) => {
    let timeoutId;
    let lastRan;

    return function (...args) {
        const context = this;

        if (!lastRan) {
            // First call - execute immediately
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            // Clear any pending execution
            clearTimeout(timeoutId);

            // Schedule execution if enough time has passed
            timeoutId = setTimeout(
                () => {
                    const timeSinceLastRun = Date.now() - lastRan;
                    if (timeSinceLastRun >= delay) {
                        func.apply(context, args);
                        lastRan = Date.now();
                    }
                },
                delay - (Date.now() - lastRan)
            );
        }
    };
};

/**
 * Debounces a function to delay execution until after a period of inactivity
 * Useful for operations that should only happen after user stops an action
 *
 * @param {Function} func - The function to debounce
 * @param {number} delay - Time to wait after last call in milliseconds
 * @returns {Function} - Debounced function
 *
 * @example
 * const debouncedSearch = debounce((query) => {
 *   performSearch(query);
 * }, 300); // Wait 300ms after user stops typing
 *
 * inputElement.addEventListener('input', (e) => debouncedSearch(e.target.value));
 */
export const debounce = (func, delay) => {
    let timeoutId;

    return function (...args) {
        const context = this;

        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };
};
