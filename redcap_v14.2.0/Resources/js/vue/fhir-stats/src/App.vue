<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import storeCallback from '@/store'
import routerCallback from '@/router'
import apiCallback from '@/API'

export default {
  storeCallback,
  routerCallback,
  apiCallback,
}
</script>

<style scoped>
#app >>> * {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
