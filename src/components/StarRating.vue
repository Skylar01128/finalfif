<script setup>
import { useId } from 'vue'

defineProps({
  rating: { type: Number, required: true },
  size: { type: Number, default: 16 },
})
const uid = useId()
const star = 'M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z'
</script>

<template>
  <span class="stars" role="img" :aria-label="`${rating} out of 5 stars`">
    <svg v-for="n in 5" :key="n" :width="size" :height="size" viewBox="0 0 24 24" aria-hidden="true">
      <defs>
        <clipPath :id="`${uid}-${n}`">
          <rect x="0" y="0" :width="24 * Math.min(Math.max(rating - (n - 1), 0), 1)" height="24" />
        </clipPath>
      </defs>
      <path :d="star" class="stars__empty" />
      <path :d="star" class="stars__full" :clip-path="`url(#${uid}-${n})`" />
    </svg>
  </span>
</template>

<style scoped>
.stars {
  display: inline-flex;
  gap: 2px;
}
.stars__empty {
  fill: var(--line);
}
.stars__full {
  fill: var(--primary-ink);
}
</style>
