<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
  watch:{
    // eslint-disable-next-line no-unused-vars
    '$route'(to,from){
      console.log("APP路由监听变动--->",to)
    }
  }
}
</script>
<style>
*{
  padding:0;
  margin: 0;
}
html,body{
  height:100%;
  width:100%;
}
#app{
  height:100%;
  width:100%;
}
</style>
