# Portfolio Website

A modern, responsive portfolio website built with vanilla JavaScript, HTML5, and CSS3. The website features a clean design and is fully customizable through a single JSON configuration file.

## Features

- **Fully Responsive** - Works on all devices
- **Modular Architecture** - Easy to maintain and extend
- **Single Data Source** - All content managed through `data.json`
- **Smooth Scrolling** - Enhanced user experience with smooth navigation
- **Fixed Navigation** - Always accessible menu
- **Modern UI** - Clean and professional design

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
│           ├── dataLoader.js  # Data loading and initialization
│           ├── dom.js         # DOM manipulation helpers
│           └── smoothScroll.js# Smooth scrolling logic
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
- **Experience**: Update your work history
- **Accomplishments**: List your achievements
- **Contact**: Update your contact information

### Styling
- Main styles are in `assets/css/style.css`
- Uses Bootstrap 4.5 for responsive layout
- Custom CSS variables for colors and spacing

## Dependencies

- [Bootstrap 4.5](https://getbootstrap.com/) - CSS Framework
- [Font Awesome](https://fontawesome.com/) - Icons
- [Google Fonts](https://fonts.google.com/) - Typography

## TODO:
- Add the data.json more extensible.
- Add support to release from a new branch and faster loading via minimization and bundling.
- Add loading section before content is loaded by javascript.
- Add support for dark mode.
- Add tests to ensure nothing breaks when introducing new content, styling changes.


## License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ by Sagar Gupta.
