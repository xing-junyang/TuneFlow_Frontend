<template>
  <div class="sidebar-search">
    <div class="search-box">
      <input 
        type="text"
        class="search-input"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        placeholder="在音乐库中搜索"
      >
      <i class="fas fa-search search-icon"></i>
    </div>
    <button class="view-mode" @click="$emit('toggle-view')">
      <span>{{ viewMode === 'grid' ? '网格' : '列表' }}</span>
      <i :class="['fas', viewMode === 'grid' ? 'fa-th-large' : 'fa-list']"></i>
    </button>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  viewMode: {
    type: String,
    default: 'list'
  }
})

defineEmits(['update:modelValue', 'toggle-view'])
</script>

<style scoped>
.sidebar-search {
  padding: 8px;
  display: flex;
  gap: 8px;
  align-items: center;
}

.search-box {
  position: relative;
  flex: 1;
}

.search-input {
  width: 100%;
  padding: 8px 32px 8px 12px;
  background: var(--color-background-light);
  border: none;
  border-radius: 4px;
  color: var(--color-text);
  font-size: 0.875rem;
}

.search-icon {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-secondary);
}

.view-mode {
  background: transparent;
  border: none;
  color: var(--color-text-secondary);
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.view-mode:hover {
  color: var(--color-text);
  background: var(--color-background-hover);
}
</style> 