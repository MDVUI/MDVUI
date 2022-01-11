import type { VNode } from 'vue-demi'
import { debugWarn } from '@mdvui/utils/error'
import { PopupManager } from '@mdvui/utils/popup-manager'
import { createVNode, isVNode, render } from 'vue-demi'
import MessageConstructor from './Message.vue'
import type { IMessageProps } from './Message.vue'

interface MessageOptions extends IMessageProps {
  appendTo?: HTMLElement | string
}

interface MessageVNode extends VNode{
  container?: HTMLElement
}

let instances: MessageVNode[] = []
let seed = 0

const message = (options: MessageOptions | string) => {
  if (typeof options === 'string') {
    options = { message: options }
  }
  let appendTo: HTMLElement | null = document.body

  if (typeof options.appendTo === 'string') {
    appendTo = document.querySelector(options.appendTo)
  }
  if (!(appendTo instanceof HTMLElement)) {
    debugWarn('MvMessage', 'The appendTo option is not an HTMLElement. Falling back to document.body.')
    appendTo = document.body
  }

  const props = {
    zIndex: PopupManager.nextZIndex(),
    id: seed++,
    onClose: () => {
      close(seed - 1)
    },
    ...options,
  }

  let verticalOffset = options.offset || 20
  instances.forEach((vInstance) => {
    verticalOffset += (vInstance.el?.offsetHeight || 0) + 16
  })

  props.offset = verticalOffset

  const container = document.createElement('div')
  container.className = 'mv-message-container'

  const vm: MessageVNode = createVNode(
    MessageConstructor,
    props,
    isVNode(props.message) ? { default: () => props.message } : null,
  )

  vm.props!.onDestroy = () => {
    render(null, container)
  }

  vm.container = container
  instances.push(vm)
  render(vm, container)

  appendTo.appendChild(container)

  return {
    close: () => close(vm.props!.id as number),
  }
}

export const close = (vmId: number) => {
  const idx = instances.findIndex(vm => vm.props!.id = vmId)

  if (idx === -1) {
    return
  }

  const vm = instances[idx]
  const removedHeight = vm.el!.offsetHeight

  instances[idx].container!.remove()
  instances.splice(idx, 1)

  const len = instances.length
  if (len === 0) {
    return
  }

  for (let i = 0; i < len; i++) {
    // TODO Why when using `offsetHeight` will cause bug? And use `style.top` it will be ok?
    const pos = parseInt(instances[i].el!.style.top, 10) - removedHeight - 16

    instances[i].component!.props.offset = pos
  }
}

export default message
