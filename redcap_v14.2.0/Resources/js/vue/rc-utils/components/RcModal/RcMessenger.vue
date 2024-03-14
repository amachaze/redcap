<template>
    <Teleport to="body">


        <template v-for="(options) in modalsOptions" :key="options.ID">
            <RcModal @mounted="onModalMounted" @hide="onModalHidden" @show="onModalShown" :hideCancel="options.okOnly" >
                <template #header>
                    <div v-html="options.title"></div>
                </template>
                <template #default>
                    <div v-html="options.body"></div>
                </template>
            </RcModal>
        </template>
    </Teleport>
</template>
<script>
import RcModal from "./RcModal.vue"
// store a reference to the component as soon as it is created    
let instance
/**
 * 
 * @param {*} app 
 */
const init = (app) => {
    app.config.globalProperties.$showModal = (options) => {
        if(!instance) return
        return instance?.showModal(options)
    }
}


const Messenger = {
    components: { RcModal, },
    mounted() {
        instance = this // set a static reference to the component
    },
    data() {
        return {
            modalsCounter: 0,
            modalsOptions: [],
            modals: [],
        }
    },
    computed: {

    },
    methods: {
        exists(ID) {
            const found = this.modalsOptions.find(modal => modal?.ID === ID)
            return (typeof found !== 'undefined')
        },
        async showModal(options) {
            const defaultOptions = {
                title: '',
                body: '',
                okOnly: true,
                ID: ++this.modalsCounter,
            }
            const promise = new Promise((resolve, reject) => {
                // save a reference to resolve and reject in the options
              defaultOptions.resolve = resolve  
              defaultOptions.reject = reject  
            })
            options = Object.assign(defaultOptions, options)
            this.modalsOptions.push(options)
            return promise
        },
        onModalHidden(modal, status) {
            const index = this.modals.indexOf(modal)
            if(index<0) return
            // extract the resolve/reject methods from the promise in showModal
            const {resolve, reject} = this.modalsOptions[index]
            if(isNaN(status) || status<0) reject(status)
            else resolve(status)
            this.modals.splice(index, 1)
            this.modalsOptions.splice(index, 1)
        },
        async onModalMounted(modal) {
            this.modals.push(modal)
            modal.show()
        },

    },
}

export {Messenger as default, init}
</script>

<style scoped>

</style>