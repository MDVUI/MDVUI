<script lang='ts' setup>
import type { VNode } from 'vue-demi'
import { computed, onMounted, ref } from 'vue-demi'
import type { MessageType } from '@mdvui/components/Message/src/message-types'

export interface IMessageProps {
  id?: number
  type?: MessageType
  duration?: number
  showClose?: boolean
  zIndex?: number
  message?: string | VNode
  offset?: number
  onDestroy?: () => void
  onClose?: () => void
}

const props = withDefaults(defineProps<IMessageProps>(), {
  type: 'info',
  duration: 3000,
  showClose: false,
  message: '',
  offset: 20,
  onDestroy: () => {},
  onClose: () => {},
})

const Style = computed(() => ({
  top: `${props.offset}px`,
  zIndex: props.zIndex,
}))

const error = computed(() => props.type === 'error')
const info = computed(() => props.type === 'info' || (props.type !== 'success' && props.type !== 'error' && props.type !== 'warning'))
const success = computed(() => props.type === 'success')
const warning = computed(() => props.type === 'warning')

const render = ref()
onMounted(() => {
  startTimer()
  render.value = true
})

function startTimer() {
  setTimeout(() => {
    close()
  }, props.duration)
}

function destroy() {
  props.onDestroy()
}

function close() {
  render.value = false
}
</script>
<template>
  <transition
    name="mv-message-fade"
    @before-leave="onClose"
    @after-leave="destroy"
  >
    <div
      v-show="render"
      ref="rootRef"
      class="mv-message mv-text-color-white mv-shadow-3"
      :class="[
        info ? 'mv-color-blue': '',
        error ? 'mv-color-red': '',
        success ? 'mv-color-green': '',
        warning ? 'mv-color-orange': ''
      ]"
      :style="Style"
    >
      <i class="mdui-icon material-icons" v-html="error || info ? 'info': warning ? 'warning' : 'done'" />
      <div class="mv-alert-tip-slot">
        {{ message }}
      </div>
    </div>
  </transition>
</template>
