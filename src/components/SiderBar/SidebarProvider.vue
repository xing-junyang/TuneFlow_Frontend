<template>
    <div class="sidebar-provider">
        <slot></slot>
    </div>
</template>

<script setup>
import { provide } from 'vue'
import { createSidebarContext, SIDEBAR_KEY } from './SidebarContext'

const context = createSidebarContext()
provide(SIDEBAR_KEY, context)

</script>

<style scoped>
.sidebar-provider {
    flex: 1;
    overflow-y: auto;
}
</style>