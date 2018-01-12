/**
* 组件设计原则
* ## 不能假设所依赖的外部环境
* ## 数据耦合，给定固定的数据就一定会输出相同的结果
*
* 滑动加载组件功能：
* ## 是否禁用当前组件：disabled
* ## 状态绑定：选中项
* ## 形状圆形、正方形
* ## 警告状态：danger
*/

export default {
  name: 'vueRadio',
  props: {
    disabled: Boolean,
    label: String,
    circle: Boolean,
    danger: Boolean,
    name: [String, Number],
    value: String
  },
  data () {
    return {}
  },
  computed: {
    checked () {
      return this.label === this.value
    }
  },
  render (h) {
    const self = this
    return h('label', {
      'class': {
        'w-radio-define': true,
        'w-radio-define__disabled': self.disabled,
        'w-radio-define__danger': self.danger
      }
    }, [
      h('span', {
        attrs: {
          'class': 'w-radio-span'
        }
      }, [
        h('span', {
          attrs: {
          },
          'class': {
            'w-radio-spaninner__checked': self.checked,
            'w-radio-spaninner': true,
            'w-radio-spaninner__circle': self.circle
          }
        }),
        h('input', {
          attrs: {
            'class': 'w-radio-input',
            type: 'radio',
            checked: self.checked,
            disabled: self.disabled,
            name: self.name,
            value: self.label
          },
          on: {
            change (event) {
              self.$emit('input', event.target.value)
            }
          }
        }, [])
      ]),
      h('span', {
        attrs: {
          'class': 'w-radio-label'
        }
      }, this.$slots.default)
    ])
  }
}
