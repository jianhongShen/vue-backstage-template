/**
 * 全站路由配置
 *
 * meta参数说明
 * keepAlive是否缓冲页面
 * isTab是否加入到tag导航
 * isAuth是否需要授权
 */
import router from './router'
import store from './store'
import {validatenull} from '@/util/validate'
import {getToken} from '@/util/auth'

router.beforeEach((to, from, next) => {
  const meta = to.meta || {};
  if (getToken()) {
    //如果登录成功访问登录页跳转到主页
    if (to.path === '/login') { 
        next({ path: '/' })
    } 
    // 判断当前用户是否已拉取完信息,如果没有更新信息则拉取，首次加载可能会慢些
    else if (validatenull(store.getters.userInfo)) { 
      console.log("拉取信息")
      store.dispatch("GetUserInfo").then(() => {
        next()
      },(error)=>{console.log("拉取信息",error)})
    } 
    else {
        next()
    }

  } else {
    //判断是否需要认证，没有登录访问去登录页
    if (meta.isAuth === false) {
      next()
    } else {
      next('/login')
    }
  }
})

// router.afterEach(() => {
//   let title = store.getters.tag.label;
//   let i18n = store.getters.tag.meta.i18n;
//   title = router.$avueRouter.generateTitle(title, i18n)
//   //根据当前的标签也获取label的值动态设置浏览器标题
//   router.$avueRouter.setTitle(title);
// });