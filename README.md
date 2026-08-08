# Pause by Pákó (free)

A tiny, private tool for riding out a craving instead of fighting it.
A craving is a wave: it rises, peaks, and passes. Pause helps you watch it go.

## Private by design
Everything you enter, your name, your list, every pause you log, stays in your
own browser on your own device. There is no account and no back-end: a web host
delivers the app once, then it runs on its own and never sends what you type
anywhere. This repo is public so you can verify that for yourself.

## Deploy
It's a static site, no build step needed to host it.
1. Put the contents of this repo on any static host (built for Netlify at pause.pako.health).
2. Point the domain at it. Done.

`index.html` is the whole app: the font and UI icons are inlined, so at runtime
it makes no network calls.

## Files
- `index.html` — the app (self-contained)
- `site.webmanifest`, icons, `og-image.png` — install icon + link preview
- `_headers` — Netlify security + cache headers
- `src/` — the readable source and build scripts (see BUILD.md)

## Build (optional)
See [BUILD.md](BUILD.md). You only need this to change the app; to host it, just
use `index.html`.

## Licence
Source-available. Read and audit freely; not for reuse or resale. See [LICENSE](LICENSE).
Prefer full open source? Swap LICENSE for MIT.

---
Part of Pákó Habit Lab. The paid version (custom soundscapes and deeper insight)
is a separate build.
