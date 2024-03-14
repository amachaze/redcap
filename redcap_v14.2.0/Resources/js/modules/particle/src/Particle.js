import {default as Notifier, catchAllGroup} from './Notifier.js'

/**
 * creates getter and setters for primitive values.
 * does not support modifying nested properties (in arrays or objects)
 */
export default class Particle extends Notifier {
    
    #value

    constructor(value) {
        super()
        this.#value = value
        // this.init()
    }

    init() {
        Object.defineProperty(this, 'value', {
            get() {
                console.log('getting value')
                return this.#value
            },
            set(nextValue) {
                console.log('setting value')
                if(this.#value === nextValue) return
                this.#value = nextValue
                this.notify()
            },
        })
    }

    read() {
        this.detect()
        return this.#value
    }

    write(nextValue) {
        // if(this.isSubscribing()) return // do not write when subscribing
        if(this.#value === nextValue) return
        this.#value = nextValue

        this.notify()
    }

    static make(value) {
        const instance = new Particle(value);
        return [
            instance.read.bind(instance),
            instance.write.bind(instance),
            instance.subscribe.bind(instance),
        ];
    }

    /**
     * called when the instance is invoked
     * since this inheriths from Callable
     * 
     * @returns mixed
     */
    _call(...args) {
        return this.read()
    }
}