/**
 * Hero section component
 */

import { setText } from '../utils/dom';

export const populateHero = (name, bio) => {
    setText('user-name', name);
    setText('user-bio', bio);
};
