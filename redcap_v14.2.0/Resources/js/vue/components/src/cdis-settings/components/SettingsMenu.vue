<template>
    <div>
        <ul class="nav nav-tabs">
            <li class="nav-item">
                <NavTabLink :to="{ name: 'home' }" :disabled="savePending"
                    >Settings</NavTabLink
                >
            </li>
            <li class="nav-item">
                <NavTabLink
                    :to="{ name: 'fhir-systems' }"
                    :disabled="savePending"
                    >FHIR Systems</NavTabLink
                >
            </li>
            <li class="nav-item">
                <NavTabLink
                    :to="{ name: 'custom-mappings' }"
                    :disabled="savePending"
                    >Custom Mappings</NavTabLink
                >
            </li>
        </ul>
        <template v-if="!loading && savePending">
            <PendingSaveAlert />
        </template>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from '../store'
import NavTabLink from './NavTabLink.vue'
import PendingSaveAlert from './PendingSaveAlert.vue'

const store = useStore()
const savePending = computed(() => store.savePending)
const loading = computed(() => store.loading)
</script>

<style scoped></style>
