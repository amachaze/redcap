import App from './App.vue'
// import './assets/main.css'
import {createApp} from 'vue'

import storeCallback from './store'

const appCallback = (Maker, target) => {
    const app = createApp(App)
    const maker = new Maker(app)
        .addRcUtils()
        .addPinia(storeCallback)
        .mount(target)
    return app
    
}

export {appCallback as default}