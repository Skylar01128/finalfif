import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { site, menu, trivia } from './src/data/site.js'
import { cafeSchema, triviaSchema } from './src/data/structuredData.js'

// Escape "<" so content can never close the script tag early.
const jsonLd = (data) => ({
  tag: 'script',
  attrs: { type: 'application/ld+json' },
  children: JSON.stringify(data, null, 2).replace(/</g, '\\u003c'),
  injectTo: 'head',
})

// Canonical URL plus Open Graph / Twitter tags, so shared links show a photo.
// Apps fall back to the page's <title> and meta description for the text.
const meta = (attrs) => ({ tag: 'meta', attrs, injectTo: 'head' })
const linkPreviewTags = [
  { tag: 'link', attrs: { rel: 'canonical', href: `${site.url}/` }, injectTo: 'head' },
  meta({ property: 'og:type', content: 'website' }),
  meta({ property: 'og:site_name', content: site.name }),
  meta({ property: 'og:url', content: `${site.url}/` }),
  meta({ property: 'og:image', content: `${site.url}/images/hero.jpg` }),
  meta({ name: 'twitter:card', content: 'summary_large_image' }),
]

// Writes the café's and upcoming trivia nights' JSON-LD into index.html so
// crawlers see it without running JavaScript. Vite restarts the dev server
// when site.js changes. Trivia events are fixed at build time, so rebuild
// after adding nights (and periodically, so past nights drop off).
const structuredData = {
  name: 'structured-data',
  transformIndexHtml: () => {
    // Today in the shop's time zone, matching how TriviaSection filters nights.
    const today = new Intl.DateTimeFormat('en-CA', { timeZone: site.timeZone }).format(new Date())
    const events = triviaSchema(site, trivia, today)
    return [
      ...linkPreviewTags,
      jsonLd(cafeSchema(site, menu)),
      ...(events.length ? [jsonLd(events)] : []),
    ]
  },
}

export default defineConfig({
  plugins: [vue(), structuredData],
})
