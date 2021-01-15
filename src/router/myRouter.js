/**
 * 全站路由配置
 *
 * meta参数说明
 * keepAlive是否缓冲页面
 * isTab是否加入到tag导航
 * isAuth是否需要授权
 */

let myRouter = function(){
    this.$router = null;
    this.$store = null;
}

myRouter.init = function (router, store) {
    //获取并将路由和仓库挂载到自定义路由上面
    this.$router = router;
    this.$store = store;
    //在路由上挂载一个对象，这个对象挂载了配置信息和封装了一些处理路由的方法
    this.$router.$MyRouter = {
        //全局站点配置
        $website: this.$store.getters.website,
        //保存父级路由的引用
        routerRef: this,
        //默认的meta配置
        meta:{},
        //动态路由
        formatRoutes(aMenu = [], first){
            if(!aMenu || aMenu.length === 0) return
            //定义动态路由
            const actionRouter = [];
            //获取到当前网站默认配置路由参数名称
            const propsConfig = this.$website.menu.props;
            const propsDefault = {
                label: propsConfig.label || 'name',
                path: propsConfig.path || 'path',
                icon: propsConfig.icon || 'icon',
                children: propsConfig.children || 'children',
                meta: propsConfig.meta || 'meta',
            };
            //循环后台路由值生成新的前端路由配置
            for (let i = 0; i < aMenu.length; i++) {
                const oMenu = aMenu[i];
                //获取对应基础的信息
                let path = oMenu[propsDefault.path],
                    name = oMenu[propsDefault.label],
                    icon = oMenu[propsDefault.icon],
                    children = oMenu[propsDefault.children],
                    meta = oMenu[propsDefault.meta] || {},


                //最终的显示页面路径
                    component = "views" + path,
                //判断是否有子路由
                    hasChild = children.length !== 0;

                //开始配置路由
                let oRouter = {
                    path:path,
                    component(resolve){
                        //如果是一级路由则获取布局界面
                        if(first){
                            require(['../page/index/index'], resolve)
                            return
                        }
                        //如果是子路由并且还存在子路由
                        else if(!first && hasChild){
                            require(['../page/index/layout'], resolve)
                            return
                        }
                        //如果是最后一级路由
                        else{
                            require([`../${component}.vue`], resolve)
                            return
                        }
                    },
                    name,
                    icon,
                    meta,
                    redirect: (() => {
                        //如果是一级路由并且没有子路由则跳转到该路径下的首页
                        if (!hasChild && first) return `${path}/index`
                        else return '';
                    })(),
                    children: !hasChild ? (() => {
                        //如果没有子路由且是一级路由
                        if (first) {
                            return [{
                                component(resolve) { require([`../${component}.vue`], resolve) },
                                icon: icon,
                                name: `${name}Child`,
                                meta: meta,
                                path: 'index'
                            }]
                        }
                        //没有子路由且非一级路由返回空数组
                        return [];
                    })() : (() => {
                        return this.formatRoutes(children, false)
                    })()
                };
                actionRouter.push(oRouter)
            }
            //循环递归结束
            if(first){
                // console.log("actionRouter-----",actionRouter)
                this.routerRef.$router.addRoutes(actionRouter)
            }else{
                //递归出口
                return actionRouter
            }
        }
    }
}

export default myRouter