<script setup>
import { ref } from 'vue'
import { site } from '../data/site'
import { formatTime } from '../utils/hours'
import CurvedText from './CurvedText.vue'

const email = ref('')
const subscribed = ref(false)
// TODO: connect to your newsletter provider (Mailchimp, Buttondown, etc.).
// For now this only confirms on screen; no email is sent anywhere.
const subscribe = () => {
  if (email.value) subscribed.value = true
}
const year = new Date().getFullYear()
const tel = `tel:${site.phone.replace(/[^\d+]/g, '')}`
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__top">
        <div class="footer__brand">
          <CurvedText text="baked with love ✿" />
          <p class="footer__logo">Flower <em>in</em> Flour</p>
        </div>

        <form class="footer__news" @submit.prevent="subscribe">
          <label for="news-email" class="footer__label">Seasonal menus, workshops &amp; events — once a month.</label>
          <div v-if="!subscribed" class="footer__field">
            <input id="news-email" v-model="email" type="email" required placeholder="you@email.com" autocomplete="email" />
            <button type="submit">Subscribe</button>
          </div>
          <p v-else class="footer__thanks" role="status">Thank you! Watch your inbox for fresh blooms.</p>
        </form>
      </div>

      <div class="footer__cols">
        <div>
          <h3 class="footer__h">Contact</h3>
          <a :href="tel">{{ site.phone }}</a>
          <a :href="`mailto:${site.email}`">{{ site.email }}</a>
          <a :href="`https://instagram.com/${site.instagram}`" target="_blank" rel="noopener">@{{ site.instagram }}</a>
        </div>
        <div>
          <h3 class="footer__h">Opening hours</h3>
          <p v-for="h in site.hours" :key="h.label">
            {{ h.label }}<br />{{ h.note ?? `${formatTime(h.open)} – ${formatTime(h.close)}` }}
          </p>
        </div>
        <div>
          <h3 class="footer__h">Find us</h3>
          <p>{{ site.address.line1 }}<br />{{ site.address.line2 }}</p>
          <a href="#visit">View map →</a>
        </div>
      </div>

      <div class="footer__bottom">
        <p>© {{ year }} {{ site.name }}</p>
        <a href="#top">Back to top ↑</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--primary-deep);
  color: var(--cream);
  padding-block: clamp(64px, 9vw, 120px) 32px;
}
.footer a {
  text-decoration: none;
}
.footer a:hover {
  text-decoration: underline;
}
.footer__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 48px;
  padding-bottom: 56px;
  border-bottom: 1px solid rgba(251, 246, 238, 0.2);
}
.footer__brand :deep(.curved) {
  color: var(--primary-light);
  margin-bottom: -4px;
}
.footer__logo {
  font-family: var(--font-display);
  font-size: clamp(2.75rem, 7vw, 5rem);
  line-height: 1;
  letter-spacing: -0.02em;
}
.footer__logo em {
  color: var(--primary-light);
}
.footer__news {
  max-width: 400px;
  width: 100%;
}
.footer__label {
  display: block;
  margin-bottom: 12px;
  font-size: 0.95rem;
}
.footer__field {
  display: flex;
  border-bottom: 1.5px solid var(--cream);
}
.footer__field input {
  flex: 1;
  min-width: 0;
  background: transparent;
  border: 0;
  color: var(--cream);
  font: inherit;
  padding: 10px 0;
}
.footer__field input::placeholder {
  color: rgba(251, 246, 238, 0.6);
}
.footer__field input:focus {
  outline: none;
}
.footer__field:focus-within {
  border-color: var(--primary-light);
}
.footer__field button {
  background: none;
  border: 0;
  color: var(--cream);
  font: 500 0.95rem var(--font-body);
  cursor: pointer;
  padding: 10px 0 10px 16px;
}
.footer__thanks {
  font-family: var(--font-display);
  font-style: italic;
  font-size: 1.1rem;
}
.footer__cols {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  padding-block: 48px;
}
.footer__cols > div {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 0.95rem;
  color: rgba(251, 246, 238, 0.85);
}
.footer__h {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--cream);
  margin-bottom: 6px;
}
.footer__bottom {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding-top: 24px;
  border-top: 1px solid rgba(251, 246, 238, 0.2);
  font-size: 0.85rem;
  color: rgba(251, 246, 238, 0.7);
}

@media (max-width: 720px) {
  .footer__cols {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
</style>
