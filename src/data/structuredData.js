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

function postalAddress(address) {
  const { locality, region, postalCode } = parseCityLine(address.line2)
  return {
    '@type': 'PostalAddress',
    streetAddress: address.line1,
    addressLocality: locality,
    addressRegion: region,
    postalCode,
    addressCountry: 'US',
  }
}

// "2026-11-05", "19:00", "America/Chicago" -> "2026-11-05T19:00:00-06:00".
// The offset is read at noon UTC that day, after any 2am DST switch, so it's
// right for evening events on the day the clocks change too.
function withOffset(ymd, hhmm, timeZone) {
  const tz = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'longOffset' })
    .formatToParts(new Date(`${ymd}T12:00:00Z`))
    .find((p) => p.type === 'timeZoneName').value
  return `${ymd}T${hhmm}:00${tz.replace('GMT', '') || 'Z'}`
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
  return {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    name: site.name,
    url: `${site.url}/`,
    image: `${site.url}/images/hero.jpg`,
    description:
      'A flower-filled neighborhood café for slow mornings, focused afternoons, and celebrations worth remembering.',
    address: postalAddress(site.address),
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

// One Event per upcoming trivia night, so nights can appear in Google's event
// results. Past nights are left out, which means they only drop off after a
// rebuild; rebuild whenever trivia.nights changes.
export function triviaSchema(site, trivia, today) {
  return trivia.nights
    .filter((n) => n.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((n) => ({
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: `${n.theme} Trivia Night at ${site.name}`,
      description: n.blurb,
      url: `${site.url}/#trivia`,
      image: `${site.url}/images/trivia.jpg`,
      startDate: withOffset(n.date, trivia.start, site.timeZone),
      endDate: withOffset(n.date, trivia.end, site.timeZone),
      eventStatus: 'https://schema.org/EventScheduled',
      eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: `${site.url}/#trivia` },
      location: { '@type': 'Place', name: site.name, address: postalAddress(site.address) },
      organizer: { '@type': 'Organization', name: site.name, url: `${site.url}/` },
    }))
}
