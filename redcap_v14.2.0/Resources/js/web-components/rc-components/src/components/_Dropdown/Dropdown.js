import {default as Base} from '../Base.js'
/*html*/
const template = `
<div class="relative inline-block text-start">
  <div>
    <button data-button type="button" class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100" id="menu-button" aria-expanded="true" aria-haspopup="true">
      Options
      <!-- Heroicon name: mini/chevron-down -->
      <svg class="-me-1 ms-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>

  <div data-menu class="hidden absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
    <div class="py-1" role="none">
        <slot></slot>
    </div>
  </div>
</div>
`

export default class Dropdown extends Base {

    // static get observedAttributes() { return ['counter', 'test'] }
    // these properties will be synced with alement attributes
    // get syncedProperties() { return ['counter', 'test'] }
    #open = false
    get open() { return this.#open }
    set open(value) {
        this.#open = Boolean(value)
        const menu = this.shadowRoot.querySelector('[data-menu]')

        if(value) {
            let keyframes = [
                { opacity: '0', transform: 'scale(.95)' },
                { opacity: '1', transform: 'scale(1)' },
            ]
            let timing = {
                duration: 100,
                fill: 'forwards',
                // iterations: Infinity
            }
            menu.classList.remove('hidden')
            let animation = menu.animate(keyframes, timing)
            // animation.pause()
            // animation.play()
            
        }
        else {
            let keyframes = [
                { opacity: '1', transform: 'scale(1)' },
                { opacity: '0', transform: 'scale(.95)' },
            ]
            let timing = {
                duration: 75,
                fill: 'forwards',
                // iterations: Infinity
            }
            let animation = menu.animate(keyframes, timing)
            animation.onfinish = () => {
                menu.classList.add('hidden')
            }
        }
    }

    afterRender() {
        this.#initClickOutside()
        const button = this.shadowRoot.querySelector('[data-button]')
        this.addEvent(button, 'click', this.onClick.bind(this))
        
    }

    #initClickOutside() {
        const wrapper = this.shadowRoot
        this.addEvent(wrapper, 'click', (e) => e.stopPropagation())
        this.addEvent(window, 'click', this.clickOutside.bind(this))
    }

    clickOutside(event) {
        if(event.target)
        if(this.open) this.open = false
    }

    onClick(event) {
        event.stopPropagation();
        console.log(arguments)
        this.open = !this.open
    }

    get template() { return template }
}