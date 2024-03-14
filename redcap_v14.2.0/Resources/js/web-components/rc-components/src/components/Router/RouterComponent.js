import { defineCustomElement } from '../../libs/utils'
import Base from '../Base'
import Route from './Route'
import {default as RouteElement, tag as routeTag} from './RouteComponent'


if(customElements.get(routeTag) === undefined) {
    defineCustomElement(routeTag, RouteElement)
}

const style = `
slot {
    display: none;
}
slot[data-active] {
    display: block;
}
`

export default class Router extends Base {

    constructor() {
        super();
        // this.addStyle(style)
    }

    #init() {
        // go to root if no hash
        if(location.hash==='') location.hash='/'
    }

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
            const content = extractRouteContent(component)
            const route = new Route({router: this, path, name, content, parent})
            this.addRoute(route)
            if(!component.content) return route
            // recursively get subroutes in document fragments
            const subComponents = component.content.querySelectorAll(routeSelector)
            subComponents.forEach(suComponents => {
                makeRoute(suComponents, route)
            });
            // console.log(route.path, route.content)
        }
        const routeComponents = Array.from(this.querySelectorAll(routeSelector))
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
        
        console.log(path, matchingRoute.path, matchingRoute)
        if(!matchingRoute) {
            console.error(`route '${path}' not found`)
            this.$emit('not-found', path)
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

    /**
     * update the content
     * 
     * @param {Route} route 
     */
    #update(matchingRoute) {

        let previousRoute = this.#route
        this.#route = matchingRoute
        const main = this.shadowRoot.querySelector('main')
        const addContent = (route, container=null) => {
            if(!(route.parent instanceof Route)) {
                return route.attachToContainer(container)
            }
            return addContent(route.parent, container)
        }

        const removeElement = (element) => {
            return element?.parentNode?.removeChild(element)
        }

        const detachRoute = (route) => route.detach()

        debugger
        if(previousRoute) {
            let route = previousRoute
            while(route) {
                debugger
                route.detach()
                route = route.parent
            }
        }
        
       /*  const removed = []
        main.childNodes.forEach(node => {
            debugger
            removed.push(node.parentNode.removeChild(node))
        })  */
        debugger
        // clear content
        // main.textContent = ''
        addContent(matchingRoute, main)

    }

    #locationHashChanged() {
        const path = this.currentPath
        this.push({path})
    }
    
    afterRender() {
        window.addEventListener('hashchange', (e) => {
            e.preventDefault()
            this.#locationHashChanged()
        })
        window.addEventListener('DOMContentLoaded', () => {
            this.#init()
            this.#parseRoutes()
            // triger location change as soon as everything is loaded
            this.#locationHashChanged()
        })
    }

    get template() {
        return `
            <main></main>
            <slot></slot>
        `
    }
}