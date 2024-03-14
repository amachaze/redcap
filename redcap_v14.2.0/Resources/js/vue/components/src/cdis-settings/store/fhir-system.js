import { reactive } from 'vue'
import {
    updateFhirSystemsOrder,
    upsertFhirSettings,
    deleteFhirSystem,
} from '../API'
import { useError } from '../../utils/ApiClient'
import { deepCompare, deepClone } from '../../utils'

export default () => {
    let autoIncrementIDS = -1

    const store = reactive({
        originalList: [],
        list: [],
        current: null,
        form: {},
        loading: false,
        setCurrent(system) {
            this.current = system
            this.form = deepClone(system)
        },
        // this is called by the auth params manager when an element is added
        updateAuthParams(params) {
            this.form.fhir_custom_auth_params = params
        },
        reset() {
            this.list = deepClone(this.originalList)
            if (this.list.length === 0) this.setCurrent(null)
            else this.setCurrent(this.list[0])
        },
        // check at selected system level, NOT list level
        get isDirty() {
            const equal = deepCompare(this.current, this.form)
            if (equal) return false
            return true
        },
        get listChanged() {
            const equal = deepCompare(this.list, this.originalList)
            if (equal) return false
            return true
        },
        get orderChanged() {
            if (this.list?.length !== this.originalList?.length) return true

            for (const index in this.originalList) {
                const id_A = this.originalList?.[index]?.ehr_id
                const id_B = this.list?.[index]?.ehr_id
                if (id_A !== id_B) return true
            }
            return false
        },
        get order() {
            return this.list.map((item) => item.ehr_id)
        },
        // remove elements locally (used for new elements, not stored in the db)
        remove(system) {
            const list = [...this.list]
            const index = list.findIndex(
                (element) => element?.ehr_id === system?.ehr_id
            )
            if (index < 0) return
            const found = list[index] // keep track of the item that will be deleted
            list.splice(index, 1)
            this.list = [...list]
            // make sure the deleted item was not selected
            if (this.current?.ehr_id !== found?.ehr_id) return
            if (list.length === 0) this.setCurrent(null)
            else this.setCurrent(list[0])
        },
        /**
         * 
         * @returns {Object} default data for a new system
         */
        makeNewSystem() {
            const newSystem = {
                ehr_name: 'new system',
                order: this.list?.length + 1,
                ehr_id: '',
                client_id: '',
                client_secret: '',
                fhir_base_url: '',
                fhir_token_url: '',
                fhir_authorize_url: '',
                fhir_identity_provider: null,
                patient_identifier_string: '',
                fhir_custom_auth_params: [],
            }
            return newSystem
        },
        async add(newSystem) {
            newSystem.ehr_id = autoIncrementIDS--
            const id = await this.upsert(newSystem)
            if (!id) {
                throw new Error(`Could not add the new FHIR system`)
            }
            console.log(`FHIR system added - ID: ${id}`)
            return id
        },
        // set the list of available FHIR systems and set the first one as current
        init(list) {
            this.originalList = deepClone(list)
            this.list = [...list]
            const first = list?.[0]
            this.setCurrent(first)
        },
        // update or insert a FHIR system
        async upsert(form) {
            try {
                this.loading = true
                const response = await upsertFhirSettings(form)
                return response
            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false
            }
        },
        async delete(ehr_id) {
            const response = await deleteFhirSystem(ehr_id)
            return response
        },
        async updateOrder() {
            if (!this.orderChanged) return
            try {
                this.loading = true
                const response = await updateFhirSystemsOrder(this.order)
                return response
            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false
            }
        },
        // save the current form
        async save() {
            if (!this.isDirty && !this.listChanged) return
            const id = await this.upsert(this.form)
            if (id) console.log(`FHIR system saved - ID: ${id}`)
            await this.updateOrder()
        },
    })

    return store
}
