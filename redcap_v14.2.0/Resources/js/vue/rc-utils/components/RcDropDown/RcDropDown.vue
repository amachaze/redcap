<template>
    <div class="rc-dropdown" :class="{block: block}" v-click-outside="onClickOutside">
        <div class="outer">
            <div class="menu-handle" @click="toggle" >
                <slot name="button-content">
                    <span v-html="text"></span>
                </slot>
            </div>
            <div class="menu-items-wrapper" v-if="open">
                <slot name="menu-header"></slot>
                <div  class="menu-items" @click="toggle">
                    <slot></slot>
                </div>
                <slot name="menu-footer"></slot>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            open: false,
        }
    },
    props: {
        text: {
            type: String,
            default: 'Select...'
        },
        block: {
            type: Boolean,
            default: false,
        }
    },
    methods: {
        toggle() {
            this.open = !this.open
        },
        onClickOutside(event) {
            if(!this.open) return
            this.open = false
        }
    }
}

</script>

<style scoped>
.rc-dropdown {
    --border-color: #dee2e6;
    --background-color: white;
    --hover-color: #e9ecef;
    --text-color: #212529;
    position: relative;
    color: var(--text-color);
    font-size: 1rem;
}
.outer {
    display: inline-block;
}
.block .outer {
    display: block;
}
.menu-handle {
    user-select: none;
    display: flex;
    align-items: center;
    position: relative;
    padding: .375rem .75rem;
    border: solid 1px var(--border-color);
    background-color: var(--background-color);
    border-radius: .25em;
    cursor: pointer;
    white-space: nowrap;
}
.menu-handle:after {
    display: inline-block;
    content: '';
    margin-left: 0.255em;
    vertical-align: 0.255em;
    border-top: 0.3em solid;
    border-right: 0.3em solid transparent;
    border-bottom: 0;
    border-left: 0.3em solid transparent;
}
.block .menu-handle:after {
    margin-left: auto;
}
.menu-items-wrapper {
    min-width: 10rem;
    padding: 0.5rem 0;
    border: solid 1px var(--border-color);
    border-radius: .25em;
    background-color: var(--background-color);
    z-index: 1000;
    position: absolute;
    margin-top: 2px;
    top: 100%;
    left: 0;
}

</style>