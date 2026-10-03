<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { site } from '../data/site'
import { openStatus } from '../utils/hours'

const status = ref(openStatus(site.hours, site.timeZone))
let timer
onMounted(() => {
  timer = setInterval(() => (status.value = openStatus(site.hours, site.timeZone)), 60_000)
})
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <span class="status" :class="{ 'status--open': status.open }">
    <span class="status__dot" aria-hidden="true" />
    {{ status.label }}
  </span>
</template>

<style scoped>
.status {
  display: inline-flex;
  align-items: center;
  gap: 0.55em;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--ink-soft);
}
.status__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--ink-soft);
  opacity: 0.5;
}
.status--open .status__dot {
  background: var(--primary);
  opacity: 1;
  box-shadow: 0 0 0 0 rgba(42, 183, 61, 0.5);
  animation: pulse 2.4s ease-out infinite;
}
@keyframes pulse {
  to {
    box-shadow: 0 0 0 8px rgba(42, 183, 61, 0);
  }
}
</style>
