import { initializePortfolio } from '../assets/js/components/portfolio.js';
import { initThemeToggle, LOCAL_STORAGE_THEME_KEY, THEME_DARK, THEME_LIGHT } from '../assets/js/utils/themeToggle.js';

const mockData = {
    "name": "John Doe",
    "bio": "Full Stack Developer | JavaScript Enthusiast | Open Source Contributor",
    "about": "I am a passionate software developer with a knack for creating elegant and efficient solutions. I have experience in building web applications using modern technologies and I am always eager to learn new things.",
    "skills": {
        "languages": [
            { "name": "JavaScript", "icon": "devicon-javascript-plain colored" },
            { "name": "Python", "icon": "devicon-python-plain colored" }
        ],
        "frameworks": [
            { "name": "React", "icon": "devicon-react-original colored" }
        ]
    },
    "projects": [
        {
            "title": "Project One",
            "description": "A web application that helps users manage their tasks and projects.",
            "link": "#"
        }
    ],
    "experience": [
        {
            "title": "Software Engineer",
            "company": "Tech Company",
            "period": "2020 - Present",
            "description": [
                "Developed and maintained web applications using React and Node.js.",
                "Collaborated with cross-functional teams to deliver high-quality software."
            ]
        }
    ],
    "accomplishments": [
        "Speaker at a local tech meetup.",
        "Published an article in a renowned tech magazine."
    ],
    "contact": {
        "email": "john.doe@example.com",
        "github": "https://github.com/johndoe",
        "linkedin": "https://linkedin.com/in/johndoe"
    }
};

QUnit.module('Portfolio Initialization and Styling', {
    beforeEach: function() {
        // Reset the DOM before each test
        document.getElementById('qunit-fixture').innerHTML = `
            <h1 id="user-name"></h1>
            <p id="user-bio"></p>
            <div id="user-about" class="text-gray-600 max-w-none"></div>
            <div id="skills-container"></div>
            <div id="projects-container"></div>
            <div id="experience-container"></div>
            <div id="accomplishments-container"></div>
            <div id="contact-container"></div>
            <a id="user-email"></a>
            <a id="user-github"></a>
            <a id="user-linkedin"></a>
            <button id="back-to-top" class="opacity-0 invisible"></button>
            <button id="theme-toggle" type="button" class="p-2 rounded-md text-gray-700 hover:text-primary-600 focus:outline-none">
                <i id="theme-toggle-icon" class="fas fa-sun text-xl"></i>
            </button>
            <h2 id="about-title" class="border-b border-primary-600">About Me</h2>
            <h2 id="skills-title" class="border-b border-primary-600">My Skills</h2>
            <h2 id="experience-title" class="border-b border-primary-600">Work Experience</h2>
            <h2 id="projects-title" class="border-b border-primary-600">My Projects</h2>
            <h2 id="accomplishments-title" class="border-b border-primary-600">My Accomplishments</h2>
            <h2 id="contact-title" class="border-b border-primary-600">Get In Touch</h2>
        `;
        // Manually add a skill category for testing its width class
        const skillsContainer = document.getElementById('skills-container');
        if (skillsContainer) {
            skillsContainer.innerHTML = `
                <div class="skill-category flex-none w-full sm:w-1/2 lg:w-1/4 max-w-xs min-w-64 bg-white rounded-lg p-6 shadow-md transition-all duration-300 ease-in-out border border-gray-200 flex flex-col hover:translate-y-[-5px] hover:shadow-lg hover:border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500">
                    <h3>Languages</h3>
                    <ul>
                        <li class="flex items-center p-2 text-gray-700 text-base rounded-md transition-all duration-200 ease-in-out bg-gray-50 my-0.5 hover:bg-gray-100 hover:text-gray-900 hover:translate-x-1 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 dark:hover:text-white"><i class="devicon-javascript-plain colored"></i> JavaScript</li>
                    </ul>
                </div>
            `;
        }
        // Reset html class and local storage for theme toggle tests
        document.documentElement.classList.remove(THEME_DARK);
        localStorage.removeItem(LOCAL_STORAGE_THEME_KEY);
    },
    afterEach: function() {
        // Clean up after each test
        document.documentElement.classList.remove(THEME_DARK);
        localStorage.removeItem(LOCAL_STORAGE_THEME_KEY);
    }
});

