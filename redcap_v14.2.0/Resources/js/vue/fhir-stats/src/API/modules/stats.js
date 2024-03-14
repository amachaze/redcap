export default {
    actions: {
        getStats(context, date_start, date_end) {
            const {api_client} = context
            date_start = date_start ?? '' // take care of undifined values
            date_end = date_end ?? '' // take care of undifined values
            var params = {
                route: `FhirStatsController:getStats`,
                date_start,
                date_end,
            }
            return api_client.get('',{params})
        },
    }
}