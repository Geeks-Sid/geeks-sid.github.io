# Siddhesh Thakur - Portfolio

A professional, minimal terminal-style portfolio.

## Tech Stack
- **React + Vite** (TypeScript)
- **Vanilla CSS** (Minimalist Terminal Aesthetic)
- **Fuse.js** (Client-side fuzzy search)
- **GitHub Actions** (Automated deployment)

## Content Management

### 1. Adding a Blog Post
Use the scaffold command:

```bash
npm run new:post -- "Your Post Title"
```

That creates a new Markdown file in `src/content/blog/` with the correct filename and frontmatter.

Then edit the generated file. The format is:
```yaml
---
title: "Your Post Title"
date: "YYYY-MM-DD"
summary: "A short description for the listing page."
tags: ["AI", "Research"]
---
# Your Title
Post content starts here...
```

Publishing flow:
- `npm run dev` to preview locally while writing.
- `npm run build` to verify the site still builds.
- Commit and push to `main`.
- GitHub Actions deploys the updated site to GitHub Pages automatically.

There is no Vercel dependency in the current setup.

### 2. Adding a Publication
Open `src/data/publications.json` and add a new entry to the array:
```json
{
  "id": "unique-id-2026",
  "type": "journal",
  "year": 2026,
  "title": "Title of your new paper",
  "authors": "S. Thakur, et al.",
  "venue": "Name of the Journal/Conference",
  "doi": "https://doi.org/...",
  "pdf": "https://link-to-pdf..."
}
```
Supported types: `journal`, `conference`, `preprint`, `abstract`.

### 3. Updating the CV
Replace the file `public/Data_Engineer_Siddhesh_Latest_CV_All_Ed.pdf` with your new PDF using the **exact same filename**.

## Development
```bash
npm install    # Install dependencies
npm run dev    # Start development server
npm run build  # Build for production
```

## Deployment
Deployment is automated via GitHub Actions. Every push to the `main` branch will trigger a build and publish to GitHub Pages.
