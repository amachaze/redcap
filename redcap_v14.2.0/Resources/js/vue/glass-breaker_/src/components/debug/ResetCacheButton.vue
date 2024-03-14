<template>
    <button class="btn btn-sm btn-danger" @click="resetCache" :disabled="loading">
        <font-awesome-icon v-if="loading" :icon="['fas', 'spinner']" spin fixed-width/>
        <font-awesome-icon v-else :icon="['fas', 'trash']" fixed-width/>
        <span> empty cache</span>
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
        async resetCache() {
            try {
                this.loading = true
                this.$store.dispatch('mrns/setList', [])
                await this.$API.dispatch('glassBreaker/clearProtectedMrnList')
            } catch (error) {
                console.error(error)
            }finally {
                this.loading = false
            }
        },
    }
}
</script>

<style>

</style>