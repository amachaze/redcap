import Base from './Base'

const POSITIONS = Object.freeze({
    BEFOREBEGIN: 'beforebegin', // Before the targetElement itself.
    AFTERBEGIN: 'afterbegin', // Just inside the targetElement, before its first child.
    BEFOREEND: 'beforeend', // Just inside the targetElement, after its last child.
    AFTEREND: 'afterend', // After the targetElement itself.
})

/**
 * teleport an item in another part of the document
 * eliminate the elements when the teleport component is deleted
 */
class Lazy extends Base {
    #assignedNodes
    #html
    constructor() {
        super()

        /* const template = document.createElement('template')
        for (const element of Array.from(this.children)) {
            console.log(element)
            template.insertAdjacentElement(POSITIONS.BEFOREEND, element)
            console.log(template, template.children, template.content)
        }
        setTimeout(() => {
            const clone = template.content.cloneNode(true)
            let slot = this.shadowRoot.querySelector('slot')
            for (const element of Array.from(template.children)) {
                this.shadowRoot.appendChild(element)
            }

            console.log(this.shadowRoot)
            this.render()
        }, 1000) */
	}


    // called every time the element is inserted into the DOM
	connectedCallback() {
        super.connectedCallback()
        console.log(this.template())
        let slot = this.shadowRoot.querySelector('slot')
        console.log(slot)
        // this.#parent = this.parentElement
        /* this.#assignedNodes = slot.assignedNodes()
        console.log(this.#assignedNodes) */
    }

    move(element, position, target) {
        if(element instanceof HTMLElement)
            return target.insertAdjacentElement(position, element)
        if(element instanceof Text) {
            return target.insertAdjacentText(position, element.textContent)
        }
    }

	// called every time the element is removed from the DOM
	disconnectedCallback() {
        for (const element of Array.from(this.#assignedNodes)) {
            // move all html elements (skip texts)
            element.parentNode.removeChild(element)
        }
    }

    template() {
        /*html*/
        return `
        <slot>
        </slot>
`
    }

	// called when attribute is added, removed, or replaced
	/* attributeChangedCallback(attributeName, oldValue, newValue) {
        // this.syncProperty(attributeName)
        

        this.onAttributeChanged(attributeName, oldValue, newValue)
        this.updateProperty(attributeName, newValue)
    } */

   
}

export default Lazy