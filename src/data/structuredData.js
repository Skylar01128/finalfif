// Builds schema.org JSON-LD for the café from site.js, so search engines get
// the address, hours, contact details and menu in a form they understand.
// Injected into index.html at build time by the plugin in vite.config.js.

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// "San Antonio, TX 78251" -> { locality, region, postalCode }
function parseCityLine(line) {
  const match = line.match(/^(.+),\s*([A-Z]{2})\s+(\d{5}(?:-\d{4})?)$/)
  if (!match) throw new Error(`site.address.line2 should look like "City, ST 12345", got "${line}"`)
  const [, locality, region, postalCode] = match
  return { locality, region, postalCode }
}

// One Offer per available size, or a single Offer for one-price items.
// A range like "5.50 – 8.75" is reported as its lowest price.
function offersFor(item, sizes = []) {
  if (!item.prices) {
    return { '@type': 'Offer', price: item.price.split(/\s*–\s*/)[0], priceCurrency: 'USD' }
  }
  return item.prices
    .map((price, i) => price && { '@type': 'Offer', name: sizes[i], price, priceCurrency: 'USD' })
    .filter(Boolean)
}

export function cafeSchema(site, menu) {
  const { locality, region, postalCode } = parseCityLine(site.address.line2)

  return {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    name: site.name,
    description:
      'A flower-filled neighborhood café for slow mornings, focused afternoons, and celebrations worth remembering.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.line1,
      addressLocality: locality,
      addressRegion: region,
      postalCode,
      addressCountry: 'US',
    },
    telephone: site.phone,
    email: site.email,
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`,
    sameAs: [`https://instagram.com/${site.instagram}`],
    servesCuisine: ['Coffee', 'Tea', 'Pastries'],
    priceRange: '$',
    acceptsReservations: true,
    // Entries with `note` (e.g. café closed) are omitted, which schema.org reads as closed.
    openingHoursSpecification: site.hours
      .filter((h) => h.open)
      .map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.days.map((d) => DAY_NAMES[d]),
        opens: h.open,
        closes: h.close,
      })),
    hasMenu: {
      '@type': 'Menu',
      hasMenuSection: menu.tabs
        .flatMap((tab) => tab.groups)
        .filter((group) => group.items)
        .map((group) => ({
          '@type': 'MenuSection',
          name: group.title,
          hasMenuItem: group.items.map((item) => ({
            '@type': 'MenuItem',
            name: item.name,
            ...(item.desc && { description: item.desc }),
            offers: offersFor(item, group.sizes),
          })),
        })),
    },
  }
}
