const catchAllEvent = '*'

class Notifier {

	#observers = {
        catchAllEvent: []
    }

    get observers() { return this.#observers }
    set observers(value) { this.#observers = value }

    #subscribeToEvent(observer, event) {
        const observers = {...this.#observers}
        const index = observers[event].indexOf(observer)
        if(index>=0) return false
        observers[event].push(observer)
        this.#observers = {...observers}
        return true
    }

    subscribe(observer, event=catchAllEvent) {
        let modified = false
        const observers = {...this.#observers}
        if(!(event in observers)) observers[event] = []

        // always register in the generic catchAll event
        if(event!=catchAllEvent) {
            modified |= this.#subscribeToEvent(observer, catchAllEvent)
        }
        modified |= this.#subscribeToEvent(observer, event)
        if(modified) this.observers = {...observers}
    }

    #observerIsInAnySpecificEvent(observer) {
        for (const [event, observers] of Object.entries(this.observers)) {
            if(event==catchAllEvent) continue
            const index = observers[event].indexOf(observer)
            if(index>=0) return true
        }
        return false
    }

    #unsubscribeFromEvent(observer, event) {
        const observers = {...this.#observers}
        const index = observers[event].indexOf(observer)
        if(index<0) return false
        observers[event].splice(index, 1)
        this.#observers = {...observers}
        return true
    }


    unsubscribe(observer, event=catchAllEvent) {
        let modified = false
        const observers = {...this.#observers}
        // always register in the generic catchAll event
        modified |= this.#unsubscribeFromEvent(observer, event)
        if(!this.#observerIsInAnySpecificEvent(observer)) {
            // remove from generic if not subscribed to any specific event
            modified |= this.#unsubscribeFromEvent(observer, catchAllEvent)
        }
        if(!modified) return
        this.#observers = observers
    }

    notify(event=catchAllEvent, data=null) {
        this.observers.forEach(observer => {
            try {
                observer.update(this, event, data)
            } catch (error) {
                console.error('could not notify the subscriber.', `event: ${event}`, `observer: ${observer}`)
            }
        })
    }
}

export { Notifier as default, catchAllEvent }