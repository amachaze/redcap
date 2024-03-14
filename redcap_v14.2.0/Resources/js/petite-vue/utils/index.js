export const createTemplateElement = (string) => {
    const element = document.createElement('template')
    element.innerHTML = string
    return element.content.cloneNode(true)
}