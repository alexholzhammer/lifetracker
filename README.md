# LifeTracker

A minimal personal life-tracking web app built with React + Vite.

## Features

- **Daily check-in** — 6 area cards (Health, Organisation, Brain, Creative, Rest, Finance) with a yes/no toggle and optional text note
- **Weekly heatmap** — 6×7 grid showing which areas you covered each day, with a score per area (e.g. 4/7)
- **Local-first** — all data stored in `localStorage`, no account needed
- **Dark mode** — respects your system preference

## Development

```bash
npm install
npm run dev
```

## Deploy

Pushes to `main` automatically build and deploy to GitHub Pages via GitHub Actions.
