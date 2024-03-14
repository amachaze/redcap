/* eslint-disable */ 
import VueFactory from './index'

if(process.env.NODE_ENV==='development') {
  // Vue.config.productionTip = false

  const factory = new VueFactory()
  // dynamically import TestChild
  let TestChild= () => import('@/TestChild')

  let result = factory.render(TestChild, '#app')
  result.then(
    // testChild => console.log(testChild)
  )
  
  
}
// bind factory so this will be correct in the scope
window.renderVueComponent = function() {
  const factory = new VueFactory()
  return factory.render.apply(factory, arguments)
}

// window.renderVueComponent = factory.render.bind(factory)
window.VueFactory = VueFactory