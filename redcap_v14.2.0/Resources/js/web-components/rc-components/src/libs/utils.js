/**
 * reigister a custom web component
 * Please note: a component must be registered also when
 * used with new, and not just when used as tag in the HTML
 * @param {string} tag 
 * @param {HTMLElement} element 
 * @returns 
 */
 const defineCustomElement = (tag, element) => {
    if(window.customElements.get(tag)) {
        // console.warn(`Another element is already registered with the tag ${tag}`)
        return
    }
    window.customElements.define(tag, element)
}

/**
 * Convert a template string into HTML DOM nodes
 * @param  {String} str The template string
 * @return {Node}       The template HTML
 */
 const stringToHTML = (str) => {
    var support = ( () => {
        if (!window.DOMParser) return false
        var parser = new DOMParser()
        try {
            parser.parseFromString('x', 'text/html')
        } catch(err) {
            return false
        }
        return true
    })()

    // If DOMParser is supported, use it
    if (support) {
        var parser = new DOMParser()
        var doc = parser.parseFromString(str, 'text/html')
        return doc.body
    }

    // Otherwise, fallback to old-school method
    var dom = document.createElement('div')
    dom.innerHTML = str
    return dom
};


/**
 * Create an array of the attributes on an element
 * @param  {NamedNodeMap} attributes The attributes on an element
 * @return {Array}                   The attributes on an element as an array of key/value pairs
 */
 const getAttributes = (attributes) => {
	return Array.from(attributes).map((attribute) => {
		return {
			att: attribute.name,
			value: attribute.value
		}
	})
}

/**
 * Create a DOM Tree Map for an element
 * @param  {Node}    element The element to map
 * @param  {Boolean} isSVG   If true, node is within an SVG
 * @return {Array}           A DOM tree map
 */
 const createDOMMap = (element, isSVG) => {
	return Array.from(element.childNodes).map((node => {
		var details = {
			content: node?.childNodes?.length > 0 ? null : node.textContent,
			atts: node.nodeType !== 1 ? [] : getAttributes(node.attributes),
			type: node.nodeType === 3 ? 'text' : (node.nodeType === 8 ? 'comment' : node.tagName.toLowerCase()),
			node: node
		}
		details.isSVG = isSVG || details.type === 'svg'
		details.children = createDOMMap(node, details.isSVG)
		return details
	}))
}


const isLeaf = (node) => node.children.length===0
const getChildren = (htmlElement) => {
    if (isLeaf(htmlElement)) return [htmlElement]
  
    let list = []
    for (let i = 0; i < htmlElement.children.length; i++) {
      let children = getChildren(htmlElement.children[i])
      if (children) list.push(...children)
    }
    list.push(htmlElement)

    return list
}

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

/**
 * detect placeholder for string interpolation
 * replace placeholder with elements that can be easily
 * updated: the elements have a specific tag
 * 
 * @param {string} htmlString 
 * @param {string} tag 
 * @returns 
 */
const parseStringInterpolation = (htmlString, tag='x-x', attributeKey='data-key') => {
    const regExp = new RegExp('{{(?<key>[^}}]*)}}', 'g')
    const parsed = htmlString.replaceAll(regExp, (...matches) => {
        if(matches.length<1) return
        return `<${tag} ${attributeKey}="${matches[1]}"></${tag}>`
    })
    return parsed
}

const applyStringInterpolation = (element, data, attributeKey='data-key') => {
    const elements = element.querySelectorAll(stringInterpolationTag)
    for (const element of elements) {
        const key = element.getAttribute(attributeKey)
        element.innerHTML = data[key]
    }
}

/**
 * make an observer that will watch for attribute mutations
 * @param {function} callback function that accepts a mutation and an observer
 * @returns 
 */
 const makeAttributeObserver = (callback) => {
    // Callback function to execute when mutations are observed
    const mutationCallback = (mutationList, observer) => {
    for (const mutation of mutationList) {
        if (mutation.type === 'attributes') {
            callback(mutation, observer)
        }
    }
    };
    // Create an observer instance linked to the callback function
    const mutationObserver = new MutationObserver(mutationCallback);
    return mutationObserver
}
const observeAttributeMutation = (element, callback) => {
    const config = { attributes: true, childList: false, subtree: false };
    const observer = makeAttributeObserver(callback)
    observer.observe(element, config)
    return observer
}

const isNumber = (str) => {
    return /\d/.test(str);
}

const isString = (string) => {
    return (typeof string === 'string' || string instanceof String)
}

const camelize = s => s.replace(/-./g, x=>x[1].toUpperCase())
const kebabize = (str) => str.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase())
const unique = (array) => {
    return array.filter((item, pos) => array.indexOf(item) === pos)
}

export {
    defineCustomElement,

    stringToHTML,
    getAttributes,
    createDOMMap,

    getChildren,
    getParentUntil,

    parseStringInterpolation,
    applyStringInterpolation,

    makeAttributeObserver,
    observeAttributeMutation,
    
    isNumber,
    isString,

    camelize,
    kebabize,
    unique,
}