// catch all group identifier
const AST = '*'

export default class EventBus {
    
    #bus

    /**
     * Initialize a new event bus instance.
     */
    constructor()
    {
        this.#bus = new Comment('event-bus');
        // this.#bus = document.createElement('fakeelement');
    }

    /**
     * Add an event listener.
     */
    /**
     * 
     * @param {string} event 
     * @param {callable} callback 
     * @param {object} options 
     * @returns {AbortController}
     */
    addEventListener(event, callback, options={})
    {
        const controller = new AbortController();
        const signal = controller.signal
        options.signal = signal
        this.#bus.addEventListener(event, callback, options);
        return controller
        // return the unsubscribe function
        return () => {
            this.#bus.removeEventListener(event, callback, options);
        }
    }

    /**
     * Remove an event listener.
     */
    removeEventListener(event, callback, options)
    {
        this.#bus.removeEventListener(event, callback, option);
    }

    /**
     * Dispatch an event.
     */
    dispatchEvent(event, detail = {})
    {
        this.#bus.dispatchEvent(new CustomEvent(event, { detail }));
    }

    #IdGenerator() {
        let lastId = 0
        
        return function getNextUniqueId() {
            lastId += 1
            return Symbol(lastId)
        }
    }
}
