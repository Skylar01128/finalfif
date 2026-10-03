# Flower In Flour — website

Vue 3 + Vite landing page.

```bash
npm install
npm run dev      # local dev server at http://localhost:5173
npm run build    # production build in dist/
```

## Before launch

- **`src/data/site.js`** holds all content. Replace every `TODO`: address,
  `mapQuery` (drives the Google Map and directions link), time zone, phone,
  emails, Instagram, hours, menu and prices.
- **Reviews** in `site.js` are samples. The Reviews section shows a visible
  "sample reviews" notice until every entry's `sample: true` flag is removed.
- **Photos**: drop files into `public/images/` (see the README there). Missing
  photos show a floral placeholder.
- **Newsletter** form in `SiteFooter.vue` only confirms on screen. Connect it
  to your email provider.
