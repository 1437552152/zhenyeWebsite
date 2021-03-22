/*
 * @Description:
 * @version:
 * @Date: 2019-07-31 19:53:22
 * @LastEditors: yfye
 * @LastEditTime: 2021-03-22 19:57:31
 * @Author: yeyifu
 * @LastModifiedBy: yeyifu
 */
import Main from '@/views/Main.vue';
import Cookies from 'js-cookie';
import {
    setStore,
    getStore,
    removeStore
} from '@/config/storage.js';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => {
        require(['@/views/login.vue'], resolve);
    }
};

export const registerRouter = {
    path: '/register',
    name: 'register',
    meta: {
        title: 'Register - 注册'
    },
    component: resolve => {
        require(['@/views/register.vue'], resolve);
    }
};


export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => {
        require(['@/views/error-page/404.vue'], resolve);
    }
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => {
        require(['@//views/error-page/403.vue'], resolve);
    }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => {
        require(['@/views/error-page/500.vue'], resolve);
    }
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: resolve => {
        require(['@/views/main-components/lockscreen/components/locking-page.vue'], resolve);
    }
};
// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [{
        path: 'home',
        title: '首页',
        name: 'home_index',
        component: resolve => {
            require(['@/views/home/home.vue'], resolve);
        }
    },
    {
        // id:9,
        path: 'websiteConfig',
        title: '配置详情',
        name: 'websiteConfig',
        icon: 'ios-chatbubbles',
        component: resolve => {
            require(['@/views/argu-page/websiteConfig.vue'], resolve);
        }
    }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里

let findSlideArr = [
    // 以Main為組件的都是侧栏的一级菜单
    {
        id: 1,
        path: '/system',
        icon: 'person-stalker',
        component: Main
    },
    {
        id: 4,
        path: '/content',
        icon: 'ios-alarm',
        component: Main
    },
    {
        id: 13,
        path: '/config',
        icon: 'ios-briefcase',
        component: Main
    },

    {
        id: 2,
        path: 'user-management',
        icon: 'ios-bus',
        component: resolve => {
            require(['@/views/html/system/Userlist.vue'], resolve);
        }
    },
    {
        id: 21,
        path: 'fixPersonalPW',
        icon: 'ios-bus',
        component: resolve => {
            require(['@/views/html/system/PersonalCenter.vue'], resolve);
        }
    },
    {
        id: 22,
        path: 'catly',
        icon: 'ios-bus',
        component: resolve => {
            require(['@/views/html/system/catlyList.vue'], resolve);
        }
    }, 
    {
        id: 3,
        path: 'roleManage',
        icon: 'ios-browsers',
        component: resolve => {
            require(['@/views/html/system/role.vue'], resolve);
        }
    },
    {
        id: 20,
        path: 'baseConfiglist',
        icon: 'ios-cloud-circle',
        component: resolve => {
            require(['@/views/content/baseConfiglist.vue'], resolve);
        }
    },
    {
        id: 14,
        path: 'MessageBoard',
        icon: 'logo-codepen',
        component: resolve => {
            require(['@/views/content/MessageBoard.vue'], resolve);
        }
    },
    {
        id: 15,
        path: 'carousel',
        icon: 'ios-compass',
        component: resolve => {
            require(['@/views/content/Carousel.vue'], resolve);
        }
    }
];

// 遍历权限
let sidebarArr = JSON.parse(getStore('leftSidebarList')) || [];

// userDefinedIDArr  是一个父数组id(这个不是后台数据id，是前端写的id,可以看得见的id)
let userDefinedIDArr = [];
findSlideArr.forEach(item => {
    userDefinedIDArr.push(item.id);
});

// sidebarArr是后台遍历的数据
let arr = [];
sidebarArr.forEach((item, index) => {
    // includes是包含的意思     表示userDefinedIDArr这个数组中是否有item.id,,如果没有则删除sidebarArr那个值将该值变为underfine,,delete跟splice的区别是splice将这个位置也删了
    // var textArr = ['a','b','c','d'];
    // delete textArr[1]  结果为： ["a",undefined,"c","d"]
    if (!userDefinedIDArr.includes(item.id)) {
        delete sidebarArr[index];
    }
});

// formateUndefinedArr  表示后台数据返回处理后的数据，如果没有则为无定义
let formateUndefinedArr = [];
sidebarArr.forEach(item => {
    formateUndefinedArr.push(item);
});

// 首先判断这个
if (formateUndefinedArr.length > 0) {
    formateUndefinedArr.forEach(item => {
    // indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
        let index = userDefinedIDArr.indexOf(item.id); // 先判断自己定义的一级菜单id，与后台一级菜单的id

        // 下面是将本地的path,icon增加到后台数据返回的上面
        item.path = findSlideArr[index].path;
        item.icon = findSlideArr[index].icon;
        item.perChildren = [...item.submenus]; //  ...是三点扩展运算符   扩展运算符将一个数组转为用逗号分隔的参数序列
        item.children = [];
        item.component = Main;
        // subMenu是二级菜单的数组
        if (item.perChildren.length > 0) {
            item.perChildren
                .forEach((it, index) => {
                    let subIndex = userDefinedIDArr.indexOf(it.id); // 前端自己定义的子id也在userDefinedIDArr中，同时也要跟后台传的id进行比较
                    // 如果可以匹配
                    if (subIndex !== -1) {
                        it.icon = findSlideArr[subIndex].icon;
                        it.path = findSlideArr[subIndex].path;
                        it.component = findSlideArr[subIndex].component;
                    } else {
                        delete item.perChildren[index]; // 匹配不上则会删除
                    }
                });
            item.perChildren.forEach(it => {
                item.children.push(it);
            });
        }
    });
    // console.log(formateUndefinedArr);
}
export let appRouter = formateUndefinedArr;
export const clearAppRouter = () => {
    appRouter = [];
};

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,registerRouter, otherRouter, locking, ...appRouter,
    page500,
    page403,
    page404
];
