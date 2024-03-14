<template>
    <div @mouseover="onMouseOver" @mouseout="onMouseOut" class="rc-toast" :style="toastStyle">
        <div>
            <header>
                <span class="title" v-text="title"></span>
                <span class="close-button" @click="close" v-html="closeText"></span>
            </header>
            <main>
                <div class="content">
                    <slot>
                        <span v-html="message"></span>
                    </slot>
                </div>
                <div class="rc-progress-wrapper">
                    <span class="rc-progress-bar" :style="{width: `${progress}%`}" />
                </div>
            </main>
        </div>
    </div>
</template>

<script>


    const defaultOptions = {
        autoClose: 5000,
    }

    const transitionDuration = 300
    
    export default {
        data() {
            return {
                open: true,
                hover: false,
                interval: null,
                startTime: null,
                endTime: null,
            }
        },
        emits: ['closed'],
        created() {
            this.initTimer()
        },
        props: {
            closeText: { type: String, default: '&times;' },
            title: { type: String, default: '' },
            message: { type: String, default: '' },
            autoClose: { type: [Number,Boolean], default: defaultOptions.autoClose }
        },
        computed: {
            toastStyle() {
                return {
                    transitionProperty: 'opacity',
                    transitionTimingFunction: 'ease-in-out',
                    transitionDuration: `${transitionDuration}ms`,
                    opacity: this.open ? 1 : 0
                }
            },
            remainingMilliseconds() {
                if(!(this.startTime instanceof Date)) return 0
                if(!(this.endTime instanceof Date)) return 0
                const startMilliseconds = this.startTime.getTime()
                const endMilliseconds = this.endTime.getTime()
                if(endMilliseconds<=startMilliseconds) return 0
                return endMilliseconds-startMilliseconds
            },
            progress() {
                if(isNaN(this.autoClose)) return 100;
                if(this.remainingMilliseconds<=0) return 0
                const percentage = (this.remainingMilliseconds/this.autoClose)*100
                return percentage.toFixed(2);
            },
        },
        methods: {
            onMouseOver() {
                this.hover = true
            },
            onMouseOut() {
                this.hover = false
                this.countDown(this.remainingMilliseconds)
            },
            close() {
                /* this.$el.addEventListener('transitionend', () => {
                    // please note that this will only work after the transition ended
                    this.$emit('closed', this)
                }, {once:true}) */
                this.open = false
                setTimeout(() => {
                    this.$emit('closed', this)
                }, transitionDuration)
            },
            tick() {
                if(this.hover) {
                    this.interval = clearInterval(this.interval)
                    return
                }
                if(this.remainingMilliseconds<=0) return this.close()
                this.startTime = new Date()
            },
            initTimer() {
                this.countDown(this.autoClose)
            },
            countDown(milliseconds) {
                if(isNaN(milliseconds)) return
                const startTime = this.startTime = new Date()
                const endTime = new Date(startTime)
                endTime.setTime(endTime.getTime()+milliseconds)
                this.endTime = endTime
                this.interval = setInterval(() => {
                    this.tick()
                }, 10)
            }
        },
    }
</script>

<style scoped>
.rc-toast {
    background-color: rgba(255,255,255,.85);
    border: solid 1px rgba(0,0,0,0.3);
    border-radius: 3px;
    box-shadow: 0 0.25rem 0.75rem rgb(0 0 0 / 10%);
}
header {
    padding: 10px;
    display: flex;
    align-items: flex-start;
    border-bottom: solid 1px rgba(0,0,0,0.3);
    background-color: rgba(255, 255, 255, 1);
}
.title {
    font-weight: bold;;
}
main .content {
    padding: 10px;
}
.close-button {
    align-self: flex-start;
    cursor: pointer;
    margin-left: auto;
    font-size: 1.5rem;
    line-height: 1.5rem;
    font-weight: bold;
    color: #000;
    opacity: .5;
}
.close-button:hover {
    opacity: 1;
}
.rc-progress-bar {
    display: flex;
    align-items: flex-start;
    position: relative;
    height: 2px;
}
.rc-progress-bar:before {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    display: block;
    background-color: rgba(0,0,0,0.2);
    width: 100%;
    height: 100%;
}
</style>