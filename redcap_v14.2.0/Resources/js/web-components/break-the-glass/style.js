const style = `
:host {
    --spacing: 5px;
}
form > div + div {
    margin-top: calc(var(--spacing)*2);
}

.form-item {
    box-sizing: border-box;
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: rgb(73, 80, 87);
    background-color: rgb(255, 255, 255);
    background-clip: padding-box;
    border: 1px solid rgb(206, 212, 218);
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out 0s, box-shadow 0.15s ease-in-out 0s;
}
textarea.form-item {
    height: unset;
}
[data-mrns-container] {
    border: solid 1px #cacaca;
    border-radius: 3px;
    padding: var(--spacing);
    max-height: 100px;
    overflow: auto;
}
label  {
    font-weight: 400;
    display: block;
}
input + label {
    display: inline-block;
}
textarea[name="explanation"] {
    width: 100%;
    border: solid 1px #cacaca;
    border-radius: 3px;
}
.mrn-wrapper {
    align-items: center;
    justify-content: flex-start;
    display: flex;
}
.mrn-wrapper label {
    margin: 0 0 0 5px;
}
.mrn-wrapper [data-delete-mrn] {
    border: none;
    background-color: transparent;
}
.small {
    font-size: .8em;
    font-style: italic;
}
.mrn-wrapper aside {
    margin-left: auto;
}
.block {
    display: block;
}
.small {
    font-size: 0.8em;
}
`
export default style