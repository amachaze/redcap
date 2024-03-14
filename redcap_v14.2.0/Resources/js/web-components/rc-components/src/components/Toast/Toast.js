import Base from '../Base'
import style from './style'
/*html*/



const defaultOptions = {
    autoClose: 5000,
}

const data =  {
    progress: 100,
    open: true,
    hover: false,
    interval: null,
    startTime: null,
    endTime: null,
}


class Toast extends Base {

    constructor() {
        super()
        this.addStyle(style)
    }

    #progress = 100
    get progress() { return this.#progress }
    set progress(value) {
        this.#progress = value
        const progressElement = this.shadowRoot.querySelector('[data-progress]')
        progressElement.style.width = `${value}%`
    }

    #open = true
    get open() { return this.#open }
    set open(value) { this.#open = value }

    #hover = false
    get hover() { return this.#hover }
    set hover(value) { this.#hover = value }

    #interval = null
    get interval() { return this.#interval }
    set interval(value) { this.#interval = value }

    #startTime = null
    get startTime() { return this.#startTime }
    set startTime(value) { this.#startTime = value }

    #endTime = null
    get endTime() { return this.#endTime }
    set endTime(value) { this.#endTime = value }

    #autoClose = defaultOptions.autoClose
    get autoClose() { return this.#autoClose }
    set autoClose(value) {
        this.#autoClose = value
        if(value===false) this.setAttribute('progress-disabled', true)

    }

    #title = ''
    get title() { return this.#title }
    set title(value) { this.#title = value }

    #subtitle = ''
    get subtitle() { return this.#subtitle }
    set subtitle(value) { this.#subtitle = value }

    #message = ''
    get message() { return this.#message }
    set message(value) { this.#message = value }

    registerEvents() {
        const toast = this.shadowRoot.querySelector('.rc-toast')
        const closeButton = this.shadowRoot.querySelector('.close-button')
        const progressBar = this.shadowRoot.querySelector('.rc-progress-bar')
        
        this.addEvent(toast, 'mouseover', this.onMouseOver.bind(this))
        this.addEvent(toast, 'mouseout', this.onMouseOut.bind(this))
        this.addEvent(closeButton, 'click', this.close.bind(this))
    }

    get template() {
        const title = this.title
        const subtitle = this.subtitle
        const message = this.message
        return `
        <div class="rc-toast">
            <div>
                <header>
                    <span data-title class="title" v-text="title">
                        <slot name="title">${title}</slot>
                    </span>
                    <div class="header-aside">
                        <span class="small" data-subtitle>${subtitle}</span>
                        <span data-close-button class="close-button" >
                            <slot name="close-button">✖</slot>
                        </span>
                    </div>
                </header>
                <main>
                    <div class="content">
                        <slot>
                            <span data-message>
                                <slot>${message}</slot>
                            </span>
                        </slot>
                    </div>
                    <div class="rc-progress-wrapper">
                        <span data-progress class="rc-progress-bar" />
                    </div>
                </main>
            </div>
        </div>
        `
    }

    connectedCallback() {
        super.connectedCallback()
        this.registerEvents()
        this.open()
        this.initTimer()
    }

    static get observedAttributes() { return ['auto-close', 'title', 'subtitle', 'message'] }

    onAttributeChanged(attributeName, oldValue, newValue) {
        const isNumber = (str) => /\d/.test(str)

        switch (attributeName) {
            case 'title':
                this.title = newValue
                break;
            case 'subtitle':
                this.subtitle = newValue
                break;
            case 'message':
                this.message = newValue
                break;
            case 'auto-close':
                if(isNumber(newValue)) newValue = Number(newValue)
                else newValue = newValue==='true'
                this.autoClose = newValue
                break;
        
            default:
                break;
        }
    }

    async animate() {
        const toast = this.shadowRoot.querySelector('.rc-toast')
        let animation
        let timing = {
            duration: 300,
            fill: 'forwards',
            easing: 'ease-in-out',
            // iterations: Infinity
        }

        if(this.open) {
            let keyframes = [
                { opacity: 0 },
                { opacity: 1 },
            ]
            animation = toast.animate(keyframes, timing)
            // animation.pause()
            // animation.play()
            
        }
        else {
            let keyframes = [
                { opacity: 1 },
                { opacity: 0 },
            ]
            animation = toast.animate(keyframes, timing)
            /* animation.onfinish = () => {
                container.classList.add('hidden')
            } */
        }
        return animation
    }

    
    get remainingMilliseconds() {
        if(!(this.startTime instanceof Date)) return 0
        if(!(this.endTime instanceof Date)) return 0
        const startMilliseconds = this.startTime.getTime()
        const endMilliseconds = this.endTime.getTime()
        if(endMilliseconds<=startMilliseconds) return 0
        return endMilliseconds-startMilliseconds
    }

    getUpdatedProgress() {
        if(isNaN(this.autoClose)) return 100;
        if(this.remainingMilliseconds<=0) return 0
        const percentage = (this.remainingMilliseconds/this.autoClose)*100
        return percentage.toFixed(2);
    }

    onMouseOver() {
        this.hover = true
    }

    onMouseOut() {
        this.hover = false
        if(this.remainingMilliseconds<=0) return
        this.countDown(this.remainingMilliseconds)
    }

    async open() {
        this.open = true
        this.animate()
        this.$emit('open', this)
    }
    
    async close() {
        this.open = false
        const animation = await this.animate()
        await animation.finished
        this.$emit('closed', this)
    }

    tick() {
        if(this.autoClose===false || !this.open || this.hover ) {
            this.interval = clearInterval(this.interval)
            return
        }
        if(this.remainingMilliseconds<=0) {
            clearInterval(this.interval)
            return this.close()
        }
        this.startTime = new Date()
        const progress = this.getUpdatedProgress()
        // console.log(progress)
        this.progress = progress
        // console.log('tick', this.remainingMilliseconds)
    }

    initTimer() {
        this.countDown(this.autoClose)
    }

    countDown(milliseconds) {
        if(isNaN(milliseconds)) return
        const startTime = this.startTime = new Date()
        const endTime = new Date(startTime)
        endTime.setTime(endTime.getTime()+milliseconds)
        this.endTime = endTime
        this.interval = setInterval(() => {
            this.tick()
        }, 10)
    }

}

export default Toast