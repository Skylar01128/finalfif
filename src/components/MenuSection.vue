<script setup>
import { ref, computed, nextTick } from 'vue'
import { menu } from '../data/site'
import Bloom from './Bloom.vue'

// Monte/Corgi-style editorial menu: category tabs over columns of dotted
// price rows, with S · M · L columns lined up under a small size header.
const active = ref(0)
const tab = computed(() => menu.tabs[active.value])
const tabEls = ref([])

// Roving focus for the tablist: arrows, Home and End move between tabs.
const onKey = async (e) => {
  const last = menu.tabs.length - 1
  const next = { ArrowRight: active.value + 1, ArrowLeft: active.value - 1, Home: 0, End: last }[e.key]
  if (next === undefined) return
  e.preventDefault()
  active.value = (next + last + 1) % (last + 1)
  await nextTick()
  tabEls.value[active.value]?.focus()
}
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
          <Bloom :size="14" class="menu__note-bloom" /> House favorite · {{ menu.sizeNote }}
        </p>
      </header>

      <div v-reveal="250" class="menu__tabs" role="tablist" aria-label="Menu categories" @keydown="onKey">
        <button
          v-for="(t, i) in menu.tabs"
          :id="`menu-tab-${t.id}`"
          :key="t.id"
          ref="tabEls"
          class="menu__tab"
          role="tab"
          :aria-selected="i === active"
          :aria-controls="`menu-panel-${t.id}`"
          :tabindex="i === active ? 0 : -1"
          @click="active = i"
        >
          {{ t.label }}
        </button>
      </div>

      <div
        :id="`menu-panel-${tab.id}`"
        :key="tab.id"
        class="menu__grid"
        role="tabpanel"
        :aria-labelledby="`menu-tab-${tab.id}`"
        tabindex="0"
      >
        <div v-for="(group, i) in tab.groups" :key="group.title" v-reveal="i * 120" class="menu__col">
          <div class="menu__group">
            <h3>{{ group.title }}</h3>
            <span v-if="group.sizes" class="menu__sizes" aria-hidden="true">
              <span v-for="s in group.sizes" :key="s">{{ s }}</span>
            </span>
          </div>

          <ul v-if="group.items" class="menu__list">
            <li v-for="item in group.items" :key="item.name" class="menu__item">
              <div class="menu__row">
                <span class="menu__name">
                  {{ item.name }}
                  <Bloom v-if="item.signature" :size="13" class="menu__sig" />
                  <span v-if="item.signature" class="sr-only">(house favorite)</span>
                </span>
                <span class="menu__leader" aria-hidden="true" />
                <span v-if="item.prices" class="menu__sizes menu__prices">
                  <span v-for="(p, j) in item.prices" :key="j" :class="{ 'menu__na': !p }">
                    <span class="sr-only">{{ group.sizes[j] }}:</span>
                    {{ p ?? '—' }}
                    <span v-if="!p" class="sr-only">not available</span>
                  </span>
                </span>
                <span v-else class="menu__price">{{ item.price }}</span>
              </div>
              <p v-if="item.desc" class="menu__desc">{{ item.desc }}</p>
            </li>
          </ul>

          <div v-for="f in group.flavors" :key="f.label" class="menu__flavors">
            <p class="menu__flavor-label">{{ f.label }}</p>
            <ul class="menu__chips">
              <li v-for="name in f.list" :key="name">{{ name }}</li>
            </ul>
          </div>
        </div>

        <aside v-if="tab.callout" v-reveal="120" class="menu__callout">
          <Bloom :size="28" class="menu__callout-bloom" />
          <p>{{ tab.callout }}</p>
        </aside>
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
  margin-bottom: clamp(32px, 4vw, 48px);
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

/* Category tabs */
.menu__tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-bottom: clamp(32px, 4vw, 48px);
  margin-bottom: clamp(32px, 4vw, 48px);
  border-bottom: 1px solid var(--line);
}
.menu__tab {
  padding: 0.6em 1.15em;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: transparent;
  color: var(--ink);
  font: 500 0.9rem/1.2 var(--font-body);
  cursor: pointer;
  transition:
    background-color 0.3s var(--ease),
    border-color 0.3s var(--ease),
    color 0.3s var(--ease);
}
.menu__tab:hover {
  border-color: var(--ink);
}
.menu__tab[aria-selected='true'] {
  background: var(--ink);
  border-color: var(--ink);
  color: var(--cream);
}

/* Groups flow into two balanced columns (one on narrow screens), so short
   groups like Dirty Sodas and Kids stack together instead of leaving gaps. */
.menu__grid {
  columns: 2 360px;
  column-gap: clamp(40px, 6vw, 96px);
}
.menu__col,
.menu__callout {
  break-inside: avoid;
}
.menu__col {
  padding-bottom: clamp(40px, 5vw, 56px);
}
.menu__grid:focus-visible {
  outline-offset: 12px;
}
.menu__group {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  padding-bottom: 14px;
  margin-bottom: 8px;
  border-bottom: 1px solid var(--ink);
}
.menu__group h3 {
  font-size: 1.5rem;
  font-style: italic;
  color: var(--primary-ink);
}
.menu__sizes {
  display: grid;
  grid-template-columns: repeat(3, 3.1em);
  text-align: right;
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
}
.menu__group .menu__sizes {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  color: var(--ink-soft);
  /* Match the price cells' width at their own (larger) font size. */
  grid-template-columns: repeat(3, calc(3.1em * 0.95 / 0.75));
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
.menu__price,
.menu__prices {
  font-size: 0.95rem;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}
.menu__na {
  color: var(--ink-soft);
  opacity: 0.6;
}
.menu__desc {
  font-size: 0.875rem;
  color: var(--ink-soft);
  margin-top: 2px;
  max-width: 40ch;
}

/* Flavors */
.menu__flavors {
  margin-top: 18px;
}
.menu__flavor-label {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-soft);
  margin-bottom: 10px;
}
.menu__chips {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.menu__chips li {
  padding: 0.4em 0.95em;
  border: 1px solid var(--line);
  border-radius: 999px;
  font-size: 0.875rem;
}

/* Tab note, e.g. the bakery-case reminder */
.menu__callout {
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: clamp(24px, 3vw, 36px);
  border-radius: var(--radius);
  background: var(--primary-soft);
}
.menu__callout p {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.5rem;
  line-height: 1.25;
}
.menu__callout-bloom {
  color: var(--primary);
  --bloom-center: var(--primary-soft);
}

@media (max-width: 420px) {
  .menu__sizes {
    grid-template-columns: repeat(3, 2.8em);
  }
  .menu__group .menu__sizes {
    grid-template-columns: repeat(3, calc(2.8em * 0.95 / 0.75));
  }
}
</style>
