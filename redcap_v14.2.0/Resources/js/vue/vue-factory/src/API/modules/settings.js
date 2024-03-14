export default {
    actions: {        
        get(context) {
            const {api_client} = context
            const params = {route: 'DataMartController:checkDesign'}
            return api_client.get('',{params})
        },

        fixDesign(context, form, type, options=[]) {
            const {api_client} = context
            const params = {route: 'DataMartController:fixDesign'}
            const data = {form, type, options}
            return api_client.post('', data, {params})
        }
    }
}