<script setup lang="ts">
import { MvMessageFn } from '@mdvui/components/Message'

function message() {
  MvMessageFn({
    duration: 2000,
    message: 'Hello World',
    type: 'success',
  })
}
</script>

<template>
  <mv-button class="mv-color-red" :ripple-color="'blue'" @click="message" v-text="'click'" />
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
