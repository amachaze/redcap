export let _Vue

export function install (Vue, options) {
  if (install.installed && _Vue === Vue) return
  install.installed = true

  _Vue = Vue

//   const isDef = v => v !== undefined
  const {key} = options
  const optionKey = key.toLowerCase().replace('$', '') 

  /* Object.defineProperty(Vue, key, {
    get () { return this._api }
  }) */

 /*  Vue[key] = api
  Vue.prototype[key] = api */

  /* Object.defineProperty(Vue.prototype, key, {
    get () { return this._api }
  }) */

  Vue.mixin({
    beforeCreate () {
        const options = this.$options
        // store injection
        if (options[optionKey]) {
            this[key] = typeof options[optionKey] === 'function'
                ? options[optionKey]()
                : options[optionKey]
        } else if (options.parent && options.parent[key]) {
            this[key] = options.parent[key]
        }

    },
  })

}