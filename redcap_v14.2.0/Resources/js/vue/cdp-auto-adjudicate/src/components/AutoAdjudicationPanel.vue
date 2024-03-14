<template>
<div>

  <div class="card">
    <div class="card-body">
      <p class="card-title">
        <font-awesome-icon :icon="['fas', 'check']" class="text-success"/>
        <span> Instant adjudication is enabled</span>
        <span class="small ms-2" v-if="loading">
          <font-awesome-icon :icon="['fas', 'spinner']" spin />
          <span> Loading...</span>
        </span>
      </p>
      <div v-if="total_fields>0">
        <p class="card-text">There {{single_field ? 'is' : 'are'}} <strong>{{total_fields}}</strong> field{{single_field ? '' : 's'}} with <strong>{{total_values}}</strong> value{{single_value ? '' : 's'}} ready to be processed in this project.</p>
        <p>Click the button below to start the instant adjudication process.</p>
        <b-button-group size="sm">
          <b-button @click="prompt(processFields)" size="sm" variant="primary" :disabled="processsing">
            <span>
              <font-awesome-icon :icon="['fas', 'spinner']" spin v-if="processsing"/>
              <font-awesome-icon :icon="['fas', 'check-circle']" v-else/>
              Process
            </span>
          </b-button>
          <b-dropdown right text="" size="sm" variant="primary">
            <b-dropdown-text class="adjudication-dropdown-text">When a large number of values needs to be processed it is possible to start the process in background and get a message when completed.</b-dropdown-text>
            <!-- <b-dropdown-divider></b-dropdown-divider> -->
            <b-dropdown-form>
              <b-form-checkbox class="small" v-model="send_feedback"><font-awesome-icon :icon="['fas', 'envelope']" /> Send me a message when completed</b-form-checkbox>
              <b-button variant="primary" size="sm" @click="prompt(processCachedData)">
                <font-awesome-icon :icon="['fas', 'check-circle']"/>
                <span> Process in background</span>
              </b-button>
            </b-dropdown-form>
          </b-dropdown>
        </b-button-group>
      </div>
      <div v-else>
        <p class="card-text">No fields with pending adjudication have been found.</p>
      </div>
    </div>
  </div>

  <!-- modal showing the progress of the adjudication progress -->
  <b-modal ref="progress-modal" title="Adjudicating data" no-close-on-esc no-close-on-backdrop hide-header-close
      no-stacking>
    <p>REDCap is adjudicating the pending data stored in the database using the CDP mapping configuration</p>
    <div>
      <span>Values</span>
      <b-progress :max="total_values" animated>
        <b-progress-bar :value="adjudicated" show-value variant="success" />
        <b-progress-bar :value="excluded" show-value variant="warning" />
        <b-progress-bar :value="skipped_for_error" show-value variant="danger" />
      </b-progress>
      <div class="small my-2">
        <section><span>Adjudicated values</span>: <strong class="lining-numbers">{{adjudicated}}</strong></section>
        <section><span>Excluded values</span>: <strong class="lining-numbers">{{excluded}}</strong></section>
        <section><span>Unprocessed values due to error</span>: <strong class="lining-numbers">{{skipped_for_error}}</strong></section>
      </div>
    </div>
    <hr>
    <div v-if="current_field">
      <span>Fields</span>
      <ul>
        <li>record ID: {{current_field.record}}</li>
        <li>event ID: {{current_field.event_id}}</li>
        <li>field name: {{current_field.field_name}}</li>
      </ul>
    </div>
    <b-progress :max="total_fields" animated>
      <b-progress-bar :value="successful" show-value variant="success" />
      <b-progress-bar :value="total_errors" show-value variant="danger" />
    </b-progress>
    <div class="small my-2">
      <section><span>Successful adjudications</span>: <strong class="lining-numbers">{{successful}}</strong></section>
      <section><span>Errors</span>: <strong class="lining-numbers">{{total_errors}}</strong></section>
    </div>
    <div>
      <ErrorsViewer :errors="adjudication_errors" />
    </div>
    <template #modal-footer="{ }">
      <b-button size="sm" variant="secondary" @click="onAudjudicationCanceled">cancel</b-button>
    </template>
  </b-modal>

  <!-- modal showing a summary of the process and errors (if any) -->
  <DialogModal ref="completed-modal">
    <template v-slot:body>
      <b-alert variant="danger" :show="error!==null">
      {{error}}</b-alert>
      <span>Summary</span>
      <b-table class="small" striped hover :items="review_items" bordered small>
        <!-- A custom head for excluded values -->
        <template #head(excluded_values)="data">
          {{data.label}}<sup>1</sup>
        </template>
        <template #head(unprocessed_values)="data">
          {{data.label}}<sup>2</sup>
        </template>
      </b-table>
      <b-alert variant="light" show>
        <div class="small excluded-notes">
          <span><sup>1</sup> Values are excluded (not saved) in the adjudication process if:</span>
          <ul>
            <li>empty</li>
            <li>matching existing values</li>
            <li>not the best option based on the 'preselect' mapping rule</li>
          </ul>
          <span><sup>2</sup> Unprocessed values have been skipped due to an error during the adjudication process</span>
        </div>
      </b-alert>

      <div v-if="total_errors>0">
        <span>Errors</span>
        <ErrorsViewer :errors="adjudication_errors">
          <template v-slot:footer>
            <CsvExportButton :items="adjudication_errors" file_name="adjudication errors">Export errors</CsvExportButton>
          </template>
        </ErrorsViewer>
      </div>
    </template>
  </DialogModal>

</div>
</template>

