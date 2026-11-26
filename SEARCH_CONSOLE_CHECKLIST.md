# Google Search Console — Post-Deployment Checklist

After every significant deployment, complete the following steps in
[Google Search Console](https://search.google.com/search-console/).

---

## 1. Verify ownership is still active

- Open the Search Console property for `https://shreyassalian.netlify.app/`.
- Confirm the ownership verification method (HTML meta tag `a416fe0c4c5f48c2`
  and HTML file `googlea416fe0c4c5f48c2.html`) is still showing **Verified**.
- If ownership is lost, re-add the meta tag and redeploy.

---

## 2. Inspect the homepage URL

- Go to **URL Inspection**.
- Enter `https://shreyassalian.netlify.app/`.
- Click **Test Live URL**.
- Confirm:
  - Page is indexable.
  - Canonical URL is `https://shreyassalian.netlify.app/` (not `/index.html`).
  - Google's selected canonical matches.
  - Mobile rendering looks correct (check the rendered screenshot).
  - No "Blocked by robots.txt" warning.
  - No "Redirect" or "Soft 404" issues.

---

## 3. Request indexing for the updated homepage

- After confirming the live URL test passes, click **Request Indexing**.
- This does not guarantee immediate crawling but adds the URL to the crawl queue.

---

## 4. Resubmit the sitemap

- Go to **Sitemaps**.
- If the sitemap `https://shreyassalian.netlify.app/sitemap.xml` is listed,
  click it and choose **Resubmit**.
- If it is not listed, enter the URL and submit.
- Confirm the sitemap returns HTTP 200 and shows valid URLs.
- The sitemap currently contains only one URL: the homepage.
  Fragment-only URLs (e.g. `#research`) are not indexable pages and are
  correctly excluded.

---

## 5. Review Page Indexing report

- Go to **Indexing → Pages**.
- Review any pages with errors or warnings.
- Common expected exclusions:
  - "Duplicate without user-selected canonical" for `index.html` —
    handled by the `_redirects` rule `301 /index.html → /`.
  - "Crawled – currently not indexed" — normal for new content.
- Action on "Redirect error" or "Blocked by robots.txt" — investigate.

---

## 6. Review Core Web Vitals

- Go to **Experience → Core Web Vitals**.
- Note: Real-user field data (CrUX) requires sufficient traffic before appearing.
- Lab data from Lighthouse (run locally) is recorded separately in this report.
- Targets:
  - LCP: ≤ 2.5 s
  - CLS: ≤ 0.1
  - INP: ≤ 200 ms (assessed from real user interactions)

---

## 7. Review Rich Results / Structured Data

- Go to **Enhancements** or use
  [Rich Results Test](https://search.google.com/test/rich-results).
- Enter the homepage URL.
- Verify the `Person`, `ProfilePage`, and `WebSite` entities are detected.
- No errors should be present for the JSON-LD graph.

---

## 8. Check search performance

- Go to **Performance → Search Results**.
- After 1–2 weeks of crawling, review:
  - Queries driving impressions.
  - Click-through rates.
  - Average position for name queries: "Shreyas Salian".
  - Any unexpected queries driving traffic.

---

## 9. Check HTTPS report

- Go to **Security & Manual Actions → HTTPS**.
- Confirm all pages are served over HTTPS.
- Netlify enforces HTTPS by default.

---

## Bing Webmaster Tools

1. Visit [Bing Webmaster Tools](https://www.bing.com/webmasters/).
2. Add the property `https://shreyassalian.netlify.app/`.
3. Verify via meta tag or DNS.
4. Submit the sitemap: `https://shreyassalian.netlify.app/sitemap.xml`.
5. Use **IndexNow** to notify Bing of content updates:
   - Generate a key at `https://www.bing.com/indexnow`.
   - Place the verification file at the root.
   - Submit the key URL when meaningful content is added or updated.
   - Do not submit unchanged pages or non-canonical URLs.

---

## Notes

- Changes to Google Search results take days to weeks after recrawling.
- Requesting indexing does not guarantee rankings.
- The `robots.txt` allows all legitimate search crawlers.
- Training crawlers (GPTBot, CCBot, Claude-Web, Google-Extended) are disallowed
  by the current `robots.txt`. Review this policy if preferences change.
- The `llms.txt` at `https://shreyassalian.netlify.app/llms.txt` provides a
  plain-text academic summary for AI systems that support it.
