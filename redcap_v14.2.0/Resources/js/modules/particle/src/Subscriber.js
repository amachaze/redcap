export default class Subscriber {
    static #nextID = 0

    #ID
    
    #callback = undefined
    #dependencies = new Map()
    // how many times was invoked
    #counter = 0

    #running = false
    #currentContexts = new Set()

    constructor(fn) {
        this.#ID = ++Subscriber.#nextID
        this.#callback = fn
    }

    get id() { return this.#ID }

    hasDependency(dep, group) {
        if(!this.#dependencies.has(dep)) return false
        return this.#dependencies.get(dep).has(group)
    }

    addDependency(dep, group) {
        // dependencies are organized by notifier => group
        if(!this.#dependencies.has(dep)) this.#dependencies.set(dep, new Set())
        // add a notifier as dependency
        this.#dependencies.get(dep).add(group)
    }

    removeDependency(dep, group) {
        if(!this.#dependencies.has(dep)) return
        const dependency = this.#dependencies.get(dep)
        dependency.remove(group)
        if(dependency.size===0) this.#dependencies.delete(dep)
    }

    run(context, event, data=null) {
        if(!(this.#callback instanceof Function)) {
            console.error('no callback available')
            return
        }
        // debugger
        if(this.#running && this.#currentContexts.has({context,event}) ) return
        try {
            // add the current context to avoid multiple execution
            this.#currentContexts.add({context,event})
            if(!this.#running) {
                this.#counter++
                // console.log('before running')
                this.#running = true
                let result = this.#callback({context, event, data})
                // console.log('after running')
                return result
            }
            
        } catch (error) {
            console.log('error running the callback', this.#callback, context, event)
        } finally {
            this.#running = false
            this.#currentContexts.delete({context,event})
        }
    }

}