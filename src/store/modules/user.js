import { loginByUsername, logout, getUserInfo } from '@/api/user'
import {setToken, removeToken, getToken} from '@/util/auth'
import router from '../../router'

function addPath(amenu){
    //处理菜单数组
    return amenu
}
const user = {
    state:{
        token:getToken(),
        userInfo:null,
        menu:null,
        topMenu:null
    },
    actions:{
        //根据用户名登录
        LoginByUsername({commit}, userInfo) {
            return new Promise((resolve, reject) => {
                loginByUsername(userInfo.username, userInfo.password).then(res => {
                    const data = res.data.data;
                    commit('SET_TOKEN', data.accessToken);
                    commit('SET_USER_INFO', data.userInfo);
                    commit('SET_MENU', data.userInfo.menu);
                    commit('SET_TOP_MENU', data.userInfo.topMenu);
                    // commit('DEL_ALL_TAG');
                    resolve(res);
                }).catch(error => {
                    reject(error);
                })
            })
        },
        // 登出
        LogOut({commit}) {
            return new Promise((resolve, reject) => {
                logout().then(() => {
                    commit('SET_TOKEN', '');
                    commit('SET_MENU', []);
                    commit('SET_TOP_MENU', []);
                    commit('SET_USER_INFO',{})
                    // commit('DEL_ALL_TAG');
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //根据token值更新用户信息
        GetUserInfo({ commit }) {
            return new Promise((resolve, reject) => {
                getUserInfo().then((res) => {
                    const data = res.data.data;
                    console.log("用户信息",res)
                    commit('SET_USER_INFO', data);
                    commit('SET_MENU', data.menu);
                    commit('SET_TOP_MENU', data.topMenu);
                    
                    resolve(data);
                }).catch(err => {
                    reject(err);
                })
            })
        },
    },
    mutations:{
        //设置token值
        SET_TOKEN: (state, token) => {
            setToken(token)
            state.token = token;
        },
        SET_USER_INFO: (state, userInfo) => {
            state.userInfo = userInfo;
            // state.menu = addPath(userInfo.menu) || []
            // state.topMenu = addPath(userInfo.topMenu) || []
        },
        SET_MENU: (state, menu) => {
            state.menu = addPath(menu)
            console.log("注册菜单")
            router.$MyRouter.formatRoutes(state.menu,true)
        },
        SET_TOP_MENU: (state, data) => {
            state.topMenu = data
        },
    }
}

export default user