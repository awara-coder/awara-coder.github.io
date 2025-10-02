# Portfolio Website

A modern, responsive portfolio website built with vanilla JavaScript, HTML5, and CSS3. The website features a clean design and is fully customizable through a single JSON configuration file.

## Live Demo

🚀 [Visit the website](https://awara-coder.github.io)

## Features

- **Fully Responsive** - Works on all devices
- **Modular Architecture** - Easy to maintain and extend
- **Single Data Source** - All content managed through `data.json`
- **Smooth Scrolling** - Enhanced user experience with smooth navigation
- **Fixed Navigation** - Always accessible menu
- **Modern UI** - Clean and professional design
- **Loading Screen** - Enhances user experience during data fetching

## Quick Start

### Prerequisites
- A modern web browser
- Node.js (optional, for development)
- Python 3 (for local development server)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/awara-coder/awara-coder.github.io.git
   cd awara-coder.github.io
   ```

2. **Start the development server**
   ```bash
   # Using Python 3
   python3 -m http.server
   
   # Or using Python 2
   # python -m SimpleHTTPServer
   ```

3. **Open in your browser**
   ```
   http://localhost:8000
   ```

## Project Structure

```
awara-coder.github.io/
├── assets/
│   ├── css/
│   │   └── style.css          # Main stylesheet
│   ├── images/
│   │   └── logos/             # Company logos for experience section
│   └── js/
│       ├── components/        # UI components
│       │   ├── about.js
│       │   ├── accomplishments.js
│       │   ├── contact.js
│       │   ├── experience.js
│       │   ├── hero.js
│       │   ├── portfolio.js   # Main component orchestrator
│       │   ├── projects.js
│       │   └── skills.js
│       └── utils/             # Utility functions
│           ├── backToTop.js   # Smooth scroll to top logic
│           ├── dataLoader.js  # Data loading and initialization
│           ├── dom.js         # DOM manipulation helpers
│           ├── mobileMenu.js  # Mobile menu toggle and close logic
│           ├── smoothScroll.js# Smooth scrolling logic
│           └── themeToggle.js # Dark/Light theme toggle logic
├── data/
│   └── data.json             # All website content
├── index.html                # Main HTML file
└── README.md                 # This file
```

## Customization

### Updating Content
All content is managed through the `data/data.json` file. Update the following sections as needed:

- **Personal Information**: Name, bio, about text
- **Skills**: Add or modify skill categories
- **Projects**: Add your projects with titles, descriptions, and links
- **Experience**: Update your work history, including an optional `logoUrl` for company logos
- **Accomplishments**: List your achievements
- **Contact**: Update your contact information

### Styling
- Main styles are in `assets/css/style.css`
- Uses Bootstrap 4.5 for responsive layout
- Custom CSS variables for colors and spacing

## Dependencies

- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Font Awesome](https://fontawesome.com/) - Icons
- [Google Fonts](https://fonts.google.com/) - Typography

## TODO:
- Add slider wrapper for projects section.
- Optimize images.
- Add the data.json more extensible.
- Add support to release from a new branch and faster loading via minimization and bundling.
- Add support for running tests before deployment in CI.
- Fix the blue line thickness issue.


## License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ by Sagar Gupta.
