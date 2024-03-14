import Notifier from "./Notifier.js";

export default class Memo extends Notifier {
    #value
    #fn

    constructor(fn) {
        super()
        this.#fn = fn
    }

    read() {
        this.detectWatchable()
        let nextValue = this.#fn()
        if(nextValue!==this.#value) {
            this.#value = nextValue
            this.notify()
        }
        return this.#value
    }

    static make(fn) {
        Notifier.watch(fn)
        const instance = new Memo(fn)
        return instance.read.bind(instance)
    }


}