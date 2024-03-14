import {default as Base} from './Base.js'
import {uuidv4} from '../../../../modules/Utils'
import {default as Store, ACTIONS} from '../../../../modules/Store.js'

const storeName = uuidv4() + '-store'
const store = Store({counter:0}, storeName)

export default class Test extends Base {

    constructor() {
        super()
        this.data = store
    }

    static get observedAttributes() { return ['counter', 'test'] }
    // these properties will be synced with alement attributes
    get syncedProperties() { return ['counter', 'test'] }

    get counter() { return this.data.counter }
    set counter(value) {
        const _value = Number(value)
        this.data.counter =  _value
        // if(this.#updatingAttributes?.counter === true) return
        /* const counterElement = this.shadowRoot.querySelector('[data-counter]')
        // if(!counterElement) return
        if(counterElement) counterElement.innerHTML = _value */
    }

    // use the proxy to also update the attributes
    increment() { this.counter++ }

    afterRender() {
        const element = this.shadowRoot.querySelector('[data-counter]')
        this.addEvent(element, 'click', this.increment.bind(this))

        // observe the store to render
        this.addEvent(document, storeName, ({detail: {data, action, prop, value}}) => {

            this.update(data)
            if(action===ACTIONS.SET) this.updateAttribute(prop, value)
        })
    }

    template() {
        /* html */
        return `
        <div>
            <span data-counter>{{counter}}</span>
            <span data-counter>{{counter}}</span>
        </div>
        `
    }
}