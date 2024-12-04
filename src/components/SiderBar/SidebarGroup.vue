<template>
  <div class="sidebar-group">
    <div v-if="$slots.label" class="group-label">
      <slot name="label"></slot>
    </div>
    <div class="group-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.sidebar-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.group-label {
  padding: 0 8px;
  color: var(--color-text-secondary);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.group-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
</style> 