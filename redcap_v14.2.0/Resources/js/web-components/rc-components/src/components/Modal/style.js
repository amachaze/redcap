const style = `
body[data-rc-modal="open"] {
    overflow: hidden;
}
:host {
    --spacing: 10px;
    --mask-pointer-events: all;
    --border-color: #dee2e6;
    --transition-duration: 300ms;
}
[data-container] {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background-color: rgb(0 0 0 /0.3);
    pointer-events: none;
    opacity: 0;
    overflow: auto;
    transition: opacity var(--transition-duration) ease-in-out;
}
:host([data-visible=true]) [data-container] {
    opacity: 1;
    pointer-events: auto;
}
[data-content] {
    margin: 50px auto;
    max-width: 500px;
    /* max-height: 80vh; */
    width: auto;
    background-color: rgb(255 255 255);
    border: solid 1px rgb(0 0 0 /.5);
    border-radius: 5px;
    position: relative;
}
[data-header] {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--border-color);
    /* align-items: center; */
}
[data-body] {
    overflow: auto;
}
[data-close] {
    cursor: pointer;
    align-self: start;
    margin-left: auto;
    opacity: 0.5;
    font-size: 24px;
    font-weight: 700;
    /* padding: 1rem;
    margin: -1rem;*/
    line-height: 1;
    display: inline-block;
}
[data-close]:hover {
    opacity: 0.75;
}
[data-header],
[data-body],
[data-footer] {
    padding: var(--spacing);
}
[data-footer] {
    border-top: 1px solid var(--border-color);
    display: flex;
    flex-direction: row;
}
[data-footer-buttons] {
    margin-left: auto;
}

:host([ok-only]) [data-button-cancel] {
    display: none;
}

@keyframes slideIn {
    from,
    to {
        /* transition: transform .6s ease-out; */
    }
    0% {
        transform: translateY(0px);
    }
    25% {
        transform: translateY(-25px);
    }
    
    100% {
        transform: translateY(-50px);
    }
}
@keyframes slideOut {
    from,
    to {
        transition: transform .6s ease-out;
    }
    0% {
        background-color: rgb(0,0,255);
        transform: translateY(0px);
    }
    
    100% {
        background-color: rgb(0,255, 0);
        transform: translateY(-50);
    }
}
@keyframes moveIt {
    0%   { 
        transform: translateX(0);
        width: 200px;
    }
    50%  {
        width: 200px*1.2;
    }
    100% {
        transform: translateX(50px);
        width: 200px;
    }
}
.btn {
    cursor: pointer;
    user-select: none;
    background-color: transparent;
    border: 1px solid transparent;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: .875rem;
    line-height: 1.5;
    border-radius: 0.2rem;
}
.btn:hover {
    color: #212529;
    text-decoration: none;
}
.btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: .875rem;
    line-height: 1.5;
    border-radius: 0.2rem;
}
.btn-primary {
    color: #fff;
    background-color: #007bff;
    border-color: #007bff;
}
.btn-primary:hover {
    color: #fff;
    background-color: #0069d9;
    border-color: #0062cc;
}
.btn-secondary {
    color: #fff;
    background-color: #6c757d;
    border-color: #6c757d;
}
.btn-secondary:hover {
    color: #fff;
    background-color: #5a6268;
    border-color: #545b62;
}

`
export default style