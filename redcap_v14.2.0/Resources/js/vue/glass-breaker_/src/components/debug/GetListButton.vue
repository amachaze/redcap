<template>
    <button class="btn btn-sm btn-info" @click="getMrnList" :disabled="loading">
        <font-awesome-icon v-if="loading" :icon="['fas', 'spinner']" spin fixed-width/>
        <font-awesome-icon v-else :icon="['fas', 'download']" fixed-width/>
        <span> get list</span>
    </button>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
        }
    },
    methods: {
        async getMrnList() {
            try {
                this.loading = true
                const response = await this.$API.dispatch('glassBreaker/getProtectedMrnList')
                const {data} = response
                this.$store.dispatch('mrns/setList', data)
            } catch (error) {
                console.error(error)
            }finally {
                this.loading = false
            }
        }
    }
}
</script>

<style>

</style>