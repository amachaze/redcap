// catch all group identifier
const AST = '*'

export default class Observer {
    
    #observers = {
       [AST]: []
    };

    notify(event = AST, data = null)
    {
        const observers = this.#getEventObservers(event)
        for (const obs of observers) {
            if(!(update in obs) || typeof obs.update !== 'function') continue
            obs.update(this, event, data)
        }
    }

    attach(observer, event = AST)
    {
        this.#initEventGroup(event);
        this.#observers[event].push(observer);
        // attach to the catch all event as well
        if(event===AST) return
        if(this.#observers[AST].indexOf(observer)<0){
            this.#observers[AST].push(observer)
        }
    }

    /**
     *
     * @param \SplObserver $observer
     * @param string $event
     * @return void
     */
	detach(observer, event = AST)
    {
        if(!(event in this.#observers)) return;
        delete this.#observers[event][observer];

        // if this observer is not available in other events, then remove it from the catch all as well
        if(!this.#isObserverAvailableInOtherEvents(observer, event)) delete this.#observers[AST][observer];
    }

    #isObserverAvailableInOtherEvents(observer, event) {
        let availableInOtherEvents = false
        for (let [eventKey, observers] of Object.entries(this.#observers)) {
            if(eventKey===AST) continue // skip the catch all event
            if(observers.indexOf(observer)<0) continue
            else {
                availableInOtherEvents = true
                break
            }
        }
        return availableInOtherEvents
    }

    #initEventGroup(event = AST)
    {
        if (Object.keys(this.#observers).indexOf(event)<0) {
            this.#observers[event] = [];
        }
    }

    #getEventObservers(event = AST)
    {
        this.#initEventGroup(event);
        const group = this.#observers[event];
        const all = this.#observers[AST];

        return {...group, ...all};
    }
}