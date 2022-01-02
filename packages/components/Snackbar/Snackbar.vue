<script lang='ts' setup>
import { computed } from 'vue-demi'

type SnackbarType = 'success' |'error'| 'info' | 'warning'
type SnackbarPos = 'top' | 'right' | 'bottom' | 'left' | 'right-top' | 'right-bottom' | 'left-top' | 'left-bottom'

interface Props {
  type?: SnackbarType
  pos?: SnackbarPos
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  pos: 'right-top',
})

const posStyle = computed(() => {
  let side = '2.5%'
  let upDown = '5%'
  if (props.pos === 'top' || props.pos === 'bottom') {
    side = 'auto'
  } else if (props.pos === 'left-top' || props.pos === 'right-top') {
  }
})
</script>
<template>
  <div class="mv-snackbar mdui-shadow-2 mdui-text-color-white">
    <slot />
  </div>
</template>
