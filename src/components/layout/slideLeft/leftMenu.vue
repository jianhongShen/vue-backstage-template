<template>
  <div class="left-menu" style="height:100%">
      <el-scrollbar wrap-class="scrollbar-wrapper" style="height:100%">
          <el-menu
            mode="vertical"
            background-color="#20222a"
            text-color="#bfcbd9"
            active-text-color="#409EFF">
            <menu-item v-for="item in menu" :key="item.path" :item="item" />
        </el-menu>
      </el-scrollbar>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import menuItem from "./menuItem"
export default {
    components:{
        menuItem
    },
    computed:{
        ...mapGetters(["menu"])
    },
}
</script>

<style scoped>
.el-menu{
    border-right:none;
}
</style>