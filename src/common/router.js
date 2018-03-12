import Vue from 'vue'
import Router from 'vue-router'
import home from '@/home.vue'
import repConfig from '@/views/repConfig.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: home,
    name: 'home'
  }, {
    path: '/repConfig',
    component: repConfig,
    name: 'repConfig'
  }]
})
