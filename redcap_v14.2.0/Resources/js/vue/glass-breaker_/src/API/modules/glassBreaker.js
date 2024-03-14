const route_prefix = 'GlassBreakerController'

export default {
    actions: {
        /**
         * get data from the initialize endpoint:
         * 
         * - Reasons: ["Unspecified", "Direct Patient Care", "Scheduling", "Billing", "Record Review", "Investigation"]
         * - LegalMessage: "The patient file you are attempting to access is restricted.  If you have aclinical/business need to access the patient's file, please enter a reason andpassword and you may proceed."
         * - InappropriateMessage: ""
         * - DataRequirementReason: "None"
         * - DataRequirementExplanation: "None"
         * - TimeoutInMinutes: 15
         * - DataRequirementExplanationOverrides: []
         */
        initialize({api_client} ) {
            const route = `${route_prefix}:initialize`
            const params = {route}
            
            return api_client.get('', {params})
        },

        /**
         * check if a MRN is protected by "break the glass":
         * @param {string} mrn 
         */
        check({api_client}, mrn) {
            const route = `${route_prefix}:check`
            const params = {route}
            const request_params = {mrn}
            
            return api_client.post('', request_params, {params})
        },

        /**
         * check if a MRN is protected by "break the glass":
         * @param {object} params {mrn, reason, explanation, department, department_type}
         * @param {object} config 
         */
        accept({api_client}, params, config={}) {
            const route = `${route_prefix}:accept`
            config.params = {route} // set the query_params
            return api_client.post('', params, config)
        },

        cancel({api_client}, mrn, reason, department, department_type) {
            const route = `${route_prefix}:cancel`
            const params = {route}
            const request_params = {mrn, reason, department, department_type}
            
            return api_client.post('', request_params, {params})
        },

        getProtectedMrnList({api_client} ) {
            const route = `${route_prefix}:getProtectedMrnList`
            const params = {route}
            return api_client.get('', {params})
        },

        clearProtectedMrnList({api_client} ) {
            const route = `${route_prefix}:clearProtectedMrnList`
            const params = {route}
            return api_client.delete('', {params})
        },

        checkREDCapCredentials({api_client}, password) {
            const route = `${route_prefix}:checkREDCapCredentials`
            const params = {route}
            const request_params = {password}
            return api_client.post('', request_params, {params})
        },

        getSettings({api_client} ) {
            const route = `${route_prefix}:getSettings`
            const params = {route}
            return api_client.get('', {params})
        },
        
        test({api_client}, {id}) {

            return api_client.get('https://jsonplaceholder.typicode.com/posts/', {
                params: {id},
            })
        },

    }
}