import Route from './Route'

export default class Router {
    #element

    constructor(element) {
        this.#element = element.shadowRoot ? element.shadowRoot : element
        this.#registerEvents()
    }

    get element() { return this.#element }

    /**
     * parse routes declared in the DOM
     */
    #parseRoutes() {
        const routeSelector = '[data-route]'
        const extractRouteContent = (component) => {
            const template = document.createElement('template')
            // first add the component itself
            template.content.appendChild(component)
            // add all child-nodes that are not routes
            /* component.childNodes.forEach(node => {
                if( (node instanceof HTMLElement) && (node.hasAttribute(routeSelector)) ) return // skip sub routes
                if(node.content) node = node.content
                template.content.appendChild(node)
            }); */

            // each route will contain only one element
            return template.content.childNodes[0]
        }
        const makeRoute = (component, parent=null) => {
            const path = component.getAttribute('data-route')
            const name = component.getAttribute('data-route-name')
            const route = new Route({router: this, path, name, component, parent})
            this.addRoute(route)
            if(!component.content) return route
            // recursively get subroutes in document fragments
            const subComponents = component.content.querySelectorAll(routeSelector)
            subComponents.forEach(suComponents => {
                makeRoute(suComponents, route)
            });
            // console.log(route.path, route.content)
        }
        const routeComponents = Array.from(this.element.querySelectorAll(routeSelector))
        routeComponents.forEach(component => {
            makeRoute(component)
        })
    }

    #routes = []
    get routes() { return this.#routes }
    set routes(value) { this.#routes = value }
    // add a route if not 
    addRoute(route) {
        const routes = this.routes
        if(routes.indexOf(route)<0) routes.push(route)
        this.routes = routes
    }
    
    get currentPath() {
        const {hash} = location
        const path = hash.replace(/^#/, '')
        return path
    }

    #catchAllRoute = null
    get catchAllRoute() {
        if(this.#catchAllRoute === null) {
            const found = this.routes.find(({path}) => {
                if(!(path)) return
                return path.match('\\*')
            })
            this.#catchAllRoute = found ?? false
        }
        return this.#catchAllRoute
    }

    getMatchingRouteByPath(path) {
        for(const route of this.routes) {
            const match = route.matches(path)
            // console.log('path:', path, 'match:', match, 'regExp:', regExp)
            if(match != false) return route
        }
        return
    }

    getMatchingRouteByName(name) {
        for(const route of this.routes) {
            const match = route.name === name
            // console.log('path:', path, 'match:', match, 'regExp:', regExp)
            if(match != false) return route
        }
        return
    }

    #route
    get route() { return this.#route }


    push({path, name, params={}}, replace=false) {
        /* const applyRouteParams = (route, params) => {
            for (const [key, value] of Object.entries(params)) {
                try {
                    if(!(key in route)) return
                    route[key] = value
                } catch (error) {
                    console.error(`There was an error trying to apply ${key} to the route`, error)
                }
            }
        } */
        let matchingRoute = null // reset the current route
        if(path) matchingRoute = this.getMatchingRouteByPath(path)
        else if (name) matchingRoute = this.getMatchingRouteByName(name)
        
        // console.log(path, matchingRoute.path, matchingRoute)
        if(!matchingRoute) {
            console.error(`route '${path}' not found`)
            return
        }

        // keep whatever hash if we are in catchall
        let hash = matchingRoute.isCatchAll() ? location.hash : matchingRoute.hash
        if(replace) {
            history.replaceState(params, '', hash);
        }else {
            history.pushState(params, '', hash)
        }

        this.#update(matchingRoute)
    }

    #target
    getTarget() {
        debugger
        if(!this.#target) {
            this.#target = document.createDocumentFragment()
        }
        return this.#target
        /* let target = this.element.querySelector('[data-route-target]')
        if(!target) {
            target = document.createElement('section')
            target.setAttribute('data-route-target', true)
            this.element.appendChild(target)
        }
        return target */
    }

    /**
     * update the content
     * 
     * @param {Route} route 
     */
    #update(matchingRoute) {
        this.#route = matchingRoute
        // let fragment = document.createDocumentFragment()
        this.#routes.forEach(route => {
            if(route===matchingRoute) return
            route.disable()
        });
        matchingRoute.enable()

        /* let content = matchingRoute.nestedContent

        this.#addedNodes.forEach(node => {
            node.parentNode.removeChild(node)
        })
        this.observeMutation(this.element)
        this.element.appendChild(content) */

    }

    #init() {
        // go to root if no hash
        if(location.hash==='') location.hash='/'
    }

    #locationHashChanged() {
        const path = this.currentPath
        this.push({path})
    }
    
    #registerEvents() {
        window.addEventListener('hashchange', (e) => {
            e.preventDefault()
            this.#locationHashChanged()
        })
        window.addEventListener('DOMContentLoaded', () => {
            this.#init()
            this.#parseRoutes()
            this.#routes.forEach(route => {
                route.disable()
            });
            // triger location change as soon as everything is loaded
            this.#locationHashChanged()
        })
    }
}