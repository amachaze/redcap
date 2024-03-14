import Base from '../Base'

// import Alpine from '../../../node_modules/alpinejs/dist/module.esm'
import {default as makeAlpine } from '../../../../../modules/Alpine'
const Alpine = makeAlpine()



export default class AlpineTest extends Base {

    constructor() {
        super()
	}
    
    async afterRender() {
        console.log(Alpine)
        // let Alpine = getAlpine()
        Alpine.data('repo', () => ({count: 1231312312, name: 'francesco', label: 'this is a lable'}))
        Alpine.store('darkMode', {count: 132, name: 'francesco', label: 'this is a lable'})
        // Alpine.start()
        document.addEventListener('alpine:init', e => {
            console.log('alpine started')
        })
        Alpine.initTree(this.shadowRoot) 
        // Alpine.start()
    }

    static get observedAttributes() {
        return ['target', 'where']
    }

    get template() {
        return `
        <h1>this is another one</h1>
        <div x-data="repo">
            <span x-text="label + count">label here?</span>
            <button @click="count++">increment</button>
            <slot></slot>
        </div>
        <div x-data>
            <span x-text="$store.darkMode.label + $store.darkMode.count">label here?</span>
            <button @click="$store.darkMode.count++">increment</button>
            <slot></slot>
        </div>
        `
    }
}
