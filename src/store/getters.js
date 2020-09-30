const getters = {
    userInfo: state => state.user.userInfo,
    token: state => state.user.token,
    menu: state => state.user.menu,
    topMenu: state => state.user.topMenu,
    tagList: state => state.tags.tagList,
    tag:state => state.tags.tag,
}
export default getters