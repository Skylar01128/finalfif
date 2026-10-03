<script setup>
import { computed } from 'vue'

// Single-weight line illustrations, in the spirit of Monte and Little Amps.
const props = defineProps({ name: { type: String, required: true } }) // cup | laptop | bouquet

const bloomsByName = {
  cup: [{ x: 86, y: 26, r: 7 }],
  laptop: [{ x: 60, y: 57, r: 8 }],
  bouquet: [
    { x: 44, y: 38, r: 9 },
    { x: 66, y: 28, r: 10 },
    { x: 80, y: 48, r: 8 },
  ],
}
const blooms = computed(() => bloomsByName[props.name] ?? [])
const petalAngles = [0, 72, 144, 216, 288]
const rad = (deg) => (deg * Math.PI) / 180
</script>

<template>
  <svg class="lineart" viewBox="0 0 120 120" aria-hidden="true">
    <g v-if="name === 'cup'">
      <path d="M30 56H84V66C84 82 72 92 57 92C42 92 30 82 30 66Z" />
      <path d="M84 61C97 61 97 81 82 81" />
      <path d="M20 97C40 105 74 105 94 97" />
      <path d="M48 46C42 38 54 33 48 24" />
      <path d="M62 46C56 38 68 33 62 24" />
      <path d="M86 33V50M86 42C90 40 93 41 94 44" />
    </g>
    <g v-else-if="name === 'laptop'">
      <path d="M28 36H92A4 4 0 0 1 96 40V78H24V40A4 4 0 0 1 28 36Z" />
      <path d="M12 78H108L102 90H18Z" />
      <path d="M60 65V74M60 70C64 68 67 69 68 72" />
    </g>
    <g v-else-if="name === 'bouquet'">
      <path d="M40 66L60 108L80 66Z" />
      <path d="M44 47L56 66M66 38L62 66M78 56L68 66" />
      <path d="M52 84C58 80 62 80 68 84M60 84L54 94M60 84L66 94" />
      <path d="M30 60C34 54 40 54 42 58C38 62 34 62 30 60Z" />
      <path d="M90 60C86 54 80 54 78 58C82 62 86 62 90 60Z" />
    </g>
    <g v-for="(b, i) in blooms" :key="i" class="lineart__bloom">
      <circle
        v-for="a in petalAngles"
        :key="a"
        :cx="b.x + Math.sin(rad(a)) * b.r * 0.55"
        :cy="b.y - Math.cos(rad(a)) * b.r * 0.55"
        :r="b.r * 0.42"
      />
      <circle :cx="b.x" :cy="b.y" :r="b.r * 0.16" class="lineart__center" />
    </g>
  </svg>
</template>

<style scoped>
.lineart {
  width: 100%;
  height: auto;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.lineart__bloom {
  fill: var(--flour);
}
.lineart__center {
  fill: currentColor;
}
</style>
