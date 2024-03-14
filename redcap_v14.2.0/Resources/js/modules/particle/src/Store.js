import Notifier from './Notifier.js'

const ACTION_SET = 'set'
const ACTION_DELETE = 'delete'

/**
 * Get an object's type
 * @param  {*}      obj The object
 * @return {String}     The type
 */
function getType (obj) {
	return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

export default class Store extends Notifier {
    #value

    constructor(data) {
        super()
        this.#setProxy(data)
    }

    #setProxy(data) {
        data = ['array', 'object'].includes(getType(data)) ? data : {value: data};
        this.#value = new Proxy(data, this.handler(data));
    }

    read() {
        this.detect()
        return this.#value
    }

    write(nextValue) {
        if(this.#value === nextValue) return
        this.#value =  this.#setProxy(nextValue)

        this.notify()
    }

    /**
	 * Create the Proxy handler object
	 * @param  {Object} data The data object
	 * @return {Object}      The Proxy handler
	 */
	handler (data, path='') {
        // utility function that computes the event for nested properties
        const makeFullPath = (prop) => {
            if(path==='') return prop
            return `${path}.${prop}`
        }
        const notify = this.notify.bind(this)
        const detect = this.detect.bind(this)
        const handler = this.handler.bind(this)

		return {
			get: function (obj, prop, receiver) {
				if (prop === '_isProxy') return true;
				if (['object', 'array'].includes(Object.prototype.toString.call(obj[prop]).slice(8, -1).toLowerCase()) && !obj[prop]._isProxy) {
					const fullPath = makeFullPath(prop)
                    obj[prop] = new Proxy(obj[prop], handler(data, fullPath) );
				}
                detect(); // detect autosubscriptions
				return Reflect.get(obj, prop, receiver);
			},
			set: function (obj, prop, value, receiver) {
				const oldValue = Reflect.get(obj,prop, receiver)
                if (oldValue === value) return true;
				Reflect.set(obj, prop, value, receiver);
                const fullPath = makeFullPath(prop)
				notify(fullPath, {obj, prop, value, oldValue, fullPath, action: ACTION_SET})
				return true;
			},
			deleteProperty: function (obj, prop) {
                const oldValue = Reflect.get(obj,prop)
				Reflect.deleteProperty(obj, prop);
                const fullPath = makeFullPath(prop)
				notify(fullPath, {obj, prop, value:null, oldValue, fullPath, action: ACTION_DELETE})
				return true;
			}
		};
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

    static make(data) {
        const instance = new Store(data);
        return [
            instance.read.bind(instance),
            instance.write.bind(instance),
            instance.subscribe.bind(instance),
        ];
    }

}

export {ACTION_SET, ACTION_DELETE}