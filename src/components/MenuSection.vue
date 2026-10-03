<script setup>
import { menu } from '../data/site'
import Bloom from './Bloom.vue'
</script>

<template>
  <section id="menu" class="menu section">
    <div class="container">
      <header class="menu__head">
        <div>
          <p v-reveal class="eyebrow">The menu</p>
          <h2 v-reveal="100" class="h-section">Baked at dawn, <em>brewed to order.</em></h2>
        </div>
        <p v-reveal="200" class="menu__note">
          <Bloom :size="14" class="menu__note-bloom" /> Signature item · Floral syrups made in-house · Oat, almond &amp; whole milk available
        </p>
      </header>

      <div class="menu__grid">
        <div v-for="(group, i) in menu" :key="group.title" v-reveal="i * 120" class="menu__col">
          <h3 class="menu__group">{{ group.title }}</h3>
          <ul class="menu__list">
            <li v-for="item in group.items" :key="item.name" class="menu__item">
              <div class="menu__row">
                <span class="menu__name">
                  {{ item.name }}
                  <Bloom v-if="item.signature" :size="13" class="menu__sig" />
                  <span v-if="item.signature" class="sr-only">(signature)</span>
                </span>
                <span class="menu__leader" aria-hidden="true" />
                <span class="menu__price">{{ item.price }}</span>
              </div>
              <p v-if="item.desc" class="menu__desc">{{ item.desc }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.menu {
  background: var(--flour);
  border-block: 1px solid var(--line);
}
.menu__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 32px;
  flex-wrap: wrap;
  margin-bottom: clamp(48px, 6vw, 80px);
}
.menu__head > div {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.menu__note {
  font-size: 0.875rem;
  color: var(--ink-soft);
  max-width: 44ch;
}
.menu__note-bloom,
.menu__sig {
  color: var(--primary);
  --bloom-center: var(--primary-ink);
}
.menu__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: clamp(32px, 5vw, 72px);
}
.menu__group {
  font-size: 1.5rem;
  font-style: italic;
  color: var(--primary-ink);
  padding-bottom: 14px;
  margin-bottom: 8px;
  border-bottom: 1px solid var(--ink);
}
.menu__list {
  list-style: none;
  padding: 0;
}
.menu__item {
  padding-block: 12px;
}
.menu__row {
  display: flex;
  align-items: baseline;
  gap: 8px;
}
.menu__name {
  font-weight: 500;
}
.menu__leader {
  flex: 1;
  min-width: 16px;
  border-bottom: 1.5px dotted rgba(53, 60, 64, 0.3);
  transform: translateY(-4px);
}
.menu__price {
  font-variant-numeric: tabular-nums;
}
.menu__desc {
  font-size: 0.875rem;
  color: var(--ink-soft);
  margin-top: 2px;
}

@media (max-width: 900px) {
  .menu__grid {
    grid-template-columns: 1fr;
  }
}
</style>
