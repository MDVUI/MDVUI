<script setup lang="ts">
import { MvMessageFn } from '@mdvui/components/Message'
import { useGlobalConfig } from '@mdvui/hooks/use-global-config'

console.log(useGlobalConfig())
function message() {
  MvMessageFn({
    duration: 5000,
    message: 'Hello World',
    type: 'error',

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
