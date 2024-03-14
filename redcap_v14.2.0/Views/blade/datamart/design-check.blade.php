
<div id="design-checker-app"></div>

<script type="text/x-template" id="design-checker-main">
    <div id="design-checker-app" style="max-width: 786px;">

        <div class="mt-2 alert alert-warning alert-dismissible fade show" role="alert">
                <span type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></span>
            <p>
                <i class="fas fa-exclamation-circle"></i>
                <strong>Design mismatch</strong>
            </p>
            <p>The design of this project could prevent the Data Mart feature from working as intended.</p>
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#designModal">
            <span>learn more</span>
            </button>
        </div>
    @{{selectedActions}}

        <!-- Modal -->
        <div class="modal fade" id="designModal" tabindex="-1" aria-labelledby="designModal" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="designModal">Design mismatch</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    </div>

                    <div class="modal-body">
                        <p>The following actions should be performed:</p>
                        <table class="table table-bordered table-striped table-hover">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(message, index) in $root.messages">
                                    <action-item v-model="$root.selectedActions" :action="message.type" :form-name="message.params.formName" :check-value="index">
                                        <span>@{{message.text}}</span>
                                    </action-item>
                                </template>
                            </tbody>
                        </table>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary btn-sm" :disabled="fixDisabled" @click="fixSelected">
                            <i v-if="actionBeingProcessed" class="fas fa-spinner fa-spin fa-fw"></i>
                            <i v-else class="fas fa-wrench fa-fw"></i>
                            <span class="ms-0">Fix selected</span>
                        </button>
                        <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</script>



<script type="text/x-template" id="action-item">
    <tr @click="onChange(checkValue)">
        <td>
            <span v-if="this.$root.actionBeingProcessed==checkValue"><i class="fas fa-spinner fa-spin fa-fw"></i></span>
            <template v-else>
                <i v-if="checked" class="far fa-check-square fa-fw"></i>
                <i v-else class="far fa-square fa-fw"></i>
            </template>
        </td>
        <td><slot /></td>
    </tr>
</script>

{{loadJS('vue.min.js')}}
{{loadJS('Libraries/axios.min.js')}}
<script>
Vue.component('action-item', {
    data() {
        return {
            title: 'ciao',
        }
    },
    computed: {
        checked() {
            return this.value.indexOf(this.checkValue)>=0
        },
    },
    props: {
        action: {
            type: String,
            default: ''
        },
        formName: {
            type: String,
            default: ''
        },
        checkValue: {
            type: String,
            default: ''
        },
        value: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        onChange() {
            let values = [...this.value]
            const index = values.indexOf(this.checkValue)
            if(index>=0) values.splice(index,1)
            else values.push(this.checkValue)
            this.$root.$emit('input', values)
        },
    },
    template: '#action-item'
})

/** const messages = {!! json_encode( $messages, JSON_PRETTY_PRINT )  !!} */
const makeApiClient = () => {
    const getRedCapQueryParams = () => {
        let params = new URLSearchParams(location.search)
        // get PID from current location
        let pid = params.get('pid')
        let record_id = params.get('id')
        let event_id = params.get('event_id')
        let query_params = {
            pid,
            record_id,
            event_id,
        }
        if(window.redcap_csrf_token) query_params.redcap_csrf_token = window.redcap_csrf_token // csrf token for post requests
        return query_params
    }
    const client = axios.create({
        // baseURL: https://redcap.test/redcap_v999.0.0/?route=DataMartController%3AgetSettings&pid=19
        baseURL: `${window.app_path_webroot}`,
        headers: {common: {'X-Requested-With': 'XMLHttpRequest'}}, // set header for REDCap ajax
        paramsSerializer: (params) => {
            params = {...getRedCapQueryParams(), ...params}
            const search_params =  new URLSearchParams(params)
            return search_params.toString()
        },
    })
    return client
}

new Vue({
    data() {
        return {
            messages: [],
            privileges: [],
            selectedActions: [3,5],
            actionBeingProcessed: null
        }
    },
    created() {
        this.$root.$on('input', this.setSelected)
        this.$root.$API = makeApiClient()
        this.getDesignInfo()
    },
    computed: {
        fixDisabled() {
            return this.selectedActions.length<1 || this.actionBeingProcessed!=null
        },
    },
    methods: {
        setSelected(list) {
            if(this.actionBeingProcessed!=null) return // exit if processing
            this.selectedActions = list
        },
        async sendActionRequest(index) {
            let promise = new Promise(async (resolve, reject) => {
                this.actionBeingProcessed = index
                let action = {...this.messages[index]}
                const {type, params: {formName}} = action
                const result = await axios.get(`https://jsonplaceholder.typicode.com/todos/${index+1}`)
                const {data} = result
                setTimeout(() => {
                    resolve({data,type, formName})
                    this.actionBeingProcessed = null
                }, 3000)
            })
            return promise
        },
        async getDesignInfo() {
            const params = {route: 'DataMartController:checkDesign'}
            const response = await this.$root.$API.get('', {params})
            const {data:{privileges, messages}} = response
            this.messages = messages
            this.privileges = privileges
        },
        async fixSelected() {
            console.log(this.selectedActions)
            const actions = [...this.selectedActions]
            actions.sort((a, b) => a - b)
            for(let index of actions) {
                console.log(index)
                const result = await this.sendActionRequest(index)
                console.log(result)
            }
        }
    },
    template: '#design-checker-main',
    el:'#design-checker-app',
})
</script>