import Vue from 'vue'
import App from './App.vue'
import router from './common/router'

new Vue({
  el: '#app',
  router,
  component: {App},
  render: h => h(App)
})
