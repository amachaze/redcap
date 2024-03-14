
import Toast from './Toast'

const style = `
[data-toaster] {
}
.rc-toaster {
    margin: 10px;
    position: fixed;
    z-index: 10000;
    width: 400px;
}
.rc-toaster .toast-wrapper + .toast-wrapper {
    margin-top: 10px;
}
.rc-toaster.top {
    top: 0;
}
.rc-toaster.right {
    right: 0;
}
.rc-toaster.bottom {
    bottom: 0;
}
.rc-toaster.left {
    left: 0;
}
.rc-toaster.center {
    left: 50%;
    transform: translateX(-50%);
}
.rc-toaster.full {
    width: 100%;
}
._toast {
    margin: 10px;
}
`

const positions = Object.freeze({
    TOP_RIGHT: 'top-right',
    TOP_LEFT: 'top-left',
    TOP_CENTER: 'top-center',
    TOP_FULL: 'top-full',
    BOTTOM_RIGHT: 'bottom-right',
    BOTTOM_LEFT: 'bottom-left',
    BOTTOM_CENTER: 'bottom-center',
    BOTTOM_FULL: 'bottom-full',
})

const defaultOptions = {
    position: positions.TOP_RIGHT
}

class Toaster extends HTMLElement{

    shadowRoot
    #toasters = {}

    constructor() {
        super()
        this.shadowRoot = this.attachShadow({ mode: 'open' })

    }

    connectedCallback() {
        this.shadowRoot.innerHTML = this.template
    }


    get template() {
        return `
        <div data-toaster></div>
        <style>${style}</style>
        `
    }

    #makeToaster(position) {
        const element = document.createElement('div')
        const classes = position.split('-').map(value => `${value}`)
        element.classList.add('rc-toaster')
        for (const posClass of classes) {
            element.classList.add(posClass)
        }
        const target = this.shadowRoot.querySelector('[data-toaster]')
        target.appendChild(element)
        return element
    }

    #getToaster(position) {
        if(!(Object.values(positions).includes(position))) position = defaultOptions.position
        if(!(position in this.#toasters)) {
            // create a new toaster
            this.#toasters[position] = this.#makeToaster(position)
        }
        return this.#toasters[position]
    }

    #makeToast(options) {
        const toastWrapper = document.createElement('div')
        toastWrapper.classList.add('toast-wrapper')
        const toast = new Toast()
        toast.addEventListener('closed', () => {
            // remove when closed
            toastWrapper.parentNode.removeChild(toastWrapper)
        })
        for (const [key, value] of Object.entries(options)) {
            toast[key] = value
        }
        toastWrapper.appendChild(toast)
        return toastWrapper
    }

    toast(options, position=defaultOptions.position) {
        const toaster = this.#getToaster(position)
        const toast = this.#makeToast(options)
        toaster.appendChild(toast)
    }
}

/**
 * expose a static method to make toasts easily
 * @param {object} options 
 * @param {string} position 
 */
Toaster.toast = function(options, position=defaultOptions.position) {
    const toaster = new Toaster()
    document.body.appendChild(toaster)
    toaster.toast(options, position)
}

export {Toaster as default, positions}