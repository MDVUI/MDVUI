<script lang='ts' setup>
import { ComponentInternalInstance, computed, getCurrentInstance, inject } from 'vue-demi';
import TransitionPanel from '../../../transition/panel.vue';

const self = getCurrentInstance() as ComponentInternalInstance;
const activeNames = inject('activeNames');

interface Props {
  label?: string,
  showIcon: boolean,
  name?: number | string,
}

const props = withDefaults(defineProps<Props>(), {
  showIcon: true
});

const isActive = computed((): boolean => {
  return activeNames.value.indexOf(props.name) >= 0;
});

const handleItemClick = (): void => {
  let parent = self.parent || self.root;
  const getName = () => parent.devtoolsRawSetupState.componentsName || parent.devtoolsRawSetupState.name;
  let name = getName();
  while (parent && (!name || name !== 'Panel')) {
    parent = parent.parent;
    if (parent) name = getName();
  }
  if (parent && parent.devtoolsRawSetupState) {
    parent = parent.devtoolsRawSetupState;
    parent.handleClick(props.name);
  }
};
</script>

<template>
  <div class='vm-panel-item' :class='{"is-active": isActive}'>
    <div class='vm-panel-item__title' @click='handleItemClick'>
      <div class='vm-panel-item__title--text'>
        <slot name='title'>{{ label }}</slot>
      </div>
      <i v-if='showIcon' class='vm-panel-item__title--icon mv-icon-expand_more'></i>
    </div>
    <transition-panel class='vm-panel-item__body' :show='isActive'>
      <div class='vm-panel-item__content'>
        <slot></slot>
      </div>
      <div class='vm-panel-item__footer' v-if='$slots.footer'>
        <slot name='footer'></slot>
      </div>
    </transition-panel>
  </div>
</template>