QUnit.test('initializePortfolio function populates content correctly', function(assert) {
    initializePortfolio(mockData);

    assert.equal(document.getElementById('user-name').textContent, 'John Doe', 'Name is populated correctly');
    assert.equal(document.getElementById('user-bio').textContent, 'Full Stack Developer | JavaScript Enthusiast | Open Source Contributor', 'Bio is populated correctly');
    assert.equal(document.getElementById('user-about').textContent, mockData.about, 'About is populated correctly');
    assert.ok(document.getElementById('skills-container').children.length > 0, 'Skills are populated');
    assert.ok(document.getElementById('projects-container').children.length > 0, 'Projects are populated');
    assert.ok(document.getElementById('experience-container').children.length > 0, 'Experience is populated');
    assert.ok(document.getElementById('accomplishments-container').children.length > 0, 'Accomplishments are populated');
    assert.ok(document.getElementById('contact-container').children.length > 0, 'Contact is populated');
});

QUnit.test('Styling assertions', function(assert) {
    initializePortfolio(mockData);

    // About Me text alignment
    const aboutContent = document.getElementById('user-about');
    assert.ok(aboutContent.classList.contains('text-left'), 'About Me content has text-left class');
    assert.notOk(aboutContent.classList.contains('prose'), 'About Me content does not have prose class');

    // Skill section layout (lg:w-1/4)
    const skillCategory = document.querySelector('#skills-container .skill-category');
    assert.ok(skillCategory, 'Skill category element exists');
    assert.ok(skillCategory.classList.contains('lg:w-1/4'), 'Skill category has lg:w-1/4 class for 4 boxes per row');

    // Experience list item alignment and icon
    const experienceItem = document.querySelector('#experience-container ul li');
    assert.ok(experienceItem, 'Experience list item exists');
    assert.ok(experienceItem.classList.contains('flex'), 'Experience list item has flex class');
    assert.ok(experienceItem.classList.contains('items-baseline'), 'Experience list item has items-baseline class');
    assert.ok(experienceItem.querySelector('.fa-solid.fa-angle-right'), 'Experience list item has angle-right icon');

    // Section title underlines
    const sectionTitles = ['about-title', 'skills-title', 'experience-title', 'projects-title', 'accomplishments-title', 'contact-title'];
    sectionTitles.forEach(id => {
        const title = document.getElementById(id);
        assert.ok(title, `Title element ${id} exists`);
        assert.ok(title.classList.contains('border-b'), `Title ${id} has border-b class`);
        assert.ok(title.classList.contains('border-primary-600'), `Title ${id} has border-primary-600 class`);
    });

    // Back to top button initial state
    const backToTopButton = document.getElementById('back-to-top');
    assert.ok(backToTopButton, 'Back to top button exists');
    assert.ok(backToTopButton.classList.contains('opacity-0'), 'Back to top button is initially invisible (opacity-0)');
    assert.ok(backToTopButton.classList.contains('invisible'), 'Back to top button is initially invisible (invisible class)');
});

QUnit.test('Dark mode toggle functionality', function(assert) {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleIcon = document.getElementById('theme-toggle-icon');
    const htmlElement = document.documentElement;

    // Initial state (light mode)
    initThemeToggle();
    assert.notOk(htmlElement.classList.contains(THEME_DARK), 'HTML element does not have dark class initially');
    assert.ok(themeToggleIcon.classList.contains('fa-sun'), 'Theme toggle icon is sun initially');

    // Toggle to dark mode
    themeToggleBtn.click();
    assert.ok(htmlElement.classList.contains(THEME_DARK), 'HTML element has dark class after toggle');
    assert.ok(themeToggleIcon.classList.contains('fa-moon'), 'Theme toggle icon is moon after toggle');
    assert.equal(localStorage.getItem(LOCAL_STORAGE_THEME_KEY), THEME_DARK, 'Theme is stored as dark in localStorage');

    // Toggle back to light mode
    themeToggleBtn.click();
    assert.notOk(htmlElement.classList.contains(THEME_DARK), 'HTML element does not have dark class after second toggle');
    assert.ok(themeToggleIcon.classList.contains('fa-sun'), 'Theme toggle icon is sun after second toggle');
    assert.equal(localStorage.getItem(LOCAL_STORAGE_THEME_KEY), THEME_LIGHT, 'Theme is stored as light in localStorage');

    // Test system preference (simulated)
    localStorage.removeItem(LOCAL_STORAGE_THEME_KEY); // Clear user preference
    htmlElement.classList.remove(THEME_DARK); // Ensure light mode
    // Simulate system preference for dark mode
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query) => ({
            matches: query === '(prefers-color-scheme: dark)',
            addEventListener: () => {},
            removeEventListener: () => {},
        }),
    });
    initThemeToggle(); // Re-initialize to pick up system preference
    assert.ok(htmlElement.classList.contains(THEME_DARK), 'HTML element has dark class when system prefers dark');
});
