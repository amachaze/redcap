import {default as Notifier, catchAllGroup } from './Notifier.js'
import Subscriber from './Subscriber.js'
import Particle from './Particle.js'
import Memo from './Memo.js'
import Store from './Store.js'

/**
 * example:
 * 
 * const [count, setCount, subscribeCount] = Particle.make(0);
 * const counter = () => console.log(count())
 * 
 * subscribeCount(counter)
 * 
 * setInterval(() => {
 *   setCount(count()+1)
 * }, 2000)
 * 
 */


/**
 * example:
 * 
 * const [objectProxy, subscribeObject] = Store.make({age:42, name: 'francesco', last_name: 'delacqua'});
 * const logger = () => console.log(objectProxy)
 * subscribeObject(logger)
 * 
 * const interval1 = setInterval(() => {
 *  objectProxy.age += 1
 * }, 1000);
 * 
 * setTimeout(() => {
 *  clearInterval(interval1)
 * }, 10000);
 */

export {
    catchAllGroup,
    Notifier,
    Subscriber,
    Particle,
    Store,
    Memo,
}