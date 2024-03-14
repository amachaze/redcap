<template>
    <Teleport to="body">

        <template v-for="(toaster, toasterKey) in toasters" :key="toasterKey" >
            <div v-if="toaster.length>0" class="rc-toaster" :class="getToasterClasses(toasterKey)">
                <template v-for="options in toaster" :key="options.toastId">
                    <RcToast class="_toast" @closed="onToastClosed(toasterKey, options)" :title="options.title" >{{options.body}}</RcToast>
                </template>
            </div>
        </template>
    </Teleport>

    <slot></slot>

    <!-- <div class="d-flex justify-content-center align-items-center">
        <input type="text" ref="toastText" />
        <select ref="toastPosition">
            <option v-for="(position, posIndex) in positions" :value="position" :key="posIndex">{{position}}</option>
        </select>
        <button class="btn btn-primary" type="button" @click="onAddToastClicked">add</button>
    </div> -->
    
</template>

<script>
import RcToast from "./RcToast.vue"

const positions = [
    'top-right',
    'top-left',
    'top-center',
    'top-full',
    'bottom-right',
    'bottom-left',
    'bottom-center',
    'bottom-full',
]

const defaultOptions = {
    position: 'top-right'
}


// store a reference to the toaster as soon as it is created    
let instance
/**
 * 
 * @param {*} app 
 */
const init = (app) => {
    app.config.globalProperties.$toast = (options, position) => {
        if(!instance) return
        return instance?.toast(options, position)
    }
}

const Toaster = {
    components: {RcToast},
    mounted() {
        instance = this // set a static reference to the component
    },
    provide() {
        return {
            $toast: 'hello!',
        }
    },
    data() {
        return {
            toastCounter: 0, 
            positions,
            toasts: [],
            toasters: {
                'top-right': [],
                'top-left': [],
                'top-center': [],
                'top-full': [],
                'bottom-right': [],
                'bottom-left': [],
                'bottom-center': [],
                'bottom-full': [],
            }
        }
    },
    props: {
        position: { type: String, default: defaultOptions.position }
    },
    computed: {
        classList() {
            const classList = []
            if(positions.includes(this.position)) {
                const positions = this.position.split('-')
                positions.forEach(position => {
                    classList.push(`position-${position}`)
                })
            }
            return classList
        }
    },
    methods: {
        /**
         * generate classes for each slot using the key
         * @param {string} key 
         */
        getToasterClasses(key) {
            if(!positions.includes(key)) return
            return key.split('-').map(value => `${value}`)
        },
        onAddToastClicked() {
            const body = this.$refs.toastText.value
            const position = this.$refs.toastPosition.value
            this.toast({body, title:'Toast!'}, position)
        },
        toast(options, position='top-right') {
            options.toastId = this.toastCounter++
            this.toasters[position].push(options)
        },
        onToastClosed(toasterKey, options) {
            const index = this.toasters[toasterKey].indexOf(options)
            if(index<0) return
            this.toasters[toasterKey].splice(index, 1)
        },
    },
}

export {Toaster as default, init}
</script>

<style scoped>
.rc-toaster {
    position: fixed;
    z-index: 10000;
    width: 400px;
}
.rc-toaster.top {
    top: 0;
}
.rc-toaster.right {
    right: 0;
}
.rc-toaster.bottom {
    bottom: 0;
}
.rc-toaster.left {
    left: 0;
}
.rc-toaster.center {
    left: 50%;
    transform: translateX(-50%);
}
.rc-toaster.full {
    width: 100%;
}
._toast {
    margin: 10px;
}
</style>