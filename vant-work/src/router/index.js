import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/login'
import Register from '@/views/register'
import Home from '@/views/home'
import Main from '@/views/main'
import Detail from '@/views/detail'
import NewsList from '@/views/NewsList';
import Publish from '@/views/Publish'
import User from '@/views/User';
import MyPublish from '@/views/MyPublish';
import UserInfo from '@/views/UserInfo';
import Notice from '@/views/Notice';
const router = createRouter({
    history: createWebHistory(),
    routes: [{
            path: '/login',
            component: Login
        },
        {
            path: '/register',
            component: Register,
        },
        {
            path: '/detail',
            component: Detail,
        }, {
            path: '/newsList',
            component: NewsList,
        },
        {
            path: '/publish',
            component: Publish,
        },
        {
            path: '/userInfo',
            component: UserInfo,
        },
        {
            path: '/myPublish',
            component: MyPublish,
        },
        {
            path: '/notice',
            component: Notice,
        },
        {
            path: '/',
            component: Main,
            name: "main",
            children: [{
                    path: '/',
                    redirect: '/home',
                },
                {
                    path: '/home',
                    component: Home,
                },
                {
                    path: '/user',
                    component: User,
                },

            ]
        }
    ]
})
export default router