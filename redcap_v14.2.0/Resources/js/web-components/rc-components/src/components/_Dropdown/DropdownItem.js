import {default as Base} from '../Base.js'
const template = `
<!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
<div data-item class="cursor-pointer text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1">
    <slot></slot>
</div>
`

export default class DropdownItem extends Base {

    #active = false
    get active() { return this.#active }
    set active(value) {
        this.#active = Boolean(value)
        const item = this.shadowRoot.querySelector('[data-item]')
        const activeClass = ['bg-blue-100','text-blue-900'];
        const inactiveClass = ['text-blue-700'];
        if(value) {
            item.classList.remove(...inactiveClass)
            item.classList.add(...activeClass)
        }else {
            item.classList.remove(...activeClass)
            item.classList.add(...inactiveClass)
        }
    }

    #hover = false
    get hover() { return this.#hover }
    set hover(value) {
        this.#hover = Boolean(value)
        const item = this.shadowRoot.querySelector('[data-item]')
        const hoverClass = ['bg-gray-100','text-gray-900'];
        const notHoverClass = ['text-gray-700'];
        if(value) {
            item.classList.remove(...notHoverClass)
            item.classList.add(...hoverClass)
        }else {
            item.classList.remove(...hoverClass)
            item.classList.add(...notHoverClass)
        }
    }

    afterRender() {
        const item = this.shadowRoot.querySelector('[data-item]')
        // this.addEvent(item, 'click', this.onClick.bind(this))
        this.addEvent(item, 'mouseover', this.onMouseOver.bind(this))
        this.addEvent(item, 'mouseout', this.onMouseOut.bind(this))
    }

    onClick(event) {
        event.stopPropagation();
        console.log(arguments)
        this.active = !this.active
    }

    onMouseOver() {
        this.hover = true
    }
    onMouseOut() {
        this.hover = false
    }

    get template() { return template }
}