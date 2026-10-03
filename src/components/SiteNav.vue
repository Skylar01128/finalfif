<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const leftLinks = [
  { href: '#menu', label: 'Menu' },
  { href: '#work', label: 'Work' },
  { href: '#events', label: 'Events' },
]
const rightLinks = [
  { href: '#reviews', label: 'Reviews' },
  { href: '#visit', label: 'Visit' },
]

const open = ref(false)
const scrolled = ref(false)

const onScroll = () => (scrolled.value = window.scrollY > 12)
const onKey = (e) => e.key === 'Escape' && (open.value = false)

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <header class="nav" :class="{ 'nav--scrolled': scrolled || open }">
    <div class="nav__inner container">
      <nav class="nav__links nav__links--left" aria-label="Sections">
        <a v-for="l in leftLinks" :key="l.href" :href="l.href">{{ l.label }}</a>
      </nav>

      <a href="#top" class="nav__logo">Flower <em>in</em> Flour</a>

      <div class="nav__links nav__links--right">
        <a v-for="l in rightLinks" :key="l.href" :href="l.href">{{ l.label }}</a>
        <a href="#events" class="btn btn--solid btn--sm">Book an event</a>
      </div>

      <button
        class="nav__toggle"
        :aria-expanded="open"
        aria-controls="mobile-menu"
        @click="open = !open"
      >
        <span class="sr-only">{{ open ? 'Close menu' : 'Open menu' }}</span>
        <span class="nav__bar" /><span class="nav__bar" />
      </button>
    </div>

    <Transition name="drawer">
      <nav v-show="open" id="mobile-menu" class="nav__drawer" aria-label="Mobile">
        <a
          v-for="l in [...leftLinks, ...rightLinks]"
          :key="l.href"
          :href="l.href"
          @click="open = false"
        >{{ l.label }}</a>
        <a href="#events" class="btn btn--solid" @click="open = false">Book an event</a>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(251, 246, 238, 0);
  transition: background-color 0.4s var(--ease), box-shadow 0.4s var(--ease);
}
.nav--scrolled {
  background: rgba(251, 246, 238, 0.92);
  backdrop-filter: blur(10px);
  box-shadow: 0 1px 0 var(--line);
}
.nav__inner {
  height: var(--nav-h);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}
.nav__links {
  display: flex;
  align-items: center;
  gap: clamp(16px, 2.4vw, 32px);
  font-size: 0.9rem;
}
.nav__links a:not(.btn),
.nav__drawer a:not(.btn) {
  text-decoration: none;
  position: relative;
}
.nav__links a:not(.btn)::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -4px;
  height: 2px;
  background: var(--primary);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.35s var(--ease);
}
.nav__links a:not(.btn):hover::after {
  transform: scaleX(1);
}
.nav__links--right {
  justify-content: flex-end;
}
.nav__logo {
  font-family: var(--font-display);
  font-size: 1.6rem;
  text-decoration: none;
  letter-spacing: -0.02em;
  white-space: nowrap;
}
.nav__logo em {
  color: var(--primary-ink);
}
.nav__toggle {
  display: none;
  justify-self: end;
  width: 44px;
  height: 44px;
  border: 0;
  background: none;
  cursor: pointer;
  position: relative;
}
.nav__bar {
  position: absolute;
  left: 11px;
  right: 11px;
  height: 1.5px;
  background: var(--ink);
  transition: transform 0.3s var(--ease);
}
.nav__bar:first-of-type {
  top: 18px;
}
.nav__bar:last-of-type {
  top: 25px;
}
.nav__toggle[aria-expanded='true'] .nav__bar:first-of-type {
  transform: translateY(3.5px) rotate(45deg);
}
.nav__toggle[aria-expanded='true'] .nav__bar:last-of-type {
  transform: translateY(-3.5px) rotate(-45deg);
}
.nav__drawer {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px var(--gutter) 28px;
  background: var(--cream);
  border-bottom: 1px solid var(--line);
}
.nav__drawer a:not(.btn) {
  font-family: var(--font-display);
  font-size: 1.75rem;
  padding: 6px 0;
}
.nav__drawer .btn {
  margin-top: 16px;
}
.drawer-enter-active,
.drawer-leave-active {
  transition: opacity 0.3s var(--ease), transform 0.3s var(--ease);
}
.drawer-enter-from,
.drawer-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 900px) {
  .nav__inner {
    grid-template-columns: 1fr auto;
  }
  .nav__links {
    display: none;
  }
  .nav__logo {
    justify-self: start;
  }
  .nav__toggle {
    display: block;
  }
}
@media (min-width: 901px) {
  .nav__drawer {
    display: none !important;
  }
}
</style>
