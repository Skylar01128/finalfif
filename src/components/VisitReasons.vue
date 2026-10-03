<script setup>
import LineArt from './LineArt.vue'

const reasons = [
  {
    art: 'cup',
    title: 'Sip',
    text: 'Floral lattes with house-made syrups, single-origin drip, and pastries baked every morning.',
    href: '#menu',
    cta: 'See the menu',
  },
  {
    art: 'laptop',
    title: 'Work',
    text: 'Fast Wi-Fi, outlets at the window seats, and quiet weekday mornings made for deep focus.',
    href: '#work',
    cta: 'Work from here',
  },
  {
    art: 'bouquet',
    title: 'Celebrate',
    text: 'Showers, birthdays and workshops, dressed in seasonal florals.',
    href: '#events',
    cta: 'Plan an event',
  },
]
</script>

<template>
  <section class="reasons section">
    <div class="container">
      <header class="reasons__head">
        <p v-reveal class="eyebrow">Three ways to spend the day</p>
        <h2 v-reveal="100" class="h-section">Come for the coffee. <em>Stay for the flowers.</em></h2>
      </header>

      <ul class="reasons__grid">
        <li v-for="(r, i) in reasons" :key="r.title" v-reveal="i * 120" class="reason">
          <div class="reason__art"><LineArt :name="r.art" /></div>
          <h3 class="reason__title">{{ r.title }}</h3>
          <p class="reason__text">{{ r.text }}</p>
          <a :href="r.href" class="reason__link">{{ r.cta }} <span aria-hidden="true">→</span></a>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.reasons {
  padding-top: 0;
}
.reasons__head {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 760px;
  margin-bottom: clamp(48px, 6vw, 80px);
}
.reasons__grid {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid var(--line);
}
.reason {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 36px clamp(20px, 3vw, 40px) 8px;
}
.reason + .reason {
  border-left: 1px solid var(--line);
}
.reason__art {
  width: 132px;
  aspect-ratio: 1;
  padding: 10px;
  border-radius: var(--radius);
  background: var(--primary-soft);
  color: var(--primary-ink);
  margin-bottom: 8px;
  transition: transform 0.5s var(--ease);
}
.reason:nth-child(2) .reason__art {
  background: var(--mist);
  color: var(--ink);
}
.reason:nth-child(3) .reason__art {
  background: var(--oat);
  color: var(--ink);
}
.reason:hover .reason__art {
  transform: rotate(-4deg) scale(1.04);
}
.reason__title {
  font-size: 2rem;
}
.reason__text {
  color: var(--ink-soft);
}
.reason__link {
  margin-top: auto;
  padding-top: 8px;
  font-weight: 500;
  font-size: 0.95rem;
  text-decoration: none;
  color: var(--primary-ink);
}
.reason__link span {
  display: inline-block;
  transition: transform 0.3s var(--ease);
}
.reason__link:hover span {
  transform: translateX(4px);
}

@media (max-width: 820px) {
  .reasons__grid {
    grid-template-columns: 1fr;
  }
  .reason {
    padding-inline: 0;
    padding-bottom: 36px;
  }
  .reason + .reason {
    border-left: 0;
    border-top: 1px solid var(--line);
  }
  .reason__art,
  .reason__title {
    align-self: center;
  }
}
</style>
