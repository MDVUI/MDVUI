<script lang="ts" setup>
import type { MvComponentProps } from '@mdvui/utils/types'

interface IProps extends MvComponentProps{
  color?: string
}

const props = withDefaults(defineProps<IProps>(), {
  color: 'blue',
})
</script>
<template>
  <button
    class="mv-btn mdui-text-color-white"
    :class="[
      `mv-shadow-2`,
      `mv-color-${color}`
    ]"
  >
    <slot />
  </button>
</template>
