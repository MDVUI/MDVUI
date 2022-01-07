<script lang="ts" setup>
interface Props {
  ripple?: boolean
  rippleColor?: string
  shadow?: number
}

const props = withDefaults(defineProps<Props>(), {
  ripple: true,
  rippleColor: 'white',
  shadow: 2,
})
</script>

<template>
  <button
    class="mdui-btn mv-color-blue mdui-text-color-white"
    :class="[
      ripple ? `mdui-ripple mdui-ripple-${rippleColor}`:'',
      `mdui-shadow-${shadow}`
    ]"
  >
    <slot />
  </button>
</template>
