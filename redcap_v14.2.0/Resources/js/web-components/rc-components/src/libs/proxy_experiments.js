const makeProxy = (object, callback) => {
    return new Proxy(object, {
        get(target, prop, receiver) {
            return Reflect.get(target, prop, receiver)
        },
        set(target, prop, value, receiver) {
            Reflect.set(target, prop, value, receiver)
            callback({target, prop, value, receiver})
            return true
        }
    })
}

/**
 * make an observer that will watch for attribute mutations
 * @param {function} callback function that accepts a mutation and an observer
 * @returns 
 */
const makeAttributeObserver = (callback) => {
    // Callback function to execute when mutations are observed
    const mutationCallback = (mutationList, observer) => {
    for (const mutation of mutationList) {
        if (mutation.type === 'attributes') {
            callback(mutation, observer)
        }
    }
    };
    // Create an observer instance linked to the callback function
    const mutationObserver = new MutationObserver(mutationCallback);
    return mutationObserver
}