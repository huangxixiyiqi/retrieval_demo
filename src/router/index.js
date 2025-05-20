import Vue from 'vue';
import Router from 'vue-router';
import Text2Image from '@/components/Text2Image.vue';
import Image2Text from '@/components/Image2Text.vue';
import Login from '@/components/login.vue'; // 引入 login 组件
import Index from '@/components/Index.vue'; // 引入 Index 组件
import Register from '@/components/Register.vue';

Vue.use(Router);

const router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/login', // 默认重定向到登录页
        },
        {
            path: '/login',
            name: 'Login',
            component: Login, // 配置 login 路由
        },
        {
            path: '/register',
            name: 'Register',
            component: Register, // 配置 register 路由
        },
        {
            path: '/index', // 路由路径
            name: 'Index', // 路由名称
            component: Index, // 对应的组件
            meta: { requiresAuth: true }, // 标识需要登录验证
            children: [
                {
                    path: 'text-to-image',
                    name: 'Text2Image',
                    component: Text2Image,
                    meta: { requiresAuth: true }, // 子路由也需要登录验证
                },
                {
                    path: 'image-to-text',
                    name: 'Image2Text',
                    component: Image2Text,
                    meta: { requiresAuth: true }, // 子路由也需要登录验证
                },
            ],
        },
    ],
});

// 全局导航守卫
router.beforeEach((to, from, next) => {
    const isAuthenticated = checkLoginStatus(); // 自定义函数，用于检查用户是否已登录

    if (to.path === '/login' && isAuthenticated) {
        // 如果用户已登录且尝试访问登录页，则重定向到首页
        next({ path: '/index' });
    } else if (to.matched.some(record => record.meta.requiresAuth)) {
        // 如果目标路由需要登录验证
        if (!isAuthenticated) {
            next({
                path: '/login', // 未登录时重定向到登录页面
                // query: { redirect: to.fullPath }, // 可选：保存用户原本要访问的路径
            });
        } else {
            next(); // 已登录，继续导航
        }
    } else {
        next(); // 不需要登录验证的路由，直接放行
    }
});


function checkLoginStatus() {
    // 示例：从 localStorage 或 Vuex 中获取登录状态
    return localStorage.getItem('isAuthenticated') === 'true';
}

export default router;