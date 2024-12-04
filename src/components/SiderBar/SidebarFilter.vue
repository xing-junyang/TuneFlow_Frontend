<template>
  <div class="sidebar-filter">
    <div class="filter-chips">
      <button 
        v-for="filter in filters" 
        :key="filter.value"
        class="filter-chip" 
        :class="{ 'is-active': modelValue === filter.value }"
        @click="$emit('update:modelValue', filter.value)">
        {{ filter.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  filters: {
    type: Array,
    default: () => [
      { label: '歌单', value: 'playlist' },
      { label: '艺人', value: 'artist' },
      { label: '专辑', value: 'album' }
    ]
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped>
.sidebar-filter {
  padding: 8px;
}

.filter-chips {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.filter-chip {
  background: var(--color-background-tag);
  border: none;
  padding: 8px 16px;
  border-radius: 16px;
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.2s;
}

.filter-chip:hover {
  background: var(--color-background-hover);
}

.filter-chip.is-active {
  background: var(--color-text);
  color: var(--color-background);
}
</style> 