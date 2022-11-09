import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import { createI18n } from 'vue-i18n';
import router from  './router/index.js'
import messages from './i18n/messages.js'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/theme-chalk/display.css'
import './style.css'
import App from './App.vue'

const pinia = createPinia()

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages
})

const app = createApp(App)
app.use(i18n)
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
