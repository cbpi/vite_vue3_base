import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home.vue'
import Vuex from '../views/vuex.vue'
import Three3D from '../views/three.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/vuex',
    name: 'Vuex',
    component: Vuex
  },
  {
    path: '/three',
    name: 'Three',
    component: Three3D
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
