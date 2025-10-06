/**
 * Skills section component - Simple multi-column layout
 */

export const populateSkills = (skills) => {
    const skillsContainer = document.getElementById('skills-container');
    if (!skillsContainer) return;

    try {
        // Clear previous content
        skillsContainer.innerHTML = '';

        // Create a row for the skill categories
        const row = document.createElement('div');
        row.className = 'flex flex-wrap justify-center gap-6 mt-0'; // skills-row

        // Process each category
        if (Array.isArray(skills)) {
            // Handle array format (categories with descriptions)
            skills.forEach((category) => {
                const categoryEl = document.createElement('div');
                categoryEl.className =
                    'flex-none w-full sm:w-1/2 lg:w-1/4 max-w-xs min-w-64 bg-white rounded-lg p-6 shadow-md transition-all duration-300 ease-in-out border border-gray-200 flex flex-col hover:translate-y-[-5px] hover:shadow-lg hover:border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500'; // skill-category

                const titleEl = document.createElement('h4');
                titleEl.className =
                    'text-gray-800 mb-5 font-semibold text-lg pb-2 border-b border-gray-200 relative dark:text-white dark:border-gray-600'; // skill-category-title
                titleEl.textContent = category.name;

                const skillsList = document.createElement('div');
                skillsList.className = 'flex flex-col gap-3 flex-grow'; // skills-list

                // Split the description by commas and create skill items
                if (category.description) {
                    const skillItems = category.description.split(',').map((skill) => {
                        const skillEl = document.createElement('div');
                        skillEl.className =
                            'flex items-center p-2 text-gray-700 text-base rounded-md transition-all duration-200 ease-in-out bg-gray-50 my-0.5 hover:bg-gray-100 hover:text-gray-900 hover:translate-x-1 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 dark:hover:text-white'; // skill-item
                        skillEl.textContent = skill.trim();
                        return skillEl;
                    });

                    skillsList.append(...skillItems);
                }

                categoryEl.append(titleEl, skillsList);
                row.appendChild(categoryEl);
            });
        } else if (typeof skills === 'object' && skills !== null) {
            // Handle object format (categories with items array)
            Object.entries(skills).forEach(([category, items]) => {
                if (!Array.isArray(items)) return;

                const categoryEl = document.createElement('div');
                categoryEl.className =
                    'flex-none w-full sm:w-1/2 lg:w-1/4 max-w-xs min-w-64 bg-white rounded-lg p-6 shadow-md transition-all duration-300 ease-in-out border border-gray-200 flex flex-col hover:translate-y-[-5px] hover:shadow-lg hover:border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500'; // skill-category

                const titleEl = document.createElement('h4');
                titleEl.className =
                    'text-gray-800 mb-5 font-semibold text-lg pb-3 border-b-2 border-gray-200 relative dark:text-white dark:border-gray-600'; // skill-category-title
                titleEl.textContent = category.charAt(0).toUpperCase() + category.slice(1);

                const skillsList = document.createElement('div');
                skillsList.className = 'flex flex-col gap-3 flex-grow'; // skills-list

                // Create skill items from the items array
                const skillItems = items.map((item) => {
                    const skillEl = document.createElement('div');
                    skillEl.className =
                        'flex items-center p-2 text-gray-700 text-base rounded-md transition-all duration-200 ease-in-out bg-gray-50 my-0.5 hover:bg-gray-100 hover:text-gray-900 hover:translate-x-1 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 dark:hover:text-white'; // skill-item

                    // Create icon element if available
                    if (item.icon) {
                        const iconEl = document.createElement('i');
                        iconEl.className = `flex-shrink-0 w-6 h-6 flex items-center justify-center mr-3 text-xl text-indigo-600 ${item.icon}`;
                        skillEl.appendChild(iconEl);
                    }

                    // Add skill name
                    const nameSpan = document.createElement('span');
                    nameSpan.className = 'leading-tight'; // skill-name
                    nameSpan.textContent =
                        typeof item === 'object' ? item.name || '' : String(item);
                    skillEl.appendChild(nameSpan);

                    return skillEl;
                });

                skillsList.append(...skillItems);
                categoryEl.append(titleEl, skillsList);
                row.appendChild(categoryEl);
            });
        }

        skillsContainer.appendChild(row);
    } catch (error) {
        console.error('Error populating skills:', error);
        skillsContainer.innerHTML = `
            <div class="alert alert-warning">
                Unable to load skills. Please check the console for details.
            </div>
        `;
    }
};
