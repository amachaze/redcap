<template>
  <div id="app">
    <b-overlay :show="status !== status_list.STATUS_READY" rounded="sm" :opacity=".90" blur="5px">
        <router-view />
        {{ test }}
    </b-overlay>
    <div v-if="status == status_list.STATUS_ERROR">
      <pre>{{ error }}</pre>
    </div>
  </div>
</template>

<script>
import storeCallback from "@/store"; // store
import routerCallback from "@/router"; //router
import apiCallback from '@/API'

import Vuelidate from "vuelidate";
import NonBlankSpace from "@/components/NonBlankSpace";

const initCallback = (VueFactory) => {
  const Vue = VueFactory.Vue
  /* Vuelidate */
  Vue.use(Vuelidate);
  Vue.component("non-blank-space", NonBlankSpace);
}

const STATUS_LOADING = "loading";
const STATUS_READY = "ready";
const STATUS_ERROR = "error";

export default {
  storeCallback,
  routerCallback,
  apiCallback,
  initCallback,
  data() {
    return {
      status: null,
      error: "",
      status_list: { STATUS_LOADING, STATUS_READY, STATUS_ERROR },
    };
  },
  created() {
    this.$root.$on("settings:updated", this.init)
    this.$root.$on("settings:saved", this.onSettingsSaved)
    this.$root.$on("settings:canceled", this.onSettingsCanceled)
    this.$root.$on("settings:error", this.onSettingsError)
    this.init();
  },
  destroyed() {
    this.$root.$off("settings:updated", this.init)
    this.$root.$off("settings:saved", this.onSettingsSaved)
    this.$root.$off("settings:canceled", this.onSettingsCanceled)
    this.$root.$off("settings:error", this.onSettingsError)
  },
  computed: {
    test() {
      return this.$store.state.settings.test
    },
  },
  methods: {
    onSettingsSaved() {
      this.init();
    },
    onSettingsCanceled() {
      this.init();
    },
    onSettingsError() {
      console.log("error detected");
    },
    async init() {
      // try {
        this.status = STATUS_LOADING;
        const app_settings = await this.loadSettings()
        const { mapping, errors=[] } = app_settings
        if(errors.length>0) {
          let errorMessage = 'error loading the CDP mapping tool'
          for (const error of errors) {
            const {detail=''} = error
            errorMessage += `\n${detail}`
          }
          alert(errorMessage)
          return
        }
        // generate the state of the current mapping
        await this.$store.dispatch("mapping/makeList", mapping)
        // sort by 'FHIR'
        await this.$store.dispatch('mapping/sortBy', 'fhir')
        // initialize the user settings from the server settings
        await this.$store.dispatch("settings/init", app_settings)
        // init the FHIR fields store
        await this.initSelect(app_settings)
        this.status = STATUS_READY
      // } catch (error) {
        // this.setError(error)
      // }
    },
    setError(error) {
      this.status = STATUS_ERROR
      this.error = error
    },
    async initSelect({ fhir_fields }) {
      // const {fhir_fields} = this.$store.state.settings
      const cloned_fields = JSON.parse(JSON.stringify(fhir_fields))
      let fields_list = Object.values(cloned_fields); // just get the values as array
      await this.$store.dispatch("fhir_fields_select/setFields", fields_list)
      this.ready = true
    },
    async loadSettings() {
      const response = await this.$API.dispatch("settings/get")
      const { data: settings = {} } = response
      await this.$store.dispatch("app_settings/setState", settings)
      return settings
    },
  },
};
</script>

<style scoped>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* color: #2c3e50; */
  max-width: 800px;
}
#app >>> .alert {
    border-color: rgba(0,0,0,0.1) !important;
}
#app >>> .alert.alert-warning {
    border-color: #ffeeba !important;
}
</style>
