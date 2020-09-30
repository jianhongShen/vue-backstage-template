<template>
  <div class="tags-wrapper">
    <el-tabs v-model="active"
        type="card"
        @contextmenu.native="handleContextmenu"
        :closable="tagList.length!==1"
        @tab-click="openTag(findTag(active).tag)"
        @edit="menuTag">
        <el-tab-pane 
            :key="item.path"
            v-for="item in tagList"
            :label="item.title"
            :name="item.path">
        </el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
    data(){
        return{
            active:''
        }
    },
    watch:{
        tag() {
            this.setActive();
        },
    },
    computed:{
        ...mapGetters(['tagList','tag'])
    },
    mounted(){
        this.setActive()
    },
    methods:{
        handleContextmenu(){},
        openTag(item){
            console.log("click tag",item)
            this.$router.push({name:item.name})
            this.$store.commit("SET_TAG",item)
        },
        menuTag(value, action){
            if (action === "remove") {
                let {tag, key} = this.findTag(value);
                this.$store.commit("DEL_TAG", tag);
                if (tag.path === this.tag.path) {
                    tag = this.tagList[key === 0 ? key : key - 1]; //如果关闭本标签让前推一个
                    this.openTag(tag);
                }
            }
        },
        //激活当前选项
        setActive() {
            this.active = this.tag.path;
        },
        findTag(value) {
            let tag, key;
            this.tagList.map((item, index) => {
            if (item.path === value) {
                tag = item;
                key = index;
            }
            });
            return {tag: tag, key: key};
        },
    }
}
</script>

<style lang="scss">
.tags-wrapper{
    .el-tabs__item:first-child{
        .el-icon-close{
            display: none !important;
        }
    }
    .el-tabs{
        .el-tabs__nav{
            border:none;
        }
        .el-tabs__item{
            border:none;
            // padding: 0 10px;
        } 
    }
    .el-tabs__header {
        .el-tabs__item.is-active{
            color: #409EFF;
            border-bottom: 3px solid #409EFF;
        }   
    }
     
}

</style>