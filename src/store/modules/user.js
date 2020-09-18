import { setToken } from '@/utils/auth'
import { Message } from 'element-ui'
import { getStore } from '@/utils/store'
import { validatenull } from '@/utils/validate-copy'
import { deepClone } from '@/utils/util'
// import website from '@/config/website'
import Layout from '@/components/layout/index.vue'
import router from '@/router/index.js'
import { loginByUsername, getUserInfo } from '@/api/user'
import { getTopMenu, GetMenu } from '@/api/menu'

const formatRoutes = function(routes, routeData) {
    if (!routeData) {
        routeData = {
            name: 'page',
            path: '/page',
            // 组件匹配成功的话才可以访问具体的页面
            component: Layout,
            children: [],
        };
    }
    routes.length && routes.forEach(route => {
        if (route.component) {
            // powerManage/menuManage/menuManage
            routeData.children.push({
                path: route.path,
                name: route.name,
                component: () =>
                    import (`@/page/${route.path}`),
                meta: {
                    title: route.title,
                },
            })
        }
        if (route.children && route.children.length) {
            formatRoutes(route.children, routeData);
        }
    });
    return routeData;
}
const user = {
    state: {
        token: getStore({ name: 'token' }) || '',
        userInfo: {},
        menu: [],
        topMenu: [],
    },
    actions: {
        //根据用户名登录
        LoginByUsername({ commit }, userInfo) {
            return new Promise((resolve, reject) => {
                loginByUsername(userInfo.username, userInfo.password).then(res => {
                    const data = res.data;
                    if (data.error_description) {
                        Message({
                            message: data.error_description,
                            type: 'error'
                        })
                    } else {
                        commit('SET_TOKEN', data.access_token);
                    }
                    resolve();
                }).catch(error => {
                    reject(error);
                })
            })
        },
        //获取系统菜单
        GetMenu({ commit }, topMenuId) {
            return new Promise(resolve => {
                GetMenu(topMenuId).then((res) => {
                    const data = res
                    console.log("menu:", res)
                    router.addRoutes([formatRoutes(deepClone(data))])
                    let menu = deepClone(data)
                    console.log("formatRoutes:", formatRoutes(deepClone(data)))
                    commit('SET_MENU', menu);
                    resolve(router)
                })
            })
        },
        //获取顶部菜单
        GetTopMenu({ commit }) {
            return new Promise(resolve => {
                getTopMenu().then((res) => {
                    const data = res || [];
                    commit('SET_TOP_MENU', data);
                    resolve(data)
                })
            })
        },
        GetUserInfo({ commit }) {
            return new Promise((resolve, reject) => {
                getUserInfo().then((res) => {
                    const data = res.data;
                    commit('SET_USER_INFO', data);
                    resolve(data);
                }).catch(err => {
                    reject(err);
                })
            })
        },
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            setToken(token);
            state.token = token;
        },
        SET_USER_INFO: (state, userInfo) => {
            if (validatenull(userInfo.avatar)) {
                userInfo.avatar = "/img/bg/img-logo.png";
            }
            state.userInfo = userInfo;
        },
        SET_TOP_MENU: (state, data) => {
            state.topMenu = data
        },
        SET_MENU: (state, data) => {
            state.menu = data
        }
    }

}
export default user