/* import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
 */
import VueFactory from './../../vue-factory/src/index.js' 
import App from './App.vue'

const factory = new VueFactory()
factory.render(App, '#app')