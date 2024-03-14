
import statsModule from '@/store/modules/stats'



export default (context, Vuex) => {
    /**
     * state management
     */
    var initialState = {}

    const store = new Vuex.Store({
        state: {...initialState},
        modules: {
            stats: statsModule,
        },
        mutations: {},
        actions: {},
        getters: {},
    })
    
    return store
}