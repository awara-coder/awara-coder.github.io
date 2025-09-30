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
        row.className = 'skills-row';
        
        // Process each category
        if (Array.isArray(skills)) {
            // Handle array format (categories with descriptions)
            skills.forEach(category => {
                if (!category || !category.name) return;
                
                const categoryEl = document.createElement('div');
                categoryEl.className = 'skill-category';
                
                const titleEl = document.createElement('h4');
                titleEl.className = 'skill-category-title';
                titleEl.textContent = category.name;
                
                const skillsList = document.createElement('div');
                skillsList.className = 'skills-list';
                
                // Split the description by commas and create skill items
                if (category.description) {
                    const skillItems = category.description.split(',').map(skill => {
                        const skillEl = document.createElement('div');
                        skillEl.className = 'skill-item';
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
                categoryEl.className = 'skill-category';
                
                const titleEl = document.createElement('h4');
                titleEl.className = 'skill-category-title';
                titleEl.textContent = category.charAt(0).toUpperCase() + category.slice(1);
                
                const skillsList = document.createElement('div');
                skillsList.className = 'skills-list';
                
                // Create skill items from the items array
                const skillItems = items.map(item => {
                    const skillEl = document.createElement('div');
                    skillEl.className = 'skill-item';
                    
                    // Create icon element if available
                    if (item.icon) {
                        const iconEl = document.createElement('i');
                        iconEl.className = `skill-icon ${item.icon}`;
                        skillEl.appendChild(iconEl);
                    }
                    
                    // Add skill name
                    const nameSpan = document.createElement('span');
                    nameSpan.className = 'skill-name';
                    nameSpan.textContent = typeof item === 'object' ? (item.name || '') : String(item);
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
