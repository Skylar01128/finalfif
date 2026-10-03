import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { site, menu } from './src/data/site.js'
import { cafeSchema } from './src/data/structuredData.js'

// Writes the café's JSON-LD into index.html so crawlers see it without
// running JavaScript. Vite restarts the dev server when site.js changes.
const structuredData = {
  name: 'structured-data',
  transformIndexHtml: () => [
    {
      tag: 'script',
      attrs: { type: 'application/ld+json' },
      // Escape "<" so content can never close the script tag early.
      children: JSON.stringify(cafeSchema(site, menu), null, 2).replace(/</g, '\\u003c'),
      injectTo: 'head',
    },
  ],
}

export default defineConfig({
  plugins: [vue(), structuredData],
})
