<template>
  <div id="home">
    <router-link to="/infiniteScroll">infiniteScroll</router-link><br>
    <router-link to="/checkbox">checkbox</router-link><br>
    <router-link to="/radio">radio</router-link>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>
<style lang="less" scoped>
  #home {
    padding: 100px 0px 0px 0px;
  }
</style>
