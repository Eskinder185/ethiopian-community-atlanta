# ECAA Lighthouse Checklist

Use this checklist before major releases to keep the ECAA website near production quality.

## How to test

1. Build the production site: `npm run build`
2. Preview locally: `npm run preview`
3. Open Chrome in **Incognito** mode
4. Open DevTools → **Lighthouse**
5. Select **Mobile** device emulation
6. Enable **Slow 4G** throttling (Network tab or Lighthouse settings)
7. Run Lighthouse for each page below

## Pages to test

| Page                | URL                 |
| ------------------- | ------------------- |
| Homepage            | `/`                 |
| Membership          | `/membership`       |
| Programs            | `/programs`         |
| Events              | `/events`           |
| Hall rental section | `/events#book-hall` |
| Support / Donation  | `/support`          |
| Contact             | `/contact`          |
| Media               | `/media`            |
| Leadership          | `/leadership`       |
| Documents           | `/documents`        |

## Scores to track

For each page, record:

- **Performance** — target 90+
- **Accessibility** — target 90+
- **Best Practices** — target 90+
- **SEO** — target 90+

## Quick checks

- Unique page title and meta description (via `SEO` / `RouteSEO`)
- Images use `loading="lazy"` below the fold
- No broken console errors on load
- Language toggle works (English / Amharic)
- Admin routes excluded from public Lighthouse runs (`/admin/*`)

## Production preview URL

After deploy: `https://eskinder185.github.io/ethiopian-community-atlanta/`

## Optional next step

Lighthouse CI can be added later to automate scores in GitHub Actions. It is not required for deployment today.
