import router from './router/index'
import store from './store'
import { validatenull } from '@/utils/validate-copy'
import { getToken } from '@/utils/auth'



router.beforeEach((to, from, next) => {
    if (getToken()) {
        if (to.path === '/login') { //如果登录成功访问登录页跳转到主页
            next({ path: '/' })
        } else if (validatenull(store.getters.userInfo)) { // 判断当前用户是否已拉取完信息
            store.dispatch("GetUserInfo").then(() => {
                store.dispatch("GetTopMenu").then(() => {
                    store.dispatch("GetMenu").then(() => {})
                })
                next()
            })
        } else {
            next()
        }
    } else {
        console.log("未登录")
            //判断是否需要认证，没有登录访问去登录页
        if (to.meta.isAuth === false) {
            next()
        } else {
            next('/login')
        }
    }
})