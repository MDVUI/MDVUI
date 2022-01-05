<script lang='ts' setup>
import type { VNode } from 'vue-demi'
import { computed, onMounted, ref } from 'vue-demi'
import { removeDom } from '@mdvui/utils/dom'
import type { MessagePos, MessageType } from '@mdvui/components/Message/src/message-types'

export interface IMessageProps {
  type?: MessageType
  pos?: MessagePos
  duration?: number
  showClose?: boolean
  zIndex?: number
  message?: string | VNode
}
export interface IMessageEmits {
  (e: 'destroy'): void
}

const props = withDefaults(defineProps<IMessageProps>(), {
  type: 'info',
  pos: 'right-top',
  duration: 3000,
  showClose: false,
  message: '',
})

const emits = defineEmits<IMessageEmits>()

const Style = computed(() => {
  let side = '2.5%'
  let upDown = '5%'

  if (props.pos === 'top' || props.pos === 'bottom') {
    side = 'auto'
  }

  return {
    zIndex: props.zIndex,
  }
})

const error = computed(() => props.type === 'error')
const info = computed(() => props.type === 'info')
const success = computed(() => props.type === 'success')
const isDefault = computed(() => !!props.type)

const rootRef = ref<HTMLDivElement>()
onMounted(() => {
  setTimeout(() => {
    rootRef.value!.style.transform = 'top: 0;'
    rootRef.value!.style.opacity = '0'
    setTimeout(() => {
      removeDom(rootRef)
    }, 250)
  }, props.duration)
})

function destroy() {
  emits('destroy')
}
</script>
<template>
  <transition
    name="mv-message-fade"
    @after-leave="destroy"
  >
    <div
      ref="rootRef"
      class="mv-alert-tip mdui-text-color-white mv-shadow-3"
      :class="[
        info ? 'mv-color-blue': '',
        error ? 'mv-color-red': '',
        success ? 'mv-color-green': '',
        isDefault ? 'mv-color-blue' : ''
      ]"
      :style="Style"
    >
      <i class="mdui-icon material-icons" v-html="error || info || isDefault ? 'info': 'done'" />
      <div class="mv-alert-tip-slot">
        {{ message }}
      </div>
    </div>
  </transition>
</template>
