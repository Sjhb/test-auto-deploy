<template>
  <div class="shade" v-if="show">
    <slot name="loading"></slot>
  </div>
</template>
<script>
export default {
  name: 'shade',
  props: {
    show: Boolean
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="less" scoped>
 .shade {
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   display: flex;
   background-color: transport;
   justify-content: center;
   align-items: center;
   z-index: 100;
 }
</style>
