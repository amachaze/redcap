<template>
  <div id="glass-breaker-app" v-if="!loading">
    <span class="badge badge-warning small" v-if="debug">DEBUG MODE</span>
    <Dashboard />
    <!-- the debug component will only show in development -->
    <Debug v-if="debug"/>
  </div>
</template>

<script>


// form validation
import Vuelidate from 'vuelidate'
import storeCallback from '@/store'
import apiCallback from '@/API'

// import AsyncModal from '@/components/AsyncModal'
/**
 * perform Vue related customizations
 */
const initCallback = (VueFactory) => {
  const Vue = VueFactory.Vue
  Vue.use(Vuelidate)
}


import Dashboard from '@/components/Dashboard'
import Debug from '@/components/debug/Debug'

export default {
  storeCallback,
  apiCallback,
  initCallback,
  components: { Dashboard, Debug, },
  data() {
    return {
      loading: false,
    }
  },
  async created() {
    const isEnv = this.$store.getters['env']=='development'
    this.$store.dispatch('setDebug', isEnv)
    await this.fetchSettings()
  },
  computed: {
    debug() { return this.$store.state.debug }
  },
  methods: {
    toggleDebug() { this.$store.dispatch('setDebug', !this.debug) },
    async fetchSettings() {
      try {
        this.loading = true
        await this.$store.dispatch('settings/fetchSettings', this)
      } catch (error) {
        console.log(error)
      }finally {
        this.loading = false
      }
    }
  },
}
</script>

<style>
#glass-breaker-app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
