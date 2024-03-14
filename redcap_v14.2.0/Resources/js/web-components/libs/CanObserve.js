// catch all group identifier
const AST = '*'

/**
 * this acts like a trait:
 * adds functions to an object in the constructor
 */
const CanObserve = (object) => {
    
    const _observers = {
       [AST]: []
    };

    const notify = (event = AST, data = null) =>
    {
        const observers = _getEventObservers(event)
        for (const obs of observers) {
            if(!(update in obs) || typeof obs.update !== 'function') continue
            obs.update(this, event, data)
        }
    }

    const attach = (observer, event = AST) => 
    {
        _initEventGroup(event);
        _observers[event].push(observer);
        // attach to the catch all event as well
        if(event===AST) return
        if(_observers[AST].indexOf(observer)<0){
            _observers[AST].push(observer)
        }
    }

    /**
     *
     * @param \SplObserver $observer
     * @param string $event
     * @return void
     */
	const detach = (observer, event = AST) => {
        if(!(event in _observers)) return;
        delete _observers[event][observer];

        // if this observer is not available in other events, then remove it from the catch all as well
        if(!_isObserverAvailableInOtherEvents(observer, event)) delete _observers[AST][observer];
    }

    const isObserverAvailableInOtherEvents = (observer, event) => {
        let availableInOtherEvents = false
        for (let [eventKey, observers] of Object.entries(_observers)) {
            if(eventKey===AST) continue // skip the catch all event
            if(observers.indexOf(observer)<0) continue
            else {
                availableInOtherEvents = true
                break
            }
        }
        return availableInOtherEvents
    }

    const _initEventGroup = (event = AST) => 
    {
        if (Object.keys(_observers).indexOf(event)<0) {
            _observers[event] = [];
        }
    }

    const _getEventObservers = (event = AST) =>
    {
        _initEventGroup(event);
        const group = _observers[event];
        const all = _observers[AST];

        return {...group, ...all};
    }

    object.attach = attach.bind(object)
    object.detach = detach.bind(object)
    object.notify = notify.bind(object)
}

export default CanObserve