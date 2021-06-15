import { createApp } from 'vue'
import App from './App.vue'
import vant from 'vant';
import 'vant/lib/index.css';
import axios from 'axios'
import router from './router' //引入router
import store from './store' //新增
var app = createApp(App)
app.config.globalProperties.$axios = axios
app.use(router).use(vant).use(store).mount('#app'); //使用router//修改
//createApp(App).use(router).use(vant).mount('#app');//使用router