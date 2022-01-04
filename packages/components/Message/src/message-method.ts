import type { VNode } from 'vue-demi'
import { isVNode } from 'vue-demi'
import MessageConstructor from './Message.vue'
import type { IMessageProps } from './Message.vue'

interface MessageOptions extends IMessageProps {
  message: string | VNode
}

const message = (options: MessageOptions | string) => {
  if (typeof options === 'string') {
    options = { message: options }
  }
}

export default message