<script>
import DialogModal from '@/components/DialogModal'
import ErrorsViewer from '@/components/ErrorsViewer'
import CsvExportButton from '@/components/CsvExportButton'


export default {
  components: { DialogModal, ErrorsViewer, CsvExportButton },
  data() {
    return {
      processsing: false,
      cancel_promise: null, // reference to the current API cancel method
      background: true, //process in background
      send_feedback: false,
      // processing variables
      successful: 0,
      cancel: false,
      adjudicated: 0,
      excluded: 0,
      skipped_for_error: 0, // values not processed because of an error
      current_field: null,
      adjudication_errors: [],
      error: null, // store errors that caused the process to stop (could also be canceled by user)

    }
  },
  props: {
    fields: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    total_fields() {
      return this.fields.length
    },
    total_values() {
      const total = this.fields.reduce((accumulator, {total=0}) => {
        return accumulator + parseInt(total)
      }, 0)
      return total
    },
    total_errors() {
      return this.adjudication_errors.length
    },
    total_processed() {
      return this.successful+this.total_errors
    },
    single_field() { return this.total_fields===1 },
    single_value() { return this.total_values===1 },
    review_items() {
      const data = {
        total_fields: this.total_fields,
        processed: this.total_processed,
        successful: this.successful ,
        errors: this.adjudication_errors.length,
        adjudicated_values: this.adjudicated,
        excluded_values: this.excluded,
        unprocessed_values: this.skipped_for_error,
      }
      return [data]
    }
  },
  methods: {
    /**
     * handle cancel coming from the modal
     */
    onAudjudicationCanceled() {
      this.cancel = true
      if(typeof this.cancel_promise === 'function') this.cancel_promise('Operation canceled by the user')
    },
    initProcessVariables() {
        this.error = null // reset process execution error
        this.cancel = false
        this.successful = 0
        this.adjudicated = 0 // reset counter
        this.excluded = 0 // reset counter
        this.skipped_for_error = 0 // reset counter
        this.adjudication_errors = [] // reset errors
    },
    /**
     * process all records sequentially.
     * the progress is shown in a modal and can be stopped.
     * reload the stats when done.
     */
    async processFields() {
      const results = []
      try {
        const modal = this.$refs['progress-modal']
        this.processsing = true
        this.initProcessVariables()

        const fields = [...this.fields]
        if(modal) modal.show() // show the modal with the progress
        
        for(let field of fields) {
          this.current_field = field
          if(!this.cancel && field) {
            const result = await this.processField(field)
            const {adjudicated=0, excluded=0, error} = result
            // collect errors
            if(error) {
              let record_total_values = parseInt(field.total)
              this.skipped_for_error += record_total_values
              this.addError(this.current_field, error)
            }else {
              if(!isNaN(adjudicated)) this.adjudicated += adjudicated
              if(!isNaN(excluded)) this.excluded += excluded
              results.push(result)
              this.successful++
            }
          }
        }

        // if(modal) modal.hide() // hide the modal
        

      } catch (error) {
        let errorMessage
        if('message' in error) {
          errorMessage = error.message
        }else {
          const {response:{data}={}} = error // try to extract data from the error (if XHR)
          errorMessage = data || error
          // let options = {title:'Error'}
          // this.$bvModal.msgBoxOk(message, options)
        }
        if(typeof errorMessage != 'string') errorMessage = 'error'
        this.error = errorMessage
      }finally {
        this.processsing = false
        this.current_field = null
        this.onProcessFieldsDone(results)
      }
    },
    addError(field, error) {
      const {record, field_name, event_id} = field
      const label = `${record}-${field_name}-${event_id}`
      this.adjudication_errors.push({label, error})
    },
    /**
     * show a modal and emit 'adjudication-completed' when closed
     */
    async onProcessFieldsDone(results) {
      const modal = this.$refs['completed-modal']
      const title = 'Process completed'
      if(modal) {
        const result = await modal.show({title})
        this.$emit('adjudication-completed', results)
      }
    },
    /**
     * send a request to process a single record
     */
    async processField(field) {
      const promise = this.$API.dispatch('ddp_records/processField', field)
      this.cancel_promise = promise.cancel
      const response = await promise
      const {data=[]} = response
      return data
    },
    /**
     * send a request to process all records in backgroud
     */
    async processCachedData() {
      try {
        const request_params = {
          background: this.background,
          send_feedback: this.send_feedback
        }
        const response = await this.$API.dispatch('ddp_records/processCachedData', request_params)
        const {data=[]} = response
        let {success, message='The process will be run in the background.'} = data
        let options = {title:'Success'}
        this.$bvModal.msgBoxOk(message, options)
      } catch (error) {
        const {response:{data}={}} = error // try to extract data from the error (if XHR)
        let message = data || error
        let options = {title:'Error'}
        this.$bvModal.msgBoxOk(message, options)
      }
    },
    /**
     * display a prompt before the process is started
     */
    async prompt(callback) {
      const options = {title: 'Please Confirm'}
      const message = `You are about to start the adjudication process.
      Please be aware that your existing data could be overwritten in the process according to your mapping 'preselect' configuration.`
      const response = await this.$bvModal.msgBoxConfirm(message, options)
      if(response && typeof callback==='function') callback()
    },
  }
}
</script>

<style scoped>
.card-title {
  font-weight: bold;;
}
.card-body {
  padding: 10px 15px;
}
[role="alert"].alert {
  border-color: rgba(0,0,0,0.1) !important;
}
.excluded-notes ul {
  margin: 0;
}
.lining-numbers {
  font-variant-numeric: lining-nums;
}
.adjudication-dropdown-text {
  width: 350px;
  max-width: 50vw;
}
</style>