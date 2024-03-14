import template from './template.js'
// import sheet from './style.css' assert { type: 'css' };
import style from './style.js'

import {REDCapStyled} from '../rc-components/dist/index.js'
import {default as FetchClient, makeAbortController} from '../../modules/FetchClient.js'
import {Utils} from '../../modules/index.js'
const {debounce, objectIsEmpty} = Utils


export default class BTGForm extends REDCapStyled {
    #elements = {}
    #client
    #baseURL

    constructor() {
        super();
        this.addStyle(style)
        this.initFormData()
        this.#baseURL = `${app_path_webroot_full}redcap_v${redcap_version}/`
        this.#client = new FetchClient(this.#baseURL)
    }

    /* afterRender() {
        // add style here if not using CssStyleSheet
        this.addStyle(sheet)
    } */

    async init() {
        await this.getSettings()
        if(this.disabled) return
        await this.fetchProtectedMrnList()
        this.validate()
        this.registerFormEvents()
    }


    registerFormEvents() {
        const form = this.shadowRoot.querySelector('form')
        if(!form) return
        // do not submit the form when enter is pressed
        this.addEvent(form, 'submit', (e) => {
            e.preventDefault();
        } )
    }

    // form proxy with the data that will be sent for processing
    #formProxy = {
        userType: '',
        mrns: [],
        reason: '',
        explanation: '',
        password: ''
    }
    initFormData() {
        const self = this
        const data = {...this.#formProxy}
        this.#formProxy = new Proxy(data, {
            get(target, prop) {
                return Reflect.get(target, prop)
            },
            set(target, prop, value, receiver) {
                Reflect.set(target, prop, value)
                self.validate() // validate form
                return true
            }
        })
    }
    get form() { return this.#formProxy }

    get template() { return template }

    #disabled = true 
    get disabled() { return this.#disabled }
    set disabled(value) {
        this.#disabled = value
    }
    
    #ehrUser = ''
    #userTypes = []
    #mrns = []
    #reasons = []
    #legalMessage = []

    get ehrUser() { return this.#ehrUser }
    set ehrUser(value) {
        this.#ehrUser = value
        this.#elements.ehrUser.innerText = this.#ehrUser
    }

    get userTypes() { return this.#userTypes }
    set userTypes(value) {
        this.#userTypes = value

        const select = this.#elements.ehrUserTypeSelect
        select.innerHTML = ''
        this.#userTypes.forEach((type, index) => {
            const option = document.createElement('option')
            option.value = type
            option.innerText = type
            if(type==this.userType) option.selected = true
            select.appendChild(option)
        });
    }

    get reasons() { return this.#reasons }
    set reasons(value) {
        this.#reasons = value

        const reasonsSelect = this.#elements.reasonsSelect
        reasonsSelect.innerHTML = ''
        this.#reasons.forEach((reason, index) => {
            const option = document.createElement('option')
            option.value = reason
            option.innerText = reason
            reasonsSelect.appendChild(option)
        });
    }

    get legalMessage() { return this.#legalMessage }
    set legalMessage(value) {
        this.#legalMessage = value
        this.#elements.legalMessage.innerText = this.#legalMessage
    }
    
    get mrns() { return this.#mrns }
    set mrns(value) {
        this.#mrns = value
        let idCounter = 0
        const makeID = () => `mrn-checkbox-${++idCounter}`
        
        const makeRow = ({mrn, isExpired}, id, checked=false) => {
            const html = `
            <div class="mrn-wrapper">
                <div>
                    <input type="checkbox" value="${mrn}" id="${id}" name="mrn" ${checked ? 'checked' : ''}>
                    <label for="${id}">${mrn}</label>
                    <span class="small ms-1">${isExpired ?
                        '<i class="fa-regular fa-clock" title="BTG token expired"></i>' :
                        ''}
                    </span>
                </div>
                <aside class="small">
                    <button type="button" data-delete-mrn="${mrn}">
                    <i class="fas fa-trash"></i>
                    </button>
                </aside
            </div>
            `
            var rowTemplate = document.createElement('template')
            rowTemplate.innerHTML = html
            return rowTemplate.content
        }

        const list = Object.keys(value)
        const gotMRNs = Array.isArray(list) && list.length>0
        if(gotMRNs) this.$emit('mrns-detected', list)

        const mrnsSelect = this.#elements.mrnsSelect
        mrnsSelect.innerHTML = gotMRNs ? '' : 'no mrns available'
        for (const [mrn, patient] of Object.entries(value)) {
            const id = makeID()
            const checked = this.form.mrns.indexOf(mrn)>=0
            const row = makeRow(patient, id, checked)
            // register events
            const checkbox = row.querySelector('input[type="checkbox"]')
            if(checkbox) this.addEvent(checkbox, 'change', (e) => this.onMrnSelected(e, mrn))
            const deleteButton = row.querySelector('button[data-delete-mrn]')
            if(deleteButton) this.addEvent(deleteButton, 'click', (e) => this.onDeleteMrn(e, mrn))
            mrnsSelect.appendChild(row)
        }
        this.$emit('mrns-updated', list)
    }

    async getSettings() {
        const params = {
            route: 'GlassBreakerController:getSettings',
        };
        try {
            this.$emit('loading', true)
            const response = await this.#client.send('', {params, method: 'GET'})
            const {initialize={}, ehrUser='', userTypes=[], userType=''} = response
            
            this.disabled = initialize==null
            if(this.disabled) return

            
            const {Reasons=[], LegalMessage=''} = initialize
            this.legalMessage = LegalMessage
            this.reasons = [...Reasons]
            this.reason = Reasons[0] ?? ''
            this.userType = userType // this must be set before userTypes to set the default value
            this.userTypes = [...userTypes]
            this.ehrUser = ehrUser
        } catch (error) {
            let message = `cannot get settings - ${error}`
            console.log(message)
            this.$emit('error', message)
            throw new Error(error)
        }finally {
            this.$emit('loading', false)
        }
    }

    async fetchProtectedMrnList() {
        const params = {
            route: 'GlassBreakerController:getProtectedMrnList',
        };
        try {
            this.$emit('loading', true)
            const response = await this.#client.send('', {params, method: 'GET'})
            // only keep the keys (MRNs)
            this.mrns = {...response}
        } catch (error) {
            let message = `cannot fetch MRN list - ${error}`
            console.log(message)
            this.$emit('error', message)
            throw new Error(error)
        }finally {
            this.$emit('loading', false)
        }
    }

    // form data
    get selectedMrns() { return this.#formProxy.mrns }
    // set selectedMrns(value) { this.#formProxy.mrns = value }
    selectMrn(mrn) {
        const list = [...this.selectedMrns]
        const index = list.indexOf(mrn)
        const exists = index>=0
        if(exists) return
        list.push(mrn)
        this.#formProxy.mrns = list
    }
    deselectMrn(mrn) {
        const list = [...this.selectedMrns]
        const index = list.indexOf(mrn)
        const exists = index>=0
        if(!exists) return
        list.splice(index, 1)
        this.#formProxy.mrns = list
    }

    get userType() { return this.#formProxy.userType }
    set userType(value) { this.#formProxy.userType = value }

    get reason() { return this.#formProxy.reason }
    set reason(value) { this.#formProxy.reason = value }

    get explanation() { return this.#formProxy.explanation }
    set explanation(value) { this.#formProxy.explanation = value }

    get password() { return this.#formProxy.password }
    set password(value) { this.#formProxy.password = value }

    afterRender() {


        // register elements events
        this.#elements.reasonsSelect = this.shadowRoot.querySelector('select[data-reasons]')
        this.#elements.mrnsSelect = this.shadowRoot.querySelector('[data-mrns-container]')
        this.#elements.legalMessage = this.shadowRoot.querySelector('[data-legal-message]')
        this.#elements.form = this.shadowRoot.querySelector('form')
        this.#elements.ehrUser = this.shadowRoot.querySelector('[data-ehr-user]')
        this.#elements.ehrUserTypeSelect = this.shadowRoot.querySelector('[data-user-type]')
        this.#elements.explanationInput = this.shadowRoot.querySelector('[data-explanation]')
        this.#elements.passwordInput = this.shadowRoot.querySelector('[data-redcap-password]')
        
        // register events
        this.addEvent(this.#elements.reasonsSelect, 'change', this.onReasonSelected.bind(this))
        this.addEvent(this.#elements.ehrUserTypeSelect, 'change', this.onEhrUserTypeSelected.bind(this))
        this.addEvent(this.#elements.explanationInput, 'input', debounce(this.onExplanationChanged.bind(this)))
        this.addEvent(this.#elements.passwordInput, 'input', debounce(this.onPasswordChanged.bind(this)))
        

    }

    async submit() {
        const params = {
            route: 'GlassBreakerController:accept',
        };

        try {
            this.$emit('loading', true)
            const response = await this.#client.send('', {params, method: 'POST', data: this.form})
            return response
        } catch (error) {
            let message = `error submitting your request - ${error}`
            console.log(message)
            this.$emit('error', message)
            throw new Error(error)
        }finally {
            this.$emit('loading', false)
        }
    }

    static get observedAttributes() { return ['mrns','reasons']; }

    // events 
    onReasonSelected(e) {
        const target = e.target
        this.reason = target.value
    }

    onMrnSelected(e, mrn) {
        const checked = e.currentTarget.checked
        if(checked) {
            this.selectMrn(mrn)
        }else {
            this.deselectMrn(mrn)
        }
    }

    /**
     * remove an MRN from the cache
     * @param {object} e 
     * @param {string} mrn 
     */
    async onDeleteMrn(e, mrn) {
        const params = {
            route: 'GlassBreakerController:removeMrn',
        }
        try {
            const response = await this.#client.send('', {params, method: 'POST', data: {mrn}})
            const list = {...this.mrns}
            if(!(mrn in list)) return
            // remove from list
            delete list[mrn]
            this.mrns = {...list}
            // also deselect if was selected
            this.deselectMrn(mrn)
        } catch (error) {
            let message = `cannot remove MRN - ${error}`
            console.log(message)
            this.$emit('error', message)
        }
    }

    onEhrUserTypeSelected(e) {
        this.userType = e.target.value
    }

    onExplanationChanged(e) {
        this.explanation = this.#elements.explanationInput.value
    }

    onPasswordChanged(e) {
        this.password = this.#elements.passwordInput.value
    }

    #valid = true
    get valid() { return this.#valid }
    validate() {
        const validItems = {
            selection: this.selectedMrns.length>0,
            userType: this.userType.trim() != '',
            explanation: this.explanation.trim() != '',
            password: this.password.trim() != '',
            reason: this.reason.trim() != '',
        }

        let valid = true // assume valid
        for (const [key, value] of Object.entries(validItems)) {
            if(value===false) valid = false
        }
        this.#valid = valid
        this.$emit('validated', valid)
    }

}