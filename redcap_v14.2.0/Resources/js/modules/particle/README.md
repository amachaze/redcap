# Reactive objects
These objects are wrappers for primitives, objects, or arrays that can notify subscribers.

### Subscriber
A subscriber is a wrapping class for a callback function. Is is used as subscriber a the Notifier object

### Notifier
The Notifier is a generic pub/sub object, the base of the other reactive objects; it contains pub/sub logic.
It manages groups of subscribers, and notifies every subscriber when needed. If a specific group is notified, also all subscribers to the generic catch-all group are notified (if not already notified)

### Particle
A reactive object wrapping a primitive value. Notifies its subscribers every time the wrapped value is modified

### Store
A reactive object for an array or an object. Notifies the subscribers every time a property of the object is updated or deleted. A subscriber can be notified for any change or just for specific properties


## Utilities

### Particle.make(value)

#### description
Creates a reactive object using a primitive value.
#### return value
Returns an array with a getter, a setter, and a subscribe function for the primitive

#### Example:
```
const [name, setName, subscribeName] = Particle.make('francesco');
const logger = () => console.log(name());
subscribeName(logger);
```

### Store.make(data)

#### description
Creates a reactive object from usimg an array/object.
Subscribers can subscribe to any update or updates related to specific keys.

#### return value
Returns an array array with a getter, a setter, and a subscribe for the array/object
The getter returns a proxy, and every key is reactive

#### Example:
```
const [getStore, setStore, subscribeStore] = Store.make({
    age:42, name: 'francesco', last_name: 'delacqua', cats: {
        black: 'luna', gray: 'stella'
    }
});
const storeLogger = () => console.log(getStore().cats.black);
subscribeStore(storeLogger, 'cats.black');
```

### Notifier.watch(fn)

#### description
Register and execute a function as a side effect reacting to a change in a Particle, a Store, or another Notifier object. The wrapped function must contain one ore more getter from a Notifier object.

#### return value
Returns an EffectDTO (data transfer object) with an ID, the wrapped function, and the group (event name) to register the effect to.

#### example:
```
const [name, setName, subscribeName] = Particle.make('francesco');

const paragraph = document.createElement('p')
document.body.appendChild(paragraph)

const render = () => { paragraph.innerHTML = name() }
Notifier.watch(render)
```