/**
 * DOM Utility Functions
 */

export const createElement = (tag, className = '', text = '') => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
};

export const getElement = (selector, parent = document) => parent.querySelector(selector);

export const getElements = (selector, parent = document) => [...parent.querySelectorAll(selector)];

export const setText = (elementOrSelector, text) => {
    let element;

    // If elementOrSelector is a string, treat it as a selector
    if (typeof elementOrSelector === 'string') {
        element = document.getElementById(elementOrSelector);
        if (!element) {
            console.error(`Element with ID "${elementOrSelector}" not found`);
            return;
        }
    } else {
        // Otherwise, assume it's an element
        element = elementOrSelector;
        if (!element) {
            console.error('Invalid element provided to setText');
            return;
        }
    }

    // Now set the text content
    element.textContent = text;
};

export const setHTML = (element, html) => {
    if (element) element.innerHTML = html;
};

export const appendChildren = (parent, ...children) => {
    if (!parent) return;
    children.forEach((child) => child && parent.appendChild(child));
};

export const addClass = (element, className) => {
    if (element) element.classList.add(className);
};

export const removeClass = (element, className) => {
    if (element) element.classList.remove(className);
};

export const toggleClass = (element, className, force) => {
    if (element) element.classList.toggle(className, force);
};
