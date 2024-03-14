import Base from '../Base'
import JSON5 from 'json5'
const tag = 'rc-router-link'

class RouterLink extends Base {

    get template() {
        // add leading hash sign in fron of the link
        const regExp = new RegExp('(^[^#]*)')
        const path = this.path.replace(regExp, '#$1')
        return `
        <a href="${path}"><slot></slot></a>
        `
    }

    #active = {}
    get active() { return this.#active }
    set active(value) { this.#active = value }

    #path = {}
    get path() { return this.#path }
    set path(value) { this.#path = value }

    /**
     * params should be provided as an object, an array, or a number
     */
    #params = {}
    get params() {
        let params = this.#params
        try {
            return JSON5.parse(params)
        } catch (error) {
            console.error(`'${newValue}' is an invalid value. params should be provided as number, array, or object.`)
        }
    }
    set params(value) { this.#params = value }

    static get observedAttributes() { return ['params'] }
    onAttributeChanged(attributeName, oldValue, newValue) {
        switch (attributeName) {
            case 'params':
                this.#params = newValue
                break;
            case 'path':
                this.#path = newValue
                break
            default:
                break;
        }
    }

    get title() {
        let title = this.getAttribute('title')
        return title
    }

}


export { RouterLink as default, tag }