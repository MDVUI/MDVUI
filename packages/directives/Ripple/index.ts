import type { MvDirective } from '@mdvui/utils/types'

const RippleDirective: MvDirective = {
  name: 'ripple',
  mounted(el, binding) {
    const color = binding.arg || 'white'
    const container = document.createElement('div')
    container.className = `mv-ripple mv-ripple-${color}`

    el.appendChild(container)
  },
}

export default RippleDirective
