export let _Vue

export function install (Vue, config=null) {
  if (install.installed && _Vue === Vue) return
  install.installed = true

  _Vue = Vue

//   const isDef = v => v !== undefined


  /* Object.defineProperty(Vue, key, {
    get () { return this._api }
  }) */

 /*  Vue[key] = api
  Vue.prototype[key] = api */

  /* Object.defineProperty(Vue.prototype, key, {
    get () { return this._api }
  }) */

  let registeredPlugins = [] // store keys of all plugins in the root component

  Vue.mixin({
    beforeCreate () {
      let vm = this
      const options = vm.$options

      // store injection
      if (options?.plugins) {
        let plugins = options.plugins ?? {}
        for(let [key, plugin] of Object.entries(plugins)) {
          vm[key] = typeof plugin === 'function'
              ? plugin(config)
              : plugin
          registeredPlugins.push(key)
        }
      } else if (options.parent) {
        for(let key of registeredPlugins) {
          this[key] = options?.parent[key]
        }
      }
    }
  })

}