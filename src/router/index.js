import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '/src/views/Home.vue'
import Login from '/src/views/Login.vue'
import Logoff from '/src/views/Logoff.vue'
import resView3 from '/src/views/resView3/resView3.vue'
import CreateReservation from '/src/views/CreateReservation.vue'
import Composables from '/src/views/Composables.vue'
import SpaceEdit from '/src/views/SpaceEdit/SpaceEdit.vue'

const routes = [
    {
      path: '/',
      name: 'Blank',
      component: Home
    },
    {
      path: '/Composables',
      name: 'Composables',
      component: Composables
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
    },
    {
      path: '/SpaceEdit',
      name: 'SpaceEdit',
      component: SpaceEdit
    }
  ]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router