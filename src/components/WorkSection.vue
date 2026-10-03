<script setup>
import PhotoFrame from './PhotoFrame.vue'

const amenities = [
  { icon: 'wifi', title: 'Fast, free Wi-Fi', text: 'Strong enough for video calls, no time limit.' },
  { icon: 'plug', title: 'Outlets at every window seat', text: 'Plus outlets in the backroom and lobby.' },
  { icon: 'clock', title: 'Quiet hours, 7–10am weekdays', text: 'Soft music, low chatter, focus-friendly.' },
  { icon: 'sparkle', title: 'Clean Restrooms', text: 'We take pride in provideing spotless restrooms for our guests.' },
  // { icon: 'cup', title: 'Bottomless drip on laptop days', text: '$5 all day — just ask at the counter.' },
]

const icons = {
  wifi: 'M4 9.5a12 12 0 0 1 16 0M7 13a7.5 7.5 0 0 1 10 0M10 16.5a3 3 0 0 1 4 0M12 19.5h.01',
  plug: 'M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0zM12 17v4',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2',
  cup: 'M5 9h12v5a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5zM17 10h1.5a2.5 2.5 0 0 1 0 5H17M9 3v2M13 3v2',
  sparkle: 'M10 4c.6 4.4 2.6 6.4 7 7-4.4.6-6.4 2.6-7 7-.6-4.4-2.6-6.4-7-7 4.4-.6 6.4-2.6 7-7zM18 2.5c.3 1.6.9 2.2 2.5 2.5-1.6.3-2.2.9-2.5 2.5-.3-1.6-.9-2.2-2.5-2.5 1.6-.3 2.2-.9 2.5-2.5z',
}
</script>

<template>
  <section id="work" class="work section">
    <div class="container work__grid">
      <div v-reveal class="work__media">
        <PhotoFrame
          src="/images/work.jpg"
          alt="A sunny window seat with a laptop, a cappuccino and a bud vase of ranunculus"
          tone="mist"
        />
      </div>

      <div class="work__copy">
        <p v-reveal class="eyebrow">Work from here</p>
        <h2 v-reveal="100" class="h-section">A desk with <em>a view of the peonies.</em></h2>
        <p v-reveal="150" class="lede">
          Trade the kitchen table for natural light, good coffee and a little greenery. Stay as
          long as you like.
        </p>

        <ul class="amenities">
          <li v-for="(a, i) in amenities" :key="a.title" v-reveal="200 + i * 80" class="amenity">
            <span class="amenity__icon">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path :d="icons[a.icon]" /></svg>
            </span>
            <div>
              <p class="amenity__title">{{ a.title }}</p>
              <p class="amenity__text">{{ a.text }}</p>
            </div>
          </li>
        </ul>

        <!-- <p v-reveal="500" class="work__fine">On busy weekends we ask laptops to share the big tables. Thank you!</p> -->
      </div>
    </div>
  </section>
</template>

<style scoped>
.work {
  background: var(--primary-soft);
}
.work__grid {
  display: grid;
  grid-template-columns: 0.85fr 1fr;
  gap: clamp(40px, 7vw, 112px);
  align-items: center;
}
.work__media {
  max-width: 480px;
}
.work__copy {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.amenities {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px 32px;
  margin-top: 16px;
}
.amenity {
  display: flex;
  gap: 14px;
}
.amenity__icon {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--cream);
  color: var(--primary-ink);
  display: grid;
  place-items: center;
}
.amenity__icon svg {
  width: 22px;
  height: 22px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.7;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.amenity__title {
  font-weight: 500;
  line-height: 1.35;
}
.amenity__text {
  font-size: 0.9rem;
  color: var(--ink-soft);
  margin-top: 4px;
}
.work__fine {
  font-size: 0.85rem;
  color: var(--ink-soft);
  font-style: italic;
  margin-top: 8px;
}

@media (max-width: 900px) {
  .work__grid {
    grid-template-columns: 1fr;
  }
  .work__media {
    max-width: 420px;
  }
}
@media (max-width: 540px) {
  .amenities {
    grid-template-columns: 1fr;
  }
}
</style>
