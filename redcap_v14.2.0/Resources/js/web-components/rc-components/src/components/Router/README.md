# Declarative Router

## features
* custom elements for router, route, and links
* content in routes is slotted and can be lazy loaded if wrapped in a template tag
* uses hash navigation
* supports nested routes. Note that nested paths that start with / will be treated as a root path. This allows you to leverage the component nesting without having to use a nested URL.
* suppport for catch-all routes (page not found)
* regular expressions can be used as valid routes
* route can be changed along with a state that is stored in the history object: history.state

## TODO
* router-link not ready

## example
```
<!-- standard links -->
<a href="#/">home</a>
<a href="#/about">about</a>
<a href="#/info">info</a>
<a href="#/not-found">not found</a>
<a href="#/sub">sub</a>

<!-- router-links -->
<rc-link to="{ path: '/', params: {id:1} }"/>
<rc-link to="{ path: '/info', params: {title: 'abc'} }"/>

<rc-router>
  <rc-route path="/">
    <span>home</span>
    <rc-route path="sub">
      <span>sub home</span>
    </rc-route>
  </rc-route>
  <rc-route path="/info">
    <template>
        <span>info again</span>
        <img src="https://placekitten.com/g/200/300" />
    </template>
  </rc-route>
  <rc-route path="/about"></rc-route>
  <rc-route path="*">
    <h1>not found</h1>
    <h3>sorry, wrong address</h3>
  </rc-route>
</rc-router>
```

## add routees programmatically
```
// create an element with some content
const testElement = document.createElement('div')
testElement.innerHTML = 'this is a test!'
// create a route and assign a path and a list of elements
const testRoute = new Route({ path:'/test', content:[testElement] })
// get a reference to the router and add the route
const router = document.querySelector('rc-router')
router.addRoute(testRoute)
```