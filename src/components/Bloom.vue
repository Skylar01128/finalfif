<script setup>
// Small five-petal flower used as a bullet, divider and marker.
defineProps({ size: { type: Number, default: 16 } })
const petals = [0, 72, 144, 216, 288]
</script>

<template>
  <svg class="bloom" :width="size" :height="size" viewBox="0 0 24 24" aria-hidden="true">
    <circle
      v-for="a in petals"
      :key="a"
      :cx="12 + Math.sin((a * Math.PI) / 180) * 5.5"
      :cy="12 - Math.cos((a * Math.PI) / 180) * 5.5"
      r="4.6"
      fill="currentColor"
      opacity="0.85"
    />
    <circle cx="12" cy="12" r="2.6" fill="var(--bloom-center, var(--cream))" />
  </svg>
</template>

<style scoped>
.bloom {
  display: inline-block;
  flex-shrink: 0;
  vertical-align: middle;
}
</style>
