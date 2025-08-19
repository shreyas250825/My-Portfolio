# Shreyas Salian - Portfolio Website (Netlify)

Modern, responsive personal portfolio hosted on Netlify. Static, lightweight, and optimized for Core Web Vitals and Lighthouse 100/100 across Performance, Accessibility, Best Practices, and SEO.

## Tech & Hosting
- **Static site**: HTML, CSS, JS (no backend)
- **Hosting**: Netlify
- **Forms**: Netlify Forms (serverless)
- **CI**: Deploy on push (optional)

## Features
- **Responsive UI** with mobile-first layout
- **Filterable projects** grid
- **Accessible navigation** (skip link, focus-visible, keyboard support)
- **Core Web Vitals** optimized (lazy-load images, deferred JS)
- **SEO**: canonical tags, OpenGraph/Twitter cards, sitemap
- **Security**: hardened headers via `netlify.toml`

## Getting Started
1. Clone the repo to your machine.
2. Serve locally (any static server) or open `index.html` directly.
3. Update content in `index.html`, styles in `style.css`, behavior in `script.js`.

## Netlify Deployment
1. Create a new Netlify site and connect the repo.
2. Build settings: no build command. Publish directory: project root (`.`).
3. Ensure these files exist:
   - `index.html`, `style.css`, `script.js`, `sitemap.xml`
   - `netlify.toml` (headers + caching)
   - `_redirects` (SPA fallback)

## Netlify Forms
The contact form uses Netlify Forms. It requires:
- A visible form with `data-netlify="true"` and hidden `form-name` input.
- A hidden duplicate form at the bottom for crawler detection (already included).

Submitting will be handled by Netlify automatically. View submissions in Netlify dashboard.

## Performance & CWV
Implemented optimizations:
- Preconnect to fonts/CDN; defer non-critical scripts
- Lazy-load images with width/height to prevent CLS
- `prefers-reduced-motion` support
- Long-term caching via `netlify.toml` for `assets/`, `style.css`, `script.js`
- Passive scroll listeners

## Accessibility
- Skip-to-content link
- `aria-*` attributes for nav/menu buttons
- Visible focus states (`:focus-visible`)
- `aria-live` form messages

## SEO
- Canonical URL: `https://shreyassalian.netlify.app/`
- OpenGraph/Twitter meta tags
- Updated `sitemap.xml`
- JSON-LD Person schema

## Customize
- Update images in `assets/` (keep file names or change references in `index.html`).
- Change colors/typography via CSS variables in `style.css` `:root`.
- Add/modify projects in the Projects section of `index.html`.

## File Structure
```
my degree website/
├── index.html
├── style.css
├── script.js
├── assets/
├── sitemap.xml
├── _redirects
└── netlify.toml
```

## Lighthouse Tips
If you are slightly below 100:
- Ensure a stable network when testing; run Lighthouse in Incognito
- Warm cache once, then test
- Avoid throttling external CDNs (fonts, icons) by keeping preconnects
- Consider self-hosting fonts/icons if CDN latency fluctuates

## License
MIT
