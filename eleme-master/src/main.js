// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VueLazyload from 'vue-lazyload'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Button, Select } from 'element-ui';
Vue.component(Button.name, Button);

import $ from 'jquery'
import store from './vuex'

import {setCookie,getCookie,delCookie} from './js/cookie.js'
import axios from "axios"

import mui from './lib/mui/js/mui.js'
import './lib/mui/css/icons-extra.css'
import './lib/mui/css/mui.css'
Vue.prototype.mui = mui;

Vue.prototype.$axios = axios;
Vue.use(VueResource);
Vue.use(Vuex);
Vue.use(ElementUI);

Vue.use(VueLazyload,{
	loading:require('./assets/default.gif')
})

Vue.config.productionTip = false;
Vue.prototype.$cookieStore = {
	setCookie,
	getCookie,
	delCookie,
};
Vue.prototype.backBefor = () => {
	window.history.back(-1);
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})




router.beforeEach((to, from, next)=>{
	// if(to.meta.title){
	// 	document.title = to.meta.title;
	// }
	const type = to.meta.type;
	if(type == 'login'){
		if(sessionStorage.getItem('username')){
			next();
		}else{
			alert('请登录后选购');
			next('/self/login');
		}
	}else{
		next();
	}
})

