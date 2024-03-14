// import 'https://unpkg.com/construct-style-sheets-polyfill';
const template = `
<div class="my-2">
    <h1 class="text-3xl font-bold underline">
    Hello world!
    </h1>
</div>
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
    console.log(shadowRoot.adoptedStyleSheets)
}

const addStyleElement = (shadowRoot, text) => {
    const styleEl = document.createElement('style')
    styleEl.setAttribute(renderKeepAttribute, true)
    styleEl.textContent = text
    shadowRoot.appendChild( styleEl )
}

/**
 * remove blank spaces between tags.
 * ignores pre|script|style|textarea
 * 
 * @param {string} html 
 * @returns 
 */
export const cleanHTML = (html) => {
    const regexp = /(<(pre|script|style|textarea)(?:.|\n)+?<\/\2)|(^|>)\s+|\s+(?=<|$)/g
    return html.replace(regexp, '$1$3')
}

class Base extends HTMLElement {
    shadowRoot
    #data = {}
    
    constructor() {
        super()
		this.shadowRoot = this.attachShadow({ mode: 'open' })
	}

    get data() { return this.#data }
    set data(value) { this.#data = value }
    
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

    /**
     * add a scoped style
     * could be a string or a sheet
     * 
     * @see https://web.dev/css-module-scripts/
     * @param {string|CSSStyleSheet} style 
     */
     addStyle(style) {
        // addCSSStyleSheet(this.shadowRoot, style)
        addStyleElement(this.shadowRoot, style)
        /* if(typeof CSSStyleSheet === 'function') addCSSStyleSheet(this.shadowRoot, style)
        else addStyleElement(this.shadowRoot, style) */
        // addStyleElement(this.shadowRoot, style)
    }

    /**
     * list of observed attributes
     * can be referenced internally using this.constructor.observedAttributes
     */
    static get observedAttributes() { return [] }

    beforeRender() {}
    afterRender() {}

    #ready = false
    get ready() { return this.#ready }

    render() {
        this.#ready = false
        this.beforeRender()
        this.removeRegisteredEvents()
        this.update(this.data)
        this.afterRender()
        this.#ready = true
        this.$emit('rendered')
    }

    update(data={}) {
        const interpolationAttribute = 'data-string-interpolation'
        // wrap detected string interpolated items with custom html elements
        const applyStringInterpolationElements = (content) => {
            for (const key of Object.keys(data)) {
                const regExp = new RegExp('{{'+key+'}}', 'g')
                if(!(content.match(regExp))) continue
                content = content.replaceAll(regExp, `<string-interpolation ${interpolationAttribute}="${key}"></string-interpolation>`)
            }
            return content
        }
        const initTemplate = () => {
            let templateText = this.template()
            let templateWithStringInterpolation = applyStringInterpolationElements(templateText)
            const template = document.createElement('template')
            template.innerHTML = templateWithStringInterpolation
            // const cleanHTML = this.#cleanHTML(template.innerHTML)
            /* // remove all nodes but the ones marked with data-keep
            const children = this.shadowRoot.children
            for (const child of Array.from(children)) {
                let keep = Boolean(child.getAttribute(renderKeepAttribute))
                let tagName = child.tagName.toLowerCase()
                if(keep===true) continue
                // if(tagName==='style' && keep===true) continue
                this.shadowRoot.removeChild(child);
            } */
    
            const clone = template.content.cloneNode(true)
            this.shadowRoot.appendChild(clone)
        }

        if(!this.__stringInterpolationElements) {
            initTemplate()
            this.__stringInterpolationElements = this.shadowRoot.querySelectorAll(`[${interpolationAttribute}]`)
        }
        for (const element of Array.from(this.__stringInterpolationElements)) {
            const prop = element.getAttribute(interpolationAttribute)
            if(!prop) return
            element.innerHTML = data[prop]
        }
    }

    template() { return template }

    // called every time the element is inserted into the DOM
	connectedCallback() {
        // this.#initProxy()
        this.render()
        // console.log('connectedCallback', Object.values(this.shadowRoot.host.attributes), this.shadowRoot.host.attributes.counter)

        // sync marked properties with initial attributes values
        // this.syncProperties()
    }

	// called every time the element is removed from the DOM
	disconnectedCallback() {}

	// called when attribute is added, removed, or replaced
	attributeChangedCallback(attributeName, oldValue, newValue) {
        // this.syncProperty(attributeName)
        

        this.onAttributeChanged(attributeName, oldValue, newValue)
        this.updateProperty(attributeName, newValue)
    }

    get syncedProperties() { return [] }
    #updatingProperties = {}
    updateProperty(name, value) {
        if(this.syncedProperties.indexOf(name)<0) return
        this.#updatingProperties[name] = true
        this[name] = value
        const updateByAttribute = Boolean(this.#updatingAttributes[name])
        if(!updateByAttribute) this.updateAttribute(name, value)
        this.#updatingProperties[name] = false
    }

    #updatingAttributes = {}
    updateAttribute(name, value) {
        if(this.constructor.observedAttributes.indexOf(name)<0) return
        this.#updatingAttributes[name] = true
        this.setAttribute(name, value)
        const updatedByProperty = Boolean(this.#updatingProperties[name])
        if(!updatedByProperty) this.updateProperty(name, value)
        this.#updatingAttributes[name] = false
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
     */
    addEvent(element, type, callback, options={}) {
        element.addEventListener(type, callback, options)
        this.#registeredEvents.push([element, type, callback, options])
    }

    removeRegisteredEvents() {
        for (const [element, type, boundCallback, options] of this.#registeredEvents) {
            element.removeEventListener(type, boundCallback, options)
        }
        this.#registeredEvents = []
    }

   
}

export default Base