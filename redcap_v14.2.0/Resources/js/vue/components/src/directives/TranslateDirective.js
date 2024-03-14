// this will provide translations once useLang is run
let lang = {}

// use this to load the lang data in this context
const useLang = (_lang) => (lang = _lang)

const translate = (key) => {
    const translation = lang?.[key]
    if (translation == null) {
        console.log(`error: could not find a translation for ${key}`)
        return false
    }
    return translation
}

const directive = {
    // called before bound element's attributes
    // or event listeners are applied
    created(el, binding, vnode, prevVnode) {
        // see below for details on arguments
    },
    // called right before the element is inserted into the DOM.
    beforeMount(el, binding, vnode, prevVnode) {},
    // called when the bound element's parent component
    // and all its children are mounted.
    mounted(el, binding, vnode, prevVnode) {
        const { arg } = binding
        const translation = translate(arg)
        if (translation) el.innerHTML = translation
        else el.innerHTML = `-- translation not found for key ${arg} --`
    },
    // called before the parent component is updated
    beforeUpdate(el, binding, vnode, prevVnode) {},
    // called after the parent component and
    // all of its children have updated
    updated(el, binding, vnode, prevVnode) {
        const { arg } = binding
        const translation = translate(arg)
        if (translation) el.innerHTML = translation
        else el.innerHTML = `-- translation not found for key ${arg} --`
    },
    // called before the parent component is unmounted
    beforeUnmount(el, binding, vnode, prevVnode) {},
    // called when the parent component is unmounted
    unmounted(el, binding, vnode, prevVnode) {},
}

export { directive as default, translate, useLang }
