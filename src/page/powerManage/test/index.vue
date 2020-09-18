<template>
  <div>
      我是测试组件(0.0)
  </div>
</template>

<script>
export default {
    created(){
      console.log("创建测试组件")
    },
    mounted(){
        console.log("测试组件被挂载")
    },
    beforeRouteEnter(to,from,next){
      
        console.log("测试进入路由")
        next(()=>{
          console.log("next函数执行")
        })
    },
    updated(){
        console.log("测试组件更新")
    }
}
</script>

<style>

</style>