<template>
    <div>
        <SettingsMenu />
        <div class="border rounded">
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
import SettingsMenu from '../components/SettingsMenu.vue'
</script>

<style scoped></style>
