<template>
    <form class="accept-form" @submit="checkForm" autocomplete="off">

        <div class="">
            <p>The patients listed in this page are potentially protected by the Epic "break the glass" feature.<br>
            This process will check if "break the glass" is applicable and will try to unlock the patient data.</p>
        </div>
        <!-- <p>{{legal_message}}</p> -->

        <div class="form-group">
            <label for="patient-type">
                <span>Patient type </span>
                <font-awesome-icon class="info-icon" :icon="['fas', 'info-circle']" title="The type of the provided patient ID" />
            </label>
            <select class="form-control" id="patient-type" v-model.lazy="patientType" @change.prevent>
                <option value="" disabled>Select...</option>
                <option v-for="(patient_type, index) in patientTypes" :key="index" :value="patient_type">{{patient_type}}</option>
            </select>
        </div>

        <div class="form-group" :class="{error: validate($v.checked_mrns)}" v-if="mrns.length>0">
            <div class="d-flex mb-1">
                <label>
                    <span>Patient identifiers </span>
                    <font-awesome-icon class="info-icon" :icon="['fas', 'info-circle']" title="select the MRNs in order to get access" />
                </label>
                <button class="ml-auto btn btn-sm" :class="all_selected_class" type="button" @click="toggleSelectMrnList">
                    <span v-if="all_mrns_selected">
                        <i class="far fa-square"></i> Deselect all
                    </span>
                    <span v-else>
                        <i class="far fa-check-square"></i> Select all
                    </span>
                </button>
            </div>
            <div class="mrn-list border p-2">
                <div class="form-check" v-for="(mrn, index) in mrns" :key="index">
                    <input class="form-check-input" type="checkbox" v-model="checked_mrns" :id="`mrn-${index}`" :value="mrn">
                    <label class="form-check-label" :for="`mrn-${index}`">{{mrn}}</label>
                </div>
            </div>
        </div>

        <div class="form-group" v-if="debug">
            <label for="patients-textarea">
                <span>Patients (one per line) </span>
                <font-awesome-icon class="info-icon" :icon="['fas', 'info-circle']" title="List of patients (one per row)" />
            </label>
            <textarea class="form-control" id="patients-textarea" rows="3" v-model="patients"></textarea>
        </div>

        <div class="form-group" :class="{error: validate($v.reason)}">
            <label for="reason">
                <span>Reason </span>
                <font-awesome-icon class="info-icon" :icon="['fas', 'info-circle']" title="Select a reason from the drop-down menu to explain why you need to access this patient's record. You may enter any additional explanation below" />
            </label>
            <select class="form-control" id="reason" v-model="reason">
                <option value="" disabled>Select a reason</option>
                <option v-for="(reason, index) in reasons" :key="index" :value="reason">{{reason}}</option>
            </select>
        </div>

        <div class="form-group" :class="{error: validate($v.explanation)}">
            <label for="explanation-textarea">
                <span>Explanation </span>
                <font-awesome-icon class="info-icon" :icon="['fas', 'info-circle']" title="The explanation for breaking the glass" />
            </label>
            <textarea class="form-control" id="explanation-textarea" rows="3" v-model="explanation"></textarea>
        </div>

        <div class="form-group" :class="{error: validate($v.department)}">
            <label for="department">
                <span>Department </span>
                <font-awesome-icon class="info-icon" :icon="['fas', 'info-circle']" title="The department where you will break the glass" />
            </label>
            <!-- <input type="text" class="form-control" id="department" v-model="department" placeholder="example: 101000206"/> -->
            <StorageInput autocomplete="department" storage_key="department" v-model="department" id="department" placeholder="example: 101000206"/>
        </div>

        <div class="form-group">
            <label for="department-type">
                <span>Department type </span>
                <font-awesome-icon class="info-icon" :icon="['fas', 'info-circle']" title="The type of the provided department ID" />
            </label>
            <select class="form-control" id="department-type" v-model.lazy="departmentType" @change.prevent>
                <option value="" disabled>Select...</option>
                <option v-for="(department_type, index) in departmentTypes" :key="index" :value="department_type">{{department_type}}</option>
            </select>
        </div>

        <div class="form-group">
            <label for="user-type">
                <span>EHR user type </span>
                <font-awesome-icon class="info-icon" :icon="['fas', 'info-circle']" title="The type of the EHR user ID" />
            </label>
            <select class="form-control" id="user-type" v-model.lazy="userType" @change.prevent>
                <option value="" disabled>Select...</option>
                <option v-for="(user_type, index) in userTypes" :key="index" :value="user_type">{{user_type}}</option>
            </select>
        </div>

        <div class="form-group" :class="{error: validate($v.user)}">
            <label for="ehr-user">
                <span>EHR user </span>
                <font-awesome-icon class="info-icon" :icon="['fas', 'info-circle']" title="EHR user" />
            </label>
            <DebounceInput autocomplete="off" type="text" class="form-control" id="ehr-user" v-model="user" />
            <!-- <input autocomplete="off" type="text" class="form-control" id="ehr-user" v-model="user" /> -->
        </div>

        <div class="form-group" :class="{error: validate($v.password)}">
            <label for="password">
                <span>REDCap password </span>
                <font-awesome-icon class="info-icon" :icon="['fas', 'info-circle']" title="Provide your password to proceed" />
            </label>
            <input autocomplete="redcap-password" type="password" class="form-control" id="password" v-model="password" />
            <span class="error" v-if="authentication_error">Error: {{authentication_error}}</span>
        </div>


        <div class="form-group buttons">
            
            <button class="btn btn-sm btn-outline-success" type="submit" :disabled="processing || $v.$invalid">
                <font-awesome-icon :icon="['fas', 'lock-open']" fixed-width/>
                <span> Break the glass</span>
                <section v-if="processing" id="button_loader" :style="{width: `${processed_percentage}%`}"></section>
            </button>
            <button class="btn btn-sm btn-outline-secondary ms-2" type="button" @click="resetForm">
                <font-awesome-icon :icon="['fas', 'undo']" fixed-width/>
                <span> Reset</span>
            </button>
            <button class="btn btn-sm btn-outline-secondary ms-2" type="button" @click="onCancel">
                <font-awesome-icon :icon="['fas', 'times-circle']" fixed-width/>
                <span> Cancel</span>
            </button>
            <div v-if="processing" class="processing-info ms-2">
                <font-awesome-icon :icon="['fas', 'spinner']" spin fixed-width/>
                <span> Processing {{results_count}}/{{checked_mrns.length}}</span>
            </div>
        </div>



    </form>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import StorageInput from '@/components/StorageInput'
