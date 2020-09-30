/**
 * 全局配置文件
 */
export default {
    key: 'tx-back', //配置主键,目前用于存储
    //配置菜单的属性
    menu: {
        iconDefault: 'iconfont icon-caidan',
        props: {
            title: 'name',
            path: 'path',
            icon: 'source',
            children: 'children'
        }
    },
    //配置首页不可关闭
    isFirstPage: false,
    fistPage: {
        title: "首页",
        path: "/home",
        name:"Home",
        params: {},
        query: {},
        meta: {},
        close: false
    },
}