export default class LazyImage extends HTMLElement {
    shadowRoot
    #img

    constructor() {
      super()
      this.shadowRoot = this.attachShadow({ mode: 'open' })
      this.#img = document.createElement('img')
    }
    
    connectedCallback() {
        let delay = this.getAttribute('delay') ?? ''
        if(delay.trim()==='') return
        setTimeout(() => {
            this.connect()
        }, Number(delay))
    }

    attributeChangedCallback(attributeName, oldValue, newValue) {
      if(oldValue === newValue) return
      this.#img.setAttribute(attributeName, newValue)
    }

    connect() {
      const index = Array.from(this.shadowRoot.children).indexOf(this.#img)
      if(index>=0) return
      for (let attribute of this.attributes) {
        this.#img.setAttribute(attribute.name, attribute.value)
      }
      this.shadowRoot.appendChild(this.#img)
    }
  }