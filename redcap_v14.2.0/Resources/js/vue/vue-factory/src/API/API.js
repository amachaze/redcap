import axios from 'axios'
// import {API_BASE_URL} from '@/config'

export default class API {
    actions = {} // api actions

    constructor({modules}) {
        this.loadModules(modules)
    }

    get baseURL() {
        const app_path_webroot = window.app_path_webroot || '/api'
        let baseURL = `${app_path_webroot}`
        baseURL = baseURL.replace(/\/\/+/, '/')
        return baseURL
    }


    /**
     * filter logic for the default params
     * this function can be overriden in each App
     * to add or remove query params that will be sent in every request
     * 
     * @param {object} params 
     * @returns modified params
     */
    visitDefaultQueryParams(params) { return params}

    /**
     * get the dafault params to use
     * in the paramsSerializer of every request
     */
    get defaultQueryParams() {
        let redcap_params = this.getRedCapQueryParams()
        const default_params = this.visitDefaultQueryParams(redcap_params)
        return default_params
    }

    createClient(cancelToken) {
        return axios.create({
            baseURL: this.baseURL,
            timeout: 60*1000*3,
            headers: {common: {'X-Requested-With': 'XMLHttpRequest'}}, // set header for REDCap ajax
            paramsSerializer: (params) => {
                params = Object.assign({}, this.defaultQueryParams, params)
                const search_params =  new URLSearchParams(params)
                return search_params.toString()
            },
            cancelToken,
        })
    }

    /**
     * set project_id, page, module prefix
     * also set redcap_csrf_token if available
     */
    getRedCapQueryParams() {
        let params = new URLSearchParams(location.search)
        // get PID, record ID and event ID and all query params from current location
        let query_params = {}
        for(let [key, value] of params.entries()) {
            query_params[key] = value
        }
        /* const keys = ['pid', 'id', 'event_id']
        keys.forEach(key => {
            let value = params.get(key)
            if(value == null) return
            // add these only if not null
            query_params[key] = value
        }) */
        if(window.redcap_csrf_token) query_params.redcap_csrf_token = window.redcap_csrf_token // csrf token for post requests
        return query_params
    }

    dispatch(command, ...params)
    {
        const [name, action] = command.split('/')
        // create a cancel function and a cancelToken function
        const {token: cancelToken, cancel} = axios.CancelToken.source()
        
        // set the context
        const context = {
            $api: this,
            api_client: this.createClient(cancelToken),
            cancelToken, cancel
        }

        let promise = this.actions[name][action](context, ...params)
        promise.cancel = cancel // pass the cancel along with the promise
        return promise
    }

    /**
     * load action in the provided modules
     */
    loadModules(modules={}) {
        for(let [name, module={}] of Object.entries(modules)) {
            const {actions={}} = module
            /* for(let[action, func] of Object.entries(actions)) {
                this.actions[`${name}/${action}`] = func.bind(this)
            } */
            this.actions[name] = {...actions}
        }
    }
}