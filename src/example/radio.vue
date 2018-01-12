<template>
  <div id="radio">
    <radio v-model="test" :circle="true" :name="'haha'" :label="'t'">t</radio><br>
    <radio v-model="test" :circle="true" :name="'haha'" :label="'e'">e</radio><br>
    <radio v-model="test" :circle="true" :name="'haha'" :label="'s'">s</radio><br>
    <radio v-model="test" :circle="true" :name="'haha'" :label="'o'">o</radio><br>
  </div>
</template>
<script>
  import radio from '@/component/radio'
  import '@/assets/radio.less'
  export default {
    name: 'radioExample',
    components: {
      radio
    },
    data () {
      return {
        test: 't'
      }
    }
  }
</script>
<style lang="less" scoped>
  #radio {
    padding-top: 200px;
  }
</style>
