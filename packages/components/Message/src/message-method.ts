import type { VNode } from 'vue-demi'
import { debugWarn } from '@mdvui/utils/error'
import { PopupManager } from '@mdvui/utils/popup-manager'
import { createVNode, isVNode, render } from 'vue-demi'
import MessageConstructor from './Message.vue'
import type { IMessageProps } from './Message.vue'

interface MessageOptions extends IMessageProps {
  appendTo?: HTMLElement | string
}

const message = (options: MessageOptions | string) => {
  if (typeof options === 'string') {
    options = { message: options }
  }
  let appendTo: HTMLElement | null = document.body

  if (typeof options.appendTo === 'string') {
    appendTo = document.querySelector(options.appendTo)
  }
  if (!(appendTo instanceof HTMLElement)) {
    debugWarn('MvMessage', 'the appendTo option is not an HTMLElement. Falling back to document.body.')
    appendTo = document.body
  }

  const props = {
    zIndex: PopupManager.nextZIndex(),
    ...options,
  }

  const container = document.createElement('div')
  container.className = 'mv-container'

  const vm = createVNode(
    MessageConstructor,
    props,
    isVNode(props.message) ? { default: () => props.message } : null,
  )

  vm.props!.onDestroy = () => {
    render(null, container)
  }

  render(vm, container)

  appendTo.appendChild(container)
}

export default message
