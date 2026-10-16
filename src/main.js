import { createApp } from 'vue'
import App from './App.vue'
import { reveal } from './directives/reveal'
import '@fontsource-variable/fraunces/opsz.css'
import '@fontsource-variable/fraunces/opsz-italic.css'
import '@fontsource-variable/dm-sans/opsz.css'
import './styles/base.css'

createApp(App).directive('reveal', reveal).mount('#app')
