/**
 * About section component
 */

import { setText } from '../utils/dom';

export const populateAbout = (about) => {
    setText('user-about', about);
};
