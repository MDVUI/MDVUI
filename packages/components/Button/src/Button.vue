<script lang="ts" setup>
interface Props {
  shadow?: number
}

const props = withDefaults(defineProps<Props>(), {
  shadow: 2,
})
</script>

<template>
  <button
    class="mdui-btn mv-color-blue mdui-text-color-white"
    :class="[
      `mv-shadow-${shadow}`
    ]"
  >
    <slot />
  </button>
</template>
