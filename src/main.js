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

/**
 *   fontawesome icons
 */
/* import fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* treeshake specific icons */
import {
  faBars,
  faCircleArrowRight,
  faChevronRight,
  faChevronDown,
  faCircleArrowDown,
  faWindowClose
} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(
  faBars,
  faChevronRight,
  faChevronDown,
  faCircleArrowRight,
  faCircleArrowDown,
  faWindowClose
)

const pinia = createPinia()

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages
})

const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(i18n)
app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
