<script setup>
import { ref } from 'vue'

// Shows a photo from /public/images. If the file isn't there yet (or fails),
// falls back to a soft floral illustration in the chosen tone so layouts
// never look broken while real photography is being shot.
const props = defineProps({
  src: { type: String, default: '' },
  alt: { type: String, default: '' },
  tone: { type: String, default: 'green' }, // green | mist | oat | petal
  shape: { type: String, default: 'rounded' }, // rounded | arch
  eager: { type: Boolean, default: false },
})

const failed = ref(!props.src)

// A loose cluster of blooms for the placeholder.
const blooms = [
  { x: 28, y: 30, r: 13 },
  { x: 72, y: 22, r: 9 },
  { x: 64, y: 66, r: 16 },
  { x: 22, y: 78, r: 8 },
  { x: 86, y: 88, r: 7 },
]
const petalAngles = [0, 72, 144, 216, 288]
const rad = (deg) => (deg * Math.PI) / 180
</script>

<template>
  <div class="photo" :class="[`photo--${tone}`, `photo--${shape}`]">
    <img
      v-if="!failed"
      :src="src"
      :alt="alt"
      :loading="eager ? 'eager' : 'lazy'"
      decoding="async"
      @error="failed = true"
    />
    <div v-else class="photo__fallback" role="img" :aria-label="alt">
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g v-for="(b, i) in blooms" :key="i" class="photo__bloom" :style="{ '--i': i }">
          <circle
            v-for="a in petalAngles"
            :key="a"
            :cx="b.x + Math.sin(rad(a)) * b.r * 0.55"
            :cy="b.y - Math.cos(rad(a)) * b.r * 0.55"
            :r="b.r * 0.48"
          />
          <circle :cx="b.x" :cy="b.y" :r="b.r * 0.22" class="photo__center" />
        </g>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.photo {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius);
  aspect-ratio: 4 / 5;
  background: var(--tone-bg);
}

.photo--arch {
  border-radius: 999px 999px var(--radius) var(--radius);
}

.photo--green {
  --tone-bg: linear-gradient(160deg, #e6f5e8, #8fd89a);
  --tone-bloom: rgba(255, 253, 249, 0.6);
  --tone-center: var(--primary);
}
.photo--mist {
  --tone-bg: linear-gradient(160deg, #eef0f0, #c5cdcf);
  --tone-bloom: rgba(255, 253, 249, 0.6);
  --tone-center: var(--ink-soft);
}
.photo--petal {
  --tone-bg: linear-gradient(160deg, #fbecea, #f2c4c4);
  --tone-bloom: rgba(255, 253, 249, 0.6);
  --tone-center: var(--primary);
}
.photo--oat {
  --tone-bg: linear-gradient(160deg, #f7efe4, #e3cfb6);
  --tone-bloom: rgba(255, 253, 249, 0.6);
  --tone-center: var(--primary-ink);
}

.photo img,
.photo__fallback {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo__fallback svg {
  width: 100%;
  height: 100%;
}

.photo__bloom {
  fill: var(--tone-bloom);
  transform-origin: center;
  transform-box: fill-box;
  animation: sway 9s ease-in-out calc(var(--i) * -1.7s) infinite alternate;
}

.photo__center {
  fill: var(--tone-center);
}

@keyframes sway {
  from {
    transform: rotate(-6deg);
  }
  to {
    transform: rotate(6deg);
  }
}
</style>
