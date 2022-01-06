<script lang='ts' setup>
import type { VNode } from 'vue-demi'
import { computed, onBeforeMount, ref, watch } from 'vue-demi'
import type { MessagePos, MessageType } from '@mdvui/components/Message/src/message-types'

export interface IMessageProps {
  type?: MessageType
  pos?: MessagePos
  duration?: number
  showClose?: boolean
  zIndex?: number
  message?: string | VNode
  offset?: number
  onDestroy?: () => void
}

const props = withDefaults(defineProps<IMessageProps>(), {
  type: 'info',
  pos: 'right-top',
  duration: 3000,
  showClose: false,
  message: '',
  offset: 20,
  onDestroy: () => {},
})

const Style = computed(() => {
  const top = `${props.offset}px`
  let side = '2.5%'
  let upDown = '5%'

  if (props.pos === 'top' || props.pos === 'bottom') {
    side = 'auto'
  }

  return {
    zIndex: props.zIndex,
    top,
  }
})

const error = computed(() => props.type === 'error')
const info = computed(() => props.type === 'info')
const success = computed(() => props.type === 'success')
const isDefault = computed(() => !!props.type)

const render = ref(true)
onBeforeMount(() => {
  setTimeout(() => {
    render.value = false
  }, props.duration)
})

function destroy() {
  props.onDestroy()
}
</script>
<template>
  <transition
    name="mv-message-fade"
    @after-leave="destroy"
  >
    <div
      v-if="render"
      ref="rootRef"
      class="mv-message mv-text-color-white mv-shadow-3"
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
