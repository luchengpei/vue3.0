import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import { request } from './utils/http'
const app = createApp(App)
app.config.globalProperties.$http = request
app.use(store).use(router).use(Antd).mount('#app')
