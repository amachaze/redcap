<template>
    <div class="rc-dropdown-item" :class="{active: active}">
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        active: {
            type: Boolean,
            default: false,
        }
    }
}
</script>

<style scoped>
.rc-dropdown {
    position: relative;
}
.rc-dropdown-item {
    --background-color: white;
    --text-color: #212529;
    --hover-color: #e9ecef;
    --active-background-color: #007bff;
    --active-color: white;
    padding: 0.25rem 1.5rem;
    cursor: pointer;
    display: block;
    color: var(--text-color);
    background-color: var(--background-color);
}
.rc-dropdown-item:hover {
    padding: 0.25rem 1.5rem;
    cursor: pointer;
    display: block;
    background-color: var(--hover-color);
}
.rc-dropdown-item.active,
.rc-dropdown-item:active {
    background-color: var(--active-background-color);
    color: var(--active-color);

}

</style>