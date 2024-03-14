import { defineStore } from '@/plugins/store'
import { default as app } from './app'
import { default as fhirSystem } from './fhir-system'
import { default as customMappings } from './custom-mappings'
import { reactive } from 'vue'

import { getSettings } from '../API'
import { useError } from '../../utils/ApiClient'

export const useAppStore = defineStore('app', app)
export const useFhirSystemStore = defineStore('fhir-system', fhirSystem)
export const useCustomMappingsStore = defineStore(
    'custom-mappings',
    customMappings
)

export const useStore = defineStore('_', () => {
    const appStore = useAppStore()
    const fhirSystemStore = useFhirSystemStore()
    const customMappingStore = useCustomMappingsStore()

    return reactive({
        ready: false, // set to true after first time the settings are loaded
        loading: false,
        error: null,
        async init() {
            try {
                this.loading = true
                await this.loadSettings()
                this.ready = true
            } catch (error) {
                this.error = useError(error)
            } finally {
                this.loading = false
            }
        },
        async loadSettings() {
            const response = await getSettings()
            const {
                lang,
                redcapConfig,
                redirectURL,
                breakTheGlassUserTypes,
                fhirSystems,
                customMappingsData,
            } = response.data
            // useLang(lang)
            appStore.lang = lang
            appStore.redirectURL = redirectURL
            appStore.redcapConfig = redcapConfig
            appStore.breakTheGlassUserTypes = breakTheGlassUserTypes
            appStore.newConfig = { ...redcapConfig }
            fhirSystemStore.init(fhirSystems)
            customMappingStore.init(customMappingsData)
        },
        // check if any store has pending changes
        get savePending() {
            return (
                appStore.isDirty ||
                fhirSystemStore.isDirty ||
                fhirSystemStore.orderChanged ||
                fhirSystemStore.listChanged ||
                customMappingStore.isDirty
            )
        },
        // reset changes in all stoers
        resetChanges() {
            appStore.reset()
            fhirSystemStore.reset()
            customMappingStore.reset()
        },
        async saveChanges() {
            try {
                this.loading = true
                let reload = false
                if (appStore.isDirty) {
                    await appStore.save()
                    reload = true
                }
                if (fhirSystemStore.isDirty || fhirSystemStore.listChanged) {
                    await fhirSystemStore.save()
                    reload = true
                }
                if (fhirSystemStore.orderChanged) {
                    await fhirSystemStore.updateOrder()
                    reload = true
                }
                if (customMappingStore.isDirty) {
                    await customMappingStore.save()
                    reload = true
                }
                if (reload) await this.loadSettings()
            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false
            }
        },
    })
})
