# Personal Portfolio (React + Vite + TS)

A clean, single-page developer portfolio built with React, TypeScript, and Vite. It features a hero intro, projects grid, about section, skills, and a contact form with accessible navigation and smooth scrolling.

## Features
- Section-based layout with anchor navigation (sticky header)
- Responsive grid for projects and skills
- Accessible focus styles, skip-to-content link, and ARIA landmarks
- Theming via CSS variables in one `global.css`
- Simple project data in `src/data/projects.ts`

## Tech Stack
- React 18 + TypeScript
- Vite (dev server and build)
- CSS (no framework) with custom properties

## Getting Started

### Install dependencies
```cmd
npm install
```

### Run the dev server
```cmd
npm run dev
```
Open the local URL printed by Vite.

### Build for production
```cmd
npm run build
```
Preview the production build:
```cmd
npm run preview
```

## Customize

- Name & brand: Update the brand text in `src/components/Header.tsx` and the title in `index.html`.
- Projects: Edit the array in `src/data/projects.ts` (name, description, tech, repo/demo links).
- Colors & spacing: Tweak CSS variables at the top of `src/styles/global.css`.
- Contact links: Update email, GitHub, and LinkedIn in `src/components/ContactSection.tsx`.
- Sections: Adjust copy in `AboutSection.tsx`, `SkillsSection.tsx`, and `Hero.tsx`.

## Structure
- `src/App.tsx` — assembles sections and main layout
- `src/components/*` — header, hero, projects, about, skills, contact, footer
- `src/data/projects.ts` — project list
- `src/styles/global.css` — global styles, variables, layout

## Accessibility
- Skip link jumps to `#main`
- Landmarks: `header[role=banner]`, `main`, `footer[role=contentinfo]`
- Focus-visible outlines and semantic headings

## Deployment
Any static hosting will work with the built `dist/` output (Vercel, Netlify, GitHub Pages, etc.).
