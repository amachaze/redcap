import {REDCapStyled} from '../rc-components/dist/index.js'
const template = `
<table class="table table-bordered table-striped">
    <thead data-head>
        <tr>
            <td>MRN</td>
            <td>status</td>
            <td>details</td>
        </tr>
    </thead>
    <tbody data-body>
        <tr>
            <td>Breed</td>
            <td>Jack Russell</td>
            <td>Jack Russell</td>
        </tr>
    </tbody>
</table>
`


export default class BTGResults extends REDCapStyled {
    #proxy = {
        results: []
    }

    constructor() {
        super()
        this.initProxy()
    }

    initProxy() {
        const self = this
        const data = {...this.#proxy}
        this.#proxy = new Proxy(data, {
            get(target, prop) {
                return Reflect.get(target, prop)
            },
            set(target, prop, value, receiver) {
                Reflect.set(target, prop, value)
                self.onUpdated(prop, value)
                return true
            }
        })
    }

    get template() { return template }

    get results() { return this.this.#proxy }
    set results(value) { this.#proxy.results = value }

    onUpdated(prop, value) {
        this.$emit('updated', {prop, value})
        this.makeRows()
    }
    
    makeRows() {
        const makeTD = (content) => {
            const td = document.createElement('td')
            td.innerHTML = content
            return td
        }
        const tableBody = this.shadowRoot.querySelector('[data-body]')
        tableBody.innerHTML = ''
        for (const result of this.#proxy.results) {
            const row = document.createElement('tr')
            const td1 = makeTD(result.mrn)
            const td2 = makeTD(result.status)
            const td3 = makeTD(result.details)
            row.appendChild(td1)
            row.appendChild(td2)
            row.appendChild(td3)
            tableBody.appendChild(row)
        }
    }
}