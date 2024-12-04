<template>
  <div 
    class="drag-area"
    @mousedown="onMouseDown"
    @touchstart="onTouchStart"
  >
    <slot></slot>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

const props = defineProps({
  dragThreshold: {
    type: Number,
    default: 0,
  },
})

const emit = defineEmits(['dragStart', 'drag', 'dragEnd'])

const isDragging = ref(false)
let startX = 0
let startY = 0
let lastX = 0
let lastY = 0

const onMouseDown = (e) => {
  startDrag(e.clientX, e.clientY)
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
}

const onTouchStart = (e) => {
  const touch = e.touches[0]
  startDrag(touch.clientX, touch.clientY)
  window.addEventListener('touchmove', onTouchMove)
  window.addEventListener('touchend', onTouchEnd)
}

const startDrag = (x, y) => {
  startX = x
  startY = y
  lastX = x
  lastY = y
  document.body.style.userSelect = 'none'
}

const onMouseMove = (e) => {
  handleMove(e.clientX, e.clientY)
}

const onTouchMove = (e) => {
  const touch = e.touches[0]
  handleMove(touch.clientX, touch.clientY)
}

const handleMove = (x, y) => {
  const dx = x - startX
  const dy = y - startY
  
  if (!isDragging.value) {
    const distance = Math.sqrt(dx * dx + dy * dy)
    if (distance >= props.dragThreshold) {
      isDragging.value = true
      emit('dragStart', { x: startX, y: startY })
    }
  }
  
  if (isDragging.value) {
    emit('drag', {
      x,
      y,
      dx: x - lastX,
      dy: y - lastY,
      totalDx: dx,
      totalDy: dy,
    })
  }
  
  lastX = x
  lastY = y
}

const endDrag = () => {
  if (isDragging.value) {
    emit('dragEnd')
    isDragging.value = false
  }
  document.body.style.userSelect = ''
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
  window.removeEventListener('touchmove', onTouchMove)
  window.removeEventListener('touchend', onTouchEnd)
}

const onMouseUp = endDrag
const onTouchEnd = endDrag

onUnmounted(() => {
  endDrag()
})
</script>

<style scoped>
.drag-area {
  touch-action: none;
}
</style> 