import Callable from './Callable.js'
import Subscriber from './Subscriber.js'


const catchAllGroup = '*'

function* subEventsGenerator(event) {
    const subEvents = event.split('.')
    const partsAccumulator = [] // used to build the relative event path
    for (const subEvent of subEvents) {
        partsAccumulator.push(subEvent)
        yield  partsAccumulator.join('.')
    }
}

export default class Notifier extends Callable {

    // (a set uses unique values)
    #subscribers = new Map()

    constructor() {
        super()
        this.#makeGroup(catchAllGroup)
    }

    #makeGroup(name) {
        // console.log(name, this.#subscribers.has(name))
        this.#subscribers.set(name, new Set())
    }


    subscribe(subscriber, group=catchAllGroup) {
        // debugger
        if(!(subscriber instanceof Subscriber)) subscriber = new Subscriber(subscriber)
        // console.log('before subscribe')
        if(!this.#subscribers.has(group)) this.#makeGroup(group)
        const subscribers = this.#subscribers.get(group)
        if(!subscribers.has(subscriber)) {
            subscribers.add(subscriber)
            subscriber.addDependency(this, group)
        }
        // console.log('after subscribe')
        return () => this.unsubscribe(subscriber, group)
    }

    /* #hasRunnerInAnyGroup(runner) {
        for (const [group, runners] of this.#subscribers.entries()) {
            if(group===catchAllGroup) continue
            if(runners.has(runner)) return true
        }
        return false
    } */

    unsubscribe(subscriber, group) {
        this.#subscribers.delete(group, subscriber)
        subscriber.removeDependency(this, group)
        /* if(group===catchAllGroup) return
        // also remove from catchall if not present in any ohter group
        if(this.#hasRunnerInAnyGroup(runner)) this.#subscribers.delete(catchAllGroup, runner) */
    }

    #notifyGroup(event, data=null, notified=null) {
        if(!(notified instanceof Set)) notified = new Set();

        
        const processGroup = (groupName, event) => {
            const group = this.#subscribers.get(groupName)
            if(!group) return
            for (const subscriber of group) {
                notified.add(subscriber)
                subscriber.run(this, event, data)
            }
        }

        const generator = subEventsGenerator(event)
        let currentEvent = generator.next()
        while(!currentEvent.done) {
            let subEvent = currentEvent.value
            currentEvent = generator.next()
            processGroup(subEvent, subEvent)        // check if we are notifying the catchall
            if(catchAllGroup===subEvent) return;
            // also notify the catchall group
            processGroup(catchAllGroup, subEvent)
        }

        return notified
    }

    notify(event=catchAllGroup, data=null) {
        let notified = new Set();
        notified = this.#notifyGroup(event, data, notified)
    }

    detect() {
        this.detectWatchable()
        // this.detectWithEvent()
    }

    isSubscribing() {
        return Notifier.currentSubscriber !== null
    }

    /**
     * detect a watchable and subscribe it
     * a reference to the context is stored in the watchable
     * to avoid multiple subscriptions
     * 
     * @returns void
     */
    detectWatchable() {
        const subscriberMetadata = Notifier.currentSubscriber
        if(!subscriberMetadata) return
        /*
        if(subscriberMetadata?.context.indexOf(this)>=0) return // exit if subscribed in this context
        subscriberMetadata.context.push(this) // add current context
        */
        // retrieve subscriber if already available
        let subscriber = subscriberMetadata?.subscriber
        if(!subscriber) subscriberMetadata.subscriber = subscriber = new Subscriber(subscriberMetadata.fn)
        this.subscribe(subscriber)
    }

    // store watchables for automatic subscription
    static watchables = []

    /**
     * subscribe a function as a side effect
     * @param {*} fn 
     */
    static watch(fn) {
        // use an object so I can append metadata when detected
        const execute = { fn }
        try {
            
            Notifier.currentSubscriber = execute
            // console.log('before execute')
            execute.fn()
            // console.log('after execute')
        } catch (error) {
          console.log('error while trying to watch a function',fn, error)  
        } finally {
            Notifier.currentSubscriber = null
        }
    }

    hasSubscriber(fn, group=catchAllGroup) {
        const subscribers = this.#subscribers.get(group)
        if(!subscribers) return false
        return subscribers.has(fn)
    }

    detectWithEvent() {

        const controller = new AbortController();
        const signal = controller.signal
        document.addEventListener('detect', e => {
            const {fn} = e.detail
            if(!this.hasSubscriber(fn)) {
                this.subscribe(fn)
                // controller.abort()
            }
        }, {signal: signal})
    }

    static watchWithEvent(fn) {
        fn()
        let event = new CustomEvent('detect', {
			bubbles: true,
			cancelable: true,
			detail: {fn}
		});
        document.dispatchEvent(event)
    }

}

export { catchAllGroup }