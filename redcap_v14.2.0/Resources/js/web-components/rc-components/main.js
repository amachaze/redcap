
import {
  defineCustomElement,
  Modal,
  Teleport,
  Lazy,
  LazyImage,
  Toast,
  Toaster,
  Dropdown,
  DropdownItem,
  Router,
  Route,
} from './src'



window.app_path_webroot_full = 'https://redcap.test/'
window.redcap_version = '999.0.0'

import AlpineTest from './src/components/Alpine/AlpineTest'
import AlpineTest1 from './src/components/Alpine/AlpineTest1'
defineCustomElement('alpine-test', AlpineTest)
defineCustomElement('alpine-test-1', AlpineTest1)



Modal.confirm({title: 'test', body:'this is the body'})



// <rc-base title="hello world" message="welcome" counter="12"></rc-base>
document.querySelector('#app').innerHTML = `

<alpine-test></alpine-test>
<alpine-test></alpine-test>
<hr>
<hr>
<hr>
<alpine-test-1></alpine-test-1>
<alpine-test-1></alpine-test-1>


`
