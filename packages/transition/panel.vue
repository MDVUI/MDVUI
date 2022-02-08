<script lang='ts' setup>
import { addClass, removeClass } from '../utils/dom';

type Dom = any

interface Props {
  show: boolean
}

const className = 'panel-transition';

const props = withDefaults(defineProps<Props>(), {
  show: true
});

const onTransition = {
  beforeEnter(dom: Dom) {
    addClass(dom, className);
    if (!dom.dataset) dom.dataset = {};
    dom.dataset.oldPaddingTop = dom.style.paddingTop;
    dom.dataset.oldPaddingBottom = dom.style.paddingBottom;

    dom.style.height = '0';
    dom.style.paddingTop = 0;
    dom.style.paddingBottom = 0;
  },
  enter(dom: Dom) {
    dom.dataset.oldOverflow = dom.style.overflow;
    if (dom.scrollHeight !== 0) {
      dom.style.height = dom.scrollHeight + 'px';
      dom.style.paddingTop = dom.dataset.oldPaddingTop;
      dom.style.paddingBottom = dom.dataset.oldPaddingBottom;
    } else {
      dom.style.height = '';
      dom.style.paddingTop = dom.dataset.oldPaddingTop;
      dom.style.paddingBottom = dom.dataset.oldPaddingBottom;
    }

    dom.style.overflow = 'hidden';
  },
  afterEnter(dom: Dom) {
    removeClass(dom, className);
    dom.style.height = '';
    dom.style.overflow = dom.dataset.oldOverflow;
  },
  beforeLeave(dom: Dom) {
    if (!dom.dataset) dom.dataset = {};
    dom.dataset.oldPaddingTop = dom.style.paddingTop;
    dom.dataset.oldPaddingBottom = dom.style.paddingBottom;
    dom.dataset.oldOverflow = dom.style.overflow;

    dom.style.height = dom.scrollHeight + 'px';
    dom.style.overflow = 'hidden';
  },
  leave(dom: Dom) {
    if (dom.scrollHeight !== 0) {
      // for safari: add class after set height, or it will jump to zero height suddenly, weired
      addClass(dom, className);
      dom.style.height = 0;
      dom.style.paddingTop = 0;
      dom.style.paddingBottom = 0;
    }
  },
  afterLeave(dom: Dom) {
    removeClass(dom, className);
    dom.style.height = '';
    dom.style.overflow = dom.dataset.oldOverflow;
    dom.style.paddingTop = dom.dataset.oldPaddingTop;
    dom.style.paddingBottom = dom.dataset.oldPaddingBottom;
  }
};
</script>

<template>
  <transition v-on='onTransition'>
    <div v-show='show' v-bind='$attrs'>
      <slot></slot>
    </div>
  </transition>
</template>

<style>
.panel-transition {
  transition-duration: .3s;
  transition-timing-function: ease-in-out;
  transition-property: height, padding-top, padding-bottom;
}
</style>