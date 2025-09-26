document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            populatePortfolio(data);
        });
});

function populatePortfolio(data) {
    // Hero Section
    document.getElementById('user-name').textContent = data.name;
    document.getElementById('user-bio').textContent = data.bio;

    // About Me
    document.getElementById('user-about').textContent = data.about;

    // Skills
    const skillsContainer = document.getElementById('skills-container');
    data.skills.forEach(skill => {
        const skillElement = document.createElement('div');
        skillElement.className = 'col-md-4';
        skillElement.innerHTML = `<div class="card mb-4"><div class="card-body"><h5 class="card-title">${skill.name}</h5><p class="card-text">${skill.description}</p></div></div>`;
        skillsContainer.appendChild(skillElement);
    });

    // Projects
    const projectsContainer = document.getElementById('projects-container');
    data.projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'col-md-6 project-card';
        projectElement.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${project.title}</h5>
                    <p class="card-text">${project.description}</p>
                    <a href="${project.link}" class="btn btn-primary" target="_blank">View Project</a>
                </div>
            </div>
        `;
        projectsContainer.appendChild(projectElement);
    });

    // Experience
    const experienceContainer = document.getElementById('experience-container');
    data.experience.forEach(job => {
        const jobElement = document.createElement('div');
        jobElement.className = 'card mb-3';
        jobElement.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${job.title} at ${job.company}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${job.period}</h6>
                <p class="card-text">${job.description}</p>
            </div>
        `;
        experienceContainer.appendChild(jobElement);
    });

    // Accomplishments
    const accomplishmentsContainer = document.getElementById('accomplishments-container');
    data.accomplishments.forEach(accomplishment => {
        const accomplishmentElement = document.createElement('li');
        accomplishmentElement.textContent = accomplishment;
        accomplishmentsContainer.appendChild(accomplishmentElement);
    });

    // Contact
    document.getElementById('user-email').textContent = data.contact.email;
    document.getElementById('user-email').href = 'mailto:' + data.contact.email;
    document.getElementById('user-github').textContent = data.contact.github;
    document.getElementById('user-github').href = data.contact.github;
    document.getElementById('user-linkedin').textContent = data.contact.linkedin;
    document.getElementById('user-linkedin').href = data.contact.linkedin;
}
