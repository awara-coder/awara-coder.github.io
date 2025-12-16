/**
 * URL and input validation utilities
 */

/**
 * Validates if a URL is safe to use in href attributes
 * Prevents javascript: and data: URL injection attacks
 *
 * @param {string} url - The URL to validate
 * @returns {boolean} - True if URL is valid and safe
 */
export const isValidUrl = (url) => {
    if (!url || typeof url !== 'string') {
        return false;
    }

    try {
        const parsed = new URL(url, window.location.origin);
        // Only allow http, https, and mailto protocols
        return ['http:', 'https:', 'mailto:'].includes(parsed.protocol);
    } catch {
        // If URL parsing fails, treat as relative URL
        // Check if it starts with / (relative path) or # (anchor)
        return url.startsWith('/') || url.startsWith('#');
    }
};

/**
 * Sanitizes a URL to prevent XSS attacks
 * Returns a safe URL or fallback to '#'
 *
 * @param {string} url - The URL to sanitize
 * @returns {string} - Safe URL or '#' if invalid
 */
export const sanitizeUrl = (url) => {
    return isValidUrl(url) ? url : '#';
};

/**
 * Validates email address format
 *
 * @param {string} email - The email to validate
 * @returns {boolean} - True if email format is valid
 */
export const isValidEmail = (email) => {
    if (!email || typeof email !== 'string') {
        return false;
    }

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
