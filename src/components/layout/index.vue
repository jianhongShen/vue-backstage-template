<template>
  <div class="tx-layout-component">
      <div class="tx-layout-top">
        <top/>
      </div>
      <div class="tx-layout-left">
        <slide-left/>
      </div>
      <div class="tx-layout-main">
        <div class="tx-layout-main-tags">
          <tags />
        </div>
        <div class="tx-layout-main-content" id="main-content">
          <keep-alive>
            <router-view class="main-content" v-if="$route.meta.keepAlive"/>
          </keep-alive>
          <router-view class="main-content" v-if="!$route.meta.keepAlive"/>
        </div>
      </div>
      <!-- <router-link to="/login">login</router-link> -->
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import top from "@/components/layout/top/"
import slideLeft from "@/components/layout/slideLeft/"
import tags from "@/components/layout/tags"
export default {
  components:{
    top,
    slideLeft,
    tags
  },
  computed:{
    ...mapGetters(['topMenu','menu'])
  },
  methods:{
    getMenu(item){
      this.$store.dispatch("GetMenu", item.id)
      console.log(this.menu,'---')
    },
    openMenu(){
      let item = this.menu[0].children[0]
      this.$router.push({name:item.name})
    }
  }
}
</script>

<style lang="scss">
.tx-layout-component{
  width:100%;
  height:100%;
  .tx-layout-top{
    padding-left: 240px;
    width: 100%;
    height:64px;
    background-color: #fff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .tx-layout-left{
    position: fixed;
    left: 0;
    top: 0;
    width: 240px;
    height: 100%;
    z-index: 1025;
    transition: all .3s;
  }
  .tx-layout-main{
    position: absolute;
    left: 240px;
    padding: 0;
    padding-bottom: 20px;
    width: calc(100% - 240px);
    height: calc(100% - 64px);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
    background: #f0f2f5;
    z-index: 1026;
    display: flex;
    flex-direction: column;
    &-tags{
      height:40px;
      padding: 0 10px;
      margin-bottom: 10px;
      box-sizing: border-box;
      overflow: hidden;
      border-top: 1px solid #f6f6f6;
      background-color: #fff;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    }
    &-content{
      flex:1;
    }
  }
}
</style>