/*
 * @Description: 
 * @Author: yfye
 * @Date: 2021-04-26 08:40:06
 * @LastEditTime: 2021-06-15 20:20:47
 * @LastEditors: yfye
 */
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Page/Home.vue';
import Login from '../views/Page/Login.vue';
import Register from '../views/Page/Register.vue';
import Menu from '../views/Page/Menu.vue';
import Product from '../views/Page/Product.vue';
import Store from '../views/Page/Store.vue';
import Find from '../views/Page/Find.vue';
import noPage from '../views/Page/404.vue';
// import vuex from '../components/vuex.vue'
const router = createRouter({
    history: createWebHistory(),
    routes: [{
            path: '/',
            component: Home
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '/menu',
            component: Menu
        },
        {
            path: '/product',
            component: Product
        },
        {
            path: '/store',
            component: Store
        },
        {
            path: '/find',
            component: Find
        },
        {
            path: '/404',
            component: noPage
        }
    ]
});

router.beforeEach((to, from, next) => {
    console.log(to.matched);
    if (to.matched.length === 0) {
        next('/404')
    }
    next()
})



export default router