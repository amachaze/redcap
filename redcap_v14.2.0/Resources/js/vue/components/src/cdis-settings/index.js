import { createApp } from 'vue'
import App from './App.vue'
import { createStore } from '@/plugins/Store'
import useRouter from './router'
import { TranslateDirective } from '../directives'

// Vue UI utilities
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap-vue/dist/style.css'

const init = (target) => {
    const app = createApp(App)
    const router = useRouter()
    app.directive('tt', TranslateDirective)
    app.use(router)
    app.use(createStore())
    app.use(BootstrapVue)
    app.mount(target)
    return { app }
}

export { init as default }
