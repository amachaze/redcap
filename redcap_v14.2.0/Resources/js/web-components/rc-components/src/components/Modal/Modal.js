
import Base from '../Base.js'
// import sheet from './style.css' assert { type: 'css' };
import style from './style.js'

const RETURN_VALUE = Object.freeze({
    OK: 1,
    CANCEL: 0,
    ERROR: -1
})

export default class Modal extends Base {

    #elements = {}

    /**
     * keep track of open modal to make sure only one is open at all times
     */
    static #modals = []
    static get modals() { return Modal.#modals }
    static trackOpenModal(modal) {
        if(Modal.#modals.indexOf(modal)<0) Modal.#modals.push(modal)
    }
    static untrackOpenModal(modal) {
        const index = Modal.#modals.indexOf(modal)
        if(index<0) return
        Modal.#modals.splice(index, 1)
        if(Modal.#modals.length<1) Modal.restoreBodyOverflow()
    }
    static closeOpenModals() {
        for (const modal of Modal.#modals) modal.hide()
    }

    disconnectedCallback() {
        super.disconnectedCallback()
        Modal.untrackOpenModal(this)
    }

    constructor() {
		super()
        this.addStyle(style)
	}

    #title = ''
    #body = ''
    #counter = 0
    #visible = false
    
    get title() { return this.#title }
    set title(value) { this.#title = value }
    
    get body() { return this.#body }
    set body(value) { this.#body = value }
    
    get counter() { return this.#counter }
    set counter(value) { this.#counter = value }

    get visible() { return this.#visible }
    set visible(value) {
        this.#visible = Boolean(value)
        this.setAttribute('data-visible', value)
    }

    static get observedAttributes() { return ['title', 'body', 'visible'] }

    onAttributeChanged(name, oldValue, newValue) {
        switch (name) {
            case 'title':
                this.title = newValue
                break;
            case 'body':
                this.body = newValue
                break;
            case 'visible':
                this.visible = newValue==='true'
                break;
        
            default:
                break;
        }
    }

	afterRender() {
        const container = this.#elements.container = this.shadowRoot.querySelector('[data-container]')
        if(container) container.addEventListener('click', (event) => {
            if(container !== event.target) return
            event.stopPropagation();
            // console.log('clicked content', [this.visible])
            if(this.visible) this.hide()
            else this.show()
            // this.hide(RETURN_VALUE.CANCEL)
        })

        const close = this.#elements.close = this.shadowRoot.querySelector('[data-close]')
        if(close) close.addEventListener('click', () => {
            this.hide(RETURN_VALUE.CANCEL)
        })

        const buttonOK = this.#elements.buttonOK = this.shadowRoot.querySelector('[data-button-ok]')
        if(buttonOK) buttonOK.addEventListener('click', (event) => {
            this.hide(RETURN_VALUE.OK)
        })

        const buttonCancel = this.#elements.buttonCancel = this.shadowRoot.querySelector('[data-button-cancel]')
        if(buttonCancel) buttonCancel.addEventListener('click', (event) => {
            this.hide(RETURN_VALUE.CANCEL)
        })
    }

    async show(closeOthers=true) {
        const promise = this.showPromise = new Promise((resolve, reject) => {
            this.addEventListener('hidden', (e) => {
                switch (e.detail) {
                    case RETURN_VALUE.OK:
                        resolve(true)
                        break;
                    case RETURN_VALUE.CANCEL:
                        resolve(false)
                        break;
                    case RETURN_VALUE.ERROR:
                        reject(true)
                        break;
                    default:
                        break;
                }
            })
        }, {once: true})
        this.visible = true
        this.$emit('shown')
        this.animate(true)
        // this.#registerOpenModal()
        if(closeOthers) Modal.closeOpenModals()
        Modal.trackOpenModal(this)
        promise.then(() => {
            Modal.untrackOpenModal(this)
        } )
        return promise
    }

    async hide(code=RETURN_VALUE.CANCEL) {
        this.visible = false
        await this.animate(false)
        this.$emit('hidden', code)
        // this.#deregisterOpenModal()
        return code
    }

    static disableBodyOverflow() {
        document.body.style.overflow = 'hidden'
    }
    /**
     * restore the overflow property if no modals are open
     */
    static restoreBodyOverflow() {
        if(Modal.#modals.length>0) return
        document.body.style.overflow = 'auto'
    }

    async animate(visible=false) {
        let timing = {
            duration: 300,
            fill: 'forwards',
            easing: 'ease-in-out',
            // iterations: Infinity
        }
        const container = this.shadowRoot.querySelector('[data-container]')
        const content = this.shadowRoot.querySelector('[data-content]')
        let containerKeyframes = [
            { opacity: 0 },
            { opacity: 1 },
        ]
        if(visible) {
            let keyframes = [
                { transform: 'translate(0, -25%)' },
                { transform: 'translate(0, 0)' },
            ]
            let animation = content.animate(keyframes, timing)
            Modal.disableBodyOverflow()
            // animation.pause()
            // animation.play()
            
        }
        else {
            let keyframes = [
                { transform: 'translate(0, 0)' },
                { transform: 'translate(0, -25%)' },
            ]
            let animation = content.animate(keyframes, timing)
            await animation.finished
            Modal.restoreBodyOverflow()
            /* animation.onfinish = () => {
                container.classList.add('hidden')
            } */
        }
    }


    get template() {
        const visible = this.visible
        const title = this.title
        const body = this.body
        /*html*/
        return `
            <div data-container data-visible="${visible}">
                <div data-content>
                    <div data-header>
                        <slot name="header">
                            <p>${title}</p>
                        </slot>
                        <span data-close>×</span>
                    </div>
                    <div data-body>
                        <slot>${body}</slot>
                    </div>
                    <div data-footer>
                        <slot name="footer">
                            <div data-footer-buttons>
                                <slot name="secondary-button">
                                    <button class="btn btn-sm btn-secondary" type="button" data-button-cancel>Cancel</button>
                                </slot>
                                <slot name="primary-button">
                                    <button class="btn btn-sm btn-primary" type="button" data-button-ok>Ok</button>
                                </slot>
                            </div>
                        </slot>
                    </div>
                </div>
            </div>
        `
    }
}

/**
 * additional static methods
 */

/**
 * display a confirmation dialog
 * 
 * @param {object} params 
 * @returns 
 */
Modal.make = (params) => {
    const {title,body} = params
    const modal = new Modal()
    modal.title = title
    modal.body = body
    document.body.appendChild(modal)
    // let elements = slots.assignedElements({flatten: true});
    /* let slots = modal.shadowRoot.querySelectorAll('slot');
    let slot = modal.shadowRoot.querySelector('slot[name="secondary-button"]');
    slot.insertAdjacentHTML('afterbegin', `<button>button</button>`)
    console.log(slots, slot) */
    modal.addEvent(modal, 'hidden', () => document.body.removeChild(modal) )
    return modal
}
Modal.confirm = (params) => {
    const modal = Modal.make(params)
    return modal.show()
}
Modal.alert = (params) => {
    const modal = Modal.make(params)
    modal.setAttribute('ok-only', true)
    return modal.show()
}