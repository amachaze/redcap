import Base from '../Base'
const tag = 'rc-route'

/**
 * find the closest ancestor with
 * matching the selector
 * 
 * @param {HTMLElement} element 
 * @param {*} selector 
 * @returns 
 */
const getParentUntil = (element, selector) => {
    // first let's get the container of the webcomponent itself
    const parent = element.parentElement
    // set the base cases: not found or closest matching
    if(parent==null) return
    if(parent.closest(selector) == parent) return parent
    // repeat recursively
    return getParentUntil(parent, selector)
}

const style = `
slot {
    display: none;
}
`

class RouteComponent extends Base {

    constructor() {
        super();
        // this.addStyle(style)
    }

    get template() {
        return `
        <main></main>
        <slot></slot>
        `
    }

    #nodes = []
    enable() {
        if(this.#nodes.length>0) return
        const main =  this.shadowRoot.querySelector('main')
        let parent = this.parentNode
        if(!parent) return
        if(parent.shadowRoot) parent = parent.shadowRoot
        // const container = document.createDocumentFragment()
        const container = document.createDocumentFragment()
        this.content.forEach(node => {
            container.appendChild(node)
            this.#nodes.push(node)
        });
        parent.appendChild(container)
    }
    disable() {
        if(this.#nodes.length===0) return
        this.#nodes.forEach(node => {
            node.remove()
        });
        this.#nodes = []
    }

    #content
    get content() { return this.#content}
    set content(nodes) {
        const template = document.createElement('template')
        nodes.forEach(node => {
            if(node.tagName===this.tagName) return // skip sub routes
            if(node.content) node = node.content
            template.content.appendChild(node)
        });
        this.#content = template.content.childNodes
    }

    /**
     * remove every node not being a sub-route from the slot
     * ans store it in an internal property
     */
    #initContent() {
        const nodes = []
        let slots = this.shadowRoot.querySelectorAll('slot');
        slots.forEach(slot => {
            slot.assignedNodes().forEach(node => {
                if(node.tagName===this.tagName) return // skip sub routes
                if(node.content) node = node.content
                nodes.push(node)
            })
        });
        this.content = nodes
    }
    afterRender() {
        this.#initContent()
    }

    /**
     * get the content of the route.
     * routes support lazy loading:
     * just wrap the content in a template tag, and
     * its content will be exported
     */
    get content() {

        const content = []
        this.#content.forEach(node => {
            if(node.tagName===this.tagName) return // skip sub routes
            if(node instanceof HTMLTemplateElement) {
                // clone the content, so it will work will templates as well
                const clone = node.content.cloneNode(true)
                node = clone
            }else {
                // every other node
                node = node.cloneNode(true)
            }
            content.push(node)
        })
        return content
    }

    #path
    get path() { return this.#path}
    set path(value) {
        const getParentPath = () => {
            const parentRoute = getParentUntil(this, `${this.tagName}`)
            if(parentRoute) {
                return parentRoute.path
            }
        }
        // check if it is a root path
        const isRootPath = (path) => {
            return path.match('^/') != null
        }
        // check if it is root (home)
        const isRoot = (path) => {
            return path === '/'
        }

        if(isRootPath(value)){
            this.#path = value
            return
        }
        let parentPath = getParentPath()
        if(!parentPath) {
            this.#path = value
            return
        }
        if(isRoot(parentPath)) parentPath = '' // ignore first slash if is root
        this.#path = `${parentPath}/${value}`
    }

    #name
    get name() { return this.#name }

    #title
    get title() { return this.#title }

    static get observedAttributes() { return ['path', 'name', 'title'] }
    onAttributeChanged(attributeName, oldValue, newValue) {
        switch (attributeName) {
            case 'path':
                this.path = newValue
                break
            case 'name':
                this.#name = newValue
                break
            case 'title':
                this.#title = newValue
                break
            default:
                break;
        }
    }

}


export { RouteComponent as default, tag }