<script setup lang="ts">
import { MvMessageFn } from '@mdvui/components/Message'
import { ref } from 'vue-demi'

const input = ref()

function message() {
  MvMessageFn({
    duration: 2000,
    message: 'Test',
    type: input.value,
  })
}
</script>

<template>
  <div class="mdui-textfield" style="width: 50%; margin: 0 auto">
    <input v-model="input" class="mdui-textfield-input" type="text" placeholder="error | info | success">
  </div>
  <mv-button class="mv-color-red" :ripple-color="'blue'" @click="message" v-text="'click'" />
  <button v-ripple class="mdui-btn">
    111
  </button>
</template>

<style lang="scss">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

}
</style>
