<template>
  <div 
    class="sidebar-container" 
    :class="{ 'is-collapsed': !isExpanded }"
    :style="containerStyle"
  >
    <nav class="sidebar-nav" aria-label="主界面">
      <slot></slot>
    </nav>
    <SidebarResizeHandle />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SidebarResizeHandle from './SidebarResizeHandle.vue'
import { useSidebar } from './SidebarContext'

const { width, isExpanded } = useSidebar()

const containerStyle = computed(() => ({
  width: `${width.value}px`
}))
</script>

<style scoped lang="less">
.sidebar-container {
  position: relative;
  background: var(--color-background);
  color: var(--color-text);
  will-change: width;
  display: flex;
}

.sidebar-container.is-collapsed {
  .sidebar-nav {
    overflow: hidden;
  }
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>