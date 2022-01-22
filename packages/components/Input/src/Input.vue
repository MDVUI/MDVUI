<script lang='ts' setup>
interface Props {
  label?: string

  /*
  * Color displayed by label when focus
  *
  * @default blue
  */
  labelFocusColor?: string

  /*
  * Color displayed by bottom line when focus
  *
  * @default blue
  */
  bottomFocusColor?: string

  /*
  * Color displayed by bottom line when hover
  *
  * @default black
  */
  bottomHoverColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Input something...',
  labelFocusColor: '',
  bottomFocusColor: 'blue',
  bottomHoverColor: 'black',
})
</script>

<template>
  <div class="mv-text-field">
    <input
      type="text"
      class="mv-text-filed-input"
    >
  </div>
</template>

<style lang='scss' scoped>

</style>
