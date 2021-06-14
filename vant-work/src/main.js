/*
 * @Description: 
 * @Author: yfye
 * @Date: 2021-06-13 22:14:20
 * @LastEditTime: 2021-06-14 12:37:46
 * @LastEditors: yfye
 */
import { createApp } from 'vue'
import App from './App.vue'
import vant,{ Toast,Calendar } from 'vant';
import 'vant/lib/index.css';
import axios from 'axios'
import router from './router' //引入router
import store from './store';
//新增
var app = createApp(App)
app.use(Toast);
app.use(Calendar);
app.config.globalProperties.$axios = axios
app.use(router).use(vant).use(store).mount('#app'); //使用router//修改
//createApp(App).use(router).use(vant).mount('#app');//使用router