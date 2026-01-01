# Release Tracker

A simple, clean dashboard to track deployment releases vs rollbacks and monitor your success rate.

## Features

- Display total releases and rollbacks
- Calculate success rate and rollback percentage
- Dark mode support
- Config-driven counters
- Automatic deployment to GitHub Pages

## Getting Started

### Development

Run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Updating Counters

Counter values are stored in `public/config.json`. To update the counts:

1. Edit `public/config.json`:
```json
{
  "releases": 42,
  "rollbacks": 3
}
```

2. Commit and push to GitHub:
```bash
git add public/config.json
git commit -m "Update release counters"
git push
```

3. GitHub Actions will automatically rebuild and deploy the site with the new values.

## Deploy to GitHub Pages

This project is configured for automatic deployment to GitHub Pages.

### Initial Setup

1. Create a GitHub repository and push your code:
```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/days-since-last-rollback.git
git push -u origin main
```

2. Enable GitHub Pages:
   - Go to repository Settings → Pages
   - Source: Select "GitHub Actions"

3. The site will be available at: `https://YOUR_USERNAME.github.io/days-since-last-rollback/`

### Automatic Deployments

Every push to the `main` branch triggers an automatic rebuild and deployment via GitHub Actions.

## Tech Stack

- [Next.js 16](https://nextjs.org) - React framework with static export
- [React 19](https://react.dev) - UI library
- [TypeScript](https://www.typescriptlang.org) - Type safety
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [GitHub Actions](https://github.com/features/actions) - CI/CD
