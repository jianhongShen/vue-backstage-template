import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import Layout from '../components/layout/index.vue'
import staticRoutes from './staticRouter'
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [...staticRoutes]
})

export default router