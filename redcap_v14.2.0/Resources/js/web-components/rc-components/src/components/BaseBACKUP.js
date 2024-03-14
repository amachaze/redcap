import style from '../assets/index.css'

const template = `
<div>
    <h1 class="text-3xl font-bold underline">
    Hello world!
    </h1>
</div>
`

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

export const ProxifyClass = (_class) => {
    const handler = {
        construct(target, args, newTarget) {
            console.log(target, 'constructing')
            const instance =  Reflect.construct(target, args, newTarget)
            console.log(instance)
            return instance
        },
        get(target, prop) {
            console.log(`property get: ${prop} = ${target[prop]}`)
            if(prop in target) return target[prop]
        },
        set(target, prop, value, receiver) {
            if(prop in target) {
                console.log(`property set: ${prop} = ${value}`)
                target[prop] = value
                return true
            }
            return false
        }
    }
    return new Proxy (_class, handler)
}

export const Proxify = (object) => {
    const handler = {
        construct(target, args, newTarget) {
            console.log(target, 'constructing')
            const instance =  Reflect.construct(target, args, newTarget)
            // console.log('instance', instance)
            return instance
        },
        get(target, prop) {
            // console.log(`property get: ${prop} = ${target[prop]}`)
            if(prop in target) {
                return Reflect.get(target, prop)
            }
        },
        set(target, prop, value, receiver) {
            console.log(receiver)
            if(prop in target) {
                // console.log(`property set: ${prop} = ${value}`)
                Reflect.set(target, prop, value)
                return true
            }
            return false
        }
    }
    return new Proxy (object, handler)
}

class Base extends HTMLElement {
    shadowRoot
    #template = template
    #data = {}
    
    constructor() {
        super()
        this.#initData() // set the data proxy
		this.shadowRoot = this.attachShadow({ mode: 'open' })
        // add common style
        this.addStyle(style)
	}
    
    /**
     * data will be translated into this.#data
     * as a proxy
     * 
     * @returns object
     */
    data() { return {} }

    /**
     * register the props provided by the data() method
     * into a proxy
     */
    #initData() {
        const self = this
        const handler = {
            get(target, prop) {
                // console.log(`property get: ${prop} = ${target[prop]}`)
                return target[prop]
            },
            set(target, prop, value, receiver) {
                // console.log(target, prop, value, receiver, prop in target)
                // console.log(`property set: ${prop} = ${value}`, target)
                if(prop in target) {
                    const previous = target[prop]
                    target[prop] = value
                    self.$emit('dataChanged', [prop, previous ,value])
                    // also set attribute if this was called directly (not by setAttribute)
                    if(self.constructor.observedAttributes.includes(prop)) self.setAttribute(prop, value)
                    return true
                }
                return false
            }
        }
        this.#data = new Proxy(this.data(), handler)
    }

    /**
     * get data from the proxy
     * 
     * @param {string} key 
     * @returns 
     */
    $getData(key) { return this.#data[key] }

    /**
     * set data in the proxy
     * @param {string} key 
     * @param {mixed} value 
     */
    $setData(key, value) { this.#data[key] = value }

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
     * @param {string} style 
     */
    addStyle(style) {
        const sheet = new CSSStyleSheet()
        sheet.replaceSync(style)
        this.shadowRoot.adoptedStyleSheets.push(sheet)
    }

    /**
     * list of properties that must be synced with
     * the observed attributes
     */
    static get syncedProperties() { return [] }

    /**
     * list of observed attributes
     * can be referenced internally using this.constructor.observedAttributes
     */
    static get observedAttributes() { return [] }

    beforeRender() {}
    afterRender() {}

    render() {
        this.beforeRender()
        const template = document.createElement('template')
        template.innerHTML = this.template
        // const cleanHTML = this.#cleanHTML(template.innerHTML)
        /* this.shadowRoot.innerHTML = template.innerHTML */
        const clone = template.content.cloneNode(true)
        while (this.shadowRoot.firstChild) {
            this.shadowRoot.removeChild(this.shadowRoot.lastChild);
          }
        this.shadowRoot.appendChild(clone)
        this.afterRender()
        /* if(!this.#clone) {
            const template = document.createElement('template')
            template.innerHTML = this.template
            const clone = this.#clone = template.content.cloneNode(true)
            this.shadowRoot.appendChild(clone)
        } */
    }

    get template() { return this.#template || '' }
    set template(value) { this.#template = value }

    get animtionAttribute() {
        return 'data-animation-active'
    }

    #trackAnimations() {
        
        /* this.shadowRoot.addEventListener('animationstart', (e) => {
            this.setAttribute(this.animtionAttribute, true)
            console.log('animationstart')
        })
        this.shadowRoot.addEventListener('animationend', (e) => {
            this.removeAttribute(this.animtionAttribute)
            console.log('animationend')
        }) */
    }
    
    // called every time the element is inserted into the DOM
	connectedCallback() {
        this.render()
        const attributes = this.constructor.observedAttributes
        attributes.forEach(attribute => {
            // this.#observeAttribute(attribute)
            this.#upgradeProperty(attribute)
        });
        this.#trackAnimations()
    }

    // getAttribute(prop) {
    //     console.log('getAttribute', prop)
    //     return this[prop]
    //     // return super.getAttribute(prop)
    // }

    // setAttribute(prop, value) {
    //     console.log('setAttribute', prop, value)
    //     this[prop] = value
    //     super.setAttribute(prop, value)
    // }

	// called every time the element is removed from the DOM
	disconnectedCallback() {}

    // track the attribute that is being updated in attributeChangedCallback
    #updatingAttribute

	// called when attribute is added, removed, or replaced
	attributeChangedCallback(attributeName, oldValue, newValue) {
        // prevent infinite callbacks when syncing with class properties
        if(this.#updatingAttribute === attributeName) return

        if(oldValue === newValue) return
        this.#updatingAttribute = attributeName
        // this[attributeName] = newValue
        this.#syncProperty(...arguments)
        this.onAttributeChanged(...arguments)
        this.$emit('attributeChanged', [attributeName, oldValue, newValue])
        this.#updatingAttribute = null
    }

    /**
     * sync a property if listed in static syncedProperties
     * @param {string} attributeName 
     * @param {mixed} oldValue 
     * @param {mixed} newValue 
     * @returns 
     */
    #syncProperty(attributeName, oldValue, newValue) {
        if(!this.constructor.syncedProperties.includes(attributeName)) return
        this[attributeName] = newValue
    }

    /**
     * check for any instance properties and run them
     * through the proper class setters
     * (lazy properties)
     * @param {string} prop
     */
    #upgradeProperty(prop) {
        if (prop in this) {
            let value = this[prop]
            delete this[prop]
            this[prop] = value
        }
      }

    onAttributeChanged(attributeName, oldValue, newValue) {}
}

export default Base