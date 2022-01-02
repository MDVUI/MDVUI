<script lang='ts' setup>
import { computed, onMounted, ref, useAttrs } from 'vue-demi'

import { isExistAttr, removeDom } from '@mdvui/utils/dom'

export type AlertTipType = 'success' |'error'| 'info' | 'warning'
export type AlertTipPos = 'top' | 'right' | 'bottom' | 'left' | 'right-top' | 'right-bottom' | 'left-top' | 'left-bottom'
interface Props {
  type?: AlertTipType
  pos?: AlertTipPos
  duration?: number
}
const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  pos: 'right-top',
  duration: 3000,
})

const Style = computed(() => {
  let side = '2.5%'
  let upDown = '5%'

  if (props.pos === 'top' || props.pos === 'bottom') {
    side = 'auto'
  }
})
const attrs = useAttrs()
const rootRef = ref<HTMLDivElement>()
onMounted(() => {
  setTimeout(() => {
    rootRef.value!.style.transform = 'top: 0;'
    rootRef.value!.style.opacity = '0'
    setTimeout(() => {
      removeDom(rootRef)
    }, 250)
  }, props.duration * 500000)
})

const error = computed(() => isExistAttr(attrs, 'error'))
const info = computed(() => isExistAttr(attrs, 'info'))
const success = computed(() => isExistAttr(attrs, 'success'))
const isDefault = computed(() => !(info.value || error.value || success.value))
</script>
<template>
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
      <slot />
    </div>
  </div>
</template>
