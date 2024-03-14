<div class="btg-wrapper">
    <span class="d-block small text-muted">
    @if($break_the_glass_enabled)
        <i data-btg-enabled='<?= $break_the_glass_enabled ?>' class="fas fa-check-circle text-success"></i>
        <span>break the glass enabled</span>
        <div>
            <button class="btn btn-xs btn-secondary hidden" data-rc-toggle>
                <span>Break The Glass</span>
                <span id="btg-badge" class="badge badge-danger"></span>
            </button>
        </div>
        {{-- <button type="button" class="btn btn-primary btn-xs" data-rc-toggle="modal" data-target="#btg-form-modal">Launch modal</button> --}}
    @else
        <i class="fas fa-times-circle text-danger"></i>
        <span title="Break the Glass is disabled for this project">break the glass disabled</span>
    @endif
    </span>
</div>

<rc-teleport target="body" where="beforeend">
    <template>
        {{-- this is hidden, but the content below will be teleported --}}
        <rc-modal id="btg-form-modal">
            <h5 slot="header" >Break The Glass</h5>
            <btg-form id="btg-form"></btg-form>
            <button  slot="primary-button" id="btg-button" class="btn btn-sm btn-primary">Break The Glass</button>
        </rc-modal>
    
        <rc-modal id="btg-results-modal" ok-only>
            <h5 slot="header" >Break The Glass</h5>
            <btg-results></btg-results>
        </rc-modal>
    </template>
</rc-teleport>

<script type="module">
import BTGForm from '{{$APP_PATH_JS}}web-components/break-the-glass/BTGForm.js'
import BTGResults from '{{$APP_PATH_JS}}web-components/break-the-glass/BTGResults.js'
import { Modal, Teleport, defineCustomElement } from '{{$APP_PATH_JS}}web-components/rc-components/dist/index.js'

/**
 * define all custom elements
 */
let btgFormTag = 'btg-form'
let btgResultsTag = 'btg-results'
defineCustomElement(btgFormTag, BTGForm)
defineCustomElement(btgResultsTag, BTGResults)
defineCustomElement('rc-modal', Modal)
defineCustomElement('rc-teleport', Teleport)


class BtgApp {
    constructor() {
        this.registerComponents()
        this.addListeners()
    }
    
    registerComponents() {
        this.btgForm = document.querySelector(`${btgFormTag}#btg-form`)
        this.btgResults = document.querySelector(btgResultsTag)
        this.btgModal = document.querySelector('#btg-form-modal')
        this.btgResultsModal = document.querySelector('#btg-results-modal')
        this.modalToggle = document.querySelector('[data-rc-toggle]')
        this.btgBadge = document.querySelector('#btg-badge')
        this.btgButton = document.querySelector('#btg-button')
    }


    makeModal(title, body) {
        Modal.closeOpenModals()
        Modal.alert({title, body})
    }

    addListeners() {
        const self = this
        /* this.btgModal.addEventListener('hidden', async e => {
            const status = e.detail
            if(status!==1) return
            const response = await this.btgForm.submit()
            this.btgResults.results = response
        }) */
        if(this.modalToggle) this.modalToggle.addEventListener('click', async e => {
            this.btgModal.show()
        })
        this.btgButton.addEventListener('click', async e => {
            try {
                const response = await self.btgForm.submit()
                self.btgModal.hide(true)
                self.btgResults.results = response
                self.btgResultsModal.show()
                // fetch updated list of protected MRNs
                self.btgForm.fetchProtectedMrnList()
            } catch (error) {
                this.makeModal('Error', error)
            }
        })

        // toggle the BTG button when mrns are fetched
        this.btgForm.addEventListener('mrns-updated', (e) => {
            const total = e?.detail?.length ?? 0
            if(total===0) {
                this.modalToggle.classList.add('hidden')
            }else {
                this.modalToggle.classList.remove('hidden')
            }
            this.btgBadge.innerHTML = (total > 0) ? `${total}` : ''
            // this.btgModal.show()
        })
        // update the button each time the form is validated
        this.btgForm.addEventListener('validated', (e) => {
            const valid = e.detail
            if(valid) self.btgButton.disabled = false
            else self.btgButton.disabled = true
        })
        this.btgForm.addEventListener('loading', (e) => {
            const loading = e.detail
            if(loading) self.btgButton.disabled = true
            else self.btgButton.disabled = false
        })
    }

    async run() {
        try {
            await this.btgForm.init()
            /* this.btgForm.mrns = {
                123456: {
                    mrn: 123456,
                    isExpired: false,
                    fhirBtgToken: '123-asd-asdsadas',
                    timestamp: '2022-11-21 21:21:23'
                },
                7890444: {
                    mrn: 7890444,
                    isExpired: true,
                    fhirBtgToken: '123-asd-asdsadas',
                    timestamp: '2022-11-21 21:21:23'
                },
            } */
        } catch (error) {
            this.makeModal('Error', error)
        }
        /* this.btgResults.results = [
            {mrn: 1234, status: 'accepted', details: 'some details here'},
            {mrn: 43563456, status: 'skipped', details: 'some more details here'},
            {mrn: 34568, status: 'not accepted', details: 'this was not accepted for some reasons'},
        ]
        this.btgResultsModal.show() */
    }

}
@if($break_the_glass_enabled)

document.addEventListener('DOMContentLoaded', e => {
    const app = new BtgApp()
    app.run()
})

@endif
</script>