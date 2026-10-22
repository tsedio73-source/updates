# Anshika's Birthday Celebration

A small, responsive birthday page made by a friend. The cake is drawn in CSS with perspective, animated candle flames, a live midnight countdown, candle controls and reduced-motion-aware confetti.

## Run locally

```bash
python3 -m http.server 3000 --bind 0.0.0.0
```

Then open the local site on port 3000.

## Birthday time

The countdown targets **23 October 2026 at 12:00 AM India Standard Time**. The timestamp lives at the top of `app.js` as an ISO date with the `+05:30` offset.

## Source files

- `index.html` — page structure and copy
- `styles.css` — responsive layout, cake illustration, candle flames and reduced-motion rules
- `app.js` — countdown and interactions
- `assets/heart-cake.svg` and `favicon.svg` — small page marks
- `manus-routes.json` — declared page routes
