# Airbnb Listing Page Clone

A pixel-perfect, behavior-matched clone of the Airbnb listing page at
https://airbnb-clone-umber-two.vercel.app, built with Next.js and React.

## Run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Commands

- `npm run dev` – start the development server
- `npm run build` – create a production build
- `npm run start` – serve the production build
- `npm run typecheck` – run TypeScript checks

## Features

- Listing page with hero gallery, booking card, amenities, calendar, reviews,
  location, host details, and similar stays
- Photo Tour overlay with categories and room sections
- Lightbox with keyboard navigation and photo counter
- Amenities modal
- Sticky section navigation, save/share actions, review and description expansion,
  and similar-stays carousel
- Reserve / Claim toast confirmations

## Architecture

See [`docs/architecture-diagram.pdf`](docs/architecture-diagram.pdf) for the
component architecture, the Excalidraw version at
[`docs/architecture-diagram-excalidraw.png`](docs/architecture-diagram-excalidraw.png),
or
[`docs/excalidraw-architecture-prompt.md`](docs/excalidraw-architecture-prompt.md)
to regenerate the diagram in Excalidraw AI. Editable source:
`docs/architecture-diagram.svg` (SVG), `docs/architecture-diagram.dot` (Graphviz).

## Prompt log

`prompts.txt` contains the full prompt history used to build this project.
