/**
 * Projects section component
 */

export const populateProjects = (projects) => {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;

    const projectsHTML = projects.map(project => `
        <div class="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
            <div class="bg-white rounded-lg shadow-md p-6 h-full flex flex-col">
                <h3 class="text-xl font-semibold mb-2">${project.title}</h3>
                <p class="text-gray-700 mb-4 flex-grow">${project.description}</p>
                ${project.link ? `<a href="${project.link}" class="inline-block bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition duration-300" target="_blank">View Project</a>` : ''}
            </div>
        </div>
    `).join('');

    projectsContainer.innerHTML = projectsHTML;
};
