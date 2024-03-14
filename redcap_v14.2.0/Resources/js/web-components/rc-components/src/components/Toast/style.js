export default `
:host {
    --background-color: rgba(255,255,255,.85);
}
.rc-toast {
    background-color: var(--background-color);
    border: solid 1px rgba(0,0,0,0.1);
    border-radius: 0.25rem;
    box-shadow: 0 0.25rem 0.75rem rgb(0 0 0 / 10%);
    opacity: 0;
}
header {
    padding: .25rem .75rem;
    display: flex;
    align-items: flex-start;
    border-bottom: solid 1px rgba(0,0,0,0.1);
    background-color: rgba(255,255,255,1);
    color: #6c757d;
}
main {
    background-color: var(--background-color);
}
.title {
    font-weight: bold;;
}
main .content {
    padding: .75rem;
}
.header-aside {
    margin-left: auto;
    display: flex;
    align-items: center;
    line-height: 1.5rem;
}
.header-aside > * {
    display: inline-block;
}
.close-button {
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: bold;
    color: #000;
    opacity: .5;
    margin-left: 5px;
}
.close-button:hover {
    opacity: 1;
}
.rc-progress-bar {
    display: flex;
    align-items: flex-start;
    position: relative;
    height: 1px;
}

.rc-progress-bar:before {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    display: block;
    background-color: rgba(0,0,0,0.1);
    width: 100%;
    height: 100%;
}
:host([progress-disabled="true"]) .rc-progress-bar {
    display: none;
}
.small {
    font-size: 70%;
    font-weight: 400;
}
`