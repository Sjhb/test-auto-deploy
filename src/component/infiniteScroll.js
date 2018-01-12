/**
* 组件设计原则
* 1、不能假设所依赖的外部环境
* 2、数据耦合，给定固定的数据就一定会输出相同的结果
* 滑动加载组件功能：
* 1、是否禁用当前组件：disabled
* 2、滑动到底触发的事件
* 3、滚动到底部触发事件的高度
*/
export default {
  name: 'vueInfiniteScroll',
  props: {
    distance: {
      type: Number,
      required: false,
      default: 10
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    // 容器滚动监听
    listenScroll(event) {
      if (this.disabled) {
        return
      }
      const scrollHeight = +event.target.scrollHeight
      const scrollTop = +event.target.scrollTop
      const clientHeight = +event.target.clientHeight
      if (scrollHeight - scrollTop - clientHeight <= this.distance) {
        this.$emit('infiniteScroll')
      }
    }
  },
  render(h) {
    return h('div', {
      attrs: {
        id: 'wh-scroll-container'
      },
      on: {
        scroll: this.listenScroll
      }
    }, this.$slots.default)
  }
}
