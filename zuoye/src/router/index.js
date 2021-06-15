import { createRouter, createWebHistory } from 'vue-router'
//  import xu from '../components/xu.vue'
// import yl from '../components/yl.vue'
// import xsy from '../components/xsy.vue'
// import auto from '../components/auto.vue'
// import c404 from '../components/c404.vue'
// import mobile from '../components/mobile.vue'
// import main from '../views/main.vue'
// import detail from '../components/detail.vue'
// import bnav from '../components/bnav.vue'
// import search from '../components/search.vue'
// import ui from '../components/ui.vue'
// import setup from '../components/setup.vue'
// import axios from '../components/axios.vue'
import Home from '../views/Page/Home.vue';
import Login from '../views/Page/Login.vue';
import Register from '../views/Page/Register.vue';
import Menu from '../views/Page/Menu.vue';
import Product from '../views/Page/Product.vue';
import Store from '../views/Page/Store.vue';
import User from '../views/Page/User.vue';
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
            path: '/user',
            component: User
        },
        {
            path: '/404',
            component: noPage
        },





        // {
        //     path: '/vuex',
        //     component: vuex,
        //     name:"vuex"
        // },
        // {
        //     path: '/axios',
        //     component: axios,
        //     name:"asios"
        // },
        // {
        //     path: '/setup',
        //     component: setup,
        //     name:"setupi"
        // },
        // {
        //     path: '/ui',
        //     component: ui,
        //     name:"ui"
        // },
        // {
        //     path: '/search',
        //     component: search,
        //     name:"search"
        // },
        // {
        //     path: '/bnav',
        //     component: bnav,
        //     name:"bnav"
        // },
        // {
        //     path: '/detail',
        //     component: detail,
        //     name:"detail"
        // },
        // {
        //     path: '/main',
        //     component: main
        // },
        // {
        //     path: '/auto',
        //     component: auto,
        //     name:"auto"
        // },
        // {
        //     path: '/yl',
        //     component: yl
        // },
        // {
        //     path: '/',
        //     component: xu
        // },
        // {
        //     path: '/xx',
        //     component: yl
        // },
        // {
        //     path: '/error',
        //     component: c404
        // },
        // {
        //     path: '/xxx',
        //     component: xsy
        // },
        // {
        //     path: '/mobile/:name/:type',
        //     component: mobile,
        //     name:"mobile"
        // },
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