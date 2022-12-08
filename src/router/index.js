import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '/src/views/Home.vue'
import Login from '/src/views/Login.vue'
import Logoff from '/src/views/Logoff.vue'
import Composables from '/src/views/Composables.vue'
import SpaceEdit from '/src/views/SpaceEdit/SpaceEdit.vue'
import Dashboard from '/src/views/Dashboard/Dashboard.vue'

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
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard
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
      component: () => import('/src/views/resView3/resView3.vue')
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