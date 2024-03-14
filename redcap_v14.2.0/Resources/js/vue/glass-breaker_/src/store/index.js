

import counter from '@/store/modules/counter'
import information from '@/store/modules/information'
import mrns from '@/store/modules/mrns'
import settings from '@/store/modules/settings'

export default (context, Vuex) => {
    var initialState = {
        debug: false,
    }
    const store = new Vuex.Store({
        state: {...initialState},
        mutations: {
            SET_DEBUG(state, payload) { state.debug = payload },
        },
        modules: {
            counter,
            information,
            mrns,
            settings,
        },
        actions: {
            setDebug(context, status) { context.commit('SET_DEBUG', status) },
        },
        getters: {
            env(state) { return process.env.NODE_ENV },
        }
    })

    return store
}