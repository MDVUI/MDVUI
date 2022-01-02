<script setup lang="ts">

</script>

<template>
  <MvButton class="mdui-color-red-50" :ripple-color="'red'">
    Hi
  </MvButton>
  <MvSnackbar>
    这是一条提示
  </MvSnackbar>
</template>

<style lang="scss">
@import "packages/styles/index";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

}
</style>
