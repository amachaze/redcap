<template>
    <div class="rc-checkbox d-inline-block" @click="onInput" :class="{disabled}" :data-checked="checked_" :data-indeterminate="indeterminate_">        
        <label v-if="label" class="me-2" v-html="label"></label>
        <span class="checkbox-outer"  >
            <span class="checkbox-inner">
                <template v-if="indeterminate_">
                    <i class="fas fa-minus"></i>
                </template>
                <template v-else-if="checked_">
                    <i class="fas fa-check"></i>
                </template>
                <template v-else>
                    <i class="fas fa-square" style="color: transparent;"></i>
                </template>
            </span>
        </span>
    </div>
</template>


<script>
    /* example usage:
        <rc-checkbox value="hello world" v-model="checked" v-model:indeterminate="isIndeterminate" />
    */
    export default {
        data() {
            return {
                checked_: this.checked,
                indeterminate_: this.indeterminate,
            }
        },
        props: {
            modelValue: { },
            value: { default: ''},
            indeterminate: {type: Boolean, default: false},
            disabled: {type: Boolean, default: false},
            checked: {type: Boolean, default: false},
            label: {type: String, default: ''},
        },
        emits: [
            'update:indeterminate',
            'update:modelValue',
        ],
        watch: {
            checked: {
                immediate: true,
                handler(checked) {
                    this.checked_ = checked
                }
            },
            value: {
                immediate: true,
                handler(value) {
                    const isArray = Array.isArray(this.modelValue)
                    if(isArray) {
                        this.checked_ = this.modelValue.indexOf(value)>=0
                    }else {
                        this.checked_ = this.value == this.modelValue
                    }
                    this.indeterminate_ = false
                }
            },
            indeterminate: {
                immediate: true,
                handler(indeterminate) {
                    this.indeterminate_ = indeterminate
                }
            },
            modelValue: {
                immediate: true,
                handler(value) {
                    if(typeof this.modelValue == 'undefined') return
                    if(Array.isArray(value)) {
                        this.checked_ = value.indexOf(this.value) >= 0
                    } else {
                        this.checked_ = this.value === value
                    }
                    this.indeterminate_ = false
                }
            },
        },
        methods: {
            onInput(event) {
                if(this.disabled) return

                const isArray = Array.isArray(this.modelValue)
                let checked = !this.checked_
                let value = this.value
                if(isArray) {
                    const values = [...this.modelValue]
                    const index = values.indexOf(value)
                    if(!checked && index>=0) {
                        values.splice(index, 1)
                    }else if(checked && index<0) {
                        values.push(value)
                    }
                    value = values
                }else {
                    if(!checked) value = null
                }

                this.$emit('update:modelValue', value )
                this.checked_ = checked

                // remove indeterminate state on any input
                this.indeterminate_ = false
                this.$emit('update:indeterminate', false ) 
            },
            // checkbox events
            onChange(event) {
                console.log('onChange', event)
            },
            onClick(event) {
                console.log('onClick', event)
            },
        }
        
    }
</script>

<style scoped>

.checkbox-outer {
    display: inline-block;
    /* display: none; */
    width: 15px;
    height: 15px;
    border-style: solid;
    border-width:  .5px;
    border-color: rgba(100,100,100);
    border-radius: 3px;
    vertical-align: middle;
     background-color: white;
    /* transition-property: background-color;
    transition-timing-function: ease-in-out;
    transition-duration: 100ms; */
}
.checkbox-inner {
    display: flex;
    align-items: center;
    justify-content: center;
}

.rc-checkbox.disabled .checkbox-outer {
    background-color: lightgray;
}
.rc-checkbox[data-checked="true"] .checkbox-outer,
.rc-checkbox[data-indeterminate="true"] .checkbox-outer {
    background-color: dodgerblue;
}
.checkbox-inner > * {
    transform: scale(0.6);
    transform-origin: center center;
    color: white;
}


.rc-checkbox {
    position: relative;
    cursor: pointer;
}
.rc-checkbox label {
    cursor: pointer;
    margin: 0;
}
/* hide the standard checkbox */
.rc-checkbox input[type="checkbox"] {
    display: none;
    position: absolute;
    pointer-events: none;
    opacity: 0;
    height: 0;
    width: 0;
}

</style>