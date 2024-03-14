<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        mounted() {
            console.log(this.$slots.default().children)
        },
        props: {
            query: {type: String, default: ''}
        }
    }
</script>

<style scoped>

</style>