import {createApp} from '../../modules/petite-vue.es.js'
import App from './App.js'


const init = (target) => {
    const element = document.querySelector(target)
    console.log(element, target)
    element.setAttribute('v-scope', 'App()')
    const app = createApp({App}).mount(target)
    // element.append(app)
    console.log(app)
}

export default init