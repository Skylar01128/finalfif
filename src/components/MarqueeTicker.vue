<script setup>
import Bloom from './Bloom.vue'

const words = ['Family Owned', 'Fresh pastries', 'Fresh coffee', 'Slow mornings', 'Good company']
</script>

<template>
  <div class="marquee">
    <p class="sr-only">{{ words.join(', ') }}</p>
    <div class="marquee__track" aria-hidden="true">
      <template v-for="copy in 2" :key="copy">
        <span v-for="w in words" :key="`${copy}-${w}`" class="marquee__item">
          {{ w }} <Bloom :size="18" />
        </span>
      </template>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  overflow: hidden;
  background: var(--primary);
  color: var(--ink);
  --bloom-center: var(--primary);
  padding-block: 18px;
}
.marquee__track {
  display: flex;
  width: max-content;
  animation: scroll 42s linear infinite;
}
.marquee:hover .marquee__track {
  animation-play-state: paused;
}
.marquee__item {
  display: inline-flex;
  align-items: center;
  gap: 28px;
  padding-right: 28px;
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(1.5rem, 2.6vw, 1.875rem);
  white-space: nowrap;
}
@keyframes scroll {
  to {
    transform: translateX(-50%);
  }
}
</style>
