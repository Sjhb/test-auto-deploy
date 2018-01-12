<template>
  <div id="checkbox">
    <checkbox :disabled="false" v-model="test" :circle="false">tet</checkbox>
  </div>
</template>
<script>
  import checkbox from '@/component/checkbox'
  import '@/assets/checkbox.less'
  export default {
    name: 'checkboxExample',
    components: {
      checkbox
    },
    data () {
      return {
        test: ''
      }
    }
  }
</script>
<style lang="less" scoped>
  #checkbox {
    padding-top: 200px;
  }
</style>
