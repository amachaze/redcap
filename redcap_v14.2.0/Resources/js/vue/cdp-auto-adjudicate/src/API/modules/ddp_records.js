const route = 'CdpController'

export default {
    actions: {        
        getPreview(context, identifier) {
            const {api_client} = context
            var params = {
                route: `${route}:getPreviewData`,
                record_identifier: identifier,
            }
            return api_client.get('',{params})
        },
        fetchData(context, identifier) {
            const {api_client} = context
            var params = {
                route: `${route}:fetchData`,
                record_identifier: identifier,
            }
            return api_client.get('',{params})
        },
        getDdpRecordsDataStats(context, offset) {
            const {api_client} = context
            var params = {
                route: `${route}:getDdpRecordsDataStats`,
                offset,
            }
            return api_client.get('',{params})
        },
        processCachedData(context, {background=false, send_feedback=false}) {
            const {api_client} = context
            const data = new FormData()
            data.append('background', background)
            data.append('send_feedback', send_feedback)
            var params = {
                route: `${route}:processCachedData`,
            }
            return api_client.post('', data, {params})
        },
        processField(context, field) {
            const {api_client} = context
            const data = new FormData()
            for (let[key, value] of Object.entries(field)) {
                data.append(key, value)
            }
            var params = {
                route: `${route}:processField`,
            }
            return api_client.post('', data, {params})
        },
    }
}