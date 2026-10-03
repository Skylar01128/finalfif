<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

// Savor-style persistent prompt: appears after the hero, hides while the
// Events section itself is on screen, and can be dismissed for the session.
const pastHero = ref(false)
const eventsVisible = ref(false)
const dismissed = ref(false)
const visible = computed(() => pastHero.value && !eventsVisible.value && !dismissed.value)

let io
const onScroll = () => (pastHero.value = window.scrollY > window.innerHeight * 0.8)

onMounted(() => {
  try {
    dismissed.value = sessionStorage.getItem('fif-event-card') === 'dismissed'
  } catch {}
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  const events = document.getElementById('events')
  if (events) {
    io = new IntersectionObserver(([e]) => (eventsVisible.value = e.isIntersecting), { threshold: 0.1 })
    io.observe(events)
  }
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  io?.disconnect()
})

const dismiss = () => {
  dismissed.value = true
  try {
    sessionStorage.setItem('fif-event-card', 'dismissed')
  } catch {}
}
</script>

<template>
  <Transition name="float">
    <aside v-if="visible" class="float" aria-label="Book an event">
      <div class="float__art" aria-hidden="true">✿</div>
      <div class="float__body">
        <p class="float__title">Host your event here</p>
        <a href="#events" class="float__link">Plan a celebration →</a>
      </div>
      <button class="float__close" aria-label="Dismiss" @click="dismiss">×</button>
    </aside>
  </Transition>
</template>

<style scoped>
.float {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 40;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 40px 12px 12px;
  background: var(--flour);
  border: 1px solid var(--line);
  border-radius: 18px;
  box-shadow: 0 20px 40px -20px rgba(53, 60, 64, 0.45);
}
.float__art {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  display: grid;
  place-items: center;
  background: var(--primary-soft);
  color: var(--primary-ink);
  font-size: 1.6rem;
}
.float__title {
  font-weight: 500;
  font-size: 0.95rem;
}
.float__link {
  font-size: 0.875rem;
  color: var(--primary-ink);
  text-decoration: none;
}
.float__close {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 28px;
  height: 28px;
  border: 0;
  border-radius: 50%;
  background: none;
  color: var(--ink-soft);
  font-size: 1.2rem;
  cursor: pointer;
}
.float__close:hover {
  background: var(--oat);
}
.float-enter-active,
.float-leave-active {
  transition: opacity 0.4s var(--ease), transform 0.4s var(--ease);
}
.float-enter-from,
.float-leave-to {
  opacity: 0;
  transform: translateY(16px);
}
@media (max-width: 720px) {
  .float {
    display: none;
  }
}
</style>
