import appCallback from './main-prod'
import {Maker} from '../../add-ons/main.js'

if(process.env.NODE_ENV) {
    (async () => {
        appCallback(Maker, '#app')
    })()
}

