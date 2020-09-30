/*
 * @Author: your name
 * @Date: 2020-09-18 23:44:47
 * @LastEditTime: 2020-09-20 23:31:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-backstage-template\src\store\modules\tags.js
 */
import { setStore, getStore } from '@/utils/store'
// import { diff } from '@/utils/util'
import website from '@/config/website'

const isFirstPage = website.isFirstPage;
const tagWel = website.fistPage;
// const tagObj = {
//     label: '', //标题名称
//     path: '', //标题的路径
//     params: '', //标题的路径参数
//     query: '', //标题的参数
//     meta: {}, //额外参数
//     group: [], //分组
// }

//处理首个标签
function setFistTag(list) {
    if (list.length === 1) {
        list[0].close = false;
    } else {
        list.forEach(ele => {
            if (ele.path === tagWel.path && isFirstPage === false) {
                ele.close = false
            } else {
                ele.close = true
            }
        })
    }
}
//查找数组指定路径
function findTags(path, list) {
    const result = list.find((ele) => {
        return ele.path == path
    })
    if (result) return true
    return false
}

const navs = {
    state: {
        tagList: getStore({ name: 'tagList' }) || [tagWel],
        tag: getStore({ name: 'tag' }) || tagWel,
        tagWel: tagWel
    },
    mutations: {
        ADD_TAG: (state, action) => {
            state.tag = action;
            setStore({ name: 'tag', content: state.tag,type: 'session'})
            if (findTags(state.tag.path, state.tagList)) return
                //   if (state.tagList.some(ele => diff(ele, action))) return
            state.tagList.push(action)
            setFistTag(state.tagList);
            setStore({ name: 'tagList', content: state.tagList, type: 'session' })
        },
        DEL_TAG: (state, action) => {
            state.tagList = state.tagList.filter(item => {
                return !(item.path == action.path);
            })
            setFistTag(state.tagList);
            
            setStore({ name: 'tagList', content: state.tagList, type: 'session' })
        },
        DEL_ALL_TAG: (state) => {
            state.tagList = [state.tagWel];
            setStore({ name: 'tagList', content: state.tagList, type: 'session' })
        },
        DEL_TAG_OTHER: (state) => {
            state.tagList = state.tagList.filter(item => {
                if (item.path === state.tag.path) {
                    return true;
                } else if (!website.isFirstPage && item.path === website.fistPage.path) {
                    return true;
                }
            })
            setFistTag(state.tagList);
            setStore({ name: 'tagList', content: state.tagList, type: 'session' })
        },
        SET_TAG_LIST(state, tagList) {
            state.tagList = tagList;
            setStore({ name: 'tagList', content: state.tagList, type: 'session' })
        },
        SET_TAG: (state, action) => {
            console.log("设置的tag值",action)
            state.tag = action;
        }
    }
}
export default navs