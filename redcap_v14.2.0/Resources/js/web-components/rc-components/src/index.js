


import Base from './components/Base.js'
import BootstrapStyled from './components/BootstrapStyled.js'
import REDCapStyled from './components/REDCapStyled.js'
import Modal from './components/Modal/Modal.js'
import Teleport from './components/Teleport.js'
import Lazy from './components/Lazy.js'
import LazyImage from './components/LazyImage.js'
import Dropdown from './components/Dropdown/Dropdown.js'
import DropdownItem from './components/Dropdown/DropdownItem.js'
import Toast from './components/Toast/Toast.js'
import Toaster from './components/Toast/Toaster.js'
import Router from './components/Router/Router.js'
import Route from './components/Router/Route.js'
import RouterLink, {tag as routerLinkTag} from './components/Router/RouterLink.js'
import RouteComponent, {tag as routeTag} from './components/Router/RouteComponent.js'
import {defineCustomElement} from './libs/utils'

// const ProxyDialog = setProxy(Dialog)

// window.customElements.define('redcap-reactive', Reactive)
// window.customElements.define('redcap-p-dialog', ProxyDialog)
// window.customElements.define('redcap-p-dialog', Proxify(Dialog))
// window.customElements.define('redcap-p-dialog', Dialog)

const exports = {
    'rc-modal': Modal,
    'rc-dropdown': Dropdown,
    'rc-dropdown-item': DropdownItem,
    'rc-teleport': Teleport,
    'rc-lazy': Lazy,
    'rc-toast': Toast,
    'rc-toaster': Toaster,
}

for (const [tag, element] of Object.entries(exports)) {
    defineCustomElement(tag, element)
}

export {
    defineCustomElement,
    Base,
    BootstrapStyled,
    REDCapStyled,
    Modal,
    Dropdown,
    DropdownItem,
    Teleport,
    Lazy,
    LazyImage,
    Toast,
    Toaster,
    Router,
    Route,
    RouteComponent,
    RouterLink,
}
