/**
 * Projects section with modern design
 */

export const populateProjects = (projects) => {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;

    // Add section header
    const sectionHeader = `
        <div class="section-header fade-in-up" style="animation-delay: 0.1s">
            <h2 class="section-title">Projects</h2>
            <p class="section-subtitle">Here are some of my recent projects. Each one was built to solve a specific problem or explore new technologies.</p>
        </div>
    `;

    // Generate project cards
    const projectsHTML = projects.map((project, index) => {
        // Add staggered animation delay
        const delay = (index * 0.1) + 0.2;
        
        return `
            <div class="fade-in-up" style="animation-delay: ${delay}s">
                <div class="card h-full">
                    ${project.image ? `
                        <img 
                            src="${project.image}" 
                            alt="${project.title}" 
                            class="card-img"
                            loading="lazy"
                        >
                    ` : ''}
                    <div class="card-content">
                        <div class="flex-grow">
                            <h3 class="card-title">${project.title}</h3>
                            <p class="card-description">${project.description}</p>
                            ${project.technologies && project.technologies.length ? `
                                <div class="flex flex-wrap mt-4">
                                    ${project.technologies.map(tech => `
                                        <span class="tag">${tech}</span>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                        ${project.link ? `
                            <div class="card-footer">
                                <a 
                                    href="${project.link}" 
                                    class="btn btn-primary" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    aria-label="View ${project.title}"
                                >
                                    View Project
                                    <i class="material-icons ml-1" style="font-size: 1.1rem;">arrow_outward</i>
                                </a>
                                ${project.github ? `
                                    <a 
                                        href="${project.github}" 
                                        class="btn btn-outline btn-sm"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label="View source code for ${project.title}"
                                    >
                                        <i class="fab fa-github mr-1"></i>
                                        Code
                                    </a>
                                ` : ''}
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Add projects grid with header
    projectsContainer.innerHTML = `
        ${sectionHeader}
        <div class="projects-grid">
            ${projectsHTML}
        </div>
    `;

    // Add intersection observer for scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in-up');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(el);
        });
    };

    // Run after the DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', animateOnScroll);
    } else {
        animateOnScroll();
    }
};
