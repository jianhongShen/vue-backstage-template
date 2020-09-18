<template>
  <div class="layout-top">
      <div class="layout-top-left">
          <div>
              <i class="el-icon-s-fold"></i>
          </div>
      </div>
      <div class="layout-top-title">
          <div class="top-menu">
              <div 
                class="top-menu-item"
                v-for="item in topMenu"
                :key="item.id"
                @click="getMenu(item)"
              >
                {{item.title}}
              </div>
          </div>
      </div>
      <div class="layout-top-right"></div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
    computed:{
        ...mapGetters(['topMenu'])
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
.layout-top{
    padding:0 20px;
    height:100%;
    display: flex;
    &-left{
        i{
            line-height: 64px;
            font-size: 25px !important;
        }
    }
    &-title{
        flex:1;
        .top-menu{
            display: flex;
            &-item{
                line-height: 64px;
                padding: 0 10px;
                color: #303133;
                cursor: pointer;
            }
        }
    }
    &-right{
        
    }
}
</style>