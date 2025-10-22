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
- Node.js and npm (Node Package Manager)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/awara-coder/awara-coder.github.io.git
   cd awara-coder.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run start
   ```

4. **Open in your browser**
   ```
   http://localhost:8000
   ```

## Linting and Formatting

This project uses ESLint, Stylelint, and Prettier to maintain code quality and consistency.

- **Manual Formatting:** To format all JavaScript, CSS, and HTML files, run:
  ```bash
  npm run format
  ```
  *Note: This command performs a complete project cleanup, formatting all relevant files regardless of their staged status.*
- **Pre-commit Hooks:** Linting and formatting are automatically applied to staged files before each commit using Husky and lint-staged.

## Testing

This project uses Jest for unit testing. Test files are co-located with their corresponding source files (e.g., `assets/js/components/portfolio.js` has its tests in `assets/js/components/portfolio.test.js`).

- **Run all unit tests:**
  ```bash
  npm run test:unit
  ```
- **Run specific unit tests:**
  ```bash
  npm run test:unit -- <path/to/test/file.test.js>
  ```

## Project Structure

```
awara-coder.github.io/
├── assets/
│   ├── css/
│   │   └── style.css          # Main stylesheet
│   ├── images/                # Images, including logos
│   │   └── logos/
│   └── js/
│       ├── components/        # Reusable UI components (test files are co-located)
│       ├── utils/             # Utility functions (test files are co-located)
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
- Custom CSS variables for colors and spacing

## Dependencies

- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework (if used via CDN or compiled)
- [Font Awesome](https://fontawesome.com/) - Icons
- [Google Fonts](https://fonts.google.com/) - Typography

## TODO:
- Add slider wrapper for projects section.
- Switch to trunk based development.
- Write E2E tests for all cases.
- Integrate running tests before deployment in CI.
- Optimize images to webp/avif. Optimize Icons.
- Reduce bundle size (look into tree shaking).
- Need to go back to ES6 from commonjs
- Add the data.json more extensible.
- Add support to release from a new branch and faster loading via minimization and bundling.
- Add validation on top of data.json
-Add support for running unit tests as pre commit hook



## License

This project is open source and available under the [MIT License](LICENSE).

---

Made with ❤️ by Sagar Gupta.
