<script setup>
import { site } from '../data/site'
import { formatTime } from '../utils/hours'
import OpenStatus from './OpenStatus.vue'

const query = encodeURIComponent(site.mapQuery)
// Keyless Google Maps embed: fully interactive (pan, zoom, street view link).
// To switch to the official Maps Embed API later, use
// https://www.google.com/maps/embed/v1/place?key=YOUR_KEY&q=... instead.
const mapSrc = `https://maps.google.com/maps?q=${query}&z=16&output=embed`
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${query}`
const tel = `tel:${site.phone.replace(/[^\d+]/g, '')}`
</script>

<template>
  <section id="visit" class="visit section">
    <div class="container visit__grid">
      <div v-reveal class="visit__map">
        <iframe
          :src="mapSrc"
          :title="`Map showing ${site.name} at ${site.address.line1}`"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          allowfullscreen
        />
      </div>

      <div class="visit__info">
        <p v-reveal class="eyebrow">Visit us</p>
        <h2 v-reveal="100" class="h-section">Find your way <em>to the flowers.</em></h2>

        <address v-reveal="150" class="visit__address">
          {{ site.address.line1 }}<br />{{ site.address.line2 }}
        </address>

        <div v-reveal="200"><OpenStatus /></div>

        <dl v-reveal="250" class="visit__hours">
          <div v-for="h in site.hours" :key="h.label" class="visit__row">
            <dt>{{ h.label }}</dt>
            <dd>{{ h.note ?? `${formatTime(h.open)} – ${formatTime(h.close)}` }}</dd>
          </div>
        </dl>

        <div v-reveal="300" class="visit__actions">
          <a :href="directionsUrl" target="_blank" rel="noopener" class="btn btn--solid">Get directions</a>
          <a :href="tel" class="btn btn--ghost">Call {{ site.phone }}</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.visit__grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: clamp(40px, 6vw, 96px);
  align-items: center;
}
.visit__map {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  aspect-ratio: 5 / 4;
  min-height: 340px;
  background: var(--oat);
  border: 1px solid var(--line);
  box-shadow: 0 30px 60px -40px rgba(53, 60, 64, 0.5);
}
.visit__map iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  /* Nudge Google's default palette toward the site's warm tones */
  filter: sepia(0.18) saturate(0.9);
}
.visit__info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.visit__address {
  font-style: normal;
  font-family: var(--font-display);
  font-size: 1.5rem;
  line-height: 1.35;
}
.visit__hours {
  margin: 0;
  border-top: 1px solid var(--line);
}
.visit__row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding-block: 12px;
  border-bottom: 1px solid var(--line);
}
.visit__row dt {
  font-weight: 500;
}
.visit__row dd {
  margin: 0;
  color: var(--ink-soft);
  font-variant-numeric: tabular-nums;
}
.visit__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 4px;
}

@media (max-width: 900px) {
  .visit__grid {
    grid-template-columns: 1fr;
  }
  .visit__map {
    aspect-ratio: 4 / 3;
    min-height: 300px;
  }
}
</style>
