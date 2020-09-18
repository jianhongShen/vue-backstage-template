<template>
  <div v-if="item.children">
    <template v-if="item.children.length == 0">
        <el-menu-item :index="item.path" @click="openMenu(item)">
          <i class="el-icon-menu"></i>
          {{item.title}}
        </el-menu-item>
    </template>

    <el-submenu v-else :index="item.path">
      <template slot="title" >
        <i class="el-icon-menu"></i>
        {{item.title}}
      </template>

      <template v-for="child in item.children">
        <sidebar-item
          v-if="child.children&&child.children.length>0"
          :item="child"
          :key="child.path"/>
        <el-menu-item v-else 
            :key="child.path" 
            :index="child.path" 
            @click="openMenu(child)">
          <i class="el-icon-location"></i>
          {{child.title}}
        </el-menu-item>
      </template>
    </el-submenu>
  </div>
</template>

<script>
export default {
    name:"SidebarItem",
    props: {
        item: {
        type: Object,
        required: true
        }
    },
    methods:{
        openMenu(item){
            console.log(item.path)
            this.$router.push({name:item.name})
            item.label = item.title
            this.$store.commit("ADD_TAG",item)
        }
    }
}
</script>

<style>

</style>