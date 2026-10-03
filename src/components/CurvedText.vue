<script setup>
import { useId } from 'vue'

// Text set on an arc (like Monte's "Hello & Good Morning") or around a circle
// (for the rotating hero badge).
defineProps({
  text: { type: String, required: true },
  mode: { type: String, default: 'arc' }, // arc | circle
})
const id = useId()
</script>

<template>
  <svg v-if="mode === 'arc'" class="curved curved--arc" viewBox="0 0 300 70" role="img" :aria-label="text">
    <path :id="id" d="M20 64 Q150 -6 280 64" fill="none" />
    <text>
      <textPath :href="`#${id}`" startOffset="50%" text-anchor="middle">{{ text }}</textPath>
    </text>
  </svg>
  <svg v-else class="curved curved--circle" viewBox="0 0 200 200" aria-hidden="true">
    <path :id="id" d="M100,100 m-76,0 a76,76 0 1,1 152,0 a76,76 0 1,1 -152,0" fill="none" />
    <text>
      <textPath :href="`#${id}`" textLength="474" lengthAdjust="spacing">{{ text }}</textPath>
    </text>
  </svg>
</template>

<style scoped>
.curved {
  display: block;
  overflow: visible;
  fill: currentColor;
}
.curved text {
  font-family: var(--font-body);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.16em;
}
.curved--arc {
  width: min(280px, 80vw);
}
.curved--arc text {
  font-size: 17px;
}
.curved--circle text {
  font-size: 15px;
}
</style>
