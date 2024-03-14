
export {default as FetchClient} from "./FetchClient.js";
export {default as Store} from "./Store.js";
export * as Utils from "./Utils.js";
// export {default as Alpine } from 'alpinejs'



const makeAlpine = async () => {
    let {default:Alpine} = await import('alpinejs')
    console.log(Alpine)
    return Alpine
}
export {makeAlpine} 