<template>
  <DragArea 
    class="resize-handle"
    :class="{ 'is-collapsed': !isExpanded }"
    @dragStart="handleDragStart"
    @drag="handleDrag"
    @dragEnd="handleDragEnd"
  >
    <div class="resize-line" :class="{ 'is-resizing': isResizing }"></div>
  </DragArea>
</template>

<script setup>
import { useSidebar } from './SidebarContext'
import DragArea from '../basic/DragArea.vue'

const { width, updateWidth, isResizing, isExpanded } = useSidebar()
let startWidth = 0

const handleDragStart = () => {
  isResizing.value = true
  startWidth = Number(width.value)
}

const handleDrag = ({ totalDx }) => {
  updateWidth(startWidth + totalDx)
}

const handleDragEnd = () => {
  isResizing.value = false
}
</script>

<style scoped>
.resize-handle {
  position: absolute;
  right: -4px;
  top: 0;
  bottom: 0;
  width: 8px;
  cursor: col-resize;
  display: flex;
  justify-content: center;
  z-index: 10;
  touch-action: none;
}

.resize-handle.is-collapsed {
  right: -6px;
  width: 12px;
}

.resize-handle.is-collapsed:hover {
  background: rgba(255, 255, 255, 0.1);
}

.resize-line {
  width: 2px;
  height: 100%;
  background: transparent;
  transition: background-color 0.2s;
}

.resize-handle:hover .resize-line {
  background: var(--color-border);
}

.resize-line.is-resizing {
  background: var(--color-border);
}

.is-collapsed .resize-line {
  width: 3px;
}

.is-collapsed:hover .resize-line {
  background: var(--color-border);
}
</style> 