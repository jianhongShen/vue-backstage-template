import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import tags from './modules/tags'
import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    mutations: {},
    actions: {},
    getters,
    modules: {
        user,
        tags
    }
})