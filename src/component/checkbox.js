/**
* 组件设计原则
* ## 不能假设所依赖的外部环境
* ## 数据耦合，给定固定的数据就一定会输出相同的结果
*
* 滑动加载组件功能：
* ## 是否禁用当前组件：disabled
* ## 状态绑定：是否选中
* ## 形状圆形、正方形
* ## 警告状态：danger
*/

export default {
  name: 'vueCheckbox',
  props: {
    disabled: Boolean,
    checked: Boolean,
    value: String,
    circle: Boolean,
    danger: Boolean
  },
  data () {
    return {}
  },
  model: {
    prop: 'checked',
    event: 'change'
  },
  render (h) {
    const self = this
    return h('label', {
      'class': {
        'w-checkbox-define': true,
        'w-checkbox-define__disabled': self.disabled,
        'w-checkbox-define__danger': self.danger
      }
    }, [
      h('span', {
        attrs: {
          'class': 'w-checkbox-span'
        }
      }, [
        h('span', {
          attrs: {
          },
          'class': {
            'w-checkbox-spaninner__checked': self.checked,
            'w-checkbox-spaninner': true,
            'w-checkbox-spaninner__circle': self.circle
          }
        }),
        h('input', {
          attrs: {
            'class': 'w-checkbox-input',
            type: 'checkbox',
            checked: self.checked,
            disabled: self.disabled
          },
          on: {
            change (event) {
              self.$emit('change', event.target.checked)
            }
          }
        }, [])
      ]),
      h('span', {
        attrs: {
          'class': 'w-checkbox-label'
        }
      }, this.$slots.default)
    ])
  }
}
