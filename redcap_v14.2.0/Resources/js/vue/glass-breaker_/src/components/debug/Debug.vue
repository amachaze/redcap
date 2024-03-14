<template>
  <div class="mt-2">
    <ResetCacheButton />
    <GetListButton class="ms-2" />
  </div>
</template>

<script>
import ResetCacheButton from '@/components/debug/ResetCacheButton'
import GetListButton from '@/components/debug/GetListButton'

export default {
    components: {
        ResetCacheButton,GetListButton,
    },
    methods: {}
}
</script>

<style>

</style>