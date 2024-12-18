<template>
  <ul class="sidebar-menu">
    <slot></slot>
  </ul>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'default'
  }
})
</script>

<style scoped>
ul {
  padding: 0;
  margin: 0;
}
.sidebar-menu {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0;
}
</style> 