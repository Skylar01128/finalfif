<script setup>
import { ref, computed } from 'vue'
import { events, site } from '../data/site'
import PhotoFrame from './PhotoFrame.vue'
import Bloom from './Bloom.vue'

// Monte-style stacked cards: the active card sits on top, the rest fan out behind.
const current = ref(0)
const count = events.slides.length
const go = (step) => (current.value = (current.value + step + count) % count)
const position = (i) => (i - current.value + count) % count
const caption = computed(() => events.slides[current.value].caption)

const cardStyle = (i) => {
  const p = position(i)
  return {
    zIndex: count - p,
    transform: `translate(${p * 22}px, ${p * -14}px) rotate(${p * 4}deg) scale(${1 - p * 0.05})`,
    opacity: p > 2 ? 0 : 1,
  }
}

const mailto = `mailto:${site.eventsEmail}?subject=${encodeURIComponent('Event inquiry — Flower In Flour')}`
</script>

<template>
  <section id="events" class="events section">
    <div class="container events__grid">
      <div v-reveal class="events__carousel">
        <div class="events__stack" role="group" aria-roledescription="carousel" aria-label="Past events">
          <div
            v-for="(s, i) in events.slides"
            :key="s.caption"
            class="events__card"
            :style="cardStyle(i)"
            :aria-hidden="position(i) !== 0"
          >
            <PhotoFrame :src="s.src" :alt="s.caption" :tone="s.tone" />
          </div>
        </div>
        <div class="events__controls">
          <button class="events__arrow" aria-label="Previous photo" @click="go(-1)">←</button>
          <p class="events__caption" aria-live="polite">{{ caption }}</p>
          <button class="events__arrow" aria-label="Next photo" @click="go(1)">→</button>
        </div>
      </div>

      <div class="events__copy">
        <p v-reveal class="eyebrow events__eyebrow">Host with us</p>
        <h2 v-reveal="100" class="h-section">Celebrate <em>among the blooms.</em></h2>
        <p v-reveal="150" class="events__lede">
          From intimate showers to your next birthday bash, we'll dress the room in seasonal florals and
          build a pastry and coffee bar around your day.
        </p>

        <ul v-reveal="200" class="events__types" aria-label="Event types">
          <li v-for="t in events.types" :key="t">{{ t }}</li>
        </ul>

        <ul v-reveal="250" class="events__details">
          <li v-for="d in events.details" :key="d"><Bloom :size="16" /> {{ d }}</li>
        </ul>

        <div v-reveal="300" class="events__actions">
          <a :href="mailto" class="btn btn--light">Start an inquiry</a>
          <a :href="`tel:${site.phone.replace(/[^\d+]/g, '')}`" class="events__call">or call {{ site.phone }}</a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.events {
  background: var(--ink);
  color: var(--cream);
  --bloom-center: var(--ink);
}
.events__grid {
  display: grid;
  grid-template-columns: 0.9fr 1fr;
  gap: clamp(48px, 8vw, 120px);
  align-items: center;
}
.events__carousel {
  max-width: 440px;
  width: 100%;
}
.events__stack {
  display: grid;
  padding: 24px 48px 0 0;
}
.events__card {
  grid-area: 1 / 1;
  transform-origin: bottom left;
  transition:
    transform 0.7s var(--ease),
    opacity 0.7s var(--ease);
  box-shadow: 0 20px 40px -20px rgba(0, 0, 0, 0.5);
  border-radius: var(--radius);
}
.events__controls {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 28px;
}
.events__arrow {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 50%;
  border: 1.5px solid rgba(251, 246, 238, 0.5);
  background: transparent;
  color: var(--cream);
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s var(--ease), color 0.3s var(--ease);
}
.events__arrow:hover {
  background: var(--cream);
  color: var(--ink);
}
.events__caption {
  flex: 1;
  text-align: center;
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.1rem;
}
.events__copy {
  display: flex;
  flex-direction: column;
  gap: 22px;
}
.events__eyebrow {
  color: var(--primary-light);
}
.events :deep(.h-section em) {
  color: var(--primary);
}
.events__lede {
  color: rgba(251, 246, 238, 0.78);
  max-width: 46ch;
}
.events__types {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.events__types li {
  padding: 0.45em 1em;
  border: 1px solid rgba(251, 246, 238, 0.35);
  border-radius: 999px;
  font-size: 0.875rem;
}
.events__details {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.events__details li {
  display: flex;
  align-items: center;
  gap: 12px;
}
.events__details :deep(.bloom) {
  color: var(--primary);
}
.events__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  margin-top: 8px;
}
.events__call {
  font-size: 0.95rem;
  color: rgba(251, 246, 238, 0.8);
}

@media (max-width: 900px) {
  .events__grid {
    grid-template-columns: 1fr;
  }
  .events__carousel {
    max-width: 380px;
    justify-self: center;
  }
  .events__copy {
    order: -1;
  }
}
</style>
