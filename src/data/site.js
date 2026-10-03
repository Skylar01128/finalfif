// All customer-facing content lives in this file. Anything marked TODO is a
// placeholder and must be replaced with real details before launch.

export const site = {
  name: 'Flower In Flour',
  // TODO: real address. `mapQuery` is what the Google Map searches for; the
  // exact Google Business Profile name + street address pins it most reliably.
  address: { line1: '6915 Bandera Rd #104', line2: 'San Antonio, TX 78251' },
  mapQuery: '6915 Bandera Rd #104, San Antonio',
  timeZone: 'America/Chicago', // TODO: shop's time zone (drives "Open now")
  phone: '(210) 251-4324', // TODO
  email: 'admin@flowerinflour.com', // TODO
  eventsEmail: 'events@flowerinflour.com', // TODO
  instagram: 'flower_in_flour_', // TODO
  // days: 0 = Sunday … 6 = Saturday. Times are 24h in the shop's time zone.
  // An entry with `note` instead of open/close shows that text and counts as
  // closed for "Open now".
  hours: [
    { label: 'Monday – Thursday', days: [1, 2, 3, 4], open: '07:30', close: '18:00' },
    { label: 'Friday – Saturday', days: [5, 6], open: '08:00', close: '16:00' },
    { label: 'Sunday', days: [0], note: 'Café closed · open for events' },
  ],
}

export const menu = [
  {
    title: 'Coffee & Tea',
    items: [
      { name: 'Espresso', price: '3.25' },
      { name: 'Cortado', price: '4.25' },
      { name: 'Cappuccino', price: '4.75' },
      { name: 'Latte', price: '5.25', desc: 'Hot or iced' },
      { name: 'Drip coffee', price: '3.00', desc: 'Rotating single origin' },
      { name: 'Loose-leaf tea', price: '3.75', desc: 'Earl grey, chamomile, jasmine green' },
    ],
  },
  {
    title: 'Floral Specials',
    items: [
      { name: 'Lavender Honey Latte', price: '6.25', desc: 'House lavender syrup, wildflower honey', signature: true },
      { name: 'Rose Cardamom Cortado', price: '5.75', desc: 'Rosewater, cardamom, dusted petals', signature: true },
      { name: 'Hibiscus Cold Brew', price: '5.75', desc: 'Cold brew over hibiscus-citrus ice' },
      { name: 'Elderflower Tonic', price: '6.00', desc: 'Espresso, elderflower, sparkling tonic' },
      { name: 'Chamomile Steamer', price: '4.75', desc: 'Caffeine-free, vanilla bean, oat milk' },
    ],
  },
  {
    title: 'From the Oven',
    items: [
      { name: 'Rose Pistachio Croissant', price: '5.50', signature: true },
      { name: 'Lemon Elderflower Scone', price: '4.25' },
      { name: 'Lavender Shortbread', price: '3.00' },
      { name: 'Honey Almond Morning Bun', price: '4.75' },
      { name: 'Seasonal Galette', price: '6.00', desc: "Ask what's blooming" },
      { name: 'Savory Herb Quiche', price: '8.50' },
    ],
  },
]

// TODO: replace with real reviews (e.g. copied from your Google Business
// Profile, with permission). While any entry has `sample: true`, the Reviews
// section shows a visible "sample reviews" notice so these can't ship unnoticed.
export const reviews = [
  {
    sample: false,
    name: 'Allen O\'Neil',
    context: 'Weekday regular',
    rating: 5,
    text: 'I come to this coffee shop pretty regularly and bring friends when I can. The baristas are always friendly and helpful. Great atmosphere to sit and work or study. Love to support small business when I can, especially lgbtq owned.',
  },
  {
    sample: false,
    name: 'Gabby Castillo',
    context: 'Book Club Host',
    rating: 5,
    text: 'I have been hosting book club events here for a year and a half, and the environment and staff have been nothing but accommodating and inviting. They’re lovely people to work with and obviously a beautiful space for events. If you’re in need of a rental space, do reach out to them! It’ll make your event that much better!',
  },
  {
    sample: false,
    name: 'Irma C.',
    context: 'Saturday brunch',
    rating: 5,
    text: 'I absolutely love the aesthetic at Flower in Flour! After having lunch nearby, my friend wanted to grab some cafecito, and I knew exactly where to take her. It is always a treat coming here whenever I can.I ordered a medium Honey Bloom Latte with oat milk from their spring specials, and my friend got a medium Coconut Cream Cold Brew. We both absolutely loved our drinks! On top of the great flavors, I always love the music they play here. It is the perfect spot for a coffee date!',
  },
  {
    sample: false,
    name: 'Lizard Wizard',
    context: 'Event Guest',
    rating: 5,
    text: 'Went there for a Junk Journal Club event and was wowed by the cute interior and the delicious drink! I luckily caught the tail end of their autumn in summer drink special and got a pumpkin spice latte that has me excited for autumn already!',
  },
  {
    sample: false,
    name: 'Cameron brooks',
    context: 'First Visit',
    rating: 4,
    text: 'Fantastic coffee shop',
  },
  {
    sample: false,
    name: 'Saad Al-Aziz',
    context: 'First visit',
    rating: 5,
    text: 'Really cool coffee shop that I just happened to find. Excellent coffee and very tasty pastries. Customer service is top notch! Really cool atmosphere. Highly recommend!',
  },
]

export const events = {
  slides: [
    { src: '/images/event-1.jpg', tone: 'green', caption: 'Bridal & baby showers' },
    { src: '/images/event-2.jpg', tone: 'petal', caption: 'Birthday brunches' },
    { src: '/images/event-3.jpg', tone: 'oat', caption: 'Flower-arranging workshops' },
  ],
  types: ['Showers', 'Birthdays', 'Workshops', 'Book clubs'],
  details: [
    'Up to 70 guests',
    'Available Mon-Sat after café hours and all day Sunday'
  ],
}

// Trivia nights. Add a night by appending { date, theme, blurb }; dates are
// YYYY-MM-DD in the shop's time zone. Past nights drop off the site
// automatically, and the soonest upcoming one becomes the featured card.
// TODO: replace these placeholder themes, dates and details with the real lineup.
export const trivia = {
  cadence: 'Every other Thursday',
  start: '19:00',
  end: '21:00',
  details: ['Free to play', 'Prizes for the top 3', 'Seating First Come First Served'],
  nights: [
    { date: '2026-10-08', theme: "'90s Nostalgia", blurb: 'Boy bands, Blockbuster, Tamagotchis and the TV you weren\'t supposed to stay up for.' },
    { date: '2026-10-22', theme: 'Horror Movies', blurb: 'Final girls, famous last words and the scores that still give you chills.' },
    { date: '2026-11-05', theme: 'Disney & Pixar', blurb: 'From the castle to the toy box: songs, sidekicks and deep-cut villains.' },
    { date: '2026-11-19', theme: 'Friendsgiving', blurb: 'Food, drink and a few rounds on the sitcom that named the holiday.' },
  ],
}
