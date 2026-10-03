<script setup>
import PhotoFrame from './PhotoFrame.vue'
import CurvedText from './CurvedText.vue'
import OpenStatus from './OpenStatus.vue'

// Falling petals: fixed presets (not random) so the render is stable.
const petals = [
  { left: 6, size: 14, dur: 14, delay: -2, drift: 60, color: 'var(--primary)' },
  { left: 18, size: 10, dur: 18, delay: -9, drift: -40, color: 'var(--primary-light)' },
  { left: 33, size: 12, dur: 16, delay: -5, drift: 80, color: 'var(--primary)' },
  { left: 47, size: 9, dur: 20, delay: -13, drift: -60, color: 'var(--petal)' },
  { left: 58, size: 13, dur: 15, delay: -1, drift: 50, color: 'var(--petal)' },
  { left: 71, size: 11, dur: 19, delay: -7, drift: -70, color: 'var(--primary)' },
  { left: 84, size: 15, dur: 17, delay: -11, drift: 40, color: 'var(--primary-light)' },
  { left: 94, size: 9, dur: 21, delay: -4, drift: -50, color: 'var(--primary)' },
]
</script>

<template>
  <section id="top" class="hero">
    <div class="petals" aria-hidden="true">
      <span
        v-for="(p, i) in petals"
        :key="i"
        class="petal"
        :style="{
          left: `${p.left}%`,
          '--s': `${p.size}px`,
          '--d': `${p.dur}s`,
          '--delay': `${p.delay}s`,
          '--x': `${p.drift}px`,
          '--c': p.color,
        }"
      />
    </div>

    <div class="container hero__grid">
      <div class="hero__copy">
        <p v-reveal class="eyebrow">Coffee · Pastries · Petals</p>
        <h1 v-reveal="100" class="hero__title">Coffee in <em>full bloom.</em></h1>
        <p v-reveal="200" class="hero__lede lede">
          A flower-filled neighborhood café for slow mornings, focused afternoons, and the
          celebrations worth remembering.
        </p>
        <div v-reveal="300" class="hero__actions">
          <a href="#menu" class="btn btn--solid">See the menu</a>
          <a href="#events" class="btn btn--ghost">Host an event</a>
        </div>
        <div v-reveal="400" class="hero__status"><OpenStatus /></div>
      </div>

      <div v-reveal="150" class="hero__media">
        <PhotoFrame
          src="/images/hero.jpg"
          alt="A latte on a marble table surrounded by fresh flowers"
          shape="arch"
          tone="green"
          eager
        />
        <div class="hero__badge">
          <CurvedText mode="circle" text="fresh flowers ✿ fresh pastries ✿ fresh coffee ✿" />
          <span class="hero__badge-mark" aria-hidden="true">✿</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  padding-block: clamp(32px, 6vw, 88px) clamp(64px, 9vw, 128px);
  margin-top: calc(var(--nav-h) * -1);
  padding-top: calc(var(--nav-h) + clamp(24px, 5vw, 72px));
}
.hero__grid {
  position: relative;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  align-items: center;
  gap: clamp(40px, 6vw, 96px);
}
.hero__copy {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.hero__title {
  font-size: clamp(3.25rem, 8.5vw, 7.25rem);
  font-weight: 350;
  line-height: 0.98;
}
.hero__lede {
  font-size: 1.15rem;
}
.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
}
.hero__media {
  position: relative;
  max-width: 460px;
  width: 100%;
  justify-self: end;
}
.hero__badge {
  position: absolute;
  left: -48px;
  bottom: 40px;
  width: 132px;
  height: 132px;
  border-radius: 50%;
  background: var(--primary);
  color: var(--ink);
  display: grid;
  place-items: center;
  box-shadow: 0 12px 30px -12px rgba(53, 60, 64, 0.25);
}
.hero__badge :deep(svg) {
  position: absolute;
  inset: 8px;
  width: calc(100% - 16px);
  height: calc(100% - 16px);
  animation: spin 24s linear infinite;
}
.hero__badge-mark {
  font-size: 1.6rem;
  color: var(--flour);
}

.petals {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.petal {
  position: absolute;
  top: -30px;
  width: var(--s);
  height: calc(var(--s) * 0.72);
  background: var(--c);
  border-radius: 80% 0 80% 0;
  opacity: 0.75;
  animation: fall var(--d) linear var(--delay) infinite;
}

@keyframes fall {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }
  25% {
    transform: translate(var(--x), 30vh) rotate(140deg);
  }
  50% {
    transform: translate(0, 60vh) rotate(270deg);
  }
  75% {
    transform: translate(var(--x), 90vh) rotate(400deg);
  }
  100% {
    transform: translate(0, 120vh) rotate(540deg);
  }
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 860px) {
  .hero__grid {
    grid-template-columns: 1fr;
  }
  .hero__media {
    justify-self: center;
    max-width: 380px;
  }
  .hero__badge {
    left: -12px;
    bottom: 24px;
    width: 108px;
    height: 108px;
  }
}
@media (prefers-reduced-motion: reduce) {
  .petals {
    display: none;
  }
}
</style>
