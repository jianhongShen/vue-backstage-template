import Layout from '@/components/layout/index.vue'
export default [{
        path: '/',
        redirect: '/home',
        component: Layout,
        children: [{
            path: 'home',
            name: 'Home',
            component: () =>
                import ( /* webpackChunkName: "about" */ '@/views/Home.vue')
        }]
    },
    {
        path: '/login',
        name: 'Login',
        meta: {
            isAuth: false
        },
        component: () =>
            import ( /* webpackChunkName: "about" */ '@/views/Login.vue')
    }
]