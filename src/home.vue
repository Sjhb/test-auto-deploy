<template>
  <div id="home">
    <ul class="nav-container">
      <li class="nav">
        <router-link to="repConfig">项目配置</router-link>
      </li>
      <li class="nav"><a>发布日志</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>
<style lang="less" scoped>
  .nav-container {
    list-style: none;
    font-size: 16px;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .nav-container .nav {
    list-style: none;
    display: block;
    padding: 10px;
  }
  .nav-container .nav a {
    cursor: pointer;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
    font-weight: 600;
    letter-spacing: 0.1em;
    min-width: 8em;
    text-align: center;
  }
  .nav-container .nav a:hover {
    background-color: #389068;
  }
</style>
