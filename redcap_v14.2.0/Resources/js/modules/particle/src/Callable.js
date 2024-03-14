/**
 * create an object that can be invoked as a function
 */
export default class Callable extends Function {
    constructor() {
        super('...args', 'return this._bound._call(...args)')

        this._bound = this.bind(this)

        return this._bound
    }

    /**
     * override this method in classes that inherit from this
     * to perform an action when the instance is invoked
     * @param  {...any} args 
     */
    _call(...args) { console.log(this, args) }
}

class CallablePrototype extends Function {
    constructor() {
        super()
        var closure = function(...args) {
            return closure._call(...args)
        }

        return Object.setPrototypeOf(closure, new.target.prototype)
    }

    /**
     * override this method in classed that inherit from this
     * to perform an action when the instance is invoked
     * @param  {...any} args 
     */
    _call(...args) { console.log(this, args) }
}

/**
 * callable attempt using a proxy
 */
class CallableProxy extends Function {
    constructor() {
        super()
        const self = this
        const handler = {
            apply: (target, thisArg, argumentsList) => target._call(...argumentsList),
        }
        return new Proxy(this, handler)
    }

    /**
     * override this method in classed that inherit from this
     * to perform an action when the instance is invoked
     * @param  {...any} args 
     */
    _call(...args) { console.log(this, args) }
}