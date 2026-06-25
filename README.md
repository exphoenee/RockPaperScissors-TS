# Rock, Paper, Scissors, Lizard, Spock — TypeScript

> 🇭🇺 Magyar nyelvű leírás: [README-hu.md](README-hu.md)

**🌐 Live demo: [bozzayviktor.hu/rpsls](https://bozzayviktor.hu/rpsls/)**

A browser game of Rock, Paper, Scissors (and its expanded *Lizard–Spock* variant) written in **TypeScript** with a hand-rolled, declarative DOM layer. Play against the computer, track your wins with persistent local statistics, switch languages and themes — all client-side, no backend required.

## Features

- 🎮 **Two game modes**
  - **Classic** — Rock, Paper, Scissors
  - **Big Bang Theory** — Rock, Paper, Scissors, Lizard, Spock
- 🤖 **Single-player** against a computer opponent with a rolling choice animation
- 📊 **Local statistics** — per-player, per-throw win tracking with an aggregated table, persisted in `localStorage`
- 🌍 **Multi-language UI** — English, German, Hungarian
- 🎨 **Themes** — light, dark, and a "flashlight" mode
- 💾 **Obfuscated state persistence** — game state is stored in `localStorage` (obfuscated, *not* encrypted) and schema-validated on load
- ⚡ **Zero runtime dependencies** beyond [`domelemjs`](https://github.com/exphoenee/DOMelemJS) for declarative DOM creation

## Tech stack

| Area | Tool |
|------|------|
| Language | TypeScript |
| Build / dev server | [Vite](https://vitejs.dev/) |
| Tests | [Vitest](https://vitest.dev/) |
| DOM rendering | [domelemjs](https://github.com/exphoenee/DOMelemJS) |
| CI | GitHub Actions |

## Getting started

### Prerequisites

- Node.js 20+
- npm

### Install & run

```bash
npm install      # install dependencies
npm run dev      # start the Vite dev server
```

Then open the URL printed in the terminal (default: `http://localhost:5173`).

### Available scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the development server with HMR |
| `npm run build` | Type-check (`tsc`) and build the production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm test` | Run the unit tests with Vitest |

## Project structure

```
src/
├── main.ts                     # Entry point — boots the GameController
├── constants/                  # Enums & static data (games, languages, themes, dictionary…)
├── types/                      # Shared TypeScript types
├── utils/                      # Small helpers (enum checks, first-value, type guards)
└── modules/
    ├── GameController.ts        # Orchestrates UI, state and statistics; game logic
    ├── GameUI/                  # View layer — declarative DOM "map" components
    │   ├── GameUI.ts            # Singleton view controller
    │   └── components/          # appMap, modals, settings, gameArea, common widgets…
    ├── StateHandler/            # localStorage persistence + schema validation
    └── StatisticsHandler/       # Per-game / per-player win aggregation
```

### Architecture in a nutshell

- **`GameController`** holds the game logic (evaluating winners, computer play) and wires the other modules together.
- **`GameUI`** is a singleton view layer built from small, declarative *map* objects that mirror the DOM tree and are rendered via `domelemjs`. Controller callbacks are injected through `bindHandlers(...)`.
- **`StateHandler`** persists the app state to `localStorage` (obfuscated) and validates the shape on load, falling back to defaults if it is invalid.
- **`StatisticsHandler`** records each win and produces an aggregated statistics table.

## Testing

```bash
npm test
```

Unit tests live next to their module under `__tests__/` (e.g. `StatisticsHandler.spec.ts`) and cover the score aggregation logic.

## Continuous integration

Every push and pull request to `main` runs the [CI workflow](.github/workflows/ci.yml): install → type-check → test → build, with the production `dist/` uploaded as an artifact.

## License

Released under the [MIT License](LICENSE.md).

## Author

**Viktor Bozzay** — [webforsol.hu](https://www.webforsol.hu)
