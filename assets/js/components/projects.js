/**
 * Projects section component
 */

export const populateProjects = (projects) => {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;

    const projectsHTML = projects.map(project => `
        <div class="project-card card mb-4">
            <div class="card-body">
                <h3 class="card-title">${project.title}</h3>
                <p class="card-text">${project.description}</p>
                ${project.link ? `<a href="${project.link}" class="btn btn-primary" target="_blank">View Project</a>` : ''}
            </div>
        </div>
    `).join('');

    projectsContainer.innerHTML = projectsHTML;
};
