# Release Process

This project uses **Git Tags** for version control and automated deployment to GitHub Pages.

## How to Create a Release

### 1. Prepare your changes
Make sure all your changes are committed to the `main` branch:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

### 2. Create a version tag
Use semantic versioning (MAJOR.MINOR.PATCH):
```bash
git tag v1.0.0
```

### 3. Push the tag
```bash
git push origin v1.0.0
```

### 4. Automatic deployment
GitHub Actions will automatically:
- Build your project
- Deploy to GitHub Pages
- Create a GitHub Release

## Semantic Versioning Guide

- **MAJOR** (v2.0.0): Breaking changes
- **MINOR** (v1.1.0): New features, backwards compatible
- **PATCH** (v1.0.1): Bug fixes, backwards compatible

## Example Workflow

```bash
# After completing new feature
git add .
git commit -m "feat: Add contact form validation"
git push origin main

# Ready to release
git tag v1.1.0
git push origin v1.1.0
```

## View Releases

Visit: https://github.com/awara-coder/awara-coder.github.io/releases

## Rollback

To rollback to a previous version:
```bash
git tag v1.0.1  # Create new patch version
git push origin v1.0.1
```

## Notes

- Only tagged commits trigger deployment
- Regular pushes to `main` do NOT deploy automatically
- The `/dist` folder is NOT committed to the repository
- Builds are created fresh for each release
