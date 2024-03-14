import makeAlpine from '../../../../../modules/Alpine/index.js'
const Alpine = makeAlpine()

Alpine.data('repo', () => ({count: 123, name: 'francesco', label: 'this is a lable'}))

Alpine.store('darkMode', {count: 123, name: 'francesco', label: 'this is a lable'})

export default Alpine