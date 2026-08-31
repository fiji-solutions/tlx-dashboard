# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # CRA dev server on :3000
npm run build      # production bundle -> build/ (verified working)
npm test           # BROKEN — see below
```

There is no lint script; ESLint runs inside `react-scripts` with the `react-app` config. GitHub Actions sets `CI=true`, which turns CRA warnings into build errors, so keep `npm run build` warning-free.

`npm test` currently cannot run at all: Jest fails to parse the ESM-only `chartjs-adapter-date-fns`, and the sole test (`src/App.test.js`) is still the untouched CRA template asserting a "learn react" link that does not exist. Treat the test suite as absent — verify changes with `npm run build` and the dev server.

## Branch topology (read this before editing)

The two long-lived branches are *different applications built from the same page components*:

| | `old` (this checkout) | `main` (default branch) |
|---|---|---|
| Build | CRA / `react-scripts` | Vite (`vite.config.js`) |
| Entry | `src/index.js` | `src/main.jsx` (MUI `ThemeProvider`, Vercel Analytics) |
| Static assets | `public/` | repo root + `public/` |
| Deploy | `.github/workflows/deploy.yml` — push to `old` → S3 sync + CloudFront invalidation | Vercel (`vercel.json`), no workflow |
| Config | hardcoded URLs | `.env.example` with `VITE_API_BASE_URL` |

The deploy workflow fires **only on pushes to `old`**. A change to a page component that should reach both deployments has to be applied on both branches. The `dist/` directory in this working tree is a leftover Vite build from `main`; `build/` and `dist/` are both gitignored.

## Architecture

`src/index.js` is the whole app shell: a `BrowserRouter` with a flat route table, `NavTabs` on top, and a hardcoded credits footer. Both `NavTabs` and the footer are suppressed on `/solana-lst`, which makes that route a standalone embeddable page (it is the only page using `react-helmet` to set its own title, "Catalytics platform").

Routes → modules: `/` and `/liquidity` → `TGA1`, `/toros` → `App`, `/solana-lst` and `/lst` → `Jupiter`, `/liquidity-valuation-indicators` → `LVI`, `/liquidity-valuation-indicators-form` → `LVIForm`, `/trading-view-experiments` → `TradingViewExperiments`, `/coingecko-sol-memes` → `CoingeckoSolMemes`.

Each page module is a single self-contained component (700–3800 lines) that owns its own fetch calls, state, and Chart.js configuration. There is no shared API client, no state management, no route-level code splitting, and no MUI theme on this branch.

### Backends

Two unrelated backends, both referenced by literal URL:

- `https://api.finance.fijisolutions.net` — everything except Toros. Each page defines a `const domain` (or inlines the URL) with the local equivalent (`http://127.0.0.1:8000` / `localhost:8000`) commented out directly above it; that commented line is the local-backend workflow.
- `https://np40nkw6be.execute-api.us-east-1.amazonaws.com/Prod/` — API Gateway used by `App.js` (`hello/`, `toros/`, `spot`, `tlx-export/`, `toros-export/`) and `Solana.js`.

FRED series are fetched through a self-hosted CORS proxy: `https://cors.fijisolutions.net/<upstream-url>`, POSTing a ~250-line FRED graph-API payload as the request body. Those giant JSON literals in the TGA files are that payload, repeated once per series (`RRPONTSYD`, `WLCFLPCL`, `H41RESPPALDKNWW`, `WALCL`) — they are data, not code to refactor. The four fetches are sequential `await`s with a `count` variable used solely to attribute which series failed.

The core metric is `WALCL - TGA - RRP + H4 + WLC` in `processCombinedChartData`, computed over the union of all series' dates with forward-fill of the last known value per series (`TGA1.js:1752`).

### TGA1–TGA4 are copy-paste forks

`TGA1.js`, `TGA2.js`, `TGA3.js`, and `TGA4.js` are near-duplicate versions of the same component with the same function names at roughly the same line numbers (`TGA2`, `TGA4`, and `TGA1` all even declare `const TGA1`). Only `TGA1` is routed. `TGA4` is imported-but-commented for `/liquidity-csv`; `TGA2` and `TGA3` are not imported anywhere and would not build as-is because they `import {UserPool} from "./UserPool"` while `UserPool.js` is fully commented out.

Differences: `TGA2` keeps the Cognito auth path live, `TGA3` adds a correlation endpoint plus a second TGA series and CSV export, `TGA4` adds CSV export. Any change to shared TGA behaviour must be repeated in each copy that matters.

### Disabled-not-deleted code

Large regions are commented out rather than removed, and this is load-bearing context:

- **Cognito auth is vestigial.** `UserPool.js` and `components/Login.js` are 100% commented out. Live code still does `localStorage.getItem("cognito-token")` and sends `Authorization: Bearer ${token}` — the token is `null` and the API serves public data. Restoring auth means uncommenting `UserPool.js` first.
- Unrouted legacy pages still in `src/`: `RSPS.js`, `Solana.js`, `CoingeckoSol.js`.
- `App.js` contains a fully commented-out TLX-token section (assets, checkboxes, `checkboxClick`); `const array = []` at `App.js:130` is its leftover — it is never populated, so the `hello/` and `tlx-export/` branches of `fetchData`/`downloadData` are dead. Only `torosArray` and `spotArray` carry data.

### Chart rendering — two patterns

`App.js` and `Jupiter.js` use the shared wrappers in `src/components/` (`CryptoChart`, `DoubleYAxisCryptoChart`, `BarChart`), which align datasets on a unified sorted timestamp axis and auto-pick the time unit from the range. The TGA pages bypass them and render `<Line>` directly with inline options plus two custom Chart.js plugins defined per file: `watermarkPlugin` (diagonal "WWW.JOINTHEREALWORLD.COM" watermark) and `verticalLinePlugin` (marks the latest TGA data point).

### Recurring idioms

- **Chart size selector**: `tabValue` is a *string number* (`'1'`, `'1.3'`, `'2'`) fed straight into grid sizing as `xs={11 / parseFloat(tabValue)}` — 1 / 1.5 / 2 charts per row.
- **Asset selection in `App.js`**: one `useState` boolean per asset (~70 of them) plus a giant `switch` in `torosCheckboxClick`/`spotCheckboxClick` that toggles the boolean and pushes/filters the asset in `torosArray`/`spotArray`. Adding an asset means touching four places: the `useState`, the `switch` case, the checkbox JSX, and the `maxDates` map. `getToDateString` sends the *later* of the user's end date and the asset's `maxDates` entry, so a missing entry yields `undefined`.
- **Pine Script export**: `generatePineScript` forward-fills to daily resolution, multiplies every value by 1e6, embeds the whole series as literals in a Pine v5 `array.from(...)`, and copies it to the clipboard.
- **Admin-ish pages**: `LVIForm` and `TradingViewExperiments` are unlinked from `NavTabs` and gate writes with a plaintext `password` field sent as a query param or JSON body field.
- `LVI.js` renders pre-generated PNGs from `api.finance.fijisolutions.net/static/plots/` and derives "last updated" from a `HEAD` request's `Last-Modified` header.

### Conventions

4-space indentation, no TypeScript, no PropTypes, MUI `Grid`/`Tabs`/`DatePicker` (dayjs adapter) for all layout, `dayjs` with the UTC plugin for every date, and inline style objects that sometimes use CSS-cased string keys (`style={{"min-height": "2000px"}}`, which React warns about). SEO/OG metadata is hardcoded in `public/index.html`.
