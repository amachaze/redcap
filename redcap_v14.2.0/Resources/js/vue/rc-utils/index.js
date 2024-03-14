import { ClickOutsideDirective } from './directives'

import {
    RcCheckBox, RcPagination, RcHighlight,
    RcMessenger, RcModal,
    RcDropDown,RcDropDownItem, RcDropDownDivider,
    RcToaster, RcToast,
    RcDebug,
} from './components'

import {init as initToaster} from './components/RcToast/RcToaster.vue'
import {init as initMessenger} from './components/RcModal/RcMessenger.vue'

export default {
    install(app, options) {
        initToaster(app) // expose the $toast method globally
        initMessenger(app) // expose the $showDialogOk method globally
        
        // this.initGlobalPropertySetter(app)
        // set global custom directives
        app.directive('click-outside', ClickOutsideDirective)
        this.registerComponents(app)
    },

    /**
     * provide a way to register
     * global configurations from components
     * */
    initGlobalPropertySetter(app) {
        const setGlobalProperty = (app) => (key, value, overwrite) => this.setGlobalProperty(app, key, value, overwrite)
        app.config.globalProperties.rcSetGlobalProperty = setGlobalProperty(app)
    },

    /**
     * register the custom components 
     * @param {object} app 
     */
    registerComponents(app) {
        app.component('rc-modal', RcModal)
        app.component('rc-messenger', RcMessenger)
        app.component('rc-checkbox', RcCheckBox)
        app.component('rc-pagination', RcPagination)
        app.component('rc-highlight', RcHighlight)
        app.component('rc-dropdown', RcDropDown)
        app.component('rc-dropdown-item', RcDropDownItem)
        app.component('rc-dropdown-divider', RcDropDownDivider)
        app.component('rc-toast', RcToast)
        app.component('rc-toaster', RcToaster)
        app.component('rc-debug', RcDebug)
    },

    /**
     * 
     * @param {object} app app instance
     * @param {string} key key for the global configuraion
     * @param {mixed} value key for the global configuraion
     * @param {boolean} overwrite overwrite if existing
     * @returns 
     */
    setGlobalProperty(app, key, value, overwrite=false) {
        if(key in app.config.globalProperties && overwrite===false) return
        app.config.globalProperties[key] = value
    }

}