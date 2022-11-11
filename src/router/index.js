import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '/src/views/Home.vue'
import Login from '/src/views/Login.vue'
import Logoff from '/src/views/Logoff.vue'
import resView3 from '/src/views/resView3/resView3.vue'
const routes = [
    {
      path: '/',
      name: 'Blank',
      component: Home
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Logoff',
      name: 'Logoff',
      component: Logoff
    },
    {
      path: '/resView3',
      name: 'resView3',
      component: resView3
    }
  ]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router