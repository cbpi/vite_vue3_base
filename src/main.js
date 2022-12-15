import { createApp } from 'vue'
import router from './router/index'
import './style.css'
import App from './App.vue'

// eslint-disable-next-line import/no-unresolved
import 'element-plus/lib/theme-chalk/index.css'

createApp(App).use(router).mount('#app')
