/**
 * break the glass information provided by the "initialize" endpoint
 */
const initialState = {
    Reasons: [],
    LegalMessage: "The patient file you are attempting to access is restricted. If you have a clinical/business need to access the patient's file, please enter a reason and password and you may proceed.",
    InappropriateMessage: "",
    DataRequirementReason: "None",
    DataRequirementExplanation: "None",
    TimeoutInMinutes: 15,
    DataRequirementExplanationOverrides: [],
}

const module = {
    namespaced: true,
    state: {...initialState},
    mutations: {
        SET_REASONS: function(state, payload) {
            state.Reasons = payload
        },
        SET_LEGAL_MESSAGE: function(state, payload) {
            state.LegalMessage = payload
        },
    },
    actions: {
        async initialize(context, vm) {
            const response = await vm.$API.dispatch('glassBreaker/initialize')
            const {data: {Reasons, LegalMessage}} = response
            context.commit('SET_REASONS',Reasons)
            context.commit('SET_LEGAL_MESSAGE',LegalMessage)
        },
    }
}

export default module;