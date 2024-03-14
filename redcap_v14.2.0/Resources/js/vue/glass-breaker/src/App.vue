<template>
  <header>
    <!-- <rc-modal ref="modal">saass</rc-modal> -->
    <rc-checkbox>asda</rc-checkbox>
    <!-- <a href="#" @click="increment">{{store.settings.counter}}</a> -->
    <span >{{counter}}</span>
    <span @click="increment">{{count}}</span>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <!-- <rc-modal>saass</rc-modal> -->
    </div>
  </header>

  <main>

  </main>
</template>

<script>
import {store, pinia} from './store'


export default {
  data: () => {
    const {storeToRefs} = pinia
    const {counter} = storeToRefs(store.settings)
    return {
      store,
      count: 3,
      counter,
    }
  },

  methods: {
    increment() {
      // this.$showModal({title:'thshs',body:'asda'})
      // this.$toast({title:'thshs',body:'asda'})
      // this.$refs.modal.show()
      // console.log(12313123)
      this.count++
      // this.counter++
      this.store.settings.increment()
    }
  }

}


</script>

<style scoped>

</style>
