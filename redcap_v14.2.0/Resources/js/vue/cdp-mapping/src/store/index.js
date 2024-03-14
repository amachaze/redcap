import appSettingsModule from '@/store/modules/app_settings'
import fhirFieldsSelectModule from '@/store/modules/fhir_fields_select'
import mappingModule from '@/store/modules/mapping'
import settingsModule from '@/store/modules/settings'

/**
 * state management
 */
 export default (context, Vuex) => {
    var initialState = {}

    const store = new Vuex.Store({
        state: {...initialState},
        modules: {
            app_settings: appSettingsModule,
            settings: settingsModule,
            mapping: mappingModule,
            fhir_fields_select: fhirFieldsSelectModule,
        },
        mutations: {},
        actions: {},
        getters: {},
    })

    return store
 }