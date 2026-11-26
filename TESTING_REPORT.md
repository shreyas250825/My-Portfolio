# Testing Report — Phase 3
Generated: 2026-11-16

## Lighthouse Results (Local HTTP Server, port 7301)

All scores are lab measurements, not CrUX field data.
Tests run against: http://localhost:7301/ using Chrome headless.

### Mobile (simulated throttling: 150ms RTT, 1.6 Mbps, 4× CPU slowdown)

| Metric           | Score / Value |
|------------------|---------------|
| Performance      | 100 ✓         |
| Accessibility    | 100 ✓         |
| Best Practices   | 96 ✓          |
| SEO              | 100 ✓         |
| LCP              | 1.2 s         |
| CLS              | 0.000         |
| TBT              | 70 ms         |
| Transfer size    | ~192 KB       |
| Requests         | 10            |

### Desktop (simulated: 40ms RTT, 10 Mbps, 1× CPU)

| Metric           | Score / Value |
|------------------|---------------|
| Performance      | 100 ✓         |
| Accessibility    | 100 ✓         |
| Best Practices   | 96 ✓          |
| SEO              | 100 ✓         |
| LCP              | 0.3 s         |
| CLS              | 0.008         |
| TBT              | 0 ms          |
| Transfer size    | ~192 KB       |

**Note:** 192 KB includes Google Fonts from external CDN. 
Fonts are blocked in local test; real-network transfer for Fonts adds ~30–40 KB.
Best Practices 96 reflects the HTTP (non-HTTPS) local server; production on Netlify will score higher.

---

## Playwright Cross-Viewport Results

| Viewport     | Overflow | JS Errors |
|--------------|----------|-----------|
| 320×568      | 0 px     | 0         |
| 360×800      | 0 px     | 0         |
| 375×812      | 0 px     | 0         |
| 390×844      | 0 px     | 0         |
| 393×852      | 0 px     | 0         |
| 414×896      | 0 px     | 0         |
| 430×932      | 0 px     | 0         |
| 768×1024     | 0 px     | 0         |
| 820×1180     | 0 px     | 0         |
| 1024×768     | 0 px     | 0         |
| 1280×800     | 0 px     | 0         |
| 1440×900     | 0 px     | 0         |
| 1920×1080    | 0 px     | 0         |

All 13 viewports: **zero horizontal overflow, zero JS errors**.

---

## SEO Metadata Audit Results

| Check                        | Result  |
|------------------------------|---------|
| Title (44 chars)             | PASS ✓  |
| Meta description (≤160)      | PASS ✓  |
| Canonical URL                | PASS ✓  |
| Robots meta                  | PASS ✓  |
| GSC verification tag         | PASS ✓  |
| OG image (og-preview.jpg)    | PASS ✓  |
| OG image dimensions 1200×630 | PASS ✓  |
| Twitter card type            | PASS ✓  |
| Exactly one H1               | PASS ✓  |
| lang="en"                    | PASS ✓  |
| No images missing alt        | PASS ✓  |
| Structured data @graph       | PASS ✓  |
| Person @id uses #person      | PASS ✓  |
| Person.sameAs ≥ 2 profiles   | PASS ✓  |
| sitemap.xml valid urlset     | PASS ✓  |
| sitemap.xml no fragments     | PASS ✓  |
| sitemap.xml has lastmod      | PASS ✓  |
| robots.txt Sitemap directive | PASS ✓  |
| robots.txt GPTBot rule       | PASS ✓  |
| robots.txt OAI-SearchBot     | PASS ✓  |

---

## Accessibility Spot Checks

| Check                             | Result |
|-----------------------------------|--------|
| Form inputs labeled               | PASS ✓ |
| nav-toggle aria-expanded="false"  | PASS ✓ |
| Netlify form attribute            | PASS ✓ |
| details/summary elements          | PASS ✓ (8 expandable sections) |
| Back-to-top button                | PASS ✓ |
| Skip link                         | PASS ✓ |

---

## Content Integrity

| Check                        | Result |
|------------------------------|--------|
| Name in body text            | PASS ✓ |
| ECE full form present        | PASS ✓ |
| Federated learning content   | PASS ✓ |
| IIT affiliation present      | PASS ✓ |
| ≥5 manuscripts in DOM        | PASS ✓ (6) |
| ≥3 timeline items            | PASS ✓ (5) |
| No GPA/CGPA disclosed        | PASS ✓ |
| No fabricated metrics        | PASS ✓ |
| "Under Review" present       | PASS ✓ (7 occurrences) |

---

## Limitations

- Google Fonts (Libre Baskerville, Source Sans 3, IBM Plex Mono) load from
  external CDN; they are blocked in local HTTP server tests. Screenshots
  therefore show fallback fonts. On the live Netlify deployment, correct
  fonts will load. font-display:swap prevents invisible text.
- Best Practices score of 96 reflects HTTP local server
  (not HTTPS). Production Netlify will serve HTTPS and score higher.
- INP (Interaction to Next Paint) is a field metric requiring real user
  interactions; it cannot be measured in Lighthouse lab mode.
- CrUX (Chrome User Experience Report) field data requires sufficient
  real-user traffic to appear in Search Console Core Web Vitals reports.
