<script>
// Decorative shapes for trivia themes. Add a night's `motif` in site.js using
// one of these names; anything else falls back to the default question mark.
export const MOTIFS = ['bolt', 'snowflake', 'mug', 'record', 'pumpkin']
</script>

<script setup>
defineProps({ name: { type: String, required: true } })
</script>

<template>
  <svg
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    stroke-width="5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <!-- Lightning bolt -->
    <path v-if="name === 'bolt'" d="M60 6 20 56h28l-10 38 44-52H54L64 6Z" fill="currentColor" />

    <!-- Snowflake: three crossing arms with a pair of branches near each tip -->
    <g v-else-if="name === 'snowflake'">
      <g v-for="a in [0, 60, 120]" :key="a" :transform="`rotate(${a} 50 50)`">
        <path d="M50 6v88" />
        <path d="M38 14l12 12 12-12M38 86l12-12 12 12" />
        <path d="M42 32l8 8 8-8M42 68l8-8 8 8" />
      </g>
    </g>

    <!-- Coffee mug with steam -->
    <g v-else-if="name === 'mug'">
      <path d="M18 44h50v26a18 18 0 0 1-18 18H36a18 18 0 0 1-18-18Z" fill="currentColor" />
      <path d="M68 50h6a10 10 0 0 1 0 20h-6" />
      <path d="M32 34c-4-5 4-9 0-16M44 34c-4-5 4-9 0-16M56 34c-4-5 4-9 0-16" />
    </g>

    <!-- Vinyl record -->
    <g v-else-if="name === 'record'">
      <circle cx="50" cy="50" r="44" fill="currentColor" />
      <circle cx="50" cy="50" r="34" stroke="var(--flour)" stroke-width="1.5" opacity="0.7" />
      <circle cx="50" cy="50" r="26" stroke="var(--flour)" stroke-width="1.5" opacity="0.7" />
      <circle cx="50" cy="50" r="12" stroke="var(--flour)" stroke-width="3" />
      <circle cx="50" cy="50" r="2.5" fill="var(--flour)" stroke="none" />
    </g>

    <!-- Pumpkin -->
    <g v-else-if="name === 'pumpkin'">
      <path
        d="M50 30c-10-6-30-4-36 16s4 40 20 40c6 0 10-2 16-2s10 2 16 2c16 0 26-20 20-40S60 24 50 30Z"
        fill="currentColor"
      />
      <path d="M50 30c-2-8 0-16 6-20" />
    </g>
  </svg>
</template>
