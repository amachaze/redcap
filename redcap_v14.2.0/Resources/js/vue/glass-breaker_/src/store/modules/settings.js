/**
 * break the glass information provided by the "initialize" endpoint
 */
const initialState = {
    metadata: {}, // available options
    systemSettings: {}, // REDCap settings
    data: {}, // customized settings
}

const module = {
    namespaced: true,
    state: {...initialState},
    mutations: {
        SET_METADATA(state, payload) { state.metadata = payload },
        SET_SYSTEM_SETTINGS(state, payload) { state.systemSettings = payload },
        SET_DATA(state, payload) {
            const systemSettings = {...state.systemSettings}
            this._vm.$set(state, 'data', {}) // reset
            for(let[key, value] of Object.entries(payload)) {
                if(!(key in systemSettings)) continue
                this._vm.$set(state.data, key, value)
            }
        },
        SET_DATA_ITEM(state, {key, value}) { this._vm.$set(state.data, key, value) },
    },
    actions: {
        /**
         * get settings and options from the server.
         * init the custom settings and keep the original systetm
         * settings as reference
         * 
         * @param {Object} context 
         */
        async fetchSettings(context, vm) {
            const response = await vm.$API.dispatch('glassBreaker/getSettings')
            const {data: {metadata, settings}} = response
            context.commit('SET_METADATA', metadata)
            context.commit('SET_SYSTEM_SETTINGS', settings)
        },
        setData(context, settings) {
            context.commit('SET_DATA', settings)
        },
        setDataItem({state, commit}, {key, value}) {
            const data = {...state.data}
            return commit('SET_DATA_ITEM', {key, value})
        }
    }
}

export default module;