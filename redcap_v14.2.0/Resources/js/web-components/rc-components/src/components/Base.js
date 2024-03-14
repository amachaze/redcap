// import 'https://unpkg.com/construct-style-sheets-polyfill';
import {default as store, ACTIONS } from '../libs/Store'
import { stringToHTML, observeAttributeMutation } from '../libs/utils'

const template = `
<div data-base></div>
`
/**
 * data attribute used to identify children
 * in the shadowRoot that must not be removed on render
 */
const renderKeepAttribute = 'data-render-keep'

const addCSSStyleSheet = (shadowRoot, style) => {
    let sheet
    if(typeof style==='string') {
        sheet = new CSSStyleSheet()
        sheet.replaceSync(style)
    }else if(style instanceof CSSStyleSheet) {
        sheet = style
    }else {
        throw new Error('style must be a string or an instance of CSSStyleSheet')
    }
    shadowRoot.adoptedStyleSheets.push(sheet)
}

const addStyleElement = (shadowRoot, text) => {
    const styleEl = document.createElement('style')
    styleEl.setAttribute(renderKeepAttribute, true)
    styleEl.textContent = text
    shadowRoot.appendChild( styleEl )
}


class Base extends HTMLElement {
    shadowRoot
    
    constructor() {
        super()
		this.shadowRoot = this.attachShadow({ mode: 'open' })
	}

    
    /**
     * dispatch a custom event
     * @param {string} eventName 
     * @param {mixed} data 
     */
    $emit(eventName, data) {
        const event = new CustomEvent(eventName, {
            detail: data,
            bubbles: true,
            cancelable: false,
            composed: true
        })
        this.shadowRoot.dispatchEvent(event)
    }

    #styles = []
    /**
     * add a scoped style
     * could be a string or a sheet
     * 
     * @see https://web.dev/css-module-scripts/
     * @param {string|CSSStyleSheet} style 
     */
     addStyle(style) {
        const index = this.#styles.indexOf(style)
        if(index<0) this.#styles.push(style)
        // addCSSStyleSheet(this.shadowRoot, style)
        // addStyleElement(this.shadowRoot, style)
        /* if(typeof CSSStyleSheet === 'function') addCSSStyleSheet(this.shadowRoot, style)
        else addStyleElement(this.shadowRoot, style) */
        // addStyleElement(this.shadowRoot, style)
    }

    beforeRender() {}
    afterRender() {}

    #ready = false
    get ready() { return this.#ready }

    render() {
        this.#ready = false
        this.beforeRender()
        this.update()
        this.afterRender()
        this.#ready = true
        this.$emit('rendered')
    }


    #dom
    update() {
        // maybe apply string interpolation first
        const template = this.template

        const dom = this.#dom = stringToHTML(template)
        // console.log(this.constructor.name, dom, dom.innerHTML)
        // remove everything
        for (const node of Array.from(this.shadowRoot.childNodes))
            node.parentNode.removeChild(node)

        // add content
        for (const node of dom.childNodes)
            this.shadowRoot.appendChild(node)

        // do this in alternative to removing and adding
        // this.shadowRoot.innerHTML = dom.innerHTML

        // add styles
        for (const style of this.#styles)
            addStyleElement(this.shadowRoot, style)

    }

    get template() { return template }

    // called every time the element is inserted into the DOM
	connectedCallback() {
        this.render()
        /* if(this.constructor.observedAttributes.length===0) {
            console.log('asda')
            // detect attribute changes and apply the prop type if available
            observeAttributeMutation(this, (mutation, observer) => {
                const {attributeName, oldValue} = mutation
                const rawValue = this.getAttribute(attributeName)
                onAttributeChanged(attributeName, oldValue, newValue)
            })
            // force the first trigger
            for (const attribute of this.attributes) {
                this.onAttributeChanged(attribute.name, null, this.getAttribute(attribute.name))
            }
        } */
        // this.initData()
        // this.initProps()
    }

	// called every time the element is removed from the DOM
	disconnectedCallback() {}

    /**
     * list of observed attributes
     * can be referenced internally using this.constructor.observedAttributes
     */
    static get observedAttributes() { return [] }

	// called when attribute is added, removed, or replaced
	attributeChangedCallback(attributeName, oldValue, newValue) {
        this.onAttributeChanged(attributeName, oldValue, newValue)
    }
    
    onAttributeChanged(name, oldValue, newValue) {}
    

    // manage events
    #registeredEvents = []
    /**
     * 
     * @param {HTMLElement} element 
     * @param {string} type 
     * @param {function} callback 
     * @param {object} options
     * @returns {AbortController}
     */
    addEvent(element, type, callback, options={}) {
        const controller = new AbortController();
        const signal = controller.signal
        options.signal = signal

        element.addEventListener(type, callback, options)
        this.#registeredEvents.push([element, type, callback, options])
        return controller
    }

    removeRegisteredEvents() {
        for (const [element, type, boundCallback, options] of this.#registeredEvents) {
            element.removeEventListener(type, boundCallback, options)
        }
        this.#registeredEvents = []
    }

    closestFrom(el) {
        if (!el || el === document || el === window) return null;
        if ('assignedSlot' in el) el = el.assignedSlot;
        let found = element.closest(selector);
        if (found) return found
        return this.closestFrom(el.getRootNode().host);
    }

   
}

export default Base