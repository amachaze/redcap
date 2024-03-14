/**
 * all libraries are loaded here
 */

 /* import Vue from 'vue'
  
 import Vuex from 'vuex'
 import VueRouter from 'vue-router'
 
 // FontAwesome
 import { library } from '@fortawesome/fontawesome-svg-core'
 import { fas } from '@fortawesome/free-solid-svg-icons'
 library.add(fas)
 
 import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome'
 Vue.component('font-awesome-layers', FontAwesomeLayers)
 Vue.component('font-awesome-layers-text', FontAwesomeLayersText)
 Vue.component('font-awesome-icon', FontAwesomeIcon)
 
 
 if(process.env.NODE_ENV==='development') {
   // load the CSS only in development
   import ('bootstrap/dist/css/bootstrap.css')
 }
 import 'bootstrap-vue/dist/bootstrap-vue.css'
 import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
 Vue.use(BootstrapVue)
 Vue.use(IconsPlugin)
 
import {API} from './API' */


/**
 * expose globally some libraries
 */
/* const setGlobalVariables = () => {
  const namespace = '__VUE_HOC'
  const exposeVariable = (key, value) => {
    if(!Array.isArray(window[namespace])) window[namespace]=[]
    window[namespace][key] = value
  }
  for( let[key, value] of Object.entries({Vue, Vuex, VueRouter, BootstrapVue}) ) exposeVariable(key, value)
}

setGlobalVariables() */


// import App from './App'
import { install } from './install'
class VueFactory {

  store = null
  router = null
  libraries = {}
  id = null
  Vue = null
  plugins = {}

  constructor(Vue) {
    this.init(Vue)
    /* if(!Array.isArray(window.vueInstances)) window.vueInstances = []
    window.vueInstances.push(this.Vue) */
    this.id = `${Math.random()}_${(new Date()).getTime()}`
    this.setPluginInjector()
  }

   init(Vue) {
     if(!Vue) {
       let {default: _Vue} = require('vue')
       Vue = _Vue
     }

    if(process.env.NODE_ENV==='development') Vue.config.productionTip = false
    
    // const {default: Vuex} = require('vuex')
    // const {default: VueRouter} = require('vue-router')
    
    // FontAwesome
    const { library } = require('@fortawesome/fontawesome-svg-core')
    const { fas } = require('@fortawesome/free-solid-svg-icons')
    library.add(fas)
    
    const { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } = require('@fortawesome/vue-fontawesome')
    Vue.component('font-awesome-layers', FontAwesomeLayers)
    Vue.component('font-awesome-layers-text', FontAwesomeLayersText)
    Vue.component('font-awesome-icon', FontAwesomeIcon)
    
    
    if(process.env.NODE_ENV==='development') {
      // load the CSS only in development
      require ('bootstrap/dist/css/bootstrap.css')
    }
    require( 'bootstrap-vue/dist/bootstrap-vue.css')
    const { BootstrapVue, IconsPlugin } = require('bootstrap-vue')
    Vue.use(BootstrapVue)
    Vue.use(IconsPlugin)

    this.addLibrary('BootstrapVue', BootstrapVue)

    this.Vue = Vue
  }

  addLibrary(key, library) {
    this.libraries[key] = library
  }

  /**
   * connect libraries to the component and return the render function
   * @param {object} component 
   * @returns function
   */
  loadComponent(component) {
    // this.addLibrary('BootstrapVue', BootstrapVue) // set a reference to BootstrapVue
    if('initCallback' in component) component.initCallback(this)
    if('apiCallback' in component) this.setApi(component.apiCallback)
    if('storeCallback' in component) this.setStore(component, component.storeCallback)
    if('routerCallback' in component) this.setRouter(component, component.routerCallback)
    // inject libraries into the component so can be imported locally
    // component.__LIBRARIES = {...this.libraries}
    window.__VUE_FACTORY = {}
    window.__VUE_FACTORY[this.id] = {...this.libraries}
    component.__getLibraries  = () => {
      console.log(this.id)
      return {...this.libraries}
    }
    component.__LIBRARIES  = {...this.libraries}

    return component
  }

  setPluginInjector() {
      const plugin = {install}
      this.Vue.use(plugin)
  }

  /**
   * register a plugin
   * it will be attached to all components on beforeCreate by the PluginInjector
   * @param {string} key the identifier of the plugin
   * @param {function|object} plugin the plugin
   */
  addPlugin(key, plugin) {
    this.plugins[key] = plugin
  }

  /**
   * init Vuex for a component
   * @param {function} callback 
   * @param {object} store 
   */
  setStore(component, callback) {
    const {default: Vuex} = require('vuex')
    this.Vue.use(Vuex)
    this.addLibrary('Vuex', Vuex) // set a reference to Vuex
    let context = {VueFactory:this}
    this.store = callback(context, Vuex)
  }

  setRouter(component, callback) {
    const VueRouter = require('vue-router')
    this.Vue.use(VueRouter)
    this.addLibrary('VueRouter', VueRouter) // set a reference to VueRouter
    let context = {VueFactory:this}
    this.router = callback(context, VueRouter)
  }

  setApi(callback) {
    const {API} = {...require('./API')}
    let context = {VueFactory:this}
    const api = callback.call(this, context, API)
    this.addPlugin('$API', api)
  }

  /**
   * init a component, wrap it in the App and render to the target.
   * 
   * the wrapper, which is the root element in the App, will
   * have a reference to the store and the router if provided by the components callbacks
   * 
   * @param {object} component 
   * @param {string} target 
   * @returns 
   */
  async render(component, target='#app') {
    // helper function to extract the default element from a module
    const extractComponent = async (c) => {
      if('__esModule' in c) return c.default // module loaded using require('./something')

      if(typeof c !== 'function') return c // exit if the component is not async

      let {default: comp} = await c() // module loaded with () => import('./something')
      return comp
    }
    component = await extractComponent(component)
    // do not use @ when importing; depending on where you are serving the app, the path will change!
    // const App = await extractComponent(() => import('./App'))
    const {default: App} = require('./App')
    
    const initialized = this.loadComponent(component)

    let wrapper = new this.Vue({
      store: this.store,
      router: this.router,
      api: this.api,
      plugins: {...this.plugins},
      render: h => h(App, [h(initialized)]),
      /* mounted() {
        const child1 = this.$children[0]
        console.log(child1, child1.$root, child1.$API)
      } */
    })

    wrapper.$mount(target)
    
    return wrapper.$children[0].$children[0]
  }
}

export {VueFactory as default}