<template>
  <div>
        <div v-if="debug || (mrns.length && !error)">
            <button class="btn btn-sm btn-info" @click="reviewBlockedMrns" :disabled="loading || (mrns.length==0 && !debug)">
                <font-awesome-icon v-if="loading" fa-spinner :icon="['fas', 'spinner']" spin fixed-width/> 
                <font-awesome-icon v-else :icon="['fas', 'lock']" fixed-width/>
                <span> Protected patients detected <span class="badge badge-danger" v-text="mrns.length"/></span>
            </button>
        </div>

        <b-modal ref="modal-accept" v-model="showReview" hide-footer title="Break the glass" size="lg" >
            <AcceptForm @cancel="closeModal" @done="onReviewDone" @error="onError" />
        </b-modal>

        <b-modal ref="modal-results" ok-only title="Completed" >
            <table id="bg-results-table" class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Patient</th>
                        <th>Message</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(result, mrn) in results" :key="mrn">
                        <td>{{mrn}}</td>
                        <td>{{result.message}}</td>
                    </tr>
                </tbody>
            </table>
            
        </b-modal>

  </div>
</template>

<script>
import AcceptForm from '@/components/AcceptForm'

function noDelaySetInterval(func, interval=0)
{
    func()
    return setInterval(func, interval)
}

export default {
    components: { AcceptForm }, 
    data() {
        return {
            showReview: false,
            loading: false,
            error: false,
            interval_handle: null,
            interval_amount: 60*1000,
            results: {},
        }
    },
    computed: {
        /**
         * connect read-only states from the store
         */
        mrns() { return this.$store.state.mrns.list },
        debug() { return this.$store.state.debug },
    },
    destroyed() {
        clearInterval(this.interval_handle)
    },
    methods: {
        pollMrnList() {
            clearInterval(this.interval_handle)
            this.interval_handle = noDelaySetInterval(async () => {
                this.getMrnList()
            }, this.interval_amount) 
        },
        async getMrnList() {
            try {
                this.loading = true
                const response = await this.$API.dispatch('glassBreaker/getProtectedMrnList')
                const {data} = response
                this.$store.dispatch('mrns/setList', data)
            } catch (error) {
                console.log(error)
                this.error = error
            }finally {
                this.loading = false
            }
        },
        /**
         * get values from the initialize endpoint
         */
        async initialize() {
            try {
                this.loading = true
                const response = await this.$store.dispatch('information/initialize', this)
                return true
            } catch (error) {
                const {response={}} = error
                const {data: {message=error, code=0}={}} = response
                this.error = `error initializing:\r\n${message}`
                this.$bvModal.msgBoxOk(this.error, {
                    title: 'Error',
                    // size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'secondary',
                })
                return false
            } finally {
                this.loading = false
            }

        },
        closeModal() {
            this.showReview = false
        },
        /**
         * show the dialog that allows the user
         * to break the glass for blocked MRNs
         */
        async reviewBlockedMrns() {
            const initialized = await this.initialize()
            if(!initialized) {
                const message = this.error || 'Error initializing the "break the glass" process.'
                this.$bvModal.msgBoxOk(message, {
                    title: 'Error',
                    // size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'secondary',
                })
                return
            }
            /* const modal = this.$refs['modal-accept']
            if(!modal) return console.log('error: cannot open the accept form')
            modal.show() */
            this.showReview = true
        },
        onReviewDone({message='', results}) {
            this.closeModal()
            this.results = {...results}
            const modal = this.$refs['modal-results']
            if(modal) modal.show()
            // reload the list after the review has been made
            this.getMrnList()
        },
        onError({message}) {
            this.$bvModal.msgBoxOk(message, {
                title: 'Error',
                // size: 'sm',
                buttonSize: 'sm',
                okVariant: 'secondary',
            })
        },
        togglePolling(enable=false) {
            if(enable) clearInterval(this.interval_handle)
            else this.pollMrnList()
        },
    },
    watch: {
        showReview: {
            immediate: true,
            handler(value) {
                this.togglePolling(value)
            }
        }
    }
}
</script>

<style scoped>
#bg-results-table tbody {
    word-break: break-word;
}
</style>