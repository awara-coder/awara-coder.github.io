const mockData = {
    "name": "John Doe",
    "bio": "Full Stack Developer | JavaScript Enthusiast | Open Source Contributor",
    "about": "I am a passionate software developer with a knack for creating elegant and efficient solutions. I have experience in building web applications using modern technologies and I am always eager to learn new things.",
    "skills": [
        {
            "name": "JavaScript",
            "description": "Proficient in modern JavaScript (ES6+) and frameworks like React and Node.js."
        }
    ],
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
            "description": "Developed and maintained web applications using React and Node.js."
        }
    ],
    "accomplishments": [
        "Speaker at a local tech meetup."
    ],
    "contact": {
        "email": "john.doe@example.com",
        "github": "https://github.com/johndoe",
        "linkedin": "https://linkedin.com/in/johndoe"
    }
};

QUnit.module('Portfolio Population', {
    beforeEach: function() {
        // Reset the DOM before each test
        document.getElementById('qunit-fixture').innerHTML = `
            <h1 id="user-name"></h1>
            <p id="user-bio"></p>
            <p id="user-about"></p>
            <div id="skills-container"></div>
            <div id="projects-container"></div>
            <div id="experience-container"></div>
            <ul id="accomplishments-container"></ul>
            <a id="user-email"></a>
            <a id="user-github"></a>
            <a id="user-linkedin"></a>
        `;
    }
});

QUnit.test('populatePortfolio function tests', function(assert) {
    populatePortfolio(mockData);

    assert.equal(document.getElementById('user-name').textContent, 'John Doe', 'Name is populated correctly');
    assert.equal(document.getElementById('user-bio').textContent, 'Full Stack Developer | JavaScript Enthusiast | Open Source Contributor', 'Bio is populated correctly');
    assert.equal(document.getElementById('user-about').textContent, 'I am a passionate software developer with a knack for creating elegant and efficient solutions. I have experience in building web applications using modern technologies and I am always eager to learn new things.', 'About is populated correctly');
    assert.equal(document.getElementById('skills-container').children.length, 1, 'Skills are populated');
    assert.equal(document.getElementById('projects-container').children.length, 1, 'Projects are populated');
    assert.equal(document.getElementById('experience-container').children.length, 1, 'Experience is populated');
    assert.equal(document.getElementById('accomplishments-container').children.length, 1, 'Accomplishments are populated');
    assert.equal(document.getElementById('user-email').textContent, 'john.doe@example.com', 'Email is populated correctly');
    assert.equal(document.getElementById('user-github').textContent, 'https://github.com/johndoe', 'GitHub is populated correctly');
    assert.equal(document.getElementById('user-linkedin').textContent, 'https://linkedin.com/in/johndoe', 'LinkedIn is populated correctly');
});
