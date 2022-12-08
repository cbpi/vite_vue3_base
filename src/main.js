import { createApp } from 'vue';
import router from './router/index';
import ElementPlus from 'element-plus';
import './style.css';
import App from './App.vue';

import 'element-plus/lib/theme-chalk/index.css';

createApp(App).use(router).mount('#app');
