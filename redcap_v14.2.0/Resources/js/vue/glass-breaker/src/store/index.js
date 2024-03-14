import SettingsStore from "./SettingsStore"

let store = null
let pinia = null

const storeCallback  = (_pinia) => {
    const {defineStore} = pinia = _pinia
    const useSettingsStore = SettingsStore({defineStore})

    store = {
        settings: useSettingsStore(),
    }
    return store
}

export { storeCallback as default, store, pinia}