import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '/src/views/Home.vue'
import Login from '/src/views/Login.vue'
import Logoff from '/src/views/Logoff.vue'
const routes = [
    {
      path: '/',
      name: 'Home',
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
    }
  ]
const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router