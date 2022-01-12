<script setup lang="ts">
import { MvMessageFn } from '@mdvui/components/Message'
import { ref } from 'vue'

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
    <input v-model="input" class="mdui-textfield-input" type="text" placeholder="error | info | success | warning">
  </div>
  <div class="btn">
    <mv-button v-ripple="'red'" class="mv-color-red" @click="message" v-text="'add message'" />
    <mv-button v-ripple="'black'" style="width: 500px; height: 500px" class="mv-color-red">
      Ripple
    </mv-button>
  </div>
</template>

<style lang="scss">

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
