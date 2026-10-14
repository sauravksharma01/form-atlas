# FORM / Atlas

A React gallery of fourteen original B2B and brand UI reference designs. Every gallery preview opens its interactive sample in a new tab.

**Live:** https://sauravksharma01.github.io/form-atlas/

## Deployment

`.github/workflows/deploy.yml` runs on every push to `main`: `npm ci` → `npm test` → package the source zip → `vite build --base=/<repo-name>/` → deploy to GitHub Pages. Pull requests run the same checks and build without deploying. Manual runs are available from the Actions tab (*Run workflow*). Pages must be set to **Settings → Pages → Source: GitHub Actions**.

## Run locally

Requirements: Node.js 20.19+ or 22.12+ and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:5188/ (the dev server uses `--strictPort`, so it fails rather than switching ports if 5188 is busy).

On Windows, double-click `form-atlas.cmd` for a menu: **1** start, **2** stop, **3** restart, **4** open in browser, **0** exit. It installs dependencies on first run and starts the server in a minimised window. It also accepts `form-atlas.cmd start|stop|restart|status` for use from a terminal.

```sh
npm test
npm run build
```

Deploy `dist/` to any static host. Sample URLs use `?sample=executive`, so no path rewrite is required.

## Included samples

| ID | Sample | React component |
| --- | --- | --- |
| executive | Executive Minimal / Aperture | Executive |
| enterprise | Enterprise Classic / Northstar | Enterprise |
| intelligence | Dark Intelligence / Spectra | Intelligence |
| research | Research Editorial / Fieldwork | Research |
| finance | Modern Finance / Ledger | Finance |
| operations | Operations Workspace / Relay | Operations |
| people | Human-Centred Enterprise / Gather | People |
| technical | Technical Precision / Vertex | Technical |
| corporate | Premium Corporate / Evergreen | Corporate |
| analytical | Analytical Canvas / Prism | Analytical |
| insights | Insight Consultancy / Meridian (ref. Netscribes) | Insights |
| cinematic | Cinematic Product / Lumen (ref. Apple) | Cinematic |
| momentum | Product Momentum / Orbit (ref. Linear) | Momentum |
| gradient | Gradient Platform / Tessel (ref. Stripe) | Gradient |

## Project structure

- `src/main.jsx`: gallery, search, filters, favourites, design details, and responsive sample viewer.
- `src/Samples.jsx`: samples 01–10 and the `sampleComponents` registry.
- `src/Showcase.jsx`: samples 11–14 (website-style brand templates).
- `src/motion.jsx`: scroll reveal, count-up and scroll-progress helpers (no animation library).
- `src/minis.jsx`: gallery thumbnails for samples 11–14.
- `src/ui.jsx`: shared accessible drawers, charts, statistics, controls, and CSV export helper.
- `src/data.js`: template metadata, inspiration links, and palette specifications.
- `src/showcase.css`: gallery motion, thumbnails and the root-class identities `.meridian`, `.lumen`, `.orbit`, `.tessel`.
- `src/styles.css`: shared primitives, separate root-class design identities, responsive rules, reduced-motion support.
- `scripts/verify.mjs`: DOM render and interaction checks (not browser visual tests).
- `scripts/package-source.py`: reproducible source download package.

## Reuse in another React project

1. Install `react`, `react-dom`, and `lucide-react`.
2. Copy `src/Samples.jsx`, `src/ui.jsx`, and `src/styles.css` into your project.
3. Import the desired named component, for example `Executive` from `Samples.jsx`, and render it in your page.
4. Import the stylesheet once. Sample-specific rules are grouped beneath their root classes, such as `.executive` and `.research`. Shared foundations include global resets; review or isolate those before merging into an established application.
5. Include the relevant Google Fonts stylesheet from `index.html`, or self-host licensed font files. System font fallbacks work without network access.
6. Replace local arrays and illustrative metrics with your API data. These templates are reference interfaces, not authenticated business applications.

To make a minimal export, keep only the desired component and its dependencies from `Samples.jsx`. Shared helpers (Brand, Nav, PageTitle, etc.) must be retained when used. The included download is the complete project, not an automated per-component extractor.

## Gallery and demos

- Filter by business category, appearance, or text; save designs in browser local storage.
- Each sample opens with a standard `target="_blank"` link and `rel="noopener noreferrer"`.
- Desktop view is responsive. Tablet/mobile preview uses an iframe with a separate viewport, so media queries respond to the actual preview width.
- Design details include typography, palette, layout, source reference, and a downloadable JSON specification.
- All financial, employee, research, and operational data is fictional and clearly presented as illustrative.
- Form submission, approval, deployment, and other actions only change local demo state.
- Escape closes drawers. Focus is trapped inside drawers and restored on close.
- CSS respects `prefers-reduced-motion`.
- Chart data can be inspected via SVG point titles with a pointer; complete chart keyboard exploration is a future enhancement.

## Design references

Apple, Netscribes, Linear, ServiceNow, Datadog, Stripe, SAP, Workday, and Vercel provided reference directions for enterprise presentation and business context. These are original fictional brands and layouts, not copies or endorsed products. No third-party brand assets or photos are bundled. Decorative artwork is CSS/SVG. Typography comes from Google Fonts. Proprietary brand typefaces are replaced with open alternatives (for example Inter Tight in place of SF Pro, Geist for Linear-style UI, Hanken Grotesk in place of Söhne); production teams should check their selected font's licence and hosting policy. Icons are provided by lucide-react under its included licence.

## Validation and limitations

The production build and automated DOM interaction suite are supplied. Browser screenshot review was unavailable in the build environment; perform a final visual/accessibility review in your supported browsers and devices before integrating into a production application. The templates intentionally have no backend, authentication, real transactions, or external business integrations.
