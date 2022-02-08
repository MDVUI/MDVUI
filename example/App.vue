<script setup lang='ts'>
import { MvMessageFn } from '@mdvui/components/Message';
import { ref } from 'vue';
import type { MessageType } from '@mdvui/components/Message/src/message-types';

const input = ref<MessageType>('info');
const panelAccordion = ref(false);
const panelValue = ref([]);

function message() {
  MvMessageFn({
    duration: 2000,
    message: 'Test',
    type: input.value || 'info'
  });
}

function setPanel(value) {
  panelValue.value = value;
}

function onPanelChange(value) {
  panelValue.value = value;
}
</script>

<template>
  <div class='mdui-textfield' style='width: 50%; margin: 0 auto'>
    <input v-model='input' class='mdui-textfield-input' type='text' placeholder='error | info | success | warning'>
  </div>
  <div class='btn'>
    <m-button v-ripple :color="'red-light-1'" @click='message' v-text="'add message'" />
    <m-button v-ripple style='width: 300px; height: 200px' class='mv-color-red'>
      Ripple
    </m-button>
  </div>
  <m-icon class='mv-icon mv-icon-horizontal_split' />
  <div>
    <m-button @click='panelAccordion = !panelAccordion'>Panel Accordion {{ panelAccordion }}</m-button>
    <m-button @click='setPanel(["1"])' style='margin-left: 10px;'>Panel Set Value 1</m-button>
    <m-button @click='setPanel(["2"])' style='margin-left: 10px;'>Panel Set Value 2</m-button>
  </div>
  <m-panel v-model:value='panelValue' :accordion='panelAccordion'>
    <m-panel-item label='panel-item 1' name='1'>panel-item</m-panel-item>
    <m-panel-item label='panel-item 2' name='2'>panel-item</m-panel-item>
    <m-panel-item label='panel-item 3' name='3'>
      panel-item
      <template v-slot:footer>
        panel-item footer
      </template>
    </m-panel-item>
  </m-panel>
</template>

<style lang='scss'>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  .btn {
    position: relative;
    display: flex;
    width: 100vw;
    flex-direction: column;
    align-items: center;
  }
}
</style>
