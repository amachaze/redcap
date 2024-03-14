<template>
  <div class="vue-factory">
    <slot></slot>
  </div>
</template>

<script>
// this wrapping component will contain the "real" component in the slot element
export default {
  /* created() {
    const onError = window.onerror
    window.onerror = (error) => {
      console.log(error, error.stack)
      if(typeof onError == 'function') onError()
    }
  } */
}
</script>

<style scoped>
.vue-factory {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

<style>
/* reapply this rule since it is overridden by the chunck-vendors CSS */
.rcproject-navbar {
  display: none !important;
}
</style>
