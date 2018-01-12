<template>
  <div id="infiniteScroll">
    <list class="scroll-area" @infiniteScroll="appendDiv" :disabled="busy">
      <div class="place" :style="{'background-color':item,'width':width,'height':height}" v-for="(item, index) in dataList" :key="index"></div>
    </list>
  </div>
</template>

<script>
import list from '@/component/infiniteScroll'

export default {
  name: 'app',
  components: {
    list
  },
  data () {
    return {
      dataList: ['rgb(14, 172, 247)', 'rgb(23, 120, 242)'],
      busy: false
    }
  },
  computed: {
    width () {
      return window.innerWidth + 'px'
    },
    height () {
      return window.innerHeight + 'px'
    }
  },
  methods: {
    // 生成0-255随机数
    createRandomNum () {
      return Math.floor(Math.random() * 256)
    },
    appendDiv () {
      this.busy = true
      setTimeout(() => {
        this.dataList.push('rgb(' + this.createRandomNum() + ',' + this.createRandomNum() + ',' + this.createRandomNum() + ')')
        this.busy = false
      }, 200)
    }
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  .scroll-area {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    overflow: scroll;
    .place {
      display: block;
    }
  }
}
</style>
