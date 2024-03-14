const template = (tt) => {

    return `
<div class="d-flex gap-2 my-2" data-auth-params>
<input type="text" class="form-control form-control-sm" placeholder="${tt[key]}" data-auth-key>
<input type="text" class="form-control form-control-sm" placeholder="${tt[value]}" data-auth-value>
<select class="form-select form-select-sm" data-auth-context>
</select>
<button data-delete-auth-param type="button" class="btn btn-danger btn-sm">
<i class="fas fa-trash fa-fw"></i>
</button>
</div>
    `
}

export default class AuthParamsManager {
    /**
    * name of the setting as stored in the redcap_config table
    */
    #setting_name = 'fhir_custom_auth_params'
    paramsCounter = 0
    
    constructor(containerID, templateID) {
        this.containerID = containerID
        this.container = document.getElementById(this.containerID)
        this.hiddenField = this.addHiddenField()
        this.template = document.getElementById(templateID)
        this.initForm()
    }
    
    get authParams() {
        const authParams = {}
        const authParamsElements = this.container.querySelectorAll('[data-auth-params]')
        for (const element of authParamsElements) {
            const authKeyElement = element.querySelector('[data-auth-key]')
            const authValueElement = element.querySelector('[data-auth-value]')
            const authContextElement = element.querySelector('[data-auth-context]')
            if(authKeyElement && authValueElement && authContextElement) {
                const key = authKeyElement.value.trim()
                if(key==='') continue
                const value = authValueElement.value
                const context = authContextElement.value
                authParams[key] = {value, context}
            }
        }
        return authParams
    }
    
    /**
    * update the hidden field before the form is submitted
    * @returns 
    */
    initForm() {
        const settingsForm = this.findClosestParent(this.container, 'form')
        if(!settingsForm) return
        
        settingsForm.addEventListener('submit', (event) => {
            event.preventDefault();
            this.updateHiddenField();
            settingsForm.submit();
        })
    }
    
    addHiddenField() {
        if(!this.container) return
        const hiddenField = document.createElement('input')
        hiddenField.type = 'hidden'
        hiddenField.name = this.#setting_name
        this.container.appendChild(hiddenField)
        return hiddenField
    }
    
    updateHiddenField() {
        const authParams = this.authParams
        this.hiddenField.value = JSON.stringify(authParams)
    }
    
    createAuthParams(key='', value='', context='') {
        // Check if the template element exists
        if (!this.template) {
            console.error(`Template element with id '${this.templateId}' not found.`);
            return
        }
        if (!this.container) {
            console.error(`Container element with id '${this.containerID}' not found.`);
            return
        }

        const clone = document.importNode(this.template.content, true);
        
        const keyElement = clone.querySelector('[data-auth-key]')
        const valueElement = clone.querySelector('[data-auth-value]')
        const contextElement = clone.querySelector('[data-auth-context]')
        if(keyElement) keyElement.value = key
        if(valueElement) valueElement.value = value
        if(contextElement) contextElement.value = context
        
        const deleteElement = clone.querySelector('[data-delete-auth-param]')
        deleteElement.addEventListener('click', () => this.deleteEntry(deleteElement) )
        
        // Append the cloned content to the container element
        this.container.appendChild(clone);
    }
    
    deleteEntry(deleteElement) {
        const paramsWrapper = this.findClosestParent(deleteElement, '[data-auth-params]')
        if(!paramsWrapper) return
        const parent = paramsWrapper.parentNode
        if(parent) parent.removeChild(paramsWrapper)
        this.updateHiddenField()
    }
    
    renderConfig(json) {
        if(typeof json !== 'object') return
        for (const [key, data] of Object.entries(json)) {
            const {value,context} = data
            this.createAuthParams(key, value, context)
        }
    }
    
    /**
    * find the closest parent matching a selector
    * @param {HTMLElement} element 
    * @param {string} selector 
    * @returns 
    */
    findClosestParent(element, selector) {
        // Traverse up the DOM tree until a matching parent is found
        element = element.parentElement;
        if(!element) return null // exit if no parent
        if(element.matches(selector)) return element
        return this.findClosestParent(element, selector)
    }
}
