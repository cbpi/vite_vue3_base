import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home.vue'
import Stock from '../views/stock.vue'
import Three3D from '../views/three.vue'

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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
