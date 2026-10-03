<script setup>
import { computed } from 'vue'
import { trivia, site } from '../data/site'
import { formatTime } from '../utils/hours'
import Bloom from './Bloom.vue'

// Today's date in the shop's time zone as YYYY-MM-DD, so string comparison
// against trivia.nights works no matter where the visitor is browsing from.
const today = new Intl.DateTimeFormat('en-CA', { timeZone: site.timeZone }).format(new Date())

const upcoming = computed(() =>
  trivia.nights.filter((n) => n.date >= today).sort((a, b) => a.date.localeCompare(b.date)),
)
const next = computed(() => upcoming.value[0])
const later = computed(() => upcoming.value.slice(1, 4))

// Calendar dates carry no time zone, so format them as UTC to avoid drift.
const asDate = (ymd) => new Date(`${ymd}T00:00:00Z`)
const fmt = (ymd, opts) => new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', ...opts }).format(asDate(ymd))

const parts = (ymd) => ({
  month: fmt(ymd, { month: 'short' }),
  day: fmt(ymd, { day: 'numeric' }),
  weekday: fmt(ymd, { weekday: 'long' }),
  full: fmt(ymd, { weekday: 'long', month: 'long', day: 'numeric' }),
})

const relative = (ymd) => {
  const days = Math.round((asDate(ymd) - asDate(today)) / 86_400_000)
  if (days === 0) return 'Tonight'
  if (days === 1) return 'Tomorrow'
  if (days < 7) return `This ${parts(ymd).weekday}`
  return `In ${days} days`
}

const timeRange = `${formatTime(trivia.start)} – ${formatTime(trivia.end)}`

const reserveHref = (n) =>
  `mailto:${site.eventsEmail}?subject=${encodeURIComponent(`Trivia team — ${n.theme} (${parts(n.date).full})`)}`

const icsHref = (n) => {
  const stamp = (hhmm) => `${n.date.replaceAll('-', '')}T${hhmm.replace(':', '')}00`
  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Flower In Flour//Trivia//EN',
    'BEGIN:VEVENT',
    `UID:trivia-${n.date}@flowerinflour.com`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`,
    `DTSTART;TZID=${site.timeZone}:${stamp(trivia.start)}`,
    `DTEND;TZID=${site.timeZone}:${stamp(trivia.end)}`,
    `SUMMARY:Trivia Night: ${n.theme} at ${site.name}`,
    `LOCATION:${site.address.line1}\\, ${site.address.line2.replace(',', '\\,')}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`
}
</script>

<template>
  <section id="trivia" class="trivia section">
    <div class="container">
      <header class="trivia__head">
        <p v-reveal class="eyebrow">Trivia night · {{ trivia.cadence }}</p>
        <h2 v-reveal="100" class="h-section">Think fast. <em>Sip slow.</em></h2>
        <p v-reveal="150" class="lede">
          Grab a latte, round up your team and test what you know. A new theme every night, from {{ timeRange }}.
        </p>
      </header>

      <div class="trivia__grid">
        <article v-if="next" v-reveal="200" class="ticket" aria-labelledby="trivia-next">
          <div class="ticket__stub">
            <span class="ticket__month">{{ parts(next.date).month }}</span>
            <span class="ticket__day">{{ parts(next.date).day }}</span>
            <span class="ticket__weekday">{{ parts(next.date).weekday }}</span>
          </div>

          <div class="ticket__body">
            <span class="ticket__badge"><Bloom :size="14" /> {{ relative(next.date) }}</span>
            <p class="ticket__label">Up next · theme</p>
            <h3 id="trivia-next" class="ticket__theme">{{ next.theme }}</h3>
            <p class="ticket__blurb">{{ next.blurb }}</p>

            <p class="ticket__when">
              <time :datetime="`${next.date}T${trivia.start}`">{{ parts(next.date).full }}</time>
              · {{ timeRange }}
            </p>

            <ul class="ticket__details" aria-label="Trivia details">
              <li v-for="d in trivia.details" :key="d">{{ d }}</li>
            </ul>

            <div class="ticket__actions">
              <a :href="reserveHref(next)" class="btn btn--solid">Reserve a team table</a>
              <a :href="icsHref(next)" :download="`trivia-${next.date}.ics`" class="ticket__cal">
                Add to calendar <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </article>

        <div v-else v-reveal="200" class="ticket ticket--empty">
          <div class="ticket__body">
            <p class="ticket__label">Up next</p>
            <h3 class="ticket__theme">Theme coming soon</h3>
            <p class="ticket__blurb">
              We're writing the next round. Follow
              <a :href="`https://instagram.com/${site.instagram}`">@{{ site.instagram }}</a>
              to hear it first.
            </p>
          </div>
        </div>

        <aside v-if="later.length" v-reveal="300" class="later" aria-labelledby="trivia-later">
          <h3 id="trivia-later" class="eyebrow later__title">Coming up</h3>
          <ol class="later__list">
            <li v-for="n in later" :key="n.date" class="later__item">
              <time class="later__date" :datetime="n.date">
                <span>{{ parts(n.date).month }}</span>
                <strong>{{ parts(n.date).day }}</strong>
              </time>
              <div>
                <p class="later__theme">{{ n.theme }}</p>
                <p class="later__meta">{{ parts(n.date).weekday }} · {{ formatTime(trivia.start) }}</p>
                <p class="later__meta">{{ n.blurb }}</p>
              </div>
            </li>
          </ol>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
.trivia__head {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 760px;
  margin-bottom: clamp(48px, 6vw, 80px);
}
.trivia__grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: clamp(32px, 5vw, 72px);
  align-items: start;
}

