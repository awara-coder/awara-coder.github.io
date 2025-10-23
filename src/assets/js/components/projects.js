/**
 * Projects section with modern design
 */

export const populateProjects = (projects) => {
    const projectsContainer = document.getElementById('projects-container');
    if (!projectsContainer) return;

    // Add section header
    const sectionHeader = `
        <div class="section-header fade-in-up" style="animation-delay: 0.1s">
            <h2 class="section-title dark:text-white">Projects</h2>
            <p class="section-subtitle dark:text-gray-300">Here are some of my recent projects. Each one was built to solve a specific problem or explore new technologies.</p>
        </div>
    `;

    // Add projects grid with header
    projectsContainer.innerHTML = `
        ${sectionHeader}
        <div class="projects-grid flex overflow-x-auto gap-6 mt-0 pb-4 custom-scrollbar">
            ${projects
                .map((project, index) => {
                    // Add staggered animation delay
                    const delay = index * 0.1 + 0.2;
                    const cardWrapperClasses = [
                        'fade-in-up',
                        'flex-none',
                        'w-full',
                        'sm:w-1/2',
                        'lg:w-1/3',
                        'max-w-md',
                        'min-w-80',
                    ];
                    if (index === 0) {
                        cardWrapperClasses.push('ml-auto');
                    }
                    if (index === projects.length - 1) {
                        cardWrapperClasses.push('mr-auto');
                    }

                    return `
                    <div class="${cardWrapperClasses.join(' ')}" style="animation-delay: ${delay}s">
                        <div class="card h-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500">
                            ${
                                project.image
                                    ? `
                                <img 
                                    src="${project.image}" 
                                    alt="${project.title}" 
                                    class="card-img"
                                    loading="lazy"
                                >
                            `
                                    : ''
                            }
                            <div class="card-content">
                                <div class="flex-grow">
                                    <h3 class="card-title dark:text-white">${project.title}</h3>
                                    <p class="card-description dark:text-gray-300">${project.description}</p>
                                    ${
                                        project.technologies && project.technologies.length
                                            ? `
                                        <div class="flex flex-wrap mt-4">
                                            ${project.technologies
                                                .map(
                                                    (tech) => `
                                                <span class="tag bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">${tech}</span>
                                            `
                                                )
                                                .join('')}
                                        </div>
                                    `
                                            : ''
                                    }
                                </div>
                                ${
                                    project.link || project.github
                                        ? `
                                    <div class="card-footer">
                                        ${
                                            project.link
                                                ? `
                                        <a 
                                            href="${project.link}" 
                                            class="btn btn-primary" 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            aria-label="View ${project.title}"
                                        >
                                            View Project
                                            <i class="fa-solid fa-arrow-up-right-from-square ml-2"></i>
                                        </a>
                                        `
                                                : ''
                                        }
                                        ${
                                            project.github
                                                ? `
                                            <a 
                                                href="${project.github}" 
                                                class="btn btn-outline btn-sm border-gray-300 text-gray-700 bg-white hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="View source code for ${project.title}"
                                            >
                                                <i class="fab fa-github mr-2"></i>
                                                Code
                                            </a>
                                        `
                                                : ''
                                        }
                                    </div>
                                `
                                        : ''
                                }
                            </div>
                        </div>
                    </div>
                `;
                })
                .join('')}
        </div>
    `;

    // Add intersection observer for scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in-up');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            },
            { threshold: 0.1 }
        );

        elements.forEach((el) => {
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
