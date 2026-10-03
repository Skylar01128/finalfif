<script setup>
import CurvedText from './CurvedText.vue'
</script>

<template>
  <section class="statement section">
    <div class="container statement__inner">
      <div v-reveal class="statement__arc"><CurvedText text="hello & good morning" /></div>
      <p v-reveal="100" class="statement__text">
        Flower In Flour is for lingering over a latte, finishing the chapter, finishing the
        deck, and <em>celebrating the little things</em> — surrounded by fresh blooms and
        the smell of something in the oven.
      </p>
      <a v-reveal="200" href="#visit" class="btn btn--ghost">Come say hello</a>
    </div>
  </section>
</template>

<style scoped>
.statement__inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 32px;
}
.statement__arc {
  color: var(--primary-ink);
  margin-bottom: -12px;
}
.statement__text {
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 3.4vw, 2.6rem);
  line-height: 1.25;
  max-width: 28ch;
  font-weight: 350;
}
.statement__text em {
  color: var(--primary-ink);
}
</style>
