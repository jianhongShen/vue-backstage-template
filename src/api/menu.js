export const GetMenu = (topMenuId) => new Promise((res) => {
    console.log("topMenuId:", topMenuId)
    res([{
            path: 'powerManage',
            name: 'powerManage',
            title: '权限管理',
            children: [{
                path: 'powerManage/menuManage',
                name: 'menuManage',
                component: 'menuManage',
                title: '菜单管理',
            }, {
                path: 'powerManage/userManage',
                name: 'userManage',
                component: 'userManage',
                title: '用户管理',
            }, {
                path: 'powerManage/test',
                name: 'test',
                component: 'test',
                title: '测试管理',
            }]
        },
        {
            path: 'articleManage',
            name: 'articleManage',
            title: '文章管理',
            component: "articleManage",
            children: []
        }
    ])
})
export const getTopMenu = () => new Promise((res) => {
    res([{
        id: "pc001",
        title: '首页',
    }, {
        id: "mobile001",
        title: '移动端',
    }])
})