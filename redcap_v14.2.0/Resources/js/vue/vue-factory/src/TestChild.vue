<template>
  <div>hello from TestChild</div>
</template>

<script>
import apiCallback from '@/API/callbackTemplate'

export default {
  apiCallback,
  mounted() {
    console.log('mounted')
  },
  initCallback() {
    console.log('initializing test child')
  },

}
</script>

<style>

</style>