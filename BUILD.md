# Build

`src/index` is assembled from `src/pause.html` by inlining the font, the UI icons,
and the logo, so the shipped `index.html` makes no runtime network calls.

## What you need
- Node 18+ and Python 3 (Pillow)
- Fonts/icons, fetched from their open sources at build time:
  - Plus Jakarta Sans — SIL Open Font Licence (github.com/tokotype/PlusJakartaSans)
  - Material Symbols — Apache-2.0 (github.com/marella/material-symbols)
- Pákó brand logo files (not in this repo) for `make_logo.py`

## Steps
1. `gen_assets.js` reads the font + chosen Material Symbols and writes `assets.json`.
2. `make_logo.py` trims the brand logos and writes `logo.json` (favicon, app icons, splash lockup).
3. `assemble.js` injects `assets.json` + `logo.json` into `pause.html` and writes `index.html`.

The font (OFL) and icons (Apache-2.0) permit this bundling; keep their licences with any redistribution.
