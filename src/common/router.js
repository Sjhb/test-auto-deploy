import Vue from 'vue'
import Router from 'vue-router'
import home from '@/home.vue'
import infiniteScroll from '@/example/infiniteScroll.vue'
import checkbox from '@/example/checkbox.vue'
import radio from '@/example/radio.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: home,
    name: 'home'
  }, {
    path: '/infiniteScroll',
    component: infiniteScroll,
    name: 'infiniteScroll'
  }, {
    path: '/checkbox',
    component: checkbox,
    name: 'checkbox'
  }, {
    path: '/radio',
    component: radio,
    name: 'radio'
  }]
})
