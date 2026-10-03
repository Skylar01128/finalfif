<script setup>
import { computed } from 'vue'
import { reviews, site } from '../data/site'
import StarRating from './StarRating.vue'

const average = computed(() => {
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
  return Math.round(avg * 10) / 10
})
const hasSamples = reviews.some((r) => r.sample)
const googleUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`
</script>

<template>
  <section id="reviews" class="reviews section">
    <div class="container">
      <header class="reviews__head">
        <div class="reviews__title">
          <p v-reveal class="eyebrow">Kind words</p>
          <h2 v-reveal="100" class="h-section">Notes from <em>our regulars.</em></h2>
        </div>
        <div v-reveal="200" class="reviews__summary">
          <p class="reviews__score">4.6</p>
          <div>
            <StarRating :rating="average" :size="20" />
            <a :href="googleUrl" target="_blank" rel="noopener" class="reviews__more">
              Read more on Google <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </header>

      <p v-if="hasSamples" class="reviews__sample" role="note">
        Sample reviews — replace with real ones in <code>src/data/site.js</code> before launch.
      </p>

      <ul class="reviews__list">
        <li v-for="(r, i) in reviews" :key="r.name" v-reveal="(i % 3) * 120" class="review">
          <StarRating :rating="r.rating" />
          <blockquote class="review__text">“{{ r.text }}”</blockquote>
          <p class="review__by">
            <span class="review__avatar" aria-hidden="true">{{ r.name.charAt(0) }}</span>
            <span>
              <span class="review__name">{{ r.name }}</span>
              <span class="review__context">{{ r.context }}</span>
            </span>
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.reviews__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 32px;
  margin-bottom: clamp(40px, 5vw, 64px);
}
.reviews__title {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.reviews__summary {
  display: flex;
  align-items: center;
  gap: 16px;
}
.reviews__score {
  font-family: var(--font-display);
  font-size: 4rem;
  line-height: 1;
  font-weight: 350;
}
.reviews__more {
  display: block;
  margin-top: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--primary-ink);
  text-decoration: none;
}
.reviews__more:hover {
  text-decoration: underline;
}
.reviews__sample {
  margin-bottom: 24px;
  padding: 10px 16px;
  border: 1px dashed var(--primary-ink);
  border-radius: 12px;
  font-size: 0.875rem;
  color: var(--primary-ink);
  background: var(--flour);
}
.reviews__list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.review {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 28px;
  border-radius: var(--radius);
  background: var(--flour);
  border: 1px solid var(--line);
  transition: transform 0.45s var(--ease), box-shadow 0.45s var(--ease);
}
.review:nth-child(3n + 2) {
  background: var(--primary-soft);
  border-color: transparent;
}
.review:nth-child(3n) {
  background: var(--mist);
  border-color: transparent;
}
.review:hover {
  transform: translateY(-4px) rotate(-0.6deg);
  box-shadow: 0 18px 36px -24px rgba(53, 60, 64, 0.45);
}
.review__text {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.2rem;
  line-height: 1.4;
  flex: 1;
}
.review__by {
  display: flex;
  align-items: center;
  gap: 12px;
}
.review__avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--ink);
  color: var(--cream);
  font-family: var(--font-display);
  font-size: 1.1rem;
}
.review__name {
  display: block;
  font-weight: 500;
  line-height: 1.3;
}
.review__context {
  display: block;
  font-size: 0.85rem;
  color: var(--ink-soft);
}

@media (max-width: 960px) {
  /* Swipeable row on smaller screens */
  .reviews__list {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    margin-inline: calc(var(--gutter) * -1);
    padding: 4px var(--gutter) 16px;
    scroll-padding-inline: var(--gutter);
    scrollbar-width: none;
  }
  .reviews__list::-webkit-scrollbar {
    display: none;
  }
  .review {
    flex: 0 0 min(320px, 82vw);
    scroll-snap-align: start;
  }
}
</style>
