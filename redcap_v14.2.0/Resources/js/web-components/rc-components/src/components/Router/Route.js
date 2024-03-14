import {isString, getParentUntil} from '../../libs/utils'
/**
 * regular expression to extract parts from a URL
 */
 const partRegExp = new RegExp('([^/]+)','g')
//  const parametrizedRoutePartRegExp = new RegExp('(:[^/]+)')


const observeMutation = (targetNode) => {
    let addedNodes = []
    let promise = new Promise((resolve, reject) => {
        const callback = (mutationList, observer) => {
            let totalAddedNodes = 0
            mutationList.forEach((mutation) => {
                switch(mutation.type) {
                case 'childList':
                    console.log(mutation, mutation.addedNodes)
                    totalAddedNodes = totalAddedNodes + mutation.addedNodes.length;
                    // Log the number of nodes added
                    console.log(`Total added nodes: ${totalAddedNodes}`);
                    addedNodes = [...mutation.addedNodes]
                    /* One or more children have been added to and/or removed
                        from the tree.
                        (See mutation.addedNodes and mutation.removedNodes.) */
                    break;
                case 'addedNodes':
                    console.log(mutation)
                    /* One or more children have been added to and/or removed
                        from the tree.
                        (See mutation.addedNodes and mutation.removedNodes.) */
                    break;
                case 'attributes':
                    /* An attribute value changed on the element in
                        mutation.target.
                        The attribute name is in mutation.attributeName, and
                        its previous value is in mutation.oldValue. */
                    break;
                }
            });
            observer.disconnect()
            resolve(addedNodes)
        }
        const observerOptions = {
            childList: true,
            attributes: true,
            
            // Omit (or set to false) to observe only changes to the parent node
            subtree: true
        }
        const observer = new MutationObserver(callback);
        observer.observe(targetNode, observerOptions);
    })

    return promise
}

 /**
  * route logic
  * this is used to create routes programmatically
  */
 export default class Route  {
    #router
    #parent
    #component
    #path = ''
    #name

    constructor({router, path, name, component, parent}) {
        this.#router = router
        this.#parent = parent
        this.#component = component
        this.name = name
        this.path = path
    }

    get router() { return this.#router }
    get parent() { return this.#parent }
    get component() { return this.#component }
    get path() { return this.#path }
    
    get name() { return this.#name }
    set name(value) { this.#name = value }

    get nestedContent() {
        let container = document.createDocumentFragment()
        let target = container

        let queue = []
        let current = this
        // make a quee with the root as first element
        while(current) {
            queue.unshift(current)
            current = current.parent
        }
        queue.forEach(route => {
            let content = route.content
            target.append(content)
            if(content.childNodes.length===1) target = content.firstChild
        });
        return container

    }

    get regExp() {
        let path = String(this.path)
        /**
         * normalize chatchAll route regExp:
         * '*' => '.*'
         */
        const asterisk = new RegExp('\\*')
        path = path.replace(asterisk, '.*')
        /**
         * normalize root route so it matches both '' and '/':
         * '/' or '' => '/*'
         */
        const root = new RegExp('^\/*$')
        path = path.replace(root, '\\/*')

        const regExp = new RegExp(`^${path}$`, '');
        return regExp
    }

    get hash() { return `#${this.parts.join('/')}` }

    isCatchAll() {
        return this.regExp.toString() == '/^.*$/'
    }

    enable() {
        const renderTemplate = (template) => {
            let parent = template.parentNode
            let clone = template.content.cloneNode(true)
            let container = document.createElement('div')
            template.getAttributeNames().forEach(key =>{
                let value = template.getAttribute(key)
                container.setAttribute(key, value)
            })
            container.appendChild(clone)
            parent.insertBefore(container, template)
            parent.removeChild(template)
            return container
        }
        const isInsideTemplate = (element) => {
            let template = getParentUntil(element, 'template')
            return template
        }
        let node = this.#component
        let queue = []
        let parentTemplate = isInsideTemplate(node)
        while(parentTemplate) {
            queue.unshift(parentTemplate)
            parentTemplate = isInsideTemplate(current)
        }
        let replaced
        queue.forEach(template => {
            replaced = renderTemplate(template)
        });
        if(replaced) this.#component = node = replaced
        if(node instanceof HTMLTemplateElement) this.#component = node = renderTemplate(node)

        if(node && node.style) node.style.display = 'revert'
        let parent = this.parent
        while(parent) {
            parent.enable()
            parent = parent.parent
        }
    }
    
    disable() {
        let node = this.#component
        if(node && node.style) node.style.display = 'none'
        let parent = this.parent
        while(parent) {
            parent.disable()
            parent = parent.parent
        }
    }




    /**
     * string or regular expression
     */
    set path(value) {
        // check if a path starts with a slash
        const isRootPath = (path) => {
            return path.match('^/') != null
        }
        // check if it is root (home)
        const isRoot = (path) => {
            return path === '/'
        }

        // compose the complete path including parent routes
        const makePath = () => {
            let path = String(value)
            if(isRootPath(path)) return path
            if(this.parent instanceof Route) {
                let parentPath = this.parent.path
                if(isRoot(parentPath)) parentPath = '' // set to empty string to avoid double slashes
                path = `${parentPath}/${path}`
            }
            return path
        }

        // add parent path
        // fix path removing extra slashes
        this.#path = makePath()
        // set the parts
        this.#parts = this.#path.split('/')
    }

    /**
     * parts are used to match the route against the URL
     * they are also used to generate the computed hash
     * based on any detected parameter
     */
    #parts = []
    get parts() { return this.#parts }

    /**
     * update an item in the parts.
     * this happends when a parameter is detected in the current route
     * @param {integer} index 
     * @param {mixed} value 
     */
    #updatePart(index, value) {
        this.#parts[index] = value
    }

    /* get parts() {
        const parts = this.#path.matchAll(partRegExp)
        return parts
    } */

    /**
     * params extracted from the route (if accepts parameters)
     */
    #params = {}
    get params() { return this.#params }
    set params(value) { this.#params = value }

    setParam(key, value, index) {
        this.#params[key] = value
    }

    /**
     * test the provided path against the route path
     * @param {string} path 
     * @returns 
     */
    matches(path) {
        /**
         * check if a part of the route is accepting parameters
         * @param {string} routePart 
         * @returns 
         */
        const parseParamKey = (routePart) => {
            const keyID = 'key'
            const parametrizedRoutePartRegExp = new RegExp(`:(?<${keyID}>[^/]+)(<regexp>\(.*\)){0,1}`)
            const match = routePart.match(parametrizedRoutePartRegExp)
            const key = match?.groups?.[keyID]
            return key
        }
        const pathParts = path.split('/')
        const routeParts = this.parts
        // console.log(pathParts, routeParts)
        // console.log(path, pathParts, this.path, routeParts)
        for (const index in pathParts) {
            const pathPart = pathParts[index] //matching path part
            const routePart = routeParts[index] //matching route part
            if(!isString(routePart)) return false
            // check if this is a catch all route part
            if(routePart==='*') return true
            const paramKey = parseParamKey(routePart)
            if(paramKey) {
                // param key detected
                this.setParam(paramKey, pathPart)
                this.#updatePart(index, pathPart)
                return true
            }
            if(pathPart != routePart) return false
        }
        return true
    }

}