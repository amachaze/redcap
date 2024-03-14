import * as vue from 'vue'
import * as pinia from 'pinia'
import * as vueRouter from 'vue-router'
import axios from 'axios'
import RcUtils from 'rc-utils'

/* export const libs = {
    vue: vue,
    pinia: pinia,
    vueRouter: vueRouter,
    axios: {...axios}
} */

export class Maker {
    
    #app

    constructor(app) {
        /* const {createApp} = vue
        console.log(component, createApp)
        const app = createApp(component) */
        this.#app = app
    }

    get app() { return this.#app }

    addPinia(storeCallback) {
        const {createPinia} = pinia
        const piniaInstance = createPinia()
        this.#app.use(piniaInstance)
        if(typeof storeCallback === 'function') {
            const store = storeCallback(pinia) // add a reference to pinia
            this.#app.provide('$store', store)
        }
        return this // allows chaining
    }

    addPlugin(plugin, options={}) {
        this.#app.use(plugin, options)
        return this
    }

    addRcUtils() {
        /* const rcUtilsPath = '../rc-utils/index.js'
        const modules = import.meta.glob('../rc-utils/index.js', { eager: true })
        const RcUtils = modules[rcUtilsPath]?.default */
        this.addPlugin(RcUtils)
        return this
    }

    mount(target) {
        this.#app.mount(target)
        return this // chaining
    }
}