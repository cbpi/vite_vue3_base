import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home.vue'
import Stock from '../views/stock.vue'
import Three3D from '../views/three.vue'
import Demo from '../views/demo.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/stock',
    name: 'Stock',
    component: Stock
  },
  {
    path: '/three',
    name: 'Three',
    component: Three3D
  },
  {
    path: '/demo',
    name: 'Demo',
    component: Demo
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
