<script setup lang='ts'>
import { onMounted, watchEffect, provide, ref } from 'vue-demi';
import { useVModel } from '@vueuse/core';

const componentsName = 'Panel';

type ActiveNames = (string | number)[];
type Value = ActiveNames | string | number;

interface Props {
  value?: Value;
  accordion?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => [],
  accordion: false
});

const activeNames = ref(([] as ActiveNames).concat(props.value));
// 注入
provide('activeNames', activeNames);

watchEffect(() => {
  activeNames.value = ([] as ActiveNames).concat(props.value);
});

const emits = defineEmits<{
  (e: 'input' | 'change', value: Value): void;
  (e: 'update:value', value: Value): void;
}>();

const activeValue = useVModel(props, 'value', emits);

function handleClick(name: string | number): void {
  const index = activeNames.value.indexOf(name);
  if (index >= 0) {
    activeNames.value.splice(index, 1);
  } else {
    if (props.accordion) activeNames.value = [];
    activeNames.value.push(name);
  }
  const value = props.accordion ? activeNames.value[0] : activeNames.value;
  activeValue.value = value;
  emits('change', value);
  emits('input', value);
}
</script>

<template>
  <div class='mv-panel'>
    <slot></slot>
  </div>
</template>
