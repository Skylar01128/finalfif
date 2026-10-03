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

// The menu is split into tabs, each holding one or more groups.
// - A group with `sizes` lines its items' `prices` up under those size
//   columns; use null where a size isn't offered.
// - An item with a single `price` string (one size, or a range) shows it as is.
// - `signature: true` marks a house favorite with a bloom.
// - A group's optional `flavors` list syrup options under its items.
// - A tab's `callout` shows as a note card beside its groups.
export const menu = {
  sizeNote: 'Hot drinks 12 · 16 · 20oz  ·  Iced drinks 16 · 24oz',
  tabs: [
    {
      id: 'specials',
      label: 'Specials',
      groups: [
        {
          title: 'Autumn Specials',
          sizes: ['S', 'M', 'L'],
          items: [
            { name: 'Pumpkin Spice Latte', desc: 'Espresso & milk with FIF pumpkin spice syrup', prices: ['4.95', '5.95', '6.95'], signature: true },
            { name: 'Jack-O-Lantern Cold Brew', desc: 'Cold brew with sweet cream, pumpkin spice & cheesecake, whip cream and caramel drizzle', prices: ['5.75', '6.75', null] },
            { name: "Frankenstein's Matcha", desc: 'Ceremonial matcha with FIF lavender cold foam · 16oz', price: '7.05' },
            { name: 'Apple Pie Latte', desc: 'Espresso & milk with FIF brown sugar cinnamon & apple syrup', prices: ['4.95', '5.95', '6.95'] },
            { name: 'Pumpkin Chai Latte', desc: 'Chai latte with FIF pumpkin spice syrup', prices: ['4.95', '5.95', '6.95'] },
          ],
        },
        {
          title: 'FIF Specials',
          sizes: ['S', 'M', 'L'],
          items: [
            { name: 'Texas Star', desc: 'Espresso, half & half, caramel, vanilla, cold foam and caramel drizzle', prices: ['4.75', '5.75', '6.75'], signature: true },
            { name: 'Frosted Cookie', desc: 'Sweet cream, FIF brown sugar cinnamon syrup and espresso', prices: ['4.85', '5.85', '6.85'] },
            { name: 'Coconut Bliss', desc: 'Chocolate milk, espresso, coconut syrup, cold foam & chocolate drizzle', prices: ['4.70', '5.70', '6.70'] },
            { name: 'Coconut Cream Cold Brew', desc: 'Cold brew, half & half or sweet cream and coconut cold foam', prices: ['5.45', '6.45', null] },
            { name: 'Salted Caramel Cheesecake', desc: 'Cold brew, sweet cream, cold foam and caramel drizzle', prices: ['5.45', '6.45', null] },
            { name: 'Pour Over', desc: '28oz · serves up to 4', price: '8.50' },
            { name: 'French Press', desc: '17oz · serves up to 2', price: '5.50 – 8.75' },
          ],
        },
      ],
    },
    {
      id: 'coffee',
      label: 'Coffee',
      groups: [
        {
          title: 'Coffee',
          sizes: ['S', 'M', 'L'],
          items: [
            { name: 'Double Espresso', desc: '2oz', price: '3.00' },
            { name: 'House Coffee', prices: ['2.55', '3.60', '4.35'] },
            { name: 'Iced Coffee', prices: ['2.85', '3.60', null] },
            { name: 'Cold Brew', prices: ['4.95', '5.95', null] },
            { name: 'Cappuccino', prices: ['4.65', '5.65', '6.65'] },
            { name: 'Mocha', prices: ['4.95', '5.95', '6.95'] },
            { name: 'Cortado', price: '3.65' },
            { name: 'Americano', prices: ['3.95', '4.95', '5.95'] },
            { name: 'Latte', prices: ['4.75', '5.75', '6.75'] },
          ],
        },
        {
          title: 'Extras & Flavors',
          items: [
            { name: 'Espresso Shot', desc: '1oz', price: '1.50' },
            { name: 'CBD Infusion', desc: '15mg', price: '2.00' },
          ],
          flavors: [
            { label: 'Sugar free', list: ['Vanilla', 'Caramel', 'Coconut', 'Hazelnut', 'White Chocolate', 'Irish Cream', 'Peach'] },
            {
              label: 'Regular',
              list: ['Vanilla', 'Caramel', 'Cheesecake', 'Lavender', 'Peppermint', 'Salted Caramel', 'Brown Sugar Cinnamon', 'Raspberry', 'Strawberry', 'Watermelon', 'Pomegranate', 'Pineapple', 'Blue Raspberry', 'Cherry', 'Orange'],
            },
          ],
        },
      ],
    },
    {
      id: 'not-coffee',
      label: 'Not Coffee',
      groups: [
        {
          title: 'Not Coffee',
          sizes: ['S', 'M', 'L'],
          items: [
            { name: 'Fresh Squeezed Lemonade', prices: ['4.95', '5.95', null] },
            { name: 'Tickle Me Pink', desc: 'Fresh squeezed pink lemonade with sugar-free Red Bull', prices: ['5.95', '6.95', null], signature: true },
            { name: 'Classic Chai Latte', prices: ['4.75', '5.75', '6.75'] },
            { name: 'Iced Tea', prices: ['3.90', '4.90', null] },
            { name: 'Matcha Latte', desc: '16oz', price: '6.75' },
            { name: 'Hot Chocolate', prices: ['3.90', '4.90', '5.90'] },
            { name: 'Hot Tea', prices: ['3.75', '4.75', '5.75'] },
            { name: 'Juice', desc: 'Apple or orange', price: '1.90 – 2.45' },
            { name: 'Grape Juice', price: '1.90' },
          ],
        },
        {
          title: 'Dirty Sodas',
          items: [
            { name: 'Pink Starburst', desc: 'Sprite, watermelon, pineapple & a splash of cream · 24oz', price: '5.75' },
            { name: 'Dr. Vanilla', desc: 'Dr Pepper or Diet Dr Pepper, vanilla & a splash of cream · 24oz', price: '5.75' },
            { name: 'Cherry Vanilla Bliss', desc: 'Coca-Cola, cherry, vanilla & a splash of cream · 24oz', price: '5.75' },
            { name: 'Orange Creamsicle', desc: 'Sunkist, vanilla & a splash of cream · 24oz', price: '5.75' },
          ],
        },
        {
          title: 'Kids Menu',
          sizes: ['S', 'M', 'L'],
          items: [
            { name: 'Kid Coffee', desc: "Caffeine free, iced or hot · S'mores, caramel or chocolate · 12oz", price: '4.00' },
            { name: 'Hot Chocolate', desc: 'Creamy chocolate milk at kids temp with whipped cream', prices: ['3.90', '4.90', '5.90'] },
          ],
        },
      ],
    },
    {
      id: 'bites',
      label: 'Quick Bites',
      callout: "Check out our bakery cases for today's available pastries.",
      groups: [
        {
          title: 'Quick Bites',
          items: [
            { name: 'Egg Bites (2)', desc: 'Western, ham & cheese, or cheese · while supplies last', price: '4.75' },
            { name: 'Ham & Swiss Croissant', desc: 'Ham & Swiss baked into a butter croissant · while supplies last', price: '5.95' },
            { name: 'Biscuits & Gravy', desc: 'House made biscuits and gravy · Only available on Saturdays', price: '5.95' },
          ],
        },
      ],
    },
  ],
}

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
    { src: '/public/images/bridal.jpg', tone: 'green', caption: 'Bridal & baby showers' },
    { src: '/public/images/grad.jpg', tone: 'petal', caption: 'Birthday brunches' },
    { src: '/public/images/trivia.jpg', tone: 'oat', caption: 'Bi-Weekly Trivia Nights' },
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
    { date: '2026-10-08', theme: 'Horror Movies', blurb: 'Final girls, famous last words and the scores that still give you chills.' },
    { date: '2026-10-22', theme: "Halloween General", blurb: 'Come in costume and find out how much you really know about the spookiest night of the year.' },
    { date: '2026-11-05', theme: 'Gilmore Girls', blurb: "Think you can keep up with Lorelai's pop-culture references? Pour a coffee and prove it." },
    { date: '2026-11-19', theme: 'Friends', blurb: 'A Friendsgiving warm-up, all about the show that made the coffee shop the place to be.' },
  ],
}
