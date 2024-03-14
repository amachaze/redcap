import {stringToHTML, getChildren} from '../libs/utils'
import {default as makeStore, ACTIONS} from '../libs/Store'
const storeName = 'myStore'

const parseStringInterpolation = (htmlString, tag='x-str') => {
    const regExp = new RegExp('{{(?<key>[^}}]*)}}', 'g')
    const parsed = htmlString.replaceAll(regExp, (...matches) => {
        if(matches.length<1) return
        return `<${tag} data-key="${matches[1]}"></${tag}>`
    })
    return parsed
}

const stringInterpolationTag = 'x-x'

const applyStringInterpolation = (dom, data, attributeKey='data-key') => {
    const elements = dom.querySelectorAll(stringInterpolationTag)
    for (const element of elements) {
        const key = element.getAttribute(attributeKey)
        element.innerHTML = data[key]
    }
}

export default class Reactive extends HTMLElement {
    shadowRoot

    constructor() {
        super()
		this.shadowRoot = this.attachShadow({ mode: 'open' })
        this.initProxy()
    }

    initProxy() {
        this.#proxy = makeStore(this.#proxy, storeName, this)
        this.addEventListener(`${storeName}:${ACTIONS.SET}`, this.onDataSet.bind(this))
    }

    #proxy = {
        counter: 12,
        sub: {
            counter: 34
        },
        test: 'abc',
    }
    get data() {
        return this.#proxy
    }

    onDataSet({detail: {data, prop, value}}) {
        const stringInterpolatedElements = this.shadowRoot.querySelectorAll(`${stringInterpolationTag}[data-key="${prop}"]`)
        for (const element of stringInterpolatedElements) {
            element.innerHTML = value
        }
    }

    connectedCallback() {
        this.render()
    }

    render() {
        const parsedTemplate =  parseStringInterpolation(this.template, stringInterpolationTag)
        const dom = stringToHTML(parsedTemplate)
        applyStringInterpolation(dom, this.data)
        for (const node of dom.childNodes) this.shadowRoot.appendChild(node)
        let interval = setInterval(() => {
            this.data.counter++
            this.data.sub.counter++
            if(this.data.counter>=20) clearInterval(interval)
        }, 1000)
        // const template = document.createElement('template')
        // const stringInterpolated = parseStringInterpolation(this.template, stringInterpolationTag)
        // template.innerHTML = stringInterpolated
        // const map = mapTemplate(template)
        // console.log(map)
        // const clone = template.content.cloneNode(true)
    }

    update(data) {
        

    }


    get template() {
        /*html*/
        return `
        <div :start="counter">
            <span>{{counter}} {{test}}</span>
        </div>
        <div :start="after">
            <span>{{counter}} {{test}}</span>
        </div>
        `
    }


}