<template>
  <div class="layout-left-slide">
      <div class="tx-logo">
        <span>
            <span class="tx-logo-title">
                <div style="height:100%">
                    <img src="@/assets/logo.jpg" width="64" style="vertical-align: middle;">
                    <span >探寻</span>
                </div>
                
            </span>
        </span>
      </div>
      <div class="left-menu-wrapper">
          <left-menu></left-menu>
      </div>
  </div>
</template>

<script>
import leftMenu from "./leftMenu"
export default {
    components:{
        leftMenu
    },
    // created(){
    //     console.log("左侧组件被创建")
    // },
    // mounted(){
    //     console.log("左侧组件被挂载")
    // },
    // beforeRouteEnter(){
    //     console.log("左侧进入路由")
    // },
    // updated(){
    //     console.log("左侧组件更新")
    // }
}
</script>

<style lang="scss">
.layout-left-slide{
    display: flex;
    flex-direction: column;
    height:100%;
    background-color: #20222a;
    -webkit-transition: width .2s;
    transition: width .2s;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    -webkit-box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    .tx-logo{
        width: 240px;
        height: 64px;
        line-height: 64px;
        background-color: #20222a;
        font-size: 20px;
        overflow: hidden;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        -webkit-box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
        color: rgba(255, 255, 255, 0.8);
        z-index: 1024;
        &-title{
            display: block;
            height:100%;
            text-align: center;
            font-weight: 300;
            font-size: 25px;
            line-height: 64px;
        }
    }
    .left-menu-wrapper{
        flex:1
    }
}
</style>