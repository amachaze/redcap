import Base from './Base'
import bootstrap from '../assets/bootstrap.css'
import fontawesome from '../assets/fontawesome.css'

export default class BootstrapStyled extends Base {

    constructor() {
        super()
        // add common style
        this.addStyle(bootstrap)
        this.addStyle(fontawesome)
	}
    
    get template() { return `` }
}