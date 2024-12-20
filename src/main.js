import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index'
import 'cesium/Build/Cesium/Widgets/widgets.css';
import './style.css'
import App from './App.vue'

// eslint-disable-next-line import/no-unresolved
import 'element-plus/dist/index.css'

createApp(App).use(router).use(ElementPlus).mount('#app')