import DebounceInput from '@/components/DebounceInput'

export default {
    components: { StorageInput, DebounceInput },
    data() {
        return {
            checked_mrns: [],
            // department_type: department_types[0],
            password: '', // REDCap password must be provided
            authentication_error: null,
            // processing variables
            cancelRequest: null, // used to stop the current ajax request
            processing: false,
            processed_mrn: null,
            results: {},
        }
    },
    created() {
        this.resetForm()
    },
    computed: {
        debug() { return this.$store.state.debug },
        /**
         * patients property is used for debug
         * as an alternative to the selectable list of detected mrns
         */
        patients: {
            get() { return this.checked_mrns.join("\n") },
            set(value) { this.checked_mrns = value.split("\n") },
        },
        mrns() { return this.$store.state.mrns.list },
        reasons() { return this.$store.state.information.Reasons },
        legal_message() { return this.$store.state.information.LegalMessage },
        /**
         * class for the mrn select toggle button
         */
        all_selected_class() {
            return this. all_mrns_selected ? 'btn-success' : 'btn-outline-secondary'
        },
        all_mrns_selected() {
            const all_selected = this.checked_mrns.length === this.mrns.length
            return all_selected
        },
        results_count() {
            return Object.keys(this.results).length
        },
        // get the progress percentage
        processed_percentage() {
            const selected_count = this.checked_mrns.length
            if(this.results_count<=0 || selected_count<=0) return 0
            return this.results_count/selected_count * 100
        },
        departmentTypes() { return this.$store.state.settings['metadata']['departmentTypes'] },
        departmentType: {
            get() { return this.$store.state.settings['data']['departmentType'] || ''},
            set(value) { this.$store.dispatch('settings/setDataItem', {key: 'departmentType', value}) },
        },
        patientTypes() { return this.$store.state.settings['metadata']['patientTypes'] },
        patientType: {
            get() { return this.$store.state.settings['data']['patientType'] || ''},
            set(value) { this.$store.dispatch('settings/setDataItem', {key: 'patientType', value}) },
        },
        user: {
            get() { return this.$store.state.settings['data']['user'] || ''},
            set(value) { this.$store.dispatch('settings/setDataItem', {key: 'user', value}) }
        },
        reason: {
            get() { return this.$store.state.settings['data']['reason'] || ''},
            set(value) { this.$store.dispatch('settings/setDataItem', {key: 'reason', value}) }
        },
        explanation: {
            get() { return this.$store.state.settings['data']['explanation'] || ''},
            set(value) { this.$store.dispatch('settings/setDataItem', {key: 'explanation', value}) }
        },
        department: {
            get() { return this.$store.state.settings['data']['department'] || ''},
            set(value) { this.$store.dispatch('settings/setDataItem', {key: 'department', value}) }
        },
        userTypes() { return this.$store.state.settings['metadata']['userTypes'] || ''},
        userType: {
            get() { return this.$store.state.settings['data']['userType'] },
            set(value) { this.$store.dispatch('settings/setDataItem', {key: 'userType', value}) },
        },
    },
    methods: {
        resetForm() {
            this.checked_mrns = []
            const systemSettings = this.$store.state.settings.systemSettings
            this.$store.dispatch('settings/setData', {...systemSettings})
        },
        /**
         * check if the form is valid before submitting
         */
        async checkForm(e) {
            e.preventDefault();
            if(this.$v.$invalid) return false
            // try to authenticate, then perform break the glass
            this.breakTheGlass()
        },
        /**
         * validate a model checking if is dirty and invalid.
         * used to determine the "error" class in the form elements
         */
        validate(validation_model) {
            return validation_model.$dirty && validation_model.$invalid
        },
        /**
         * toggle MRN list selection
         */
        toggleSelectMrnList() {
            if(this.checked_mrns.length < this.mrns.length) {
                this.checked_mrns = [...this.mrns]
            }else {
                this.checked_mrns = []
            }
        },
        /**
         * dispatch a break the glass API call
         */
        async breakTheGlass() {
            try {
                // collect checked MRNs
                const mrns = [...this.checked_mrns]
                // common params for all requests
                const common_params = {
                    patientType: this.patientType,
                    reason: this.reason,
                    explanation: this.explanation,
                    department: this.department,
                    departmentType: this.departmentType,
                    user: this.user,
                    userType: this.userType,
                    password: this.password,
                }
                // reset the processing params
                this.results = {}
                this.processing = true
                for(let mrn of mrns) {
                    // exit if the process is stopped (using the cancel button)
                    if(!this.processing) break
                    this.processed_mrn = mrn
                    // create a cancel token to stop the request
                    const request_params = Object.assign(common_params, {mrn})
                    const promise = this.$API.dispatch('glassBreaker/accept', request_params)
                    this.cancelRequest = promise.cancel
                    const response = await promise
                    this.authentication_error = null
                    const {data} = response
                    this.$set(this.results, mrn, data)
                }
                this.$emit('done', {success: true, message: 'Success', results: this.results})
            } catch (error) {
                const {response:{data={}}={}} = error
                const {message='error', code=403} = data
                // detect if we have a REDCap authentication error (wrong password)
                if(code==403) {
                    this.authentication_error = message
                }else {
                    this.$emit('error', {success: false, message: error})
                }
                /* if(typeof error == 'object' && error.constructor.name == 'Cancel') {
                    // detect if the user canceled the ajax process
                    this.$emit('cancel', {message: error})
                }else {
                    this.$emit('done', {message: error})
                } */
                // this.$emit('done', {message: error, icon: 'error'})
            }finally {
                this.processing = false
                this.processed_mrn = null
                this.cancel_source = null
            }
        },
        onCancel() {
            this.processing = false
            if( typeof this.cancelRequest == 'function' ) {
                // cancel the ajax request if any
                this.cancelRequest('Operation canceled by the user')
            }
            // standard cancel with no ongoing process
            this.$emit('cancel')
        }
    },
    validations: {
        checked_mrns: {
            required,
            minLength: minLength(1)
        },
        explanation: { required, },
        reason: { required, },
        department: { required, },
        patientType: { required, },
        departmentType: { required, },
        password: { required, },
        userType: { required, },
        user: { required, },
    }
}
</script>

<style scoped>
.accept-form {
    /* max-width: 500px; */
    margin: auto;
    text-align: left;
    font-size: 14px;
}
label {
    font-weight: bold;
}
label .info-icon {
    cursor: help;
}
.mrn-list {
    max-height: 100px;
    overflow-y: auto;
}
.error {
    color: red;
    font-style: italic;
    font-size: 0.8rem;
}
/* processing styles */
.buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.processing-info {
    display: inline-block;
}
button[type="submit"] {
    position: relative;
}
#button_loader {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(50,255,0, .5);
    width: 0;
    transition-timing-function: ease-in-out;
    transition-duration: 300ms;
    transition-property: all;
}
</style>