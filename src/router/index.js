import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home.vue'
import Stock from '../views/stock.vue'
import Three3D from '../views/three.vue'
import Demo from '../views/demo.vue'
import Grid from '../views/gridTransaction.vue'

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
  },
  {
    path: '/grid',
    name: 'Grid',
    component: Grid
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
