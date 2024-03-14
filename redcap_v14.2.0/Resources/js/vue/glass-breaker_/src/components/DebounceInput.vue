<template>
  <input :type="$attrs.text || 'text'" :bind="{...$attrs}" @input="debounce" :value="$attrs.value"/>
</template>

<script>
export default {
    data() {
        return {
            timeoutID: null,
            value: null,
        }
    },
    props: {
        delay: {
            type: Number,
            default: 300
        }
    },
    methods: {
        debounce(event) {
            clearTimeout(this.timeoutID)
            this.timeoutID = setTimeout(() => {
                this.value = event.target.value
                this.$emit('input', this.value)
            }, this.delay)
        }
    },
}
</script>

<style>

</style>