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

export const setText = (element, text) => {
    if (element) element.textContent = text;
};

export const setHTML = (element, html) => {
    if (element) element.innerHTML = html;
};

export const appendChildren = (parent, ...children) => {
    if (!parent) return;
    children.forEach(child => child && parent.appendChild(child));
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
