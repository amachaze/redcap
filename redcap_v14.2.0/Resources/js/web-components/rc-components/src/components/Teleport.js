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
 * 
 * wrap the elements in a template to prevent disconnetCallback
 * and to not display before the page is loaded
 */
class Teleport extends Base {
    #assignedNodes
    #defaultPosition = POSITIONS.AFTERBEGIN

    constructor() {
        super()
	}

    static get observedAttributes() {
        return ['target', 'where']
    }

    // called every time the element is inserted into the DOM
	connectedCallback() {
        super.connectedCallback()
        // this.#parent = this.parentElement
        let slot = this.shadowRoot.querySelector('slot')
        this.#assignedNodes = slot.assignedNodes()

        const targetSelector = this.getAttribute('target') ?? 'body'
        const position = this.getAttribute('where') ?? this.#defaultPosition
        const target = document.querySelector(targetSelector)


        for (const element of Array.from(this.#assignedNodes)) {
            // move all html elements (skip texts)
            this.move(element, position, target)
        }
    }

    move(element, position, target) {
        if(element instanceof HTMLTemplateElement) {
            const clone = element.content.cloneNode(true)
            for (const child of Array.from(clone.children)) {
                target.insertAdjacentElement(position, child)
            }
            return
        }
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

    get template() {
        return `<slot></slot>`
    }

	// called when attribute is added, removed, or replaced
	/* attributeChangedCallback(attributeName, oldValue, newValue) {
        // this.syncProperty(attributeName)
        

        this.onAttributeChanged(attributeName, oldValue, newValue)
        this.updateProperty(attributeName, newValue)
    } */

   
}

export default Teleport