/* Featured night: a ticket with a date stub and a perforated edge. */
.ticket {
  display: grid;
  grid-template-columns: auto 1fr;
  background: var(--flour);
  border: 1px solid var(--line);
  border-radius: var(--radius-lg);
  box-shadow: 0 30px 60px -40px rgba(53, 60, 64, 0.45);
  overflow: hidden;
}
.ticket--empty {
  grid-template-columns: 1fr;
}
.ticket__stub {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  min-width: clamp(112px, 14vw, 160px);
  padding: 32px 20px;
  background: var(--ink);
  color: var(--cream);
  text-align: center;
}
/* Perforation between stub and body, with notches cut top and bottom. */
.ticket__stub::after {
  content: '';
  position: absolute;
  top: 18px;
  bottom: 18px;
  right: -1px;
  border-right: 2px dashed rgba(251, 246, 238, 0.35);
}
.ticket__stub::before {
  content: '';
  position: absolute;
  inset: -12px -12px auto auto;
  width: 24px;
  height: calc(100% + 24px);
  background:
    radial-gradient(circle at 50% 12px, var(--cream) 11px, transparent 12px) top / 24px 24px no-repeat,
    radial-gradient(circle at 50% 12px, var(--cream) 11px, transparent 12px) bottom / 24px 24px no-repeat;
}
.ticket__month,
.ticket__weekday {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
.ticket__month {
  color: var(--primary-light);
}
.ticket__day {
  font-family: var(--font-display);
  font-size: clamp(3.5rem, 7vw, 5rem);
  line-height: 1;
}
.ticket__weekday {
  color: rgba(251, 246, 238, 0.75);
}

.ticket__body {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: clamp(28px, 4vw, 48px);
  isolation: isolate;
}
/* Oversized italic question mark as a quiet backdrop. */
.ticket__body::before {
  content: '?';
  position: absolute;
  right: clamp(12px, 3vw, 36px);
  top: -0.12em;
  z-index: -1;
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(10rem, 18vw, 15rem);
  line-height: 1;
  color: var(--primary-soft);
  pointer-events: none;
}
.ticket__badge {
  align-self: flex-start;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0.4em 0.9em;
  border-radius: 999px;
  background: var(--primary-soft);
  color: var(--primary-ink);
  font-size: 0.8rem;
  font-weight: 500;
  --bloom-center: var(--primary-soft);
}
.ticket__label {
  margin-top: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-soft);
}
.ticket__theme {
  font-size: clamp(2.25rem, 4.4vw, 3.5rem);
  font-style: italic;
  color: var(--primary-ink);
}
.ticket__blurb {
  color: var(--ink-soft);
  max-width: 44ch;
}
.ticket__blurb a {
  color: var(--primary-ink);
}
.ticket__when {
  font-weight: 500;
}
.ticket__details {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.ticket__details li {
  padding: 0.45em 1em;
  border: 1px solid var(--line);
  border-radius: 999px;
  font-size: 0.875rem;
}
.ticket__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  margin-top: 10px;
}
.ticket__cal {
  font-weight: 500;
  font-size: 0.95rem;
  text-decoration: none;
  color: var(--primary-ink);
}
.ticket__cal span {
  display: inline-block;
  transition: transform 0.3s var(--ease);
}
.ticket__cal:hover span {
  transform: translateX(4px);
}

/* Following nights */
.later__title {
  margin-bottom: 8px;
  font-family: var(--font-body);
}
.later__list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.later__item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
  border-top: 1px solid var(--line);
}
.later__item:last-child {
  border-bottom: 1px solid var(--line);
}
.later__date {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  border-radius: 16px;
  background: var(--oat);
  line-height: 1.1;
  transition: transform 0.5s var(--ease);
}
.later__item:nth-child(2) .later__date {
  background: var(--mist);
}
.later__item:nth-child(3) .later__date {
  background: var(--primary-soft);
}
.later__item:hover .later__date {
  transform: rotate(-4deg) scale(1.04);
}
.later__date span {
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--ink-soft);
}
.later__date strong {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: 1.6rem;
}
.later__theme {
  font-family: var(--font-display);
  font-size: 1.5rem;
  line-height: 1.15;
}
.later__meta {
  font-size: 0.9rem;
  color: var(--ink-soft);
}

@media (max-width: 900px) {
  .trivia__grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 560px) {
  .ticket {
    grid-template-columns: 1fr;
  }
  .ticket__stub {
    flex-direction: row;
    gap: 12px;
    padding: 18px 24px;
  }
  .ticket__day {
    font-size: 2.5rem;
  }
  .ticket__stub::after {
    top: auto;
    left: 18px;
    right: 18px;
    bottom: -1px;
    border-right: 0;
    border-bottom: 2px dashed rgba(251, 246, 238, 0.35);
  }
  .ticket__stub::before {
    display: none;
  }
}
</style>
