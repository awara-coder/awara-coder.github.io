/**
 * Fetches portfolio data and initializes the page.
 */
document.addEventListener('DOMContentLoaded', () => {
    fetch('data/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            initializePortfolio(data);
        })
        .catch(error => {
            console.error('Error fetching portfolio data:', error);
        });
});

/**
 * Populates all sections of the portfolio.
 * @param {object} data - The portfolio data.
 */
function initializePortfolio(data) {
    populateHero(data.name, data.bio);
    populateAbout(data.about);
    populateSkills(data.skills);
    populateProjects(data.projects);
    populateExperience(data.experience);
    populateAccomplishments(data.accomplishments);
    populateContact(data.contact);
}

/**
 * Populates the hero section.
 * @param {string} name - The user's name.
 * @param {string} bio - The user's bio.
 */
function populateHero(name, bio) {
    document.getElementById('user-name').textContent = name;
    document.getElementById('user-bio').textContent = bio;
}

/**
 * Populates the about section.
 * @param {string} about - The user's about text.
 */
function populateAbout(about) {
    document.getElementById('user-about').textContent = about;
}

/**
 * Populates the skills section.
 * @param {Array<object>} skills - An array of skill objects.
 */
function populateSkills(skills) {
    const skillsContainer = document.getElementById('skills-container');
    skills.forEach(skill => {
        const skillElement = document.createElement('div');
        skillElement.className = 'col-md-4';
        skillElement.innerHTML = `
            <div class="card mb-4">
                <div class="card-body">
                    <h5 class="card-title">${skill.name}</h5>
                    <p class="card-text">${skill.description}</p>
                </div>
            </div>`;
        skillsContainer.appendChild(skillElement);
    });
}

/**
 * Populates the projects section.
 * @param {Array<object>} projects - An array of project objects.
 */
function populateProjects(projects) {
    const projectsContainer = document.getElementById('projects-container');
    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'col-md-6 project-card';
        projectElement.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${project.title}</h5>
                    <p class="card-text">${project.description}</p>
                    <a href="${project.link}" class="btn btn-primary" target="_blank">View Project</a>
                </div>
            </div>`;
        projectsContainer.appendChild(projectElement);
    });
}

/**
 * Populates the experience section.
 * @param {Array<object>} experience - An array of experience objects.
 */
function populateExperience(experience) {
    const experienceContainer = document.getElementById('experience-container');
    experience.forEach(job => {
        const jobElement = document.createElement('div');
        jobElement.className = 'card mb-3';
        jobElement.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${job.title} at ${job.company}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${job.period}</h6>
                <p class="card-text">${job.description}</p>
            </div>`;
        experienceContainer.appendChild(jobElement);
    });
}

/**
 * Populates the accomplishments section.
 * @param {Array<string>} accomplishments - An array of accomplishments.
 */
function populateAccomplishments(accomplishments) {
    const accomplishmentsContainer = document.getElementById('accomplishments-container');
    accomplishments.forEach(accomplishment => {
        const accomplishmentElement = document.createElement('li');
        accomplishmentElement.textContent = accomplishment;
        accomplishmentsContainer.appendChild(accomplishmentElement);
    });
}

/**
 * Populates the contact section.
 * @param {object} contact - The contact information object.
 */
function populateContact(contact) {
    const emailLink = document.getElementById('user-email');
    emailLink.textContent = contact.email;
    emailLink.href = 'mailto:' + contact.email;

    const githubLink = document.getElementById('user-github');
    githubLink.textContent = contact.github;
    githubLink.href = contact.github;

    const linkedinLink = document.getElementById('user-linkedin');
    linkedinLink.textContent = contact.linkedin;
    linkedinLink.href = contact.linkedin;
}